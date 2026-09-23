"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/e-cerapan/layout/PageHeader";
import PageHeader from "@/components/e-cerapan/layout/PageHeader";
import Stepper from "@/components/e-cerapan/layout/Stepper";
import FormCard from "@/components/e-cerapan/form/FormCard";
import FormField from "@/components/e-cerapan/form/FormField";
import FormWarning from "@/components/e-cerapan/feedback/FormWarning";
import ConfirmModal from "@/components/e-cerapan/feedback/ConfirmModal";
import Input from "@/components/ui/Input";
import RadioGroup from "@/components/ui/RadioGroup";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import FormCard from "@/components/e-cerapan/form/FormCard";
import FormField from "@/components/e-cerapan/form/FormField";
import FormWarning from "@/components/e-cerapan/feedback/FormWarning";
import ConfirmModal from "@/components/e-cerapan/feedback/ConfirmModal";
import Input from "@/components/ui/Input";
import RadioGroup from "@/components/ui/RadioGroup";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { WizardStepProps, Step1Data } from "@/types/wizard";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from "@/components/ui/Table";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from "@/components/ui/Table";

interface DataPengujian {
  nomorOrder: string;
  namaPemilik: string;
  noSPBU: string;
  contactPerson: string;
  alamatTerpasang: string;
  namaPompaUkur: string;
  tanggalPengujian: string;
  namaPetugas1: string;
  namaPetugas2: string;
}

interface IdentitasUTTP {
  merek: string;
  tipeModel: string;
  nomorSeri: string;
  jumlahNozzle: string;
  tahunPembuatan: string;
}

interface KondisiOperasi {
  ujiAlkMaksimum: string;
  ujiAlkMinimum: string;
  mfr: string;
  nomorPencacahTipe: string;
}

