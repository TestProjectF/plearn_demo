"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Chapter {
    id: string;
    title: string;
    content: string;
}

export default function AdminChaptersPage() {
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const router = useRouter();

    useEffect(() => {
        loadChapters();
    }, []);

    const loadChapters = async () => {
        const res = await fetch("/api/chapters");
        const data = await res.json();
        setChapters(data);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this chapter?")) return;

        const res = await fetch(`/api/chapters/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            loadChapters();
        } else {
            alert("Delete failed");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-10">
            <h1 className="text-2xl font-bold mb-6">
                Admin – Manage Chapters
            </h1>

            <div className="flex justify-end mb-6">
                <button
                    onClick={() => router.push("/admin/chapters/create")}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    + Create
                </button>
            </div>

            <div className="space-y-4">
                {chapters.map((chapter) => (
                    <div
                        key={chapter.id}
                        className="bg-white p-4 shadow rounded flex justify-between"
                    >
                        <div>
                            <h2 className="font-semibold">{chapter.title}</h2>
                            <p className="text-sm text-gray-500">
                                {chapter.content.slice(0, 60)}...
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() =>
                                    router.push(`/admin/chapters/${chapter.id}/edit`)
                                }
                                className="text-blue-500"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => handleDelete(chapter.id)}
                                className="text-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}