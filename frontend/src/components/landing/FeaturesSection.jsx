import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const FEATURES = [
  {
    tag: "01",
    title: "Pressure Engine",
    eyebrow: "Adaptive AI",
    description:
      "Every answer changes the conversation. Personas interrupt, negotiate, challenge assumptions and increase pressure based on your responses.",
  },
  {
    tag: "02",
    title: "Caving Index",
    eyebrow: "Behaviour Analysis",
    description:
      "Measure hesitation, unnecessary concessions, weak language and confidence drift with actionable feedback after every session.",
  },
  {
    tag: "03",
    title: "Voice Practice",
    eyebrow: "Speak Naturally",
    description:
      "Practice using your own voice. Simulate real conversations instead of typing perfect answers you would never say aloud.",
  },
  {
    tag: "04",
    title: "Debrief",
    eyebrow: "Session Replay",
    description:
      "Review your transcript, identify pressure points and understand exactly where the conversation turned against you.",
  },
  {
    tag: "05",
    title: "Scenario Library",
    eyebrow: "Professional Situations",
    description:
      "Interviews, salary negotiations, presentations, difficult managers and high‑stakes workplace conversations.",
  },
];

const Card = ({ feature, index, progress }) => {
  const offsets = [-380, -190, 0, 190, 380];
  const start = [-45, -20, 0, 20, 45];
  const x = useTransform(progress, [0, 1], [start[index], offsets[index]]);
  const rotate = useTransform(progress, [0, 1], [-8 + index * 4, 0]);
  const scale = useTransform(
    progress,
    [0, 1],
    [index === 2 ? 1 : 0.92, 1]
  );

  return (
    <motion.div
      style={{
        x,
        rotate,
        scale,
        zIndex: 20 - Math.abs(index - 2),
      }}
      className="absolute left-1/2 top-1/2 w-[320px] -translate-x-1/2 -translate-y-1/2"
    >
      <div className="rounded-3xl border border-[var(--bg-border)] bg-[var(--bg-surface)] p-8 shadow-2xl backdrop-blur">
        <div className="flex items-center justify-between mb-10">
          <span className="text-xs tracking-[0.25em] uppercase text-[var(--accent)]">
            {feature.tag}
          </span>
          <span className="text-xs text-[var(--text-secondary)]">
            {feature.eyebrow}
          </span>
        </div>

        <h3 className="text-3xl font-semibold text-[var(--text-primary)] mb-6">
          {feature.title}
        </h3>

        <p className="text-[15px] leading-7 text-[var(--text-secondary)]">
          {feature.description}
        </p>

        <div className="mt-10 pt-6 border-t border-[var(--bg-border)]">
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            Pressure Room
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default function FeaturesSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
  });

  return (
    <section
      ref={ref}
      id="features"
      className="relative h-[220vh] bg-[var(--bg-primary)]"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="mb-20 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
              Core Experience
            </p>

            <h2 className="text-5xl font-bold text-[var(--text-primary)]">
              Built for pressure.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--text-secondary)]">
              Scroll to unfold the product. Every panel represents one part of
              the experience you'll use inside Pressure Room.
            </p>
          </div>

          <div className="relative h-[480px]">
            {FEATURES.map((feature, index) => (
              <Card
                key={feature.title}
                feature={feature}
                index={index}
                progress={progress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