interface ChecklistItemState {
interface ChecklistItemState {
  penilaian: "ya" | "tidak" | null;
  keterangan: string;
}

// ─── Checklist Questions ─────────────────────────────────────

const CHECKLIST_QUESTIONS = [
  `Apakah PU BBM dilengkapi dengan Persetujuan Tipe (untuk Tera)?
- Apakah informasi pada pelat identitas sesuai dengan Persetujuan Tipe?
- Apakah spesifikasi teknis PU BBM sesuai dengan Persetujuan Tipe?`,
  `Apakah PU BBM sudah digunakan dengan benar?
- Apakah tanda tera sebelumnya masih utuh dan tidak ada yang rusak?
- Apakah tidak terdapat alat tambahan yang mengubah spesifikasi dan/atau memengaruhi hasil pengukuran PU BBM?`,
  `Apakah semua deskripsi yang wajib jelas terpasang pada pelat identitas dan terpasang tetap pada PU BBM?
- Apakah identitas pada pelat data lengkap sesuai syarat teknis?
- Apakah identitas pada pelat data mudah terlihat, jelas dan mudah dibaca?`,
  `Apakah PU BBM dilengkapi dengan Persetujuan Tipe (untuk Tera)?
- Apakah informasi pada pelat identitas sesuai dengan Persetujuan Tipe?
- Apakah spesifikasi teknis PU BBM sesuai dengan Persetujuan Tipe?`,
  `Apakah PU BBM sudah digunakan dengan benar?
- Apakah tanda tera sebelumnya masih utuh dan tidak ada yang rusak?
- Apakah tidak terdapat alat tambahan yang mengubah spesifikasi dan/atau memengaruhi hasil pengukuran PU BBM?`,
  `Apakah semua deskripsi yang wajib jelas terpasang pada pelat identitas dan terpasang tetap pada PU BBM?
- Apakah identitas pada pelat data lengkap sesuai syarat teknis?
- Apakah identitas pada pelat data mudah terlihat, jelas dan mudah dibaca?`,
  "Apakah PU BBM dalam kondisi lengkap dan bersih?",
  "Apakah PU BBM terpasang dengan kokoh pada pondasinya atau pada sisi Tangki Ukur Mobil BBM?",
  "Apakah tidak terdapat kerusakan pada penutup Perangkat Penunjuk?",
  "Apakah Gelas Penglihat bersih serta penuh dengan produk?",
  "Apakah penunjukan volume, harga satuan, dan total harga sesuai dengan Slang yang dipilih?",
  "Apakah penunjukan volume, harga satuan, dan total harga sesuai dengan Slang yang dipilih?",
  `Apakah Slang dalam kondisi baik, (pada slang apakah ditemukan kondisi seperti lecet, retak atau pembungkus Slangnya telah usang)?`,
  "Apakah masing-masing nozzle menghentikan aliran cairan ketika dikembalikan ke tempat penyimpanannya?",
  "Apakah pada PU BBM tidak ditemukan adanya kebocoran atau rembesan cairan?",
];

export default function PemeriksaanAwalPage({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}: Partial<WizardStepProps> = {}) {
  const router = useRouter();

  useEffect(() => {
    if (!updateFormData) {
      router.replace("/e-cerapan");
    }
  }, [updateFormData, router]);

  const [formDataState, setFormDataState] = useState<DataPengujian>(() => ({
  const [formDataState, setFormDataState] = useState<DataPengujian>(() => ({
    nomorOrder: formData?.step1?.dataPengujian?.nomorOrder || "",
    namaPemilik: formData?.step1?.dataPengujian?.namaPemilik || "",
    noSPBU: formData?.step1?.dataPengujian?.noSPBU || "",
    contactPerson: formData?.step1?.dataPengujian?.contactPerson || "",
    alamatTerpasang: formData?.step1?.dataPengujian?.alamatTerpasang || "",
    namaPompaUkur: formData?.step1?.dataPengujian?.namaPompaUkur || "",
    tanggalPengujian: formData?.step1?.dataPengujian?.tanggalPengujian || "",
    namaPetugas1: formData?.step1?.dataPengujian?.namaPetugas1 || "",
    namaPetugas2: formData?.step1?.dataPengujian?.namaPetugas2 || "",
  }));

  const [identitasUTTP, setIdentitasUTTP] = useState<IdentitasUTTP>(() => ({
    merek: formData?.step1?.identitasUTTP?.merek || "",
    tipeModel: formData?.step1?.identitasUTTP?.tipeModel || "",
    nomorSeri: formData?.step1?.identitasUTTP?.nomorSeri || "",
    jumlahNozzle: formData?.step1?.identitasUTTP?.jumlahNozzle || "",
    tahunPembuatan: formData?.step1?.identitasUTTP?.tahunPembuatan || "",
  }));

  const [kondisiOperasi, setKondisiOperasi] = useState<KondisiOperasi>(() => ({
    ujiAlkMaksimum: formData?.step1?.kondisiOperasi?.ujiAlkMaksimum || "",
    ujiAlkMinimum: formData?.step1?.kondisiOperasi?.ujiAlkMinimum || "",
    mfr: formData?.step1?.kondisiOperasi?.mfr || "",
    nomorPencacahTipe: formData?.step1?.kondisiOperasi?.nomorPencacahTipe || "",
  }));

  const [checklist, setChecklist] = useState<ChecklistItemState[]>(() => {
  const [checklist, setChecklist] = useState<ChecklistItemState[]>(() => {
    if (
      formData?.step1?.checklist &&
      formData.step1.checklist.length === CHECKLIST_QUESTIONS.length
    ) {
      return formData.step1.checklist.map((item) => ({
        penilaian: item.penilaian,
        keterangan: item.keterangan || "",
      }));
    }
    return CHECKLIST_QUESTIONS.map(() => ({ penilaian: null, keterangan: "" }));
  });

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ─── Handlers ────────────────────────────────────────────────

  const updateDataPengujian = (field: keyof DataPengujian, value: string) => {
    setFormDataState((prev) => ({ ...prev, [field]: value }));
    setFormDataState((prev) => ({ ...prev, [field]: value }));
  };

  const updateIdentitasUTTP = (field: keyof IdentitasUTTP, value: string) => {
    setIdentitasUTTP((prev) => ({ ...prev, [field]: value }));
  };

  const updateKondisiOperasi = (field: keyof KondisiOperasi, value: string) => {
    setKondisiOperasi((prev) => ({ ...prev, [field]: value }));
  };

  const updateChecklist = (
    index: number,
    field: keyof ChecklistItemState,
    field: keyof ChecklistItemState,
    value: string | null,
  ) => {
    setChecklist((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // ─── Check if all mandatory fields and checklist items are filled ───

  const isDataPengujianFilled =
    Boolean(formDataState.nomorOrder.trim()) &&
    Boolean(formDataState.namaPemilik.trim()) &&
    Boolean(formDataState.nomorSIML.trim()) &&
    Boolean(formDataState.contactPerson.trim()) &&
    Boolean(formDataState.alamatTerpasang.trim()) &&
    Boolean(formDataState.namaPompaUkur.trim()) &&
    Boolean(formDataState.tanggalPengujian.trim()) &&
    Boolean(formDataState.namaPetugas1.trim()) &&
    Boolean(formDataState.namaPetugas2.trim());

  const isIdentitasUTTPFilled =
    Boolean(identitasUTTP.merek.trim()) &&
    Boolean(identitasUTTP.tipeModel.trim()) &&
    Boolean(identitasUTTP.nomorSeri.trim()) &&
    Boolean(identitasUTTP.jumlahNozzle.trim()) &&
    Boolean(identitasUTTP.tahunPembuatan.trim());

  const isKondisiOperasiFilled =
    Boolean(kondisiOperasi.ujiAlkMaksimum.trim()) &&
    Boolean(kondisiOperasi.ujiAlkMinimum.trim()) &&
    Boolean(kondisiOperasi.mfr.trim()) &&
    Boolean(kondisiOperasi.nomorPencacahTipe.trim());

  const allChecklistFilled = checklist.every((item) => item.penilaian !== null);

  const isFormValid =
    isDataPengujianFilled &&
    isIdentitasUTTPFilled &&
    isKondisiOperasiFilled &&
    allChecklistFilled;

  // ─── Validation & Submit Handlers ────────────────────────────

  const handleValidate = () => {
    setIsSubmitted(true);
    if (!isFormValid) {
      return;
    }
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    setIsConfirmOpen(false);
    handleSubmit();
  };
  // ─── Validation & Submit Handlers ────────────────────────────

  const handleValidate = () => {
    setIsSubmitted(true);
    if (!isFormValid) {
      return;
    }
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    setIsConfirmOpen(false);
    handleSubmit();
  };

  const handleSubmit = () => {
    if (!isFormValid) return;
    const payload: Step1Data = {
      dataPengujian: {
        ...formDataState,
        noSPBU: formData?.step1?.dataPengujian?.noSPBU || "",
        ...formDataState,
        noSPBU: formData?.step1?.dataPengujian?.noSPBU || "",
      },
      identitasUTTP,
      kondisiOperasi,
      checklist: checklist.map((item, i) => ({
        no: i + 1,
        uraian: CHECKLIST_QUESTIONS[i],
        penilaian: item.penilaian,
        keterangan: item.keterangan,
        penilaian: item.penilaian,
        keterangan: item.keterangan,
      })),
    };

    if (updateFormData) {
      updateFormData("step1", payload);
    }
    if (nextStep) {
      nextStep();
    }
  };

  const fillDummyData = () => {
    setFormDataState({
      nomorOrder: "ORD-2024-0847",
      namaPemilik: "PT. Pertamina Retail",
      nomorSIML: "SIML-98421",
      contactPerson: "Budi Santoso, 081234567890",
      alamatTerpasang: "Jl. Pemuda No. 45, Jakarta",
      namaPompaUkur: "PU-001",
      tanggalPengujian: "2024-03-20",
      namaPetugas1: "Ahmad Dahlan",
      namaPetugas2: "Rudi Hartono",
    });
    setIdentitasUTTP({
      merek: "Tokheim",
      tipeModel: "Quantium 310",
      nomorSeri: "SN-2023-TKH-0456",
      jumlahNozzle: "2",
      tahunPembuatan: "2022",
    });
    setKondisiOperasi({
      ujiAlkMaksimum: "50",
      ujiAlkMinimum: "5",
      mfr: "2",
      nomorPencacahTipe: "P1-X-Style-V2022",
    });
    setChecklist(
      CHECKLIST_QUESTIONS.map(() => ({
        penilaian: "ya",
        keterangan: "Kondisi baik",
      }))
    );
  };

  return (
    <div className="min-h-screen bg-primay w-full">
      <div className="px-8 py-8 md:px-12 md:py-12 max-w-[1100px] mx-auto space-y-8 pb-16">
    <div className="min-h-screen bg-primay w-full">
      <div className="px-8 py-8 md:px-12 md:py-12 max-w-[1100px] mx-auto space-y-8 pb-16">
        {/* Stepper */}
        <Stepper
          steps={["Pemeriksaan Awal", "Pengujian & Pemeriksaan", "Hasil"]}
          currentStep={0}
        />

        {/* Page Header & Test Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-7">
          <PageHeader
            title="Pemeriksaan Awal"
            description="Pompa Ukur BBM — Isi seluruh data dan checklist pemeriksaan"
            className="mb-0"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={fillDummyData}
            className="self-start sm:self-auto border-dashed border-amber-400 bg-amber-50 text-amber-800 hover:bg-amber-100 text-xs font-semibold gap-1.5"
            title="Isi otomatis seluruh form dan checklist untuk kebutuhan testing"
          >
            ⚡ Isi Cepat (Testing)
          </Button>
        </div>

        {/* ═══ SECTION 1: Data Pengujian ═══ */}
        <FormCard
          title="Data Pengujian"
          className="mb-7"
          headerClassName="bg-gray-200 px-5 py-3"
          contentClassName="p-5"
        >
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
            {/* NOMOR ORDER */}
            <FormField
              label="Nomor Order"
              required
              error={
                isSubmitted && !formDataState.nomorOrder.trim()
                  ? "Nomor order wajib diisi."
                  : undefined
              }
            >
              <Input
        <FormCard
          title="Data Pengujian"
          className="mb-7"
          headerClassName="bg-gray-200 px-5 py-3"
          contentClassName="p-5"
        >
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
            {/* NOMOR ORDER */}
            <FormField
              label="Nomor Order"
              required
              error={
                isSubmitted && !formDataState.nomorOrder.trim()
                  ? "Nomor order wajib diisi."
                  : undefined
              }
            >
              <Input
                placeholder="cth. ORD-001"
                value={formDataState.nomorOrder}
                onChange={(e) => updateDataPengujian("nomorOrder", e.target.value)}
                value={formDataState.nomorOrder}
                onChange={(e) => updateDataPengujian("nomorOrder", e.target.value)}
              />
            </FormField>

            {/* NAMA PEMILIK */}
            <FormField
              label="Nama Pemilik/Penanggung Jawab"
              required
              error={
                isSubmitted && !formDataState.namaPemilik.trim()
                  ? "Nama pemilik wajib diisi."
                  : undefined
              }
            >
              <Input
            {/* NAMA PEMILIK */}
            <FormField
              label="Nama Pemilik/Penanggung Jawab"
              required
              error={
                isSubmitted && !formDataState.namaPemilik.trim()
                  ? "Nama pemilik wajib diisi."
                  : undefined
              }
            >
              <Input
                placeholder="cth. PT Pertamina Retail"
                value={formDataState.namaPemilik}
                onChange={(e) => updateDataPengujian("namaPemilik", e.target.value)}
                value={formDataState.namaPemilik}
                onChange={(e) => updateDataPengujian("namaPemilik", e.target.value)}
              />
            </FormField>

            {/* NOMOR SIML */}
            <FormField
              label="Nomor SIML"
              required
              error={
                isSubmitted && !formDataState.nomorSIML.trim()
                  ? "Nomor SIML wajib diisi."
                  : undefined
              }
            >
              <Input
                placeholder="cth. 01234"
                value={formDataState.nomorSIML}
                onChange={(e) => updateDataPengujian("nomorSIML", e.target.value)}
              />
            </FormField>

            {/* CONTACT PERSON */}
            <FormField
              label="Contact Person"
              required
              error={
                isSubmitted && !formDataState.contactPerson.trim()
                  ? "Contact person wajib diisi."
                  : undefined
              }
            >
              <Input
            {/* CONTACT PERSON */}
            <FormField
              label="Contact Person"
              required
              error={
                isSubmitted && !formDataState.contactPerson.trim()
                  ? "Contact person wajib diisi."
                  : undefined
              }
            >
              <Input
                placeholder="cth. Budi Santoso, 081234567890"
                value={formDataState.contactPerson}
                value={formDataState.contactPerson}
                onChange={(e) =>
                  updateDataPengujian("contactPerson", e.target.value)
                }
              />
            </FormField>

            {/* ALAMAT TERPASANG */}
            <FormField
              label="Alamat Terpasang"
              required
              className="md:col-span-2"
              error={
                isSubmitted && !formDataState.alamatTerpasang.trim()
                  ? "Alamat terpasang wajib diisi."
                  : undefined
              }
            >
              <Input
            {/* ALAMAT TERPASANG */}
            <FormField
              label="Alamat Terpasang"
              required
              className="md:col-span-2"
              error={
                isSubmitted && !formDataState.alamatTerpasang.trim()
                  ? "Alamat terpasang wajib diisi."
                  : undefined
              }
            >
              <Input
                placeholder="cth. Jl. Indonesia 123"
                value={formDataState.alamatTerpasang}
                value={formDataState.alamatTerpasang}
                onChange={(e) =>
                  updateDataPengujian("alamatTerpasang", e.target.value)
                }
              />
            </FormField>

            {/* NAMA POMPA UKUR */}
            <FormField
              label="Nama Pompa Ukur"
              required
              error={
                isSubmitted && !formDataState.namaPompaUkur.trim()
                  ? "Nama pompa ukur wajib diisi."
                  : undefined
              }
            >
              <Input
            {/* NAMA POMPA UKUR */}
            <FormField
              label="Nama Pompa Ukur"
              required
              error={
                isSubmitted && !formDataState.namaPompaUkur.trim()
                  ? "Nama pompa ukur wajib diisi."
                  : undefined
              }
            >
              <Input
                placeholder="cth. PU-001"
                value={formDataState.namaPompaUkur}
                value={formDataState.namaPompaUkur}
                onChange={(e) =>
                  updateDataPengujian("namaPompaUkur", e.target.value)
                }
              />
            </FormField>

            {/* TANGGAL PENGUJIAN */}
            <FormField
              label="Tanggal Pengujian"
              required
              error={
                isSubmitted && !formDataState.tanggalPengujian.trim()
                  ? "Tanggal pengujian wajib diisi."
                  : undefined
              }
            >
              <Input
                type="date"
                value={formDataState.tanggalPengujian}
                onChange={(e) =>
                  updateDataPengujian("tanggalPengujian", e.target.value)
                }
              />
            </FormField>

            {/* NAMA PETUGAS 1 */}
            <FormField
              label="Nama Petugas 1"
              required
              error={
                isSubmitted && !formDataState.namaPetugas1.trim()
                  ? "Nama petugas 1 wajib diisi."
                  : undefined
              }
            >
              <Input
                placeholder="cth. Budi Santoso"
                value={formDataState.namaPetugas1}
                onChange={(e) => updateDataPengujian("namaPetugas1", e.target.value)}
              />
            </FormField>

            {/* NAMA PETUGAS 2 */}
            <FormField
              label="Nama Petugas 2"
              required
              error={
                isSubmitted && !formDataState.namaPetugas2.trim()
                  ? "Nama petugas 2 wajib diisi."
                  : undefined
              }
            >
              <Input
                placeholder="cth. Budi Santoso"
                value={formDataState.namaPetugas2}
                onChange={(e) => updateDataPengujian("namaPetugas2", e.target.value)}
              />
            </FormField>
          </div>
        </FormCard>
        </FormCard>

        {/* ═══ SECTION 2: Identitas UTTP (Alat) ═══ */}
        <FormCard
          title="Identitas UTTP (Alat)"
          className="mb-7"
          headerClassName="bg-gray-200 px-5 py-3"
          contentClassName="p-5"
        >
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-3">
            <FormField
              label="Merek"
              required
              error={
                isSubmitted && !identitasUTTP.merek.trim()
                  ? "Merek wajib diisi."
                  : undefined
              }
            >
              <Input
        <FormCard
          title="Identitas UTTP (Alat)"
          className="mb-7"
          headerClassName="bg-gray-200 px-5 py-3"
          contentClassName="p-5"
        >
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-3">
            <FormField
              label="Merek"
              required
              error={
                isSubmitted && !identitasUTTP.merek.trim()
                  ? "Merek wajib diisi."
                  : undefined
              }
            >
              <Input
                placeholder="cth. Gilbarco"
                value={identitasUTTP.merek}
                onChange={(e) => updateIdentitasUTTP("merek", e.target.value)}
              />
            </FormField>

            <FormField
              label="Tipe/Model"
              required
              error={
                isSubmitted && !identitasUTTP.tipeModel.trim()
                  ? "Tipe/model wajib diisi."
                  : undefined
              }
            >
              <Input
            <FormField
              label="Tipe/Model"
              required
              error={
                isSubmitted && !identitasUTTP.tipeModel.trim()
                  ? "Tipe/model wajib diisi."
                  : undefined
              }
            >
              <Input
                placeholder="cth. Encore Seri 1"
                value={identitasUTTP.tipeModel}
                onChange={(e) => updateIdentitasUTTP("tipeModel", e.target.value)}
                onChange={(e) => updateIdentitasUTTP("tipeModel", e.target.value)}
              />
            </FormField>

            <FormField
              label="Nomor Seri"
              required
              error={
                isSubmitted && !identitasUTTP.nomorSeri.trim()
                  ? "Nomor seri wajib diisi."
                  : undefined
              }
            >
              <Input
            <FormField
              label="Nomor Seri"
              required
              error={
                isSubmitted && !identitasUTTP.nomorSeri.trim()
                  ? "Nomor seri wajib diisi."
                  : undefined
              }
            >
              <Input
                placeholder="cth. SN-30092"
                value={identitasUTTP.nomorSeri}
                onChange={(e) => updateIdentitasUTTP("nomorSeri", e.target.value)}
                onChange={(e) => updateIdentitasUTTP("nomorSeri", e.target.value)}
              />
            </FormField>

            <FormField
              label="Jumlah Nozzle"
              required
              error={
                isSubmitted && !identitasUTTP.jumlahNozzle.trim()
                  ? "Jumlah nozzle wajib diisi."
                  : undefined
              }
            >
              <Input
            <FormField
              label="Jumlah Nozzle"
              required
              error={
                isSubmitted && !identitasUTTP.jumlahNozzle.trim()
                  ? "Jumlah nozzle wajib diisi."
                  : undefined
              }
            >
              <Input
                placeholder="cth. 1"
                value={identitasUTTP.jumlahNozzle}
                onChange={(e) =>
                  updateIdentitasUTTP("jumlahNozzle", e.target.value)
                }
              />
            </FormField>

            <FormField
              label="Tahun Pembuatan"
              required
              error={
                isSubmitted && !identitasUTTP.tahunPembuatan.trim()
                  ? "Tahun pembuatan wajib diisi."
                  : undefined
              }
            >
              <Input
            <FormField
              label="Tahun Pembuatan"
              required
              error={
                isSubmitted && !identitasUTTP.tahunPembuatan.trim()
                  ? "Tahun pembuatan wajib diisi."
                  : undefined
              }
            >
              <Input
                placeholder="cth. 2020"
                value={identitasUTTP.tahunPembuatan}
                onChange={(e) =>
                  updateIdentitasUTTP("tahunPembuatan", e.target.value)
                }
              />
            </FormField>
          </div>
        </FormCard>
        </FormCard>

        {/* ═══ SECTION 3: Kondisi Operasi ═══ */}
        <FormCard
          title="Kondisi Operasi"
          className="mb-7"
          headerClassName="bg-gray-200 px-5 py-3"
          contentClassName="p-5"
        >
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
            <FormField
              label="Uji Alk Maksimum (L/menit)"
              required
              error={
                isSubmitted && !kondisiOperasi.ujiAlkMaksimum.trim()
                  ? "Uji alk maksimum wajib diisi."
                  : undefined
              }
            >
              <Input
        <FormCard
          title="Kondisi Operasi"
          className="mb-7"
          headerClassName="bg-gray-200 px-5 py-3"
          contentClassName="p-5"
        >
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
            <FormField
              label="Uji Alk Maksimum (L/menit)"
              required
              error={
                isSubmitted && !kondisiOperasi.ujiAlkMaksimum.trim()
                  ? "Uji alk maksimum wajib diisi."
                  : undefined
              }
            >
              <Input
                placeholder="cth. 1"
                value={kondisiOperasi.ujiAlkMaksimum}
                onChange={(e) =>
                  updateKondisiOperasi("ujiAlkMaksimum", e.target.value)
                }
              />
            </FormField>

            <FormField
              label="Uji Alk Minimum (L/menit)"
              required
              error={
                isSubmitted && !kondisiOperasi.ujiAlkMinimum.trim()
                  ? "Uji alk minimum wajib diisi."
                  : undefined
              }
            >
              <Input
            <FormField
              label="Uji Alk Minimum (L/menit)"
              required
              error={
                isSubmitted && !kondisiOperasi.ujiAlkMinimum.trim()
                  ? "Uji alk minimum wajib diisi."
                  : undefined
              }
            >
              <Input
                placeholder="cth. 1"
                value={kondisiOperasi.ujiAlkMinimum}
                onChange={(e) =>
                  updateKondisiOperasi("ujiAlkMinimum", e.target.value)
                }
              />
            </FormField>

            <FormField
              label="MFR = Min Measured Quantity (L) (hasil)"
              required
              error={
                isSubmitted && !kondisiOperasi.mfr.trim()
                  ? "MFR wajib diisi."
                  : undefined
              }
            >
              <Input
            <FormField
              label="MFR = Min Measured Quantity (L) (hasil)"
              required
              error={
                isSubmitted && !kondisiOperasi.mfr.trim()
                  ? "MFR wajib diisi."
                  : undefined
              }
            >
              <Input
                placeholder="cth. 1"
                value={kondisiOperasi.mfr}
                onChange={(e) => updateKondisiOperasi("mfr", e.target.value)}
              />
            </FormField>

            <FormField
              label="Nomor Pencacah/Tipe"
              required
              error={
                isSubmitted && !kondisiOperasi.nomorPencacahTipe.trim()
                  ? "Nomor pencacah/tipe wajib diisi."
                  : undefined
              }
            >
              <Input
            <FormField
              label="Nomor Pencacah/Tipe"
              required
              error={
                isSubmitted && !kondisiOperasi.nomorPencacahTipe.trim()
                  ? "Nomor pencacah/tipe wajib diisi."
                  : undefined
              }
            >
              <Input
                placeholder="cth. P1-X-Style-V2022"
                value={kondisiOperasi.nomorPencacahTipe}
                onChange={(e) =>
                  updateKondisiOperasi("nomorPencacahTipe", e.target.value)
                }
              />
            </FormField>
          </div>
        </FormCard>
        </FormCard>

        {/* ═══ SECTION 4: Checklist Pemeriksaan ═══ */}
        <FormCard
          title="Checklist Pemeriksaan"
          className="mb-5"
          headerClassName="bg-gray-200 px-5 py-3"
          contentClassName="p-0"
        >
          <Table className="min-w-[760px] table-fixed text-xs">
            {/* TABLE HEADER */}
            <TableHead>
              <TableRow>
                <TableHeader className="w-[6%] px-3 py-3 text-center">
                  No
                </TableHeader>
                <TableHeader className="w-[49%] px-3 py-3 text-left">
                  Deskripsi
                </TableHeader>
                <TableHeader className="w-[22%] px-3 py-3 text-center">
                  Penilaian
                </TableHeader>
                <TableHeader className="w-[23%] px-3 py-3 text-left">
                  Keterangan <span className="text-neutral">*opsional</span>
                </TableHeader>
              </TableRow>
            </TableHead>

            {/* TABLE BODY */}
            <TableBody>
              {CHECKLIST_QUESTIONS.map((question, index) => (
                <TableRow key={index}>
                  {/* NOMOR */}
                  <TableCell className="px-3 py-3 text-center align-middle">
                    {index + 1}
                  </TableCell>

                  {/* DESKRIPSI */}
                  <TableCell className="whitespace-pre-line px-3 py-3 align-middle leading-[1.35]">
                    {question}
                  </TableCell>

                  {/* PENILAIAN */}
                  <TableCell className="px-2 py-3 align-middle">
                    <RadioGroup
                      name={`penilaian-${index}`}
                      value={checklist[index].penilaian ?? ""}
                      onChange={(value) =>
                        updateChecklist(
                          index,
                          "penilaian",
                          value as "ya" | "tidak",
                        )
                      }
                      options={[
                        { label: "Ya", value: "ya" },
                        { label: "Tidak", value: "tidak" },
                      ]}
                      className="justify-center gap-3"
                      inputClassName="h-3.5 w-3.5"
                    />
                  </TableCell>

                  {/* KETERANGAN */}
                  <TableCell className="px-3 py-3 align-middle">
                    <Textarea
                      placeholder="Masukkan Keterangan"
                      rows={1}
                      value={checklist[index].keterangan}
                      onChange={(e) =>
                        updateChecklist(index, "keterangan", e.target.value)
                      }
                      className="min-h-[34px] resize-y px-2 py-2 text-[10px]"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Warning Feedback Component */}
          {!isFormValid && (
            <div className="px-5 pb-5 pt-4">
              <FormWarning
                message={
                  !allChecklistFilled
                    ? "Lengkapi semua penilaian checklist sebelum melanjutkan."
                    : "Lengkapi seluruh data wajib (*) pada Data Pengujian, Identitas UTTP, dan Kondisi Operasi sebelum melanjutkan."
                }
              />
            <div className="px-5 pb-5 pt-4">
              <FormWarning
                message={
                  !allChecklistFilled
                    ? "Lengkapi semua penilaian checklist sebelum melanjutkan."
                    : "Lengkapi seluruh data wajib (*) pada Data Pengujian, Identitas UTTP, dan Kondisi Operasi sebelum melanjutkan."
                }
              />
            </div>
          )}
        </FormCard>

        {/* ================================================
            TOMBOL VALIDASI
        ================================================ */}
        <div className="mb-8">
          <Button fullWidth onClick={handleValidate}>
            Validasi Pemeriksaan
          </Button>
        </div>

        {/* ================================================
            CONFIRM MODAL
        ================================================ */}
        <ConfirmModal
          open={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleConfirm}
          title="Konfirmasi Pemeriksaan"
          description="Pastikan seluruh data dan checklist pemeriksaan telah sesuai sebelum melanjutkan proses."
          confirmText="Konfirmasi"
          cancelText="Batal"
        >
          <div className="space-y-3 border-y border-gray-200 py-4">
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-neutral">Nomor Order</span>
              <span className="text-right font-medium text-black">
                {formDataState.nomorOrder || "-"}
              </span>
            </div>

            <div className="flex justify-between gap-4 text-sm">
              <span className="text-neutral">Nama Pemilik</span>
              <span className="text-right font-medium text-black">
                {formDataState.namaPemilik || "-"}
              </span>
            </div>

            <div className="flex justify-between gap-4 text-sm">
              <span className="text-neutral">Nama Pompa Ukur</span>
              <span className="text-right font-medium text-black">
                {formDataState.namaPompaUkur || "-"}
              </span>
            </div>

            <div className="flex justify-between gap-4 text-sm">
              <span className="text-neutral">Tanggal Pengujian</span>
              <span className="text-right font-medium text-black">
                {formDataState.tanggalPengujian || "-"}
              </span>
            </div>
          </div>
        </ConfirmModal>
      </div>
    </div>
  );
}
