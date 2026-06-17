import { ArrowDownRight, ArrowRight, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { usePortfolioData } from "@/hooks/usePortfolioData";

export const HeroSection = () => {
  const { data, loading } = usePortfolioData();

  if (loading || !data) {
    return (
      <div className="h-96 flex items-center justify-center">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary/60 animate-pulse">
          LOADING SYSTEM METRICS...
        </span>
      </div>
    );
  }

  const { profile } = data;

  return (
    <section id="hero" className="relative px-4 pb-24 pt-36 sm:pt-40 lg:pb-32 lg:pt-48 overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Background BRYAN CHAN watermark text */}
      <div 
        className="fixed right-[5%] top-[15%] select-none pointer-events-none font-bold text-[10vw] leading-none text-primary/[0.015] tracking-tighter uppercase font-mono z-0"
        style={{ willChange: "transform", transform: "translate3d(0,0,0)" }}
      >
        BRYAN CHAN
      </div>

      <div className="container max-w-4xl relative z-10 space-y-10 flex flex-col items-center">
        {/* Location & Status pills */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <span className="data-pill">{profile.location.toUpperCase()}</span>
          <span className="data-pill-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse mr-1" />
            {profile.status.toUpperCase()}
          </span>
        </motion.div>

        {/* Central Title: BRYAN CHAN Portofolio */}
        <motion.h1 
          initial={{ opacity: 0, y: 30, skewX: -4 }}
          animate={{ opacity: 1, y: 0, skewX: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl font-black tracking-tight text-foreground md:text-7xl lg:text-8xl p3r-skew inline-block leading-none"
        >
          <span className="text-glow uppercase">BRYAN CHAN</span> <br />
          <span className="p3r-gradient text-glow mt-2 inline-block">Portofolio</span>
        </motion.h1>

        {/* Nav CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center justify-center w-full max-w-2xl"
        >
          <a href="#projects" className="action-button flex-1 justify-center py-4 text-center">
            VIEW PROJECTS <ArrowRight size={14} className="text-glow ml-1" />
          </a>
          
          <a href="#skills" className="action-button-secondary flex-1 justify-center py-4 text-center">
            VIEW SKILLS <ArrowDownRight size={14} className="ml-1" />
          </a>

          <a 
            href="#contact" 
            className="action-button-secondary flex-1 justify-center py-4 text-center"
          >
            LET'S TALK
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center items-center gap-3 pt-2"
        >
          <a
            href="https://github.com/BryanC05"
            target="_blank"
            rel="noreferrer"
            className="data-pill hover:border-primary hover:text-foreground"
          >
            <Github size={13} className="mr-1" /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/bryan-chan-9705013a9/"
            target="_blank"
            rel="noreferrer"
            className="data-pill hover:border-primary hover:text-foreground"
          >
            <Linkedin size={13} className="mr-1" /> LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
};
