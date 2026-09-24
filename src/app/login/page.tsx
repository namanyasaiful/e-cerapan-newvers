"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HeroHeader from "@/components/login/HeroHeader";
import ChevronButton from "@/components/login/ChevronButton";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function Page() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen w-full">
      {/* bagian kirinya dsini */}

      <div className="relative hidden w-1/2 flex-col justify-center p-12 lg:flex">
        <Image
          src="/assets/images/login-bg.png"
          alt="Login Background"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10">
          <HeroHeader />
        </div>
      </div>

      {/* bagian kananya disni */}
      <div className="flex w-full flex-col justify-between bg-white px-8 py-8 lg:w-1/2 lg:px-20 lg:py-10">
        <div className="w-full max-w-md mx-auto pt-2">
          <ChevronButton onClick={() => router.back()} className="text-lg" />
        </div>

        <div className="mx-auto flex w-full max-w-md my-auto flex-col justify-center py-6">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Login</h2>
          </div>

          {/* Form Inputs */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input type="email" placeholder="Masukan Email" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input type="password" placeholder="Masukan Password" />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                />
                Ingat saya
              </label>
              <a
                href="#"
                className="font-medium text-[#5094C9] hover:underline"
              >
                Lupa Password?
              </a>
            </div>

            <Button type="submit" variant="primary" size="md" fullWidth>
              Login
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Belum punya akun?{" "}
            <a
              href="#"
              className="font-semibold text-[#5094C9] hover:underline"
            >
              Daftar
            </a>
          </p>
        </div>

        <div className="w-full max-w-md mx-auto invisible">
          <ChevronButton />
        </div>
      </div>
    </main>
  );
}
