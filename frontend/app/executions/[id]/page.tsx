"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, FileCheck2, Loader2, Play } from "lucide-react";
import { Shell } from "@/components/layout/shell";
import { ExecutionPipeline } from "@/components/executions/execution-pipeline";
import { AgentLogViewer } from "@/components/executions/agent-log-viewer";
import { executionsApi } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function ExecutionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const executionId = params.id as string;

  const { data: execution, isLoading } = useQuery({
    queryKey: ["execution", executionId],
    queryFn: () => executionsApi.get(executionId),
    refetchInterval: (query) => {
      const data = query.state.data;
      if (data && (data.status === "running" || data.status === "queued")) {
        return 1500; // Poll every 1.5s while executing
      }
      return false;
    },
  });

  return (
    <Shell title={`Swarm Execution Pipeline #${executionId?.slice(0, 8)}`}>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Navigation Top Header */}
        <div className="flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2 text-xs">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Button>
          </Link>

          {execution?.report_id && (
            <Link href={`/reports/${execution.report_id}`}>
              <Button variant="primary" size="sm" className="gap-2 text-xs">
                <FileCheck2 className="w-4 h-4 text-white" /> View Engineering Report
              </Button>
            </Link>
          )}
        </div>

        {isLoading || !execution ? (
          <div className="flex items-center justify-center p-20 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-sky-400" />
          </div>
        ) : (
          <>
            {/* Live Progress Node Pipeline */}
            <ExecutionPipeline execution={execution} />

            {/* Terminal Console Logs */}
            <AgentLogViewer logs={execution.logs || []} />
          </>
        )}
      </div>
    </Shell>
  );
}
