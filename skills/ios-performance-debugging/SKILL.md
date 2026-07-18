---
name: ios-performance-debugging
description: Diagnose SwiftUI rendering, launch, responsiveness, concurrency, memory, energy, and simulator failures using reproducible traces and before-after evidence.
---

# iOS Performance Debugging

## Workflow

1. Define one reproducible user flow and one metric before changing code.
2. Capture device, OS, build configuration, commit, data fixture, and baseline trace.
3. Use the narrowest instrument: SwiftUI updates and hitches, Time Profiler, Allocations/Leaks, Network, Energy, or concurrency analysis.
4. Correlate the trace to source. Do not optimize from intuition alone.
5. Change one ownership, identity, layout, allocation, or scheduling cause at a time.
6. Repeat the same flow and compare the same metric.
7. Keep the trace, command, and before-after result in the handoff.

## SwiftUI checks

- Stable identity in collections.
- Observation scoped to data the view actually reads.
- No expensive formatting, filtering, I/O, or object creation in `body`.
- Lazy containers used only where they fit the layout.
- Image decoding and resizing moved off the render-critical path.
- Navigation and sheet state represented by one source of truth.

Read [references/trace-receipt.md](references/trace-receipt.md) before claiming a performance improvement.
