---
name: dialkit
description: Add or review DialKit controls when a React, Solid, Svelte, or Vue interface needs live tuning of animation, layout, color, typography, or component parameters.
---

# Use DialKit

Use DialKit to expose high-leverage design parameters while developing an interface. Treat the panel as a temporary tuning surface unless the product explicitly needs end-user controls.

## Setup

1. Confirm the framework and current DialKit package API from the [official repository](https://github.com/joshpuckett/dialkit).
2. Install the documented peer dependencies for the current version.
3. Mount one root panel at the application shell.
4. Wrap related controls in a focused hook with a stable panel name.
5. Give numeric controls deliberate defaults, bounds, and steps.
6. Use stable IDs and persistence only when values must survive remounts or navigation.

```tsx
import { useDialKit } from "dialkit";

export function useCardDials() {
  return useDialKit("Card", {
    radius: [16, 0, 48, 1],
    scale: [1, 0.9, 1.1, 0.01],
    shadow: true,
  });
}
```

## Tuning protocol

1. Start from the product's existing tokens, not arbitrary extremes.
2. Change one perceptual dimension at a time.
3. Exercise realistic content, responsive widths, pointer and keyboard input, and reduced motion.
4. Record the chosen values in the design tokens or component API.
5. Remove unused panels and controls before production unless they are intentional tooling.

## Guardrails

- Do not expose secrets, personal data, or privileged actions through a tuning panel.
- Do not let persisted experimental values silently override production defaults.
- Do not use live controls as a substitute for accessibility and interaction tests.
- Do not copy Interface Craft's paid curriculum into project documentation. Link to it as an external learning resource.

This workflow is an original adaptation of Josh Puckett's MIT-licensed DialKit documentation and codebase.
