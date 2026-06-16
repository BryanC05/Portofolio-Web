import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Panel } from "@/components/Panel";
import { SectionShell } from "@/components/SectionShell";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const categories = ["all", "frontend", "backend", "tools"];

export const SkillsSection = () => {
  const { data, loading } = usePortfolioData();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = useMemo(() => {
    if (!data) return [];
    return data.skillSets[activeCategory] || [];
  }, [data, activeCategory]);

  if (loading || !data) return null;

  return (
    <SectionShell
      id="skills"
      eyebrow="Skills & Tools"
      title="A toolkit shaped for"
      accent="production-ready interfaces"
      description="I focus on a practical stack that helps me design, build, and refine high-impact web applications."
      className="bg-primary/[0.005]"
    >
      <div className="space-y-8">
        {/* Category selector in P3R Menu Style */}
        <div className="flex flex-wrap gap-2 items-center">
          {categories.map((category, index) => {
            const isActive = activeCategory === category;
            return (
              <div key={category} className="flex items-center">
                {index > 0 && (
                  <span className="text-[10px] font-bold text-primary/30 mx-2 tracking-widest">//</span>
                )}
                <button
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "relative px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer",
                    isActive
                      ? "text-primary text-glow font-black"
                      : "text-muted-foreground hover:text-primary"
                  )}
                  style={{
                    clipPath: "polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
                  }}
                >
                  <span className="text-[9px] font-bold text-accent mr-1.5">0{index + 1}</span>
                  {category}
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryIndicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      style={{ boxShadow: "0 0 10px rgba(0, 229, 255, 0.8)" }}
                    />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Main skills listing */}
          <Panel className="p-6 md:p-8" variant="default">
            <div className="grid gap-5 md:grid-cols-2 pt-2">
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill, index) => (
                  <motion.div
                    key={`${activeCategory}-${skill.name}`}
                    initial={{ opacity: 0, y: 15, skewX: -2 }}
                    animate={{ opacity: 1, y: 0, skewX: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="border border-primary/10 bg-primary/[0.03] p-4 text-left hover:border-primary/40 hover:bg-primary/[0.06] transition-all duration-300"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-accent">
                          {skill.category}
                        </p>
                        <h3 className="mt-1 text-base font-bold uppercase tracking-wide text-foreground">
                          {skill.name}
                        </h3>
                      </div>
                      <span className="text-xs font-mono font-bold text-primary">{skill.level}%</span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground/80">{skill.note}</p>
                    
                    <div className="mt-4 h-1.5 bg-secondary/80 border border-primary/10">
                      <div
                        className="h-full bg-gradient-to-r from-primary via-cyan-400 to-accent transition-all duration-700"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Panel>

          {/* Workflow details */}
          <Panel className="p-6 md:p-8" variant="alt">
            <div className="space-y-6 pt-2 text-left">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary/70">
                  WORKFLOW APPROACH // ACTIVE
                </p>
                <h3 className="mt-2 text-2xl font-black uppercase tracking-tight text-foreground leading-snug">
                  High-quality user interfaces, grounded implementation choices.
                </h3>
              </div>
              
              <div className="space-y-3">
                {[
                  "Structure layouts before styling details.",
                  "Use motion to guide attention, not distract from content.",
                  "Keep components reusable so redesigns stay maintainable.",
                ].map((item, index) => (
                  <div key={item} className="flex items-start gap-3 border border-primary/10 bg-primary/[0.02] px-4 py-3 text-xs leading-5 text-muted-foreground"
                       style={{ clipPath: "polygon(8px 0, 100% 0, 100% 100%, 0 100%)" }}>
                    <span className="font-mono text-accent font-bold">0{index + 1} //</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="border border-primary/20 bg-primary/10 p-5"
                   style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%)" }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">BEST FIT</p>
                <p className="mt-2 text-xs leading-6 text-foreground/90">
                  Portfolio sites, marketing surfaces, and interface-heavy products that need a cleaner visual system without sacrificing responsiveness.
                </p>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </SectionShell>
  );
};
