"use client";

import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { getEnrollmentById } from "@/lib/api/course";
import Tag from "@/components/ui/Tag";
import { Book, Download, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoCard from "../_components/VideoCard";
import { format } from "timeago.js";
import Link from "next/link";

type Video = {
    id: string;
    title: string;
    video_url?: string;
    thumbnail_url?: string;
    likes: number;
    views: number;
};

const PrivateCoursePage = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState<EnrollmentType | null>(null);

    useEffect(() => {
        const fetchCourse = async () => {
            const enrollment = await getEnrollmentById(courseId as string);
            console.log(enrollment);
            setCourse(enrollment);
        };
        fetchCourse();
    }, [courseId]);

    return (
        <section>
            <header className="mb-8 border-b pb-8">
                <ul className="mb-6 flex items-center gap-2">
                    <li>
                        <Tag color="green">{course?.course.category}</Tag>
                    </li>
                    <li>
                        <Tag color="red">
                            {course?.course.teacher?.full_name}
                        </Tag>
                    </li>
                </ul>
                <div>
                    <h1 className="text-3xl font-semibold">
                        {course?.course.title}
                    </h1>
                    <p className="p-lead mb-4">
                        Created: {format(course?.course.created_at as string)} |
                        Updated: {format(course?.course.updated_at as string)}
                    </p>
                    <p className="p-lead max-[85ch]">
                        {course?.course.description}
                    </p>
                </div>
            </header>
            <main className="space-y-10">
                {/* Videos section */}
                <section className="border-b pb-12">
                    <h2 className="mb-8 flex items-center gap-3 text-2xl font-semibold">
                        <span className="bg-primary/50 block rounded-full p-3">
                            <Video size={28} />
                        </span>
                        Videos
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <Suspense fallback={<p>Loading videos...</p>}>
                            {course?.videos?.map((video: Video) => (
                                <VideoCard
                                    key={video.id}
                                    video={video as Video}
                                />
                            ))}
                        </Suspense>
                    </div>
                </section>
                {/* Books section */}
                <section className="pb-12">
                    <h2 className="mb-8 flex items-center gap-3 text-2xl font-semibold">
                        <span className="bg-primary/50 block rounded-full p-3">
                            <Book size={28} />
                        </span>
                        Books
                    </h2>
                    <div className="space-y-4">
                        {course?.books?.map(
                            (book: {
                                id: string;
                                title: string;
                                book_url: string | File;
                            }) => (
                                <div
                                    key={book.id}
                                    className="flex flex-row items-center justify-between rounded-lg border p-4"
                                >
                                    <h3>{book.title}</h3>
                                    <Button
                                        asChild
                                        className="mt-2"
                                        variant="outline"
                                    >
                                        <Link
                                            target="_blank"
                                            href={book?.book_url as string}
                                        >
                                            <Download />
                                        </Link>
                                    </Button>
                                </div>
                            ),
                        )}
                    </div>
                </section>
            </main>
        </section>
    );
};

export default PrivateCoursePage;
