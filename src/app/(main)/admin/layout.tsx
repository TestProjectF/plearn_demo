import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
        redirect("/dashboard");
    }

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white p-6">
                <h2 className="text-xl font-bold mb-6">
                    Admin Panel
                </h2>

                <div className="flex flex-col gap-4">
                    <Link href="/admin/chapters">
                        Manage Chapters
                    </Link>

                    <Link href="/dashboard">
                        Back to Dashboard
                    </Link>
                </div>
            </aside>

            {/* Content */}
            <main className="flex-1 p-8 bg-gray-50">
                {children}
            </main>
        </div>
    );
}