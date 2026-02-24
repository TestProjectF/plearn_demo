import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    await prisma.chapter.delete({
        where: { id },
    });

    return NextResponse.json({ success: true });
}

export async function PUT(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const { title, content } = await request.json();

    const chapter = await prisma.chapter.update({
        where: { id },
        data: { title, content },
    });

    return NextResponse.json(chapter);
}