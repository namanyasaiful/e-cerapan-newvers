import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json().catch(() => null);
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { message: "Data registrasi tidak valid" },
        { status: 400 }
      );
    }

    const { nama, email, telp, password } = body as Record<string, unknown>;
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    const normalizedPhone = typeof telp === "string" ? telp.trim() : "";

    if (
      typeof nama !== "string" ||
      !nama.trim() ||
      !normalizedEmail ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) ||
      !/^\+?[\d\s()-]{8,20}$/.test(normalizedPhone) ||
      typeof password !== "string" ||
      password.length < 8
    ) {
      return NextResponse.json(
        { message: "Nama, email, nomor telepon, dan password wajib diisi dengan benar" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "Email sudah terdaftar",
        },
        {
          status: 409,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        nama: nama.trim(),
        email: normalizedEmail,
        telp: normalizedPhone,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "Registrasi berhasil",
        user: {
          id: user.id,
          nama: user.nama,
          email: user.email,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { message: "Email sudah terdaftar" },
        { status: 409 }
      );
    }

    console.error(error);

    return NextResponse.json(
      {
        message: "Terjadi kesalahan server",
      },
      {
        status: 500,
      }
    );
  }
}