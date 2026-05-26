import { ArrowUpRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative px-4 pb-10">
      <div className="container">
        <div className="flex flex-col gap-4 rounded-[1.6rem] border border-white/10 bg-background/70 px-5 py-5 backdrop-blur-xl md:flex-row md:items-center md:justify-between md:px-6">
          <div className="text-left">
            <p className="text-sm font-medium tracking-[0.18em] text-foreground uppercase">Bryan Chan</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Interface-focused frontend developer crafting premium web experiences.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <span className="data-pill justify-center">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Status: available for select projects
            </span>
            <a
              href="#hero"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground transition-colors hover:border-primary/30 hover:bg-primary/10"
            >
              Back to top <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <p className="mt-4 text-center text-xs uppercase tracking-[0.24em] text-muted-foreground">
          © {new Date().getFullYear()} Bryan Chan · Available for new projects
        </p>
      </div>
    </footer>
  );
};
