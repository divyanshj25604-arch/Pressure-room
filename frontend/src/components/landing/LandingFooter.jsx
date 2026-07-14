const LandingFooter = () => {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-primary)] py-8 px-6 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <span className="text-[13px] font-bold tracking-[0.2em] text-[var(--text-primary)] uppercase">
          Pressure Room
        </span>
        <span className="text-[var(--text-muted)] text-center">
          Built by Divyansh Jha
        </span>
        <span className="text-[var(--text-muted)]">© 2026</span>
      </div>
    </footer>
  );
};

export default LandingFooter;
