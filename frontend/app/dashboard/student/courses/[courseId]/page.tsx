import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import Tag from "@/components/ui/Tag";

import { getCourse } from "@/lib/api/course";
import { getTeacherById } from "@/lib/api/user";
import { getVideosById, getVideoById } from "@/lib/api/video";
import { getBooksByCourseId } from "@/lib/api/book";
import { getAssignmentsByCourseId } from "@/lib/api/exam";
import { getExamsByCourseId } from "@/lib/api/exam";
import { Award, Book, BookTypeIcon, Download, Video } from "lucide-react";
import Image from "next/image";

import { format } from "timeago.js";
import Link from "next/link";

const PrivateCoursePage = async ({
    params,
}: {
    params: Promise<{ courseId: string }>;
}) => {
    const { courseId } = await params;
    const course: CourseType | null = await getCourse(courseId);

    const { id, title, description, teacher_id, category, school_year } =
        course || {};

    const teacher = await getTeacherById(teacher_id || "");

    // Fetch the rest of the content
    const videos: Video[] = await getVideosById(courseId);
    const books: Book[] = await getBooksByCourseId(courseId);
    const assignments: Exam[] = await getAssignmentsByCourseId(courseId);
    const exams: Exam[] = await getExamsByCourseId(courseId);

    return (
        <>
            <section className="p-4">
                <header className="mb-6">
                    <h1 className="mb-2 text-4xl font-semibold">{title}</h1>
                    <p className="p-lead max-w-[65ch]">
                        by: {teacher?.full_name}
                    </p>
                </header>
                <hr />
                <main className="my-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                    <section className="col-span-2 flex flex-col gap-12">
                        {/* Videos */}
                        <section>
                            <h2 className="bg-primary rounded-2xl border-b p-4 text-2xl font-semibold dark:bg-purple-950">
                                <Video className="inline" size={36} /> Videos
                            </h2>
                            <div className="mb-6 grid grid-cols-3 gap-4 rounded-2xl border p-4">
                                {videos?.length > 0 ? (
                                    videos?.map(
                                        ({
                                            id,
                                            title,
                                            thumbnail,
                                            views,
                                            created_at,
                                        }: Video) => (
                                            <Card
                                                className="video-card"
                                                key={id}
                                            >
                                                <CardHeader className="video-thumbnail">
                                                    <Image
                                                        src={thumbnail}
                                                        alt={title}
                                                        width={500}
                                                        height={500}
                                                    />
                                                </CardHeader>
                                                <CardContent className="video-info">
                                                    <CardTitle>
                                                        {title}
                                                    </CardTitle>
                                                    <ul className="flex items-center gap-1 gap-y-6 text-gray-400">
                                                        <li className="text-sm">
                                                            {views} views
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
                                                            Watch Video
                                                        </Link>
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        ),
                                    )
                                ) : (
                                    <p className="p-lead">No videos found</p>
                                )}
                            </div>
                        </section>

                        {/* Books */}
                        <section>
                            <h2 className="bg-primary rounded-2xl border-b p-4 text-2xl font-semibold dark:bg-purple-950">
                                <Book className="inline" size={36} /> Books
                            </h2>
                            <div className="mb-6 space-y-4 rounded-2xl border p-4">
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
                                    <p className="p-lead">No books found</p>
                                )}
                            </div>
                        </section>

                        {/* Assignments */}
                        <section>
                            <h2 className="bg-primary rounded-2xl border-b p-4 text-2xl font-semibold dark:bg-purple-950">
                                <BookTypeIcon className="inline" size={36} />{" "}
                                Assignments
                            </h2>
                            <div className="mb-6 space-y-4 rounded-2xl border p-4">
                                {assignments.length > 0 ? (
                                    assignments?.map(({ id, title }: Exam) => (
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
                                                    Do homework
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))
                                ) : (
                                    <p className="p-lead">
                                        No assignments found
                                    </p>
                                )}
                            </div>
                        </section>

                        {/* Exams */}
                        <section>
                            <h2 className="bg-primary rounded-2xl border-b p-4 text-2xl font-semibold dark:bg-purple-950">
                                <Award className="inline" size={36} /> Exams
                            </h2>
                            <div className="mb-6 space-y-4 rounded-2xl border p-4">
                                {exams?.length > 0 ? (
                                    exams?.map(
                                        ({
                                            id,
                                            title,
                                            marks,
                                            questions,
                                        }: Exam) => (
                                            <Card
                                                key={id}
                                                className="flex flex-row items-center justify-between"
                                            >
                                                <CardHeader className="flex-1">
                                                    <CardTitle>
                                                        {title}
                                                    </CardTitle>
                                                    <CardDescription>
                                                        {marks} marks |{" "}
                                                        {questions.length}{" "}
                                                        questions
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <Button
                                                        variant="outline"
                                                        className="mt-2"
                                                    >
                                                        Start Exam
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        ),
                                    )
                                ) : (
                                    <p className="p-lead">No exams found</p>
                                )}
                            </div>
                        </section>
                    </section>
                    <aside className="bg-primary-foreground flex flex-col gap-2 rounded-xl border p-6 md:col-start-3">
                        {/* Category */}
                        <div className="flex items-center justify-between">
                            <h2 className="mb-2 text-xl font-semibold dark:text-black">
                                Category
                            </h2>
                            <Tag color="green">{category}</Tag>
                        </div>
                        {/* School Year */}
                        <div className="flex items-center justify-between">
                            <h2 className="mb-2 text-xl font-semibold dark:text-black">
                                School Year
                            </h2>
                            <Tag color="yellow">{school_year}</Tag>
                        </div>
                        {/* Description */}
                        <div>
                            <h2 className="mb-2 text-xl font-semibold dark:text-black">
                                Description
                            </h2>
                            <p className="p-lead max-w-[65ch] text-sm !text-white">
                                {description}
                            </p>
                        </div>
                    </aside>
                </main>
                <footer></footer>
            </section>
        </>
    );
};

export default PrivateCoursePage;
