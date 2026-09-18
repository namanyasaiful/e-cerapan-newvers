import React from "react";
import { Check, X } from "lucide-react";

interface ResultCardProps {
  isSuccess?: boolean;
}

export default function ResultCard({ isSuccess = true }: ResultCardProps) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm">
      <div
        className={`w-16 h-16 rounded-full text-white flex items-center justify-center mb-4 ${
          isSuccess ? "bg-[#4CAF50]" : "bg-red-500"
        }`}
      >
        {isSuccess ? (
          <Check className="w-10 h-10 stroke-[3]" />
        ) : (
          <X className="w-10 h-10 stroke-[3]" />
        )}
      </div>
      <h2
        className={`text-xl font-bold tracking-wide mb-2 ${
          isSuccess ? "text-[#4CAF50]" : "text-red-500"
        }`}
      >
        {isSuccess ? "LULUS UJI" : "GAGAL UJI"}
      </h2>
      <p className="text-slate-600 text-sm">
        Pompa Ukur BBM telah memenuhi persyaratan teknis metrologi.
      </p>
      <p className="text-slate-600 text-sm">
        Alat dapat digunakan dalam transaksi perdagangan.
      </p>
    </div>
  );
}