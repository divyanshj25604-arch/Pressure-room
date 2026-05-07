import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import SessionCard from "../components/dashboard/SessionCard";

function DashboardPage() {
  const { user, logout } = useAuth();
  const [sessionType, setSessionType] = useState("mock");

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans selection:bg-[var(--accent)] selection:text-white">
      <header className="border-b border-[var(--bg-border)] bg-[var(--bg-primary)]/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight ">
              Pressure Room
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-sm font-medium text-[var(--text-secondary)]">
              {user?.name.split("@")[0] || "User"}
            </span>
            <button
              onClick={logout}
              className="text-sm font-medium px-4 py-2 border border-[var(--bg-border)] rounded-lg hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] transition-colors text-[var(--text-secondary)]"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-16 items-center">

          <div className="md:col-span-3 flex flex-col">
            <span className="text-sm font-semibold tracking-wider uppercase text-[var(--text-secondary)] mb-5 block">
              Your Practice Space
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[var(--text-primary)] tracking-tight">
              Train under <span className="text-[var(--accent)]">pressure.</span> <br />
              Perform when it matters.
            </h2>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-xl leading-relaxed">
              Run realistic practice sessions, get feedback, and improve your performance in high-pressure scenarios.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() =>
                  navigate(`/session/new?type=${encodeURIComponent(sessionType)}`)
                }
                className="w-full sm:w-auto px-8 py-3.5 bg-[var(--accent)] text-white font-medium rounded-xl hover:bg-[var(--accent-hover)] transition-colors"
              >
                Start Session
              </button>
              <button
                className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-[var(--bg-border)] text-[var(--text-primary)] font-medium rounded-xl hover:bg-[var(--bg-surface)] transition-colors"
              >
                View Past Sessions
              </button>
            </div>
          </div>

          <div className="md:col-span-2 w-full max-w-md mx-auto md:max-w-none">
            <SessionCard
              sessionType={sessionType}
              setSessionType={setSessionType}
            />
          </div>

        </div>
      </main>
    </div>
  );
}

export default DashboardPage;