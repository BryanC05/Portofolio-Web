import { useMemo } from "react";

const shapeConfig = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  type: index % 3 === 0 ? "card" : index % 3 === 1 ? "circle" : "triangle",
  size: 20 + (index % 4) * 15,
  left: `${(index * 17 + 8) % 90}%`,
  top: `${(index * 13 + 12) % 80}%`,
  delay: `${(index % 4) * 2}s`,
  duration: `${15 + (index % 3) * 5}s`,
}));

const particleConfig = Array.from({ length: 25 }, (_, index) => ({
  id: index,
  size: (index % 3) + 2,
  left: `${(index * 7) % 100}%`,
  top: `${(index * 13) % 100}%`,
  delay: `${(index % 5) * 1.2}s`,
  duration: `${8 + (index % 4) * 3}s`,
}));

export const StarBackground = () => {
  const shapes = useMemo(() => shapeConfig, []);
  const particles = useMemo(() => particleConfig, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background" aria-hidden="true">
      {/* P3R Dark Hour Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(0,229,255,0.14),transparent_40%),radial-gradient(circle_at_15%_80%,rgba(15,35,65,0.7),transparent_55%),radial-gradient(circle_at_50%_50%,rgba(8,18,34,0.5),transparent_70%)]" />
      
      {/* Rotating P3R Signature Lines (Diagonal Guides) */}
      <div className="absolute inset-0 opacity-15">
        <div 
          className="absolute left-[10%] top-[-50%] h-[200%] w-[2px] bg-gradient-to-b from-transparent via-primary to-transparent rotate-[30deg]" 
          style={{ transformOrigin: "center" }}
        />
        <div 
          className="absolute right-[20%] top-[-50%] h-[200%] w-[1px] bg-gradient-to-b from-transparent via-primary/60 to-transparent rotate-[30deg]" 
          style={{ transformOrigin: "center" }}
        />
        <div 
          className="absolute left-[40%] top-[-50%] h-[200%] w-[1px] bg-gradient-to-b from-transparent via-primary/30 to-transparent rotate-[30deg]" 
          style={{ transformOrigin: "center" }}
        />
      </div>

      {/* Grid Pattern with skew */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(0,229,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.08)_1px,transparent_1px)] bg-[size:60px_60px] [transform:skewY(-6deg)]" />

      {/* Large Glowing Moon (P3R Moon Motif) */}
      <div className="absolute right-[5%] top-[8%] flex h-80 w-80 items-center justify-center">
        {/* Outer Halo */}
        <div className="absolute h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-pulse-subtle" />
        <div className="absolute h-56 w-56 rounded-full bg-accent/8 blur-2xl" />
        
        {/* The Moon itself */}
        <div className="relative h-44 w-44 rounded-full bg-gradient-to-br from-white via-cyan-100/80 to-primary/20 shadow-[0_0_50px_rgba(0,229,255,0.3),inset_-15px_-15px_30px_rgba(0,180,255,0.4)] animate-p3r-float">
          {/* Moon details / craters silhouette */}
          <div className="absolute inset-0 rounded-full opacity-20 bg-[radial-gradient(circle_at_30%_30%,rgba(0,0,0,0.6)_10%,transparent_50%),radial-gradient(circle_at_70%_60%,rgba(0,0,0,0.5)_8%,transparent_40%)]" />
          {/* Subtle gold crest line */}
          <div className="absolute inset-0 rounded-full border-r-[3px] border-accent/25 rotate-45" />
        </div>
      </div>

      {/* Water Ripple Bottom Motif */}
      <div className="absolute bottom-0 left-0 right-0 h-96 opacity-25 mix-blend-screen overflow-hidden">
        <svg className="absolute bottom-0 w-[200%] h-full animate-water-flow fill-primary/10" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C150,90 350,30 500,70 C650,110 850,50 1000,80 C1150,110 1350,60 1500,80 L1500,120 L0,120 Z" />
        </svg>
        <svg className="absolute bottom-0 w-[200%] h-full animate-water-flow fill-primary/15" style={{ animationDelay: "-4s", animationDuration: "18s" }} viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,80 C200,40 400,90 600,60 C800,30 1000,90 1200,70 C1400,50 1600,80 1800,70 L1800,120 L0,120 Z" />
        </svg>
      </div>

      {/* Floating Arcana Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {shapes.map((shape) => (
          <div
            key={`shape-${shape.id}`}
            className="absolute opacity-15 border border-primary/45 transition-all animate-p3r-float"
            style={{
              width: shape.size,
              height: shape.type === "card" ? shape.size * 1.5 : shape.size,
              left: shape.left,
              top: shape.top,
              animationDelay: shape.delay,
              animationDuration: shape.duration,
              borderRadius: shape.type === "circle" ? "50%" : shape.type === "card" ? "4px" : "0",
              transform: shape.type === "triangle" ? "rotate(45deg)" : "none",
              background: "linear-gradient(135deg, rgba(0, 229, 255, 0.05), transparent)",
              boxShadow: "0 0 10px rgba(0,229,255,0.1)",
            }}
          >
            {/* Inner details for P3R stylized shapes */}
            {shape.type === "card" && (
              <div className="absolute inset-[3px] border border-primary/20 flex items-center justify-center">
                <span className="text-[9px] font-bold tracking-widest text-primary/40">III</span>
              </div>
            )}
            {shape.type === "circle" && (
              <div className="absolute inset-[4px] rounded-full border border-dashed border-primary/30" />
            )}
          </div>
        ))}
      </div>

      {/* Sparkling Glow Particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <span
            key={`part-${particle.id}`}
            className="absolute rounded-full bg-cyan-200/60 animate-float"
            style={{
              width: particle.size,
              height: particle.size,
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              boxShadow: "0 0 10px rgba(0,229,255,0.4)",
            }}
          />
        ))}
      </div>

      {/* Scanning laser line overlay */}
      <div className="absolute inset-x-0 top-0 h-40 animate-scanline bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
    </div>
  );
};
