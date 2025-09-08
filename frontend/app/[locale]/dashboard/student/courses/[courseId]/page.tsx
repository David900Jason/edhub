"use client";

import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { getEnrollmentById } from "@/lib/api/course";
import Tag from "@/components/ui/Tag";
import { Book, Download, Home, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoCard from "../_components/VideoCard";
import { format } from "timeago.js";
import { Link } from "@/i18n/routing";
import { toast } from "sonner";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
            if (enrollment.detail) {
                toast.error(enrollment.detail);
            }
            setCourse(enrollment);
        };
        fetchCourse();
    }, [courseId]);

    return (
        <section>
            <nav className="mb-6 flex items-center gap-2">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link
                                className="flex items-center gap-2"
                                href={"/dashboard"}
                            >
                                <Home size={16} />
                                Home
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>...</BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link
                                className="flex items-center gap-2"
                                href={"/dashboard/student/courses"}
                            >
                                <Video size={16} />
                                Courses
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                {course?.course?.title}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </nav>
            <header className="mb-8 border-b pb-8">
                <ul className="mb-4 flex items-center gap-2">
                    <li>
                        <Tag color="purple">{course?.course?.category}</Tag>
                    </li>
                    <li>
                        <Tag color="yellow">
                            {course?.course?.teacher?.full_name}
                        </Tag>
                    </li>
                </ul>
                <div>
                    <h1 className="text-3xl font-semibold">
                        {course?.course?.title}
                    </h1>
                    <p className="mt-2 text-sm text-gray-400 italic">
                        Created: {format(course?.course?.created_at as string)}
                    </p>
                    <p className="p-lead mt-6 max-w-[85ch]">
                        {course?.course?.description}
                    </p>
                </div>
            </header>
            <main className="space-y-12">
                {/* Videos section */}
                <section className="bg-card rounded-2xl border p-6">
                    <div className="mb-8 flex items-center justify-between gap-3">
                        <div className="flex w-max items-center gap-2">
                            <span className="bg-primary/15 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                                <Video size={24} />
                            </span>
                            <h2 className="text-2xl font-bold tracking-tight">
                                Videos
                            </h2>
                        </div>
                        <Tag color="purple">
                            {course?.videos?.length || 0} videos
                        </Tag>
                    </div>

                    {course?.videos?.length ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            <Suspense
                                fallback={Array(4)
                                    .fill(0)
                                    .map((_, i) => (
                                        <div
                                            key={i}
                                            className="bg-muted/50 h-48 animate-pulse rounded-lg"
                                        />
                                    ))}
                            >
                                {course.videos.map((video: Video) => (
                                    <VideoCard
                                        key={video.id}
                                        video={video as Video}
                                        className="transition-transform hover:scale-[1.02]"
                                    />
                                ))}
                            </Suspense>
                        </div>
                    ) : (
                        <div className="border-muted-foreground/25 flex min-h-[50vh] flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
                            <Video className="text-muted-foreground/50 mb-4 h-12 w-12" />
                            <h3 className="mb-1 text-lg font-medium">
                                No videos available yet
                            </h3>
                            <p className="text-muted-foreground max-w-md text-sm">
                                This course doesn&apos;t have any videos uploaded
                                yet. Please check back later.
                            </p>
                        </div>
                    )}
                </section>

                {/* Books section */}
                <section className="bg-card rounded-2xl border p-6">
                    <div className="mb-8 flex items-center justify-between gap-3">
                        <div className="flex w-max items-center gap-2">
                            <span className="bg-primary/15 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                                <Book size={24} />
                            </span>
                            <h2 className="text-2xl font-bold tracking-tight">
                                Resource
                            </h2>
                        </div>
                        <Tag color="purple">
                            {course?.books?.length || 0} resources
                        </Tag>
                    </div>

                    {course?.books?.length ? (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {course.books.map(
                                (book: {
                                    id: string;
                                    title: string;
                                    book_url: string | File;
                                }) => (
                                    <div
                                        key={book.id}
                                        className="group bg-card hover:bg-accent/50 relative overflow-hidden rounded-lg border p-5 transition-all hover:shadow-sm"
                                    >
                                        <div className="flex flex-col">
                                            <h3 className="line-clamp-2 font-medium">
                                                {book.title}
                                            </h3>
                                            <div className="mt-4 flex items-center justify-between">
                                                <span className="text-muted-foreground text-sm">
                                                    {typeof book.book_url ===
                                                        "string" &&
                                                        book.book_url
                                                            .split(".")
                                                            .pop()
                                                            ?.toUpperCase() +
                                                            " File"}
                                                </span>
                                                <Button
                                                    asChild
                                                    variant="ghost"
                                                    size="sm"
                                                    className="gap-2"
                                                >
                                                    <Link
                                                        target="_blank"
                                                        href={
                                                            book.book_url as string
                                                        }
                                                        className="group-hover:text-primary"
                                                    >
                                                        <Download size={16} />
                                                        <span>Download</span>
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    ) : (
                        <div className="border-muted-foreground/25 flex min-h-[50vh] flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
                            <Book className="text-muted-foreground/50 mb-4 h-12 w-12" />
                            <h3 className="mb-1 text-lg font-medium">
                                No materials available
                            </h3>
                            <p className="text-muted-foreground max-w-md text-sm">
                                This course doesn&apos;t have any learning
                                materials uploaded yet.
                            </p>
                        </div>
                    )}
                </section>
            </main>
        </section>
    );
};

export default PrivateCoursePage;
