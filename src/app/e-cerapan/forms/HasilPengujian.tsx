"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";

import Breadcrumb from "@/components/e-cerapan/ui/Breadcrumb";
import Stepper from "@/components/e-cerapan/ui/Stepper";
import PageHeader from "@/components/e-cerapan/ui/PageHeader";
import ResultCard from "@/components/e-cerapan/ui/ResultCard";
import MetricSummary from "@/components/e-cerapan/ui/MetricSummary";
import InfoCard from "@/components/e-cerapan/ui/InfoCard";
import ParameterTable from "@/components/e-cerapan/ui/ParameterTable";
import ConfirmationModal from "@/components/e-cerapan/ui/ConfirmationModal";
import { WizardStepProps } from "@/types/wizard";

export default function HasilPengujianPage({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}: Partial<WizardStepProps> = {}) {
  const router = useRouter();

  useEffect(() => {
    if (!updateFormData) {
      router.replace('/e-cerapan');
    }
  }, [updateFormData, router]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmSimpan = async () => {
    setIsLoading(true);
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 18;
      const lineHeight = 5.5;
      let y = 16;
      const dataPengujianForm = formData?.step1?.dataPengujian;
      const tanggal = dataPengujianForm?.tanggalPengujian || new Date().toISOString().slice(0, 10);
      const formatTanggal = new Date(`${tanggal}T00:00:00`).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const logoData = await fetch("/assets/logo/Metrologi.svg")
        .then((response) => response.text())
        .then((svg) => new Promise<string | null>((resolve) => {
          const image = new Image();
          image.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
            canvas.getContext("2d")?.drawImage(image, 0, 0);
            resolve(canvas.toDataURL("image/png"));
          };
          image.onerror = () => resolve(null);
          image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
        }))
        .catch(() => null);

      if (logoData) {
        pdf.addImage(logoData, "PNG", margin, 12, 18, 18);
      }

      pdf.setTextColor(0, 0, 0);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      pdf.text("KEMENTERIAN PERDAGANGAN REPUBLIK INDONESIA", pageWidth / 2, 15, { align: "center" });
      pdf.setFontSize(14);
      pdf.text("DIREKTORAT METROLOGI", pageWidth / 2, 21, { align: "center" });
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.text("Unit Pelaksana Teknis Metrologi Legal", pageWidth / 2, 26, { align: "center" });
      pdf.text("Pelayanan Pengujian Alat Ukur, Takar, Timbang dan Perlengkapannya", pageWidth / 2, 30.5, { align: "center" });
      pdf.setLineWidth(0.7);
      pdf.line(margin, 35, pageWidth - margin, 35);
      pdf.setLineWidth(0.2);
      pdf.line(margin, 36.5, pageWidth - margin, 36.5);

      y = 45;
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.text("SURAT KETERANGAN HASIL PENGUJIAN", pageWidth / 2, y, { align: "center" });
      y += 6;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.text(`Nomor: ${dataPengujianForm?.nomorSIML || "-"} / E-CERAPAN / ${new Date().getFullYear()}`, pageWidth / 2, y, { align: "center" });
      y += 8;

      const addField = (label: string, value: string | number | undefined, options?: { bold?: boolean }) => {
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.text(label, margin, y);
        pdf.text(":", margin + 37, y);
        pdf.setFont("helvetica", options?.bold ? "bold" : "normal");
        const wrapped = pdf.splitTextToSize(String(value || "-"), pageWidth - margin - 45);
        pdf.text(wrapped, margin + 41, y);
        y += Math.max(lineHeight, wrapped.length * lineHeight);
      };

      addField("Nomor Order", dataPengujianForm?.nomorOrder, { bold: true });
      addField("Jenis Alat UTTP", "Pompa Ukur BBM");
      addField("Merek / Tipe / Nomor Seri", `${identitasAlat[0].value} / ${identitasAlat[1].value} / ${identitasAlat[2].value}`);
      addField("Kapasitas / Jumlah Nozzle", `${identitasAlat[3].value} nozzle`);
      addField("Tahun Pembuatan", identitasAlat[4].value);
      addField("Pemilik / Pemakai", dataPengujianForm?.namaPemilik);
      addField("Alamat Terpasang", dataPengujianForm?.alamatTerpasang);
      addField("No. SPBU", dataPengujianForm?.noSPBU);
      addField("Tanggal Pengujian", formatTanggal);
      addField("Petugas Penguji", `${dataPengujianForm?.namaPetugas1 || "-"} dan ${dataPengujianForm?.namaPetugas2 || "-"}`);
      addField("Metode", "Perbandingan langsung dengan standar metrologi");
      addField(
        "Hasil Pengujian",
        displayIsSuccess
          ? `Dinyatakan LULUS UJI berdasarkan hasil pemeriksaan ${displayDiperiksa} parameter, dengan ${displayLolos} parameter lolos.`
          : `Dinyatakan TIDAK LULUS UJI karena terdapat ${displayGagal} parameter yang tidak memenuhi persyaratan.`,
        { bold: true },
      );

      y += 3;
      pdf.setLineWidth(0.7);
      pdf.line(margin, y, pageWidth - margin, y);
      y += 5;
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8);
      pdf.text("RINGKASAN HASIL CERAPAN", margin, y);
      y += 5;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      const summary = `Jumlah cerapan: ${cerapan.length || 0} | Lolos: ${cerapan.filter((item) => item.status === "lolos").length} | Tidak lolos: ${cerapan.filter((item) => item.status === "tidak_lolos").length} | Total volume terpakai: ${formData?.step2?.totalisator?.totalTerpakai || "-"}`;
      pdf.text(pdf.splitTextToSize(summary, pageWidth - margin * 2), margin, y);
      y += 10;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.text("CATATAN:", margin, y);
      y += 4;
      pdf.text("1. Surat keterangan ini dibuat berdasarkan data pengujian yang tersimpan dalam sistem e-Cerapan.", margin + 3, y);
      y += 4;
      pdf.text("2. Dokumen ini berlaku sesuai ketentuan peraturan perundang-undangan metrologi legal.", margin + 3, y);

      y = Math.min(Math.max(y + 10, 220), pageHeight - 45);
      pdf.text(`${dataPengujianForm?.alamatTerpasang || "Tempat pengujian"}, ${formatTanggal}`, pageWidth - margin, y, { align: "right" });
      y += 5;
      pdf.text("KEPALA UNIT PELAKSANA TEKNIS METROLOGI LEGAL", pageWidth - margin, y, { align: "right" });
      y += 22;
      pdf.setFont("helvetica", "bold");
      pdf.text(dataPengujianForm?.namaPetugas1 || "Petugas Penguji", pageWidth - margin, y, { align: "right" });
      pdf.setFont("helvetica", "normal");
      y += 4;
      pdf.text("Petugas Penguji", pageWidth - margin, y, { align: "right" });

      pdf.setFontSize(7);
      pdf.text("Dokumen dicetak melalui aplikasi e-Cerapan", margin, pageHeight - 12);
      pdf.text(`Halaman 1 dari 1`, pageWidth - margin, pageHeight - 12, { align: "right" });

      const nomorOrder = String(formData?.step1?.dataPengujian?.nomorOrder || "hasil-pengujian");
      const safeFileName = nomorOrder.replace(/[^a-z0-9_-]/gi, "-");
      pdf.save(`hasil-pengujian-${safeFileName}.pdf`);
      setIsModalOpen(false);
      alert("Hasil pengujian berhasil disimpan!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const identitasAlat = [
    { label: "Merek", value: formData?.step1?.identitasUTTP?.merek || "Tokheim" },
    { label: "Tipe", value: formData?.step1?.identitasUTTP?.tipeModel || "Quantium 310" },
    { label: "No. Seri", value: formData?.step1?.identitasUTTP?.nomorSeri || "SN-2023-TKH-0456" },
    { label: "Jml. Nozzle", value: formData?.step1?.identitasUTTP?.jumlahNozzle || "2" },
    { label: "Tahun Buat", value: formData?.step1?.identitasUTTP?.tahunPembuatan || "2022" },
  ];

  const dataPengujian = [
    { label: "No. Pengujian", value: formData?.step1?.dataPengujian?.nomorOrder || "PU-BBM-2024-0847" },
    { label: "Tanggal", value: formData?.step1?.dataPengujian?.tanggalPengujian || "2026-09-13" },
    { label: "No. SPBU", value: formData?.step1?.dataPengujian?.noSPBU || "34.121.01" },
    { label: "Petugas 1", value: formData?.step1?.dataPengujian?.namaPetugas1 || "Ahmad Fauzi, S.T." },
    { label: "Petugas 2", value: formData?.step1?.dataPengujian?.namaPetugas2 || "Siti Rahayu, S.T." },
  ];

  const checklist = formData?.step1?.checklist || [];
  const cerapan = formData?.step2?.cerapan || [];

  const checklistTidak = checklist.filter((item) => item.penilaian === 'tidak').length;
  const cerapanTidakLolos = cerapan.filter((item) => item.status === 'tidak_lolos').length;
  const totalGagal = checklistTidak + cerapanTidakLolos;
  const isSuccess = totalGagal === 0;

  const hasData = checklist.length > 0 || cerapan.length > 0;
  const displayDiperiksa = hasData ? checklist.length + cerapan.length : 12;
  const displayGagal = hasData ? totalGagal : 0;
  const displayLolos = hasData ? Math.max(displayDiperiksa - displayGagal, 0) : 12;
  const displayIsSuccess = hasData ? isSuccess : true;

  const parameterData = [
    { parameter: "Kesalahan Rata-rata (Akurasi)", nilai: "0.3335", satuan: "%", toleransi: "± 0.5%", status: "LOLOS" as const },
    { parameter: "Kemampuan Ulang (Repeatability)", nilai: "0.0499", satuan: "%", toleransi: "≤ 0.3%", status: "LOLOS" as const },
    { parameter: "Meter Factor", nilai: "0.99668", satuan: "—", toleransi: "0.995 – 1.005", status: "LOLOS" as const },
    { parameter: "Penjatah Volume", nilai: formData?.step2?.dataBejana?.volNominal || "20", satuan: "L", toleransi: "—", status: "LOLOS" as const },
    { parameter: "Penjatah Harga", nilai: formData?.step2?.dataNozzle?.hargaSatuan ? `Rp ${formData.step2.dataNozzle.hargaSatuan}` : "Rp 200.000", satuan: "—", toleransi: "—", status: "LOLOS" as const },
    { parameter: "Anti-drain (Penghisap Balik)", nilai: "Ada", satuan: "—", toleransi: "—", status: "LOLOS" as const },
    { parameter: "Laju Alir Maksimum", nilai: formData?.step1?.kondisiOperasi?.ujiAlkMaksimum || "80", satuan: "L/menit", toleransi: "≤ 120 L/menit", status: "LOLOS" as const },
    { parameter: "Fasilitas Perangkat Penunjukan", nilai: "Berfungsi", satuan: "—", toleransi: "—", status: "LOLOS" as const },
    { parameter: "Nozzle Cut-off", nilai: "Berfungsi", satuan: "—", toleransi: "—", status: "LOLOS" as const },
    { parameter: "Interlock (Multi-nozzle)", nilai: "Berfungsi", satuan: "—", toleransi: "—", status: "LOLOS" as const },
    { parameter: "Kebocoran / Rembesan", nilai: "Tidak Ada", satuan: "—", toleransi: "—", status: "LOLOS" as const },
    { parameter: "Total Volume Terpakai", nilai: formData?.step2?.totalisator?.totalTerpakai || "60.00", satuan: "L", toleransi: "—", status: "—" as const },
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
            subtitle="Evaluasi lengkap semua parameter pengujian Pompa Ukur BBM"
          />

          <ResultCard isSuccess={displayIsSuccess} />
          <MetricSummary diperiksa={displayDiperiksa} lolos={displayLolos} gagal={displayGagal} />
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
        isLoading={isLoading}
      />

    </div>
  );
}
