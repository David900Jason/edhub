"use client";

import { useEffect, useState } from "react";
import { StudentDataTable } from "./student-data-table";
import { useTranslations } from "next-intl";
import { getMyStudents } from "@/lib/api/user";

export type StudentData = {
    birth_date: string;
    city: string;
    created_at: string;
    email: string;
    full_name: string;
    phone_number: string;
    parent_number: string;
    profile: string | null;
    role?: string;
    enrolled_courses?: string[];
}

export default function TeacherStudents() {
    const t = useTranslations("TEACHER_DASHBOARD.STUDENTS");
    const [studentsData, setStudentsData] = useState<StudentData[]>([]);

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await getMyStudents();
            setStudentsData(response as StudentData[] || []);
        };
        fetchStudents();
    }, [setStudentsData]);

    return (
        <section>
            <header className="mb-8">
                <h1 className="text-3xl font-semibold">{t("title")}</h1>
                <p className="p-lead">
                    {t("description")}
                </p>
            </header>
            <main className="overflow-hidden rounded-2xl border p-6">
                <StudentDataTable data={studentsData} />
            </main>
        </section>
    );
}
