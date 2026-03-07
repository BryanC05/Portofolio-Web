import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const navItems = [
  { name: "Overview", href: "#hero" },
  { name: "Profile", href: "#about" },
  { name: "Systems", href: "#skills" },
  { name: "Operations", href: "#projects" },
  { name: "Comms", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useActiveSection();
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 py-4">
      {/* Scroll progress bar */}
      <div
        className="scroll-progress fixed inset-x-0 top-0 z-[60] h-[2px]"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <div className="container transition-all duration-500">
        <div
          className={cn(
            "mx-auto flex items-center justify-between gap-4 rounded-full border px-4 py-3 transition-all duration-500 md:px-6",
            "bg-background/70 backdrop-blur-xl dark:bg-background/55",
            isScrolled
              ? "border-border/60 shadow-[0_8px_32px_hsl(var(--primary)/0.06)] dark:border-border dark:shadow-[0_20px_50px_rgba(0,0,0,0.28)]"
              : "border-border/40 dark:border-border/60"
          )}
        >
          <a href="#hero" className="flex items-center gap-3 text-left">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-xs font-semibold uppercase tracking-[0.24em] text-primary transition-colors duration-300">
              BC
            </span>
            <div className="hidden sm:block">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Endfield-inspired
              </p>
              <p className="text-sm font-semibold tracking-[0.16em] text-foreground sm:text-base">
                Bryan Chan
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-all duration-300",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-primary/10 dark:bg-primary/15" />
                  )}
                  <span className="relative">{item.name}</span>
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <span className="data-pill hidden md:inline-flex">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Available
            </span>
            <a href="#contact" className="action-button hidden md:inline-flex">
              Open Channel
            </a>
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted/50 text-foreground transition-colors hover:bg-primary/10 lg:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className={`transition-transform duration-300 ${isMenuOpen ? "rotate-90" : ""}`}>
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "absolute inset-x-4 top-[calc(100%+0.5rem)] origin-top rounded-[1.5rem] border border-border bg-background/95 p-5 backdrop-blur-xl transition-all duration-300 lg:hidden",
          isMenuOpen
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        )}
      >
        <div className="space-y-2">
          {navItems.map((item, i) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition-all duration-300",
                  isActive
                    ? "border-primary/20 bg-primary/8 text-foreground"
                    : "border-transparent bg-muted/30 text-foreground/80 hover:border-border hover:bg-muted/50 dark:bg-muted/20"
                )}
                style={{ transitionDelay: isMenuOpen ? `${i * 50}ms` : "0ms" }}
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{item.name}</span>
                <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Go</span>
              </a>
            );
          })}
          <a
            href="#contact"
            className="mt-3 flex items-center justify-center rounded-full border border-primary/30 bg-primary/12 px-4 py-3 text-sm font-medium text-foreground"
            onClick={() => setIsMenuOpen(false)}
          >
            Open Channel
          </a>
        </div>
      </div>
    </nav>
  );
};
