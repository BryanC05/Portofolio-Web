import { useMemo } from "react";

// Optimized counts to prevent browser layout reflow jank
const shapeConfig = Array.from({ length: 5 }, (_, index) => ({
  id: index,
  type: index % 2 === 0 ? "card" : "circle",
  size: 30 + (index % 3) * 15,
  left: `${(index * 23 + 12) % 85}%`,
  top: `${(index * 19 + 20) % 75}%`,
  delay: `${index * 1.5}s`,
  duration: `${18 + index * 4}s`,
}));

const particleConfig = Array.from({ length: 8 }, (_, index) => ({
  id: index,
  size: (index % 2) + 2,
  left: `${(index * 13 + 7) % 95}%`,
  top: `${(index * 23 + 15) % 90}%`,
  delay: `${index * 0.8}s`,
  duration: `${10 + index * 2}s`,
}));

export const StarBackground = () => {
  const shapes = useMemo(() => shapeConfig, []);
  const particles = useMemo(() => particleConfig, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background" aria-hidden="true">
      {/* P3R Dark Hour Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(0,229,255,0.1),transparent_40%),radial-gradient(circle_at_15%_80%,rgba(15,35,65,0.5),transparent_55%)]" />
      
      {/* Static Diagonal Lines (Decoration only - no layout repaints) */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute left-[15%] top-[-50%] h-[200%] w-[1.5px] bg-gradient-to-b from-transparent via-primary to-transparent rotate-[30deg]" 
          style={{ transformOrigin: "center" }}
        />
        <div 
          className="absolute right-[25%] top-[-50%] h-[200%] w-[1px] bg-gradient-to-b from-transparent via-primary/50 to-transparent rotate-[30deg]" 
          style={{ transformOrigin: "center" }}
        />
      </div>

      {/* Static Grid Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(0,229,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.06)_1px,transparent_1px)] bg-[size:65px_65px] [transform:skewY(-6deg)]" />

      {/* Large Glowing Moon (P3R Moon Motif) */}
      <div className="absolute right-[5%] top-[8%] flex h-80 w-80 items-center justify-center">
        {/* Outer Halo (Static blur background layer) */}
        <div className="absolute h-64 w-64 rounded-full bg-primary/5 blur-3xl animate-pulse-subtle" />
        
        {/* The Moon itself - GPU Promoted via willChange */}
        <div 
          className="relative h-40 w-40 rounded-full bg-gradient-to-br from-white via-cyan-100/70 to-primary/20 shadow-[0_0_40px_rgba(0,229,255,0.25),inset_-10px_-10px_20px_rgba(0,180,255,0.3)] animate-p3r-float"
          style={{ willChange: "transform" }}
        >
          {/* Moon details */}
          <div className="absolute inset-0 rounded-full opacity-15 bg-[radial-gradient(circle_at_30%_30%,rgba(0,0,0,0.6)_10%,transparent_50%),radial-gradient(circle_at_70%_60%,rgba(0,0,0,0.5)_8%,transparent_40%)]" />
          <div className="absolute inset-0 rounded-full border-r-[2px] border-accent/20 rotate-45" />
        </div>
      </div>

      {/* Static Water Ripple Bottom Motif */}
      <div className="absolute bottom-0 left-0 right-0 h-48 opacity-10 mix-blend-screen overflow-hidden">
        <svg className="absolute bottom-0 w-full h-full fill-primary/10" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,70 C150,90 350,30 500,70 C650,110 850,50 1000,80 C1150,110 1350,60 1500,80 L1500,120 L0,120 Z" />
        </svg>
      </div>

      {/* Floating Arcana Shapes - GPU Promoted via willChange */}
      <div className="absolute inset-0 overflow-hidden">
        {shapes.map((shape) => (
          <div
            key={`shape-${shape.id}`}
            className="absolute opacity-10 border border-primary/30 animate-p3r-float"
            style={{
              width: shape.size,
              height: shape.type === "card" ? shape.size * 1.4 : shape.size,
              left: shape.left,
              top: shape.top,
              animationDelay: shape.delay,
              animationDuration: shape.duration,
              borderRadius: shape.type === "circle" ? "50%" : "3px",
              background: "linear-gradient(135deg, rgba(0, 229, 255, 0.03), transparent)",
              boxShadow: "0 0 8px rgba(0,229,255,0.05)",
              willChange: "transform",
            }}
          >
            {shape.type === "card" && (
              <div className="absolute inset-[3px] border border-primary/15 flex items-center justify-center">
                <span className="text-[8px] font-bold tracking-widest text-primary/30">III</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sparkling Glow Particles - GPU Promoted via willChange */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <span
            key={`part-${particle.id}`}
            className="absolute rounded-full bg-cyan-200/50 animate-float"
            style={{
              width: particle.size,
              height: particle.size,
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              boxShadow: "0 0 8px rgba(0,229,255,0.3)",
              willChange: "transform",
            }}
          />
        ))}
      </div>
    </div>
  );
};
