import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createSession } from "../api/sessions";
import useAuth from "../hooks/useAuth";

export default function SessionPage() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "practice";
  const { token } = useAuth();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [error, setError] = useState("");
  const [starting, setStarting] = useState(false);

  async function handleStart() {
    setStarting(true);
    setError("");
    try {
      setSession(await createSession(type, token));
    } catch (err) {
      setError(err.message || "Unable to start the session");
    } finally {
      setStarting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans selection:bg-[var(--accent)] flex items-center justify-center px-6">
      <main className="w-full max-w-xl rounded-xl border border-[var(--bg-border)] bg-[var(--bg-surface)] p-8 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Pressure Room</p>
        <h1 className="text-3xl font-bold tracking-tight">{type.replaceAll("_", " ")}</h1>
        {!session ? (
          <>
            <p className="mt-4 text-[var(--text-secondary)]">Your practice session is ready when you are.</p>
            {error && <p role="alert" className="mt-4 text-sm text-red-400">{error}</p>}
            <button
              type="button"
              onClick={handleStart}
              disabled={starting}
              className="mt-8 rounded-xl bg-[var(--accent)] px-6 py-3 font-medium text-white transition-colors hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {starting ? "Starting…" : "Begin Session"}
            </button>
          </>
        ) : (
          <>
            <p className="mt-4 text-[var(--text-secondary)]">Session #{session.id} has been created. The AI conversation experience will appear here as it is implemented.</p>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="mt-8 rounded-xl border border-[var(--bg-border)] px-6 py-3 font-medium transition-colors hover:bg-[var(--bg-primary)]"
            >
              Back to dashboard
            </button>
          </>
        )}
      </main>
    </div>
  );
}
