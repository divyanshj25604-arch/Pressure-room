import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";

const LandingNav = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-[var(--bg-surface)]/80 backdrop-blur-md transition-colors",
        scrolled && "border-b border-[var(--border)]"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-[13px] font-bold tracking-[0.2em] text-[var(--text-primary)] uppercase"
        >
          Pressure Room
        </button>

        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollTo("features")}
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollTo("how-it-works")}
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollTo("scenarios")}
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            Scenarios
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => navigate("/login")}
            className="text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 border border-[var(--border)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-subtle)] transition-colors bg-transparent"
          >
            Log In
          </button>
          <button
            onClick={() => navigate("/login")}
            className="text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 bg-[var(--accent)] rounded-lg text-white hover:bg-[var(--accent-hover)] transition-colors"
          >
            Start Free
          </button>
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;
