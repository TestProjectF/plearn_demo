import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json(
            { error: "Forbidden" },
            { status: 403 }
        );
    }

    await prisma.chapter.delete({
        where: { id: params.id },
    });

    return NextResponse.json({ success: true });
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json(
            { error: "Forbidden" },
            { status: 403 }
        );
    }

    const { title, content } = await req.json();

    const chapter = await prisma.chapter.update({
        where: { id: params.id },
        data: { title, content },
    });

    return NextResponse.json(chapter);
}