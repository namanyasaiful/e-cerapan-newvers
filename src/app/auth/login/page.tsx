"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ChevronButton from "@/components/ui/ChevronButton";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import AuthHeroBanner from "@/components/login/AuthHeroBanner";
import Link from "next/link";
import { AUTH_USER_NAME_STORAGE_KEY } from "@/lib/auth-storage";

interface LoginResponse {
  message?: string;
  user?: {
    nama?: string;
  };
}

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result: LoginResponse = await response.json();

      if (!response.ok) {
        setErrorMessage(result.message ?? "Login gagal. Periksa email dan password.");
        return;
      }

      if (!result.user?.nama) {
        setErrorMessage("Nama akun tidak tersedia. Silakan coba login kembali.");
        return;
      }

      localStorage.setItem(AUTH_USER_NAME_STORAGE_KEY, result.user.nama);
      router.replace("/e-cerapan");
    } catch {
      setErrorMessage("Tidak dapat terhubung ke server. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full">
      {/* bagian kirinya dsini */}

      <AuthHeroBanner />

      {/* bagian kananya disni */}
      <div className="flex w-full flex-col justify-between bg-white px-8 py-8 lg:w-1/2 lg:px-20 lg:py-10">
        <div className="w-full max-w-md mx-auto pt-2">
          <ChevronButton onClick={() => router.push("/")} className="text-lg" />
        </div>

        <div className="mx-auto flex w-full max-w-md my-auto flex-col justify-center py-6">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-black">Login</h2>
          </div>

          {/* Form Inputs */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm  text-black mb-1">
                Email
              </label>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
                placeholder="Masukan Email"
              />
            </div>

            <div>
              <label className="block text-sm text-black mb-1">
                Password
              </label>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
                placeholder="Masukan Password"
              />
            </div>

            <div className="flex justify-end text-sm">
              <Link
                href="/auth/forgot-password"
                className="font-medium text-[#5094C9] hover:underline"
              >
                Lupa Password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? "Memeriksa..." : "Login"}
            </Button>
            {errorMessage && (
              <p className="text-sm text-red-600" role="alert">
                {errorMessage}
              </p>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-black">
            Belum punya akun?{" "}
            <Link
              href="/auth/register"
              className="font-semibold text-[#5094C9] hover:underline"
            >
              Daftar
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}
