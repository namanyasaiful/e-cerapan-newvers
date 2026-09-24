"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AuthHeroBanner from "@/components/login/AuthHeroBanner";
import ChevronButton from "@/components/ui/ChevronButton";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logika pengiriman email reset password
  };

  return (
    <main className="flex min-h-screen w-full">
      <AuthHeroBanner />

      <div className="flex w-full flex-col justify-between bg-white px-8 py-8 lg:w-1/2 lg:px-20 lg:py-10">
        <div className="w-full max-w-md mx-auto pt-2">
          <ChevronButton
            onClick={() => router.back()}
            className="text-sm font-medium"
          />
        </div>

        <div className="mx-auto flex w-full max-w-md my-auto flex-col justify-center py-6">
          <div className="mb-6 space-y-1">
            <h2 className="text-3xl font-bold text-black">Lupa Password</h2>
            <p className="text-sm text-black">
              Masukkan email anda untuk reset password
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-black mb-1.5">
                Email
              </label>
              <Input type="email" placeholder="Masukan Email" required />
            </div>

            <Button type="submit" variant="primary" size="md" fullWidth>
              Kirim
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
