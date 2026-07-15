import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { validateRepository } from "../scripts/validate.mjs";

async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "design-skills-validator-"));
  await mkdir(path.join(root, "skills", "review-layout"), { recursive: true });
  await writeFile(
    path.join(root, "skills", "review-layout", "SKILL.md"),
    [
      "---",
      "name: review-layout",
      "description: Review interface layout when an agent needs hierarchy, spacing, or responsive design guidance.",
      "---",
      "",
      "# Review layout",
      "",
      "Inspect the interface and report evidence-backed improvements.",
      "",
    ].join("\n"),
  );
  await writeFile(
    path.join(root, "catalog.json"),
    `${JSON.stringify({ schemaVersion: 1, skills: [{
      name: "review-layout",
      category: "craft",
      origin: "memoire",
      license: "MIT",
      source: "https://example.com/source",
      upstreamCommit: "0123456789abcdef0123456789abcdef01234567",
    }] }, null, 2)}\n`,
  );
  await writeFile(path.join(root, "LICENSE"), "MIT License\n");
  await writeFile(
    path.join(root, "provenance.json"),
    `${JSON.stringify({ schemaVersion: 1, sources: { memoire: {
      author: "Test Author",
      repository: "https://example.com/source",
      commit: "0123456789abcdef0123456789abcdef01234567",
      license: "MIT",
      licenseFile: "LICENSE",
      relationship: "first-party",
      skills: ["review-layout"],
    } } })}\n`,
  );
  await writeFile(
    path.join(root, "skills", "review-layout", "note.json"),
    `${JSON.stringify({
      name: "review-layout",
      version: "1.0.0",
      description: "Review interface layout when an agent needs hierarchy, spacing, or responsive design guidance.",
      author: "Test Author",
      category: "craft",
      sourceUrls: ["https://example.com/source"],
      lastResearchedAt: "2026-07-15T00:00:00.000Z",
      freshnessDays: 90,
      skills: [{ file: "SKILL.md" }],
    })}\n`,
  );
  return root;
}

test("accepts a complete, catalogued skill", async () => {
  const root = await fixture();
  assert.deepEqual(await validateRepository(root), []);
});

test("rejects extra frontmatter keys and a catalog mismatch", async () => {
  const root = await fixture();
  const skillPath = path.join(root, "skills", "review-layout", "SKILL.md");
  await writeFile(
    skillPath,
    [
      "---",
      "name: review-layout",
      "description: Review interface layout when an agent needs hierarchy, spacing, or responsive design guidance.",
      "model: opus",
      "---",
      "",
      "# Review layout",
      "",
    ].join("\n"),
  );
  await writeFile(path.join(root, "catalog.json"), `${JSON.stringify({ schemaVersion: 1, skills: [] })}\n`);

  const issues = await validateRepository(root);
  assert.ok(issues.some((issue) => issue.includes("unsupported frontmatter key: model")));
  assert.ok(issues.some((issue) => issue.includes("missing from catalog.json")));
});

test("rejects missing references and invalid note manifests", async () => {
  const root = await fixture();
  const skillDir = path.join(root, "skills", "review-layout");
  await writeFile(
    path.join(skillDir, "SKILL.md"),
    [
      "---",
      "name: review-layout",
      "description: Review interface layout when an agent needs hierarchy, spacing, or responsive design guidance.",
      "---",
      "",
      "# Review layout",
      "",
      "Read [the rubric](references/rubric.md).",
      "",
    ].join("\n"),
  );
  await writeFile(path.join(skillDir, "note.json"), `${JSON.stringify({ name: "wrong-name", skills: [] })}\n`);

  const issues = await validateRepository(root);
  assert.ok(issues.some((issue) => issue.includes("missing local reference")));
  assert.ok(issues.some((issue) => issue.includes("note.json name must match folder")));
  assert.ok(issues.some((issue) => issue.includes("note.json skills must reference SKILL.md")));
});

test("requires every skill to be installable as a Memoire Note", async () => {
  const root = await fixture();
  await import("node:fs/promises").then(({ rm }) => rm(path.join(root, "skills", "review-layout", "note.json")));
  const issues = await validateRepository(root);
  assert.ok(issues.some((issue) => issue.includes("note.json is required")));
});

test("rejects catalog entries without immutable provenance", async () => {
  const root = await fixture();
  const catalog = JSON.parse(await readFile(path.join(root, "catalog.json"), "utf8"));
  catalog.skills[0].origin = "unknown-source";
  await writeFile(path.join(root, "catalog.json"), `${JSON.stringify(catalog)}\n`);
  const issues = await validateRepository(root);
  assert.ok(issues.some((issue) => issue.includes("unknown provenance origin")));
});

test("rejects symlinks inside distributable skill folders", async () => {
  const root = await fixture();
  await symlink("SKILL.md", path.join(root, "skills", "review-layout", "linked-skill.md"));
  const issues = await validateRepository(root);
  assert.ok(issues.some((issue) => issue.includes("symbolic links are not allowed")));
});

test("rejects circular Note dependencies", async () => {
  const root = await fixture();
  const notePath = path.join(root, "skills", "review-layout", "note.json");
  const note = JSON.parse(await readFile(notePath, "utf8"));
  note.dependencies = ["review-layout"];
  await writeFile(notePath, `${JSON.stringify(note)}\n`);
  const issues = await validateRepository(root);
  assert.ok(issues.some((issue) => issue.includes("dependency cycle")));
});
