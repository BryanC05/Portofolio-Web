import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { type ReactNode } from "react";

interface SectionShellProps {
  id: string;
  eyebrow?: string;
  title?: string;
  accent?: string;
  description?: string;
  align?: "left" | "center";
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

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
}: SectionShellProps) => {
  const centered = align === "center";
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section id={id} ref={sectionRef} className={cn("relative px-4 py-24 sm:py-28", className)}>
      <div className="container relative z-10">
        {(eyebrow || title || description) && (
          <header
            className={cn(
              "mb-10 space-y-5 md:mb-14",
              centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-left"
            )}
          >
            {eyebrow && <span className="section-eyebrow reveal-up">{eyebrow}</span>}
            {title && (
              <h2 className="reveal-up text-3xl font-semibold tracking-[-0.04em] text-foreground md:text-5xl">
                {title}{" "}
                {accent && <span className="text-gradient">{accent}</span>}
              </h2>
            )}
            {description && (
              <p className="reveal-up text-base leading-7 text-muted-foreground md:text-lg">
                {description}
              </p>
            )}
          </header>
        )}
        <div className={contentClassName}>{children}</div>
      </div>
    </section>
  );
};
