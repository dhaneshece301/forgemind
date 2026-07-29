"use client";

import React, { useEffect, useRef } from "react";
import { Terminal } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AgentLogViewerProps {
  logs: string[];
}

export const AgentLogViewer: React.FC<AgentLogViewerProps> = ({ logs }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <Card className="p-0 overflow-hidden bg-slate-950 border-slate-800">
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs font-mono text-slate-300">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-sky-400" />
          <span>Swarm Execution Console Stdout</span>
        </div>
        <span className="text-[10px] text-slate-500">{logs.length} Log events</span>
      </div>

      <div className="p-4 h-64 overflow-y-auto font-mono text-[11px] leading-relaxed space-y-1 bg-black/60 text-slate-300">
        {logs.length === 0 ? (
          <p className="text-slate-600 italic">Initializing execution logs...</p>
        ) : (
          logs.map((log, idx) => (
            <div key={idx} className="flex gap-2">
              <span className="text-slate-600 select-none font-bold">$</span>
              <span
                className={
                  log.includes("[ERROR]")
                    ? "text-rose-400"
                    : log.includes("[COMPLETE]")
                    ? "text-emerald-400 font-semibold"
                    : log.includes("Agent")
                    ? "text-sky-300"
                    : "text-slate-300"
                }
              >
                {log}
              </span>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </Card>
  );
};
