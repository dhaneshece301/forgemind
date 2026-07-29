"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Cpu,
  ArrowRight,
  Bot,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  CheckCircle2,
  FileText,
  Compass,
  DollarSign,
  Wrench,
  FileCode2,
  Sparkles,
  Box,
  ChevronDown,
  ChevronUp,
  Terminal,
  PlayCircle,
  BarChart3,
  PackageCheck,
  Download,
  Gauge,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

export default function LandingPage() {
  const [selectedPromptIdx, setSelectedPromptIdx] = useState(0);
  const [activeAgentTab, setActiveAgentTab] = useState(1);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const samplePrompts = [
    {
      title: "Titanium Racing Drone Arm",
      prompt: "Ultra-lightweight quadcopter arm in Ti-6Al-4V titanium alloy with aerodynamic cutouts for high-velocity racing and motor mount holes.",
      specs: {
        material: "Ti-6Al-4V Titanium Alloy",
        weight_g: "42.5 g",
        safety_factor: "3.2",
        yield_stress_mpa: "880 MPa",
        cost_usd: "$145.00",
        machining_time: "14 min"
      }
    },
    {
      title: "Aerospace Hydraulic Manifold",
      prompt: "High-pressure 7075-T6 aluminum hydraulic distribution manifold engineered for 3000 PSI flight control actuators with internal fluid channels.",
      specs: {
        material: "Aluminum 7075-T6",
        weight_g: "380 g",
        safety_factor: "2.85",
        yield_stress_mpa: "505 MPa",
        cost_usd: "$310.00",
        machining_time: "28 min"
      }
    },
    {
      title: "EV Motor Stator Housing",
      prompt: "Concentric liquid-cooled stator sleeve in Aluminum 6061 with helical internal cooling jackets for high-RPM electric powertrain heat dissipation.",
      specs: {
        material: "Aluminum 6061-T6",
        weight_g: "1240 g",
        safety_factor: "4.10",
        yield_stress_mpa: "276 MPa",
        cost_usd: "$520.00",
        machining_time: "45 min"
      }
    }
  ];

  const agentDetails = [
    {
      num: 1,
      title: "Requirements Analysis Agent",
      role: "Natural Language to Technical Spec Parser",
      icon: FileText,
      color: "from-sky-500 to-blue-600",
      textColor: "text-sky-400",
      borderColor: "border-sky-500/30",
      bgColor: "bg-sky-950/40",
      summary: "Parses prompt constraints, operational load limits, material compatibility, and environment requirements into a structured engineering spec schema."
    },
    {
      num: 2,
      title: "Product Design Agent",
      role: "Parametric 3D CAD Geometry Engine",
      icon: Compass,
      color: "from-cyan-500 to-teal-600",
      textColor: "text-cyan-400",
      borderColor: "border-cyan-500/30",
      bgColor: "bg-cyan-950/40",
      summary: "Computes 3D parametric bounding boxes, wall thickness, hole patterns, chamfers, and precise geometric dimensions in STEP and JSON formats."
    },
    {
      num: 3,
      title: "Engineering Simulation Agent",
      role: "FEA Structural & Von Mises Stress Solver",
      icon: Activity,
      color: "from-purple-500 to-indigo-600",
      textColor: "text-purple-400",
      borderColor: "border-purple-500/30",
      bgColor: "bg-purple-950/40",
      summary: "Executes Finite Element Analysis (FEA) stress calculations, identifies high-stress concentrations, calculates Safety Factors, and suggests weight reduction."
    },
    {
      num: 4,
      title: "Cost & Procurement Agent",
      role: "Dynamic BOM & Sourcing Matrix Engine",
      icon: DollarSign,
      color: "from-emerald-500 to-green-600",
      textColor: "text-emerald-400",
      borderColor: "border-emerald-500/30",
      bgColor: "bg-emerald-950/40",
      summary: "Generates an itemized Bill of Materials (BOM), estimates raw material costs, tooling wear, machining hours, supplier lead times, and unit economics."
    },
    {
      num: 5,
      title: "Manufacturing Planner Agent",
      role: "5-Axis CNC Toolpath & G-Code Formulator",
      icon: Wrench,
      color: "from-amber-500 to-orange-600",
      textColor: "text-amber-400",
      borderColor: "border-amber-500/30",
      bgColor: "bg-amber-950/40",
      summary: "Formulates step-by-step 5-axis CNC machining operation sequences, spindle speeds, feed rates, tolerance classes, and toolpath G-Code instructions."
    },
    {
      num: 6,
      title: "Report Generator Agent",
      role: "Executive PDF & Multimodal Report Synthesizer",
      icon: FileCode2,
      color: "from-rose-500 to-pink-600",
      textColor: "text-rose-400",
      borderColor: "border-rose-500/30",
      bgColor: "bg-rose-950/40",
      summary: "Synthesizes data from all prior agents into executive summaries, Markdown reports, JSON schemas, and formatted PDF engineering downloads."
    }
  ];

  const faqs = [
    {
      q: "How does ForgeMind X generate engineering specs from prompt ideas?",
      a: "ForgeMind X uses NVIDIA NIM API running Llama 3.1-70B Instruct alongside specialized engineering prompts to parse user intent into structural requirements, parametric dimensions, FEA stress math, and 5-axis CNC toolpaths."
    },
    {
      q: "Can ForgeMind X work if I don't have an NVIDIA API Key or MongoDB?",
      a: "Yes! ForgeMind X is designed with zero-setup intelligent fallbacks. If MongoDB is offline, it activates an in-memory database engine. If an NVIDIA API key is omitted, all 6 agents deliver domain-accurate parametric fallbacks."
    },
    {
      q: "What output formats are generated by the platform?",
      a: "Every execution produces an interactive 3D WebGL parametric model preview, FEA von Mises stress charts, an itemized BOM table, G-Code CNC toolpath snippets, Markdown reports, JSON schemas, and a downloadable PDF report."
    },
    {
      q: "Can I customize materials and alloy specifications?",
      a: "Yes. You can specify exact materials in your prompt (e.g. Titanium Ti-6Al-4V, Aluminum 7075-T6, Stainless Steel 316L, Carbon Fiber) or adjust preferences inside the settings panel."
    }
  ];

  const activePrompt = samplePrompts[selectedPromptIdx];
  const activeAgent = agentDetails.find((a) => a.num === activeAgentTab) || agentDetails[0];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans selection:bg-sky-500 selection:text-white relative overflow-hidden">
      {/* Radial Gradient Ambient Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-sky-500/15 via-purple-500/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[800px] right-0 w-[600px] h-[600px] bg-sky-600/10 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[1600px] left-0 w-[600px] h-[600px] bg-purple-600/10 blur-3xl pointer-events-none -z-10" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#070b14]/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
          <Link href="/">
            <Logo size="md" mode="dark" />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-300">
            <a href="#pipeline" className="hover:text-sky-400 transition-colors">6-Agent Swarm</a>
            <a href="#sandbox" className="hover:text-sky-400 transition-colors">Live Sandbox</a>
            <a href="#features" className="hover:text-sky-400 transition-colors">Platform Features</a>
            <a href="#faq" className="hover:text-sky-400 transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-xs text-slate-300 hover:text-white">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="primary" size="sm" className="text-xs gap-1.5 bg-sky-600 hover:bg-sky-500 text-white font-medium shadow-lg shadow-sky-600/20">
                Launch Workspace <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 max-w-6xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-sky-500/30 text-sky-400 text-xs font-mono shadow-inner shadow-sky-500/10 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>NVIDIA NIM LLAMA 3.1-70B • 6 Autonomous AI Swarm Agents</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 leading-[1.1]">
          From Product Concept to <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400">
            5-Axis CNC Manufacturing
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-normal">
          ForgeMind X orchestrates <strong className="text-slate-200">six specialized AI engineering agents</strong> sequentially to deliver 3D CAD parameters, FEA stress simulations, Bill of Materials, and CNC toolpaths from a single prompt.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link href="/register" className="w-full sm:w-auto">
            <Button size="lg" variant="primary" className="w-full sm:w-auto text-sm gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold h-12 px-8 shadow-xl shadow-sky-500/20">
              Start Free Engineering Project <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/login" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-sm h-12 px-6 border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200">
              <PlayCircle className="w-4 h-4 text-sky-400 mr-2" /> Explore Demo Workspace
            </Button>
          </Link>
        </div>

        {/* Feature Pill Metrics */}
        <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-left font-mono">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xs">
            <p className="text-[11px] text-slate-400">Pipeline Agents</p>
            <p className="text-xl sm:text-2xl font-bold text-sky-400 mt-1">6 Swarm Nodes</p>
            <p className="text-[10px] text-slate-500 mt-1">Sequential CAD → CNC</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xs">
            <p className="text-[11px] text-slate-400">Inference Engine</p>
            <p className="text-xl sm:text-2xl font-bold text-cyan-400 mt-1">NVIDIA NIM</p>
            <p className="text-[10px] text-slate-500 mt-1">Llama 3.1-70B Instruct</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xs">
            <p className="text-[11px] text-slate-400">Structural Compliance</p>
            <p className="text-xl sm:text-2xl font-bold text-purple-400 mt-1">FEA Stress</p>
            <p className="text-[10px] text-slate-500 mt-1">Von Mises & Safety Factor</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xs">
            <p className="text-[11px] text-slate-400">Machining Ready</p>
            <p className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1">5-Axis G-Code</p>
            <p className="text-[10px] text-slate-500 mt-1">BOM & Toolpath Specs</p>
          </div>
        </div>
      </section>

      {/* Interactive Sandbox Preview Section */}
      <section id="sandbox" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-950/80 border border-sky-800 text-sky-400 text-xs font-mono">
            <Terminal className="w-3.5 h-3.5" /> Interactive Agent Sandbox
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Try Prompt-to-Spec Pipeline</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Select a sample hardware concept prompt below to see how the 6 AI Agents parse specs, CAD dimensions, FEA safety factor math, and machining costs in real-time.
          </p>
        </div>

        {/* Prompt Selector Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {samplePrompts.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPromptIdx(idx)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all shrink-0 border ${
                selectedPromptIdx === idx
                  ? "bg-sky-600/20 text-sky-300 border-sky-500 shadow-md shadow-sky-500/10"
                  : "bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Live Output Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md">
          {/* Prompt Display */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start gap-3">
            <Bot className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-mono uppercase text-sky-400 font-bold">Input Product Concept Prompt</span>
              <p className="text-xs sm:text-sm text-slate-200 font-mono mt-1 leading-relaxed">
                &quot;{activePrompt.prompt}&quot;
              </p>
            </div>
          </div>

          {/* Real-time Parsed Engineering Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block">Recommended Material</span>
              <span className="font-semibold text-sky-400 mt-1 block truncate">{activePrompt.specs.material}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block">Estimated Mass</span>
              <span className="font-semibold text-slate-200 mt-1 block">{activePrompt.specs.weight_g}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block">Safety Factor (FoS)</span>
              <span className="font-semibold text-emerald-400 mt-1 block">{activePrompt.specs.safety_factor}x</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block">Yield Stress (FEA)</span>
              <span className="font-semibold text-purple-400 mt-1 block">{activePrompt.specs.yield_stress_mpa}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block">Unit BOM Cost</span>
              <span className="font-semibold text-amber-400 mt-1 block">{activePrompt.specs.cost_usd}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block">5-Axis Machining</span>
              <span className="font-semibold text-cyan-400 mt-1 block">{activePrompt.specs.machining_time}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6 AI Agents Sequential Architecture */}
      <section id="pipeline" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto space-y-12 border-t border-slate-800/80">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono uppercase font-bold text-sky-400 bg-sky-950/80 px-3 py-1 rounded-full border border-sky-800">
            Autonomous Pipeline Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            6 Specialized Engineering AI Agents
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Instead of generic chat LLMs, ForgeMind X deploys six domain-trained AI agents working in sequence to ensure total mechanical compliance.
          </p>
        </div>

        {/* Agent Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {agentDetails.map((ag) => {
            const Icon = ag.icon;
            const isActive = activeAgentTab === ag.num;
            return (
              <button
                key={ag.num}
                onClick={() => setActiveAgentTab(ag.num)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all shrink-0 border ${
                  isActive
                    ? `${ag.bgColor} ${ag.textColor} ${ag.borderColor} font-bold shadow-md`
                    : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>Agent {ag.num}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Agent Detailed View */}
        <div className={`p-6 sm:p-8 rounded-2xl bg-slate-900/90 border ${activeAgent.borderColor} space-y-4 shadow-xl backdrop-blur-md`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeAgent.color} flex items-center justify-center text-white font-bold shadow-md`}>
                {activeAgent.num}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-100">{activeAgent.title}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{activeAgent.role}</p>
              </div>
            </div>

            <span className={`text-xs font-mono px-3 py-1 rounded-md bg-slate-950 border border-slate-800 ${activeAgent.textColor}`}>
              Sequential Node #{activeAgent.num} of 6
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {activeAgent.summary}
          </p>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-300">FastAPI Async Handler</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-300">NVIDIA Llama-3.1-70B</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-300">Structured JSON Output</span>
            </div>
          </div>
        </div>

        {/* 6 Agent Pipeline Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agentDetails.map((ag) => {
            const Icon = ag.icon;
            return (
              <div
                key={ag.num}
                onClick={() => setActiveAgentTab(ag.num)}
                className={`p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all cursor-pointer space-y-3 group ${
                  activeAgentTab === ag.num ? "border-sky-500/50 bg-slate-900" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center">
                    <Icon className={`w-4 h-4 ${ag.textColor}`} />
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 font-bold">NODE 0{ag.num}</span>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-slate-200 group-hover:text-sky-400 transition-colors">
                    {ag.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {ag.summary}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Core Platform Features Grid */}
      <section id="features" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto space-y-12 border-t border-slate-800/80">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-100">Complete Hardware Intelligence Stack</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Built for mechanical engineers, robotics developers, aerospace designers, and hardware startups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 hover:border-sky-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-sky-950 border border-sky-800 flex items-center justify-center">
              <Box className="w-5 h-5 text-sky-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-100">3D WebGL Parametric Viewer</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Renders parametric 3D bounding geometry, dimensions, and materials right inside the browser using Three.js & Fiber.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 hover:border-purple-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-800 flex items-center justify-center">
              <Activity className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-100">FEA Stress & Safety Factor</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calculates structural yield stress limit, modal vibration, thermal dissipation, and von Mises stress distribution.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 hover:border-emerald-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center">
              <PackageCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-100">Itemized Bill of Materials</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Synthesizes raw material costs, machining hours, supplier sourcing pricing, and unit manufacturing economics.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 hover:border-amber-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-800 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-100">5-Axis CNC Toolpaths</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generates step-by-step 5-axis CNC milling toolpath sequences, spindle RPMs, feed rates, and G-Code programs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 hover:border-rose-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-rose-950 border border-rose-800 flex items-center justify-center">
              <Download className="w-5 h-5 text-rose-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-100">Executive PDF Generation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              One-click compilation of comprehensive PDF reports using ReportLab with executive summaries and CAD tables.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-100">Zero-Setup Smart Fallbacks</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automatic in-memory database engine if local MongoDB is offline, plus domain-accurate structured AI fallbacks.
            </p>
          </div>
        </div>
      </section>

      {/* Benchmark Comparison: Traditional vs ForgeMind X */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-slate-800/80 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Speed Benchmarks</h2>
          <p className="text-xs sm:text-sm text-slate-400">Comparing traditional mechanical CAD workflows vs ForgeMind X AI Swarm.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traditional Way */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-4">
            <div className="flex items-center justify-between border-b border-rose-900/40 pb-3">
              <h3 className="text-sm font-bold text-rose-400 font-mono uppercase">Traditional Engineering Workflow</h3>
              <span className="text-xs font-mono text-rose-400 font-bold">2 - 4 Weeks</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span> Manual CAD drafting in SolidWorks / Fusion 360
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span> Manual FEA mesh setup & slow solver computation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span> Manual vendor quotes and spreadsheet BOM creation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span> CAM setup and manual 5-axis toolpath programming
              </li>
            </ul>
          </div>

          {/* ForgeMind X Way */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-sky-500/40 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-sky-500/30 pb-3">
              <h3 className="text-sm font-bold text-sky-400 font-mono uppercase">ForgeMind X AI Pipeline</h3>
              <span className="text-xs font-mono text-emerald-400 font-bold">&lt; 30 Seconds</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-200">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Natural language product prompt parsing
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Automated 3D WebGL parametric geometric mesh
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" /> FEA von Mises stress math & safety factor verification
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Instant BOM pricing, 5-axis G-Code & downloadable PDF
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto space-y-8 border-t border-slate-800/80">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Frequently Asked Questions</h2>
          <p className="text-xs sm:text-sm text-slate-400">Everything you need to know about ForgeMind X platform architecture.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-slate-900/70 border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-200 hover:text-sky-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-sky-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final Call To Action Banner */}
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center space-y-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-sky-500/30 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Ready to Build Next-Gen Hardware with AI?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Launch your first hardware concept project and let 6 specialized AI agents generate CAD specs, FEA simulations, BOM pricing, and 5-axis CNC manufacturing workflows.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full sm:w-auto text-sm gap-2 bg-sky-600 hover:bg-sky-500 text-white px-8 h-12 shadow-lg shadow-sky-600/30">
                Launch Workspace Free <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-sm h-12 px-6 border-slate-700 text-slate-300">
                Sign In to Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-10 px-4 sm:px-8 text-center space-y-4 bg-[#05080f]">
        <div className="flex items-center justify-center gap-3">
          <Logo size="sm" mode="dark" />
        </div>
        <p className="text-xs text-slate-400 font-mono max-w-lg mx-auto">
          Autonomous AI Manufacturing & Engineering Platform. Powered by Next.js 14, FastAPI, Motor MongoDB & NVIDIA NIM.
        </p>
        <div className="pt-2 text-[11px] text-slate-400 font-mono">
          Built with ❤️ by <span className="text-slate-200 font-semibold">Sabestain</span> & the ForgeMind X Team • © 2026 ForgeMind X
        </div>
      </footer>
    </div>
  );
}
