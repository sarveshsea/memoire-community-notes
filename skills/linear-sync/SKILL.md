---
name: linear-sync
description: Linear integration for Mémoire — sync design issues, component specs, and project tracking between Linear and the Mémoire registry
---

# Sync with Linear

Read [the Linear integration guide](references/guide.md). Resolve the team, project, workflow states, labels, source of truth, and authorized write scope first. Use stable external identifiers, validate mapped fields, and make retries idempotent. Do not create duplicate issues or silently overwrite user-authored content. Report created, updated, skipped, and conflicted records with their identifiers.
