import { useMemo } from "react";

const particleConfig = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  size: (index % 4) + 2,
  left: `${(index * 11) % 100}%`,
  top: `${(index * 17) % 100}%`,
  delay: `${(index % 6) * 1.5}s`,
  duration: `${10 + (index % 5) * 2}s`,
}));

export const StarBackground = () => {
  const particles = useMemo(() => particleConfig, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(120,180,255,0.18),transparent_28%),radial-gradient(circle_at_80%_18%,rgba(255,191,94,0.12),transparent_24%),radial-gradient(circle_at_50%_75%,rgba(84,120,255,0.12),transparent_30%)]" />
      <div className="absolute inset-0 opacity-40 hud-grid animate-grid-pan" />
      <div className="absolute inset-x-0 top-[18%] h-px bg-linear-to-r from-transparent via-primary/45 to-transparent" />
      <div className="absolute inset-y-0 left-[14%] w-px bg-linear-to-b from-transparent via-white/18 to-transparent" />
      <div className="absolute right-[8%] top-[10%] h-72 w-72 rounded-full bg-primary/18 blur-3xl animate-pulse-subtle" />
      <div className="absolute bottom-[12%] left-[10%] h-64 w-64 rounded-full bg-accent/12 blur-3xl animate-pulse-subtle" />
      <div className="absolute left-0 right-0 top-0 h-40 bg-linear-to-b from-white/6 to-transparent opacity-40" />
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="absolute rounded-full bg-white/50 animate-float"
            style={{
              width: particle.size,
              height: particle.size,
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              boxShadow: "0 0 12px rgba(120,180,255,0.25)",
            }}
          />
        ))}
      </div>
      <div className="absolute inset-x-0 top-0 h-40 animate-scanline bg-linear-to-b from-transparent via-primary/8 to-transparent" />
    </div>
  );
};
