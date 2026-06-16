import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const SectionShell = ({
  id,
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  children,
  className,
  contentClassName,
}) => {
  const centered = align === "center";

  return (
    <section id={id} className={cn("relative px-4 py-24 sm:py-28 overflow-hidden", className)}>
      {/* Background Section-Specific Accent Line */}
      <div className="absolute top-0 left-[-10%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent rotate-[-1deg]" />

      <div className="container relative z-10">
        {(eyebrow || title || description) && (
          <motion.header
            initial={{ opacity: 0, x: -30, skewX: -6 }}
            whileInView={{ opacity: 1, x: 0, skewX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "mb-10 space-y-5 md:mb-14",
              centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-left"
            )}
          >
            {eyebrow ? (
              <span className="section-eyebrow">
                <span className="text-glow mr-2">//</span> {eyebrow}
              </span>
            ) : null}
            {title ? (
              <h2 className="text-3xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
                {title}{" "}
                {accent ? <span className="p3r-gradient text-glow">{accent}</span> : null}
              </h2>
            ) : null}
            {description ? (
              <p className="text-sm font-medium leading-7 text-muted-foreground/90 md:text-base border-l border-primary/20 pl-4 mt-3">
                {description}
              </p>
            ) : null}
          </motion.header>
        )}

        <motion.div
          initial={{ opacity: 0, y: 40, skewX: -2 }}
          whileInView={{ opacity: 1, y: 0, skewX: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={contentClassName}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};
