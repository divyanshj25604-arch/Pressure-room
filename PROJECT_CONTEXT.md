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
# Pressure Room Project Context

Last analyzed: 2026-06-30 11:59PM

## Project Purpose

Pressure Room is intended to be an AI-powered simulator for high-pressure professional conversations. Users should be able to practice scenarios such as interviews, pitches, presentations, salary negotiations, performance reviews, and workplace conflict. The long-term product loop is:

1. User signs up or logs in.
2. User chooses a practice scenario.
3. App runs a multi-turn AI conversation under pressure.
4. User can speak or type responses.
5. App scores performance with a Caving Index and other metrics.
6. App shows a structured debrief with transcript highlights and improvement suggestions.

The current repository is mostly an authentication and dashboard scaffold. AI conversation, voice input, scoring, debrief, and session history are not wired yet.

## Architecture

The project is split into a FastAPI backend and a React/Vite frontend.

### Backend

- Entry point: `backend/main.py`
- Framework: FastAPI
- Persistence: SQLite through SQLAlchemy ORM
- Auth: JWT bearer tokens using `python-jose`, password hashing using `passlib`/bcrypt
- CORS: currently allows all origins
- Database file: `backend/pressure-room.db`
- Tables created from ORM models at import time via `Base.metadata.create_all(bind=engine)` in `backend/models.py`

Current backend responsibilities:

- Register users
- Login users
- Issue JWT access tokens
- Validate JWTs
- Return basic current-user data
- Intended session create/list endpoints exist, but the create/list code currently has a model import bug described under "Current Problems"

### Frontend

- Entry point: `frontend/src/main.jsx`
- Router: `frontend/src/App.jsx`
- Auth state: `frontend/src/context/AuthContext.jsx`
- API helpers: `frontend/src/api/`
- Styling: Tailwind CSS plus CSS variables in `frontend/src/styles/globals.css`

Current frontend flow:

- `/` redirects to `/login`
- `/login` renders login/signup form
- `/dashboard` is protected and renders the main dashboard
- `/session/new?type=<type>` is protected and renders a placeholder session-start page

`AuthContext` stores the JWT in `localStorage`, verifies it against `GET /me` on page load, and exposes `user`, `token`, `login`, `logout`, and `loading`.

## Folder Structure

```txt
pressure_room/
├── README.md
├── PROJECT_CONTEXT.md
├── .env.example
├── backend/
│   ├── main.py                 # FastAPI app, auth routes, intended session routes
│   ├── database.py             # SQLAlchemy engine/session/Base
│   ├── models.py               # Active ORM models: User, Session
│   ├── schema.sql              # Planned richer schema, not currently applied
│   ├── prompts.py              # Empty placeholder for AI prompt templates
│   ├── requirements.txt        # Python deps, currently UTF-16 encoded
│   ├── .env                    # Contains SECRET_KEY only
│   └── pressure-room.db        # Current SQLite database
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── index.html
    ├── public/
    │   ├── favicon.svg
    │   └── icons.svg
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── api/
        │   ├── auth.js         # Implemented login/register fetch helpers
        │   ├── README.md       # API module notes
        │   ├── sessions.js     # Empty placeholder
        │   ├── chat.js         # Empty placeholder
        │   └── score.js        # Empty placeholder
        ├── context/
        │   └── AuthContext.jsx
        ├── hooks/
        │   ├── useAuth.js
        │   ├── useConfidenceScore.js # Empty placeholder
        │   └── useSpeechInput.js     # Empty placeholder
        ├── pages/
        │   ├── AuthPage.jsx
        │   ├── DashboardPage.jsx
        │   └── SessionPage.jsx
        ├── components/
        │   ├── auth/
        │   │   ├── AuthForm.jsx
        │   │   └── ProtectedRoute.jsx
        │   ├── dashboard/
        │   │   ├── SessionCard.jsx
        │   │   ├── ProgressChart.jsx # Empty placeholder
        │   │   └── StatsStrip.jsx    # Empty placeholder
        │   ├── session/              # Empty placeholders
        │   ├── wizard/               # Empty placeholders
        │   ├── debrief/              # Empty placeholders
        │   └── ui/                   # Button/Modal/Spinner paths exist in tree
        ├── styles/
        │   └── globals.css
        └── utils/
            ├── cn.js                 # Empty placeholder
            └── constants.js          # Empty placeholder
```

## Technologies

### Backend

- Python
- FastAPI
- Uvicorn
- SQLAlchemy
- SQLite
- Pydantic
- `python-dotenv`
- `python-jose`
- `passlib[bcrypt]`
- bcrypt

### Frontend

- React 19
- Vite 8
- React Router DOM 7
- Tailwind CSS 3
- ESLint
- Native `fetch`

### Planned/Referenced But Not Implemented

- Groq LLM API for AI conversation and scoring
- Web Speech API for speech-to-text and text-to-speech
- Caving Index scoring engine
- Debrief visualizations

## Completed Features

