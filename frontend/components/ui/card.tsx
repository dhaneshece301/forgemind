import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, glow = false, ...props }) => {
  return (
    <div
      className={cn(
        "bg-slate-900/70 border border-slate-800/80 rounded-lg p-5 backdrop-blur-sm text-slate-100",
        glow && "hover-glow",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
