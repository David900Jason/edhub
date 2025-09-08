"use client";

import { cn } from "@/lib/utils";
import { GraduationCap, Users } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { motion, Variants } from "framer-motion";

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.15,
        },
    },
};

const item: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
            delay: i * 0.1,
        },
    }),
};

type RoleCard = {
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
    role: string;
};

export default function Page() {
    const router = useRouter();
    const [role, setRole] = useState<string>("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const ROLES_CARDS: RoleCard[] = [
        {
            icon: Users,
            title: "Student",
            description: "Sign up as a student and start learning",
            color: "border-purple-500 bg-purple-500",
            role: "student",
        },
        {
            icon: GraduationCap,
            title: "Teacher",
            description: "Sign up as a teacher and start teaching",
            color: "border-yellow-500 bg-yellow-500",
            role: "teacher",
        },
    ];

    const handleRole = (role: string) => {
        router.push(`/auth/signup/${role}`);
    };

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-20 overflow-hidden px-6 py-16">
            <header>
                <h1 className="text-3xl font-semibold">Welcome to Edhub</h1>
                <p className="text-center text-lg text-gray-500">
                    Choose your role to sign up
                </p>
            </header>
            {/* Roles */}
            <motion.div
                className="grid w-full max-w-4xl grid-cols-1 gap-8 lg:grid-cols-2"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {ROLES_CARDS.map((card) => {
                    const Icon = card.icon;
                    return (
                        <motion.div
                            key={card.role}
                            custom={ROLES_CARDS.indexOf(card)}
                            variants={item}
                            aria-label={card.title}
                            onClick={() => setRole(card.role)}
                            className={cn(
                                "flex flex-col items-center gap-2 rounded-2xl border p-8 text-center transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-gray-100 hover:shadow-lg dark:hover:bg-gray-800",
                                role === card.role && card.color.split(" ")[0],
                                "cursor-pointer",
                            )}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div
                                className={`w-fit rounded-full ${card.color.split(" ")[1]} p-5`}
                            >
                                <Icon className="text-white" size={48} />
                            </div>
                            <h3 className="mt-2 text-xl font-semibold">
                                {card.title}
                            </h3>
                            <p className="max-w-[20ch] text-sm text-gray-500">
                                {card.description}
                            </p>
                        </motion.div>
                    );
                })}
            </motion.div>
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
}

