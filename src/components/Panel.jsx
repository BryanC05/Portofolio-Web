import { cn } from "@/lib/utils";

export const Panel = ({ className, children, variant = "default" }) => {
  const panelClass = 
    variant === "alt" 
      ? "p3r-panel-alt" 
      : variant === "diagonal" 
      ? "p3r-panel-diagonal" 
      : "p3r-panel";

  return (
    <div className={cn(panelClass, "motion-panel relative p-1 group", className)}>
      {/* Decorative P3R Corner Accents — inset to stay inside clip-path */}
      <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-primary/40 group-hover:border-primary transition-colors duration-300" />
      <div className="absolute top-1 right-7 w-2 h-2 border-t border-r border-primary/40 group-hover:border-primary transition-colors duration-300" />
      <div className="absolute bottom-1 left-7 w-2 h-2 border-b border-l border-primary/40 group-hover:border-primary transition-colors duration-300" />
      <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-primary/40 group-hover:border-primary transition-colors duration-300" />
      
      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(0,229,255,0.1)_1px,transparent_1px)] bg-[size:100%_4px]" />
      
      {/* Content wrapper */}
      <div className="relative z-10 h-full w-full overflow-hidden">
        {children}
      </div>
    </div>
  );
};
