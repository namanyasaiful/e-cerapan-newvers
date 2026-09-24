"use client";

import Image from "next/image";

export default function ServiceSection() {
  return (
    <section
      id="services"
      className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 md:px-12 md:py-14 lg:px-16"
    >
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-14 lg:gap-20">
        <div className="w-40 shrink-0 sm:w-48 md:w-64 lg:w-80">
          <Image
            src="/assets/images/service-icon.png"
            alt="Service Icon"
            width={500}
            height={500}
            className="h-auto w-full object-contain"
            sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 256px, 320px"
          />
        </div>

        <div className="flex w-full flex-1 flex-col gap-4">
          <h2 className="text-2xl font-bold text-brand-navy sm:text-3xl lg:text-4xl">
            Satu Layanan Beragam Alat Ukur
          </h2>
          <div className="mt-4 flex flex-col gap-4">
            <p className="text-justify text-sm leading-relaxed text-neutral sm:text-base">
              E-Cerapan mendukung pengelolaan berbagai jenis alat ukur, dari
              timbangan, meteran air, meteran gas, hingga alat ukur takar,
              timbang, dan perlengkapannya (UTTP) lainnya.
            </p>

            <p className="text-justify text-sm leading-relaxed text-neutral sm:text-base">
              Proses pengujian yang lebih sederhana dan terstandarisasi membantu
              mempercepat pelayanan tanpa mengurangi ketelitian dan akurasi
              hasil kerja.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}