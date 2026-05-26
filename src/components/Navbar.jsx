import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 py-4">
      <div
        className={cn(
          "container transition-all duration-500",
          isScrolled ? "translate-y-0" : "translate-y-0"
        )}
      >
        <div
          className={cn(
            "mx-auto flex items-center justify-between gap-4 rounded-full border px-4 py-3 md:px-6",
            "bg-background/55 backdrop-blur-xl",
            isScrolled
              ? "border-white/14 shadow-[0_20px_50px_rgba(0,0,0,0.28)]"
              : "border-white/10"
          )}
        >
          <a href="#hero" className="flex items-center gap-3 text-left">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              BC
            </span>
            <div>
              <p className="text-sm font-semibold tracking-[0.16em] text-foreground sm:text-base">
                Bryan Chan
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-all duration-300 hover:bg-white/7 hover:text-foreground"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <span className="data-pill">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Available for projects
            </span>
            <a href="#contact" className="action-button">
              Get in Touch
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-foreground transition-colors hover:bg-white/10 md:hidden"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "absolute inset-x-4 top-[calc(100%+0.5rem)] origin-top rounded-[1.5rem] border border-white/10 bg-background/92 p-5 backdrop-blur-xl transition-all duration-300 md:hidden",
          isMenuOpen
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        )}
      >
        <div className="space-y-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center justify-between rounded-2xl border border-transparent bg-white/4 px-4 py-3 text-sm text-foreground/90 transition-all hover:border-white/10 hover:bg-white/8"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>{item.name}</span>
              <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                View
              </span>
            </a>
          ))}
          <a
            href="#contact"
            className="mt-3 flex items-center justify-center rounded-full border border-primary/30 bg-primary/12 px-4 py-3 text-sm font-medium text-foreground"
            onClick={() => setIsMenuOpen(false)}
          >
            Get in Touch
          </a>
        </div>
      </div>
    </nav>
  );
};
