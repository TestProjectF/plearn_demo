"use client";

import { useState } from "react";

export default function AdminChaptersPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        if (!title.trim() || !content.trim()) {
            setMessage("Title and Content are required");
            return;
        }

        try {
            setLoading(true);
            setMessage("");

            const res = await fetch("/api/chapters", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, content }),
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.error || "Something went wrong");
                return;
            }

            setMessage("✅ Chapter created successfully");
            setTitle("");
            setContent("");
        } catch (error) {
            setMessage("Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-10">
            <h1 className="text-2xl font-bold mb-6">
                Admin – Create Chapter
            </h1>

            <div className="flex flex-col gap-4 bg-white shadow p-6 rounded-lg">
                <input
                    className="border p-3 rounded"
                    placeholder="Chapter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    className="border p-3 rounded min-h-[120px]"
                    placeholder="Chapter content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button
                    onClick={handleCreate}
                    disabled={loading}
                    className="bg-black text-white p-3 rounded hover:opacity-80 transition disabled:opacity-50"
                >
                    {loading ? "Creating..." : "Create Chapter"}
                </button>

                {message && (
                    <p className="text-sm mt-2 text-gray-700">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}