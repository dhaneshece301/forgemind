"use client";

import React from "react";
import { FolderKanban, Cpu, FileCheck2, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MetricsProps {
  totalProjects: number;
  activeExecutions: number;
  totalReports: number;
}

export const Metrics: React.FC<MetricsProps> = ({
  totalProjects,
  activeExecutions,
  totalReports,
}) => {
  const cards = [
    {
      title: "Total Engineering Projects",
      value: totalProjects,
      subtitle: "Active CAD & Hardware specs",
      icon: FolderKanban,
      color: "text-sky-400",
      bgColor: "bg-sky-950/50 border-sky-800/50",
    },
    {
      title: "Active Swarm Executions",
      value: activeExecutions,
      subtitle: "6 AI Agents running live",
      icon: Cpu,
      color: "text-purple-400",
      bgColor: "bg-purple-950/50 border-purple-800/50",
    },
    {
      title: "Generated Engineering Reports",
      value: totalReports,
      subtitle: "Full FEA, BOM & Manufacturing",
      icon: FileCheck2,
      color: "text-emerald-400",
      bgColor: "bg-emerald-950/50 border-emerald-800/50",
    },
    {
      title: "Average Factor of Safety",
      value: "2.83",
      subtitle: "FEA Structural compliance",
      icon: ShieldCheck,
      color: "text-amber-400",
      bgColor: "bg-amber-950/50 border-amber-800/50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <Card key={idx} className="relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400">{card.title}</p>
                <h3 className="text-2xl font-bold text-slate-100 mt-1 font-mono tracking-tight">
                  {card.value}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1">{card.subtitle}</p>
              </div>
              <div className={`p-3 rounded-lg border ${card.bgColor}`}>
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
