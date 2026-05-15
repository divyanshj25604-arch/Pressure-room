# Components

Components are grouped by product area.

## Folders

| Folder | Status | Purpose |
| --- | --- | --- |
| `auth/` | Implemented | Login/signup form and route guard |
| `dashboard/` | Partial | Dashboard widgets and session entry controls |
| `session/` | Placeholder | Live conversation UI |
| `wizard/` | Placeholder | New-session setup flow |
| `debrief/` | Placeholder | Post-session feedback and scoring UI |
| `ui/` | Placeholder | Shared primitives such as buttons and modals |

## Guidance

- Put route-specific layout in `src/pages`, not here.
- Put reusable product UI here.
- Keep backend calls out of components when possible; page components or hooks should orchestrate API calls.
- Build shared primitives in `ui/` only when at least two places need the same behavior or styling.
- Keep placeholder files empty until implementation starts, or add a minimal export once another module imports them.
