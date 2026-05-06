import { useSearchParams } from "react-router-dom";

export default function SessionPage() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans selection:bg-[var(--accent)] selection:text-white flex items-center justify-center">
      <h1 className="text-4xl font-bold tracking-tight">
        Starting a {type || "new"} session...
      </h1>
    </div>
  );
}

