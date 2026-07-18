---
name: swiftui-liquid-glass
description: Adopt or audit iOS 26+ SwiftUI Liquid Glass with native APIs, correct availability fallbacks, restrained hierarchy, accessibility, and measured rendering performance.
---

# SwiftUI Liquid Glass

Use Liquid Glass as system chrome and interaction hierarchy, not as a decorative coating for every surface.

## Workflow

1. Confirm the build SDK and minimum deployment target. Liquid Glass APIs require an iOS 26+ availability path.
2. Identify the small set of controls or floating surfaces that need separation from content.
3. Prefer system navigation, tab, toolbar, search, and button behavior before custom glass.
4. Apply layout, shape, and content modifiers before the glass effect.
5. Group nearby custom glass elements in `GlassEffectContainer` so they render and morph coherently.
6. Mark glass interactive only when the element actually accepts input.
7. Provide an earlier-OS fallback using native materials or standard controls, not a visual imitation that changes behavior.
8. Verify increased contrast, reduced transparency, reduced motion, Dynamic Type, dark appearance, and scrolling performance.

## Guardrails

- Keep content legible without depending on the background image or color.
- Avoid stacking translucent layers.
- Preserve system hit regions, focus, and semantic roles.
- Use morphing identifiers only for a real hierarchy transition.
- Profile repeated custom glass in scroll-heavy layouts.
- Do not label June 2026 APIs as iOS 27 unless the checked Apple SDK documentation explicitly does so.

Read [references/review.md](references/review.md) for the audit matrix and fallback pattern.
