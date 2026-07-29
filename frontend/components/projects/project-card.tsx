"use client";

import React from "react";
import Link from "next/link";
import { Play, FileText, Calendar, DollarSign, Trash2 } from "lucide-react";
import { Project } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  onExecute: (project: Project) => void;
  onDelete?: (projectId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onExecute, onDelete }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Completed</Badge>;
      case "executing":
      case "queued":
        return <Badge variant="info">Running Swarm</Badge>;
      case "failed":
        return <Badge variant="error">Failed</Badge>;
      default:
        return <Badge variant="default">Draft</Badge>;
    }
  };

  return (
    <Card glow className="flex flex-col justify-between space-y-4">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-mono font-semibold tracking-wider text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/40">
              {project.category}
            </span>
            <h3 className="text-base font-semibold text-slate-100 mt-2 line-clamp-1">
              {project.title}
            </h3>
          </div>
          {getStatusBadge(project.status)}
        </div>

        <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-slate-500" />
            <span>Budget: {formatCurrency(project.target_budget)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Timeline: {project.target_timeline_weeks} wks</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 gap-2">
        <span className="text-[10px] text-slate-500 font-mono">
          Updated {formatDate(project.updated_at)}
        </span>

        <div className="flex items-center gap-2">
          {onDelete && (
            <button
              onClick={() => onDelete(project.id)}
              className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
              title="Delete project"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

          {project.last_execution_id ? (
            <Link href={`/executions/${project.last_execution_id}`}>
              <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                <FileText className="w-3.5 h-3.5 text-sky-400" />
                View Execution
              </Button>
            </Link>
          ) : (
            <Button
              size="sm"
              variant="primary"
              onClick={() => onExecute(project)}
              className="gap-1.5 text-xs"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Execute Swarm
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
