import React from "react";
import Image from "next/image";

interface HeroHeaderProps {
  logoSrc?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  description?: string;
}

export default function HeroHeader({
  logoSrc = "/assets/logo/logo.png",
  title = "Periksa Akurasi Alat Ukur",
  titleHighlight = "Secara Digital",
  description = "E-Cerapan adalah layanan digital dari Direktorat Metrologi, Kementerian Perdagangan Republik Indonesia, yang digunakan untuk memastikan keakuratan alat ukur sesuai dengan Batas Kesalahan yang Diizinkan.",
}: HeroHeaderProps) {
  return (
    <div className="flex flex-col">
      <div className="mb-3">
        <Image src={logoSrc} alt="Logo Metrologi" width={70} height={70} />
      </div>

      <div>
        <h1 className="text-white font-bold text-4xl">{title}</h1>
        <span className="lock text-4xl font-bold bg-gradient-to-r from-[#FFD758] to-[#F59E0B] bg-clip-text text-transparent leading-[1.4]">{titleHighlight}</span>
        <p className="text-white text-sm">{description}</p>
      </div>
      
    </div>
  );
}
