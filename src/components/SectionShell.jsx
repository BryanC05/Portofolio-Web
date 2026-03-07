import { cn } from "@/lib/utils";

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
    <section id={id} className={cn("relative px-4 py-24 sm:py-28", className)}>
      <div className="container relative z-10">
        {(eyebrow || title || description) && (
          <header
            className={cn(
              "mb-10 space-y-5 md:mb-14",
              centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-left"
            )}
          >
            {eyebrow ? <span className="section-eyebrow">{eyebrow}</span> : null}
            {title ? (
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-foreground md:text-5xl">
                {title}{" "}
                {accent ? <span className="text-gradient">{accent}</span> : null}
              </h2>
            ) : null}
            {description ? (
              <p className="text-base leading-7 text-muted-foreground md:text-lg">
                {description}
              </p>
            ) : null}
          </header>
        )}

        <div className={contentClassName}>{children}</div>
      </div>
    </section>
  );
};
