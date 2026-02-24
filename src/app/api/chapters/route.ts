import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET ALL CHAPTERS
export async function GET() {
    try {
        const chapters = await prisma.chapter.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(chapters);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch chapters" },
            { status: 500 }
        );
    }
}

// CREATE CHAPTER
export async function POST(request: Request) {
    try {
        const { title, content } = await request.json();

        if (!title || !content) {
            return NextResponse.json(
                { error: "Missing fields" },
                { status: 400 }
            );
        }

        const chapter = await prisma.chapter.create({
            data: { title, content },
        });

        return NextResponse.json(chapter);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create chapter" },
            { status: 500 }
        );
    }
}