import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Panel } from "@/components/Panel";
import { SectionShell } from "@/components/SectionShell";

const skillSets = {
  all: [
    {
      name: "Frontend Development",
      category: "frontend",
      level: 92,
      note: "Component architecture, state flow, composable UI sections",
    },
    {
      name: "Styling & UI Systems",
      category: "frontend",
      level: 90,
      note: "CSS-in-JS, Tailwind, design systems, responsive polish",
    },
    {
      name: "JavaScript / TypeScript",
      category: "frontend",
      level: 88,
      note: "Interactive logic, maintainable patterns, modern tooling",
    },
    {
      name: "Node & API Integration",
      category: "backend",
      level: 78,
      note: "Service wiring, auth-aware features, pragmatic backend support",
    },
    {
      name: "Data & Persistence",
      category: "backend",
      level: 72,
      note: "MongoDB, PostgreSQL, schema-aware implementation choices",
    },
    {
      name: "Workflow Tooling",
      category: "tools",
      level: 86,
      note: "Git, Figma, Docker, rapid iteration and handoff discipline",
    },
  ],
  frontend: [
    {
      name: "React",
      category: "frontend",
      level: 92,
      note: "Reusable components, routing, dynamic UI composition",
    },
    {
      name: "Tailwind CSS",
      category: "frontend",
      level: 90,
      note: "Design systems, custom utilities, responsive styling",
    },
    {
      name: "Next.js",
      category: "frontend",
      level: 78,
      note: "Server-side rendering, performant layouts, SEO optimization",
    },
    {
      name: "Motion Design",
      category: "frontend",
      level: 84,
      note: "Tactile interface feedback, smooth transitions, reveal choreography",
    },
  ],
  backend: [
    {
      name: "Node.js",
      category: "backend",
      level: 78,
      note: "Supporting APIs, project services, backend integration work",
    },
    {
      name: "Express",
      category: "backend",
      level: 74,
      note: "REST structure, middleware flow, pragmatic server foundations",
    },
    {
      name: "MongoDB / PostgreSQL",
      category: "backend",
      level: 72,
      note: "Flexible and relational persistence depending on product needs",
    },
    {
      name: "Authentication",
      category: "backend",
      level: 70,
      note: "OAuth flows and user access considerations in app projects",
    },
  ],
  tools: [
    {
      name: "GitHub Workflow",
      category: "tools",
      level: 88,
      note: "Version control, collaboration, and project deployment habits",
    },
    {
      name: "Figma",
      category: "tools",
      level: 82,
      note: "Layout planning, visual references, design-development alignment",
    },
    {
      name: "Docker",
      category: "tools",
      level: 68,
      note: "Container basics for local parity and simpler service setup",
    },
    {
      name: "Developer Tooling",
      category: "tools",
      level: 87,
      note: "Vite, VS Code, structured iteration, and fast debugging loops",
    },
  ],
};

const categories = ["all", "frontend", "backend", "tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredSkills = useMemo(() => skillSets[activeCategory], [activeCategory]);

  return (
    <SectionShell
      id="skills"
      eyebrow="Skills & Tools"
      title="A toolkit shaped for"
      accent="production-ready interfaces"
      description="I focus on a practical stack that helps me design, build, and refine high-impact web applications."
      className="bg-white/[0.015]"
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
                  ? "border-primary/40 bg-primary/12 text-foreground shadow-[0_0_30px_rgba(82,142,255,0.12)]"
                  : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Panel className="motion-panel p-6 md:p-8">
            <div className="panel-line grid gap-5 pt-6 md:grid-cols-2">
              {filteredSkills.map((skill) => (
                <div key={skill.name} className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-5 text-left">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                        {skill.category}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-foreground">
                        {skill.name}
                      </h3>
                    </div>
                    <span className="text-sm font-medium text-foreground">{skill.level}%</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{skill.note}</p>
                  <div className="mt-5 h-2 rounded-full bg-background/80">
                    <div
                      className="h-2 rounded-full bg-linear-to-r from-primary via-sky-300 to-accent transition-all duration-700"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="motion-panel p-6 md:p-8">
            <div className="panel-line space-y-6 pt-6 text-left">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                  Workflow approach
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-foreground">
                  High-quality user interfaces, grounded implementation choices.
                </h3>
              </div>
              <div className="space-y-4">
                {[
                  "Structure layouts before styling details.",
                  "Use motion to guide attention, not distract from content.",
                  "Keep components reusable so redesigns stay maintainable.",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-muted-foreground">
                    {item}
                  </div>
                ))}
              </div>
              <div className="rounded-[1.5rem] border border-primary/20 bg-primary/8 p-5">
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
