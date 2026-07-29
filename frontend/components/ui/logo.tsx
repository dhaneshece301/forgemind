"use client";

import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  mode?: "auto" | "light" | "dark";
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
  mode = "auto",
}) => {
  const heightClasses = {
    sm: "h-7",
    md: "h-9",
    lg: "h-12",
    xl: "h-20",
  };

  const hClass = heightClasses[size] || "h-9";

  if (mode === "dark") {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img
          src="/logo-dark-trans.png"
          alt="ForgeMind X Logo"
          className={`${hClass} w-auto object-contain`}
        />
      </div>
    );
  }

  if (mode === "light") {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img
          src="/logo-light-trans.png"
          alt="ForgeMind X Logo"
          className={`${hClass} w-auto object-contain`}
        />
      </div>
    );
  }

  // mode === "auto" - defaults to dark theme logo in dark mode, light theme logo in light mode
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/logo-dark-trans.png"
        alt="ForgeMind X Logo"
        className={`${hClass} w-auto object-contain hidden dark:block`}
      />
      <img
        src="/logo-light-trans.png"
        alt="ForgeMind X Logo"
        className={`${hClass} w-auto object-contain dark:hidden block`}
      />
    </div>
  );
};
