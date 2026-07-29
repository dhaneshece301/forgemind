import React from "react";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

export const metadata = {
  title: "ForgeMind X | Autonomous AI Manufacturing Platform",
  description: "AI-powered autonomous manufacturing platform orchestrating 6 engineering agents.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#070b14] text-slate-100 antialiased font-sans selection:bg-sky-500 selection:text-white">
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
