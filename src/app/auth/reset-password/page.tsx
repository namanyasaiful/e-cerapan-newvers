"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthHeroBanner from "@/components/login/AuthHeroBanner";
import ChevronButton from "@/components/ui/ChevronButton";
import Button from "@/components/ui/Button";

export default function NewPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-black">Password Reset</h2>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="block text-sm  text-black">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukan Password"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-10 text-black outline-none transition-all focus:border-[#5094C9] focus:ring-2 focus:ring-[#5094C9]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black bg-transparent border-none cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm  text-black">
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Masukan Password"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-10 text-black outline-none transition-all focus:border-[#5094C9] focus:ring-2 focus:ring-[#5094C9]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black bg-transparent border-none cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" variant="primary" size="md" fullWidth>
              Simpan Password
            </Button>
          </form>
        </div>

        {/* tes */}
      </div>
    </main>
  );
}
