# Pressure Room

AI-powered simulator for high-stakes professional conversations. Practice salary negotiations, performance reviews, and difficult workplace scenarios before they happen.

> **Current status:** Auth and session scaffold are complete. AI conversation engine, scoring, and debrief are in active development.

---

## Overview

Pressure Room puts users in multi-turn conversations with an AI counterpart trained to simulate real professional pressure. After each session, a **Caving Index** score and structured debrief show where the user held firm and where they conceded unnecessarily.

Built with React + FastAPI. Designed to be fast, voice-capable, and deployable as a demo without infrastructure overhead.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS, React Router DOM |
| Backend | FastAPI, SQLAlchemy, SQLite |
| Auth | OAuth2 Password flow, JWT (python-jose), passlib |
| LLM (planned) | Groq (LLaMA 3 / Mixtral) |
| Speech (planned) | Web Speech API |
| Database | SQLite via SQLAlchemy |

---

## Project Structure

```
Pressure-room/
├── backend/
│   ├── main.py              # FastAPI app, all route definitions
│   ├── models.py            # SQLAlchemy ORM models (User, Session, Message)
│   ├── database.py          # DB engine, session factory
│   ├── auth.py              # JWT creation, verification, password hashing
│   ├── prompts.py           # Placeholder for AI prompt templates
│   ├── schema.sql           # DB blueprint including sessions and messages tables
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── auth.js              # Auth API helpers (login, register, me)
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   └── AuthForm.jsx     # Reusable login/signup form
│   │   │   └── dashboard/
│   │   │       └── SessionCard.jsx  # Session type selector card
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Auth state, token management
│   │   ├── hooks/
│   │   │   └── useAuth.js           # Auth context hook
│   │   ├── pages/
│   │   │   ├── AuthPage.jsx         # Login / signup page
│   │   │   ├── DashboardPage.jsx    # Protected dashboard
│   │   │   └── SessionPage.jsx      # Session start page (reads ?type= from URL)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── .env.example
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- Python >= 3.10
- A Groq API key ([get one here](https://console.groq.com)) — required once AI features are wired

### 1. Clone

```bash
git clone https://github.com/divyanshj25604-arch/Pressure-room.git
cd Pressure-room
```

### 2. Backend

```bash
cd backend
python -m venv venv

# macOS / Linux
source venv/bin/activate

# Windows
venv\Scripts\activate

pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Backend runs at `http://127.0.0.1:8000`  
Interactive API docs at `http://127.0.0.1:8000/docs`

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://127.0.0.1:5173`

---

## Environment Variables

Copy `.env.example` to `.env` in the root and `backend/` directory.

**Backend `.env`**

```env
SECRET_KEY=your_jwt_secret_key
GROQ_API_KEY=your_groq_api_key         # Required once AI is wired
DATABASE_URL=sqlite:///./pressureroom.db
```

---

## API Reference

### Auth

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/register` | Create a new user |
| `POST` | `/login` | Authenticate, return JWT |
| `GET` | `/me` | Validate JWT, return user info |
| `GET` | `/verify-token/{token}` | Verify a JWT token |

### Session (scaffolded, not yet active)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/session/start` | Start a new session |
| `POST` | `/session/{id}/message` | Send a user message, get AI reply |
| `GET` | `/session/{id}/debrief` | Get scored debrief for a completed session |

---

## Auth Flow

```
AuthPage
  └── AuthForm (login / register)
        └── On success → JWT stored in localStorage
              └── ProtectedRoute guards /dashboard and /session/new
                    └── DashboardPage → SessionCard (type selector)
                          └── Navigate to /session/new?type=<selected>
```

Token is managed in `AuthContext`. The `useAuth` hook exposes `user`, `token`, `login`, and `logout` to all components.

---

## Database Schema

**Currently active**

```sql
users (id, name, email, hashed_password, created_at)
```

**Planned (defined in schema.sql)**

```sql
sessions (id, user_id, scenario_type, started_at, ended_at, caving_index)
messages (id, session_id, role, content, turn_score, timestamp)
```

---

## Session Types

| Type | AI Role | Pressure Mode |
|---|---|---|
| `salary_negotiation` | Hiring manager | Anchoring, budget pushback |
| `performance_review` | Direct manager | Criticism, ratings dispute |
| `conflict_resolution` | Difficult colleague | Blame-shifting, deflection |

Scenario prompts will live in `backend/prompts.py`.

---

## Caving Index (Planned)

A session-level score from 0 to 100 measuring how much the user conceded under pressure.

| Range | Signal |
|---|---|
| 0-30 | Held position consistently |
| 31-60 | Mixed. Some unnecessary concessions. |
| 61-80 | Caved on multiple key points. |
| 81-100 | Collapsed early. Needs practice. |

Calculated by the LLM scoring each user turn for hedging language, unprompted backtracking, and concession signals. Weighted average across all turns in the session.

---

## Roadmap

**Done**
- [x] User registration and login
- [x] JWT auth with protected routes
- [x] Dashboard with session type selector
- [x] Session page scaffold with URL param routing
- [x] SQLite persistence with schema for sessions and messages

**In progress**
- [ ] Groq AI conversation engine (`prompts.py` + `/session/message` endpoint)
- [ ] Web Speech API integration (STT + TTS, browser-native)
- [ ] Turn-by-turn scoring from LLM response metadata

**Planned**
- [ ] Caving Index calculation and display
- [ ] Debrief view with per-turn breakdown and alternative response suggestions
- [ ] Session history on dashboard
- [ ] Shareable session report

---

## Available Scripts

### Frontend

| Command | Action |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Backend

| Command | Action |
|---|---|
| `uvicorn main:app --reload` | Start dev server with hot reload |
| `uvicorn main:app` | Start production server |

---

## Contributing

Before opening a PR, check the open issues. Current priorities:

1. Wire AI conversation flow (`prompts.py` + `/session/message` endpoint)
2. Integrate Web Speech API for voice input and output
3. Implement Caving Index scoring logic
4. Build debrief UI with per-turn analysis
5. Add session history to dashboard

Open an issue before starting work on any major feature.

---

## License

MIT

---

## Contact

Open an issue or submit a pull request on [GitHub](https://github.com/divyanshj25604-arch/Pressure-room).