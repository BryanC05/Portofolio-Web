import { BriefcaseBusiness, Layers3, Sparkles, Waypoints } from "lucide-react";
import { Panel } from "@/components/Panel";
import { SectionShell } from "@/components/SectionShell";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const iconMap = {
  Layers3: Layers3,
  Sparkles: Sparkles,
  BriefcaseBusiness: BriefcaseBusiness,
};

export const AboutSection = () => {
  const { data, loading } = usePortfolioData();

  if (loading || !data) return null;

  const { capabilities, markers } = data;

  return (
    <SectionShell
      id="about"
      eyebrow="About Me"
      title="Built for teams that need"
      accent="clarity under complexity"
      description="I approach portfolio and product work like a development challenge: define the signal, shape the interface around it, and refine the experience until it feels precise."
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Panel className="p-6 md:p-8" variant="default">
          <div className="space-y-6 pt-2">
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              <Waypoints size={16} className="text-primary text-glow" />
              PHILOSOPHY // ACTIVE
            </div>
            
            <div className="space-y-5 text-left">
              <h3 className="text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl leading-snug">
                Premium interfaces should feel engineered, not merely decorated.
              </h3>
              <p className="text-sm leading-7 text-muted-foreground/90">
                My work centers on the overlap between frontend development and visual composition.
                I enjoy building pages that read instantly, move smoothly, and reinforce the product story
                through structure—not just styling.
              </p>
              <p className="text-sm leading-7 text-muted-foreground/90 border-l border-primary/20 pl-4">
                Whether the project is a landing page, dashboard, or application surface, I aim to deliver
                layouts that hold up across breakpoints and interaction states while staying easy to extend.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {markers.map((marker) => (
                <span key={marker} className="data-pill">
                  {marker}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row pt-2">
              <a href="#contact" className="action-button">
                Discuss a project
              </a>
              <a href="https://github.com/BryanC05" target="_blank" rel="noreferrer" className="action-button-secondary">
                Browse code archive
              </a>
            </div>
          </div>
        </Panel>

        {/* Right column capabilities */}
        <div className="grid gap-5">
          {capabilities.map(({ code, title, description, iconName }) => {
            const Icon = iconMap[iconName] || Sparkles;
            return (
              <Panel key={title} className="p-6" variant="alt">
                <div className="flex items-start gap-4 text-left">
                  {/* Icon wrapper inside a stylized diamond border */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-primary/30 bg-primary/10 text-primary transition-all duration-300 hover:bg-primary/25"
                       style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
                    <Icon size={20} className="text-glow" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-accent">{code}</span>
                      <h4 className="text-base font-bold uppercase tracking-wide text-foreground">{title}</h4>
                    </div>
                    <p className="text-xs leading-6 text-muted-foreground/90">{description}</p>
                  </div>
                </div>
              </Panel>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
};
