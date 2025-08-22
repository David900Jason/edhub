import { useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { updateQuizSession } from "@/lib/api/quiz";
import { cn } from "@/lib/utils";
import { CheckCircle, CircleCheck, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const QuizReview = ({
    quiz,
    quizSession,
}: {
    quiz: Quiz | null;
    quizSession: QuizSession | null;
}) => {
    const router = useRouter();
    const { score, total } = calculateScore();

    useEffect(() => {
        if (quizSession) {
            updateQuizSession(quizSession.id, {
                ...quizSession,
                score: score ? score : 0,
                max_score: total ? total : 0,
            });
        }

        if (quizSession?.ended_at === "") {
            toast("Quiz completed successfully", {
                duration: 2000,
                position: "top-center",
                icon: <CheckCircle className="h-5 w-5 text-green-500" />,
            });
        }
    }, []);

    const calculateTimeTaken = (start: string, end: string) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffInMs = endDate.getTime() - startDate.getTime();
        const diffInSeconds = Math.floor(diffInMs / 1000);
        const minutes = Math.floor(diffInSeconds / 60);
        const seconds = diffInSeconds % 60;
        const timeTaken = `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
        return timeTaken;
    };

    function calculateScore(): { score: number; total: number } {
        if (!quizSession?.answers?.length || !quiz?.questions?.length) {
            return { score: 0, total: 0 };
        }

        const result = quiz.questions.reduce(
            (acc, question, index) => {
                const userAnswer = quizSession.answers[index];

                if (!userAnswer) {
                    return acc; // Skip if no answer was provided
                }

                if (question.type === "multiple_choice") {
                    const correctAnswer = question.answers?.find(
                        (a) => a.is_correct,
                    );
                    if (correctAnswer?.answer_text === userAnswer.answer_text) {
                        acc.score += question.mark || 1; // Add question's mark if available, otherwise default to 1
                    }
                }
                // For essay questions, you might want to manually grade them
                // For now, we'll just add 0 points for essay questions

                acc.total += question.mark || 1; // Add to total possible score

                return acc;
            },
            { score: 0, total: 0 },
        );
        return result;
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center justify-between">
                    <p className="text-xl font-medium">Score:</p>
                    <p className="text-lg">
                        {score}/{total}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <p className="text-xl font-medium">Duration:</p>
                    <p className="text-lg">
                        {calculateTimeTaken(
                            quizSession?.created_at || "",
                            quizSession?.ended_at || "",
                        )}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <p className="text-xl font-medium">Questions:</p>
                    <p className="text-lg">
                        {quizSession?.answers?.length} out of{" "}
                        {quiz?.questions.length}
                    </p>
                </div>
            </div>

            <hr />

            <main className="flex flex-col gap-6">
                {quizSession?.answers?.length !== 0 &&
                    quiz?.questions.map((question, index) => {
                        const correctAnswer = question.answers?.find(
                            (answer) => answer.is_correct,
                        );
                        const isCorrectAnswer =
                            correctAnswer?.answer_text ===
                            quizSession?.answers[index]?.answer_text;
                        return (
                            <div
                                className="border-l-primary rounded-2xl border border-l-6 p-6"
                                key={index}
                            >
                                <header className="mb-4 flex items-start justify-between">
                                    <div>
                                        <p className="text-lg font-bold">
                                            Question {index + 1}
                                        </p>
                                        <p className="text-lg">
                                            {question.question_text}
                                        </p>
                                    </div>
                                    <div>
                                        {isCorrectAnswer ? (
                                            <CircleCheck className="h-6 w-6 text-green-500" />
                                        ) : (
                                            <CircleX className="h-6 w-6 text-red-500" />
                                        )}
                                    </div>
                                </header>
                                <main>
                                    <div className="mb-4 flex flex-col gap-2">
                                        <p className="mb-2">Your answer: </p>
                                        <p
                                            className={cn(
                                                "rounded-md bg-gray-500/20 p-3 text-lg",
                                                isCorrectAnswer
                                                    ? "text-green-500/40"
                                                    : "text-red-500/40",
                                            )}
                                        >
                                            {quizSession?.answers[index]
                                                ?.answer_text || ""}
                                        </p>
                                    </div>
                                    {!isCorrectAnswer &&
                                        question.type === "multiple_choice" && (
                                            <div>
                                                <p className="mb-2">
                                                    Correct answer:{" "}
                                                </p>
                                                <p
                                                    className={cn(
                                                        "rounded-md bg-gray-500/20 p-3 text-lg",
                                                        isCorrectAnswer
                                                            ? "text-green-500/40"
                                                            : "text-red-500/40",
                                                    )}
                                                >
                                                    {correctAnswer?.answer_text ||
                                                        ""}
                                                </p>
                                            </div>
                                        )}
                                    {question.type === "essay" && (
                                            <div>
                                                <p className="mb-2">
                                                    Model answer:{" "}
                                                </p>
                                                <p
                                                    className={cn(
                                                        "rounded-md bg-gray-500/20 p-3 text-lg",
                                                    )}
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            question.model_answer ||
                                                            "",
                                                    }}
                                                />
                                            </div>
                                        )}
                                </main>
                            </div>
                        );
                    })}
            </main>

            <footer className="flex justify-end">
                <Button className="btn-primary" onClick={() => router.back()}>
                    Back to Video
                </Button>
            </footer>
        </div>
    );
};

export default QuizReview;
