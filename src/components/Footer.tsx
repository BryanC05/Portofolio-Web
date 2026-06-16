import { ArrowUpRight } from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";

export const Footer = () => {
  const { data, loading } = usePortfolioData();

  if (loading || !data) return null;

  const { profile } = data;

  return (
    <footer className="relative px-4 pb-10 overflow-hidden">
      {/* Decorative Diagonal Border Sweep */}
      <div className="absolute top-0 left-[-10%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent rotate-[-1deg]" />

      <div className="container relative z-10">
        <div 
          className="flex flex-col gap-4 border border-primary/20 bg-[rgba(8,18,34,0.96)] px-6 py-6 md:flex-row md:items-center md:justify-between"
          style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 16px) 100%, 16px 100%)" }}
        >
          <div className="text-left">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary text-glow">
              {profile.name.toUpperCase()} // DEVELOPER
            </p>
            <p className="mt-1 text-xs text-muted-foreground/90 uppercase tracking-wider">
              Interface-focused frontend developer crafting premium web experiences.
            </p>
          </div>
          
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <span className="data-pill-gold justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
              STATUS: SELECT PROJECTS AVAILABLE
            </span>
            <a
              href="#hero"
              className="action-button-secondary py-2.5 px-4 text-glow"
              style={{ clipPath: "polygon(8px 0, 100% 0, 100% 100%, 0 100%)" }}
            >
              UPWARD <ArrowUpRight size={13} className="ml-1" />
            </a>
          </div>
        </div>
        
        <p className="mt-6 text-center text-[9px] font-bold uppercase tracking-[0.3em] text-primary/45">
          © {new Date().getFullYear()} {profile.name.toUpperCase()} // ALL SYSTEMS OPERATIONAL
        </p>
      </div>
    </footer>
  );
};
