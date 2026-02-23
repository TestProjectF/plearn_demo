import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "../../components/LogoutButton";

export default function Dashboard() {
    return (
        <div>
            <h1 className="text-2xl font-bold">
                CNPM Learning Platform
            </h1>

            <p className="mt-4 text-gray-600">
                This platform helps students learn Software Engineering
                through Iterative Incremental development.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-6">
                <div className="bg-white p-6 shadow rounded">
                    <h2 className="font-semibold">Increment 1</h2>
                    <p className="text-sm mt-2">
                        Authentication & User Management
                    </p>
                </div>

                <div className="bg-white p-6 shadow rounded">
                    <h2 className="font-semibold">Increment 2</h2>
                    <p className="text-sm mt-2">
                        Course & Chapter Module
                    </p>
                </div>

                <div className="bg-white p-6 shadow rounded">
                    <h2 className="font-semibold">Increment 3</h2>
                    <p className="text-sm mt-2">
                        Iteration Learning Module
                    </p>
                </div>
            </div>
        </div>
    );
}