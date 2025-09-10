"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/routing";
import { getTeachersFromEnrollments } from "@/lib/api/user";
import { useEffect, useMemo, useDeferredValue, useState } from "react";
import TeacherCard from "./_components/TeacherCard";
import { Eye } from "lucide-react";

const StudentTeachersPage = () => {
    const [teachers, setTeachers] = useState<UserType[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getTeachersFromEnrollments().then((res) => {
            setTeachers(res as UserType[]);
        });
    }, [setTeachers]);

    const deferredSearch = useDeferredValue(search);

    const filteredTeachers = useMemo(() => {
        return teachers.filter((teacher) => {
            return teacher.full_name
                .toLowerCase()
                .startsWith(deferredSearch.toLowerCase());
        });
    }, [deferredSearch, teachers]);

    return (
        <section>
            <header className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                <div>
                    <h1 className="text-center text-3xl font-semibold sm:text-start">
                        Teachers
                    </h1>
                    <p className="p-lead">
                        Check out the teachers you&apos;re enrolled with
                    </p>
                </div>
            </header>
            <main className="space-y-6 rounded-2xl border p-6">
                <aside className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search teachers..."
                        className="md:max-w-lg"
                    />
                    <div className="flex items-center gap-2">
                        <Button asChild variant="outline">
                            <Link href="/courses">
                                <Eye /> Courses
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/teachers">
                                <Eye /> Teachers
                            </Link>
                        </Button>
                    </div>
                </aside>
                {/* Teachers goes here */}
                {filteredTeachers && filteredTeachers.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredTeachers.map((teacher, idx) => {
                            return <TeacherCard key={idx} teacher={teacher} />;
                        })}
                    </div>
                ) : (
                    <div className="flex min-h-[40vh] items-center justify-center">
                        <p className="p-lead text-center">No teachers found</p>
                    </div>
                )}
            </main>
        </section>
    );
};

export default StudentTeachersPage;
