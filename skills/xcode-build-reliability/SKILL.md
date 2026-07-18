---
name: xcode-build-reliability
description: Make Xcode builds agent-verifiable with deterministic scheme discovery, concise logs, explicit destinations, stable scripts, build-time evidence, and CI parity.
---

# Xcode Build Reliability

## Workflow

1. Discover the workspace/project and shared schemes with `xcodebuild -list -json`; never guess names.
2. Inspect build settings for the selected scheme and configuration.
3. Pin an explicit simulator destination or generic device destination.
4. Put canonical commands in an existing Makefile, script, or task runner only when the repository lacks one. Keep local and CI commands aligned.
5. Pipe output through `xcbeautify` when installed, while preserving `pipefail` and the original `xcodebuild` exit status.
6. Store DerivedData and result bundles in known paths for repeatability and cleanup.
7. Measure build-time work before changing settings. Avoid global optimizations that weaken correctness or diagnostics.
8. End with a clean build, incremental build, test, and archive/signing status receipt as applicable.

## Safety

- Do not delete shared signing, provisioning, or project settings to make a local build pass.
- Do not add generated user data or local absolute paths to source control.
- Do not change warnings or concurrency errors into ignored diagnostics.
- Do not claim archive, signing, notarization, or App Store readiness from a simulator build.

Read [references/command-contract.md](references/command-contract.md) for the shell contract.
