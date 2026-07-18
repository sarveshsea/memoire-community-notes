# Xcode Command Contract

A repository command must specify:

- workspace or project
- shared scheme
- configuration when non-default
- destination
- DerivedData path
- result bundle path for tests
- formatter behavior without masking the build exit code

Example shape:

```sh
set -o pipefail
xcodebuild build \
  -project App.xcodeproj \
  -scheme App \
  -configuration Debug \
  -destination 'platform=iOS Simulator,name=iPhone 16 Pro' \
  -derivedDataPath .build/DerivedData \
  | xcbeautify
```

If `xcbeautify` is unavailable, run `xcodebuild` directly. A formatter is not a build dependency.

Use `xcodebuild -showBuildTimingSummary` or a current Xcode timing/reporting surface to identify expensive phases before changing compilation settings.
