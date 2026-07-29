"use client";

import React from "react";
import { FileText, Compass, Activity, DollarSign, Wrench, FileCode2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const AgentStatusOverview: React.FC = () => {
  const agents = [
    {
      num: 1,
      name: "Requirements Analysis Agent",
      desc: "Analyzes product idea & extracts objectives, constraints & specs.",
      icon: FileText,
      color: "text-sky-400",
    },
    {
      num: 2,
      name: "Product Design Agent",
      desc: "Generates 3D CAD dimensions, geometry & material recommendations.",
      icon: Compass,
      color: "text-cyan-400",
    },
    {
      num: 3,
      name: "Engineering Simulation Agent",
      desc: "Calculates FEA yield stress, factor of safety & topology weight reduction.",
      icon: Activity,
      color: "text-purple-400",
    },
    {
      num: 4,
      name: "Cost & Procurement Agent",
      desc: "Synthesizes Bill of Materials (BOM), supplier pricing & lead times.",
      icon: DollarSign,
      color: "text-emerald-400",
    },
    {
      num: 5,
      name: "Manufacturing Planner Agent",
      desc: "Formulates 5-axis CNC routing, tool paths & assembly procedures.",
      icon: Wrench,
      color: "text-amber-400",
    },
    {
      num: 6,
      name: "Report Generator Agent",
      desc: "Synthesizes Executive Overview, Markdown & structured JSON reports.",
      icon: FileCode2,
      color: "text-rose-400",
    },
  ];

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
            6 Specialized AI Agents Swarm
          </h3>
          <p className="text-xs text-slate-400">Sequential autonomous engineering pipeline architecture</p>
        </div>
        <Badge variant="info">NVIDIA NIM Active</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {agents.map((agent) => {
          const Icon = agent.icon;
          return (
            <div
              key={agent.num}
              className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex gap-3"
            >
              <div className="w-8 h-8 rounded-md bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                <Icon className={`w-4 h-4 ${agent.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-slate-500 font-bold">#{agent.num}</span>
                  <h4 className="text-xs font-semibold text-slate-200 truncate">{agent.name}</h4>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug line-clamp-2">{agent.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
