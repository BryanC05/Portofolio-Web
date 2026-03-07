import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Panel } from "@/components/Panel";
import { SectionShell } from "@/components/SectionShell";

const projects = [
  {
    id: 1,
    title: "Image Search MERN OAuth",
    description:
      "A MERN-based image search application with OAuth authentication, focused on account-aware flows and a responsive search experience.",
    image: "/projects/project3.png",
    tags: ["React", "Node.js", "OAuth", "API"],
    demoUrl: "#",
    githubUrl: "https://github.com/BryanC05/Image-Search-MERN-OAuth",
    status: "Featured operation",
  },
  {
    id: 2,
    title: "E-Commerce Order Log System",
    description:
      "A backend-focused system exploring hybrid microservice architecture for order management and operational reliability.",
    image: "/projects/project2.png",
    tags: ["Laravel", "PHP", "JavaScript", "Operations"],
    demoUrl: "#",
    githubUrl: "https://github.com/BryanC05/E-Commerce-Order-Log-System",
    status: "System build",
  },
  {
    id: 3,
    title: "Weather App",
    description:
      "A lightweight weather interface that surfaces current conditions and practical day-of recommendations through API-driven data.",
    image: "/projects/project1.png",
    tags: ["API", "JavaScript", "CSS", "HTML"],
    demoUrl: "#",
    githubUrl: "https://github.com/BryanC05/Weather-App",
    status: "Utility concept",
  },
];

export const ProjectsSection = () => {
  const [featured, ...supporting] = projects;

  return (
    <SectionShell
      id="projects"
      eyebrow="Selected operations"
      title="Projects that balance"
      accent="execution and presentation"
      description="These builds highlight how I approach different problem spaces, from polished user-facing interfaces to systems-oriented implementation work."
      align="center"
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Panel className="motion-panel p-4 md:p-5">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/20">
              <img
                src={featured.image}
                alt={featured.title}
                className="h-full min-h-72 w-full object-cover transition-transform duration-700 hover:scale-105"
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
                    <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={featured.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="action-button"
                >
                  Source <Github size={16} />
                </a>
                <a
                  href={featured.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="action-button-secondary"
                >
                  Live preview <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </Panel>

        <div className="grid gap-5">
          {supporting.map((project) => (
            <Panel key={project.id} className="motion-panel p-4">
              <div className="grid gap-4 sm:grid-cols-[120px_1fr] sm:items-center">
                <div className="overflow-hidden rounded-[1.1rem] border border-white/10 bg-black/25">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-28 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-32"
                  />
                </div>
                <div className="space-y-3 text-left">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold tracking-[-0.03em] text-foreground">{project.title}</h3>
                    <span className="text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={`${project.id}-${tag}`} className="rounded-full border border-white/10 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
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
        <a
          className="action-button"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/BryanC05"
        >
          Explore full GitHub archive <ArrowRight size={16} />
        </a>
      </div>
    </SectionShell>
  );
};
