"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface BomTableProps {
  costData: Record<string, any>;
}

export const BomTable: React.FC<BomTableProps> = ({ costData }) => {
  const bom = costData?.bill_of_materials || [];
  const estCost = costData?.estimated_cost || {};

  return (
    <Card className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <h4 className="text-xs font-semibold text-slate-200 font-mono uppercase tracking-wider">
          Bill of Materials (BOM) & Sourcing Matrix
        </h4>
        <span className="text-xs text-sky-400 font-mono font-bold">
          Total Unit Cost: {formatCurrency(estCost.total_unit_cost_usd || 850)}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px]">
            <tr>
              <th className="p-2.5">Item Description</th>
              <th className="p-2.5 text-center">Qty</th>
              <th className="p-2.5 text-right">Unit Price</th>
              <th className="p-2.5">Supplier Partner</th>
              <th className="p-2.5 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-slate-300">
            {bom.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-slate-500 italic">
                  No BOM entries found.
                </td>
              </tr>
            ) : (
              bom.map((item: any, idx: number) => {
                const subtotal = (item.unit_cost_usd || 0) * (item.quantity || 1);
                return (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-2.5 font-medium text-slate-200">{item.item}</td>
                    <td className="p-2.5 text-center font-mono">{item.quantity}</td>
                    <td className="p-2.5 text-right font-mono">{formatCurrency(item.unit_cost_usd)}</td>
                    <td className="p-2.5 text-slate-400">{item.supplier}</td>
                    <td className="p-2.5 text-right font-mono font-semibold text-slate-100">
                      {formatCurrency(subtotal)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Cost Breakdown Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800 font-mono text-xs">
        <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800">
          <p className="text-[10px] text-slate-500">Raw Material</p>
          <p className="font-semibold text-slate-200 mt-1">{formatCurrency(estCost.raw_material_usd || 420)}</p>
        </div>
        <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800">
          <p className="text-[10px] text-slate-500">CNC Machining</p>
          <p className="font-semibold text-slate-200 mt-1">{formatCurrency(estCost.machining_and_tooling_usd || 310)}</p>
        </div>
        <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800">
          <p className="text-[10px] text-slate-500">Assembly & QA</p>
          <p className="font-semibold text-slate-200 mt-1">{formatCurrency(estCost.assembly_and_qa_usd || 120)}</p>
        </div>
        <div className="p-2.5 rounded bg-sky-950/60 border border-sky-800/60">
          <p className="text-[10px] text-sky-400 font-bold">Total Unit Cost</p>
          <p className="font-bold text-sky-300 mt-1">{formatCurrency(estCost.total_unit_cost_usd || 850)}</p>
        </div>
      </div>
    </Card>
  );
};
