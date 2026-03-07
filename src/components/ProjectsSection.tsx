import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Panel } from "@/components/Panel";
import { SectionShell } from "@/components/SectionShell";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const projects = [
  {
    id: 1,
    title: "Image Search MERN OAuth",
    description: "A MERN-based image search application with OAuth authentication, focused on account-aware flows and a responsive search experience.",
    image: "/projects/project3.png",
    tags: ["React", "Node.js", "OAuth", "API"],
    demoUrl: "#",
    githubUrl: "https://github.com/BryanC05/Image-Search-MERN-OAuth",
    status: "Featured operation",
  },
  {
    id: 2,
    title: "E-Commerce Order Log System",
    description: "A backend-focused system exploring hybrid microservice architecture for order management and operational reliability.",
    image: "/projects/project2.png",
    tags: ["Laravel", "PHP", "JavaScript", "Operations"],
    demoUrl: "#",
    githubUrl: "https://github.com/BryanC05/E-Commerce-Order-Log-System",
    status: "System build",
  },
  {
    id: 3,
    title: "Weather App",
    description: "A lightweight weather interface that surfaces current conditions and practical day-of recommendations through API-driven data.",
    image: "/projects/project1.png",
    tags: ["API", "JavaScript", "CSS", "HTML"],
    demoUrl: "#",
    githubUrl: "https://github.com/BryanC05/Weather-App",
    status: "Utility concept",
  },
];

export const ProjectsSection = () => {
  const [featured, ...supporting] = projects;
  const contentRef = useScrollReveal<HTMLDivElement>();

  return (
    <SectionShell
      id="projects"
      eyebrow="Selected operations"
      title="Projects that balance"
      accent="execution and presentation"
      description="These builds highlight how I approach different problem spaces, from polished user-facing interfaces to systems-oriented implementation work."
      align="center"
    >
      <div ref={contentRef} className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Panel className="motion-panel reveal-up p-4 md:p-5">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="group overflow-hidden rounded-[1.5rem] border border-border/50 bg-muted/20 dark:border-border dark:bg-card/30">
              <img
                src={featured.image}
                alt={featured.title}
                className="h-full min-h-72 w-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col justify-between gap-6 p-2 text-left md:p-4">
              <div className="space-y-4">
                <span className="data-pill">{featured.status}</span>
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.04em] text-foreground md:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="mt-4 leading-7 text-muted-foreground">{featured.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-border/50 bg-muted/30 px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 hover:border-primary/25 hover:text-foreground dark:border-border dark:bg-muted/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={featured.githubUrl} target="_blank" rel="noreferrer" className="action-button">
                  Source <Github size={16} />
                </a>
                <a href={featured.demoUrl} target="_blank" rel="noreferrer" className="action-button-secondary">
                  Live preview <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </Panel>

        <div className="grid gap-5">
          {supporting.map((project, i) => (
            <Panel key={project.id} className="motion-panel reveal-up p-4 group" style={{ transitionDelay: `${(i + 1) * 150}ms` } as React.CSSProperties}>
              <div className="grid gap-4 sm:grid-cols-[120px_1fr] sm:items-center">
                <div className="overflow-hidden rounded-[1.1rem] border border-border/50 bg-muted/20 dark:border-border dark:bg-card/30">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-28 w-full object-cover transition-transform duration-700 group-hover:scale-110 sm:h-32"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-3 text-left">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold tracking-[-0.03em] text-foreground">{project.title}</h3>
                    <span className="text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">{project.status}</span>
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={`${project.id}-${tag}`} className="rounded-full border border-border/50 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-primary/25 dark:border-border">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-1">
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-primary">
                      <Github size={15} /> Repo
                    </a>
                    <a href={project.demoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-primary">
                      <ExternalLink size={15} /> Demo
                    </a>
                  </div>
                </div>
              </div>
            </Panel>
          ))}
        </div>
      </div>

      <div className="mt-10 text-center">
        <a className="action-button" target="_blank" rel="noreferrer" href="https://github.com/BryanC05">
          Explore full GitHub archive <ArrowRight size={16} />
        </a>
      </div>
    </SectionShell>
  );
};
