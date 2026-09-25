import React from "react";

export interface InfoItem {
  label: string;
  value: string;
}

interface InfoCardProps {
  identitasAlat?: InfoItem[];
  dataPengujian?: InfoItem[];
}

const DEFAULT_IDENTITAS_ALAT: InfoItem[] = [
  { label: "Merek", value: "Tokheim" },
  { label: "Tipe", value: "Quantium 310" },
  { label: "No. Seri", value: "SN-2023-TKH-0456" },
  { label: "Jml. Nozzle", value: "2" },
  { label: "Tahun Buat", value: "2022" },
];

const DEFAULT_DATA_PENGUJIAN: InfoItem[] = [
  { label: "No. Pengujian", value: "PU-BBM-2024-0847" },
  { label: "Tanggal", value: "2026-09-13" },
  { label: "No. SPBU", value: "34.121.01" },
  { label: "Petugas 1", value: "Ahmad Fauzi, S.T." },
  { label: "Petugas 2", value: "Siti Rahayu, S.T." },
];

export default function InfoCard({
  identitasAlat = DEFAULT_IDENTITAS_ALAT,
  dataPengujian = DEFAULT_DATA_PENGUJIAN,
}: InfoCardProps = {}) {

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm lg:p-6">
        <h3 className="mb-4 text-base font-bold text-[#2479BC]">Identitas Alat</h3>
        <div className="flex flex-col divide-y divide-slate-100 text-xs">
          {identitasAlat.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-1 py-2 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
              <span className="text-slate-500">{item.label}</span>
              <span className="break-words font-semibold text-slate-800 lg:text-right">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm lg:p-6">
        <h3 className="mb-4 text-base font-bold text-[#2479BC]">Data Pengujian</h3>
        <div className="flex flex-col divide-y divide-slate-100 text-xs">
          {dataPengujian.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-1 py-2 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
              <span className="text-slate-500">{item.label}</span>
              <span className="break-words font-semibold text-slate-800 lg:text-right">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}