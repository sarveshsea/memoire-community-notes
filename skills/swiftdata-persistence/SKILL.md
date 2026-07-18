---
name: swiftdata-persistence
description: Design and review SwiftData schemas, queries, migrations, isolation, CloudKit assumptions, offline behavior, and deterministic persistence tests.
---

# SwiftData Persistence

## Workflow

1. Define ownership, retention, uniqueness, relationships, deletion behavior, and sync expectations before writing models.
2. Confirm minimum OS and current SwiftData API availability.
3. Keep persistence models separate from view-specific formatting and transient UI state.
4. Design schema changes with an explicit migration and rollback story. Never infer that production data can be discarded.
5. Place model-context work behind a clear actor boundary and avoid passing live mutable models across isolation domains.
6. Use indexed or constrained fields for actual query and uniqueness needs, not speculative optimization.
7. Test with isolated temporary or in-memory containers. Cover migration, relationship deletion, duplicate prevention, ordering, and failure recovery.
8. Treat CloudKit compatibility and conflict behavior as separate proof from local persistence.

Read [references/schema-review.md](references/schema-review.md) before changing an existing store.
