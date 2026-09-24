"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/e-cerapan/layout/PageHeader";
import Stepper from "@/components/e-cerapan/layout/Stepper";
import SummaryCard from "@/components/e-cerapan/cards/SummaryCard";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ConfirmModal from "@/components/e-cerapan/feedback/ConfirmModal";
import FormWarning from "@/components/e-cerapan/feedback/FormWarning";
import {
  WizardStepProps,
  Step2Data,
  DataNozzle,
  DataBejana,
  Totalisator,
  CerapanItem,
} from "@/types/wizard";

function parseNum(val: string | undefined | null): number {
  if (!val) return NaN;
  const clean = val.toString().replace(",", ".").trim();
  const parsed = parseFloat(clean);
  return isNaN(parsed) ? NaN : parsed;
}

export default function PengujianPerhitunganPage({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}: Partial<WizardStepProps> = {}) {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
    window.scrollTo(0, 0);
    window.scrollTo(0, 0);
    if (!updateFormData) {
      router.replace("/e-cerapan");
    }
  }, [updateFormData, router]);

  const step1DataPengujian = formData?.step1?.dataPengujian;
  const step1IdentitasUTTP = formData?.step1?.identitasUTTP;

  const dataPengujian = {
    nomorOrder: step1DataPengujian?.nomorOrder || "",
    noSPBU: step1DataPengujian?.noSPBU || "",
    namaPemilik: step1DataPengujian?.namaPemilik || "",
    nomorPompaUkur: step1DataPengujian?.namaPompaUkur || "",
    nomorOrder: step1DataPengujian?.nomorOrder || "",
    noSPBU: step1DataPengujian?.noSPBU || "",
    namaPemilik: step1DataPengujian?.namaPemilik || "",
    nomorPompaUkur: step1DataPengujian?.namaPompaUkur || "",
    nomorOrder: step1DataPengujian?.nomorOrder || "",
    noSPBU: step1DataPengujian?.noSPBU || "",
    namaPemilik: step1DataPengujian?.namaPemilik || "",
    nomorPompaUkur: step1DataPengujian?.namaPompaUkur || "",
    merekTipe:
      step1IdentitasUTTP?.merek && step1IdentitasUTTP?.tipeModel
        ? `${step1IdentitasUTTP.merek} ${step1IdentitasUTTP.tipeModel}`
        : step1IdentitasUTTP?.merek || "",
    nomorSeri: step1IdentitasUTTP?.nomorSeri || "",
        : step1IdentitasUTTP?.merek || "",
    nomorSeri: step1IdentitasUTTP?.nomorSeri || "",
        : step1IdentitasUTTP?.merek || "",
    nomorSeri: step1IdentitasUTTP?.nomorSeri || "",
  };

  const [dataNozzle, setDataNozzle] = useState<DataNozzle>(() => ({
    identitas: formData?.step2?.dataNozzle?.identitas || "",
    jenisCairan: formData?.step2?.dataNozzle?.jenisCairan || "",
    hargaSatuan: formData?.step2?.dataNozzle?.hargaSatuan || "",
    identitas: formData?.step2?.dataNozzle?.identitas || "",
    jenisCairan: formData?.step2?.dataNozzle?.jenisCairan || "",
    hargaSatuan: formData?.step2?.dataNozzle?.hargaSatuan || "",
    identitas: formData?.step2?.dataNozzle?.identitas || "",
    jenisCairan: formData?.step2?.dataNozzle?.jenisCairan || "",
    hargaSatuan: formData?.step2?.dataNozzle?.hargaSatuan || "",
  }));

  const [dataBejana, setDataBejana] = useState<DataBejana>(() => ({
    merek: formData?.step2?.dataBejana?.merek || "",
    tipe: formData?.step2?.dataBejana?.tipe || "",
    nomorSeri: formData?.step2?.dataBejana?.nomorSeri || "",
    volNominal: formData?.step2?.dataBejana?.volNominal || "",
    volSebenarnya: formData?.step2?.dataBejana?.volSebenarnya || "",
    skalaUtama: formData?.step2?.dataBejana?.skalaUtama || "",
    tglVerifikasi: formData?.step2?.dataBejana?.tglVerifikasi || "",
    merek: formData?.step2?.dataBejana?.merek || "",
    tipe: formData?.step2?.dataBejana?.tipe || "",
    nomorSeri: formData?.step2?.dataBejana?.nomorSeri || "",
    volNominal: formData?.step2?.dataBejana?.volNominal || "",
    volSebenarnya: formData?.step2?.dataBejana?.volSebenarnya || "",
    skalaUtama: formData?.step2?.dataBejana?.skalaUtama || "",
    tglVerifikasi: formData?.step2?.dataBejana?.tglVerifikasi || "",
    merek: formData?.step2?.dataBejana?.merek || "",
    tipe: formData?.step2?.dataBejana?.tipe || "",
    nomorSeri: formData?.step2?.dataBejana?.nomorSeri || "",
    volNominal: formData?.step2?.dataBejana?.volNominal || "",
    volSebenarnya: formData?.step2?.dataBejana?.volSebenarnya || "",
    skalaUtama: formData?.step2?.dataBejana?.skalaUtama || "",
    tglVerifikasi: formData?.step2?.dataBejana?.tglVerifikasi || "",
  }));

  const [totalisator, setTotalisator] = useState<Totalisator>(() => ({
    sebelumUji: formData?.step2?.totalisator?.sebelumUji || "",
    sesudahUji: formData?.step2?.totalisator?.sesudahUji || "",
    totalTerpakai: formData?.step2?.totalisator?.totalTerpakai || "",
    sebelumUji: formData?.step2?.totalisator?.sebelumUji || "",
    sesudahUji: formData?.step2?.totalisator?.sesudahUji || "",
    totalTerpakai: formData?.step2?.totalisator?.totalTerpakai || "",
    sebelumUji: formData?.step2?.totalisator?.sebelumUji || "",
    sesudahUji: formData?.step2?.totalisator?.sesudahUji || "",
    totalTerpakai: formData?.step2?.totalisator?.totalTerpakai || "",
  }));

  const [cerapan, setCerapan] = useState<CerapanItem[]>(() => {
    if (formData?.step2?.cerapan && formData.step2.cerapan.length > 0) {
      return formData.step2.cerapan;
    }
    return [
      {
        volNominal: "",
        penunjukan: "",
        volSebenarnya: "",
        kesalahan: "",
        status: "",
        volNominal: "",
        penunjukan: "",
        volSebenarnya: "",
        kesalahan: "",
        status: "",
        volNominal: "",
        penunjukan: "",
        volSebenarnya: "",
        kesalahan: "",
        status: "",
      },
      {
        volNominal: "",
        penunjukan: "",
        volSebenarnya: "",
        kesalahan: "",
        status: "",
        volNominal: "",
        penunjukan: "",
        volSebenarnya: "",
        kesalahan: "",
        status: "",
        volNominal: "",
        penunjukan: "",
        volSebenarnya: "",
        kesalahan: "",
        status: "",
      },
      {
        volNominal: "",
        penunjukan: "",
        volSebenarnya: "",
        kesalahan: "",
        status: "",
        volNominal: "",
        penunjukan: "",
        volSebenarnya: "",
        kesalahan: "",
        status: "",
        volNominal: "",
        penunjukan: "",
        volSebenarnya: "",
        kesalahan: "",
        status: "",
      },
    ];
  });

  // ─── Real-Time Totalisator Handler ───
  const handleTotalisatorChange = (
    field: "sebelumUji" | "sesudahUji",
    value: string,
  ) => {
    setTotalisator((prev) => {
      const updated = { ...prev, [field]: value };
      const a = parseNum(updated.sebelumUji);
      const b = parseNum(updated.sesudahUji);
      if (!isNaN(a) && !isNaN(b)) {
        updated.totalTerpakai = `${(b - a).toFixed(3)} L`;
      }
      return updated;
    });
  };

  // ─── Real-Time Cerapan Handler ───
  const updateCerapan = (
    index: number,
    field: keyof CerapanItem,
    value: string,
  ) => {
    setCerapan((prev) => {
      const updated = [...prev];
      const newItem = { ...updated[index], [field]: value };

      const p = parseNum(field === "penunjukan" ? value : newItem.penunjukan);
      const v = parseNum(
        field === "volSebenarnya" ? value : newItem.volSebenarnya,
      );

      if (!isNaN(p) && !isNaN(v) && v > 0) {
        const rawError = ((p - v) / v) * 100;
        const roundedError = Number(rawError.toFixed(4));
        const signStr = roundedError >= 0 ? "+" : "";
        newItem.kesalahan = `${signStr}${roundedError.toFixed(4)}`;
        newItem.status =
          roundedError >= -0.5 && roundedError <= 0.5 ? "lolos" : "tidak_lolos";
      } else {
        newItem.kesalahan = "";
        newItem.status = "";
      }

      updated[index] = newItem;
      return updated;
    });
  };

  // ─── Real-Time Calculations for Cerapan Summary ───
  const cerapanCalculations = cerapan.map((item) => {
    const p = parseNum(item.penunjukan);
    const v = parseNum(item.volSebenarnya);

    if (isNaN(p) || isNaN(v) || v <= 0) {
      return {
        errorVal: null as number | null,
        errorStr: "",
        status: "",
        isFilled: false,
      };
    }

    const rawError = ((p - v) / v) * 100;
    const roundedError = Number(rawError.toFixed(4));
    const signStr = roundedError >= 0 ? "+" : "";
    const formattedStr = `${signStr}${roundedError.toFixed(4)}`;
    const status =
      roundedError >= -0.5 && roundedError <= 0.5 ? "lolos" : "tidak_lolos";

    return {
      errorVal: roundedError,
      errorStr: formattedStr,
      status,
      isFilled: true,
    };
  });

  const allCerapanFilled =
    cerapanCalculations.length === 3 &&
    cerapanCalculations.every((c) => c.isFilled && c.errorVal !== null);

  let averageErrorStr = "—";
  let averageErrorStatus: "LOLOS" | "TIDAK LOLOS" | undefined = undefined;

  let repeatabilityStr = "—";
  let repeatabilityStatus: "LOLOS" | "TIDAK LOLOS" | undefined = undefined;

  if (allCerapanFilled) {
    const errors = cerapanCalculations.map((c) => c.errorVal as number);
    const sum = errors.reduce((acc, curr) => acc + curr, 0);
    const rawAvg = sum / errors.length;
    const averageErrorVal = Number(rawAvg.toFixed(4));
    const avgSign = averageErrorVal >= 0 ? "+" : "";
    averageErrorStr = `${avgSign}${averageErrorVal.toFixed(4)}%`;
    averageErrorStatus =
      averageErrorVal >= -0.5 && averageErrorVal <= 0.5
        ? "LOLOS"
        : "TIDAK LOLOS";

    const maxErr = Math.max(...errors);
    const minErr = Math.min(...errors);
    const rawR = maxErr - minErr;
    const repeatabilityVal = Number(rawR.toFixed(4));
    repeatabilityStr = `${repeatabilityVal.toFixed(4)}%`;
    repeatabilityStatus = repeatabilityVal <= 0.3 ? "LOLOS" : "TIDAK LOLOS";
  }

  // Data Dummy untuk Testing

  // const fillDummyData = () => {
  //   setDataNozzle({
  //     identitas: "Nozzle 1",
  //     jenisCairan: "Pertalite (RON 90)",
  //     hargaSatuan: "10000",
  //   });
  //   setDataBejana({
  //     merek: "Pertamina Calibration",
  //     tipe: "BU-20L",
  //     nomorSeri: "BJ-2023-0012",
  //     volNominal: "20",
  //     volSebenarnya: "19.998",
  //     skalaUtama: "0.05",
  //     tglVerifikasi: "2023-12-22",
  //   });
  //   setTotalisator({
  //     sebelumUji: "15432,000",
  //     sesudahUji: "15492,000",
  //     totalTerpakai: "60.000 L",
  //   });
  //   setCerapan([
  //     {
  //       volNominal: "20",
  //       penunjukan: "20,050",
  //       volSebenarnya: "19,980",
  //       kesalahan: "+0.3504",
  //       status: "lolos",
  //     },
  //     {
  //       volNominal: "20",
  //       penunjukan: "20,080",
  //       volSebenarnya: "20,010",
  //       kesalahan: "+0.3498",
  //       status: "lolos",
  //     },
  //     {
  //       volNominal: "20",
  //       penunjukan: "20,040",
  //       volSebenarnya: "19,990",
  //       kesalahan: "+0.2501",
  //       status: "lolos",
  //     },
  //   ]);
  // };

  // ─── State Modal & Validasi ───
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ─── Cek Kelengkapan Data ───
  const isDataNozzleFilled = Boolean(
    dataNozzle.identitas.trim() &&
    dataNozzle.jenisCairan.trim() &&
    dataNozzle.hargaSatuan.trim()
  );

  const isDataBejanaFilled = Boolean(
    dataBejana.merek.trim() &&
    dataBejana.tipe.trim() &&
    dataBejana.nomorSeri.trim() &&
    dataBejana.volNominal.trim() &&
    dataBejana.volSebenarnya.trim() &&
    dataBejana.skalaUtama.trim() &&
    dataBejana.tglVerifikasi.trim()
  );

  const isTotalisatorFilled = Boolean(
    totalisator.sebelumUji.trim() && totalisator.sesudahUji.trim()
  );

  const isCerapanFilled = cerapan.every(
    (item) =>
      item.volNominal.trim() &&
      item.penunjukan.trim() &&
      item.volSebenarnya.trim()
  );

  const isFormValid =
    isDataNozzleFilled &&
    isDataBejanaFilled &&
    isTotalisatorFilled &&
    isCerapanFilled;

  // ─── Handlers ───
  const handleValidate = () => {
    setIsSubmitted(true);
    if (!isFormValid) return;
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    setIsConfirmOpen(false);
    handleSubmit();
  };

  const handleSubmit = () => {
    const step2Payload: Step2Data = {
      dataNozzle,
      dataBejana,
      totalisator,
      cerapan,
    };
    if (updateFormData) {
      updateFormData("step2", step2Payload);
    }
    if (nextStep) {
      nextStep();
    } else {
      router.push("/e-cerapan/hasilpengujian");
    }
  };

  return (
    <div className="min-h-screen bg-primay w-full">
      <div className="px-8 py-8 md:px-12 md:py-12 max-w-[1100px] mx-auto space-y-8 pb-16">
    <div className="min-h-screen bg-primay w-full">
      <div className="px-8 py-8 md:px-12 md:py-12 max-w-[1100px] mx-auto space-y-8 pb-16">
    <div className="min-h-screen bg-primay w-full">
      <div className="px-8 py-8 md:px-12 md:py-12 max-w-[1100px] mx-auto space-y-8 pb-16">
        <Stepper
          steps={["Pemeriksaan Awal", "Pengujian & Perhitungan", "Hasil"]}
          currentStep={1}
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-7">
          <PageHeader
            title="Pemeriksaan Pengujian & Perhitungan Awal"
            description="Pompa Ukur BBM — Input data pengujian dan cerapan"
            className="mb-0"
          />
          {/* Tombol Data Dummy untuk Testing */}
          {/* <Button
            variant="outline"
            size="sm"
            onClick={fillDummyData}
            className="self-start sm:self-auto border-dashed border-amber-400 bg-amber-50 text-amber-800 hover:bg-amber-100 text-xs font-semibold gap-1.5"
            title="Isi otomatis data testing untuk memudahkan pengujian"
          >
            ⚡ Isi Cepat (Testing)
          </Button> */}
        </div>

        {/* ═══ SECTION 1: Data Pengujian (Readonly from Step 1) ═══ */}
        <FormCard
          title="Data Pengujian"
          className="mb-7"
          headerClassName="bg-gray-200 px-5 py-3"
          contentClassName="p-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5">
            <FormField label="Nomor Order">
              <Input
                placeholder="cth. ORD-2024-0847"
              <Input
                placeholder="cth. ORD-2024-0847"
              <Input
                placeholder="cth. ORD-2024-0847"
                value={dataPengujian.nomorOrder}
                disabled
              />
            </FormField>
            <FormField label="No. SPBU">
              <Input
                placeholder="cth. 34.121.01"
              <Input
                placeholder="cth. 34.121.01"
              <Input
                placeholder="cth. 34.121.01"
                value={dataPengujian.noSPBU}
                disabled
              />
            </FormField>
            <FormField label="Nama Pemilik/Penanggung Jawab">
              <Input
                placeholder="cth. PT. Pertamina Retail"
              <Input
                placeholder="cth. PT. Pertamina Retail"
              <Input
                placeholder="cth. PT. Pertamina Retail"
                value={dataPengujian.namaPemilik}
                disabled
              />
            </FormField>
            <FormField label="Nomor Pompa Ukur">
              <Input
                placeholder="cth. PU-001"
              <Input
                placeholder="cth. PU-001"
              <Input
                placeholder="cth. PU-001"
                value={dataPengujian.nomorPompaUkur}
                disabled
              />
            </FormField>
            <FormField label="Merek/Tipe">
              <Input
                placeholder="cth. Tokheim Quantium 310"
              <Input
                placeholder="cth. Tokheim Quantium 310"
              <Input
                placeholder="cth. Tokheim Quantium 310"
                value={dataPengujian.merekTipe}
                disabled
              />
            </FormField>
            <FormField label="Nomor Seri">
              <Input
                placeholder="cth. SN-2023-TKH-0456"
              <Input
                placeholder="cth. SN-2023-TKH-0456"
              <Input
                placeholder="cth. SN-2023-TKH-0456"
                value={dataPengujian.nomorSeri}
                disabled
              />
            </FormField>
          </div>
        </FormCard>
        </FormCard>

        {/* ═══ SECTION 2: Data Pengujian Nozzle ═══ */}
        <FormCard
          title="Data Pengujian Nozzle"
          className="mb-7"
          headerClassName="bg-gray-200 px-5 py-3"
          contentClassName="p-5"
        >
        {/* ═══ SECTION 2: Data Pengujian Nozzle ═══ */}
        <FormCard
          title="Data Pengujian Nozzle"
          className="mb-7"
          headerClassName="bg-gray-200 px-5 py-3"
          contentClassName="p-5"
        >
        </FormCard>

        {/* ═══ SECTION 2: Data Pengujian Nozzle ═══ */}
        <FormCard
          title="Data Pengujian Nozzle"
          className="mb-7"
          headerClassName="bg-gray-200 px-5 py-3"
          contentClassName="p-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5">
            <FormField label="Identitas Nozzle" required>
              <Input
                placeholder="cth. Nozzle 1"
              <Input
                placeholder="cth. Nozzle 1"
              <Input
                placeholder="cth. Nozzle 1"
                value={dataNozzle.identitas}
                onChange={(e) =>
                  setDataNozzle({ ...dataNozzle, identitas: e.target.value })
                }
              />
            </FormField>
            <FormField label="Jenis Cairan" required>
              <Input
                placeholder="cth. Pertalite (RON 90)"
              <Input
                placeholder="cth. Pertalite (RON 90)"
              <Input
                placeholder="cth. Pertalite (RON 90)"
                value={dataNozzle.jenisCairan}
                onChange={(e) =>
                  setDataNozzle({ ...dataNozzle, jenisCairan: e.target.value })
                }
              />
            </FormField>
            <FormField label="Harga Satuan (Rp/L)" required>
              <Input
                placeholder="cth. 10000"
              <Input
                placeholder="cth. 10000"
              <Input
                placeholder="cth. 10000"
                value={dataNozzle.hargaSatuan}
                onChange={(e) =>
                  setDataNozzle({ ...dataNozzle, hargaSatuan: e.target.value })
                }
              />
            </FormField>
          </div>
        </FormCard>
        </FormCard>

        {/* ═══ SECTION 3: Data Bejana Ukur ═══ */}
        <FormCard
          title="Data Bejana Ukur"
          className="mb-7"
          headerClassName="bg-gray-200 px-5 py-3"
          contentClassName="p-5"
        >
        {/* ═══ SECTION 3: Data Bejana Ukur ═══ */}
        <FormCard
          title="Data Bejana Ukur"
          className="mb-7"
          headerClassName="bg-gray-200 px-5 py-3"
          contentClassName="p-5"
        >
        </FormCard>

        {/* ═══ SECTION 3: Data Bejana Ukur ═══ */}
        <FormCard
          title="Data Bejana Ukur"
          className="mb-7"
          headerClassName="bg-gray-200 px-5 py-3"
          contentClassName="p-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5">
            <FormField label="Merek" required>
              <Input
                placeholder="cth. Pertamina Calibration"
              <Input
                placeholder="cth. Pertamina Calibration"
              <Input
                placeholder="cth. Pertamina Calibration"
                value={dataBejana.merek}
                onChange={(e) =>
                  setDataBejana({ ...dataBejana, merek: e.target.value })
                }
              />
            </FormField>
            <FormField label="Tipe/Model" required>
              <Input
                placeholder="cth. BU-20L"
              <Input
                placeholder="cth. BU-20L"
              <Input
                placeholder="cth. BU-20L"
                value={dataBejana.tipe}
                onChange={(e) =>
                  setDataBejana({ ...dataBejana, tipe: e.target.value })
                }
              />
            </FormField>
            <FormField label="Nomor Seri" required>
              <Input
                placeholder="cth. BJ-2023-0012"
              <Input
                placeholder="cth. BJ-2023-0012"
              <Input
                placeholder="cth. BJ-2023-0012"
                value={dataBejana.nomorSeri}
                onChange={(e) =>
                  setDataBejana({ ...dataBejana, nomorSeri: e.target.value })
                }
              />
            </FormField>
            <FormField label="Volume Nominal (L)" required>
              <Input
                placeholder="cth. 20"
              <Input
                placeholder="cth. 20"
              <Input
                placeholder="cth. 20"
                value={dataBejana.volNominal}
                onChange={(e) =>
                  setDataBejana({ ...dataBejana, volNominal: e.target.value })
                }
              />
            </FormField>
            <FormField label="Volume Sebenarnya (L)" required>
              <Input
                placeholder="cth. 19.998"
              <Input
                placeholder="cth. 19.998"
              <Input
                placeholder="cth. 19.998"
                value={dataBejana.volSebenarnya}
                onChange={(e) =>
                  setDataBejana({
                    ...dataBejana,
                    volSebenarnya: e.target.value,
                  })
                }
              />
            </FormField>
            <FormField label="Skala Utama Sebenarnya (L)" required>
              <Input
                placeholder="cth. 0.05"
              <Input
                placeholder="cth. 0.05"
              <Input
                placeholder="cth. 0.05"
                value={dataBejana.skalaUtama}
                onChange={(e) =>
                  setDataBejana({ ...dataBejana, skalaUtama: e.target.value })
                }
              />
            </FormField>
            <FormField label="Tanggal Verifikasi Terakhir" required>
              <Input
                type="date"
                value={dataBejana.tglVerifikasi}
                onChange={(e) =>
                  setDataBejana({
                    ...dataBejana,
                    tglVerifikasi: e.target.value,
                  })
                }
              />
              <Input
                type="date"
                value={dataBejana.tglVerifikasi}
                onChange={(e) =>
                  setDataBejana({
                    ...dataBejana,
                    tglVerifikasi: e.target.value,
                  })
                }
              />
              <Input
                type="date"
                value={dataBejana.tglVerifikasi}
                onChange={(e) =>
                  setDataBejana({
                    ...dataBejana,
                    tglVerifikasi: e.target.value,
                  })
                }
              />
            </FormField>
          </div>
        </FormCard>
        </FormCard>
        </FormCard>

        {/* ═══ SECTION 4: Totalisator ═══ */}
        <FormCard
        {/* ═══ SECTION 4: Totalisator ═══ */}
        <FormCard
        {/* ═══ SECTION 4: Totalisator ═══ */}
        <FormCard
          title="Totalisator"
          className="mb-7"
          headerClassName="bg-gray-200 px-5 py-3"
          contentClassName="p-5"
          className="mb-7"
          headerClassName="bg-gray-200 px-5 py-3"
          contentClassName="p-5"
          className="mb-7"
          headerClassName="bg-gray-200 px-5 py-3"
          contentClassName="p-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5">
            <FormField label="Sebelum Uji — a (L)" required>
              <Input
                placeholder="cth. 15432,000"
              <Input
                placeholder="cth. 15432,000"
              <Input
                placeholder="cth. 15432,000"
                value={totalisator.sebelumUji}
                onChange={(e) =>
                  handleTotalisatorChange("sebelumUji", e.target.value)
                }
              />
            </FormField>
            <FormField label="Sesudah Uji — b (L)" required>
              <Input
                placeholder="cth. 15492,000"
              <Input
                placeholder="cth. 15492,000"
              <Input
                placeholder="cth. 15492,000"
                value={totalisator.sesudahUji}
                onChange={(e) =>
                  handleTotalisatorChange("sesudahUji", e.target.value)
                }
              />
            </FormField>
            <FormField label="Total Terpakai — (b-a)">
              <Input
                placeholder="Otomatis terhitung"
                className="font-semibold text-black"
              <Input
                placeholder="Otomatis terhitung"
                className="font-semibold text-black"
              <Input
                placeholder="Otomatis terhitung"
                className="font-semibold text-black"
                value={totalisator.totalTerpakai}
                disabled
              />
            </FormField>
          </div>
        </FormCard>
        </FormCard>
        </FormCard>

        {/* ═══ SECTION 5: Input Cerapan ═══ */}
        <FormCard
          title="Input Cerapan"
          className="mb-7"
          headerClassName="bg-gray-200 px-5 py-3"
          contentClassName="p-5 space-y-6"
        >
        {/* ═══ SECTION 5: Input Cerapan ═══ */}
        <FormCard
          title="Input Cerapan"
          className="mb-7"
          headerClassName="bg-gray-200 px-5 py-3"
          contentClassName="p-5 space-y-6"
        >
        {/* ═══ SECTION 5: Input Cerapan ═══ */}
        <FormCard
          title="Input Cerapan"
          className="mb-7"
          headerClassName="bg-gray-200 px-5 py-3"
          contentClassName="p-5 space-y-6"
        >
          {cerapan.map((item, index) => {
            const calc = cerapanCalculations[index];

            return (
              <Card
              <Card
              <Card
                key={index}
                className="p-5 border border-gray-200 shadow-sm bg-white"
                className="p-5 border border-gray-200 shadow-sm bg-white"
                className="p-5 border border-gray-200 shadow-sm bg-white"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-sm text-black">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-sm text-black">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-sm text-black">
                    Cerapan {index + 1}
                  </h4>
                  {calc.isFilled && (
                    <Badge
                      variant={
                        calc.status === "tidak_lolos" ? "danger" : "success"
                      }
                    >
                      E = {calc.errorStr} %
                    </Badge>
                  )}
                  {calc.isFilled && (
                    <Badge
                      variant={
                        calc.status === "tidak_lolos" ? "danger" : "success"
                      }
                    >
                      E = {calc.errorStr} %
                    </Badge>
                  )}
                  {calc.isFilled && (
                    <Badge
                      variant={
                        calc.status === "tidak_lolos" ? "danger" : "success"
                      }
                    >
                      E = {calc.errorStr} %
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
                  <FormField label="Vol. Nominal (L)" required>
                    <Input
                      placeholder="cth. 20"
                    <Input
                      placeholder="cth. 20"
                    <Input
                      placeholder="cth. 20"
                      value={item.volNominal}
                      onChange={(e) =>
                        updateCerapan(index, "volNominal", e.target.value)
                      }
                    />
                  </FormField>
                  <FormField label="Penunjukan Cerapan (L)" required>
                    <Input
                      placeholder="cth. 20,050"
                    <Input
                      placeholder="cth. 20,050"
                    <Input
                      placeholder="cth. 20,050"
                      value={item.penunjukan}
                      onChange={(e) =>
                        updateCerapan(index, "penunjukan", e.target.value)
                      }
                    />
                  </FormField>
                  <FormField label="Vol. Sebenarnya (L)" required>
                    <Input
                      placeholder="cth. 19,980"
                    <Input
                      placeholder="cth. 19,980"
                    <Input
                      placeholder="cth. 19,980"
                      value={item.volSebenarnya}
                      onChange={(e) =>
                        updateCerapan(index, "volSebenarnya", e.target.value)
                      }
                    />
                  </FormField>
                  <FormField label="Kesalahan (%)" required>
                    <Input
                    <Input
                    <Input
                      value={
                        calc.isFilled ? `${calc.errorStr}%` : item.kesalahan
                      }
                      placeholder="Otomatis terhitung"
                      readOnly
                      className={
                        calc.isFilled
                          ? calc.status === "tidak_lolos"
                            ? "border-danger text-danger bg-red-50/40 font-bold focus:border-danger focus:ring-danger"
                            : "border-success text-success bg-green-50/40 font-bold focus:border-success focus:ring-success"
                          : "bg-gray-50 text-neutral cursor-not-allowed"
                      placeholder="Otomatis terhitung"
                      readOnly
                      className={
                        calc.isFilled
                          ? calc.status === "tidak_lolos"
                            ? "border-danger text-danger bg-red-50/40 font-bold focus:border-danger focus:ring-danger"
                            : "border-success text-success bg-green-50/40 font-bold focus:border-success focus:ring-success"
                          : "bg-gray-50 text-neutral cursor-not-allowed"
                      placeholder="Otomatis terhitung"
                      readOnly
                      className={
                        calc.isFilled
                          ? calc.status === "tidak_lolos"
                            ? "border-danger text-danger bg-red-50/40 font-bold focus:border-danger focus:ring-danger"
                            : "border-success text-success bg-green-50/40 font-bold focus:border-success focus:ring-success"
                          : "bg-gray-50 text-neutral cursor-not-allowed"
                      }
                    />
                  </FormField>
                </div>
              </Card>
              </Card>
              </Card>
            );
          })}
        </FormCard>
        </FormCard>
        </FormCard>

        {/* ═══ SECTION 6: Ringkasan Perhitungan ═══ */}
        <FormCard
          title="Ringkasan Perhitungan"
          className="mb-7"
          headerClassName="bg-gray-200 px-5 py-3"
          contentClassName="p-5"
        >
        <FormCard
          title="Ringkasan Perhitungan"
          className="mb-7"
          headerClassName="bg-gray-200 px-5 py-3"
          contentClassName="p-5"
        >
        <FormCard
          title="Ringkasan Perhitungan"
          className="mb-7"
          headerClassName="bg-gray-200 px-5 py-3"
          contentClassName="p-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {cerapanCalculations.map((calc, idx) => (
              <SummaryCard
                key={idx}
                label={`Kesalahan Cerapan ${idx + 1}`}
                value={calc.isFilled ? `${calc.errorStr}%` : "—"}
                status={
                  calc.isFilled
                    ? calc.status === "lolos"
                      ? "LOLOS"
                      : "TIDAK LOLOS"
                    : undefined
                }
                variant={
                  calc.isFilled
                    ? calc.status === "lolos"
                      ? "success"
                      : "error"
                    : "neutral"
                }
              />
            ))}
            <SummaryCard
              label="Kesalahan Rata-rata"
              value={averageErrorStr}
              status={averageErrorStatus}
              variant={
                averageErrorStatus === "LOLOS"
                  ? "success"
                  : averageErrorStatus === "TIDAK LOLOS"
                    ? "error"
                    : "neutral"
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <SummaryCard
              label="Kemampuan Ulang"
              value={repeatabilityStr}
              status={repeatabilityStatus}
              variant={
                repeatabilityStatus === "LOLOS"
                  ? "success"
                  : repeatabilityStatus === "TIDAK LOLOS"
                    ? "error"
                    : "neutral"
              }
            />
            <SummaryCard
              label="MPE Akurasi"
              value="± 0.5000%"
              variant="neutral"
            />
            <SummaryCard
              label="MPE Kemampuan Ulang"
              value="≤ 0.3000%"
              variant="neutral"
            />
          </div>
        </FormCard>

        {/* ═══ Feedback Warning jika belum lengkap saat submit ═══ */}
        {isSubmitted && !isFormValid && (
          <FormWarning message="Lengkapi seluruh field wajib (*) pada Data Nozzle, Bejana, Totalisator, dan Cerapan sebelum melanjutkan." />
        )}

        {/* ═══ Action Buttons ═══ */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-1/2"
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-1/2"
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
            Kembali
          </Button>

          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-1/2"
            onClick={handleValidate}
          >
            Lihat Hasil Evaluasi
          </Button>
          </Button>
          </Button>
        </div>

        <ConfirmModal
          open={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleConfirm}
          title="Konfirmasi Pengujian & Perhitungan"
          description="Pastikan seluruh data pengujian nozzle, bejana, dan cerapan telah diinput dengan benar."
          confirmText="Konfirmasi"
          cancelText="Batal"
        >
          <div className="space-y-3 border-y border-gray-200 py-4">
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-neutral">Identitas Nozzle</span>
              <span className="text-right font-medium text-black">
                {dataNozzle.identitas || "-"} ({dataNozzle.jenisCairan || "-"})
              </span>
            </div>

            <div className="flex justify-between gap-4 text-sm">
              <span className="text-neutral">Bejana Ukur</span>
              <span className="text-right font-medium text-black">
                {dataBejana.merek || "-"} {dataBejana.tipe || "-"}
              </span>
            </div>

            <div className="flex justify-between gap-4 text-sm">
              <span className="text-neutral">Totalisator Terpakai</span>
              <span className="text-right font-medium text-black">
                {totalisator.totalTerpakai || "-"}
              </span>
            </div>

            <div className="flex justify-between gap-4 text-sm">
              <span className="text-neutral">Kesalahan Rata-rata</span>
              <span className="text-right font-medium text-black">
                {averageErrorStr} ({averageErrorStatus || "—"})
              </span>
            </div>
          </div>
        </ConfirmModal>

        <ConfirmModal
          open={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleConfirm}
          title="Konfirmasi Pengujian & Perhitungan"
          description="Pastikan seluruh data pengujian nozzle, bejana, dan cerapan telah diinput dengan benar."
          confirmText="Konfirmasi"
          cancelText="Batal"
        >
          <div className="space-y-3 border-y border-gray-200 py-4">
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-neutral">Identitas Nozzle</span>
              <span className="text-right font-medium text-black">
                {dataNozzle.identitas || "-"} ({dataNozzle.jenisCairan || "-"})
              </span>
            </div>

            <div className="flex justify-between gap-4 text-sm">
              <span className="text-neutral">Bejana Ukur</span>
              <span className="text-right font-medium text-black">
                {dataBejana.merek || "-"} {dataBejana.tipe || "-"}
              </span>
            </div>

            <div className="flex justify-between gap-4 text-sm">
              <span className="text-neutral">Totalisator Terpakai</span>
              <span className="text-right font-medium text-black">
                {totalisator.totalTerpakai || "-"}
              </span>
            </div>

            <div className="flex justify-between gap-4 text-sm">
              <span className="text-neutral">Kesalahan Rata-rata</span>
              <span className="text-right font-medium text-black">
                {averageErrorStr} ({averageErrorStatus || "—"})
              </span>
            </div>
          </div>
        </ConfirmModal>
      </div>
    </div>
  );
}
