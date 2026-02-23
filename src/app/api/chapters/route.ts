import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const chapters = await prisma.chapter.findMany({
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(chapters);
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const body = await req.json();
    const { title, content } = body;

    if (!title || !content) {
        return NextResponse.json(
            { error: "Missing fields" },
            { status: 400 }
        );
    }

    const chapter = await prisma.chapter.create({
        data: { title, content },
    });

    return NextResponse.json(chapter, { status: 201 });
}