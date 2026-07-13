# Pressure Room — Project Context

Living document for AI-assisted development. Updated after each major feature.

---

## Routes

| Path | Component | Auth | Description |
|---|---|---|---|
| `/` | `LandingPage.jsx` | Public | Public landing page |
| `/login` | `AuthPage.jsx` | Public | Login / signup |
| `/dashboard` | `DashboardPage.jsx` | Protected | User dashboard |
| `/session` | `SessionPage.jsx` | Protected | Active session placeholder |

---

## Completed Features

- JWT auth scaffold (`AuthContext.jsx`, `useAuth.js`, `ProtectedRoute.jsx`)
- Login / signup page (`AuthPage.jsx`, `AuthForm.jsx`)
- Protected dashboard scaffold (`DashboardPage.jsx`, `SessionCard.jsx`)
- Session placeholder page (`SessionPage.jsx`)
- Public landing page at `/` (`LandingPage.jsx`)
- Sticky landing nav with Log In and Start Free CTAs
- Hero section with mock conversation preview
- Social proof marquee strip
- How It Works 3-step section
- Features breakdown section
- Scenario types section
- Final CTA section
- Landing footer
- Smooth scroll navigation between sections
- Fade-in on scroll for feature cards (Intersection Observer)
- CSS animations: marquee, glow-pulse (added to globals.css)
- `cn()` classname utility (`utils/cn.js`)

---

## Current Problems

- Auth uses dummy token flow — backend integration pending
- Session page is a placeholder — conversation loop not built
- CSS variables in `globals.css` are incomplete vs. design system (some components reference vars not yet in `:root`)

---

## Do Not Touch (Working)

- `AuthPage.jsx`, `AuthForm.jsx`, `AuthContext.jsx`, `useAuth.js`, `ProtectedRoute.jsx`
- `DashboardPage.jsx`, `SessionPage.jsx`
- Existing routes other than `/` in `App.jsx`

---

## Design System (Target)

```css
--bg-primary: #0B0B0F
--bg-surface: #12121A
--bg-surface-2: #1A1A25
--border: #1F1F2A
--border-subtle: #2A2A3A
--text-primary: #E5E7EB
--text-secondary: #9CA3AF
--text-muted: #6B7280
--accent: #6366F1
--accent-dim: rgba(99,102,241,0.1)
--danger: #EF4444
--warning: #F59E0B
--success: #22C55E
```

Font: Inter. Tailwind CSS 3. No TypeScript.
