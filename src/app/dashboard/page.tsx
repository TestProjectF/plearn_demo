import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="p-10">
            <h1 className="text-xl font-bold">
                Welcome {session.user.email}
            </h1>

            <p className="mt-2">
                Role: {session.user.role}
            </p>

            <div className="mt-6">
                <LogoutButton />
            </div>
        </div>
    );
}