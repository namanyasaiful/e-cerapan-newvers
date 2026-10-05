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

interface FieldErrors {
  email?: string;
  password?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>(
    {}
  );

  const validateEmail = (value: string): string | undefined => {
    const trimmed = value.trim();
    if (!trimmed) return "Email wajib diisi.";
    if (!EMAIL_REGEX.test(trimmed)) return "Format email tidak valid.";
    return undefined;
  };

  const validatePassword = (value: string): string | undefined => {
    if (!value) return "Password wajib diisi.";
    if (value.length < 8) return "Password minimal 8 karakter.";
    if (!/[A-Z]/.test(value)) return "Password harus mengandung huruf kapital.";
    if (!/[a-z]/.test(value)) return "Password harus mengandung huruf kecil.";
    if (!/[0-9]/.test(value)) return "Password harus mengandung angka.";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
      return "Password harus mengandung simbol.";
    return undefined;
  };

  const validateForm = (): FieldErrors => {
    return {
      email: validateEmail(email),
      password: validatePassword(password),
    };
  };

  const handleBlur = (field: "email" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error =
      field === "email" ? validateEmail(email) : validatePassword(password);
    setFieldErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (
    field: "email" | "password",
    value: string
  ) => {
    if (field === "email") setEmail(value);
    else setPassword(value);

    if (touched[field]) {
      const error =
        field === "email" ? validateEmail(value) : validatePassword(value);
      setFieldErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    const errors = validateForm();
    setFieldErrors(errors);
    setTouched({ email: true, password: true });

    if (errors.email || errors.password) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const result: LoginResponse = await response.json();

      if (!response.ok) {
        setErrorMessage(
          result.message ?? "Login gagal. Periksa email dan password."
        );
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
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label className="block text-sm text-black mb-1">Email</label>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(event) => handleChange("email", event.target.value)}
                onBlur={() => handleBlur("email")}
                autoComplete="email"
                required
                placeholder="Masukan Email"
                aria-invalid={Boolean(touched.email && fieldErrors.email)}
                aria-describedby={
                  touched.email && fieldErrors.email ? "email-error" : undefined
                }
                className={
                  touched.email && fieldErrors.email
                    ? "border-red-500 focus:border-red-500"
                    : undefined
                }
              />
              {touched.email && fieldErrors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-black mb-1">Password</label>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={(event) => handleChange("password", event.target.value)}
                onBlur={() => handleBlur("password")}
                autoComplete="current-password"
                required
                placeholder="Masukan Password"
                aria-invalid={Boolean(touched.password && fieldErrors.password)}
                aria-describedby={
                  touched.password && fieldErrors.password
                    ? "password-error"
                    : undefined
                }
                className={
                  touched.password && fieldErrors.password
                    ? "border-red-500 focus:border-red-500"
                    : undefined
                }
              />
              {touched.password && fieldErrors.password && (
                <p id="password-error" className="mt-1 text-sm text-red-600">
                  {fieldErrors.password}
                </p>
              )}
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