const PILLS = [
  "Salary Negotiation",
  "Performance Review",
  "Deadline Pushback",
  "Job Offer Decline",
  "Scope Creep Defense",
  "Caving Index",
  "Real-time Pressure",
  "Structured Debrief",
  "Voice Input",
  "AI Personas",
  "Transcript Heatmap",
  "Assertiveness Score",
];

const SocialProofStrip = () => {
  const items = [...PILLS, ...PILLS];

  return (
    <section className="w-full overflow-hidden border-y border-[var(--border)] bg-[var(--bg-primary)] py-4">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((pill, index) => (
          <span
            key={`${pill}-${index}`}
            className="inline-flex items-center mx-2 bg-[var(--bg-surface-2)] border border-[var(--border)] text-[var(--text-muted)] text-xs px-4 py-2 rounded-full"
          >
            {pill}
          </span>
        ))}
      </div>
    </section>
  );
};

export default SocialProofStrip;
