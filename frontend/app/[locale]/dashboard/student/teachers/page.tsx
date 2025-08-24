"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getTeacherById } from "@/lib/api/user";
import { Button } from "@/components/ui/button";
import { getEnrollmentsByUserId } from "@/lib/api/course";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { refreshUser } from "@/lib/api/auth";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export type TeacherType = {
    id: string;
    full_name: string;
    email: string;
    city: string;
    phone_number: string;
    parent_number: string;
    profile_img: string;
};

const TeachersPage = () => {
    const [teachers, setTeachers] = useState<TeacherType[]>([]);
    const t = useTranslations("STUDENT_DASHBOARD.TEACHERS");

    // Fetch All users with role === teacher
    useEffect(() => {
        const getAllTeachers = async () => {
            const access = localStorage.getItem("access");

            try {
                const res = await api.get("/users/teachers", {
                    headers: {
                        Authorization: `Bearer ${access}`,
                    },
                });
                setTeachers(res.data);
            } catch (error: any) {
                if (error.status === 401) {
                    refreshUser();
                    getAllTeachers();
                }
            }
        };
        getAllTeachers();
    }, []);

    return (
        <section>
            <header className="mb-8">
                <h1 className="text-3xl font-semibold">{t("title")}</h1>
                <p className="p-lead">{t("description")}</p>
            </header>
            <main className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {teachers.map((teacher: TeacherType) => {
                    return (
                        <div className="flex min-h-[300px] flex-col rounded-2xl border p-6">
                            {teacher.profile_img ? (
                                <Image
                                    src={teacher.profile_img}
                                    alt={teacher.full_name}
                                    width={96}
                                    height={96}
                                    className="mx-auto rounded-full"
                                />
                            ) : (
                                <div className="mx-auto h-24 w-24 rounded-full bg-gray-200"></div>
                            )}
                            <div className="flex flex-1 flex-col gap-2 py-4 text-center">
                                <h2 className="text-lg font-semibold">
                                    {teacher.full_name}
                                </h2>
                                <p className="p-lead mt-[-5px] !text-[14px]">
                                    {teacher.city}
                                </p>
                                {
                                    teacher.phone_number && (
                                        <p className="p-lead mt-[-5px] !text-[14px]">
                                            <a href={`tel:+2${teacher.phone_number}`}>+2{teacher.phone_number}</a>
                                        </p>
                                    )
                                }
                                {
                                    teacher.parent_number && (
                                        <p className="p-lead mt-[-5px] !text-[14px]">
                                            <a href={`tel:+2${teacher.parent_number}`}>+2{teacher.parent_number}</a>
                                        </p>
                                    )
                                }
                            </div>
                            <div className="flex justify-center">
                                <Button variant="outline" asChild>
                                    <Link
                                        href={`/dashboard/student/teachers/${teacher.id}`}
                                    >
                                        {t("cta1")}
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </main>
        </section>
    );
};

export default TeachersPage;
