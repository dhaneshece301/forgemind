"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card } from "@/components/ui/card";

interface FeaChartProps {
  simulationData: Record<string, any>;
}

export const FeaChart: React.FC<FeaChartProps> = ({ simulationData }) => {
  const strength = simulationData?.strength_analysis || {};
  const weight = simulationData?.weight_optimization || {};

  const stressChartData = [
    { name: "Max Yield Stress", value: strength.max_yield_stress_mpa || 280, color: "#38bdf8" },
    { name: "Allowable Limit", value: strength.allowable_stress_mpa || 880, color: "#34d399" },
  ];

  const weightChartData = [
    { name: "Original Mass (kg)", value: weight.original_estimated_mass_kg || 3.4, color: "#fb7185" },
    { name: "Optimized Mass (kg)", value: weight.optimized_mass_kg || 2.35, color: "#38bdf8" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="space-y-3">
        <h4 className="text-xs font-semibold text-slate-200 font-mono uppercase tracking-wider">
          FEA Structural Stress Comparison (MPa)
        </h4>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stressChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#f8fafc" }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {stressChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="space-y-3">
        <h4 className="text-xs font-semibold text-slate-200 font-mono uppercase tracking-wider">
          Topology Mass Reduction Optimization (kg)
        </h4>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weightChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#f8fafc" }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {weightChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
