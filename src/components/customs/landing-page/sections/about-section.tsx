"use client";

import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 md:px-12 md:py-20 lg:px-16"
    >
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
        <div className="order-2 md:order-1">
          <h2 className="text-2xl font-bold text-brand-navy sm:text-3xl md:text-3xl">
            Mengenal E-Cerapan
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral sm:text-base">
            E-Cerapan adalah layanan digital dari Direktorat Metrologi
            Kementerian Perdagangan untuk mencatat hasil pengujian alat ukur
            secara terstandarisasi dan aman.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-neutral sm:text-base">
            Layanan ini mendukung digitalisasi proses tera dan tera ulang
            (UTTP), berdasarkan ketentuan resmi yang telah diatur dalam
            peraturan perundang-undangan yang berlaku, sehingga proses pengujian
            alat ukur Anda menjadi lebih transparan dan mudah diakses.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-neutral sm:text-base">
            Terbuka bagi petugas, badan usaha, hingga masyarakat umum yang ingin
            memastikan alat ukur yang mereka gunakan sudah sesuai standar.
          </p>
        </div>

        <div className="order-1 w-full overflow-hidden rounded-2xl shadow-lg md:order-2">
          <Image
            src="/assets/images/about-image.png"
            alt="About Image"
            width={500}
            height={500}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
