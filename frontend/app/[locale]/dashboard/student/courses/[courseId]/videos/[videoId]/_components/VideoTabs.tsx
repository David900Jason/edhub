"use client";

import { Suspense, useState } from "react";
import {
    Book,
    BookTemplate,
    CircleQuestionMark,
    Download,
    Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import CreateQuestion from "../(qna)/CreateQuestion";
import { Question } from "../(qna)/Question";
import { Link } from "@/i18n/routing";
import { useParams } from "next/navigation";
import RelatedVideos from "./RelatedVideos";
import "./tabs.css";

interface Video {
    id: string | number;
    title: string;
    description: string;
    video_url: string;
    thumbnail_url: string;
    likes: number;
    views: number;
    created_at: string;
    course_id?: string;
    books?: Array<{
        id: string;
        title: string;
        book_url?: string;
    }>;
    questions?: QnA[];
    related_videos?: Array<{
        id: string;
        title: string;
    }>;
}

interface VideoTabsProps {
    video: Video | null;
}

export default function VideoTabs({ video }: VideoTabsProps) {
    const t = useTranslations("STUDENT_DASHBOARD.COURSES.content");
    const [questions, setQuestions] = useState(video?.questions);
    const [tab, setTab] = useState("description");
    const { courseId } = useParams();

    const tabs = [
        {
            id: "description",
            icon: <BookTemplate className="h-4 w-4" />,
            label: "Description",
            count: null,
        },
        {
            id: "qa",
            icon: <CircleQuestionMark className="h-4 w-4" />,
            label: "Q&A",
            count: video?.questions?.length ?? 0,
        },
        {
            id: "resources",
            icon: <Book className="h-4 w-4" />,
            label: "Resources",
            count: video?.books?.length ?? 0,
        },
        {
            id: "quiz",
            icon: <CircleQuestionMark className="h-4 w-4" />,
            label: t("videos_tabs.quiz"),
            count: null,
        },
        {
            id: "related",
            icon: <Play className="h-4 w-4" />,
            label: "Related Videos",
            count: video?.related_videos?.length ?? 0,
        },
    ];

    const handleQuestionDelete = (questionId: string) => {
        // Fast UI Updates
        video?.questions?.forEach((question) => {
            if (question.id === questionId) {
                setQuestions((prev) =>
                    prev?.filter((q) => q.id !== questionId),
                );
            }
        });
    };

    return (
        <div className="space-y-4">
            {/* Tabs List */}
            <div className="relative">
                <div className="tabs-scroll-container flex space-x-1">
                    {tabs.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setTab(item.id)}
                            className={cn(
                                "relative flex items-center gap-2 rounded-t-lg px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-200",
                                tab === item.id
                                    ? "text-primary bg-white shadow-sm dark:bg-gray-800"
                                    : "text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800/50",
                            )}
                        >
                            <span className="flex items-center gap-2">
                                {item.icon}
                                {item.label}
                                {item.count !== null && item.count > 0 && (
                                    <span className="bg-primary/10 text-primary flex h-5 w-5 items-center justify-center rounded-full text-xs">
                                        {item.count}
                                    </span>
                                )}
                            </span>
                        </button>
                    ))}
                </div>
                <div className="bg-border absolute bottom-0 h-[1px] w-full" />
            </div>

            {/* Tabs Content */}
            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900/50">
                {tab === "description" && (
                    <div className="min-h-[60vh] space-y-4">
                        <p className="text-gray-700 dark:text-gray-300">
                            {video?.description}
                        </p>
                    </div>
                )}
                {tab === "qa" && (
                    <div className="min-h-[60vh] space-y-6">
                        <div className="bg-card rounded-lg border p-4 shadow-sm">
                            <CreateQuestion videoId={video?.id as string} />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">
                                Questions & Answers
                            </h3>
                            <Suspense
                                fallback={
                                    <div className="space-y-4">
                                        {[1, 2, 3].map((i) => (
                                            <div
                                                key={i}
                                                className="bg-muted/50 h-24 animate-pulse rounded-lg"
                                            />
                                        ))}
                                    </div>
                                }
                            >
                                {questions && questions.length > 0 ? (
                                    questions.map((question) => (
                                        <Question
                                            key={question.id}
                                            question={question}
                                            onDelete={() =>
                                                handleQuestionDelete(
                                                    question.id,
                                                )
                                            }
                                        />
                                    ))
                                ) : (
                                    <p className="p-lead text-center !text-lg">
                                        {t("videos_tabs.no_questions")}
                                    </p>
                                )}
                            </Suspense>
                        </div>
                    </div>
                )}
                {tab === "resources" && (
                    <div className="min-h-[60vh] space-y-4">
                        <h3 className="text-lg font-medium">Study Resources</h3>
                        <Suspense
                            fallback={
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {[1, 2].map((i) => (
                                        <div
                                            key={i}
                                            className="bg-muted/50 h-20 animate-pulse rounded-lg"
                                        />
                                    ))}
                                </div>
                            }
                        >
                            {video?.books && video.books.length > 0 ? (
                                video.books.map(
                                    ({
                                        id,
                                        title,
                                        book_url,
                                    }: {
                                        id: string;
                                        title: string;
                                        book_url?: string;
                                    }) => (
                                        <div
                                            key={id}
                                            className="hover:border-primary/50 flex items-center justify-between rounded-lg border p-4 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
                                                    <Book className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium">
                                                        {title}
                                                    </h3>
                                                    <p className="text-muted-foreground text-sm">
                                                        PDF File
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                                asChild
                                            >
                                                <Link
                                                    target="_blank"
                                                    href={
                                                        (book_url as string) ||
                                                        ""
                                                    }
                                                    title="Download resource"
                                                >
                                                    <Download className="h-4 w-4" />
                                                    <span className="sr-only">
                                                        Download
                                                    </span>
                                                </Link>
                                            </Button>
                                        </div>
                                    ),
                                )
                            ) : (
                                <p className="p-lead">{t("no_books")}</p>
                            )}
                        </Suspense>
                    </div>
                )}
                {tab === "quiz" && (
                    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 py-8 text-center">
                        <div className="bg-primary/10 rounded-full p-4">
                            <CircleQuestionMark className="text-primary h-8 w-8" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">
                                No quizzes available
                            </h3>
                            <p className="text-muted-foreground">
                                {t("videos_tabs.no_quizzes")}
                            </p>
                        </div>
                    </div>
                )}

                {tab === "related" && (
                    <div className="min-h-[60vh] space-y-4">
                        <h3 className="text-lg font-medium">Related Videos</h3>
                        <Suspense
                            fallback={
                                <div className="space-y-3">
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className="flex items-center space-x-3 p-2"
                                        >
                                            <div className="bg-muted/50 h-16 w-28 flex-shrink-0 animate-pulse rounded-md" />
                                            <div className="w-full space-y-2">
                                                <div className="bg-muted/50 h-4 w-3/4 animate-pulse rounded" />
                                                <div className="bg-muted/50 h-3 w-1/2 animate-pulse rounded" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                        >
                            {video?.related_videos &&
                            video.related_videos.length > 0 ? (
                                <RelatedVideos
                                    videos={video.related_videos}
                                    currentVideoId={video.id}
                                    courseId={courseId as string}
                                />
                            ) : (
                                <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 py-8 text-center">
                                    <div className="bg-primary/10 rounded-full p-4">
                                        <Play className="text-primary h-6 w-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-medium">
                                            No related videos
                                        </h3>
                                        <p className="text-muted-foreground">
                                            There are no related videos
                                            available for this content.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </Suspense>
                    </div>
                )}
            </div>
        </div>
    );
}

