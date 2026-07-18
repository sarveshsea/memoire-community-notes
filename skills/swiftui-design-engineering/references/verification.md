# SwiftUI Verification Reference

## State matrix

Cover the states that can materially change layout or behavior:

| Dimension | Minimum proof |
| --- | --- |
| Data | loading, empty, populated, error |
| Type | default and an accessibility Dynamic Type size |
| Appearance | light and dark |
| Direction | left-to-right and right-to-left when localized |
| Device | smallest supported phone and one large device |
| Input | touch, keyboard/focus where supported, VoiceOver labels |
| Motion | normal and Reduce Motion behavior |

## Source organization

- Keep the root screen responsible for composition and feature state ownership.
- Extract subviews when they have a meaningful role, repeated structure, independent state, or expensive rendering.
- Keep models and services independent of SwiftUI where practical.
- Prefer feature folders over global folders by file type when the repository already uses that convention.
- Preserve existing architecture. Do not introduce a new global router or dependency container for one screen.

## Verification receipt

Report:

1. Deployment target and Swift language mode.
2. Files created or changed.
3. Build command and result.
4. Unit and UI test commands and results.
5. Simulator device and critical flow exercised.
6. Accessibility and appearance states checked.
7. Newer APIs used, their availability gates, and fallback behavior.
8. Remaining unverified claims.

Useful first commands:

```sh
xcodebuild -list -json -project App.xcodeproj
xcodebuild -showBuildSettings -scheme App -project App.xcodeproj
xcrun simctl list devices available
```
