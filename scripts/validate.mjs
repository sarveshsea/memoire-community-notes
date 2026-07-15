import { access, lstat, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const NAME_PATTERN = /^[a-z][a-z0-9-]{0,62}[a-z0-9]$/;
const LOCAL_LINK_PATTERN = /\[[^\]]*\]\(([^)]+)\)/g;
const NOTE_CATEGORIES = new Set(["craft", "research", "connect", "generate"]);

function parseFrontmatter(content) {
  const lines = content.split(/\r?\n/);
  if (lines[0] !== "---") return { data: null, end: -1 };
  const end = lines.indexOf("---", 1);
  if (end === -1) return { data: null, end: -1 };

  const data = {};
  for (const line of lines.slice(1, end)) {
    if (!line.trim()) continue;
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const raw = line.slice(separator + 1).trim();
    data[key] = raw.replace(/^(?:"(.*)"|'(.*)')$/, "$1$2");
  }
  return { data, end };
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function validateSkill(root, folder) {
  const issues = [];
  const prefix = `skills/${folder}`;
  const skillDir = path.join(root, "skills", folder);
  const skillPath = path.join(skillDir, "SKILL.md");

  async function inspectTree(currentDir, relativeDir = "") {
    const entries = await readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const relativePath = relativeDir ? `${relativeDir}/${entry.name}` : entry.name;
      const fullPath = path.join(currentDir, entry.name);
      const fileStat = await lstat(fullPath);
      if (fileStat.isSymbolicLink()) {
        issues.push(`${prefix}/${relativePath}: symbolic links are not allowed`);
      } else if (fileStat.isDirectory()) {
        await inspectTree(fullPath, relativePath);
      } else if (!fileStat.isFile()) {
        issues.push(`${prefix}/${relativePath}: only regular files and directories are allowed`);
      } else if ((fileStat.mode & 0o111) !== 0) {
        issues.push(`${prefix}/${relativePath}: executable files are not allowed in skill payloads`);
      } else if (entry.name.endsWith(".md")) {
        const markdown = await readFile(fullPath, "utf8");
        for (const match of markdown.matchAll(LOCAL_LINK_PATTERN)) {
          const target = match[1].split("#")[0].trim();
          if (!target || target === "url" || target.includes("${") || /^(?:https?:|mailto:|notion:|#)/.test(target)) continue;
          if (/^[a-z][a-z+.-]*:/i.test(target)) {
            issues.push(`${prefix}/${relativePath}: unsafe link scheme ${target}`);
            continue;
          }
          const resolved = path.resolve(path.dirname(fullPath), decodeURIComponent(target));
          const skillsRoot = path.join(root, "skills");
          if (!resolved.startsWith(`${skillsRoot}${path.sep}`) || !(await exists(resolved))) {
            issues.push(`${prefix}/${relativePath}: missing local reference ${target}`);
          }
        }
      }
    }
  }

  await inspectTree(skillDir);

  if (!NAME_PATTERN.test(folder)) issues.push(`${prefix}: folder name must be kebab-case and under 64 characters`);
  if (!(await exists(skillPath))) return [...issues, `${prefix}: SKILL.md is required`];

  const content = await readFile(skillPath, "utf8");
  const lines = content.split(/\r?\n/);
  const { data, end } = parseFrontmatter(content);
  if (!data) {
    issues.push(`${prefix}/SKILL.md: valid YAML frontmatter is required`);
  } else {
    for (const key of Object.keys(data)) {
      if (!["name", "description"].includes(key)) issues.push(`${prefix}/SKILL.md: unsupported frontmatter key: ${key}`);
    }
    if (data.name !== folder) issues.push(`${prefix}/SKILL.md: frontmatter name must match folder`);
    if (!data.description || data.description.length < 40) issues.push(`${prefix}/SKILL.md: description must explain purpose and triggering context`);
    if (end === lines.length - 1) issues.push(`${prefix}/SKILL.md: skill body is required`);
  }
  if (lines.length > 500) issues.push(`${prefix}/SKILL.md: exceeds the 500-line progressive-disclosure limit (${lines.length})`);

  const notePath = path.join(skillDir, "note.json");
  if (!(await exists(notePath))) {
    issues.push(`${prefix}/note.json: note.json is required`);
  } else {
    let note;
    try {
      note = JSON.parse(await readFile(notePath, "utf8"));
    } catch {
      issues.push(`${prefix}/note.json: must contain valid JSON`);
      return issues;
    }
    if (note.name !== folder) issues.push(`${prefix}/note.json: note.json name must match folder`);
    if (!/^\d+\.\d+\.\d+$/.test(note.version ?? "")) issues.push(`${prefix}/note.json: version must be semver`);
    if (note.description !== data?.description) issues.push(`${prefix}/note.json: description must match SKILL.md frontmatter`);
    if (!note.author) issues.push(`${prefix}/note.json: author is required`);
    if (!NOTE_CATEGORIES.has(note.category)) issues.push(`${prefix}/note.json: category must be craft, research, connect, or generate`);
    if (!Array.isArray(note.sourceUrls) || note.sourceUrls.length === 0) issues.push(`${prefix}/note.json: sourceUrls are required`);
    else if (note.sourceUrls.some((url) => {
      try { return new URL(url).protocol !== "https:"; } catch { return true; }
    })) issues.push(`${prefix}/note.json: sourceUrls must use HTTPS`);
    if (!note.lastResearchedAt || !Number.isInteger(note.freshnessDays)) issues.push(`${prefix}/note.json: freshness metadata is required`);
    if (!Array.isArray(note.skills) || !note.skills.some((entry) => entry.file === "SKILL.md")) {
      issues.push(`${prefix}/note.json: note.json skills must reference SKILL.md`);
    }
  }

  return issues;
}

export async function validateRepository(root) {
  const issues = [];
  const skillsRoot = path.join(root, "skills");
  if (!(await exists(skillsRoot))) return ["skills/: directory is required"];

  const folders = (await readdir(skillsRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  for (const folder of folders) issues.push(...await validateSkill(root, folder));

  const catalogPath = path.join(root, "catalog.json");
  if (!(await exists(catalogPath))) return [...issues, "catalog.json: file is required"];

  let catalog;
  try {
    catalog = JSON.parse(await readFile(catalogPath, "utf8"));
  } catch {
    return [...issues, "catalog.json: must contain valid JSON"];
  }
  const entries = Array.isArray(catalog.skills) ? catalog.skills : [];
  const names = entries.map((entry) => entry.name);
  for (const folder of folders) {
    if (!names.includes(folder)) issues.push(`skills/${folder}: missing from catalog.json`);
  }
  for (const name of names) {
    if (!folders.includes(name)) issues.push(`catalog.json: ${name} has no matching skill folder`);
  }
  if (new Set(names).size !== names.length) issues.push("catalog.json: skill names must be unique");
  for (const entry of entries) {
    if (!entry.category || !entry.origin) issues.push(`catalog.json: ${entry.name ?? "unnamed skill"} requires category and origin`);
  }

  const dependencyGraph = new Map();
  for (const folder of folders) {
    const notePath = path.join(skillsRoot, folder, "note.json");
    if (!(await exists(notePath))) continue;
    try {
      const note = JSON.parse(await readFile(notePath, "utf8"));
      const dependencies = Array.isArray(note.dependencies) ? note.dependencies : [];
      dependencyGraph.set(folder, dependencies);
      for (const dependency of dependencies) {
        if (!folders.includes(dependency)) issues.push(`skills/${folder}/note.json: unknown dependency ${dependency}`);
      }
    } catch {}
  }
  const visiting = new Set();
  const visited = new Set();
  function visit(name, pathNames = []) {
    if (visiting.has(name)) {
      issues.push(`skills/${name}/note.json: dependency cycle ${[...pathNames, name].join(" -> ")}`);
      return;
    }
    if (visited.has(name)) return;
    visiting.add(name);
    for (const dependency of dependencyGraph.get(name) ?? []) visit(dependency, [...pathNames, name]);
    visiting.delete(name);
    visited.add(name);
  }
  for (const folder of folders) visit(folder);

  const provenancePath = path.join(root, "provenance.json");
  if (!(await exists(provenancePath))) return [...issues, "provenance.json: file is required"].sort();
  let provenance;
  try {
    provenance = JSON.parse(await readFile(provenancePath, "utf8"));
  } catch {
    return [...issues, "provenance.json: must contain valid JSON"].sort();
  }
  const sources = provenance.sources && typeof provenance.sources === "object" ? provenance.sources : {};
  const provenanceClaims = new Map();
  for (const [origin, source] of Object.entries(sources)) {
    if (!source.author || !source.repository || !source.license || !source.relationship) {
      issues.push(`provenance.json: ${origin} requires author, repository, license, and relationship`);
    }
    if (!/^https:\/\//.test(source.repository ?? "")) issues.push(`provenance.json: ${origin} repository must use HTTPS`);
    if (!/^[a-f0-9]{40}$/i.test(source.commit ?? "")) issues.push(`provenance.json: ${origin} requires an immutable 40-character commit`);
    if (!source.licenseFile || !(await exists(path.resolve(root, source.licenseFile)))) {
      issues.push(`provenance.json: ${origin} licenseFile is missing`);
    }
    for (const skill of source.skills ?? []) {
      if (provenanceClaims.has(skill)) issues.push(`provenance.json: ${skill} is claimed by both ${provenanceClaims.get(skill)} and ${origin}`);
      provenanceClaims.set(skill, origin);
      const entry = entries.find((candidate) => candidate.name === skill);
      if (!entry) issues.push(`provenance.json: ${origin} references unknown skill ${skill}`);
      else if (entry.origin !== origin) issues.push(`provenance.json: ${skill} origin does not match ${origin}`);
    }
  }
  for (const entry of entries) {
    const source = sources[entry.origin];
    if (!source) {
      issues.push(`catalog.json: ${entry.name} has unknown provenance origin ${entry.origin}`);
      continue;
    }
    if (provenanceClaims.get(entry.name) !== entry.origin) {
      issues.push(`provenance.json: ${entry.name} must be explicitly claimed by ${entry.origin}`);
    }
    if (entry.license !== source.license || entry.source !== source.repository || entry.upstreamCommit !== source.commit) {
      issues.push(`catalog.json: ${entry.name} provenance fields do not match ${entry.origin}`);
    }
  }

  return issues.sort();
}

async function main() {
  const root = path.resolve(process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), ".."));
  const issues = await validateRepository(root);
  if (issues.length > 0) {
    console.error(`Validation failed with ${issues.length} issue${issues.length === 1 ? "" : "s"}:`);
    for (const issue of issues) console.error(`- ${issue}`);
    process.exitCode = 1;
    return;
  }
  const catalog = JSON.parse(await readFile(path.join(root, "catalog.json"), "utf8"));
  console.log(`Validated ${catalog.skills.length} design skills.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
