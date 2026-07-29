import React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  className?: string;
  barClassName?: string;
}

export const Progress: React.FC<ProgressProps> = ({ value, className, barClassName }) => {
  const percentage = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("w-full h-2 bg-slate-800 rounded-full overflow-hidden", className)}>
      <div
        className={cn(
          "h-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-300 ease-out",
          barClassName
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
