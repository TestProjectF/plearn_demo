import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
        return NextResponse.json(
            { error: "Missing fields" },
            { status: 400 }
        );
    }

    const existing = await prisma.user.findUnique({
        where: { email },
    });

    if (existing) {
        return NextResponse.json(
            { error: "Email already exists" },
            { status: 400 }
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });

    return NextResponse.json(user, { status: 201 });
}