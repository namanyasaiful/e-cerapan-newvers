'use client';

import { useRouter } from 'next/navigation';

export default function CtaSection() {
  const router = useRouter();

  return (
    <section className="px-4 py-12 md:py-20 flex justify-center bg-white">
      <div className="w-full  rounded-[2rem] bg-blue-600 px-6 py-12 text-center text-white md:px-12 md:py-16 shadow-lg">
        <p className="text-2xl font-bold leading-tight md:text-4xl lg:text-5xl">
          Wujudkan Pengukuran Akurat &amp; Terpercaya
          <br />
          <span className="text-yellow-400">Bersama E-Cerapan</span>
        </p>

        <p className="mx-auto mt-4 max-w-xl text-sm text-white/90 md:mt-6 md:text-base">
          Proses lebih mudah, lebih cepat, dan terukur secara digital. Semua dalam satu platform.
        </p>

        <button
          type="button"
          onClick={() => router.push('/e-cerapan')}
          className="mt-8 rounded-lg bg-yellow-400 px-8 py-3 text-sm font-bold text-white transition hover:bg-yellow-500 md:mt-10 md:px-10 md:text-base"
        >
          Coba Sekarang
        </button>
      </div>
    </section>
  );
}