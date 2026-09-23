"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Stepper from "@/components/e-cerapan/layout/Stepper";
import StatusBanner from "@/components/e-cerapan/layout/StatusBanner";
import StatCard from "@/components/e-cerapan/cards/StatCard";
import { WizardStepProps } from "@/types/wizard";
import Button from "@/components/ui/Button";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from "@/components/ui/Table";
import FormCard from "@/components/e-cerapan/form/FormCard";
import Card from "@/components/ui/Card";

// ─── Mock Data (Replace with data from state/API) ────────────

const IDENTITAS_ALAT = {
  merek: "Tokheim",
  tipe: "Quantium 310",
  noSeri: "SN-2023-TKJ-0456",
  noSPBU: "34.121.01",
  namaSPBU: "PT. Pertamina Retail",
  nomorOrder: "ORD-2024-0874",
};

const CHECKLIST_RESULTS = [
  {
    no: 1,
    deskripsi:
      "Apakah PU BBM dilengkapi dengan Persetujuan Tipe (untuk Tera)?\n- Apakah informasi pada pelat identitas sesuai dengan Persetujuan Tipe\n- Apakah spesifikasi teknis PU BBM sesuai dengan Persetujuan Tipe?",
    penilaian: "Ya",
  },
  {
    no: 2,
    deskripsi:
      "Apakah PU BBM sudah digunakan dengan benar?\n- Apakah tanda tera sebelumnya masih utuh dan tidak ada yang rusak?\n- Apakah tidak terdapat alat tambahan yang merubah spesifikasi dan/atau mempengaruhi\nhasil pengukuran PU BBM?",
    penilaian: "Ya",
  },
  {
    no: 3,
    deskripsi:
      "Apakah semua deskripsi yang wajib jelas terpasang pada pelat identitas ada dan terpasang tetap pada\nPU BBM?\n- Apakah identitas pada pelat data lengkap sesuai syarat teknis?\n- Apakah identitas pada pelat data mudah terlihat, jelas dan mudah dibaca?",
    penilaian: "Ya",
  },
  {
    no: 4,
    deskripsi: "Apakah PU BBM dalam kondisi lengkap dan bersih?",
    penilaian: "Ya",
  },
  {
    no: 5,
    deskripsi:
      "Apakah PU BBM terpasang dengan kokoh pada pondasinya atau pada sasis Tangki Ukur Mobil BBM?",
    penilaian: "Ya",
  },
  {
    no: 6,
    deskripsi:
      "Apakah tidak terdapat kerusakan pada penutup Perangkat Penunjukan?",
    penilaian: "Ya",
  },
  {
    no: 7,
    deskripsi: "Apakah Gelas Penglihat bersih serta penuh dengan produk?",
    penilaian: "Ya",
  },
  {
    no: 8,
    deskripsi:
      "Apakah penunjukan volume, harga satuan, dan total harga sesuai dengan Slang yang dipilih?",
    penilaian: "Ya",
  },
  {
    no: 9,
    deskripsi:
      "Apakah penunjukan volume, harga satuan, dan total harga sesuai dengan Slang yang dipilih?",
    penilaian: "Ya",
  },
  {
    no: 10,
    deskripsi:
      "Apakah Slang dalam kondisi baik, (pada slang apakah ditemukan konsdisi seperti lecet, retak, atau pembungkus Slangnya telah usang)?",
    penilaian: "Ya",
  },
  {
    no: 11,
    deskripsi:
      "Apakah masing-masing nozzle menghentikan aliran cairan ketika dikembalikan ke tempat penyimpanannya?",
    penilaian: "Ya",
  },
  {
    no: 12,
    deskripsi:
      "Apakah pada PU BBM tidak ditemukan adanya kebocoran atau rembesan cairan?",
    penilaian: "Ya",
  },
];

