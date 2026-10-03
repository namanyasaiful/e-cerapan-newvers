"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import PageHeader from "@/components/e-cerapan/layout/PageHeader";
import Stepper from "@/components/e-cerapan/layout/Stepper";
import ResultCard from "@/components/e-cerapan/cards/ResultCard";
import MetricSummary from "@/components/e-cerapan/cards/MetricSummary";
import InfoCard from "@/components/e-cerapan/cards/InfoCard";
import ParameterTable from "@/components/e-cerapan/table/ParameterTable";
import ConfirmationModal from "@/components/e-cerapan/modal/ConfirmationModal";
import { WizardStepProps } from "@/types/wizard";
import { generateSkhpPdf } from "@/lib/generateSkhpPdf";

export default function HasilPengujianPage({
  formData,
  updateFormData,
  prevStep,
}: Partial<WizardStepProps> = {}) {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!updateFormData) {
      router.replace("/e-cerapan");
    }
  }, [updateFormData, router]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmSimpan = async () => {
    setIsLoading(true);

    try {
      const pdf = generateSkhpPdf(formData);
      const nomorOrder = formData?.step1.dataPengujian.nomorOrder || "SKHP";
      const safeFileName = nomorOrder.replace(/[^a-z0-9_-]/gi, "-");
      sessionStorage.setItem("e-cerapan-pdf", pdf.output("datauristring"));
      sessionStorage.setItem("e-cerapan-pdf-name", `SKHP-${safeFileName}.pdf`);

      setIsModalOpen(false);
      router.push("/e-cerapan/pengujianberhasil");
    } catch (error) {
      console.error("Gagal mengekspor PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const identitasAlat = [
    {
      label: "Merek",
      value: formData?.step1?.identitasUTTP?.merek || "Tokheim",
    },
    {
      label: "Tipe",
      value: formData?.step1?.identitasUTTP?.tipeModel || "Quantium 310",
    },
    {
      label: "No. Seri",
      value: formData?.step1?.identitasUTTP?.nomorSeri || "SN-2023-TKH-0456",
    },
    {
      label: "Jml. Nozzle",
      value: formData?.step1?.identitasUTTP?.jumlahNozzle || "2",
    },
    {
      label: "Tahun Buat",
      value: formData?.step1?.identitasUTTP?.tahunPembuatan || "2022",
    },
  ];

  const dataPengujian = [
    {
      label: "No. Pengujian",
      value: formData?.step1?.dataPengujian?.nomorOrder || "PU-BBM-2024-0847",
    },
    {
      label: "Tanggal",
      value: formData?.step1?.dataPengujian?.tanggalPengujian || "2026-09-13",
    },
    {
      label: "No. SPBU",
      value: formData?.step1?.dataPengujian?.noSPBU || "34.121.01",
    },
    {
      label: "Petugas 1",
      value: formData?.step1?.dataPengujian?.namaPetugas1 || "Ahmad Fauzi, S.T.",
    },
    {
      label: "Petugas 2",
      value: formData?.step1?.dataPengujian?.namaPetugas2 || "Siti Rahayu, S.T.",
    },
  ];

  const checklist = formData?.step1?.checklist || [];
  const cerapan = formData?.step2?.cerapan || [];

  const checklistTidak = checklist.filter((item) => item.penilaian === "tidak").length;
  const cerapanTidakLolos = cerapan.filter((item) => item.status === "tidak_lolos").length;
  const totalGagal = checklistTidak + cerapanTidakLolos;
  const isSuccess = totalGagal === 0;

  const hasData = checklist.length > 0 || cerapan.length > 0;
  const displayDiperiksa = hasData ? checklist.length + cerapan.length : 12;
  const displayGagal = hasData ? totalGagal : 0;
  const displayLolos = hasData ? Math.max(displayDiperiksa - displayGagal, 0) : 12;
  const displayIsSuccess = hasData ? isSuccess : true;

  const parameterData = [
    {
      parameter: "Kesalahan Rata-rata (Akurasi)",
      nilai: "0.3335",
      satuan: "%",
      toleransi: "± 0.5%",
      status: "LOLOS" as const,
    },
    {
      parameter: "Kemampuan Ulang (Repeatability)",
      nilai: "0.0499",
      satuan: "%",
      toleransi: "≤ 0.3%",
      status: "LOLOS" as const,
    },
    {
      parameter: "Meter Factor",
      nilai: "0.99668",
      satuan: "—",
      toleransi: "0.995 – 1.005",
      status: "LOLOS" as const,
    },
    {
      parameter: "Penjatah Volume",
      nilai: formData?.step2?.dataBejana?.volNominal || "20",
      satuan: "L",
      toleransi: "—",
      status: "LOLOS" as const,
    },
    {
      parameter: "Penjatah Harga",
      nilai: formData?.step2?.dataNozzle?.hargaSatuan
        ? `Rp ${formData.step2.dataNozzle.hargaSatuan}`
        : "Rp 200.000",
      satuan: "—",
      toleransi: "—",
      status: "LOLOS" as const,
    },
    {
      parameter: "Anti-drain (Penghisap Balik)",
      nilai: "Ada",
      satuan: "—",
      toleransi: "—",
      status: "LOLOS" as const,
    },
    {
      parameter: "Laju Alir Maksimum",
      nilai: formData?.step1?.kondisiOperasi?.ujiAlkMaksimum || "80",
      satuan: "L/menit",
      toleransi: "≤ 120 L/menit",
      status: "LOLOS" as const,
    },
    {
      parameter: "Fasilitas Perangkat Penunjukan",
      nilai: "Berfungsi",
      satuan: "—",
      toleransi: "—",
      status: "LOLOS" as const,
    },
    {
      parameter: "Nozzle Cut-off",
      nilai: "Berfungsi",
      satuan: "—",
      toleransi: "—",
      status: "LOLOS" as const,
    },
    {
      parameter: "Interlock (Multi-nozzle)",
      nilai: "Berfungsi",
      satuan: "—",
      toleransi: "—",
      status: "LOLOS" as const,
    },
    {
      parameter: "Kebocoran / Rembesan",
      nilai: "Tidak Ada",
      satuan: "—",
      toleransi: "—",
      status: "LOLOS" as const,
    },
    {
      parameter: "Total Volume Terpakai",
      nilai: formData?.step2?.totalisator?.totalTerpakai || "60.00",
      satuan: "L",
      toleransi: "—",
      status: "—" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F9] w-full">

      <div className="px-8 py-8 md:px-12 md:py-12 max-w-[1100px] mx-auto">
        <Stepper
          steps={["Pemeriksaan Awal", "Pengujian/Pemeriksaan", "Hasil"]}
          currentStep={2}
        />

        <div className="flex flex-col gap-[40px]">
          <PageHeader
            title="Hasil Keseluruhan Pengujian"
            description="Evaluasi lengkap semua parameter pengujian Pompa Ukur BBM"
          />

          <ResultCard isSuccess={displayIsSuccess} />
          <MetricSummary
            diperiksa={displayDiperiksa}
            lolos={displayLolos}
            gagal={displayGagal}
          />
          <InfoCard identitasAlat={identitasAlat} dataPengujian={dataPengujian} />
          <ParameterTable data={parameterData} />

          <div className="flex gap-[40px]">
            <button
              type="button"
              onClick={() => {
                if (prevStep) {
                  prevStep();
                }
              }}
              className="w-full py-[8px] px-[16px] border border-[#686868] text-[#686868] font-bold rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              Kembali
            </button>
            <button
              type="button"
              className="w-full py-[8px] px-[16px] border bg-[#2479BC] text-white font-bold rounded-lg text-sm hover:bg-[#1d6aa6] transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              Kirim Hasil
            </button>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSimpan}
        noPengujian={dataPengujian[0].value}
        tanggal={dataPengujian[1].value}
        jenisAlat="Pompa Ukur BBM"
        isLoading={isLoading}
      />
    </div>
  );
}
