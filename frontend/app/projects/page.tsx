"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Search, Filter, Loader2, FolderKanban } from "lucide-react";
import { Shell } from "@/components/layout/shell";
import { ProjectCard } from "@/components/projects/project-card";
import { CreateProjectModal } from "@/components/projects/create-project-modal";
import { projectsApi, executionsApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function ProjectsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects", search, statusFilter],
    queryFn: () => projectsApi.list(search, statusFilter || undefined),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => projectsApi.create(data),
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

  const deleteMutation = useMutation({
    mutationFn: (projectId: string) => projectsApi.delete(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const handleCreateProject = async (data: any) => {
    await createMutation.mutateAsync(data);
  };

  const handleExecute = (project: any) => {
    executeMutation.mutate(project.id);
  };

  const handleDelete = (projectId: string) => {
    if (confirm("Are you sure you want to delete this engineering project?")) {
      deleteMutation.mutate(projectId);
    }
  };

  return (
    <Shell onSearchChange={setSearch}>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <FolderKanban className="w-5 h-5 text-sky-400" />
              Engineering Projects Workspace
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Manage product concepts, target budgets, and agent executions
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="gap-2 text-xs h-9"
          >
            <Plus className="w-4 h-4" />
            Create Project
          </Button>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
          <div className="flex-1">
            <Input
              placeholder="Search by title or product description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 px-3 text-xs bg-slate-900 text-slate-200 border border-slate-800 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
            >
              <option value="">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="queued">Queued</option>
              <option value="executing">Executing</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center p-16 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-sky-400" />
          </div>
        ) : projects.length === 0 ? (
          <Card className="p-12 text-center space-y-3 bg-slate-900/50 border-dashed">
            <FolderKanban className="w-10 h-10 text-slate-600 mx-auto" />
            <div>
              <h3 className="text-sm font-semibold text-slate-200">No Projects Found</h3>
              <p className="text-xs text-slate-400 mt-1">
                Try adjusting your search query or create a new hardware project.
              </p>
            </div>
            <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
              Create Project
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onExecute={handleExecute}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProject}
        isLoading={createMutation.isPending}
      />
    </Shell>
  );
}
