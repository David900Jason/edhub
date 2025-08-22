"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Loader2, Plus, Trash2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { addQuestionToQuiz } from "@/lib/api/quiz";
import { toast } from "sonner";

type QuestionFormData = Omit<QuestionBase, "answers"> & {
    answers: {
        answer_text: string;
        is_correct: boolean;
    }[];
};

const NewQuestionPage = () => {
    const router = useRouter();
    const { quizId }: { quizId: string } = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        control,
        setValue,
        formState: { errors },
    } = useForm<QuestionFormData>({
        defaultValues: {
            type: "multiple_choice",
            question_text: "",
            mark: 1,
            answers: [
                { answer_text: "", is_correct: false },
                { answer_text: "", is_correct: false },
                { answer_text: "", is_correct: false },
                { answer_text: "", is_correct: false },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "answers",
    });

    const questionType = watch("type", "multiple_choice");
    const answers = watch("answers");

    const onSubmit: SubmitHandler<QuestionFormData> = async (data) => {
        try {
            setIsSubmitting(true);

            // Validate at least one correct answer for multiple choice
            if (questionType === "multiple_choice") {
                const hasCorrectAnswer = data.answers.some(
                    (answer) => answer.is_correct,
                );

                if (!hasCorrectAnswer) {
                    toast.error("Please mark at least one answer as correct");
                    return;
                }
            }

            const questionData: QuestionBase = {
                ...data,
                mark: Number(data.mark),
                // @ts-ignore
                answers:
                    questionType === "multiple_choice"
                        ? data.answers
                        : undefined,
                model_answer:
                    questionType === "essay"
                        ? data.answers[0]?.answer_text
                        : undefined,
            };

            const res = await addQuestionToQuiz(quizId, questionData);

            if (res) {
                toast.success("Question added successfully!");
                router.push(`/dashboard/teacher/quizzes/${quizId}/questions`);
            } else {
                throw new Error("Failed to add question");
            }
        } catch (error) {
            console.error("Error adding question:", error);
            toast.error("Failed to add question. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const addAnswer = () => {
        append({ answer_text: "", is_correct: false });
    };

    const removeAnswer = (index: number) => {
        if (fields.length > 1) {
            remove(index);
        }
    };

    const toggleCorrectAnswer = (index: number) => {
        const newValue = !answers[index].is_correct;
        setValue(`answers.${index}.is_correct`, newValue);
    };

    const updateAnswerText = (index: number, text: string) => {
        setValue(`answers.${index}.answer_text`, text);
    };

    return (
        <section>
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Create New Question</h1>
                    <p className="text-muted-foreground">
                        Add a new question to your quiz
                    </p>
                </div>
                <Button asChild variant="outline">
                    <Link
                        href={`/dashboard/teacher/quizzes/${quizId}/questions`}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Questions
                    </Link>
                </Button>
            </header>

            <div className="bg-card rounded-lg border p-6 shadow-sm">
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
                            {...register("mark", {
                                required: true,
                                min: 1,
                                valueAsNumber: true,
                            })}
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
                                    disabled={fields.length >= 6}
                                >
                                    <Plus className="mr-2 h-4 w-4" /> Add Answer
                                </Button>
                            </div>

                            <div className="space-y-3">
                                {fields.map((field, index) => (
                                    <div
                                        key={field.id}
                                        className="flex items-start space-x-3"
                                    >
                                        <div className="mt-2 flex h-5 items-center">
                                            <Switch
                                                checked={
                                                    answers?.[index]
                                                        ?.is_correct || false
                                                }
                                                onCheckedChange={() =>
                                                    toggleCorrectAnswer(index)
                                                }
                                                dir="ltr"
                                                className="data-[state=checked]:bg-green-500"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <Input
                                                value={
                                                    answers?.[index]
                                                        ?.answer_text || ""
                                                }
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
                                            disabled={fields.length <= 1}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                {fields.length < 2 && (
                                    <p className="text-muted-foreground text-sm">
                                        Add at least 2 answer options
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {questionType === "essay" && (
                        <div>
                            <Label htmlFor="model_answer">Model Answer</Label>
                            <Textarea
                                id="model_answer"
                                {...register(`answers.0.answer_text`, {
                                    required: questionType === "essay",
                                })}
                                className="mt-1 min-h-[150px]"
                                placeholder="Enter the model answer"
                            />
                            {errors.answers?.[0]?.answer_text && (
                                <p className="mt-1 text-sm text-red-500">
                                    Model answer is required for essay questions
                                </p>
                            )}
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
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Question
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default NewQuestionPage;
