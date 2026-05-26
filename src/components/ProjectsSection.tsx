import { ArrowRight, ExternalLink, Github, Info } from "lucide-react";
import { Panel } from "@/components/Panel";
import { SectionShell } from "@/components/SectionShell";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProjectDetails {
  stack: Array<{ category: string; items: string[] }>;
  setup: string[];
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  status: string;
  details?: ProjectDetails;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Dagangly",
    description: "Dagangly is a comprehensive, multi-platform e-commerce ecosystem designed to connect local buyers with Micro, Small, and Medium Enterprises (MSMEs/UMKM). The platform provides robust tools for sellers to manage their business, automate workflows, and reach customers, while offering buyers a highly accessible, modern, and secure shopping experience.",
    details: {
      stack: [
        {
          category: "Frontend (Web)",
          items: [
            "Framework: React.js (Vite)",
            "Styling: Tailwind CSS",
            "Features: PWA Support, Responsive Design, Accessibility-First",
          ],
        },
        {
          category: "Mobile App",
          items: [
            "Framework: React Native (Expo)",
            "Distribution: Android EAS Build (APK & AAB)",
            "Features: Google Maps, Firebase Push Notifications, Biometrics",
          ],
        },
        {
          category: "Backend & Database",
          items: [
            "Language: Go (Golang) with Gin framework",
            "MongoDB: Main application data",
            "PostgreSQL: n8n workflow engine persistence",
            "Storage: AWS S3 / Cloudinary for persistent uploads",
          ],
        },
      ],
      setup: ["Docker & Docker Compose", "Node.js 18+", "Go 1.20+", "MongoDB"],
    },
    image: "/projects/project1.png",
    tags: ["React", "Go", "MongoDB", "Native"],
    demoUrl: "https://dagangly.vercel.app/",
    githubUrl: "https://github.com/BryanC05/dagangly",
    status: "Featured project",
  },
  {
    id: 2,
    title: "Delphi Nexus",
    description: "Delphi Nexus is a futuristic, cyberpunk-themed monitoring dashboard designed for real-time intelligence gathering. It provides a centralized hub for tracking everything from global news and cybersecurity threats to aerospace launches and solar weather.",
    image: "/projects/project2.png",
    tags: ["Laravel", "PHP", "JavaScript", "SQL"],
    demoUrl: "https://delphi-nexus.vercel.app/",
    githubUrl: "https://github.com/BryanC05/delphi-nexus",
    status: "Backend build",
  },
  {
    id: 3,
    title: "PDF Forge",
    description: "A powerful, open-source web application for manipulating PDF files. Merge, split, organize, compress, and more - all in your browser with a privacy-focused backend.",
    image: "/projects/project3.png",
    tags: ["React", "PDF.js", "WebAssembly", "Tool"],
    demoUrl: "https://pdf-tools-sooty.vercel.app/",
    githubUrl: "https://github.com/BryanC05/PDF-Tools",
    status: "Utility application",
  },
];

export const ProjectsSection = () => {
  const [featured, ...supporting] = projects;
  const contentRef = useScrollReveal<HTMLDivElement>();

  return (
    <SectionShell
      id="projects"
      eyebrow="Selected Projects"
      title="Projects that balance"
      accent="execution and presentation"
      description="These builds highlight how I approach different project requirements, from polished user-facing interfaces to functional implementation work."
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
                    <span
                      key={tag}
                      className="rounded-full border border-border/50 bg-muted/30 px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 hover:border-primary/25 hover:text-foreground dark:border-border dark:bg-muted/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={featured.githubUrl} target="_blank" rel="noreferrer" className="action-button">
                  Source <Github size={16} />
                </a>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="action-button-secondary">
                      Details <Info size={16} />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl border-border bg-background/95 backdrop-blur-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-semibold">{featured.title} // Technical Details</DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        Architecture, stack, and development environment overview.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-6 space-y-8 text-left">
                      {featured.details && (
                        <>
                          <div className="grid gap-6 sm:grid-cols-2">
                            {featured.details.stack.map((group) => (
                              <div key={group.category} className="space-y-3">
                                <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">
                                  {group.category}
                                </h4>
                                <ul className="space-y-2">
                                  {group.items.map((item) => (
                                    <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/50" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>

                          <div className="rounded-2xl border border-border/50 bg-muted/30 p-5 dark:border-border dark:bg-muted/10">
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
                              Local Development Setup
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {featured.details.setup.map((item) => (
                                <span key={item} className="rounded-lg border border-border bg-background/50 px-3 py-1.5 text-xs text-foreground">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                <a
                  href={featured.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-4 py-2 text-sm text-foreground transition-all hover:bg-primary/10 dark:bg-muted/10"
                >
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
