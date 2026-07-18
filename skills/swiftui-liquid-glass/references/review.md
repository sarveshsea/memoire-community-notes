# Liquid Glass Review

## Audit matrix

| Check | Pass condition |
| --- | --- |
| Availability | New API is inside a compile-safe iOS 26+ branch |
| Fallback | Earlier systems retain the same action and information hierarchy |
| Grouping | Related custom effects share a `GlassEffectContainer` |
| Modifier order | Layout and content styling precede the glass modifier |
| Interactivity | Only interactive elements opt into interactive glass |
| Accessibility | Contrast, transparency, motion, type size, and VoiceOver are verified |
| Performance | Scroll and transition paths are profiled when glass repeats |

## Fallback shape

Keep the branch local and preserve one content definition:

```swift
@ViewBuilder
private var controlSurface: some View {
    if #available(iOS 26, *) {
        content.glassEffect()
    } else {
        content.background(.regularMaterial, in: Capsule())
    }
}
```

Consult current Apple documentation for exact API signatures before editing production code:

- https://developer.apple.com/documentation/swiftui/glasseffectcontainer
- https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass
