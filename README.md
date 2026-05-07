# Pressure Room

**AI-powered conversation simulator for high-stakes professional situations.**

Pressure Room is a React + FastAPI project prototype for practicing difficult conversations under pressure. The current codebase supports user authentication, a protected dashboard, session type selection, and a session flow scaffold.

## What This Repository Contains

- **Frontend:** React app built with Vite, Tailwind CSS, and React Router
- **Backend:** FastAPI service with JWT-based login and SQLite persistence
- **Authentication:** login and registration flows with token storage in `localStorage`
- **Session scaffold:** dashboard session selector and protected `/session/new` page
- **Project scaffolding:** support for chat, scoring, session tracking, and debrief UI components

## Tech Stack

- Frontend: React 19, Vite, Tailwind CSS, React Router DOM
- Backend: FastAPI, SQLAlchemy, SQLite, passlib, python-jose
- Auth: OAuth2 Password flow + JWT
- Database: SQLite via SQLAlchemy

## Architecture Overview

```text
Frontend (React + Vite)
        |
Backend (FastAPI + SQLite)
```

### Flow

1. `AuthPage` handles login and signup with `AuthForm`
2. Successful auth stores a JWT token in `localStorage`
3. `ProtectedRoute` guards `/dashboard` and `/session/new`
4. `DashboardPage` renders a session type selector and start button
5. Selecting a type updates the state passed into `SessionCard`
6. The session start button navigates to `/session/new?type=...`

## Installation

### Backend

```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Then open `http://127.0.0.1:5173` in your browser.

## Available Scripts

### Frontend

- `npm run dev` � start the development server
- `npm run build` � build production assets
- `npm run preview` � preview the production build
- `npm run lint` � run ESLint over the frontend code

### Backend

- `uvicorn main:app --reload` � start the FastAPI server

## Backend API Endpoints

- `POST /register` � create a new user
- `POST /login` � authenticate a user and return a JWT token
- `GET /me` � validate the current JWT and return user info
- `GET /verify-token/{token}` � verify a JWT token

## Database

The backend uses SQLite via `backend/database.py`. The current model includes:

- `User` � stores name, email, hashed password, and created timestamp

`backend/schema.sql` also includes schema definitions for future session and message tracking tables.

## Frontend Structure

- `src/pages/AuthPage.jsx` � login/signup page with auth form
- `src/pages/DashboardPage.jsx` � protected dashboard view
- `src/pages/SessionPage.jsx` � session start page using query params
- `src/components/auth/AuthForm.jsx` � reusable login/signup form
- `src/components/dashboard/SessionCard.jsx` � session type selector card
- `src/context/AuthContext.jsx` � auth state and token management
- `src/hooks/useAuth.js` � auth context hook
- `src/api/auth.js` � frontend auth API helpers

## Notes and Current Scope

- Authentication is implemented, but the chat/session engine is currently scaffolded.
- The session start flow uses URL query params to pass the selected `type`.
- `prompts.py` exists as a placeholder for AI prompt templates and future conversation logic.
- `schema.sql` is included as a database blueprint for session tracking and messaging.

## Contribution

If you want to extend this project, the next priorities are:

- wire the AI conversation flow and chat API
- persist session and message history
- implement scoring / debriefing logic
- expand the dashboard with real analytics

## Contact

For issues or improvements, open a GitHub issue or submit a pull request.
