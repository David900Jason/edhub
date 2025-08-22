"use client";

import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Clock, Send } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
    createQuizSession,
    getQuizSessionByUserId,
    updateQuizSession,
} from "@/lib/api/quiz";
import QuizReview from "./QuizReview";
import { toast } from "sonner";
import { generateId } from "@/lib/utils";

type Answer = {
    question_id: number;
    answer_text: string;
};

const Quiz = ({ quiz }: { quiz: Quiz | null }) => {
    const [user] = useLocalStorage("user", null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [quizSession, setQuizSession] = useState<QuizSession | null>({
        id: generateId(4),
        user_id: user?.id || "",
        quiz_id: quiz?.id || "",
        answers: [],
        score: 0,
        max_score: quiz?.marks || 0,
        duration: "00:00",
        created_at: new Date().toISOString(),
        ended_at: "",
    });
    const [isReviewMode, setIsReviewMode] = useState(false);
    const [answers, setAnswers] = useState<Answer[] | []>([]);
    const [time, setTime] = useState(`00:00`);

    useEffect(() => {
        const addQuizSession = async () => {
            const newQuizSession = await createQuizSession(quizSession || null);
            return newQuizSession;
        };

        // Check if quiz session exists
        const fetchQuizSession = async () => {
            const quizSession = await getQuizSessionByUserId(user?.id || "", quiz?.id || "");
            setQuizSession(quizSession);

            if (quizSession) {
                toast("You've taken this exam before", {
                    duration: 2000,
                    position: "top-center",
                    icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
                });
                setIsReviewMode(true);
                if (quizSession.ended_at === "") {
                    setQuizSession({
                        ...quizSession,
                        ended_at: new Date().toISOString(),
                    });
                }
                return;
            }

            if (!quizSession) {
                const newQuizSession = await addQuizSession();
                setQuizSession(newQuizSession);
            }
        };
        return () => {
            fetchQuizSession();
        };
    }, []);

    useEffect(() => {
        // Set a timer for the quiz session
        const timer = setInterval(() => {
            setTime((prevTime) => {
                const [minutes, seconds] = prevTime.split(":").map(Number);
                if (seconds < 59) {
                    return `${minutes}:${String(seconds + 1).padStart(2, "0")}`;
                } else {
                    return `${minutes + 1}:00`;
                }
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleSubmit = () => {
        if (!quizSession) return; // Add null check

        setQuizSession({
            ...quizSession,
            answers: answers || [],
            ended_at: new Date().toISOString(),
        });

        setIsReviewMode(true);
    };

    const handleNext = () => {
        setQuestionIndex((prevIndex) => prevIndex + 1);
    };

    const handlePrev = () => {
        setQuestionIndex((prevIndex) => prevIndex - 1);
    };

    // Render the review
    if (isReviewMode) {
        return <QuizReview quiz={quiz} quizSession={quizSession || null} />;
    }

    return (
        <Card className="w-full">
            <CardHeader className="flex items-start justify-between">
                <CardTitle>
                    <h2 className="mb-4 text-2xl font-semibold">
                        Question {questionIndex + 1} <span className="text-sm p-lead font-semibold">({quiz?.questions[questionIndex].mark} marks)</span>
                    </h2>
                    <p className="text-lg font-semibold">
                        {quiz?.questions[questionIndex].question_text}
                    </p>
                </CardTitle>
                <span className="flex items-center rounded-lg border bg-yellow-500/40 p-2 text-lg">
                    <Clock className="h-5 w-5" />
                    <span className="ml-2 font-semibold">{time}</span>
                </span>
            </CardHeader>
            <CardContent>
                {quiz?.questions[questionIndex].type === "multiple_choice" && (
                    <RadioGroup
                        className="flex flex-col gap-4"
                        onValueChange={(value) => {
                            setAnswers((prev) => {
                                const newAnswers = [...prev]; // Create a new array
                                if (newAnswers[questionIndex]) {
                                    newAnswers[questionIndex] = {
                                        ...newAnswers[questionIndex],
                                        answer_text: value || "",
                                    };
                                } else {
                                    newAnswers[questionIndex] = {
                                        question_id: questionIndex,
                                        answer_text: value || "",
                                    };
                                }
                                return newAnswers;
                            });
                        }}
                    >
                        {quiz?.questions[questionIndex]?.answers
                            ?.filter(Boolean) // This removes any null/undefined values
                            ?.map((answer, index) => (
                                <div
                                    key={index}
                                    className="hover:border-primary flex items-center gap-2 rounded-xl border p-4 transition-colors"
                                >
                                    <RadioGroupItem
                                        value={answer?.answer_text || ""}
                                        id={`${questionIndex}-${index}`}
                                    />
                                    <Label
                                        htmlFor={`${questionIndex}-${index}`}
                                        className="w-full cursor-pointer text-sm font-semibold"
                                    >
                                        {answer?.answer_text ||
                                            "No answer text"}
                                    </Label>
                                </div>
                            ))}
                    </RadioGroup>
                )}
                {/* Render Essay Questions answer */}
                {quiz?.questions[questionIndex].type === "essay" && (
                    <Textarea
                        onChange={(e) => {
                            setAnswers((prev) => {
                                const newAnswers = [...prev];
                                if (newAnswers[questionIndex]) {
                                    newAnswers[questionIndex] = {
                                        ...newAnswers[questionIndex],
                                        answer_text: e.target.value || "",
                                    };
                                } else {
                                    newAnswers[questionIndex] = {
                                        question_id: questionIndex,
                                        answer_text: e.target.value || "",
                                    };
                                }
                                return newAnswers;
                            });
                        }}
                        placeholder="Write your answer here..."
                        className="min-h-[150px] w-full resize-none rounded-xl border p-4"
                    />
                )}
            </CardContent>
            <CardFooter>
                <div className="flex flex-1 items-center justify-between">
                    <Button
                        variant="outline"
                        className="w-fit"
                        onClick={handlePrev}
                        disabled={questionIndex === 0}
                    >
                        Prev
                    </Button>
                    {/* Submit button / Question Index */}
                    {questionIndex === (quiz?.questions?.length ?? 1) - 1 ? (
                        <Button
                            variant="outline"
                            className="w-fit"
                            onClick={handleSubmit}
                        >
                            <Send /> Submit Exam
                        </Button>
                    ) : (
                        <span className="rounded-lg border bg-white/50 p-2 px-4 text-sm font-semibold dark:bg-black/50">
                            {questionIndex + 1} / {quiz?.questions?.length}
                        </span>
                    )}
                    <Button
                        variant="outline"
                        className="w-fit"
                        onClick={handleNext}
                        disabled={
                            questionIndex === (quiz?.questions?.length ?? 1) - 1
                        }
                    >
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default Quiz;
