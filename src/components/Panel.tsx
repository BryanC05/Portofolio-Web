import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export const Panel = ({ className, children, ...props }: PanelProps) => {
  return <div className={cn("hud-panel panel-highlight subtle-noise", className)} {...props}>{children}</div>;
};
