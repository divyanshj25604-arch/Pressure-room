# API Modules

This folder should contain frontend wrappers around backend HTTP endpoints.

Only `auth.js` is implemented today. The other files are placeholders for planned Pressure Room features.

## Current Modules

| File | Status | Purpose |
| --- | --- | --- |
| `auth.js` | Implemented | Login and registration calls |
| `sessions.js` | Placeholder | Create, list, fetch, and update practice sessions |
| `chat.js` | Placeholder | Send user turns and receive AI replies |
| `score.js` | Placeholder | Trigger scoring and fetch debrief results |

## Current Backend Base URL

The implemented auth calls use:

```txt
http://localhost:8000
```

Before adding more API files, consider creating one shared API client or config module so the base URL is not duplicated across the codebase.

## Error Handling

The current `auth.js` functions throw generic errors when `res.ok` is false. Future API modules should preserve useful backend error messages where possible, especially for validation and session creation failures.
