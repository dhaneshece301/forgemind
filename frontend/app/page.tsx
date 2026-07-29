"use client";

import React from "react";
import Link from "next/link";
import { Cpu, ArrowRight, Bot, ShieldCheck, Zap, Activity, Layers, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Logo } from "@/components/ui/logo";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Navbar */}
      <header className="h-16 border-b border-slate-800/80 px-6 max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <Logo size="md" mode="dark" />
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-xs">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="primary" size="sm" className="text-xs gap-1.5">
              Launch Platform <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/60 text-sky-400 text-xs font-mono">
          <Zap className="w-3.5 h-3.5" />
          <span>Powered by NVIDIA NIM API & 6 AI Swarm Agents</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100 leading-tight">
          Autonomous AI-Powered <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400">
            Manufacturing Platform
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Input a raw product idea. ForgeMind X orchestrates six specialized AI engineering agents sequentially to deliver complete CAD specs, FEA structural simulations, BOM costs, and 5-axis manufacturing workflows.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/register">
            <Button size="lg" variant="primary" className="w-full sm:w-auto text-sm gap-2">
              Start Free Engineering Project <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-sm">
              Explore Demo Workspace
            </Button>
          </Link>
        </div>
      </section>

      {/* 6 AI Agents Swarm Architecture Showcase */}
      <section className="py-16 px-6 max-w-6xl mx-auto border-t border-slate-800/80 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-100">Sequential 6-Agent AI Swarm</h2>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            From requirements analysis to final executive report synthesis, each agent handles one specialized domain of hardware engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { num: "01", title: "Requirements Analysis", desc: "Extracts technical objectives, operational constraints & safety factors." },
            { num: "02", title: "Product Design", desc: "Computes 3D CAD dimensions, geometry & alloy material specs." },
            { num: "03", title: "Engineering Simulation", desc: "Performs FEA yield stress, modal thermal & topology weight reduction." },
            { num: "04", title: "Cost & Procurement", desc: "Synthesizes Bill of Materials (BOM), supplier pricing & lead times." },
            { num: "05", title: "Manufacturing Planner", desc: "Formulates 5-axis CNC routing, tool paths & assembly procedures." },
            { num: "06", title: "Report Generator", desc: "Produces Executive Summaries, Markdown & structured JSON reports." },
          ].map((agent, i) => (
            <div key={i} className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-sky-400 text-xs font-bold">{agent.num}</span>
              <h3 className="text-sm font-semibold text-slate-100">{agent.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{agent.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 px-6 text-center text-xs text-slate-500 font-mono">
        © 2026 ForgeMind X Autonomous Manufacturing Platform. Built with Next.js 16, FastAPI, Motor & NVIDIA NIM.
      </footer>
    </div>
  );
}
