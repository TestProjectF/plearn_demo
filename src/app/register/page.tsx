"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setError("");

        if (!email || !password || !confirm) {
            setError("Please fill all fields");
            return;
        }

        if (password !== confirm) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        const res = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
            setError(data.error || "Something went wrong");
            return;
        }

        router.push("/login");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Register
                </h1>

                <div className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="border p-2 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="border p-2 rounded-md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="border p-2 rounded-md"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                    />

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <button
                        onClick={handleRegister}
                        disabled={loading}
                        className="bg-black text-white p-2 rounded-md hover:bg-gray-800 transition disabled:opacity-50"
                    >
                        {loading ? "Creating account..." : "Register"}
                    </button>

                    <p className="text-sm text-center mt-2">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="text-blue-500 underline"
                        >
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}