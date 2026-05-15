# Hooks

Hooks hold reusable React behavior.

## Current Hooks

| File | Status | Purpose |
| --- | --- | --- |
| `useAuth.js` | Implemented | Reads `AuthContext` and enforces provider usage |
| `useSpeechInput.js` | Placeholder | Planned browser Web Speech API wrapper |
| `useConfidenceScore.js` | Placeholder | Planned local confidence metrics such as filler words and hesitations |

## Guidance

- Hooks should not render UI.
- Hooks may call API modules when they encapsulate reusable behavior.
- Route-specific orchestration should usually stay in page components unless it is shared.
