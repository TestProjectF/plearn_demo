"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="bg-red-500 px-3 py-1 rounded text-white hover:opacity-80"
        >
            Logout
        </button>
    );
}