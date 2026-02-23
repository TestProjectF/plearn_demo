"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateChapterPage() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCreate = async () => {
        if (!title.trim() || !content.trim()) {
            setError("All fields are required");
            return;
        }

        setLoading(true);
        setError("");

        const res = await fetch("/api/chapters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, content }),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.error || "Something went wrong");
            setLoading(false);
            return;
        }

        router.push("/admin/chapters");
    };

    return (
        <div className="max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">
                Create Chapter
            </h1>

            <div className="flex flex-col gap-4 bg-white p-6 rounded shadow">
                <input
                    className="border p-3 rounded"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    className="border p-3 rounded min-h-[120px]"
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}

                <button
                    onClick={handleCreate}
                    disabled={loading}
                    className="bg-black text-white p-3 rounded"
                >
                    {loading ? "Creating..." : "Create"}
                </button>
            </div>
        </div>
    );
}