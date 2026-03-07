import { cn } from "@/lib/utils";

export const Panel = ({ className, children }) => {
  return <div className={cn("hud-panel panel-highlight subtle-noise", className)}>{children}</div>;
};
