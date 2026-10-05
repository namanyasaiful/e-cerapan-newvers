"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthHeroBanner from "@/components/login/AuthHeroBanner";
import ChevronButton from "@/components/ui/ChevronButton";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import MessageModal from "@/components/e-cerapan/feedback/MessageModal";

interface RegisterForm {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

type FieldName = keyof RegisterForm;
type FieldErrors = Partial<Record<FieldName, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(\+?62|0)8[1-9][0-9]{6,11}$/;

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterForm>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});


  const validateFullName = (value: string): string | undefined => {
    const trimmed = value.trim();
    if (!trimmed) return "Nama lengkap wajib diisi.";
    if (trimmed.length < 2) return "Nama minimal 2 karakter.";
    return undefined;
  };

  const validateEmail = (value: string): string | undefined => {
    const trimmed = value.trim();
    if (!trimmed) return "Email wajib diisi.";
    if (!EMAIL_REGEX.test(trimmed)) return "Format email tidak valid.";
    return undefined;
  };

  const validatePhone = (value: string): string | undefined => {
    const trimmed = value.trim();
    if (!trimmed) return "No. telepon wajib diisi.";
    const normalized = trimmed.replace(/[\s-]/g, "");
    if (!PHONE_REGEX.test(normalized))
      return "Format nomor telepon tidak valid. Contoh: 081234567890.";
    return undefined;
  };

  const validatePassword = (value: string): string | undefined => {
    if (!value) return "Password wajib diisi.";
    if (value.length < 8) return "Password minimal 8 karakter.";
    if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value))
      return "Password harus mengandung huruf dan angka.";
    return undefined;
  };

  const validateConfirmPassword = (
    value: string,
    password: string
  ): string | undefined => {
    if (!value) return "Konfirmasi password wajib diisi.";
    if (value !== password) return "Konfirmasi password tidak cocok.";
    return undefined;
  };


  const validateField = (field: FieldName, data: RegisterForm): string | undefined => {
    switch (field) {
      case "fullName":
        return validateFullName(data.fullName);
      case "email":
        return validateEmail(data.email);
      case "phone":
        return validatePhone(data.phone);
      case "password":
        return validatePassword(data.password);
      case "confirmPassword":
        return validateConfirmPassword(data.confirmPassword, data.password);
    }
  };

  const validateAll = (data: RegisterForm): FieldErrors => {
    const errors: FieldErrors = {};
    (Object.keys(data) as FieldName[]).forEach((field) => {
      const err = validateField(field, data);
      if (err) errors[field] = err;
    });
    return errors;
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const field = name as FieldName;

    const next = { ...formData, [field]: value };
    setFormData(next);

    if (touched[field]) {
      const err = validateField(field, next);
      setFieldErrors((prev) => ({ ...prev, [field]: err }));

      if (field === "password" && touched.confirmPassword) {
        setFieldErrors((prev) => ({
          ...prev,
          confirmPassword: validateConfirmPassword(next.confirmPassword, next.password),
        }));
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const field = e.target.name as FieldName;
    setTouched((prev) => ({ ...prev, [field]: true }));
    setFieldErrors((prev) => ({
      ...prev,
      [field]: validateField(field, formData),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const errors = validateAll(formData);
    setFieldErrors(errors);
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    });

    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: formData.fullName.trim(),
          email: formData.email.trim(),
          telp: formData.phone.replace(/[\s-]/g, ""),
          password: formData.password,
        }),
      });
      const result: { message?: string } = await response.json();

      if (!response.ok) {
        setErrorMessage(result.message ?? "Registrasi gagal. Silakan coba lagi.");
        return;
      }

      setIsSuccessModalOpen(true);
    } catch {
      setErrorMessage("Tidak dapat terhubung ke server. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Small helper to reduce repetition in JSX --------------------------------

  const fieldError = (name: FieldName) =>
    touched[name] ? fieldErrors[name] : undefined;

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

          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            {/* Nama Lengkap */}
            <div className="space-y-1.5">
              <label className="block text-sm font-normal text-black">
                Nama Lengkap
              </label>
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="name"
                required
                placeholder="Masukan Nama"
                className={`rounded-lg px-4 py-2.5 ${
                  fieldError("fullName") ? "border-red-500 focus:border-red-500" : ""
                }`}
                aria-invalid={Boolean(fieldError("fullName"))}
                aria-describedby={fieldError("fullName") ? "fullName-error" : undefined}
              />
              {fieldError("fullName") && (
                <p id="fullName-error" className="text-sm text-red-600">
                  {fieldError("fullName")}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-sm font-normal text-black">Email</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="email"
                required
                placeholder="Masukan Email"
                className={`rounded-lg px-4 py-2.5 ${
                  fieldError("email") ? "border-red-500 focus:border-red-500" : ""
                }`}
                aria-invalid={Boolean(fieldError("email"))}
                aria-describedby={fieldError("email") ? "email-error" : undefined}
              />
              {fieldError("email") && (
                <p id="email-error" className="text-sm text-red-600">
                  {fieldError("email")}
                </p>
              )}
            </div>

            {/* No. Telepon */}
            <div className="space-y-1.5">
              <label className="block text-sm font-normal text-black">
                No. Telepon
              </label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="tel"
                required
                placeholder="Contoh: 08xx-xxxx-xxxx"
                className={`rounded-lg px-4 py-2.5 ${
                  fieldError("phone") ? "border-red-500 focus:border-red-500" : ""
                }`}
                aria-invalid={Boolean(fieldError("phone"))}
                aria-describedby={fieldError("phone") ? "phone-error" : undefined}
              />
              {fieldError("phone") && (
                <p id="phone-error" className="text-sm text-red-600">
                  {fieldError("phone")}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-sm font-normal text-black">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="new-password"
                  minLength={8}
                  required
                  placeholder="Masukan Password"
                  className={`rounded-lg pr-10 ${
                    fieldError("password") ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  aria-invalid={Boolean(fieldError("password"))}
                  aria-describedby={fieldError("password") ? "password-error" : undefined}
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

            {/* Konfirmasi Password */}
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
                  onBlur={handleBlur}
                  autoComplete="new-password"
                  minLength={8}
                  required
                  placeholder="Masukan Password"
                  className={`rounded-lg pr-10 ${
                    fieldError("confirmPassword")
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }`}
                  aria-invalid={Boolean(fieldError("confirmPassword"))}
                  aria-describedby={
                    fieldError("confirmPassword") ? "confirmPassword-error" : undefined
                  }
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

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? "Mendaftarkan..." : "Daftar"}
              </Button>
            </div>
            {errorMessage && (
              <p className="text-sm text-red-600" role="alert">
                {errorMessage}
              </p>
            )}
          </form>

          <p className="mt-4 text-center text-sm text-black">
            Sudah punya akun?{" "}
            <Link
              href="/auth/login"
              className="font-semibold text-[#5094C9] hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      <MessageModal
        open={isSuccessModalOpen}
        onClose={() => router.push("/auth/login")}
        title="Registrasi Berhasil"
        message="Akun Anda berhasil dibuat. Silakan login untuk melanjutkan."
        variant="success"
        buttonText="Ke Halaman Login"
      />
    </main>
  );
}