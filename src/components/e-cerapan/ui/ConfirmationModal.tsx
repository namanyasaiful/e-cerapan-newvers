"use client";

import React from "react";
import { X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  noPengujian?: string;
  tanggal?: string;
  jenisAlat?: string;
  isLoading?: boolean;
}

//Masih hardcoded

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  noPengujian = "PU-BBM-2024-0847",
  tanggal = "2026-09-13",
  jenisAlat = "Pompa Ukur BBM",
  isLoading = false,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-lg w-full max-w-[560px] p-8 shadow-xl relative flex flex-col gap-6 animate-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-8 right-8  hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-2xl font-semibold ">
            Konfirmasi Pengiriman
          </h2>
          <p className="text-[#686868] mt-1 pb-4 border-b border-slate-200">
            Tindakan ini tidak dapat dibatalkan
          </p>
        </div>

        <p className=" text-[#686868] leading-relaxed">
          Apakah Anda yakin ingin menyimpan hasil pengujian ini? Data yang telah
          disimpan akan digunakan sebagai dokumen resmi kemetrologian.
        </p>

        <div className="flex flex-col text-base divide-y divide-slate-200 border-t border-b border-slate-200">
          <div className="flex justify-between py-3">
            <span className="text-[#686868]">No. Pengujian</span>
            <span className="font-medium">{noPengujian}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-[#686868]">Tanggal</span>
            <span className="font-medium">{tanggal}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-[#686868]">Jenis Alat</span>
            <span className="font-medium">{jenisAlat}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-full py-[8px] px-[16px] rounded-lg border border-[#686868] text-[#686868] hover:bg-slate-50 text-base font-bold transition-colors disabled:opacity-50 cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full py-[8px] px-[16px] rounded-lg bg-[#2479BC] hover:bg-[#1d649c] text-white text-base font-bold transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Menyimpan..." : "Konfirmasi & Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}
