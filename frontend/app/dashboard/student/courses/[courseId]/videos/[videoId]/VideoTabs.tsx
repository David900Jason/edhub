"use client";

import { Suspense, useEffect, useState } from "react";
import {
    Book,
    BookTemplate,
    CircleQuestionMark,
    Download,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getVideoBooks, getVideoQuestions } from "@/lib/api/video";
import { cn } from "@/lib/utils";
import Question from "./(qna)/Question";
import CreateQuestion from "./(qna)/CreateQuestion";

export default function VideoTabs({
    video,
    currentUser,
}: {
    video: Video | null;
    currentUser: UserType | null;
}) {
    const [tab, setTab] = useState("description");
    const [resources, setResources] = useState<Book[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        const getVideoResources = async () => {
            const resources: Book[] = await getVideoBooks(video?.id || "");
            setResources(resources);
        };

        const getVideoQna = async () => {
            const questions: Question[] = await getVideoQuestions(
                video?.id || "",
            );
            setQuestions(questions);
        };

        if (tab === "resources") getVideoResources();
        if (tab === "qa") getVideoQna();
    }, [tab]);

    return (
        <>
            {/* Tabs List */}
            <ul className="mb-2 flex items-center gap-4 rounded-2xl border bg-black/50 p-4 shadow-lg">
                <li
                    className={cn(
                        "flex cursor-pointer items-center gap-2 rounded-2xl border p-4 py-3",
                        tab === "description" && "bg-black",
                    )}
                    onClick={() => setTab("description")}
                >
                    <BookTemplate /> Description
                </li>
                <li
                    className={cn(
                        "flex cursor-pointer items-center gap-2 rounded-2xl border p-4 py-3",
                        tab === "qa" && "bg-black",
                    )}
                    onClick={() => setTab("qa")}
                >
                    <CircleQuestionMark /> Q&A
                </li>
                <li
                    className={cn(
                        "flex cursor-pointer items-center gap-2 rounded-2xl border p-4 py-3",
                        tab === "resources" && "bg-black",
                    )}
                    onClick={() => setTab("resources")}
                >
                    <Book /> Resources
                </li>
            </ul>
            {/* Tabs Content */}
            <div className="flex min-h-[50vh] flex-col gap-4 rounded-2xl border bg-black/50 p-6">
                {tab === "description" && (
                    <p className="p-lead">
                        {/* <p className="p-lead">{video?.description}</p> */}
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Nobis maxime debitis, accusantium, dolore qui
                        repudiandae totam sunt earum sint doloribus unde nisi
                        consequuntur possimus voluptas suscipit ex fuga animi
                        temporibus ullam explicabo magnam molestiae impedit
                        harum cumque! Aliquid, totam? Totam distinctio at non
                        culpa. Ducimus quia deleniti voluptatum! Fugiat,
                        explicabo.
                    </p>
                )}
                {tab === "qa" && (
                    <div className="flex flex-col gap-4">
                        <CreateQuestion videoId={video?.id || ""} currentUser={currentUser} />
                        <Suspense fallback={<p>Loading questions...</p>}>
                            {questions?.length > 0 ? (
                                questions?.map((question: Question) => (
                                    <Question
                                        key={question.id}
                                        question={question}
                                        currentUser={currentUser}
                                    />
                                ))
                            ) : (
                                <p className="p-lead text-center !text-lg">
                                    No questions found
                                </p>
                            )}
                        </Suspense>
                    </div>
                )}
                {tab === "resources" && (
                    <div className="flex flex-col gap-4">
                        <Suspense fallback={<p>Loading Resources...</p>}>
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
                                <p className="p-lead">No books found</p>
                            )}
                        </Suspense>
                    </div>
                )}
            </div>
        </>
    );
}
