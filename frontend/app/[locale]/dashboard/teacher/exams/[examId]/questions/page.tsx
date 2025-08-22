"use client";

import { getExamById, deleteQuestionFromExam } from "@/lib/api/exam";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { Plus, Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTranslations } from "next-intl";

interface Answer {
    answer_text: string;
    is_correct: boolean;
}

const ExamQuestionsPage = () => {
    const router = useRouter();
    const t = useTranslations("TEACHER_DASHBOARD.EXAMS.QUESTIONS")
    const { examId }: { examId: string } = useParams();
    const [exam, setExam] = useState<Exam | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [questionToDelete, setQuestionToDelete] = useState<number | null>(
        null,
    );

    const fetchExam = async () => {
        try {
            setIsLoading(true);
            const examData = await getExamById(examId);
            setExam(examData);
        } catch (error) {
            console.error("Failed to fetch exam:", error);
            toast("Failed to load exam questions. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchExam();
    }, [examId]);

    const handleDeleteQuestion = async (questionIndex: number) => {
        setQuestionToDelete(questionIndex);
        setDeleteDialogOpen(true);
    };

    const confirmDeleteQuestion = async () => {
        if (questionToDelete === null || !exam?.questions) return;
        if (questionToDelete === null || !exam?.questions) return;

        try {
            const success = await deleteQuestionFromExam(
                examId,
                questionToDelete,
            );
            if (success) {
                toast("Question deleted successfully.");
                // Refresh the exam data
                await fetchExam();
            } else {
                throw new Error("Failed to delete question");
            }
        } catch (error) {
            console.error("Failed to delete question:", error);
            toast("Failed to delete question. Please try again.");
        } finally {
            setDeleteDialogOpen(false);
            setQuestionToDelete(null);
        }
    };

    return (
        <section>
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold">
                        {exam?.title} {t("title")}
                    </h1>
                    <p className="p-lead">{t("description")}</p>
                </div>
                <Button asChild className="btn btn-primary">
                    <Link
                        href={`/dashboard/teacher/exams/${examId}/questions/new`}
                    >
                        <Plus className="h-4 w-4" /> {t("cta")}
                    </Link>
                </Button>
            </header>
            <div className="space-y-6">
                {(exam?.questions?.length ?? 0 > 0) ? (
                    exam?.questions.map(
                        (question: QuestionBase, index: number) => (
                            <div
                                key={index}
                                className="group bg-card relative overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="mb-2 flex items-center space-x-2">
                                                <span className="bg-primary/10 text-primary inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium">
                                                    {index + 1}
                                                </span>
                                                <h2 className="text-foreground text-xl font-semibold">
                                                    {question.question_text}
                                                </h2>
                                            </div>

                                            {question.type ===
                                            "multiple_choice" ? (
                                                <ul className="mt-4 space-y-2">
                                                    {question.answers?.map(
                                                        (
                                                            answer,
                                                            answerIndex,
                                                        ) => (
                                                            <li
                                                                key={
                                                                    answerIndex
                                                                }
                                                            >
                                                                <div
                                                                    className={cn(
                                                                        "flex items-center space-x-3 rounded-lg border p-4 transition-colors",
                                                                        answer.is_correct
                                                                            ? "border-green-300 bg-green-50 dark:bg-green-900/20"
                                                                            : "hover:bg-accent/50",
                                                                    )}
                                                                >
                                                                    <div
                                                                        className={cn(
                                                                            "flex h-5 w-5 items-center justify-center rounded-full border-2",
                                                                            answer.is_correct
                                                                                ? "border-green-500 bg-green-500 text-white"
                                                                                : "border-muted-foreground/30",
                                                                        )}
                                                                    >
                                                                        {answer.is_correct && (
                                                                            <svg
                                                                                className="h-3 w-3"
                                                                                fill="none"
                                                                                viewBox="0 0 24 24"
                                                                                stroke="currentColor"
                                                                            >
                                                                                <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={
                                                                                        2
                                                                                    }
                                                                                    d="M5 13l4 4L19 7"
                                                                                />
                                                                            </svg>
                                                                        )}
                                                                    </div>
                                                                    <span
                                                                        className={cn(
                                                                            "text-sm",
                                                                            answer.is_correct
                                                                                ? "font-medium text-green-700 dark:text-green-300"
                                                                                : "text-foreground",
                                                                        )}
                                                                    >
                                                                        {
                                                                            answer.answer_text
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            ) : (
                                                <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                                                    <h3 className="mb-2 text-sm font-medium text-green-800 dark:text-green-200">
                                                        {t("question_type[2]")}
                                                    </h3>
                                                    <div className="text-foreground rounded-md bg-white p-3 text-sm dark:bg-gray-800">
                                                        {question.model_answer ||
                                                            t("question_type[3]")}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="ml-4 flex space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-muted-foreground hover:text-primary h-8"
                                                onClick={() =>
                                                    router.push(
                                                        `/dashboard/teacher/exams/${examId}/questions/edit/${index}`,
                                                    )
                                                }
                                            >
                                                <Pencil className="h-4 w-4" />
                                                <span className="sr-only">
                                                    Edit
                                                </span>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-destructive hover:bg-destructive/10 hover:text-destructive h-8"
                                                onClick={() =>
                                                    handleDeleteQuestion(index)
                                                }
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">
                                                    Delete
                                                </span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-muted/20 text-muted-foreground border-t px-4 py-2 text-xs">
                                    {question.type === "multiple_choice"
                                        ? `${t("question_type[0]")} • ${question.answers?.length || 0} ${t("options")}`
                                        : t("question_type[1]")}
                                </div>
                            </div>
                        ),
                    )
                ) : (
                    <div className="border-muted-foreground/30 bg-muted/20 flex min-h-[60vh] flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 text-center">
                        <div className="bg-muted mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                            <svg
                                className="text-muted-foreground h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-foreground mt-4 text-lg font-medium">
                            {t("question_type[4]")}
                        </h3>
                        <p className="text-muted-foreground mt-2 text-sm">
                            {t("question_type[5]")}
                        </p>
                        <Button className="mt-6" asChild>
                            <Link
                                href={`/dashboard/teacher/exams/${examId}/questions/new`}
                            >
                                <Plus className="mr-2 h-4 w-4" /> {t("cta")}
                            </Link>
                        </Button>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t("question_type[6]")}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {t("question_type[7]")}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDeleteQuestion}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {t("cta2")}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </section>
    );
};

export default ExamQuestionsPage;

