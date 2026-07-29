"use client";

import React from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { ProtectedRoute } from "@/components/auth/protected-route";

interface ShellProps {
  children: React.ReactNode;
  title?: string;
  onSearchChange?: (val: string) => void;
}

export const Shell: React.FC<ShellProps> = ({ children, title, onSearchChange }) => {

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 flex font-sans text-slate-100 selection:bg-sky-500 selection:text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header title={title} onSearchChange={onSearchChange} />
          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
};
