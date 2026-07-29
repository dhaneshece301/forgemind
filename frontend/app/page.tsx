"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Zap,
  ArrowRight,
  Bot,
  ShieldCheck,
  Activity,
  CheckCircle2,
  Box,
  FileText,
  Wrench,
  DollarSign,
  Sparkles,
  Compass,
  FileCheck2,
  BarChart3,
  Cpu,
  Layers,
  Terminal,
  Play,
  Flame,
  Check,
  Sliders,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

export default function LandingPage() {
  const [activePrompt, setActivePrompt] = useState(0);
  const [selectedAgentTab, setSelectedAgentTab] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);

  const samplePrompts = [
    {
      title: "Titanium Drone Arm",
      prompt: "High-speed quadcopter titanium arm with aerodynamic weight reduction cutouts for 2.5kg max payload.",
      material: "Titanium Ti-6Al-4V",
      safetyFactor: "3.2",
      weight: "145g",
    },
    {
      title: "EV Battery Thermal Plate",
      prompt: "Aluminum 6061-T6 liquid cold plate with micro-channel fluid routing for electric vehicle battery pack.",
      material: "Aluminum 6061-T6",
      safetyFactor: "2.85",
      weight: "820g",
    },
    {
      title: "Planetary Gear Assembly",
      prompt: "Compact 5:1 reduction ratio spur gear set for high-torque robotic actuator joint in stainless steel.",
      material: "Stainless Steel 316L",
      safetyFactor: "4.1",
      weight: "340g",
    },
  ];

  const agentSwarm = [
    {
      num: "01",
      name: "Requirements Analysis Agent",
      role: "Engineering Spec Extraction",
      icon: FileText,
      color: "from-sky-500 to-blue-600",
      accent: "text-sky-400",
      bgAccent: "bg-sky-500/10 border-sky-500/30",
      output: "Extracted: Max Load 2500N | Temp Range -40°C to 120°C | Target Factor of Safety ≥ 2.5",
      metrics: ["Load Vector: 2.5kN", "Temp Limit: 120°C", "Alloy: Ti-6Al-4V"],
    },
    {
      num: "02",
      name: "Product Design Agent",
      role: "3D CAD Parametric Synthesis",
      icon: Compass,
      color: "from-cyan-400 to-teal-500",
      accent: "text-cyan-400",
      bgAccent: "bg-cyan-500/10 border-cyan-500/30",
      output: "Generated 3D Mesh: L=180mm, W=45mm, H=22mm | Volume: 63.2 cm³ | Aerodynamic Topology",
      metrics: ["Length: 180mm", "Volume: 63.2cm³", "Geometry: Box-Ribbed"],
    },
    {
      num: "03",
      name: "Engineering Simulation Agent",
      role: "FEA von Mises Stress & Safety Math",
      icon: Activity,
      color: "from-purple-500 to-indigo-600",
      accent: "text-purple-400",
      bgAccent: "bg-purple-500/10 border-purple-500/30",
      output: "FEA Mesh Solved: Peak Yield Stress 265 MPa | Von Mises Distribution Computed | Safety Factor 3.2",
      metrics: ["Yield Stress: 265 MPa", "Safety Factor: 3.2x", "Deformation: 0.04mm"],
    },
    {
      num: "04",
      name: "Cost & Procurement Agent",
      role: "BOM & Sourcing Cost Breakdown",
      icon: DollarSign,
      color: "from-emerald-400 to-green-600",
      accent: "text-emerald-400",
      bgAccent: "bg-emerald-500/10 border-emerald-500/30",
      output: "Synthesized BOM: Raw Material $145.00 | CNC Machining $180.00 | Assembly $45.00 | Unit Total $370.00",
      metrics: ["Raw Material: $145", "Machining: $180", "Est. Lead Time: 4 Days"],
    },
    {
      num: "05",
      name: "Manufacturing Planner Agent",
      role: "5-Axis CNC Toolpath & CAM Routing",
      icon: Wrench,
      color: "from-amber-400 to-orange-500",
      accent: "text-amber-400",
      bgAccent: "bg-amber-500/10 border-amber-500/30",
      output: "Generated G-Code: 5-Axis Milling | Spindle 12,000 RPM | Tool Change 4x | Machining Time 24.5 min",
      metrics: ["Toolpaths: 5-Axis", "Spindle: 12k RPM", "Cycle Time: 24.5m"],
    },
    {
      num: "06",
      name: "Report Generator Agent",
      role: "Executive PDF & JSON Synthesis",
      icon: FileCode2,
      color: "from-rose-400 to-red-600",
      accent: "text-rose-400",
      bgAccent: "bg-rose-500/10 border-rose-500/30",
      output: "Executive PDF Report compiled successfully with embedded 3D schematic & full engineering log.",
      metrics: ["PDF Exporter: Ready", "JSON Schema: Validated", "Compliance: Passed"],
    },
  ];

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < 6) {
        setSimStep(step);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-sky-500 selection:text-white relative overflow-hidden">
      {/* Background Decorative Glow Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-sky-600/15 via-cyan-500/10 to-purple-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-[800px] right-0 w-[500px] h-[500px] bg-sky-500/5 blur-[140px] pointer-events-none" />

      {/* Top Navbar */}
      <header className="h-16 border-b border-slate-800/60 bg-[#030712]/80 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Logo size="md" mode="dark" />
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-400">
            <a href="#pipeline" className="hover:text-sky-400 transition-colors">6-Agent Pipeline</a>
            <a href="#features" className="hover:text-sky-400 transition-colors">Platform Capabilities</a>
            <a href="#demo" className="hover:text-sky-400 transition-colors">Interactive Sandbox</a>
            <a href="#tech" className="hover:text-sky-400 transition-colors">Tech Architecture</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-xs text-slate-300 hover:text-white">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="primary" size="sm" className="text-xs gap-1.5 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white font-medium border-0 shadow-lg shadow-sky-500/20">
                Launch Platform <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 max-w-6xl mx-auto text-center space-y-8">
        {/* NVIDIA NIM Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-sky-500/30 text-sky-400 text-xs font-mono shadow-md shadow-sky-500/10 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </div>
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Powered by NVIDIA NIM API (Llama 3.1 70B Instruct)</span>
        </div>

        {/* Main Hero Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 leading-[1.1] max-w-5xl mx-auto">
          Autonomous AI-Powered <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400">
            Hardware Manufacturing
          </span>
        </h1>

        {/* Subtitle Description */}
        <p className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-normal">
          From a raw product prompt to complete <span className="text-slate-200 font-semibold">3D CAD parameters</span>, <span className="text-slate-200 font-semibold">FEA structural stress math</span>, <span className="text-slate-200 font-semibold">Bill of Materials</span>, and <span className="text-slate-200 font-semibold">5-axis CNC manufacturing workflows</span> in seconds.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link href="/register" className="w-full sm:w-auto">
            <Button size="lg" variant="primary" className="w-full sm:w-auto text-sm gap-2 bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold h-12 px-8 rounded-xl shadow-xl shadow-sky-500/25">
              Start Free Engineering Project <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <a href="#demo" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-sm h-12 px-8 rounded-xl border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-200 gap-2">
              <Play className="w-4 h-4 text-sky-400" />
              Try Live Interactive Prompt
            </Button>
          </a>
        </div>

        {/* Live Counter Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-10">
          {[
            { label: "AI Swarm Agents", val: "6 Sequential", sub: "Autonomous Pipeline" },
            { label: "Execution Time", val: "< 15 Seconds", sub: "From Prompt to PDF" },
            { label: "Safety Math", val: "100% FEA", sub: "Von Mises Stress" },
            { label: "Export Formats", val: "CAD, BOM & PDF", sub: "3D Parametric Mesh" },
          ].map((stat, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-center">
              <p className="text-lg sm:text-xl font-bold font-mono text-slate-100">{stat.val}</p>
              <p className="text-xs font-medium text-sky-400 mt-0.5">{stat.label}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Prompt Sandbox Section */}
      <section id="demo" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto border-t border-slate-800/80 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-mono">
            <Terminal className="w-3.5 h-3.5" />
            <span>Interactive Hardware Sandbox</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">See 6 AI Agents Execute Live</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Select a hardware engineering concept below to trigger simulated AI multi-agent reasoning.
          </p>
        </div>

        {/* Sample Prompt Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {samplePrompts.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActivePrompt(idx);
                setSimStep(0);
              }}
              className={`p-4 rounded-xl border text-left transition-all ${
                activePrompt === idx
                  ? "bg-sky-950/40 border-sky-500 shadow-lg shadow-sky-500/10"
                  : "bg-slate-900/50 border-slate-800/80 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-sky-400">Concept #{idx + 1}</span>
                {activePrompt === idx && <CheckCircle2 className="w-4 h-4 text-sky-400" />}
              </div>
              <h3 className="text-sm font-semibold text-slate-100 mt-1">{item.title}</h3>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{item.prompt}</p>
            </button>
          ))}
        </div>

        {/* Live Simulation Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
                Active Prompt Simulation
              </span>
              <p className="text-sm font-semibold text-slate-200 mt-1 font-mono">
                "{samplePrompts[activePrompt].prompt}"
              </p>
            </div>

            <Button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="gap-2 text-xs bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white shrink-0"
            >
              {isSimulating ? (
                <>
                  <Bot className="w-4 h-4 animate-bounce text-white" />
                  Running AI Agents...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Run Swarm Pipeline
                </>
              )}
            </Button>
          </div>

          {/* 6 Step Progress Node Stream */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {agentSwarm.map((agent, idx) => {
              const isActiveNode = simStep >= idx;
              const isCurrentNode = simStep === idx && isSimulating;
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border text-xs transition-all ${
                    isCurrentNode
                      ? "bg-sky-950 border-sky-400 ring-2 ring-sky-500/50 scale-105"
                      : isActiveNode
                      ? "bg-slate-950 border-slate-700 text-slate-200"
                      : "bg-slate-950/40 border-slate-800/60 opacity-50 text-slate-500"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span>Agent #{agent.num}</span>
                    {isActiveNode ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-700" />
                    )}
                  </div>
                  <p className="font-semibold text-slate-200 mt-1 truncate">{agent.name.split(" ")[0]} Agent</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">{agent.role}</p>
                </div>
              );
            })}
          </div>

          {/* Output Inspection Box */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/80 pb-2">
              <span className="flex items-center gap-2 text-sky-400 font-bold">
                <Terminal className="w-3.5 h-3.5" />
                Live Agent Node Output [{agentSwarm[simStep].name}]
              </span>
              <span className="text-[10px] text-slate-500">Status: OK 200</span>
            </div>
            <p className="text-slate-200 leading-relaxed pt-1">{agentSwarm[simStep].output}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {agentSwarm[simStep].metrics.map((m, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-sky-300">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6 AI Swarm Architecture Detailed Cards */}
      <section id="pipeline" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto border-t border-slate-800/80 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Sequential 6-Agent AI Swarm</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            From requirements extraction to executive report synthesis, each agent executes a domain-specific engineering operation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agentSwarm.map((agent, idx) => {
            const Icon = agent.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-lg ${agent.bgAccent} border`}>
                    <Icon className={`w-5 h-5 ${agent.accent}`} />
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-500">#{agent.num}</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-sky-400 transition-colors">
                    {agent.name}
                  </h3>
                  <p className="text-xs font-mono text-sky-400/90 mt-0.5">{agent.role}</p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{agent.output}</p>

                <div className="pt-2 flex flex-wrap gap-1.5 border-t border-slate-800/60">
                  {agent.metrics.map((met, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                      {met}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Capabilities & Feature Showcase */}
      <section id="features" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto border-t border-slate-800/80 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Full-Stack Autonomous Capabilities</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Everything hardware engineers need to take ideas straight into 5-axis manufacturing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: 3D Parametric Viewer */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center">
              <Box className="w-5 h-5 text-sky-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Interactive 3D Parametric CAD Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Render dynamic, parametric 3D models directly in your browser using Three.js and WebGL. Orbit, inspect dimensions, and verify geometry in real-time.
            </p>
            <ul className="space-y-2 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-sky-400" /> Live WebGL 3D Mesh Rendering
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-sky-400" /> Automatic Dimension Annotations
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-sky-400" /> Material Density & Volume Calculations
              </li>
            </ul>
          </div>

          {/* Card 2: FEA Stress Simulation */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">FEA Structural Stress Analytics</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Compute Von Mises yield stress, safety factors, and load distribution with interactive Recharts FEA analytics and topology optimization.
            </p>
            <ul className="space-y-2 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-purple-400" /> Von Mises Stress Heatmaps
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-purple-400" /> Yield Strength Compliance Checks
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-purple-400" /> Factor of Safety (FoS) Math
              </li>
            </ul>
          </div>

          {/* Card 3: Dynamic BOM */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Dynamic Bill of Materials & Procurement</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generate itemized component cost matrices, raw alloy pricing, 5-axis machining rates, and supplier lead time estimates.
            </p>
            <ul className="space-y-2 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Itemized Component Cost Table
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Sourcing & Lead Time Predictions
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> CNC Tooling & Unit Price Breakdown
              </li>
            </ul>
          </div>

          {/* Card 4: Executive PDF Exporter */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5 text-rose-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">One-Click Executive PDF Generator</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Export publication-grade PDF engineering reports powered by ReportLab. Complete with executive summaries, specs, and JSON data schemas.
            </p>
            <ul className="space-y-2 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-rose-400" /> Automated ReportLab PDF Exporter
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-rose-400" /> Formatted Markdown & Structured JSON
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-rose-400" /> Instant Download & Share Options
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 border border-sky-500/30 text-center space-y-6 relative overflow-hidden shadow-2xl shadow-sky-500/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-900/60 border border-sky-700/60 text-sky-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Ready for Next-Gen Engineering?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
            Transform Ideas into <br className="hidden sm:inline" />
            5-Axis Manufacturing Workflows
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Join autonomous AI engineering. Launch your first project and watch 6 AI swarm agents deliver complete CAD, FEA, and BOM specifications.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full sm:w-auto text-sm gap-2 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white font-semibold h-12 px-8 rounded-xl">
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-10 px-4 sm:px-8 text-center text-xs text-slate-400 font-mono space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Logo size="sm" mode="dark" />
        </div>
        <p>
          © 2026 ForgeMind X Autonomous AI Manufacturing Platform. Built with Next.js 14, FastAPI, Motor & NVIDIA NIM.
        </p>
        <p className="text-slate-500">
          Built with ❤️ by <span className="text-slate-300 font-semibold">Sabestain</span> & the ForgeMind X Team.
        </p>
      </footer>
    </div>
  );
}
