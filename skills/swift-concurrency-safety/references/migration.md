# Swift 6 Migration

## Incremental sequence

1. Capture a clean build and test baseline.
2. Enable complete concurrency checking for one target while retaining the current language mode.
3. Group diagnostics by ownership boundary instead of fixing files in arbitrary order.
4. Make shared values Sendable or isolate them behind an actor.
5. Repair callback bridges with checked continuations and cancellation handling.
6. Turn warnings into errors in CI for the migrated target.
7. Switch that target to Swift 6 language mode only after diagnostics are clean.

## Evidence

The handoff must include changed build settings, remaining warnings, tests covering cancellation and races, and any `nonisolated`, `@preconcurrency`, or `@unchecked Sendable` exception with its invariant.

Primary reference: https://www.swift.org/migration/
