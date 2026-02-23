"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditChapterPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(`/api/chapters`)
            .then((res) => res.json())
            .then((data) => {
                const chapter = data.find((c: any) => c.id === id);
                if (chapter) {
                    setTitle(chapter.title);
                    setContent(chapter.content);
                }
            });
    }, [id]);

    const handleUpdate = async () => {
        setLoading(true);

        await fetch(`/api/chapters/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content }),
        });

        setLoading(false);
        router.push("/admin/chapters");
    };

    return (
        <div className="max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">
                Edit Chapter
            </h1>

            <div className="flex flex-col gap-4">
                <input
                    className="border p-3 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    className="border p-3 rounded min-h-[120px]"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="bg-black text-white p-3 rounded"
                >
                    {loading ? "Updating..." : "Update"}
                </button>
            </div>
        </div>
    );
}