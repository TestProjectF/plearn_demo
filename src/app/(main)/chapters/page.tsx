import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminChaptersPage() {
    const chapters = await prisma.chapter.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div>
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-bold">
                    Manage Chapters
                </h1>

                <Link
                    href="/admin/chapters/create"
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    + Create
                </Link>
            </div>

            <div className="flex flex-col gap-4">
                {chapters.map((chapter) => (
                    <div
                        key={chapter.id}
                        className="border p-4 rounded bg-white shadow flex justify-between"
                    >
                        <div>
                            <h2 className="font-bold">
                                {chapter.title}
                            </h2>
                            <p className="text-gray-600">
                                {chapter.content}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <Link
                                href={`/admin/chapters/${chapter.id}/edit`}
                                className="text-blue-600"
                            >
                                Edit
                            </Link>

                            <form
                                action={`/api/chapters/${chapter.id}`}
                                method="POST"
                            >
                                <button
                                    formMethod="delete"
                                    className="text-red-600"
                                >
                                    Delete
                                </button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}