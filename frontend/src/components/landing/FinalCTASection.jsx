import { useNavigate } from "react-router-dom";

const FinalCTASection = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative py-24 px-6 md:py-32 md:px-8 bg-[var(--bg-primary)]"
      style={{
        background:
          "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(99, 102, 241, 0.12) 0%, transparent 70%)",
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-[32px] md:text-[40px] font-bold text-[var(--text-primary)] mb-2">
          You know what to say.
        </h2>
        <p className="text-[32px] md:text-[40px] font-bold text-[var(--accent)] mb-8">
          Now learn to say it under pressure.
        </p>
        <p className="text-base text-[var(--text-secondary)] max-w-xl mx-auto mb-10 leading-relaxed">
          Most people only discover their weaknesses in real conversations.
          Pressure Room gives you a place to fail safely — and improve
          deliberately.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-10 py-4 bg-[var(--accent)] text-white text-lg font-semibold rounded-lg hover:bg-[var(--accent-hover)] transition-colors mb-6"
        >
          Enter the Pressure Room →
        </button>
        <p className="text-sm text-[var(--text-muted)]">
          Free to start. No installation. Works in your browser.
        </p>
      </div>
    </section>
  );
};

export default FinalCTASection;
