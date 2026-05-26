import { ArrowDownRight, ArrowRight, Github, Linkedin } from "lucide-react";
import { Panel } from "@/components/Panel";
import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Primary focus", value: "Web Applications" },
  { label: "Delivery mode", value: "Full-stack development" },
  { label: "Current status", value: "Available for projects" },
];

const skills = [
  { name: "React interface architecture", level: 92 },
  { name: "Tailwind design systems", level: 86 },
  { name: "Motion and responsive polish", level: 80 },
];

export const HeroSection = () => {
  const [barsVisible, setBarsVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setBarsVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="hero" className="relative px-4 pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-40">
      <div className="container relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-3xl space-y-8 text-left">
            <div className="space-y-5">
              <div className="flex flex-wrap gap-3 opacity-0 animate-fade-in-delay-1">
                <span className="data-pill">Bekasi, Indonesia</span>
              </div>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.06em] text-foreground opacity-0 animate-fade-in md:text-6xl lg:text-[5.25rem]">
                Designing and building{" "}
                <span className="text-gradient text-glow">functional web experiences</span>{" "}
                with product clarity.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground opacity-0 animate-fade-in-delay-2 md:text-lg">
                I'm Bryan Chan, a developer focused on interfaces that feel sharp, responsive,
                and intentionally composed—bridging modern frontend engineering, thoughtful UX,
                and production-ready execution.
              </p>
            </div>

            <div className="flex flex-col gap-4 opacity-0 animate-fade-in-delay-3 sm:flex-row sm:items-center">
              <a href="#projects" className="action-button">
                View my work <ArrowRight size={18} />
              </a>
              <a href="#contact" className="action-button-secondary">
                Let's talk <ArrowDownRight size={18} />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3 opacity-0 animate-fade-in-delay-4">
              <a
                href="https://github.com/BryanC05"
                target="_blank"
                rel="noreferrer"
                className="data-pill transition-colors hover:border-primary/35 hover:text-foreground"
              >
                <Github size={14} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/bryan-chan-9705013a9/"
                target="_blank"
                rel="noreferrer"
                className="data-pill transition-colors hover:border-primary/35 hover:text-foreground"
              >
                <Linkedin size={14} /> LinkedIn
              </a>
            </div>
          </div>

          <Panel className="motion-panel p-6 md:p-7">
            <div className="hud-grid absolute inset-0 opacity-20" />
            <div className="relative space-y-6">
              <div className="flex items-start justify-between gap-4 border-b border-border/50 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                    Developer profile
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-foreground">
                    Bryan Chan
                  </h2>
                </div>
                <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-emerald-500 dark:text-emerald-300">
                  Online
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-border/50 bg-muted/30 p-4 transition-all duration-300 hover:border-primary/20 hover:bg-primary/5 dark:border-border dark:bg-muted/10">
                    <p className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-3 text-sm font-medium leading-6 text-foreground">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]" ref={barRef}>
                <div className="rounded-[1.5rem] border border-primary/15 bg-primary/5 p-5 dark:border-primary/20 dark:bg-primary/8">
                  <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                    Skills & Expertise
                  </p>
                  <div className="mt-5 space-y-4">
                    {skills.map((item, index) => (
                      <div key={item.name} className="space-y-2">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{item.name}</span>
                          <span>{item.level}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-secondary">
                          <div
                            className="h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: barsVisible ? `${item.level}%` : "0%",
                              transitionDelay: `${index * 200}ms`,
                              background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))"
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-border/50 bg-muted/20 p-5 dark:border-border dark:bg-card/30">
                  <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                    Work Philosophy
                  </p>
                  <div className="mt-4 space-y-4">
                    <div className="rounded-[1.25rem] border border-border/50 bg-muted/30 p-4 dark:border-border dark:bg-muted/10">
                      <p className="text-sm text-muted-foreground">Currently crafting web experiences with stronger visual systems, section choreography, and high-fidelity interaction design.</p>
                    </div>
                    <div className="flex items-center justify-between rounded-[1.25rem] border border-border/50 px-4 py-3 dark:border-border">
                      <span className="text-sm text-muted-foreground">Project focus</span>
                      <span className="text-sm font-medium text-foreground">Clarity × Motion × Performance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        </div>

        <div className="mt-12 flex items-center gap-3 text-sm text-muted-foreground opacity-0 animate-fade-in-delay-4">
          <span className="h-px w-16" style={{ background: "linear-gradient(90deg, hsl(var(--primary) / 0.8), transparent)" }} />
          Scroll to learn more about my work
        </div>
      </div>
    </section>
  );
};
