import { useMemo } from "react";
import { useTheme } from "next-themes";

const particleConfig = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  size: (index % 4) + 1.5,
  left: `${(index * 11) % 100}%`,
  top: `${(index * 17) % 100}%`,
  delay: `${(index % 6) * 1.5}s`,
  duration: `${10 + (index % 5) * 2}s`,
}));

export const StarBackground = () => {
  const particles = useMemo(() => particleConfig, []);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Radial gradient ambience */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          opacity: isDark ? 1 : 0.3,
          background: isDark
            ? "radial-gradient(circle at 20% 20%, hsl(217 80% 58% / 0.15), transparent 28%), radial-gradient(circle at 80% 18%, hsl(35 80% 60% / 0.08), transparent 24%), radial-gradient(circle at 50% 75%, hsl(220 70% 50% / 0.1), transparent 30%)"
            : "radial-gradient(circle at 20% 20%, hsl(220 70% 50% / 0.06), transparent 28%), radial-gradient(circle at 80% 18%, hsl(200 80% 55% / 0.05), transparent 24%), radial-gradient(circle at 50% 75%, hsl(220 70% 50% / 0.04), transparent 30%)"
        }}
      />

      {/* HUD grid */}
      <div
        className="absolute inset-0 hud-grid animate-grid-pan transition-opacity duration-1000"
        style={{ opacity: isDark ? 0.35 : 0.08 }}
      />

      {/* Horizontal scan line */}
      <div
        className="absolute inset-x-0 top-[18%] h-px transition-opacity duration-700"
        style={{
          opacity: isDark ? 1 : 0.2,
          background: `linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), transparent)`
        }}
      />

      {/* Vertical scan line */}
      <div
        className="absolute inset-y-0 left-[14%] w-px transition-opacity duration-700"
        style={{
          opacity: isDark ? 0.25 : 0.08,
          background: `linear-gradient(180deg, transparent, hsl(var(--foreground) / 0.15), transparent)`
        }}
      />

      {/* Glow orbs */}
      <div
        className="absolute right-[8%] top-[10%] h-72 w-72 rounded-full blur-3xl animate-pulse-subtle transition-all duration-1000"
        style={{ background: `hsl(var(--primary) / ${isDark ? 0.15 : 0.06})` }}
      />
      <div
        className="absolute bottom-[12%] left-[10%] h-64 w-64 rounded-full blur-3xl animate-pulse-subtle transition-all duration-1000"
        style={{ background: `hsl(var(--accent) / ${isDark ? 0.1 : 0.04})` }}
      />

      {/* Top gradient wash */}
      <div
        className="absolute left-0 right-0 top-0 h-40 transition-opacity duration-700"
        style={{
          opacity: isDark ? 0.3 : 0.15,
          background: `linear-gradient(180deg, hsl(var(--foreground) / 0.04), transparent)`
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full animate-float transition-all duration-1000"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              "--float-duration": p.duration,
              background: isDark ? "hsl(0 0% 100% / 0.45)" : "hsl(var(--primary) / 0.25)",
              boxShadow: isDark
                ? "0 0 12px hsl(217 80% 58% / 0.2)"
                : "0 0 8px hsl(220 70% 50% / 0.15)",
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Scanline sweep */}
      <div
        className="absolute inset-x-0 top-0 h-40 animate-scanline transition-opacity duration-700"
        style={{
          opacity: isDark ? 1 : 0.2,
          background: `linear-gradient(180deg, transparent, hsl(var(--primary) / 0.06), transparent)`
        }}
      />
    </div>
  );
};
