# Pages

Pages are route-level components. They compose components, call hooks, and orchestrate navigation.

## Current Pages

| Page | Route | Status | Purpose |
| --- | --- | --- | --- |
| `AuthPage.jsx` | `/login` | Implemented | Login/signup behavior and navigation |
| `DashboardPage.jsx` | `/dashboard` | Partial | Authenticated landing page and session type selection |
| `SessionPage.jsx` | `/session/new` | Placeholder | Reads `type` from query params and displays a startup message |

## Guidance

- Keep routing definitions in `App.jsx`.
- Keep page-specific layout here.
- Use components for repeated UI pieces.
- Use `src/api` modules for backend calls instead of calling `fetch` directly in deeply nested components.
