"use client";

import { useState, useEffect } from "react";
import { format } from "timeago.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, MessageSquare, Send } from "lucide-react";
import { useTranslations } from "next-intl";

interface Question {
    id: string;
    question_text: string;
    created_at: string;
    reply: {
        answer_text: string;
        teacher_id: string;
        created_at: string;
    } | null;
    user: {
        id: string;
        name: string;
        email: string;
    } | null;
    video: {
        id: string;
        title: string;
    } | null;
}

export default function TeacherQAPage() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyText, setReplyText] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const t = useTranslations("TEACHER_DASHBOARD.Q&A");

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/teacher/questions");
            if (!response.ok) throw new Error("Failed to fetch questions");
            const data = await response.json();
            setQuestions(data);
        } catch (error) {
            console.error("Error fetching questions:", error);
            toast.error("Failed to load questions");
        } finally {
            setLoading(false);
        }
    };

    const handleReply = (questionId: string) => {
        setReplyingTo(replyingTo === questionId ? null : questionId);
        if (replyingTo !== questionId) {
            setReplyText("");
        }
    };

    const submitReply = async (questionId: string) => {
        if (!replyText.trim()) {
            toast.error("Please enter a reply");
            return;
        }

        try {
            setSubmitting(true);
            const teacherId = "u3"; // In a real app, get this from auth context

            const response = await fetch(
                `/api/teacher/questions/${questionId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        answer_text: replyText,
                        teacher_id: teacherId,
                    }),
                },
            );

            if (!response.ok) throw new Error("Failed to submit reply");

            toast.success("Reply submitted successfully");
            setReplyingTo(null);
            setReplyText("");
            fetchQuestions(); // Refresh the questions list
        } catch (error) {
            console.error("Error submitting reply:", error);
            toast.error("Failed to submit reply");
        } finally {
            setSubmitting(false);
        }
    };

    const filteredQuestions = questions.filter(
        (question) =>
            question.question_text
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            question.user?.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            question.video?.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase()),
    );

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="text-primary h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <section>
            <header className="mb-8">
                <h1 className="text-3xl font-semibold">{t("title")}</h1>
                <p className="p-lead">{t("description")}</p>
            </header>

            <main className="mb-20 flex flex-col gap-6 rounded-2xl border p-6">
                <div>
                    <Input
                        placeholder={t("search_placeholder")}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-md"
                    />
                </div>
                {filteredQuestions.length === 0 ? (
                    <div className="py-20 border-dashed border-2 text-center rounded-lg dark:bg-black/30 p-6">
                        <MessageSquare className="text-muted-foreground mx-auto h-12 w-12" />
                        <h3 className="mt-2 text-lg font-medium">
                            {t("no_qa")}
                        </h3>
                        <p className="text-muted-foreground mt-1">
                            {t("no_qa2")}
                        </p>
                    </div>
                ) : (
                    filteredQuestions.map((question) => (
                        <div
                            key={question.id}
                            className="rounded-lg border p-6"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-muted-foreground text-sm">
                                        {question.user?.name || "Unknown user"}{" "}
                                        •{" "}
                                        {format(
                                            new Date(question.created_at),
                                            "MMM d, yyyy",
                                        )}
                                    </p>
                                    {question.video && (
                                        <p className="text-muted-foreground mb-2 text-sm">
                                            Video: {question.video.title}
                                        </p>
                                    )}
                                    <p className="mt-1 font-medium">
                                        {question.question_text}
                                    </p>
                                </div>
                                <Button
                                    variant={
                                        question.reply ? "outline" : "default"
                                    }
                                    size="sm"
                                    onClick={() => handleReply(question.id)}
                                >
                                    {question.reply ? "Edit Reply" : "Reply"}
                                </Button>
                            </div>

                            {question.reply && (
                                <div className="border-primary mt-4 bg-black/10 py-3 border-l-4 pl-4">
                                    <div className="text-muted-foreground flex items-center text-sm">
                                        <span>
                                            Your reply •{" "}
                                            {format(
                                                new Date(
                                                    question.reply.created_at,
                                                ),
                                                "MMM d, yyyy",
                                            )}
                                        </span>
                                    </div>
                                    <p className="mt-1">
                                        {question.reply.answer_text}
                                    </p>
                                </div>
                            )}

                            {replyingTo === question.id && (
                                <div className="mt-4">
                                    <Textarea
                                        placeholder="Type your reply here..."
                                        value={replyText}
                                        onChange={(e) =>
                                            setReplyText(e.target.value)
                                        }
                                        className="mb-2"
                                        rows={3}
                                    />
                                    <div className="flex justify-end space-x-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => setReplyingTo(null)}
                                            disabled={submitting}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                submitReply(question.id)
                                            }
                                            disabled={
                                                !replyText.trim() || submitting
                                            }
                                        >
                                            {submitting ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Submitting...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="mr-2 h-4 w-4" />
                                                    Submit Reply
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </main>
        </section>
    );
}

