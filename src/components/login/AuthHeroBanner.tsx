import React from "react";
import Image from "next/image";
import HeroHeader from "@/components/login/HeroHeader";

interface AuthHeroBannerProps {
  imageSrc?: string;
  imageAlt?: string;
  logoSrc?: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
  className?: string;
}

export default function AuthHeroBanner({
  imageSrc = "/assets/images/login-bg.png",
  imageAlt = "Auth Background",
  logoSrc,
  title,
  titleHighlight,
  description,
  className = "",
}: AuthHeroBannerProps) {
  return (
    <div className={`relative hidden w-1/2 flex-col justify-center p-12 lg:flex ${className}`}>
      {/* Background Image */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
        priority
      />

      {/* Foreground Content */}
      <div className="relative z-10">
        <HeroHeader
          logoSrc={logoSrc}
          title={title}
          titleHighlight={titleHighlight}
          description={description}
        />
      </div>
    </div>
  );
}