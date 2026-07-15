import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const researchedAt = "2026-07-15T00:00:00.000Z";
const versionOverrides = new Map([
  ["design-sandbox-proof", "2.0.0"],
  ["interface-craft-gate", "2.0.0"],
  ["memoire-mcp-agent-skills", "2.0.0"],
  ["memoire-studio-macos", "2.0.0"],
  ["memoire-v2-surface-map", "2.0.0"],
]);
const dependencyOverrides = new Map([
  ["hyperframes-video", []],
  ["motion-performance", []],
  ["remotion-video", []],
]);

const coreCategories = {
  "animation-vocabulary": "craft",
  "apple-design": "craft",
  "atomic-design": "craft",
  "better-colors": "craft",
  "better-typography": "craft",
  "better-ui": "craft",
  "component-catalog": "craft",
  "dashboard-from-research": "research",
  "design-extract": "research",
  "design-system-reference": "research",
  "dialkit": "craft",
  "emil-design-eng": "craft",
  "figma-audit": "craft",
  "figma-generate-design": "generate",
  "figma-generate-library": "generate",
  "figma-prototype": "generate",
  "figma-use": "craft",
  "find-animation-opportunities": "craft",
  "improve-animations": "craft",
  "memoire-design-tooling": "connect",
  "motion-video": "craft",
  "multi-agent": "connect",
  "review-animations": "craft",
  "superpower": "connect",
  "ux-tenets-traps": "craft"
};

function frontmatter(content, folder) {
  const match = content.match(/^---\nname:\s*([^\n]+)\ndescription:\s*([^\n]+)\n---/);
  if (!match) throw new Error(`skills/${folder}/SKILL.md must begin with name and description frontmatter`);
  return { name: match[1].trim(), description: match[2].trim().replace(/^['"]|['"]$/g, "") };
}

function displayName(name) {
  return name.split("-").map((part) => part === "mcp" ? "MCP" : part === "ux" ? "UX" : part === "ui" ? "UI" : part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

const provenance = JSON.parse(await readFile(path.join(root, "provenance.json"), "utf8"));
const originBySkill = new Map();
for (const [origin, source] of Object.entries(provenance.sources)) {
  for (const skill of source.skills ?? []) originBySkill.set(skill, origin);
}

const folders = (await readdir(path.join(root, "skills"), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const catalog = [];
for (const folder of folders) {
  const skillDir = path.join(root, "skills", folder);
  const metadata = frontmatter(await readFile(path.join(skillDir, "SKILL.md"), "utf8"), folder);
  const notePath = path.join(skillDir, "note.json");
  let previous = {};
  try {
    previous = JSON.parse(await readFile(notePath, "utf8"));
  } catch {}

  const origin = originBySkill.get(folder);
  if (!origin) throw new Error(`skills/${folder} is not explicitly registered in provenance.json`);
  const source = provenance.sources[origin];
  const category = previous.category ?? coreCategories[folder] ?? "craft";
  const tags = [...new Set(previous.tags ?? [category, "design-skills"])];
  const sourceUrls = (previous.sourceUrls?.length ? previous.sourceUrls : [source.repository])
    .map((url) => url.replace("https://github.com/sarveshsea/memoire-community-notes", "https://github.com/sarveshsea/design-skills"));
  const activateOn = previous.skills?.[0]?.activateOn ?? metadata.description;
  const freedomLevel = previous.skills?.[0]?.freedomLevel ?? "high";

  const note = {
    name: folder,
    version: versionOverrides.get(folder) ?? previous.version ?? "1.0.0",
    description: metadata.description,
    author: source.author,
    category,
    tags,
    sourceUrls,
    lastResearchedAt: previous.lastResearchedAt ?? researchedAt,
    freshnessDays: previous.freshnessDays ?? 90,
    skills: [{ file: "SKILL.md", name: displayName(folder), activateOn, freedomLevel }],
    dependencies: dependencyOverrides.get(folder) ?? previous.dependencies ?? [],
    engines: previous.engines ?? { memoire: ">=2.0.0" },
    createdAt: previous.createdAt ?? researchedAt,
    updatedAt: researchedAt
  };
  await writeFile(notePath, `${JSON.stringify(note, null, 2)}\n`, "utf8");

  catalog.push({
    name: folder,
    displayName: displayName(folder),
    description: metadata.description,
    category,
    tags,
    origin,
    author: source.author,
    license: source.license,
    source: source.repository,
    upstreamCommit: source.commit,
    relationship: source.relationship,
    path: `skills/${folder}`
  });
}

await writeFile(
  path.join(root, "catalog.json"),
  `${JSON.stringify({ schemaVersion: 1, generatedAt: researchedAt, skills: catalog }, null, 2)}\n`,
  "utf8"
);
console.log(`Synchronized ${catalog.length} skill manifests and catalog entries.`);
