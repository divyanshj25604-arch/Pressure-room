import React from 'react';
import { useNavigate } from 'react-router-dom';

function SessionCard() {
  const navigate = useNavigate();

  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--bg-border)] rounded-2xl p-6 md:p-8 flex flex-col shadow-sm h-full hover:scale-[1.005] transition-transform duration-300 ">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-3 block">
          New Session
        </span>
        <h3 className="text-2xl font-semibold mb-2 text-[var(--text-primary)] tracking-tight">
          Start a Practice Run
        </h3>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
          Simulate real scenarios and test your responses under pressure.
        </p>
      </div>

      <div className="mt-auto flex flex-col justify-end">
        <div className="mb-6">
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Select session type
          </label>
          <div className="relative">
            <select className="w-full bg-[var(--bg-primary)] border border-[var(--bg-border)] text-[var(--text-primary)] rounded-xl px-4 py-3.5 appearance-none focus:outline-none focus:border-transparent focus:ring-1 focus:ring-[var(--accent)] transition-shadow cursor-pointer">
              <option>Mock Interview</option>
              <option>Pitch</option>
              <option>Presentation</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[var(--text-secondary)]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/session')}
          className="w-full bg-[var(--accent)] text-white font-medium py-3.5 rounded-xl hover:bg-[var(--accent-hover)] transition-colors hover:scale-[1.005] transition-transform duration-300"
        >
          Start Session
        </button>
        <p className="text-center text-xs text-[var(--text-secondary)] mt-4">
          ~5 min setup
        </p>
      </div>
    </div>
  );
}

export default SessionCard;
