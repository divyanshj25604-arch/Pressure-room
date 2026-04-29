CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id),
    scenario_type TEXT,
    persona TEXT,
    difficulty TEXT,
    opening_pos TEXT,
    walkaway_limit TEXT,
    win_condition TEXT,
    status TEXT DEFAULT 'active',
    caving_index INTEGER,
    assertiveness INTEGER,
    clarity INTEGER,
    composure INTEGER,
    tone_score INTEGER,
    feedback_json TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    session_id TEXT REFERENCES sessions(id),
    sender TEXT,
    content TEXT,
    speech_pace INTEGER,
    filler_words INTEGER,
    hesitations INTEGER,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);