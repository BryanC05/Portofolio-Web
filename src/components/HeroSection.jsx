import { ArrowDownRight, ArrowRight, Github, Linkedin } from "lucide-react";
import { Panel } from "@/components/Panel";

const stats = [
  { label: "Primary focus", value: "Frontend systems" },
  { label: "Delivery mode", value: "Design-aware engineering" },
  { label: "Current status", value: "Open to product builds" },
];

export const HeroSection = () => {
  return (
    <section id="hero" className="relative px-4 pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-40">
      <div className="container relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-3xl space-y-8 text-left">
            <div className="space-y-5">
              <span className="section-eyebrow reveal-up">Command node // Portfolio interface</span>
              <div className="flex flex-wrap gap-3 opacity-0 animate-fade-in-delay-1">
                <span className="data-pill">Sector 07 · Bekasi</span>
                <span className="data-pill">Build v2.6 · March 2026</span>
              </div>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.06em] text-foreground opacity-0 animate-fade-in md:text-6xl lg:text-[5.25rem]">
                Designing and building <span className="text-gradient text-glow">cinematic digital systems</span> with product clarity.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground opacity-0 animate-fade-in-delay-2 md:text-lg">
                I’m Bryan Chan, a developer focused on interfaces that feel sharp, responsive,
                and intentionally composed—bridging modern frontend engineering, thoughtful UX,
                and production-ready execution.
              </p>
            </div>

            <div className="flex flex-col gap-4 opacity-0 animate-fade-in-delay-3 sm:flex-row sm:items-center">
              <a href="#projects" className="action-button">
                View selected operations <ArrowRight size={18} />
              </a>
              <a href="#contact" className="action-button-secondary">
                Start a conversation <ArrowDownRight size={18} />
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
                href="https://www.linkedin.com/in/bryan-chan-824658230/"
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
              <div className="flex items-start justify-between gap-4 border-b border-white/8 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                    Operator profile
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-foreground">
                    Bryan Chan
                  </h2>
                </div>
                <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-emerald-300">
                  Online
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <p className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-3 text-sm font-medium leading-6 text-foreground">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-[1.5rem] border border-white/10 bg-linear-to-br from-primary/18 to-transparent p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                    Specialty spread
                  </p>
                  <div className="mt-5 space-y-4">
                    {["React interface architecture", "Tailwind design systems", "Motion and responsive polish"].map((item, index) => (
                      <div key={item} className="space-y-2">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{item}</span>
                          <span>{92 - index * 6}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-background/70">
                          <div
                            className="h-2 rounded-full bg-linear-to-r from-primary via-sky-300 to-accent"
                            style={{ width: `${92 - index * 6}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-white/8 bg-black/20 p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                    Featured build direction
                  </p>
                  <div className="mt-4 space-y-4">
                    <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.04] p-4">
                      <p className="text-sm text-muted-foreground">Currently crafting portfolio experiences with stronger visual systems, section choreography, and high-fidelity interaction design.</p>
                    </div>
                    <div className="flex items-center justify-between rounded-[1.25rem] border border-white/8 px-4 py-3">
                      <span className="text-sm text-muted-foreground">Mission priority</span>
                      <span className="text-sm font-medium text-foreground">Clarity × Motion × Performance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        </div>

        <div className="mt-12 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="h-px w-16 bg-linear-to-r from-primary/80 to-transparent" />
          Scroll to inspect profile systems
        </div>
      </div>
    </section>
  );
};
