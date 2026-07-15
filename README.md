# Design Skills

[![CI](https://github.com/sarveshsea/design-skills/actions/workflows/ci.yml/badge.svg)](https://github.com/sarveshsea/design-skills/actions/workflows/ci.yml)
[![Agent Skills](https://skills.sh/b/sarveshsea/design-skills)](https://skills.sh/sarveshsea/design-skills)
[![License: MIT](https://img.shields.io/badge/license-MIT-111827.svg)](LICENSE)

Practical design judgment for AI coding agents. Design Skills packages Mémoire's complete skill corpus with attributed, licensed adaptations from respected design engineers.

The repository currently contains **78 installable skills** across interface craft, research, generation, Figma, agent workflows, and design-tool integrations. Every skill uses the standard `skills/<name>/SKILL.md` layout and also includes a Mémoire `note.json` manifest.

## Install

Install the collection with any Agent Skills-compatible client:

```bash
npx skills@latest add sarveshsea/design-skills
```

Install one skill:

```bash
npx skills@latest add sarveshsea/design-skills --skill better-ui
npx skills@latest add sarveshsea/design-skills --skill improve-animations
npx skills@latest add sarveshsea/design-skills --skill figma-use
```

Inspect the repository before installing:

```bash
npx skills@latest add sarveshsea/design-skills --list
```

Mémoire users can install the same folders as Notes from the community catalog:

```bash
memi notes install better-ui --catalog https://www.memoire.cv/notes/community/catalog.v1.json
```

## Start here

| Goal | Skill |
| --- | --- |
| Improve an interface broadly | [`better-ui`](skills/better-ui/SKILL.md) |
| Fix color and contrast | [`better-colors`](skills/better-colors/SKILL.md) |
| Improve typography | [`better-typography`](skills/better-typography/SKILL.md) |
| Review motion rigorously | [`review-animations`](skills/review-animations/SKILL.md) |
| Audit and plan motion improvements | [`improve-animations`](skills/improve-animations/SKILL.md) |
| Find useful animation opportunities | [`find-animation-opportunities`](skills/find-animation-opportunities/SKILL.md) |
| Tune design values live | [`dialkit`](skills/dialkit/SKILL.md) |
| Work directly in Figma | [`figma-use`](skills/figma-use/SKILL.md) |
| Generate a Figma screen | [`figma-generate-design`](skills/figma-generate-design/SKILL.md) |
| Build a design system | [`design-systems`](skills/design-systems/SKILL.md) |
| Audit accessibility | [`accessibility-audit`](skills/accessibility-audit/SKILL.md) |
| Turn research into a dashboard | [`dashboard-from-research`](skills/dashboard-from-research/SKILL.md) |
| Set up Mémoire for an agent | [`memoire-design-tooling`](skills/memoire-design-tooling/SKILL.md) |

## Collections

The folder structure stays flat for reliable discovery. Taxonomy lives in [`catalog.json`](catalog.json).

### Craft · 28 skills

Interface design, color, typography, motion, accessibility, mobile, design systems, tokens, Figma craft, and design critique.

`animation-craft` · `animation-vocabulary` · `apple-design` · `atomic-design` · `better-colors` · `better-typography` · `better-ui` · `component-catalog` · `design-sandbox-proof` · `design-systems` · `dialkit` · `emil-design-eng` · `figma-audit` · `figma-create-file` · `figma-design-systems` · `figma-ds-rules` · `figma-library-builder` · `figma-plugin-api` · `figma-use` · `find-animation-opportunities` · `improve-animations` · `interface-craft-gate` · `mobile-craft` · `motion-performance` · `motion-video` · `review-animations` · `token-architecture` · `ux-tenets-traps`

### Research · 10 skills

`accessibility-audit` · `browser-research-agent` · `competitive-intel` · `dashboard-from-research` · `data-synthesis` · `design-extract` · `design-system-reference` · `interview-research` · `usability-testing` · `web-research`

The authoritative count and metadata live in the generated catalog; use it when this summary and the catalog differ.

### Generation · 10 skills

Figma design and prototype generation, React Native, Flutter, Vue, Remotion, Hyperframes, Mermaid/JAM, and website-to-video workflows.

### Connect · 30 skills

Mémoire setup, MCP, Codex, research connectors, Figma sync, agent bridges, checkpoints, sandbox policy, secrets, scheduling, observability, and multi-agent coordination.

## What makes this repository trustworthy

- **Inspectable payloads.** Skills contain Markdown and passive resources. They do not run install-time scripts.
- **Standalone validation.** CI checks folder names, frontmatter, local links, line limits, Note manifests, catalog parity, and immutable provenance.
- **Dual compatibility.** One canonical folder works with Agent Skills and Mémoire Notes; there is no duplicated `notes/` tree.
- **Pinned provenance.** Adaptations record author, repository, exact commit, relationship, and license in [`provenance.json`](provenance.json).
- **Progressive disclosure.** Entrypoints stay under 500 lines; large field guides live in adjacent references.
- **Explicit boundaries.** Paid or unlicensed sources are linked, not copied.

Stars and install counts are useful discovery signals, not security guarantees. Review a skill before giving an agent write access to sensitive systems.

## Authors and sources

- **Mémoire**, by Sarvesh Chidambaram: 68 first-party skills from [`sarveshsea/memi`](https://github.com/sarveshsea/memi).
- **Jakub Krehel**: 3 MIT-licensed adaptations from [`jakubkrehel/skills`](https://github.com/jakubkrehel/skills).
- **Emil Kowalski**: 6 MIT-licensed adaptations from [`emilkowalski/skills`](https://github.com/emilkowalski/skills).
- **Josh Puckett**: 1 original workflow based on the MIT-licensed [`joshpuckett/dialkit`](https://github.com/joshpuckett/dialkit) repository.

Interface Craft is a paid Josh Puckett product without a public redistribution license. This repository does not copy its member curriculum. See [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) for the full policy and licenses.

## Repository structure

```text
skills/<skill>/
├── SKILL.md       # Agent Skills entrypoint
├── note.json      # Mémoire marketplace manifest
└── references/    # Loaded only when the workflow needs detail

catalog.json       # Generated searchable catalog
provenance.json    # Pinned authorship and licensing record
scripts/           # Repository validation and catalog tooling
tests/             # Validator regression tests
```

## Contribute

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before opening a pull request. A contribution must have a bounded job, trigger-rich frontmatter, clear provenance, no unlicensed copied material, and a passing `npm run check`.

Security concerns should follow [`SECURITY.md`](SECURITY.md), not a public issue.
