"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { getQuizById, updateQuestionInQuiz } from "@/lib/api/quiz";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Trash2 } from "lucide-react";

interface Answer {
    answer_text: string;
    is_correct: boolean;
}

type QuestionFormData = Omit<QuestionBase, "answers"> & {
    answers: Answer[];
};

export default function EditQuestionPage() {
    const router = useRouter();
    const { quizId, questionIndex } = useParams<{
        quizId: string;
        questionIndex: string;
    }>();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        formState: { errors },
    } = useForm<QuestionFormData>();

    const questionType = watch("type", "multiple_choice");
    const { fields, append, remove } = useFieldArray({
        name: "answers",
        control,
    });

    const answers = watch("answers", [{ answer_text: "", is_correct: false }]);

    useEffect(() => {
        const loadQuestion = async () => {
            try {
                setIsLoading(true);
                const quiz = await getQuizById(quizId);
                if (quiz?.questions && quiz.questions[Number(questionIndex)]) {
                    const question = quiz.questions[Number(questionIndex)];
                    Object.entries(question).forEach(([key, value]) => {
                        // @ts-ignore
                        setValue(key as keyof QuestionFormData, value);
                    });
                } else {
                    throw new Error("Question not found");
                }
            } catch (error) {
                console.error("Failed to load question:", error);
                toast("Failed to load question. Please try again.");
                router.push(`/dashboard/teacher/quizzes/${quizId}/questions`);
            } finally {
                setIsLoading(false);
            }
        };

        loadQuestion();
    }, [quizId, questionIndex, setValue, router, toast]);

    const onSubmit: SubmitHandler<QuestionFormData> = async (data) => {
        try {
            setIsSubmitting(true);
            const updatedQuestion = await updateQuestionInQuiz(
                quizId,
                Number(questionIndex),
                data,
            );

            if (updatedQuestion) {
                toast("Question updated successfully.");
                router.push(`/dashboard/teacher/quizzes/${quizId}/questions`);
            } else {
                throw new Error("Failed to update question");
            }
        } catch (error) {
            console.error("Failed to update question:", error);
            toast("Failed to update question. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const addAnswer = () => {
        setValue("answers", [
            ...(answers || []),
            { answer_text: "", is_correct: false },
        ]);
    };

    const removeAnswer = (index: number) => {
        const newAnswers = [...(answers || [])];
        newAnswers.splice(index, 1);
        setValue("answers", newAnswers);
    };

    const updateAnswerText = (index: number, text: string) => {
        const newAnswers = [...(answers || [])];
        newAnswers[index] = { ...newAnswers[index], answer_text: text };
        setValue("answers", newAnswers);
    };

    const toggleCorrectAnswer = (index: number) => {
        const newAnswers = [...(answers || [])];
        newAnswers[index] = {
            ...newAnswers[index],
            is_correct: !newAnswers[index].is_correct,
        };
        setValue("answers", newAnswers);
    };

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <section>
            <div className="mb-6 flex items-center">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.back()}
                    className="mr-2"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Questions
                </Button>
            </div>

            <div className="bg-card rounded-lg border p-6 shadow-sm">
                <h1 className="mb-6 text-2xl font-semibold">Edit Question</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <Label htmlFor="type">Question Type</Label>
                        <select
                            id="type"
                            {...register("type", { required: true })}
                            className="border-input bg-background ring-offset-background focus:ring-ring mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
                        >
                            <option value="multiple_choice">
                                Multiple Choice
                            </option>
                            <option value="essay">Essay</option>
                        </select>
                    </div>

                    <div>
                        <Label htmlFor="question_text">Question Text</Label>
                        <Textarea
                            id="question_text"
                            {...register("question_text", { required: true })}
                            className="mt-1 min-h-[100px]"
                            placeholder="Enter the question text"
                        />
                        {errors.question_text && (
                            <p className="mt-1 text-sm text-red-500">
                                Question text is required
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="mark">Marks</Label>
                        <Input
                            id="mark"
                            type="number"
                            min="1"
                            {...register("mark", { required: true, min: 1 })}
                            className="mt-1 w-32"
                        />
                        {errors.mark && (
                            <p className="mt-1 text-sm text-red-500">
                                Please enter a valid mark
                            </p>
                        )}
                    </div>

                    {questionType === "multiple_choice" && (
                        <div>
                            <div className="mb-4 flex items-center justify-between">
                                <Label>Answers</Label>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addAnswer}
                                >
                                    Add Answer
                                </Button>
                            </div>

                            <div className="space-y-3">
                                {answers?.map((answer, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start space-x-3"
                                    >
                                        <div className="mt-2 flex h-5 items-center">
                                            <Switch
                                                checked={answer.is_correct}
                                                onCheckedChange={() =>
                                                    toggleCorrectAnswer(index)
                                                }
                                                dir="ltr"
                                                className="data-[state=checked]:bg-green-500"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <Input
                                                value={answer.answer_text}
                                                onChange={(e) =>
                                                    updateAnswerText(
                                                        index,
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder={`Answer ${index + 1}`}
                                                required
                                            />
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                            onClick={() => removeAnswer(index)}
                                            disabled={answers.length <= 1}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {questionType === "essay" && (
                        <div>
                            <Label htmlFor="model_answer">Model Answer</Label>
                            <Textarea
                                id="model_answer"
                                {...register("model_answer")}
                                className="mt-1 min-h-[150px]"
                                placeholder="Enter the model answer"
                            />
                        </div>
                    )}

                    <div className="flex justify-end space-x-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                "Update Question"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
}


