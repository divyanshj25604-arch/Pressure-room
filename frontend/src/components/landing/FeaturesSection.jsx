import { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";

const FEATURES = [
  {
    icon: "⚡",
    title: "Pressure Engine",
    description:
      "Multiple AI personas — aggressive, dismissive, impatient, friendly-but-firm. Dynamic tactics that respond to what you say.",
  },
  {
    icon: "📊",
    title: "Caving Index",
    description:
      "A proprietary score that measures how much you fold. Tracks concessions, weak language, over-apologising, goal deviation.",
  },
  {
    icon: "🎙",
    title: "Voice Input",
    description:
      "Speak your responses. Web Speech API. No extra setup. Hearing your own voice under pressure is different from typing.",
  },
  {
    icon: "📋",
    title: "Post-Session Debrief",
    description:
      "Full transcript with caving moments highlighted. Specific feedback. One concrete improvement action.",
  },
];

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
};

const FeatureCard = ({ feature, index }) => {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={cn(
        "bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 transition-all duration-700 hover:border-[var(--accent)]/30",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex justify-center mb-5">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--accent-dim)] text-2xl">
          {feature.icon}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">
        {feature.title}
      </h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed text-center">
        {feature.description}
      </p>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 px-6 md:py-32 md:px-8 bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[40px] font-bold text-[var(--text-primary)] mb-4">
            Built for one thing
          </h2>
          <p className="text-lg md:text-xl font-semibold text-[var(--text-secondary)]">
            Every feature exists to make you better under pressure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
