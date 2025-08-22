"use client";

import { Suspense, useEffect, useState } from "react";
import {
    Book,
    BookTemplate,
    CircleQuestionMark,
    Download,
    LogIn,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getVideoBooks, getVideoQuestions } from "@/lib/api/video";
import { getQuizByVideoId } from "@/lib/api/quiz";
import { cn } from "@/lib/utils";
import Question from "../(qna)/Question";
import CreateQuestion from "../(qna)/CreateQuestion";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function VideoTabs({
    video,
    currentUser,
}: {
    video: Video | null;
    currentUser: UserType | null;
}) {
    const t =  useTranslations("STUDENT_DASHBOARD.COURSES.content");
    const [tab, setTab] = useState("description");
    const [resources, setResources] = useState<Book[]>([]);
    const [questions, setQuestions] = useState<QnA[]>([]);
    const [quizzes, setQuizzes] = useState<Quiz[]>();

    useEffect(() => {
        const getVideoResources = async () => {
            const resources: Book[] = await getVideoBooks(video?.id || "");
            setResources(resources);
        };

        const getVideoQnA = async () => {
            const questions: QnA[] = await getVideoQuestions(video?.id || "");
            setQuestions(questions);
        };

        const getVideoQuiz = async () => {
            const quizzes: Quiz[] = await getQuizByVideoId(video?.id || "");
            setQuizzes(quizzes);
            console.log(quizzes);
        };

        if (tab === "resources") getVideoResources();
        if (tab === "qa") getVideoQnA();
        if (tab === "quiz") getVideoQuiz();
    }, [tab]);

    return (
        <>
            {/* Tabs List */}
            <ul className="mb-2 flex items-center gap-4 rounded-2xl border bg-white p-4 shadow-lg dark:bg-black/50">
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
                    <CircleQuestionMark /> {t("videos_tabs.qa")}
                </li>
                <li
                    className={cn(
                        "flex cursor-pointer items-center gap-2 rounded-2xl border p-4 py-3",
                        tab === "resources" && "bg-white dark:bg-black/50",
                    )}
                    onClick={() => setTab("resources")}
                >
                    <Book /> {t("videos_tabs.resources")}
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
                        <CreateQuestion
                            videoId={video?.id || ""}
                            currentUser={currentUser}
                        />
                        <Suspense
                            fallback={
                                <p>{t("videos_tabs.loading_resources")}</p>
                            }
                        >
                            {questions?.length > 0 ? (
                                questions?.map((question: QnA) => (
                                    <Question
                                        key={question.id}
                                        question={question}
                                        currentUser={currentUser}
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
                            {resources?.length > 0 ? (
                                resources?.map(({ id, title }: Book) => (
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
                                <p className="p-lead">{t("no_books")}</p>
                            )}
                        </Suspense>
                    </div>
                )}
                {tab === "quiz" && (
                    <div className="flex flex-col gap-4">
                        <Suspense
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
                        </Suspense>
                    </div>
                )}
            </div>
        </>
    );
}





