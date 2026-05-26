import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const Footer = () => {
  const ref = useScrollReveal<HTMLElement>();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={ref} className="relative px-4 pb-10">
      <div className="container">
        <div className="reveal-up flex flex-col gap-4 rounded-[1.6rem] border border-border bg-background/70 px-5 py-5 backdrop-blur-xl md:flex-row md:items-center md:justify-between md:px-6">
          <div className="text-left">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-foreground">Bryan Chan</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Interface-focused frontend developer crafting premium web experiences.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <span className="data-pill justify-center">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Status: available for select projects
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-muted/30 px-4 py-2.5 text-sm text-foreground transition-all duration-300 hover:border-primary/30 hover:bg-primary/10 dark:bg-muted/10"
            >
              Back to top <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
        <p className="mt-4 text-center text-xs uppercase tracking-[0.24em] text-muted-foreground">
          © {new Date().getFullYear()} Bryan Chan · Available for new projects
        </p>
      </div>
    </footer>
  );
};
