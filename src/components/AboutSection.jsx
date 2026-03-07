import { BriefcaseBusiness, Layers3, Sparkles, Waypoints } from "lucide-react";
import { Panel } from "@/components/Panel";
import { SectionShell } from "@/components/SectionShell";

const capabilities = [
  {
    title: "Interface Engineering",
    description:
      "Responsive frontend systems built with durable component architecture, clean interaction states, and performance in mind.",
    icon: Layers3,
  },
  {
    title: "Product Experience",
    description:
      "Translating abstract ideas into intuitive page flows, information hierarchy, and polished visual rhythm.",
    icon: Sparkles,
  },
  {
    title: "Delivery Discipline",
    description:
      "From prototyping to implementation, I keep scope clear, move deliberately, and optimize for shippable outcomes.",
    icon: BriefcaseBusiness,
  },
];

const markers = ["Frontend-first", "Design-aware", "Fast iteration", "Collaborative workflow"];

export const AboutSection = () => {
  return (
    <SectionShell
      id="about"
      eyebrow="Profile dossier"
      title="Built for teams that need"
      accent="clarity under complexity"
      description="I approach portfolio and product work like a systems problem: define the signal, shape the interface around it, and refine the experience until it feels precise."
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Panel className="motion-panel p-6 md:p-8">
          <div className="panel-line space-y-6 pt-6">
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-muted-foreground">
              <Waypoints size={16} className="text-primary" />
              Operational philosophy
            </div>
            <div className="space-y-5 text-left">
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-foreground md:text-3xl">
                Premium interfaces should feel engineered, not merely decorated.
              </h3>
              <p className="leading-7 text-muted-foreground">
                My work centers on the overlap between frontend development and visual composition.
                I enjoy building pages that read instantly, move smoothly, and reinforce the product story
                through structure—not just styling.
              </p>
              <p className="leading-7 text-muted-foreground">
                Whether the project is a landing page, dashboard, or application surface, I aim to deliver
                layouts that hold up across breakpoints and interaction states while staying easy to extend.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {markers.map((marker) => (
                <span key={marker} className="data-pill">
                  {marker}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="#contact" className="action-button">
                Discuss a project
              </a>
              <a href="https://github.com/BryanC05" target="_blank" rel="noreferrer" className="action-button-secondary">
                Browse code archive
              </a>
            </div>
          </div>
        </Panel>

        <div className="grid gap-5">
          {capabilities.map(({ title, description, icon: Icon }) => (
            <Panel key={title} className="motion-panel p-6">
              <div className="flex items-start gap-4 text-left">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                  <Icon size={22} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold tracking-[-0.02em] text-foreground">{title}</h4>
                  <p className="leading-7 text-muted-foreground">{description}</p>
                </div>
              </div>
            </Panel>
          ))}
        </div>
      </div>
    </SectionShell>
  );
};
