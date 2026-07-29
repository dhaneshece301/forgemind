"use client";

import React, { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { ProtectedRoute } from "@/components/auth/protected-route";

interface ShellProps {
  children: React.ReactNode;
  title?: string;
  onSearchChange?: (val: string) => void;
}

export const Shell: React.FC<ShellProps> = ({ children, title, onSearchChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 flex font-sans text-slate-100 selection:bg-sky-500 selection:text-white relative">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Mobile Slide-Over Drawer Backdrop */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Sidebar Drawer */}
        {isMobileMenuOpen && (
          <div className="fixed inset-y-0 left-0 z-50 md:hidden animate-in slide-in-from-left duration-200">
            <Sidebar isMobile onCloseMobile={() => setIsMobileMenuOpen(false)} />
          </div>
        )}

        {/* Main Workspace Layout */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header
            title={title}
            onSearchChange={onSearchChange}
            onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
          <main className="flex-1 p-3 sm:p-6 overflow-y-auto">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
};