- User registration endpoint: `POST /register`
- User login endpoint: `POST /login`
- JWT creation with 7-day expiry
- Password hashing with bcrypt through passlib
- Token verification endpoint: `GET /verify-token/{token}`
- Current-user endpoint: `GET /me`
- SQLite ORM models for `users` and a minimal `sessions` table
- React login/signup page
- Auto-login after signup
- JWT storage in `localStorage`
- Auth verification on app reload
- Protected routes for `/dashboard` and `/session/new`
- Dashboard layout with scenario selector card
- Logout button
- Placeholder session page that reads the `type` query param

## Unfinished Features

- Session creation is not connected from the frontend.
- Session list/history is not implemented.
- "View Past Sessions" button has no behavior.
- `/session/new` only displays `Starting a ... session...`.
- AI conversation engine is not implemented.
- `backend/prompts.py` is empty.
- `frontend/src/api/sessions.js`, `chat.js`, and `score.js` are empty.
- Speech input hook is empty.
- Confidence/Caving scoring hook is empty.
- Session UI components are empty.
- Wizard/setup components are empty.
- Debrief components are empty.
- Dashboard stats/progress components are empty.
- No backend message model exists in active ORM models.
- No active debrief/scoring endpoints exist.
- No automated tests are present.
- No shared frontend API base URL/config exists.

## API Endpoints

### Active Auth Endpoints

#### `POST /register`

Request JSON:

```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password"
}
```

Behavior:

- Checks if email already exists.
- Hashes password after truncating to 72 characters.
- Creates a `users` row.
- Returns the string `"User created successfully"`.

Errors:

- `400` with `Email already registered` if email exists.

#### `POST /login`

Request JSON:

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

Response:

```json
{
  "access_token": "<jwt>",
  "token_type": "bearer"
}
```

Errors:

- `400` with `Incorrect email or password` for invalid credentials.

#### `GET /me`

Headers:

```txt
Authorization: Bearer <jwt>
```

Response:

```json
{
  "email": "user@example.com"
}
```

Note: The backend only returns email. The frontend normalizes missing `name` to `email`.

#### `GET /verify-token/{token}`

Response:

```json
{
  "message": "Token is valid"
}
```

### Intended/Partially Implemented Session Endpoints

#### `POST /sessions`

Defined in `backend/main.py` as:

```python
@app.post("/sessions")
def create_session(session_type: str, user=Depends(get_current_user), db: Session = Depends(get_db)):
```

Intended behavior:

- Create a session for the authenticated user's email.
- Store `session_type`.
- Return the created session.

Current problem:

- This endpoint imports `Session` from `sqlalchemy.orm` and does not import the ORM `Session` model from `models.py`. Calling `Session(...)` here refers to SQLAlchemy's session class/type, not the app model, so this endpoint is likely broken.

#### `GET /sessions`

Defined in `backend/main.py` as:

```python
@app.get("/sessions")
def get_sessions(user=Depends(get_current_user), db: Session = Depends(get_db)):
```

Intended behavior:

- Return sessions for the authenticated user's email.

Current problem:

- Same `Session` naming/import bug as `POST /sessions`.

### Planned But Not Implemented Endpoints

The root `README.md` references these planned endpoints, but they do not exist in `backend/main.py`:

- `POST /session/start`
- `POST /session/{id}/message`
- `GET /session/{id}/debrief`

## Database Schema

There are three schema sources. Treat the ORM models and live SQLite DB as current truth; treat `schema.sql` as a planned blueprint.

### Active ORM Models

Defined in `backend/models.py`.

#### `users`

```txt
id              Integer primary key, indexed
name            String, nullable=False in model
email           String, unique=True, indexed, nullable=False in model
hashed_password String, nullable=False in model
created_at      DateTime, default=datetime.utcnow
```

#### `sessions`

```txt
id           Integer primary key, indexed
user_email   String, indexed
session_type String
created_at   DateTime, default=datetime.utcnow
```

### Live SQLite Schema

Current `backend/pressure-room.db` contains:

```sql
CREATE TABLE users (
  id INTEGER NOT NULL,
  name VARCHAR,
  email VARCHAR,
  hashed_password VARCHAR,
  created_at DATETIME,
  PRIMARY KEY (id)
);

CREATE UNIQUE INDEX ix_users_email ON users (email);
CREATE INDEX ix_users_id ON users (id);

CREATE TABLE sessions (
  id INTEGER NOT NULL,
  user_email VARCHAR,
  session_type VARCHAR,
  created_at DATETIME,
  PRIMARY KEY (id)
);

CREATE INDEX ix_sessions_user_email ON sessions (user_email);
CREATE INDEX ix_sessions_id ON sessions (id);
```

Note: The live DB does not enforce all ORM nullable constraints because the table already exists with nullable columns.

### Planned `schema.sql`

`backend/schema.sql` defines a richer schema:

- `users`: `id`, `username`, `email`, `password`, `created_at`
- `sessions`: `id`, `user_id`, `scenario_type`, `persona`, `difficulty`, `opening_pos`, `walkaway_limit`, `win_condition`, `status`, `caving_index`, `assertiveness`, `clarity`, `composure`, `tone_score`, `feedback_json`, `created_at`
- `messages`: `id`, `session_id`, `sender`, `content`, `speech_pace`, `filler_words`, `hesitations`, `timestamp`

