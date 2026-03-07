import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 text-foreground">
      <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-card/80 p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl">
        <p className="section-eyebrow">Error // 404</p>
        <h1 className="mt-6 text-4xl font-semibold tracking-[-0.05em] md:text-5xl">
          This route drifted outside the <span className="text-gradient">known map</span>.
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          The page you’re looking for is unavailable or no longer routed through this portfolio interface.
        </p>
        <Link to="/" className="action-button mt-8">
          Return to command center
        </Link>
      </div>
    </main>
  );
};
