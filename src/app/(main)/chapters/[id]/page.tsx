import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ChapterDetail({
    params,
}: {
    params: { id: string };
}) {
    const chapter = await prisma.chapter.findUnique({
        where: { id: params.id },
    });

    if (!chapter) {
        notFound();
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">
                {chapter.title}
            </h1>

            <p>{chapter.content}</p>
        </div>
    );
}