import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const scrollToHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
      }}
    >
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--accent-dim)] text-[var(--accent)] text-xs font-medium tracking-wide mb-8 animate-glow-pulse">
          AI-Powered · Conversation Training
        </span>

        <h1 className="text-[40px] md:text-[64px] font-bold text-[var(--text-primary)] leading-tight tracking-tight mb-6">
          Train for the conversations
          <br />
          that define your career.
        </h1>

        <p className="text-base text-[var(--text-secondary)] max-w-[560px] mb-10 leading-relaxed">
          Most people lose in high-stakes conversations before they even start.
          Pressure Room puts you in the room before it matters.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          <button
            onClick={() => navigate("/login")}
            className="w-full sm:w-auto px-8 py-3 bg-[var(--accent)] text-white font-semibold rounded-lg hover:bg-[var(--accent-hover)] transition-colors"
          >
            Enter the Pressure Room
          </button>
          <button
            onClick={scrollToHowItWorks}
            className="w-full sm:w-auto px-8 py-3 border border-[var(--border)] text-[var(--text-secondary)] font-semibold rounded-lg hover:text-[var(--text-primary)] hover:border-[var(--border-subtle)] transition-colors bg-transparent"
          >
            See how it works
          </button>
        </div>

        <p className="text-[11px] text-[var(--text-muted)] mb-16">
          No setup. No credit card. Just pressure.
        </p>

        <div
          className="w-full max-w-xl mx-auto bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-4 text-left"
          style={{
            boxShadow: "0 0 40px rgba(99, 102, 241, 0.08)",
          }}
        >
          <div className="space-y-3">
            <div className="flex flex-col items-start max-w-[85%]">
              <span className="text-[11px] font-medium tracking-wide text-[var(--text-muted)] mb-1 uppercase">
                AI (Interviewer — Aggressive)
              </span>
              <div className="bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-xl rounded-tl-sm px-4 py-3 text-sm text-[var(--text-primary)]">
                We can offer 14 LPA. That&apos;s our standard band.
              </div>
            </div>

            <div className="flex flex-col items-end ml-auto max-w-[85%]">
              <span className="text-[11px] font-medium tracking-wide text-[var(--text-muted)] mb-1 uppercase">
                You
              </span>
              <div className="bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-xl rounded-tr-sm px-4 py-3 text-sm text-[var(--text-primary)]">
                I was expecting closer to 18 based on market research.
              </div>
            </div>

            <div className="flex flex-col items-start max-w-[85%]">
              <span className="text-[11px] font-medium tracking-wide text-[var(--text-muted)] mb-1 uppercase">
                AI
              </span>
              <div className="bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-xl rounded-tl-sm px-4 py-3 text-sm text-[var(--text-primary)]">
                18 is quite far. What&apos;s the minimum you&apos;d accept?
              </div>
            </div>

            <div className="flex flex-col items-end ml-auto max-w-[85%]">
              <span className="text-[11px] font-medium tracking-wide text-[var(--text-muted)] mb-1 uppercase">
                You
              </span>
              <div className="bg-[var(--danger)]/10 border border-[var(--danger)]/30 rounded-xl rounded-tr-sm px-4 py-3 text-sm text-[var(--text-primary)]">
                I mean... maybe 15? I don&apos;t want this to be difficult.
              </div>
              <span className="text-xs text-[var(--danger)] mt-1.5">
                ↳ Caving point detected
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
