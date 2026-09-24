"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthHeroBanner from "@/components/login/AuthHeroBanner";
import ChevronButton from "@/components/ui/ChevronButton";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="flex min-h-screen w-full">
      <AuthHeroBanner />

      <div className="flex w-full flex-col justify-between bg-white px-8 py-8 lg:w-1/2 lg:px-20 lg:py-10">
        <div className="w-full max-w-md mx-auto pt-2">
          <ChevronButton
            onClick={() => router.push("/")}
            variant="primary"
            className="text-sm font-normal"
          />
        </div>

        <div className="mx-auto flex w-full max-w-md my-auto flex-col justify-center py-6">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-black">Register</h2>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <label className="block text-sm font-normal text-black">
                Nama Lengkap
              </label>
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Masukan Nama"
                className="rounded-lg px-4 py-2.5"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-normal text-black">
                Email
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukan Email"
                className="rounded-lg px-4 py-2.5"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-normal text-black">
                No. Telepon
              </label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Contoh: 08xx-xxxx-xxxx"
                className="rounded-lg px-4 py-2.5"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-normal text-black">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukan Password"
                  className="rounded-lg pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black bg-transparent border-none cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-normal text-black">
                Konfirmasi Password
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Masukan Password"
                  className="rounded-lg pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black bg-transparent border-none cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth
              >
                Daftar
              </Button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm text-black">
            Sudah punya akun?{" "}
            <Link href="/auth/login" className="font-semibold text-[#5094C9] hover:underline">
              Login
            </Link>
          </p>
        </div>

        
      </div>
    </main>
  );
}