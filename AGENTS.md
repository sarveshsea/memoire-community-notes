# Agent instructions

- Treat `skills/<slug>/SKILL.md` as the canonical workflow surface.
- Keep skill frontmatter to `name` and `description` only.
- Keep entrypoints under 500 lines and use one-level `references/` for detail.
- Preserve every source's license, author, repository, and immutable commit in `provenance.json`.
- Never import paid, gated, or unlicensed prose without written permission.
- Run `npm run sync` after metadata changes and `npm run check` before handoff.
- Do not edit generated `catalog.json` or `note.json` files by hand when `scripts/sync-catalog.mjs` can express the change.