This schema is not applied by the app and does not match current ORM models. It uses text IDs and different column names from the active ORM.

## Important Design Decisions

- The app is currently optimized for a lightweight local demo: SQLite, no external infrastructure, simple JWT auth.
- Auth is implemented directly in `backend/main.py` rather than split into a separate auth module.
- Backend uses email as the JWT subject (`sub`) and as the session owner field in the minimal `sessions` model.
- The frontend stores JWTs in `localStorage`.
- Frontend route protection is client-side via `ProtectedRoute`.
- The UI uses a dark theme with CSS custom properties in `globals.css`.
- Frontend API calls currently hardcode backend URLs:
  - `auth.js` uses `http://localhost:8000`
  - `AuthContext.jsx` uses `http://127.0.0.1:8000`
- Many future-facing files have been created as empty placeholders to reserve structure for session UI, wizard, debrief, scoring, and speech.

## Current Problems

- `POST /sessions` and `GET /sessions` are likely broken because `backend/main.py` imports `Session` from `sqlalchemy.orm` and never imports the `models.Session` ORM model.
- The active ORM schema, live SQLite schema, and `schema.sql` disagree.
- `backend/schema.sql` is not integrated into app startup or migrations.
- There is no migration system.
- `backend/requirements.txt` is UTF-16 little-endian with CRLF line endings; common Python tooling may not parse it correctly.
- `.env.example` is empty even though README documents `SECRET_KEY`, `GROQ_API_KEY`, and `DATABASE_URL`.
- `backend/database.py` hardcodes `sqlite:///pressure-room.db` and ignores `DATABASE_URL`.
- `SECRET_KEY` has no fallback/validation; missing env config may cause JWT operations to fail.
- `backend/.env` contains only `SECRET_KEY`; no Groq key or database URL.
- CORS allows all origins and credentials, which is fine for local prototyping but not production.
- `/me` returns only email, so the frontend cannot recover the user's name after refresh.
- Frontend login/signup error handling uses generic alerts and discards backend error details.
- API base URL is duplicated and inconsistent.
- Dashboard scenario types (`mock`, `pitch`, `presentation`) do not match README's older scenario examples (`salary_negotiation`, `performance_review`, `conflict_resolution`).
- The "View Past Sessions" button is not wired.
- No tests or CI configuration exist.
- No backend validation models exist for sessions, messages, scoring, or debrief.
- No LLM integration exists despite being part of the product purpose.

## Next Milestones

1. Stabilize backend foundations.
   - Rename/import the SQLAlchemy session type to avoid colliding with the app `Session` model.
   - Import the ORM session model explicitly, for example `from models import User, Session as PracticeSession`.
   - Fix `POST /sessions` and `GET /sessions`.
   - Return useful Pydantic response models.

2. Decide the canonical database schema.
   - Either evolve the ORM models to match `schema.sql`, or rewrite `schema.sql` to match ORM.
   - Add a `Message` ORM model.
   - Add fields needed for scenario setup and scoring.
   - Consider Alembic before more schema changes.

3. Clean configuration.
   - Convert `backend/requirements.txt` to normal UTF-8 text.
   - Fill `.env.example`.
   - Read `DATABASE_URL` from environment.
   - Validate `SECRET_KEY` at startup.
   - Create a shared frontend API base URL, preferably using Vite env vars.

4. Implement session lifecycle.
   - Frontend `sessions.js`: create/list/get sessions.
   - Dashboard start button should call backend create session, then navigate to a real session route such as `/session/:id`.
   - Add session history and wire "View Past Sessions".

5. Implement conversation engine.
   - Add prompts in `backend/prompts.py`.
   - Add a message endpoint that stores user messages and AI replies.
   - Integrate Groq or another LLM provider behind a small service module.
   - Keep provider-specific logic out of route handlers.

6. Build the active session UI.
   - Fill `ConversationArea`, `MessageBubble`, and `MicButton`.
   - Support text input first, then speech input.
   - Persist transcript turns.

7. Implement scoring and debrief.
   - Define Caving Index scoring criteria.
   - Store per-turn metrics and session-level metrics.
   - Fill debrief components: transcript heatmap, metric cards, caving index hero, debrief modal.

8. Add tests.
   - Backend tests for auth, token validation, and sessions.
   - Frontend tests for auth flow and protected routing if a test stack is introduced.
   - At minimum, add a smoke test checklist for manual local demo validation.

## Suggested Development Notes For The Next AI

- Start by fixing backend naming collisions before adding new session functionality.
- Do not rely on `schema.sql` as the active DB schema until migrations or ORM alignment are done.
- Keep frontend API contracts small and explicit; introduce `frontend/src/api/client.js` before expanding API modules.
- Prefer building text-based conversation first. Voice can sit on top once message persistence and AI replies work.
- Avoid putting scoring logic directly in frontend hooks. The backend should own authoritative scoring so session history/debrief remains reproducible.
- After editing backend dependencies, verify the virtual environment can install from `backend/requirements.txt`.
- After editing frontend code, run `npm run build` from `frontend/`.
