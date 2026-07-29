"use client";

import React from "react";
import { Search, Bell, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onSearchChange?: (val: string) => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ onSearchChange, title }) => {
  return (
    <header className="h-14 bg-slate-950/80 border-b border-slate-800/80 sticky top-0 z-40 backdrop-blur-md px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        {title ? (
          <h2 className="text-sm font-semibold text-slate-100">{title}</h2>
        ) : (
          <div className="relative w-full max-w-sm">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search projects, CAD models, reports... (⌘K)"
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="w-full h-8 pl-8 pr-3 text-xs bg-slate-900/90 text-slate-200 placeholder-slate-500 border border-slate-800 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-mono">
          <Sparkles className="w-3 h-3 text-sky-400" />
          <span>NVIDIA NIM LLAMA-3.1-70B</span>
        </div>

        <button className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-900 rounded-md transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-sky-400 rounded-full"></span>
        </button>
      </div>
    </header>
  );
};
