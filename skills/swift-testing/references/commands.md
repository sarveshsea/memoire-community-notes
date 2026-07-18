# Test Commands and Receipts

Prefer a shared scheme and checked-in test plan when the project has them.

```sh
xcodebuild test \
  -scheme App \
  -project App.xcodeproj \
  -destination 'platform=iOS Simulator,name=iPhone 16 Pro' \
  -resultBundlePath .build/TestResults.xcresult
```

For Swift packages:

```sh
swift test --parallel
```

The receipt must state the scheme/package, destination, selected test plan, pass/fail counts, result bundle path, and any skipped tests. Never summarize a command that was not executed as passing.

Primary references:

- https://developer.apple.com/documentation/xcode/testing
- https://developer.apple.com/documentation/testing
