import React from "react";

interface MetricSummaryProps {
  diperiksa?: number;
  lolos?: number;
  gagal?: number;
}

export default function MetricSummary({
  diperiksa = 12,
  lolos = 12,
  gagal = 0,
}: MetricSummaryProps) {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm">
        <div className="text-3xl font-bold text-[#2479BC] mb-1">{diperiksa}</div>
        <div className="text-sm font-medium text-slate-600">Diperiksa</div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm">
        <div className="text-3xl font-bold text-[#4CAF50] mb-1">{lolos}</div>
        <div className="text-sm font-medium text-[#4CAF50]">Lolos</div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm">
        <div className="text-3xl font-bold text-red-500 mb-1">{gagal}</div>
        <div className="text-sm font-medium text-red-500">Gagal</div>
      </div>
    </div>
  );
}