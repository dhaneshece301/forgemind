"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Play, FolderKanban, Cpu, FileCheck2, Loader2, ArrowRight } from "lucide-react";
import { Shell } from "@/components/layout/shell";
import { Metrics } from "@/components/dashboard/metrics";
import { AgentStatusOverview } from "@/components/dashboard/agent-status-overview";
import { ProjectCard } from "@/components/projects/project-card";
import { CreateProjectModal } from "@/components/projects/create-project-modal";
import { projectsApi, executionsApi, reportsApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data: projects = [], isLoading: loadingProjects } = useQuery({
    queryKey: ["projects", search],
    queryFn: () => projectsApi.list(search),
  });

  const { data: executions = [] } = useQuery({
    queryKey: ["executions"],
    queryFn: () => executionsApi.list(),
  });

  const { data: reports = [] } = useQuery({
    queryKey: ["reports"],
    queryFn: () => reportsApi.list(),
  });

  const createProjectMutation = useMutation({
    mutationFn: (payload: any) => projectsApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const executeMutation = useMutation({
    mutationFn: (projectId: string) => executionsApi.create(projectId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["executions"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      router.push(`/executions/${data.id}`);
    },
  });

  const handleCreateProject = async (data: any) => {
    await createProjectMutation.mutateAsync(data);
  };

  const handleExecuteProject = (project: any) => {
    executeMutation.mutate(project.id);
  };

  const activeExecutions = executions.filter((e) => e.status === "running" || e.status === "queued").length;

  return (
    <Shell onSearchChange={setSearch}>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-100">Engineering Command Center</h1>
            <p className="text-xs text-slate-400 mt-1">
              Autonomous 6-agent manufacturing intelligence platform
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="gap-2 text-xs h-9"
          >
            <Plus className="w-4 h-4" />
            New Engineering Project
          </Button>
        </div>

        {/* Metrics Row */}
        <Metrics
          totalProjects={projects.length}
          activeExecutions={activeExecutions}
          totalReports={reports.length}
        />

        {/* 6 AI Agent Swarm Overview */}
        <AgentStatusOverview />

        {/* Projects Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <FolderKanban className="w-4 h-4 text-sky-400" />
              Active Hardware Projects ({projects.length})
            </h2>
            <Link href="/projects">
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>

          {loadingProjects ? (
            <div className="flex items-center justify-center p-12 text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin text-sky-400" />
            </div>
          ) : projects.length === 0 ? (
            <Card className="p-8 text-center space-y-3 bg-slate-900/50 border-dashed">
              <FolderKanban className="w-8 h-8 text-slate-600 mx-auto" />
              <div>
                <h3 className="text-sm font-semibold text-slate-200">No Projects Found</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Create your first product concept to launch the 6 AI engineering agents.
                </p>
              </div>
              <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
                Create Project
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.slice(0, 6).map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onExecute={handleExecuteProject}
                />
              ))}
            </div>
          )}
        </div>

        {/* Recent Executions & Reports Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Recent Swarm Executions */}
          <Card className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <h3 className="text-xs font-semibold text-slate-200 font-mono uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                Recent Swarm Executions
              </h3>
            </div>

            <div className="space-y-2">
              {executions.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-4 text-center">No executions recorded yet.</p>
              ) : (
                executions.slice(0, 5).map((exec) => (
                  <Link key={exec.id} href={`/executions/${exec.id}`}>
                    <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 hover:border-sky-500/50 transition-colors flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono text-slate-300">ID: {exec.id.slice(0, 8)}...</span>
                        <p className="text-[10px] text-slate-500 mt-0.5">{formatDate(exec.created_at)}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sky-400 font-semibold">{exec.progress_percentage}%</span>
                        <Badge
                          variant={
                            exec.status === "completed"
                              ? "success"
                              : exec.status === "running"
                              ? "info"
                              : "default"
                          }
                        >
                          {exec.status}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </Card>

          {/* Generated Reports */}
          <Card className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <h3 className="text-xs font-semibold text-slate-200 font-mono uppercase tracking-wider flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                Generated Engineering Reports
              </h3>
            </div>

            <div className="space-y-2">
              {reports.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-4 text-center">No generated reports available.</p>
              ) : (
                reports.slice(0, 5).map((rep) => (
                  <Link key={rep.id} href={`/reports/${rep.id}`}>
                    <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 hover:border-emerald-500/50 transition-colors flex items-center justify-between text-xs">
                      <div>
                        <h4 className="font-medium text-slate-200 truncate">{rep.title}</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">{formatDate(rep.created_at)}</p>
                      </div>
                      <Badge variant="success">View Report</Badge>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProject}
        isLoading={createProjectMutation.isPending}
      />
    </Shell>
  );
}
