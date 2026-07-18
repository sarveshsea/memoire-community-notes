---
name: swift-testing
description: Build an Apple-platform test strategy with Swift Testing for unit and integration coverage, XCTest for UI automation, deterministic fixtures, and concise agent-readable results.
---

# Swift Testing

## Workflow

1. Identify the behavior contract and the cheapest test layer that proves it.
2. Use Swift Testing for new Swift unit and integration tests when the project toolchain supports it.
3. Keep XCTest and XCUIAutomation for UI tests and existing Objective-C or mixed-language coverage.
4. Isolate time, randomness, persistence, networking, notifications, and device state behind deterministic inputs.
5. Add parameterized cases for meaningful input matrices instead of copy-pasted tests.
6. Test async failure, cancellation, and actor behavior without arbitrary sleeps.
7. Run the smallest suite during iteration and the repository test plan before handoff.

## Test pyramid

- Many fast unit tests for pure behavior and state transitions.
- Fewer integration tests for persistence, networking boundaries, intents, and dependency wiring.
- A small set of stable UI tests for critical user journeys and accessibility identifiers.
- Performance baselines only for paths where regressions matter.

Read [references/commands.md](references/commands.md) for command and result requirements.
