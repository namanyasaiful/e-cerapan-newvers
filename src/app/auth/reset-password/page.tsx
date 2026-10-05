"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthHeroBanner from "@/components/login/AuthHeroBanner";
import ChevronButton from "@/components/ui/ChevronButton";
import Button from "@/components/ui/Button";

type FieldName = "password" | "confirmPassword";
type FieldErrors = Partial<Record<FieldName, string>>;

export default function NewPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});

  const validatePassword = (value: string): string | undefined => {
    if (!value) return "Password wajib diisi.";
    if (value.length < 8) return "Password minimal 8 karakter.";
    if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value))
      return "Password harus mengandung huruf dan angka.";
    return undefined;
  };

  const validateConfirmPassword = (
    value: string,
    pw: string
  ): string | undefined => {
    if (!value) return "Konfirmasi password wajib diisi.";
    if (value !== pw) return "Konfirmasi password tidak cocok.";
    return undefined;
  };

  const validateField = (
    field: FieldName,
    pw: string,
    confirm: string
  ): string | undefined => {
    if (field === "password") return validatePassword(pw);
    return validateConfirmPassword(confirm, pw);
  };

  const handleChange = (field: FieldName, value: string) => {
    const nextPassword = field === "password" ? value : password;
    const nextConfirm = field === "confirmPassword" ? value : confirmPassword;

    if (field === "password") setPassword(value);
    else setConfirmPassword(value);

    if (touched[field]) {
      setFieldErrors((prev) => ({
        ...prev,
        [field]: validateField(field, nextPassword, nextConfirm),
      }));
    }

    if (field === "password" && touched.confirmPassword) {
      setFieldErrors((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(nextConfirm, nextPassword),
      }));
    }
  };

  const handleBlur = (field: FieldName) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setFieldErrors((prev) => ({
      ...prev,
      [field]: validateField(field, password, confirmPassword),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const errors: FieldErrors = {
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(confirmPassword, password),
    };
    setFieldErrors(errors);
    setTouched({ password: true, confirmPassword: true });

    if (errors.password || errors.confirmPassword) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        setErrorMessage(
          result.message ?? "Gagal menyimpan password. Silakan coba lagi."
        );
        return;
      }

      router.push("/auth/login");
    } catch {
      setErrorMessage("Tidak dapat terhubung ke server. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldError = (name: FieldName) =>
    touched[name] ? fieldErrors[name] : undefined;

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

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="space-y-2">
              <label className="block text-sm text-black">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  onBlur={() => handleBlur("password")}
                  autoComplete="new-password"
                  minLength={8}
                  required
                  placeholder="Masukan Password"
                  aria-invalid={Boolean(fieldError("password"))}
                  aria-describedby={
                    fieldError("password") ? "password-error" : undefined
                  }
                  className={`w-full rounded-lg border px-4 py-3 pr-10 text-black outline-none transition-all focus:ring-2 ${
                    fieldError("password")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-gray-300 focus:border-[#5094C9] focus:ring-[#5094C9]/20"
                  }`}
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
              {fieldError("password") && (
                <p id="password-error" className="text-sm text-red-600">
                  {fieldError("password")}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-black">
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  onBlur={() => handleBlur("confirmPassword")}
                  autoComplete="new-password"
                  minLength={8}
                  required
                  placeholder="Masukan Password"
                  aria-invalid={Boolean(fieldError("confirmPassword"))}
                  aria-describedby={
                    fieldError("confirmPassword")
                      ? "confirmPassword-error"
                      : undefined
                  }
                  className={`w-full rounded-lg border px-4 py-3 pr-10 text-black outline-none transition-all focus:ring-2 ${
                    fieldError("confirmPassword")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-gray-300 focus:border-[#5094C9] focus:ring-[#5094C9]/20"
                  }`}
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
              {fieldError("confirmPassword") && (
                <p id="confirmPassword-error" className="text-sm text-red-600">
                  {fieldError("confirmPassword")}
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
              {isSubmitting ? "Menyimpan..." : "Simpan Password"}
            </Button>

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