"use client";

import { Suspense, useState } from "react";
import { Book, BookTemplate, CircleQuestionMark, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import CreateQuestion from "../(qna)/CreateQuestion";
import Question from "../(qna)/Question";
import { Link } from "@/i18n/routing";

export default function VideoTabs({ video }: { video: Video | null }) {
    const t = useTranslations("STUDENT_DASHBOARD.COURSES.content");
    const [tab, setTab] = useState("description");

    return (
        <>
            {/* Tabs List */}
            <ul className="mb-6 flex items-center gap-4 bg-white dark:bg-black/50">
                <li
                    className={cn(
                        "flex cursor-pointer items-center gap-2 rounded-2xl border p-4 py-3",
                        tab === "description" && "bg-white dark:bg-black/50",
                    )}
                    onClick={() => setTab("description")}
                >
                    <BookTemplate /> {t("videos_tabs.description")}
                </li>
                <li
                    className={cn(
                        "flex cursor-pointer items-center gap-2 rounded-2xl border p-4 py-3",
                        tab === "qa" && "bg-white dark:bg-black/50",
                    )}
                    onClick={() => setTab("qa")}
                >
                    <CircleQuestionMark /> {t("videos_tabs.qa")} (
                    {video?.questions?.length ?? 0})
                </li>
                <li
                    className={cn(
                        "flex cursor-pointer items-center gap-2 rounded-2xl border p-4 py-3",
                        tab === "resources" && "bg-white dark:bg-black/50",
                    )}
                    onClick={() => setTab("resources")}
                >
                    <Book /> {t("videos_tabs.resources")} (
                    {video?.books?.length ?? 0})
                </li>
                <li
                    className={cn(
                        "flex cursor-pointer items-center gap-2 rounded-2xl border p-4 py-3",
                        tab === "quiz" && "bg-white dark:bg-black/50",
                    )}
                    onClick={() => setTab("quiz")}
                >
                    <CircleQuestionMark /> {t("videos_tabs.quiz")}
                </li>
            </ul>
            {/* Tabs Content */}
            <div className="flex min-h-[50vh] flex-col gap-4 rounded-2xl border bg-white p-6 dark:bg-black/50">
                {tab === "description" && (
                    <p className="p-lead">{video?.description}</p>
                )}
                {tab === "qa" && (
                    <div className="flex flex-col gap-4">
                        <CreateQuestion videoId={video?.id as string} />
                        <Suspense fallback={<p>Loading questions...</p>}>
                            {(video?.questions?.length ?? 0 > 0) ? (
                                video?.questions?.map((question: QnA) => (
                                    <Question
                                        key={question.id}
                                        question={question}
                                    />
                                ))
                            ) : (
                                <p className="p-lead text-center !text-lg">
                                    {t("videos_tabs.no_questions")}
                                </p>
                            )}
                        </Suspense>
                    </div>
                )}
                {tab === "resources" && (
                    <div className="flex flex-col gap-4">
                        <Suspense
                            fallback={
                                <p>{t("videos_tabs.loading_resources")}</p>
                            }
                        >
                            {(video?.books?.length ?? 0 > 0) ? (
                                video?.books?.map(
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
                                            className="flex flex-row items-center justify-between rounded-lg border p-4"
                                        >
                                            <h3>{title}</h3>
                                            <Button
                                                className="mt-2"
                                                variant="outline"
                                            >
                                                <Link
                                                    target="_blank"
                                                    href={book_url as string || ""}
                                                >
                                                    <Download />
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
                    <div className="flex flex-col gap-4">
                        {/* <Suspense
                            fallback={<p>{t("videos_tabs.loading_quizzes")}</p>}
                        >
                            {(quizzes?.length ?? 0 > 0) ? (
                                quizzes?.map(({ id, title }: Quiz) => (
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
                                                asChild
                                            >
                                                <Link
                                                    href={`/dashboard/student/courses/${video?.course_id}/videos/${video?.id}/quizzes/${id}`}
                                                >
                                                    <LogIn />
                                                    {t("videos_tabs.take_quiz")}
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <p className="p-lead">
                                    {t("videos_tabs.no_quizzes")}
                                </p>
                            )}
                        </Suspense> */}
                        <p className="p-lead">{t("videos_tabs.no_quizzes")}</p>
                    </div>
                )}
            </div>
        </>
    );
}
