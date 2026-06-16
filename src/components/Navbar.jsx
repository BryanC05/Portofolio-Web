import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const navItems = [
  { name: "About", href: "#about", code: "01" },
  { name: "Skills", href: "#skills", code: "02" },
  { name: "Projects", href: "#projects", code: "03" },
  { name: "Contact", href: "#contact", code: "04" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Determine active section based on scroll position
      const sections = ["about", "skills", "projects", "contact"];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      setActiveItem(current ? `#${current}` : "");
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 py-4 transition-all duration-300">
      <div
        className={cn(
          "container transition-all duration-500",
          isScrolled ? "translate-y-0" : "translate-y-1"
        )}
      >
        <div
          className={cn(
            "mx-auto flex items-center justify-between gap-4 border px-8 py-3 md:px-10 transition-all duration-300",
            "bg-[rgba(8,18,34,0.96)] border-primary/25",
            isScrolled
              ? "shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(0,229,255,0.1)] border-primary/45"
              : "border-primary/20"
          )}
          style={{
            clipPath: "polygon(0 0, 100% 0, calc(100% - 15px) 100%, 15px 100%)",
          }}
        >
          {/* Logo / Monogram */}
          <a href="#hero" className="flex items-center gap-3 text-left group">
            <div className="relative flex h-10 w-10 items-center justify-center border border-primary/40 bg-primary/10 text-xs font-bold tracking-widest text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-background group-hover:shadow-[0_0_15px_rgba(0,229,255,0.6)] group-hover:border-primary"
                 style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
              <span className="relative z-10">BC</span>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-foreground transition-colors group-hover:text-primary">
                Bryan Chan
              </p>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item, index) => {
              const isActive = activeItem === item.href;
              return (
                <div key={item.name} className="flex items-center">
                  {index > 0 && (
                    <span className="text-[10px] font-bold text-primary/30 mx-2 tracking-widest">//</span>
                  )}
                  <a
                    href={item.href}
                    onClick={() => setActiveItem(item.href)}
                    className={cn(
                      "relative rounded-sm px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:text-primary",
                      isActive ? "text-primary text-glow" : "text-muted-foreground"
                    )}
                  >
                    <span className="text-[9px] font-bold text-accent mr-1.5">{item.code}</span>
                    {item.name}
                    
                    {/* Sliding active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-4 right-4 h-[2px] bg-primary"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        style={{ boxShadow: "0 0 10px rgba(0, 229, 255, 0.8)" }}
                      />
                    )}
                  </a>
                </div>
              );
            })}
          </div>

          {/* Status Pill and CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <span className="data-pill-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#ffd700]" />
              AVAILABLE
            </span>
            <Link to="/admin" className="action-button-secondary py-2.5 px-3">
              SYSTEM
            </Link>
            <a href="#contact" className="action-button">
              Get in Touch
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center border border-primary/30 bg-primary/5 text-foreground transition-colors hover:bg-primary/10 hover:text-primary md:hidden"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 80%, 80% 100%, 0 100%)" }}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-4 top-[calc(100%+0.5rem)] rounded-2xl border border-primary/35 bg-[rgba(5,13,26,0.96)] p-5 backdrop-blur-2xl md:hidden"
            style={{ boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 229, 255, 0.15)" }}
          >
            <div className="space-y-3">
              {navItems.map((item, index) => {
                const isActive = activeItem === item.href;
                return (
                  <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between border-b border-primary/10 px-4 py-3.5 text-sm font-bold uppercase tracking-[0.2em] transition-all hover:bg-primary/5",
                      isActive ? "text-primary border-l-2 border-l-primary" : "text-foreground"
                    )}
                    onClick={() => {
                      setIsMenuOpen(false);
                      setActiveItem(item.href);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-accent">{item.code}</span>
                      <span>{item.name}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-primary/60">GO</span>
                  </motion.a>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.08 }}
                className="mt-4 w-full"
              >
                <Link
                  to="/admin"
                  className="flex items-center justify-center action-button-secondary w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  SYSTEM
                </Link>
              </motion.div>
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navItems.length + 1) * 0.08 }}
                href="#contact"
                className="flex items-center justify-center action-button w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
