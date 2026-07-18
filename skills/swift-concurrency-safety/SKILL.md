---
name: swift-concurrency-safety
description: Design and review Swift 6 concurrency boundaries using structured tasks, actors, Sendable values, cancellation, and compiler-backed data-race safety.
---

# Swift Concurrency Safety

Use this skill for async features, Swift 6 migration, actor-isolation errors, Sendable warnings, task cancellation, or UI work that crosses concurrency domains.

## Workflow

1. Record the target's Swift language mode and concurrency-checking settings.
2. Map mutable state and its owner before adding tasks or annotations.
3. Keep UI state on the main actor. Move long-running work behind async service boundaries instead of blocking the actor.
4. Prefer structured child tasks. Use detached or unstructured tasks only when lifetime and cancellation are explicitly owned.
5. Pass immutable Sendable values across isolation boundaries. Do not hide warnings with unchecked conformance until invariants are documented and tested.
6. Propagate cancellation and define what partial work is rolled back or retained.
7. Compile with the project's strictest supported concurrency checks and test ordering, cancellation, failure, and reentrancy.

## Review failures

- Actor annotations added only to silence diagnostics.
- `Task {}` used as an ownership escape hatch.
- UI-observable models mutated off the main actor.
- Mutable reference types crossing actors without an isolation plan.
- Continuations that can resume twice or never resume.
- Async APIs with no cancellation or timeout behavior.

Read [references/migration.md](references/migration.md) before changing language mode or performing a broad migration.
