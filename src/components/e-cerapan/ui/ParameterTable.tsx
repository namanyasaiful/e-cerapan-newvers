import React from "react";

export interface ParameterItem {
  id?: string;
  parameter: string;
  nilai: string;
  satuan: string;
  toleransi: string;
  status: "LOLOS" | "GAGAL" | "—";
}

interface ParameterTableProps {
  data?: ParameterItem[];
}

const DEFAULT_PARAMETER_DATA: ParameterItem[] = [
  { parameter: "Kesalahan Rata-rata (Akurasi)", nilai: "0.3335", satuan: "%", toleransi: "± 0.5%", status: "LOLOS" },
  { parameter: "Kemampuan Ulang (Repeatability)", nilai: "0.0499", satuan: "%", toleransi: "≤ 0.3%", status: "LOLOS" },
  { parameter: "Meter Factor", nilai: "0.99668", satuan: "—", toleransi: "0.995 – 1.005", status: "LOLOS" },
  { parameter: "Penjatah Volume", nilai: "20", satuan: "L", toleransi: "—", status: "LOLOS" },
  { parameter: "Penjatah Harga", nilai: "Rp 200.000", satuan: "—", toleransi: "—", status: "LOLOS" },
  { parameter: "Anti-drain (Penghisap Balik)", nilai: "Ada", satuan: "—", toleransi: "—", status: "LOLOS" },
  { parameter: "Laju Alir Maksimum", nilai: "80", satuan: "L/menit", toleransi: "≤ 120 L/menit", status: "LOLOS" },
  { parameter: "Fasilitas Perangkat Penunjukan", nilai: "Berfungsi", satuan: "—", toleransi: "—", status: "LOLOS" },
  { parameter: "Nozzle Cut-off", nilai: "Berfungsi", satuan: "—", toleransi: "—", status: "LOLOS" },
  { parameter: "Interlock (Multi-nozzle)", nilai: "Berfungsi", satuan: "—", toleransi: "—", status: "LOLOS" },
  { parameter: "Kebocoran / Rembesan", nilai: "Tidak Ada", satuan: "—", toleransi: "—", status: "LOLOS" },
  { parameter: "Total Volume Terpakai", nilai: "60.00", satuan: "L", toleransi: "—", status: "—" },
];

export default function ParameterTable({ data = DEFAULT_PARAMETER_DATA }: ParameterTableProps) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-[#E2E2E2] px-6 py-4 border-b border-slate-200">
        <h3 className="font-semibold text-black text-sm">Tabel Evaluasi Parameter</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[#2479BC]">
              <th className="px-6 py-3 font-semibold">Parameter</th>
              <th className="px-6 py-3 font-semibold">Nilai</th>
              <th className="px-6 py-3 font-semibold">Satuan</th>
              <th className="px-6 py-3 font-semibold">Batas/Toleransi</th>
              <th className="px-6 py-3 font-semibold text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {data.map((row, index) => (
              <tr key={row.id || index}>
                <td className="px-6 py-3">{row.parameter}</td>
                <td className="px-6 py-3 font-medium text-black">{row.nilai}</td>
                <td className="px-6 py-3">{row.satuan}</td>
                <td className="px-6 py-3">{row.toleransi}</td>
                <td className="px-6 py-3 text-center">
                  {row.status === "LOLOS" ? (
                    <span className="inline-block px-3 py-1 rounded-full bg-[#F0FAED] border border-[#64CC4A] text-[#64CC4A] text-[10px] font-semibold">
                      LOLOS
                    </span>
                  ) : row.status === "GAGAL" ? (
                    <span className="inline-block px-3 py-1 rounded-full bg-red-50 border border-red-500 text-red-500 text-[10px] font-semibold">
                      GAGAL
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}