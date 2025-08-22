import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import Tag from "@/components/ui/Tag";

import { checkEnrollment, getCourse } from "@/lib/api/course";
import { getTeacherById } from "@/lib/api/user";
import { getVideosById } from "@/lib/api/video";
import { getBooksByCourseId } from "@/lib/api/book";
import { getAssignmentsByCourseId } from "@/lib/api/assignment";
import { getExamsByCourseId } from "@/lib/api/exam";
import { Award, Book, BookTypeIcon, Download, Video } from "lucide-react";
import Image from "next/image";

import { format } from "timeago.js";
import { Link } from "@/i18n/routing";
import { redirect } from "@/i18n/routing";
import { cookies } from "next/headers";
import { getLocale, getTranslations } from "next-intl/server";

const PrivateCoursePage = async ({
    params,
}: {
    params: Promise<{ courseId: string }>;
}) => {
    const { courseId } = await params;
    const cookiesStore = await cookies();
    const userId = JSON.parse(cookiesStore.get("user")?.value || "")?.id;

    const locale = await getLocale();
    const t = await getTranslations("STUDENT_DASHBOARD.COURSES");

    const course: CourseType | null = await getCourse(courseId);
    const isEnrolled: boolean = await checkEnrollment(userId, courseId);

    if (!isEnrolled) {
        redirect({ href: "/dashboard/student/courses", locale });
    }

    // Fetch the rest of the content
    const videos: Video[] = await getVideosById(courseId);
    const books: Book[] = await getBooksByCourseId(courseId);
    const homeworks: Assignment[] = await getAssignmentsByCourseId(courseId);
    const exams: Exam[] = await getExamsByCourseId(courseId);
    const teacher = await getTeacherById(course?.teacher_id || "");

    return (
        <section>
            <header className="mb-6">
                <ul className="mb-6 flex items-center gap-2">
                    <li>
                        <Tag color="green">{course?.category}</Tag>
                    </li>
                    <li>
                        <Tag color="yellow">{course?.school_year}</Tag>
                    </li>
                </ul>
                <h1 className="mb-2 text-4xl font-semibold">{course?.title}</h1>
                <p className="p-lead max-w-[65ch]">{t("by")}: {teacher?.full_name}</p>
                <p className="p-lead mt-4 max-w-[65ch]">
                    {course?.description}
                </p>
            </header>
            <hr />
            <main className="my-6">
                {/* Videos */}
                <section>
                    <h2 className="bg-primary flex items-center gap-2 rounded-lg border-b p-6 text-xl font-semibold dark:bg-purple-950">
                        <Video className="inline" size={28} /> {t("content.videos")}
                    </h2>
                    <div className="mb-6 grid grid-cols-1 gap-4 rounded-lg border p-6 md:grid-cols-2 lg:grid-cols-4">
                        {videos?.length > 0 ? (
                            videos?.map(
                                ({
                                    id,
                                    title,
                                    thumbnail,
                                    views,
                                    created_at,
                                }: Video) => (
                                    <Card className="video-card" key={id}>
                                        <CardHeader className="video-thumbnail">
                                            <Image
                                                src={thumbnail}
                                                alt={title}
                                                width={500}
                                                height={500}
                                            />
                                        </CardHeader>
                                        <CardContent className="video-info">
                                            <CardTitle>{title}</CardTitle>
                                            <ul className="flex items-center gap-1 gap-y-6 text-gray-400">
                                                <li className="text-sm">
                                                    {views} {t("content.views")}
                                                </li>
                                                <span className="text-gray-400">
                                                    |
                                                </span>
                                                <li className="text-sm">
                                                    {format(created_at)}
                                                </li>
                                            </ul>
                                            <Button
                                                className="mt-2"
                                                variant="outline"
                                            >
                                                <Link
                                                    href={`/dashboard/student/courses/${courseId}/videos/${id}`}
                                                >
                                                    {t("content.watch")}
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ),
                            )
                        ) : (
                            <p className="p-lead">{t("content.no_videos")}</p>
                        )}
                    </div>
                </section>

                {/* Assignments */}
                <section>
                    <h2 className="bg-primary flex items-center gap-2 rounded-lg border-b p-6 text-xl font-semibold dark:bg-purple-950">
                        <BookTypeIcon className="inline" size={28} />{" "}
                        {t("content.assignments")}
                    </h2>
                    <div className="mb-6 space-y-4 rounded-lg border p-6">
                        {(homeworks?.length ?? 0 > 0) ? (
                            homeworks?.map(({ id, title }: Assignment) => (
                                <Card
                                    className="flex flex-row items-center justify-between"
                                    key={id}
                                >
                                    <CardHeader className="flex-1">
                                        <CardTitle>{title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Button
                                            className="mt-2"
                                            variant="outline"
                                        >
                                            <Link
                                                href={`/dashboard/student/courses/${courseId}/assignments/${id}`}
                                            >
                                                {t("content.start_assignment")}
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p className="p-lead">{t("content.no_assignments")}</p>
                        )}
                    </div>
                </section>

                {/* Exams */}
                <section>
                    <h2 className="bg-primary flex items-center gap-2 rounded-lg border-b p-6 text-xl font-semibold dark:bg-purple-950">
                        <Award className="inline" size={28} /> {t("content.exams")}
                    </h2>
                    <div className="mb-6 space-y-4 rounded-lg border p-6">
                        {(exams?.length ?? 0 > 0) ? (
                            exams?.map(({ id, title }: Exam) => (
                                <Card
                                    key={id}
                                    className="flex flex-row items-center justify-between"
                                >
                                    <CardHeader className="flex-1">
                                        <CardTitle>{title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Button
                                            variant="outline"
                                            className="mt-2"
                                            asChild
                                        >
                                            <Link
                                                href={`/dashboard/student/courses/${courseId}/exams/${id}`}
                                            >
                                                {t("content.start_exam")}
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p className="p-lead">{t("content.no_exams")}</p>
                        )}
                    </div>
                </section>

                {/* Books */}
                <section>
                    <h2 className="bg-primary flex items-center gap-2 rounded-lg border-b p-6 text-xl font-semibold dark:bg-purple-950">
                        <Book className="inline" size={28} /> {t("content.books")}
                    </h2>
                    <div className="mb-6 space-y-4 rounded-lg border p-6">
                        {books?.length > 0 ? (
                            books?.map(({ id, title }: Book) => (
                                <Card
                                    className="flex flex-row items-center justify-between"
                                    key={id}
                                >
                                    <CardHeader className="flex-1">
                                        <CardTitle>{title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Button
                                            className="mt-2"
                                            variant="outline"
                                        >
                                            <Download />
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p className="p-lead">{t("content.no_books")}</p>
                        )}
                    </div>
                </section>
            </main>
        </section>
    );
};

export default PrivateCoursePage;
