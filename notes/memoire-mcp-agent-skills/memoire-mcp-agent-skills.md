---
name: Memoire MCP And Agent Skills
description: Set up memi MCP and Agent Skills before broad frontend changes.
activateOn: mcp setup, agent skills install, codex plugin, claude code mcp, cursor mcp, design agent setup
freedomLevel: high
category: connect
tags:
  - mcp
  - agent-skills
  - codex
  - claude-code
  - cursor
---

# Memoire MCP And Agent Skills

Use this Note when an agent needs local memi design tools through MCP or an installed skill package.

## Safe default setup

```bash
npm i -g @memi-design/cli
memi agent install --dry-run --json
memi agent brief . --intent "Prepare this repo for design-agent work" --json
memi mcp start --no-figma
```

## Agent Skills setup

```bash
memi agent install universal --project .
npx skills add sarveshsea/memi --skill memoire-design-tooling
```

The skill should make agents run evidence commands before editing UI:

```bash
memi diagnose .
memi ux audit . --json
memi craft audit . --json
memi tokens --from ./src --report
```

## MCP client setup

Use the Figma-independent server when the client only needs local code, registry, and audit tools:

```bash
memi mcp start --no-figma
```

Expected core tools include:

- `diagnose_app_quality`
- `audit_ux_tenets_traps`
- `audit_interface_craft`
- `get_shadcn_registry`
- `prepare_design_agent_brief`

## Client-specific installs

```bash
memi agent install claude-code --project .
memi agent install cursor --project .
memi agent install codex
memi agent install codex-plugin
memi agent install opencode --project .
```

Use `--dry-run --json` first in shared repositories.

## Sources

- https://github.com/sarveshsea/memi/blob/main/server.json
- https://github.com/sarveshsea/memi/tree/main/skills/memoire-design-tooling
- https://www.npmjs.com/package/@memi-design/cli
