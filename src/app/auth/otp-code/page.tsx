"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthHeroBanner from "@/components/login/AuthHeroBanner";
import ChevronButton from "@/components/ui/ChevronButton";
import Button from "@/components/ui/Button";

export default function PasswordResetOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <main className="flex min-h-screen w-full">
      <AuthHeroBanner />

      <div className="flex w-full flex-col justify-between bg-white px-8 py-8 lg:w-1/2 lg:px-20 lg:py-10">
        <div className="w-full max-w-md mx-auto pt-2">
          <ChevronButton
            onClick={() => router.back()}
            variant="primary"
            className="text-sm font-medium"
          />
        </div>

        <div className="mx-auto flex w-full max-w-md my-auto flex-col justify-center py-6">
          <div className="mb-8 space-y-1">
            <h2 className="text-3xl font-bold text-black">Password Reset</h2>
            <p className="text-sm text-black">
              Masukkan 4 digit kode yang dikirim ke <span className="font-medium text-black">namapetugas@gmail.com</span>
            </p>
          </div>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="flex justify-center gap-[25px]">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="h-16 w-16 rounded-[10px] border border-[#B0B0B0] text-center text-2xl font-semibold text-black outline-none transition-all focus:border-[#5094C9] focus:ring-2 focus:ring-[#5094C9]/20"
                />
              ))}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
            >
              Verifikasi
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-black">
            Sudah punya akun?{" "}
            <Link href="/auth/login" className="font-semibold text-[#5094C9] hover:underline">
              Kirim Ulang
            </Link>
          </p>
        </div>

        
      </div>
    </main>
  );
}