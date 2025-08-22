import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getTeacherById } from "@/lib/api/user";
import { Button } from "@/components/ui/button";
import { getEnrollmentsByUserId } from "@/lib/api/course";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

const TeachersPage = async () => {
    const cookieStore = await cookies();
    const user = JSON.parse(cookieStore.get("user")?.value || "{}");

    const t = await getTranslations("STUDENT_DASHBOARD.TEACHERS");

    const enrollments: EnrollmentType[] | null = await getEnrollmentsByUserId(
        user.id,
    );
    const teachers = await Promise.all(
        enrollments?.map((enrollment) =>
            getTeacherById(enrollment.teacher_id),
        ) || [],
    );
    // Unique Teachers
    const uniqueTeachers = [
        ...new Map(teachers.map((teacher) => [teacher?.id, teacher])).values(),
    ];

    return (
        <section>
            <header className="mb-8">
                <h1 className="text-3xl font-semibold">{t("title")}</h1>
                <p className="p-lead">
                    {t("description")}
                </p>
            </header>
            <main className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {uniqueTeachers &&
                    uniqueTeachers.map((teacher) => (
                        <div
                            key={teacher?.id}
                            className="mb-4 flex flex-col items-center gap-5 rounded-lg border p-6"
                        >
                            <Image
                                src={teacher?.image || ""}
                                alt="user"
                                width={100}
                                height={100}
                                className="rounded-full"
                            />
                            <div className="text-center">
                                <h2 className="text-lg font-semibold">
                                    {teacher?.full_name}
                                </h2>
                                <p className="p-lead">
                                    <Link href={`tel:${teacher?.phone_number}`}>
                                        {teacher?.phone_number}
                                    </Link>
                                </p>
                                <p className="p-lead">{teacher?.city}</p>
                            </div>
                            <Button
                                variant="default"
                                className="btn-primary w-full"
                                asChild
                            >
                                <Link
                                    href={`/dashboard/student/teachers/${teacher?.id}`}
                                >
                                    {t("cta1")}
                                </Link>
                            </Button>
                        </div>
                    ))}
            </main>
        </section>
    );
};

export default TeachersPage;
