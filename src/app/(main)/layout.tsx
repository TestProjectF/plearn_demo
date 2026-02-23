import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import LogoutButton from "../components/LogoutButton";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-black text-white p-4 flex justify-between items-center">
        <div className="flex gap-6">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/chapters">Chapters</Link>

          {session.user.role === "ADMIN" && (
            <Link href="/admin/chapters">
              Manage Chapters
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span>{session.user.email}</span>
          <LogoutButton />
        </div>
      </nav>

      <main className="p-8">{children}</main>
    </div>
  );
}