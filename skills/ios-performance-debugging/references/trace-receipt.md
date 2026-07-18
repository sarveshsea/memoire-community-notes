# Performance Trace Receipt

Include:

- Scenario and expected endpoint.
- Device or simulator, OS, build configuration, and commit.
- Instrument/template and trace path.
- Baseline metric and optimized metric with units.
- Source-level cause supported by the trace.
- Code change and regression test or benchmark.
- Remaining variance and untested hardware assumptions.

For SwiftUI, capture update groups, long view body updates, platform view updates, and hitches. Apple documents long body updates above 500 microseconds as noteworthy in the current SwiftUI Instruments workflow; use the actual trace rather than treating that threshold as a universal product budget.

Primary reference: https://developer.apple.com/documentation/xcode/understanding-and-improving-swiftui-performance
