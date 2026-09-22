"use client";

import React from "react";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";

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
      <div className="relative flex w-full max-w-[560px] flex-col gap-4 rounded-lg bg-white p-5 text-[#1A1A1A] shadow-xl animate-in zoom-in-95 duration-150 sm:p-6 sm:gap-5 lg:gap-6 lg:p-8">
        <button
          onClick={onClose}
          aria-label="Tutup konfirmasi"
          className="absolute right-5 top-5 text-[#686868] transition-colors hover:text-[#1A1A1A] sm:right-6 sm:top-6 lg:right-8 lg:top-8"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <h2 className="pr-8 text-xl font-semibold text-[#1A1A1A] sm:text-2xl">
            Konfirmasi Pengiriman
          </h2>
          <p className="mt-1 border-b border-slate-200 pb-4 text-sm text-[#686868] sm:text-base">
            Tindakan ini tidak dapat dibatalkan
          </p>
        </div>

        <p className="text-sm leading-relaxed text-[#686868] sm:text-base">
          Apakah Anda yakin ingin menyimpan hasil pengujian ini? Data yang telah
          disimpan akan digunakan sebagai dokumen resmi kemetrologian.
        </p>

        <div className="flex flex-col divide-y divide-slate-200 border-b border-t border-slate-200 text-sm sm:text-base">
          <div className="flex flex-col gap-1 py-3 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
            <span className="text-[#686868]">No. Pengujian</span>
            <span className="break-words font-medium text-[#1A1A1A] lg:text-right">{noPengujian}</span>
          </div>
          <div className="flex flex-col gap-1 py-3 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
            <span className="text-[#686868]">Tanggal</span>
            <span className="break-words font-medium text-[#1A1A1A] lg:text-right">{tanggal}</span>
          </div>
          <div className="flex flex-col gap-1 py-3 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
            <span className="text-[#686868]">Jenis Alat</span>
            <span className="break-words font-medium text-[#1A1A1A] lg:text-right">{jenisAlat}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 pt-1 sm:gap-4 sm:pt-2 lg:grid-cols-2">
          <Button
            variant="outline"
            size="md"
            fullWidth
            onClick={onClose}
            disabled={isLoading}
            className="rounded-lg border-[#686868] px-[16px] py-[8px] text-sm font-bold text-[#686868] hover:bg-slate-50 hover:text-[#686868] sm:text-base"
          >
            Batal
          </Button>
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={onConfirm}
            disabled={isLoading}
            className="rounded-lg bg-[#2479BC] px-[16px] py-[8px] text-sm font-bold text-white hover:bg-[#1d649c] hover:text-white sm:text-base"
          >
            {isLoading ? "Mengirim..." : "Konfirmasi & Kirim"}
          </Button>
        </div>
      </div>
    </div>
  );
}
