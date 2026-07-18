# SwiftData Schema Review

Capture this before editing:

- Current schema versions and migration stages.
- Persistent identifiers and uniqueness assumptions.
- Optionality and default-value changes.
- Relationship cardinality, inverse, and delete rules.
- Queries that need indexes or stable sorting.
- CloudKit constraints and offline conflict policy.
- Export, backup, or destructive-reset policy.

Verification needs a fixture created with the old schema, migration into the new schema, content assertions, and a second launch/open. Local tests do not prove CloudKit synchronization.

Primary references:

- https://developer.apple.com/documentation/swiftdata
- https://developer.apple.com/documentation/updates/swiftdata
