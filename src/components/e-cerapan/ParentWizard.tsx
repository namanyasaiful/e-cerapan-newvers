'use client';

import React, { useState } from 'react';
import { WizardFormData, WizardStepProps } from '@/types/wizard';
import PemeriksaanAwalPage from '@/app/e-cerapan/forms/PemeriksaanAwal';
import HasilPemeriksaanAwalPage from '@/app/e-cerapan/forms/HasilPemeriksaanAwal';
import PengujianPerhitunganPage from '@/app/e-cerapan/forms/PengujianPerhitungan';
import HasilPengujianPage from '@/app/e-cerapan/forms/HasilPengujian';

export const initialWizardFormData: WizardFormData = {
  step1: {
    dataPengujian: {
      nomorOrder: '',
      namaPemilik: '',
      nomorSIML: '',
      contactPerson: '',
      alamatTerpasang: '',
      namaPompaUkur: '',
      tanggalPengujian: '',
      namaPetugas1: '',
      namaPetugas2: '',
      noSPBU: '',
    },
    identitasUTTP: {
      merek: '',
      tipeModel: '',
      nomorSeri: '',
      jumlahNozzle: '',
      tahunPembuatan: '',
    },
    kondisiOperasi: {
      ujiAlkMaksimum: '',
      ujiAlkMinimum: '',
      mfr: '',
      nomorPencacahTipe: '',
    },
    checklist: [],
  },
    step2: {
    dataNozzle: {
      identitas: '',
      jenisCairan: '',
      hargaSatuan: '',
    },
    dataBejana: {
      merek: '',
      tipe: '',
      nomorSeri: '',
      volNominal: '',
      volSebenarnya: '',
      skalaUtama: '',
      tglVerifikasi: '',
    },
    totalisator: {
      sebelumUji: '',
      sesudahUji: '',
      totalTerpakai: '',
    },
    cerapan: [
      { volNominal: '', penunjukan: '', volSebenarnya: '', kesalahan: '', status: '' },
      { volNominal: '', penunjukan: '', volSebenarnya: '', kesalahan: '', status: '' },
      { volNominal: '', penunjukan: '', volSebenarnya: '', kesalahan: '', status: '' },
    ],
  },
};

interface ParentWizardProps {
  initialStep?: number;
}

export default function ParentWizard({ initialStep = 0 }: ParentWizardProps) {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [formData, setFormData] = useState<WizardFormData>(initialWizardFormData);

  const updateFormData = (stepKey: keyof WizardFormData, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [stepKey]: {
        ...prev[stepKey],
        ...data,
      },
    }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step <= 3) {
      setCurrentStep(step);
    }
  };

  const stepProps: WizardStepProps = {
    formData,
    updateFormData,
    nextStep,
    prevStep,
    currentStep,
    goToStep,
  };

  return (
    <div className="w-full">
      {currentStep === 0 && <PemeriksaanAwalPage {...stepProps} />}
      {currentStep === 1 && <HasilPemeriksaanAwalPage {...stepProps} />}
      {currentStep === 2 && <PengujianPerhitunganPage {...stepProps} />}
      {currentStep === 3 && <HasilPengujianPage {...stepProps} />}
    </div>
  );
}

