import React from 'react';
import Breadcrumb from '@/components/e-cerapan/ui/Breadcrumb';
import PageHeader from '@/components/e-cerapan/ui/PageHeader';
import InfoBanner from '@/components/e-cerapan/ui/InfoBanner';

export default function ECerapanPage() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] w-full">
      <div className="px-8 py-8 md:px-12 md:py-12">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'E-Cerapan' },
          ]}
        />

        <PageHeader
          title="Mulai Cerapan"
          subtitle="Pilih jenis cerapan yang ingin dilakukan untuk memulai proses pengujian alat ukur."
        />

        <InfoBanner
          title="Panduan Penggunaan"
          description="Pastikan semua peralatan standar telah disiapkan sebelum memulai pengujian. Ikuti setiap tahap sesuai prosedur yang berlaku."
        />
      </div>
    </div>
  );
}