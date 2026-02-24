"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditChapterPage() {
    const { id } = useParams();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

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
        const res = await fetch(`/api/chapters/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content }),
        });

        if (res.ok) {
            router.push("/admin/chapters");
        } else {
            alert("Update failed");
        }
    };

    return (
        <div className="max-w-xl mx-auto p-10">
            <h1 className="text-2xl font-bold mb-6">
                Edit Chapter
            </h1>

            <div className="flex flex-col gap-4 bg-white shadow p-6 rounded">
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
                    className="bg-black text-white p-3 rounded"
                >
                    Update
                </button>
            </div>
        </div>
    );
}