# Pressure Room

**AI-powered conversation simulator for high-stakes professional situations.**

You pick a scenario. The AI becomes a difficult counterpart. You respond under real pressure. Then the system tells you exactly where you folded.

---

## The Problem

Most people are technically competent but fall apart in hard conversations. They concede too early, over-apologize, or lose control of the framing. The gap isn't knowledge — it's practice. And most people avoid practicing precisely because it's uncomfortable.

Pressure Room closes that gap by putting you in the discomfort directly.

---

## What It Does

- Simulates high-stakes scenarios: salary negotiations, performance reviews, conflict conversations
- AI personas behave like real difficult counterparts — aggressive, dismissive, impatient
- Dynamic tactics: interruptions, lowballing, guilt-tripping, reframing
- Tracks how you perform with a **Caving Index** — a core metric that measures how much you fold
- Delivers structured post-session feedback with clear improvement actions

---

## Core Features

### Pressure Engine
- Multiple AI persona behaviors (aggressive, dismissive, impatient)
- Real-time conversational friction — no polite chatbot behavior
- Dynamic tactics that respond to what you say

### Caving Index
Measures how much you gave ground under pressure. Tracks:
- Unnecessary concessions
- Weak or hedging language
- Over-apologizing
- Deviation from your stated goal

### Post-Session Analysis
- Structured feedback broken down by dimension
- Identified strengths and key weaknesses
- One concrete improvement action per session

### Performance Dashboard
- Session scores over time
- Trend tracking across dimensions
- Visual analytics via Recharts

---

## Example Output

```json
{
  "caving_index": 85,
  "assertiveness": 40,
  "clarity": 90,
  "composure": 60,
  "feedback_summary": "You dropped your position too early.",
  "key_weakness": "Over-apologizing",
  "improvement_action": "Pause before responding to objections."
}
```

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| Speech Input | Web Speech API (browser-native, no cost) |
| Data Visualization | Recharts |
| Backend | FastAPI (async) |
| Database | SQLite |
| AI Layer | Groq (7B/70B) |

---

## Architecture

```
Frontend (React + Vite)
        ↓
FastAPI Backend
        ↓
AI Layer (LLM routing)
        ↓
SQLite Database
```

- FastAPI handles chat requests and evaluation pipelines
- Conversation and analysis use separate model calls for speed vs. depth
- SQLite stores users, sessions, and full transcripts
- Voice input transcribed client-side via Web Speech API, then POSTed to backend for storage alongside typed turns

---

## Project Structure

```
pressure-room/
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx                    [FILE] — entry point
│   │   ├── App.jsx                     [FILE] — routes only
│   │   │
│   │   ├── pages/
│   │   │   ├── AuthPage.jsx            [FILE] — login + signup tabs
│   │   │   ├── DashboardPage.jsx       [FILE] — home, history, charts
│   │   │   └── SessionPage.jsx         [FILE] — active sim + debrief
│   │   │
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   └── AuthForm.jsx        [FILE] — shared login/signup form
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── StatsStrip.jsx      [FILE] — 3 summary cards
│   │   │   │   ├── SessionCard.jsx     [FILE] — single history entry
│   │   │   │   └── ProgressChart.jsx   [FILE] — Recharts line + radar
│   │   │   │
│   │   │   ├── wizard/
│   │   │   │   ├── WizardModal.jsx     [FILE] — modal shell + step state
│   │   │   │   ├── StepScenario.jsx    [FILE]
│   │   │   │   ├── StepGoal.jsx        [FILE]
│   │   │   │   ├── StepPersona.jsx     [FILE]
│   │   │   │   └── StepDifficulty.jsx  [FILE]
│   │   │   │
│   │   │   ├── session/
│   │   │   │   ├── ConversationArea.jsx [FILE] — message thread
│   │   │   │   ├── MessageBubble.jsx    [FILE] — user + AI bubbles
│   │   │   │   └── MicButton.jsx        [FILE] — 4-state mic control
│   │   │   │
│   │   │   ├── debrief/
│   │   │   │   ├── DebriefModal.jsx     [FILE] — full debrief view
│   │   │   │   ├── CavingIndexHero.jsx  [FILE] — big score display
│   │   │   │   ├── MetricCards.jsx      [FILE] — 4 score cards
│   │   │   │   └── TranscriptHeatmap.jsx [FILE] — highlighted transcript
│   │   │   │
│   │   │   └── ui/
│   │   │       ├── Button.jsx           [FILE]
│   │   │       ├── Modal.jsx            [FILE]
│   │   │       └── Spinner.jsx          [FILE]
│   │   │
│   │   ├── hooks/
│   │   │   ├── useSpeechInput.js       [FILE] — Web Speech API wrapper
│   │   │   └── useConfidenceScore.js   [FILE] — filler words, pace, hesitations
│   │   │
│   │   ├── api/
│   │   │   ├── auth.js                 [FILE] — signup, login
│   │   │   ├── sessions.js             [FILE] — create, fetch, list
│   │   │   ├── chat.js                 [FILE] — send message, get AI reply
│   │   │   └── score.js                [FILE] — trigger scoring, get debrief
│   │   │
│   │   ├── utils/
│   │   │   ├── constants.js            [FILE] — scenarios, personas, difficulty
│   │   │   └── cn.js                   [FILE] — classname helper (3 lines)
│   │   │
│   │   └── styles/
│   │       └── globals.css             [FILE] — Tailwind imports + CSS vars
│   │
│   ├── index.html                      [GEN]
│   ├── vite.config.js                  [CONFIG]
│   ├── tailwind.config.js              [CONFIG]
│   └── package.json                    [GEN]
│
├── backend/
│   ├── main.py                         [FILE] — entire backend in one file for MVP
│   ├── schema.sql                      [FILE] — 3 tables: users, sessions, messages
│   ├── prompts.py                      [FILE] — all system prompts, nothing else
│   ├── requirements.txt                [FILE]
│   └── .env                            [FILE] — never commit this
│
├── .gitignore                          [FILE]
└── .env.example                        [FILE]
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/pressure-room.git
cd pressure-room
```

### 2. Backend setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

---

## MVP Scope

- Scenario selection UI
- Single AI persona simulation
- Voice input via Web Speech API (Chrome/Edge) with transcript stored to backend
- Transcript storage
- Basic evaluation: Caving Index + feedback

---

## Roadmap

**V1**
- Core conversation loop
- Basic scoring
- Simple dashboard

**V2**
- Dual-model architecture (chat + analysis)
- Advanced analytics
- Live pressure meter

> **Note:** Voice input uses the Web Speech API. Fully supported on Chrome and Edge. Not supported on Safari or Firefox.

---

## Who This Is For

- Early professionals preparing for high-stakes conversations
- Engineering students who want to build negotiation muscle
- Anyone who knows what to say but loses it under pressure

---

## What This Is Not

This is not a chatbot. It does not encourage you or soften feedback. It simulates the kind of conversation most people avoid — and tells you exactly how you performed.

