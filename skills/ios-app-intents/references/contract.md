# App Intent Contract

Record:

1. User phrase and visible outcome.
2. Parameters, defaults, and validation.
3. AppEntity identity and query source.
4. Foreground/background/extension execution target.
5. Authentication, ownership, confirmation, and destructive-action policy.
6. Cancellation, timeout, undo, and retry behavior.
7. Localized success and failure results.
8. Siri, Shortcuts, Spotlight, widget, and Apple Intelligence surfaces actually supported.

Test the intent implementation directly, then verify at least one end-user system surface. A compiling intent is not proof that shortcut discovery or entity resolution works.

Primary references:

- https://developer.apple.com/documentation/appintents
- https://developer.apple.com/documentation/updates/appintents
