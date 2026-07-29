"use client";

import React from "react";
import { Card } from "@/components/ui/card";

interface MarkdownViewerProps {
  content: string;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
  return (
    <Card className="p-6 bg-slate-950 border-slate-800 text-slate-200">
      <div className="prose prose-invert max-w-none prose-headings:text-slate-100 prose-h1:text-xl prose-h2:text-base prose-h3:text-sm prose-p:text-xs prose-li:text-xs font-sans leading-relaxed whitespace-pre-wrap">
        {content}
      </div>
    </Card>
  );
};
