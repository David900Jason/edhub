"use client";

import { cn } from "@/lib/utils";
import { GraduationCap, Users } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Page() {
    const router = useRouter();
    const [role, setRole] = useState<string>("");
    const handleRole = (role: string) => {
        setRole(role === "instructor" ? "teacher" : role);
        router.push(`/auth/signup/${role}`);
    };
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-20 px-6 py-16">
            <header>
                <h1 className="text-3xl font-semibold">Welcome to Edhub</h1>
                <p className="text-center text-lg text-gray-500">
                    Choose your role to sign up
                </p>
            </header>
            {/* Roles */}
            <div className="grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div
                    aria-label="Student"
                    onClick={() => setRole("student")}
                    className={cn(
                        "flex flex-col items-center gap-2 rounded-2xl border-2 p-6 text-center transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gray-100 hover:shadow-lg",
                        role === "student" && "border-purple-500",
                    )}
                >
                    <div className="w-fit rounded-full bg-purple-500 p-5">
                        <Users className="text-white" size={48} />
                    </div>
                    <h3 className="mt-2 text-xl font-semibold">Student</h3>
                    <p className="max-w-[20ch] text-sm text-gray-500">
                        Sign up as a student and start learning
                    </p>
                </div>
                <div
                    aria-label="Teacher"
                    onClick={() => setRole("teacher")}
                    className={cn(
                        "flex flex-col items-center gap-2 rounded-2xl border-2 p-6 text-center transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gray-100 hover:shadow-lg",
                        role === "teacher" && "border-secondary",
                    )}
                >
                    <div className="bg-secondary w-fit rounded-full p-5">
                        <GraduationCap className="text-white" size={48} />
                    </div>
                    <h3 className="mt-2 text-xl font-semibold">Teacher</h3>
                    <p className="max-w-[20ch] text-sm text-gray-500">
                        Sign up as a teacher and start teaching
                    </p>
                </div>
                <div
                    aria-label="Instructor"
                    onClick={() => setRole("instructor")}
                    className={cn(
                        "flex flex-col items-center gap-2 rounded-2xl border-2 p-6 text-center transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gray-100 hover:shadow-lg",
                        role === "instructor" && "border-sky-500",
                    )}
                >
                    <div className="w-fit rounded-full bg-sky-500 p-5">
                        <GraduationCap className="text-white" size={48} />
                    </div>
                    <h3 className="mt-2 text-xl font-semibold">Instructor</h3>
                    <p className="max-w-[20ch] text-sm text-gray-500">
                        Sign up as an instructor and start teaching
                    </p>
                </div>
            </div>
            <div className="flex gap-2">
                {/* Back Button */}
                <Button variant="outline" onClick={() => router.back()}>
                    Back
                </Button>
                {/* Next Button */}
                <Button
                    className="btn-primary"
                    onClick={() => handleRole(role)}
                >
                    Start now
                </Button>
            </div>
        </div>
    );
};
