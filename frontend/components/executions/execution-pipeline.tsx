"use client";

import React from "react";
import { CheckCircle2, Loader2, Circle, AlertCircle, Cpu } from "lucide-react";
import { Execution, AgentProgressStatus } from "@/types";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface ExecutionPipelineProps {
  execution: Execution;
}

export const ExecutionPipeline: React.FC<ExecutionPipelineProps> = ({ execution }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
      case "in_progress":
        return <Loader2 className="w-5 h-5 text-sky-400 animate-spin shrink-0" />;
      case "failed":
        return <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />;
      default:
        return <Circle className="w-5 h-5 text-slate-600 shrink-0" />;
    }
  };

  return (
    <Card className="space-y-6">
      {/* Header Progress Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-sky-400" />
            <h3 className="text-base font-semibold text-slate-100">
              Autonomous Swarm Execution Pipeline
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Execution ID: {execution.id}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {execution.status === "completed" && <Badge variant="success">Completed</Badge>}
          {execution.status === "running" && <Badge variant="info">Executing AI Agents...</Badge>}
          {execution.status === "queued" && <Badge variant="warning">Queued</Badge>}
          {execution.status === "failed" && <Badge variant="error">Failed</Badge>}

          <div className="text-right font-mono">
            <span className="text-lg font-bold text-sky-400">
              {execution.progress_percentage}%
            </span>
          </div>
        </div>
      </div>

      <Progress value={execution.progress_percentage} barClassName="h-2.5" />

      {/* 6 AI Agents Grid / Timeline Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
        {execution.agent_statuses.map((agent: AgentProgressStatus, idx: number) => {
          const isCurrent = execution.current_agent === agent.agent_id && execution.status === "running";
          return (
            <div
              key={agent.agent_id}
              className={`p-4 rounded-lg bg-slate-950/80 border transition-all ${
                isCurrent
                  ? "border-sky-500 shadow-md shadow-sky-500/10 ring-1 ring-sky-500/50"
                  : agent.status === "completed"
                  ? "border-slate-800/80 hover:border-slate-700"
                  : "border-slate-900 opacity-80"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-500 font-bold">#{idx + 1}</span>
                  <h4 className="text-xs font-semibold text-slate-200">{agent.name}</h4>
                </div>
                {getStatusIcon(agent.status)}
              </div>

              <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                {agent.output_summary || (isCurrent ? "Synthesizing AI engineering computations..." : "Waiting for upstream node dependencies...")}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
