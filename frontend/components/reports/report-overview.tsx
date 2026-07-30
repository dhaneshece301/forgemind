"use client";

import React, { useState } from "react";
import { Download, Code2, FileText, BarChart3, PackageCheck, Cpu } from "lucide-react";
import { EngineeringReport } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FeaChart } from "./fea-chart";
import { BomTable } from "./bom-table";
import { MarkdownViewer } from "./markdown-viewer";
import { reportsApi } from "@/lib/api";

import { Box } from "lucide-react";
import { ParametricViewer } from "@/components/viewer";

interface ReportOverviewProps {
  report: EngineeringReport;
}

export const ReportOverview: React.FC<ReportOverviewProps> = ({ report }) => {
  const [activeTab, setActiveTab] = useState<"overview" | "fea" | "bom" | "markdown" | "json" | "3d">("overview");

  const handleDownloadPdf = async () => {
    const data = await reportsApi.exportPdf(report.id);
    const blob = new Blob([data], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ForgeMind_Report_${report.id.slice(0, 8)}.pdf`;
    a.click();
  };

  const handleDownloadMarkdown = async () => {
    const data = await reportsApi.exportMarkdown(report.id);
    const blob = new Blob([data.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = data.filename;
    a.click();
  };

  const handleDownloadJson = async () => {
    const data = await reportsApi.exportJson(report.id);
    const blob = new Blob([JSON.stringify(data.content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = data.filename;
    a.click();
  };

  return (
    <div className="space-y-5">
      {/* Report Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 sm:p-5 rounded-xl">
        <div>
          <span className="text-[10px] uppercase font-mono font-bold text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
            Autonomous Manufacturing Report
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-100 mt-2">{report.title}</h2>
          <p className="text-xs text-slate-400 mt-1 font-mono break-all">Report ID: {report.id}</p>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 w-full md:w-auto">
          <Button variant="primary" size="sm" onClick={() => setActiveTab("3d")} className="gap-1.5 text-xs bg-sky-600 hover:bg-sky-500 text-white w-full sm:w-auto justify-center">
            <Box className="w-3.5 h-3.5" />
            View 3D Model
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadPdf} className="gap-1.5 text-xs w-full sm:w-auto justify-center">
            <Download className="w-3.5 h-3.5 text-rose-400" />
            Download PDF
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadMarkdown} className="gap-1.5 text-xs w-full sm:w-auto justify-center">
            <Download className="w-3.5 h-3.5" />
            Markdown
          </Button>
          <Button variant="secondary" size="sm" onClick={handleDownloadJson} className="gap-1.5 text-xs w-full sm:w-auto justify-center">
            <Code2 className="w-3.5 h-3.5 text-sky-400" />
            Export JSON
          </Button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-1 border-b border-slate-800 overflow-x-auto pb-1 text-xs font-medium no-scrollbar">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors shrink-0 whitespace-nowrap ${activeTab === "overview" ? "bg-sky-950 text-sky-400 border border-sky-800" : "text-slate-400 hover:text-slate-200"
            }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Executive Overview
        </button>

        <button
          onClick={() => setActiveTab("fea")}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors shrink-0 whitespace-nowrap ${activeTab === "fea" ? "bg-sky-950 text-sky-400 border border-sky-800" : "text-slate-400 hover:text-slate-200"
            }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          FEA Simulation & Stress
        </button>

        <button
          onClick={() => setActiveTab("3d")}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors shrink-0 whitespace-nowrap ${activeTab === "3d" ? "bg-sky-950 text-sky-400 border border-sky-800" : "text-slate-400 hover:text-slate-200"
            }`}
        >
          <Box className="w-3.5 h-3.5" />
          Parametric 3D Preview
        </button>

        <button
          onClick={() => setActiveTab("bom")}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors shrink-0 whitespace-nowrap ${activeTab === "bom" ? "bg-sky-950 text-sky-400 border border-sky-800" : "text-slate-400 hover:text-slate-200"
            }`}
        >
          <PackageCheck className="w-3.5 h-3.5" />
          BOM & Sourcing Cost
        </button>

        <button
          onClick={() => setActiveTab("markdown")}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors shrink-0 whitespace-nowrap ${activeTab === "markdown" ? "bg-sky-950 text-sky-400 border border-sky-800" : "text-slate-400 hover:text-slate-200"
            }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Full Markdown Report
        </button>

        <button
          onClick={() => setActiveTab("json")}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors shrink-0 whitespace-nowrap ${activeTab === "json" ? "bg-sky-950 text-sky-400 border border-sky-800" : "text-slate-400 hover:text-slate-200"
            }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          Structured JSON Schema
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-4">
          <Card className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-200 font-mono uppercase tracking-wider">
              Executive Summary
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {report.executive_summary}
            </p>
          </Card>

          <FeaChart simulationData={report.engineering_simulation} />
          <BomTable costData={report.cost_and_procurement} />
        </div>
      )}

      {activeTab === "fea" && <FeaChart simulationData={report.engineering_simulation} />}

      {activeTab === "bom" && <BomTable costData={report.cost_and_procurement} />}

      {activeTab === "markdown" && <MarkdownViewer content={report.markdown_report} />}

      {activeTab === "json" && (
        <Card className="p-4 bg-slate-950 font-mono text-xs text-sky-300 overflow-x-auto">
          <pre>{JSON.stringify(report.json_report, null, 2)}</pre>
        </Card>
      )}

      {activeTab === "3d" && (
        <div className="w-full">
          <ParametricViewer designData={report.json_report?.design || { dimensions: { length_mm: 100, width_mm: 100, height_mm: 100 } }} />
        </div>
      )}
    </div>
  );
};
