"use client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function CtaSection() {
  const router = useRouter();
  return (
    <section className="flex justify-center bg-white px-5 py-5 sm:px-8 md:px-12 md:py-10 lg:px-16">
      <div className="w-full max-w-7xl rounded-2xl bg-primary px-5 py-10 text-center text-white shadow-lg sm:rounded-[2rem] sm:px-6 sm:py-12 md:px-12 md:py-16">
        <p className="text-2xl font-bold leading-snug sm:text-3xl md:text-4xl">
          Wujudkan Pengukuran Akurat &amp; Terpercaya
          <br />
          <span className="text-warning">Bersama E-Cerapan</span>
        </p>

        <p className="mx-auto mt-4 w-full max-w-2xl text-sm text-white/90 md:mt-6 md:text-base">
          Proses lebih mudah, lebih cepat, dan terukur secara digital. Semua
          dalam satu platform.
        </p>

        <Button
          variant="primary"
          onPress={() => router.push("/e-cerapan")}
          className="mt-8 rounded-lg bg-warning px-6 py-3 text-sm font-bold text-white transition hover:bg-yellow-500 sm:px-8 md:mt-10 md:px-12 md:py-6 md:text-base"
        >
          Coba Sekarang
        </Button>
      </div>
    </section>
  );
}