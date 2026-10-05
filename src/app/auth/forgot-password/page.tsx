"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthHeroBanner from "@/components/login/AuthHeroBanner";
import ChevronButton from "@/components/ui/ChevronButton";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>();
  const [touched, setTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (value: string): string | undefined => {
    const trimmed = value.trim();
    if (!trimmed) return "Email wajib diisi.";
    if (!EMAIL_REGEX.test(trimmed)) return "Format email tidak valid.";
    return undefined;
  };

  const handleChange = (value: string) => {
    setEmail(value);
    if (touched) {
      setEmailError(validateEmail(value));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setEmailError(validateEmail(email));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage("");
    setErrorMessage("");

    const error = validateEmail(email);
    setEmailError(error);
    setTouched(true);

    if (error) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        setErrorMessage(
          result.message ?? "Gagal mengirim email reset. Silakan coba lagi."
        );
        return;
      }

      setStatusMessage(
        "Jika email terdaftar, kami telah mengirim tautan reset password."
      );
      setEmail("");
      setTouched(false);
    } catch {
      setErrorMessage("Tidak dapat terhubung ke server. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
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

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label className="block text-sm font-medium text-black mb-1.5">
                Email
              </label>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                placeholder="Masukan Email"
                autoComplete="email"
                required
                aria-invalid={Boolean(touched && emailError)}
                aria-describedby={
                  touched && emailError ? "email-error" : undefined
                }
                className={
                  touched && emailError
                    ? "border-red-500 focus:border-red-500"
                    : undefined
                }
              />
              {touched && emailError && (
                <p id="email-error" className="mt-1 text-sm text-red-600">
                  {emailError}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? "Mengirim..." : "Kirim"}
            </Button>

            {statusMessage && (
              <p className="text-sm text-green-600" role="status">
                {statusMessage}
              </p>
            )}
            {errorMessage && (
              <p className="text-sm text-red-600" role="alert">
                {errorMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}