export default function HasilPemeriksaanAwalPage({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}: Partial<WizardStepProps> = {}) {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!updateFormData) {
      router.replace("/e-cerapan");
    }
  }, [updateFormData, router]);

  const identitasAlat = {
    merek: formData?.step1?.identitasUTTP?.merek || IDENTITAS_ALAT.merek,
    tipe: formData?.step1?.identitasUTTP?.tipeModel || IDENTITAS_ALAT.tipe,
    noSeri: formData?.step1?.identitasUTTP?.nomorSeri || IDENTITAS_ALAT.noSeri,
    noSPBU: formData?.step1?.dataPengujian?.noSPBU || IDENTITAS_ALAT.noSPBU,
    namaSPBU:
      formData?.step1?.dataPengujian?.namaPemilik || IDENTITAS_ALAT.namaSPBU,
    nomorOrder:
      formData?.step1?.dataPengujian?.nomorOrder || IDENTITAS_ALAT.nomorOrder,
  };

  const identitasItems = [
    { label: "Merek", value: identitasAlat.merek },
    { label: "Tipe", value: identitasAlat.tipe },
    { label: "No. Seri", value: identitasAlat.noSeri },
    { label: "No. SPBU", value: identitasAlat.noSPBU },
    { label: "Nama SPBU", value: identitasAlat.namaSPBU },
    { label: "Nomor Order", value: identitasAlat.nomorOrder },
  ];

  const checklistResults =
    formData?.step1?.checklist && formData.step1.checklist.length > 0
      ? formData.step1.checklist.map((item, index) => ({
        no: item.no || index + 1,
        deskripsi: item.uraian || `Parameter ${index + 1}`,
        penilaian:
          item.penilaian === "ya"
            ? "Ya"
            : item.penilaian === "tidak"
              ? "Tidak"
              : "-",
      }))
      : CHECKLIST_RESULTS;

  // Derived statistics
  const totalParameter = checklistResults.length;
  const memenuhiCount = checklistResults.filter(
    (item) => item.penilaian === "Ya",
  ).length;
  const tidakMemenuhiCount = checklistResults.filter(
    (item) => item.penilaian === "Tidak",
  ).length;
  const isLolos = tidakMemenuhiCount === 0;

  return (
    <div className="min-h-screen bg-primay w-full">
      <div className="px-8 py-8 md:px-12 md:py-12 max-w-[1100px] mx-auto space-y-8">

        <Stepper
          steps={["Pemeriksaan Awal", "Pengujian & Perhitungan", "Hasil"]}
          currentStep={0}
          stepStatus="completed"
        />

        {/* 1. Banner Status */}
        <StatusBanner
          status={isLolos ? "memenuhi" : "tidak_memenuhi"}
          title={isLolos ? "Memenuhi Syarat" : "Tidak Memenuhi Syarat"}
          subtitle={
            isLolos
              ? "Alat dapat dilanjutkan ke tahap pengujian"
              : "Alat tidak dapat dilanjutkan ke tahap pengujian"
          }
        />

        {/* 2. Statistik Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            value={totalParameter}
            label="Total Parameter"
            valueColor="primary"
          />
          <StatCard
            value={memenuhiCount}
            label="Memenuhi"
            valueColor="success"
          />
          <StatCard
            value={tidakMemenuhiCount}
            label="Tidak Memenuhi"
            valueColor="danger"
          />
        </div>

        {/* 3. Tabel Rincian Hasil */}
        <FormCard
          title="Rincian Hasil Pemeriksaan"
          className="mb-7"
          headerClassName="bg-gray-200/60 px-6 py-4"
          contentClassName="p-0 overflow-hidden"
        >
          <Table className="text-[14px]">
            {/* TABLE HEADER */}
            <TableHead>
              <TableRow>
                <TableHeader className="py-4 px-6 w-[60px] text-left">
                  No
                </TableHeader>
                <TableHeader className="py-4 px-6 text-left">
                  Deskripsi
                </TableHeader>
                <TableHeader className="py-4 px-6 w-[150px] text-center">
                  Penilaian
                </TableHeader>
              </TableRow>
            </TableHead>

            {/* TABLE BODY */}
            <TableBody>
              {checklistResults.map((item, index) => (
                <TableRow key={index} className="hover:bg-gray-50/50">
                  {/* NOMOR */}
                  <TableCell className="py-4 px-6 align-top font-semibold text-gray-800">
                    {item.no}
                  </TableCell>

                  {/* DESKRIPSI */}
                  <TableCell className="py-4 px-6 align-top whitespace-pre-line leading-relaxed text-gray-700">
                    {item.deskripsi}
                  </TableCell>

                  {/* PENILAIAN */}
                  <TableCell className="py-4 px-6 align-top text-center">
                    <span
                      className={`font-medium ${item.penilaian === "Ya" ? "text-[#4ade80]" : "text-red-500"
                        }`}
                    >
                      {item.penilaian}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </FormCard>

        {/* 4. Identitas Alat Card */}
        <Card className="p-8">
          <h3 className="font-bold text-primary uppercase mb-6 tracking-wide">
            Identitas Alat Yang Diperiksa
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8 text-[15px]">
            {identitasItems.map((item, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-neutral w-28 shrink-0">{item.label}:</span>
                <span className="font-semibold text-black">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
        {/* 5. Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-1/2"
            onClick={() => {
              if (prevStep) {
                prevStep();
              } else {
                router.push("/e-cerapan/pemeriksaanawal");
              }
            }}
          >
            Kembali ke Pemeriksaan
          </Button>

          <Button
            variant="primary"
            size="lg"
            disabled={!isLolos}
            className="w-full sm:w-1/2"
            onClick={() => {
              if (isLolos) {
                if (nextStep) {
                  nextStep();
                } else {
                  router.push("/e-cerapan/pengujian");
                }
              }
            }}
          >
            Lanjut ke Pengujian
          </Button>
        </div>
      </div>
    </div>
  );
}
