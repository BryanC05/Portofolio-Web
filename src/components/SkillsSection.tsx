import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Panel } from "@/components/Panel";
import { SectionShell } from "@/components/SectionShell";

const skillSets: Record<string, Array<{ name: string; category: string; level: number; note: string }>> = {
  all: [
    { name: "React & SPA Systems", category: "frontend", level: 92, note: "Component architecture, state flow, composable UI sections" },
    { name: "Tailwind & Design Systems", category: "frontend", level: 90, note: "Token-based styling, responsive polish, scalable utility patterns" },
    { name: "JavaScript / TypeScript", category: "frontend", level: 88, note: "Interactive logic, maintainable patterns, modern tooling" },
    { name: "Node & API Integration", category: "backend", level: 78, note: "Service wiring, auth-aware features, pragmatic backend support" },
    { name: "Data & Persistence", category: "backend", level: 72, note: "MongoDB, PostgreSQL, schema-aware implementation choices" },
    { name: "Workflow Tooling", category: "tools", level: 86, note: "Git, Figma, Docker, rapid iteration and handoff discipline" },
  ],
  frontend: [
    { name: "React", category: "frontend", level: 92, note: "Reusable components, routing, dynamic UI composition" },
    { name: "Tailwind CSS", category: "frontend", level: 90, note: "Design token systems, custom utilities, responsive styling" },
    { name: "Next.js", category: "frontend", level: 78, note: "App-like landing pages, performant rendering, structured layouts" },
    { name: "Motion Design", category: "frontend", level: 84, note: "Hover states, reveal choreography, tactile interface feedback" },
  ],
  backend: [
    { name: "Node.js", category: "backend", level: 78, note: "Supporting APIs, project services, backend integration work" },
    { name: "Express", category: "backend", level: 74, note: "REST structure, middleware flow, pragmatic server foundations" },
    { name: "MongoDB / PostgreSQL", category: "backend", level: 72, note: "Flexible and relational persistence depending on product needs" },
    { name: "Authentication", category: "backend", level: 70, note: "OAuth flows and user access considerations in app projects" },
  ],
  tools: [
    { name: "GitHub Workflow", category: "tools", level: 88, note: "Version control, collaboration, and portfolio deployment habits" },
    { name: "Figma", category: "tools", level: 82, note: "Layout planning, visual references, design-development alignment" },
    { name: "Docker", category: "tools", level: 68, note: "Container basics for local parity and simpler service setup" },
    { name: "Developer Tooling", category: "tools", level: 87, note: "Vite, VS Code, structured iteration, and fast debugging loops" },
  ],
};

const categories = ["all", "frontend", "backend", "tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [barsVisible, setBarsVisible] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const filteredSkills = useMemo(() => skillSets[activeCategory], [activeCategory]);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setBarsVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Reset animation on category change
  useEffect(() => {
    setBarsVisible(false);
    const t = setTimeout(() => setBarsVisible(true), 50);
    return () => clearTimeout(t);
  }, [activeCategory]);

  return (
    <SectionShell
      id="skills"
      eyebrow="Systems dashboard"
      title="A toolkit shaped for"
      accent="production-ready interfaces"
      description="Rather than chasing every framework equally, I focus on a practical stack that helps me design, build, and refine high-impact web experiences."
      className="bg-muted/30 dark:bg-muted/5"
    >
      <div className="space-y-8">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm capitalize tracking-[0.18em] transition-all duration-300",
                activeCategory === category
                  ? "border-primary/40 bg-primary/12 text-foreground shadow-[0_0_30px_hsl(var(--primary)/0.08)]"
                  : "border-border bg-muted/30 text-muted-foreground hover:border-primary/20 hover:text-foreground dark:border-border dark:bg-muted/10"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]" ref={gridRef}>
          <Panel className="motion-panel p-6 md:p-8">
            <div className="panel-line grid gap-5 pt-6 md:grid-cols-2">
              {filteredSkills.map((skill, i) => (
                <div
                  key={skill.name}
                  className="rounded-[1.4rem] border border-border/50 bg-muted/20 p-5 text-left transition-all duration-300 hover:border-primary/20 hover:bg-primary/5 dark:border-border dark:bg-muted/10"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{skill.category}</p>
                      <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-foreground">{skill.name}</h3>
                    </div>
                    <span className="text-sm font-medium text-foreground">{skill.level}%</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{skill.note}</p>
                  <div className="mt-5 h-2 rounded-full bg-secondary">
                    <div
                      className="h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: barsVisible ? `${skill.level}%` : "0%",
                        transitionDelay: `${i * 100}ms`,
                        background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))"
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="motion-panel p-6 md:p-8">
            <div className="panel-line space-y-6 pt-6 text-left">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Workflow signature</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-foreground">
                  Strong visual systems, grounded implementation choices.
                </h3>
              </div>
              <div className="space-y-4">
                {[
                  "Structure layouts before styling details.",
                  "Use motion to guide attention, not distract from content.",
                  "Keep components reusable so redesigns stay maintainable.",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-border/50 bg-muted/20 px-4 py-3 text-sm leading-6 text-muted-foreground transition-colors duration-300 hover:border-primary/15 dark:border-border dark:bg-muted/10">
                    {item}
                  </div>
                ))}
              </div>
              <div className="rounded-[1.5rem] border border-primary/20 bg-primary/5 p-5 dark:bg-primary/8">
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Best fit</p>
                <p className="mt-3 text-sm leading-7 text-foreground">
                  Portfolio sites, marketing surfaces, and interface-heavy products that need a cleaner visual system without sacrificing responsiveness.
                </p>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </SectionShell>
  );
};
