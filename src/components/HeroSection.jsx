import { ArrowDownRight, ArrowRight, Github, Linkedin } from "lucide-react";
import { Panel } from "@/components/Panel";
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
    <section id="hero" className="relative px-4 pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-40 overflow-hidden">
      {/* Background XXII (Fool Arcana) watermark text */}
      <div className="absolute right-[-10%] top-[10%] select-none pointer-events-none font-bold text-[24vw] leading-none text-primary/[0.02] tracking-tighter uppercase font-mono z-0">
        XXII
      </div>

      <div className="container relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-3xl space-y-8 text-left">
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                <span className="data-pill">{profile.location.toUpperCase()}</span>
                <span className="data-pill-gold">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping mr-1" />
                  {profile.status.toUpperCase()}
                </span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30, skewX: -3 }}
                animate={{ opacity: 1, y: 0, skewX: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-4xl text-4xl font-extrabold leading-none tracking-tight text-foreground md:text-6xl lg:text-[4.50rem] uppercase"
              >
                Designing and building <br />
                <span className="p3r-gradient text-glow inline-block py-1">
                  {profile.headline.split(" experiences")[0]}
                </span> <br />
                experiences.
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-xl text-sm leading-7 text-muted-foreground/90 md:text-base border-l border-primary/30 pl-4"
              >
                {profile.description}
              </motion.p>
            </div>

            {/* Buttons & Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <a href="#projects" className="action-button">
                View my work <ArrowRight size={14} className="text-glow" />
              </a>
              <a href="#contact" className="action-button-secondary">
                Let's talk <ArrowDownRight size={14} />
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 pt-2"
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

          {/* Right Panel: Revamped to be just "BRYAN CHAN" with Skills link */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <Panel className="p-8 md:p-10 flex flex-col justify-center items-center min-h-[320px]" variant="diagonal">
              {/* Scan grid and glow lights */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(0,229,255,0.06),transparent_40%)]" />
              
              <div className="relative w-full h-full flex flex-col justify-center items-center text-center space-y-8 py-4">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">
                    MEMBER // ACTIVE
                  </p>
                  <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground text-glow p3r-skew inline-block">
                    {profile.name}
                  </h2>
                </div>

                <div className="border-t border-primary/20 w-16" />

                <a 
                  href="#skills" 
                  className="action-button w-full max-w-[200px]"
                >
                  VIEW SKILLS <ArrowRight size={14} className="text-glow" />
                </a>
              </div>
            </Panel>
          </motion.div>
        </div>

        {/* Scroll prompt */}
        <div className="mt-12 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-primary/60">
          <span className="h-[2px] w-12 bg-gradient-to-r from-primary to-transparent" />
          Scroll down to initiate menu navigation
        </div>
      </div>
    </section>
  );
};
