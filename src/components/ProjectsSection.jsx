import { ArrowRight, ExternalLink, Github, Info } from "lucide-react";
import { Panel } from "@/components/Panel";
import { SectionShell } from "@/components/SectionShell";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const ProjectsSection = () => {
  const { data, loading } = usePortfolioData();
  const [selectedImage, setSelectedImage] = useState(null);

  if (loading || !data) return null;

  const { projects } = data;
  const [featured, ...supporting] = projects;

  return (
    <SectionShell
      id="projects"
      eyebrow="Selected Projects"
      title="Projects that balance"
      accent="execution and presentation"
      description="These builds highlight how I approach different project requirements, from polished user-facing interfaces to functional implementation work."
      align="center"
    >
      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        {/* Left Side: Featured Project */}
        {featured && (
          <Panel className="p-4 md:p-6" variant="default">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] pt-2">
              {/* Project Image wrapped in custom shear clip path */}
              <div className="overflow-hidden border border-primary/20 bg-secondary/60 relative group cursor-pointer"
                   style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%)" }}
                   onClick={() => setSelectedImage({ url: featured.image, title: featured.title })}
              >
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="h-full min-h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Details panel */}
              <div className="flex flex-col justify-between gap-6 text-left p-1">
                <div className="space-y-4">
                  <span className="data-pill-gold">{featured.status}</span>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-foreground text-glow">
                      {featured.title}
                    </h3>
                    <p className="mt-3 text-xs leading-6 text-muted-foreground/90">{featured.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-1">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="data-pill"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action items */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-primary/15">
                  <a
                    href={featured.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="action-button"
                  >
                    Source <Github size={14} />
                  </a>

                  {/* Dialog custom styling to fit P3R layout */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="action-button-secondary">
                        Details <Info size={14} />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl border-primary/35 bg-[rgba(6,14,28,0.95)] backdrop-blur-2xl text-foreground"
                                   style={{
                                     clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%)",
                                     boxShadow: "0 0 40px rgba(0, 229, 255, 0.25)"
                                   }}>
                      <DialogHeader className="border-b border-primary/20 pb-4">
                        <DialogTitle className="text-xl font-black uppercase tracking-wide text-glow text-primary flex items-center gap-2">
                          <span>{featured.title}</span>
                          <span className="text-xs text-accent font-bold">// TECHNICAL SPEC</span>
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground text-xs uppercase tracking-wider">
                          Architecture, stack, and development environment overview.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="mt-4 space-y-6 text-left max-h-[60vh] overflow-y-auto pr-2">
                        {featured.details && (
                          <>
                            <div className="grid gap-4 sm:grid-cols-2">
                              {featured.details.stack.map((group) => (
                                <div key={group.category} className="border border-primary/15 bg-primary/5 p-4"
                                     style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)" }}>
                                  <h4 className="text-xs font-bold uppercase tracking-wider text-accent mb-2">
                                    {group.category}
                                  </h4>
                                  <ul className="space-y-1.5">
                                    {group.items.map((item) => (
                                      <li key={item} className="text-xs text-muted-foreground flex items-start gap-1.5">
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-primary/60" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>

                            <div className="border border-primary/15 bg-primary/5 p-4"
                                 style={{ clipPath: "polygon(8px 0, 100% 0, 100% 100%, 0 100%)" }}>
                              <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                                Local Development Setup
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {featured.details.setup.map((item) => (
                                  <span key={item} className="border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-mono text-foreground">
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
                    className="action-button-secondary py-3.5"
                    style={{ paddingRight: "1.25rem", paddingLeft: "1.25rem" }}
                  >
                    Live <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </Panel>
        )}

        {/* Right Side: Supporting Projects List */}
        <div className="grid gap-5">
          {supporting.map((project) => (
            <Panel key={project.id} className="p-4" variant="alt">
              <div className="grid gap-4 sm:grid-cols-[110px_1fr] sm:items-center pt-1">
                {/* Styled image with diagonal clip */}
                <div className="overflow-hidden border border-primary/15 bg-secondary/80 cursor-pointer group relative"
                     style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)" }}
                     onClick={() => setSelectedImage({ url: project.image, title: project.title })}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-24 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-28"
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                
                <div className="space-y-3 text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold uppercase tracking-wide text-foreground text-glow">{project.title}</h3>
                    <span className="text-[8px] font-bold border border-primary/20 px-2 py-0.5 uppercase tracking-widest text-primary/80">
                      {project.status}
                    </span>
                  </div>
                  
                  <p className="text-xs leading-5 text-muted-foreground/80">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={`${project.id}-${tag}`} className="border border-primary/10 bg-primary/[0.02] px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-muted-foreground/85">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-1 border-t border-primary/10">
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground hover:text-primary transition-colors">
                      <Github size={13} /> Repo
                    </a>
                    <a href={project.demoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground hover:text-primary transition-colors">
                      <ExternalLink size={13} /> Demo
                    </a>
                  </div>
                </div>
              </div>
            </Panel>
          ))}
        </div>
      </div>

      {/* Explore full GitHub CTA */}
      <div className="mt-10 text-center">
        <a
          className="action-button"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/BryanC05"
        >
          Explore full GitHub archive <ArrowRight size={14} className="text-glow" />
        </a>
      </div>

      {/* Lightbox Image Preview Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent 
          className="max-w-4xl border-primary/30 bg-[rgba(6,14,28,0.98)] text-foreground p-3"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%)",
            boxShadow: "0 0 50px rgba(0, 229, 255, 0.35)"
          }}
        >
          <div className="relative w-full h-full flex flex-col items-center">
            {/* Title & Close Info */}
            <div className="w-full flex justify-between items-center px-4 py-2 border-b border-primary/20 text-xs font-bold uppercase tracking-wider text-primary">
              <span>{selectedImage?.title} // INTERFACE VIEW</span>
              <span className="text-accent text-[9px]">// CLICK OUTSIDE TO DISMISS</span>
            </div>
            <div className="w-full p-2 flex justify-center items-center bg-secondary/40 border border-primary/10 mt-3"
                 style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%)" }}>
              <img
                src={selectedImage?.url}
                alt={selectedImage?.title}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </SectionShell>
  );
};
