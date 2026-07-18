---
name: ios-app-intents
description: Design, implement, and verify App Intents, App Entities, App Shortcuts, widgets, Siri, Spotlight, and Apple Intelligence surfaces with stable identity and safe execution.
---

# iOS App Intents

## Workflow

1. Start from a user-visible action that is useful outside the main app.
2. Define parameters, entity identity, lookup/query behavior, confirmation rules, execution mode, cancellation, and result copy before code.
3. Keep identifiers stable across launches and devices when the capability requires continuity.
4. Gate destructive, sensitive, shared, or public changes with the appropriate confirmation and ownership checks.
5. Keep intent execution deterministic and independent from foreground-only UI state.
6. Localize titles, parameter summaries, errors, shortcut phrases, and result dialogs.
7. Verify discovery and execution in each claimed surface, including foreground/background behavior and locked-device constraints.

## Current API caution

Apple's June 2026 App Intents updates add new execution, cancellation, undo, ownership, indexing, and Apple Intelligence integration options. Consult the exact SDK documentation and availability before using them. Do not rename those additions as an iOS version without primary-source evidence.

Read [references/contract.md](references/contract.md) for the intent contract and test matrix.
