const STEPS = [
  {
    number: "01",
    title: "Set your scenario",
    body: "Pick a scenario, set your opening position, walk-away limit, and win condition.",
  },
  {
    number: "02",
    title: "Face the pressure",
    body: "The AI becomes a difficult counterpart. No encouragement. No softening. Just friction.",
  },
  {
    number: "03",
    title: "Get exposed",
    body: "After the session, you get a full debrief. Your Caving Index. Where you folded. What to fix next.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 px-6 md:py-32 md:px-8 bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[40px] font-bold text-[var(--text-primary)] mb-4">
            How it works
          </h2>
          <p className="text-lg md:text-xl font-semibold text-[var(--text-secondary)]">
            Three steps. No hand-holding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
          {STEPS.map((step, index) => (
            <div key={step.number} className="relative flex flex-col items-start">
              {index < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[calc(100%+1rem)] w-[calc(100%-2rem)] h-px bg-[var(--border)]" />
              )}
              <span className="text-4xl font-mono font-bold text-[var(--accent)] mb-4">
                {step.number}
              </span>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
