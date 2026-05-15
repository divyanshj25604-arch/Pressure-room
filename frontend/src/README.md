# Frontend Source Guide

This directory contains the React application code for Pressure Room.

The current implementation is intentionally small: authentication, protected routing, a dashboard, and a placeholder session page. Several folders are already laid out for the planned product, but many files are still empty placeholders.

## Runtime Boundaries

- `main.jsx` owns React root creation and top-level providers.
- `App.jsx` owns route registration.
- `context/` owns app-wide state that needs to be shared across pages.
- `pages/` owns route-level screens.
- `components/` owns reusable UI pieces used by pages.
- `api/` owns backend HTTP calls.
- `hooks/` owns reusable React logic.
- `styles/` owns global CSS, Tailwind imports, and theme variables.

## Data Flow

```txt
main.jsx
  -> AuthProvider
    -> App.jsx routes
      -> pages
        -> components
        -> hooks
        -> api modules
```

Auth is the only complete data flow today:

```txt
AuthPage
  -> AuthForm
  -> api/auth.js
  -> backend /login or /register
  -> AuthContext.login()
  -> localStorage token
  -> ProtectedRoute
```

## Implementation Status

| Area | Status | Notes |
| --- | --- | --- |
| Auth | Implemented | Login, signup, token persistence, logout |
| Dashboard | Partial | Session type selection and navigation only |
| Session runtime | Placeholder | No chat/session API integration yet |
| Session setup wizard | Placeholder | Files exist but no implementation |
| Debrief | Placeholder | Files exist but no implementation |
| Speech input | Placeholder | Hook exists but no implementation |
| Score/confidence logic | Placeholder | Hook/API files exist but no implementation |
| Shared UI primitives | Placeholder | Button, Modal, Spinner are empty |

## Conventions

- Keep backend calls inside `src/api`.
- Keep route-level async orchestration in `src/pages`.
- Keep reusable view-only pieces in `src/components`.
- Keep cross-cutting state in `src/context`.
- Prefer Tailwind utility classes and the CSS variables from `styles/globals.css`.
- Avoid hardcoding new backend URLs in components; introduce a shared API client before adding more endpoints.

## Before Adding New Features

1. Check whether a placeholder file already exists for the feature.
2. Wire backend calls through `src/api`.
3. Keep route navigation in `App.jsx` or the relevant page.
4. Add shared UI behavior to `components/ui` only when multiple features need it.
5. Update `frontend/README.md` when routes, APIs, setup, or major behavior changes.
