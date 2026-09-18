"use client";

import { useState } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "How It Works", href: "#services" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20 bg-white shadow-sm">
      <nav className="mx-auto flex max-w-content items-center justify-between px-5 py-3 md:px-8">
        {/* Logo / brand */}
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <Image
              src="/assets/logo/Metrologi.svg"
              alt="Logo Direktorat Metrologi"
              fill
              priority
              sizes="40px"
              className="object-contain"
            />
          </div>
          <div className="leading-tight">
            <p className="text-base font-bold text-brand-blue">
              Direktorat Metrologi
            </p>
            <p className="text-[11px] text-slate-500">
              Kementerian Perdagangan Republik Indonesia
            </p>
          </div>
        </div>


        <ul className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="transition hover:text-brand-blue">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}