---
name: mobile-craft
description: Mobile-first design mastery — touch targets, gesture patterns, responsive breakpoints, native-feel animations, thumb zones, platform conventions (iOS/Android), and progressive enhancement strategies
---

# Mobile craft

Read [the mobile design guide](references/guide.md). Start from the target platforms, device classes, input modes, and critical user journeys. Protect touch-target size, gesture discoverability, safe areas, keyboard behavior, loading and recovery states, and reduced motion. Reuse platform and product primitives before inventing controls. Verify on representative small and large viewports and, when possible, real devices.

## Platform routing

- For native SwiftUI work, load `swiftui-design-engineering` first.
- Add `swiftui-liquid-glass` only when the feature uses iOS 26+ glass APIs.
- Add `ios-app-intents` for Siri, Shortcuts, Spotlight, widgets, or Apple Intelligence surfaces.
- Add `swiftdata-persistence`, `swift-concurrency-safety`, or `swift-testing` only when the feature crosses those boundaries.
- Use `xcode-build-reliability` and `ios-performance-debugging` for build, simulator, trace, and release proof.

Do not translate web breakpoints, hover behavior, or ARIA patterns directly into native iOS code. Preserve the shared product intent, then use Apple platform controls, Dynamic Type, VoiceOver, safe areas, and navigation conventions.
