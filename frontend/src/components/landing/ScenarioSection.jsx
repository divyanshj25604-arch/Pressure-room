const SCENARIOS = [
  {
    emoji: "💼",
    name: "Salary Negotiation",
    description: "Negotiate your offer with HR",
  },
  {
    emoji: "📋",
    name: "Performance Review",
    description: "Defend your work to a critical manager",
  },
  {
    emoji: "⏰",
    name: "Deadline Pushback",
    description: "Push back on an unrealistic timeline",
  },
  {
    emoji: "🔒",
    name: "Scope Creep Defense",
    description: "Hold your project scope against a client",
  },
  {
    emoji: "🤝",
    name: "Job Offer Decline",
    description: "Decline without burning the bridge",
  },
];

const ScenarioSection = () => {
  return (
    <section id="scenarios" className="py-24 px-6 md:py-32 md:px-8 bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[40px] font-bold text-[var(--text-primary)]">
            What you can train for
          </h2>
        </div>

        <div className="flex md:hidden gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
          {SCENARIOS.map((scenario) => (
            <div
              key={scenario.name}
              className="flex-shrink-0 w-[260px] snap-start bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-xl px-5 py-4"
            >
              <span className="text-2xl mb-3 block">{scenario.emoji}</span>
              <h3 className="font-bold text-[var(--text-primary)] mb-1">
                {scenario.name}
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                {scenario.description}
              </p>
            </div>
          ))}
        </div>

        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-4">
            {SCENARIOS.slice(0, 3).map((scenario) => (
              <div
                key={scenario.name}
                className="bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-xl px-5 py-4"
              >
                <span className="text-2xl mb-3 block">{scenario.emoji}</span>
                <h3 className="font-bold text-[var(--text-primary)] mb-1">
                  {scenario.name}
                </h3>
                <p className="text-sm text-[var(--text-muted)]">
                  {scenario.description}
                </p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto mt-4">
            {SCENARIOS.slice(3).map((scenario) => (
              <div
                key={scenario.name}
                className="bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-xl px-5 py-4"
              >
                <span className="text-2xl mb-3 block">{scenario.emoji}</span>
                <h3 className="font-bold text-[var(--text-primary)] mb-1">
                  {scenario.name}
                </h3>
                <p className="text-sm text-[var(--text-muted)]">
                  {scenario.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScenarioSection;
