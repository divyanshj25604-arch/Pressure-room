import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

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
      "Interviews, salary negotiations, presentations, difficult managers and high-stakes workplace conversations.",
  },
];

const CARD_COUNT = FEATURES.length;
const CENTER_INDEX = Math.floor(CARD_COUNT / 2);

const Card = ({ feature, index, progress }) => {
  const spreadOffsets = [-300, -150, 0, 150, 300];
  const stackOffsets = [-36, -18, 0, 18, 36];
  const stackRotations = [-10, -5, 0, 5, 10];

  const offset = useTransform(
    progress,
    [0, 1],
    [stackOffsets[index], spreadOffsets[index]]
  );
  const x = useTransform(offset, (value) => `calc(-50% + ${value}px)`);
  const rotate = useTransform(
    progress,
    [0, 1],
    [stackRotations[index], 0]
  );
  const scale = useTransform(
    progress,
    [0, 1],
    [index === CENTER_INDEX ? 1 : 0.94, 1]
  );
  const opacity = useTransform(
    progress,
    [0, 0.15, 1],
    [index === CENTER_INDEX ? 1 : 0.55, 1, 1]
  );

  return (
    <motion.div
      style={{
        x,
        y: "-50%",
        rotate,
        scale,
        opacity,
        zIndex: 20 - Math.abs(index - CENTER_INDEX),
      }}
      className="pointer-events-none absolute left-1/2 top-1/2 w-[min(320px,calc(100vw-3rem))]"
    >
      <div className="rounded-3xl border border-[var(--bg-border)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-2xl">
        <div className="mb-8 flex items-center justify-between sm:mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--accent)]">
            {feature.tag}
          </span>
          <span className="text-xs text-[var(--text-secondary)]">
            {feature.eyebrow}
          </span>
        </div>

        <h3 className="mb-4 text-2xl font-semibold text-[var(--text-primary)] sm:mb-6 sm:text-3xl">
          {feature.title}
        </h3>

        <p className="text-sm leading-7 text-[var(--text-secondary)] sm:text-[15px]">
          {feature.description}
        </p>

        <div className="mt-8 border-t border-[var(--bg-border)] pt-6 sm:mt-10">
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            Pressure Room
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
  });

  return (
    <section
      ref={ref}
      id="features"
      className="relative bg-[var(--bg-primary)]"
      style={{ height: `${CARD_COUNT * 70}vh` }}
    >
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col overflow-hidden">
        <div className="shrink-0 px-6 pt-10 pb-6 text-center sm:pt-12 sm:pb-8">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
            Core Experience
          </p>
          <h2 className="text-3xl font-bold text-[var(--text-primary)] sm:text-5xl">
            Built for pressure.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--text-secondary)] sm:mt-6 sm:text-lg">
            Scroll to unfold the product. Every panel represents one part of
            the experience you&apos;ll use inside Pressure Room.
          </p>
        </div>

        <div className="relative min-h-0 flex-1">
          <div className="absolute inset-0">
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
};

export default FeaturesSection;
