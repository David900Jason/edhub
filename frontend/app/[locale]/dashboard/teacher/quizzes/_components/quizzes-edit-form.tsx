"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { useEffect } from "react";
import { getAllTeachersCourses } from "@/lib/api/course";
import { updateQuiz, getQuizById } from "@/lib/api/quiz";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const QuizEditForm = () => {
    const [courses, setCourses] = useState<CourseType[]>([]);
    const [quiz, setQuiz] = useState<Quiz | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { isSubmitting },
    } = useForm<Quiz>();

    const [user] = useLocalStorage("user", null);
    const { quizId } = useParams();
    const router = useRouter();

    useEffect(() => {
        const fetchQuiz = async () => {
            const res: Quiz | null = await getQuizById(
                quizId as string,
            );
            setQuiz(res || null);
            if (res) {
                reset({
                    ...res,
                    course_id: res.course_id.toString(), // Ensure course_id is a string for the Select component
                });
            }
        };
        const fetchCourses = async () => {
            const res: CourseType[] | null = await getAllTeachersCourses(
                user?.id as string,
            );
            setCourses(res || []);
        };
        fetchQuiz();
        fetchCourses();
    }, []);

    const onSubmit: SubmitHandler<Quiz> = async (data) => {
        try {
            await updateQuiz(quiz?.id as string, data);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            router.refresh();
            router.back();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className="rounded-xl border p-6">
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="input-group">
                    <Label className="mb-2">Title</Label>
                    <Input
                        type="text"
                        placeholder="Enter assignment title"
                        {...register("title")}
                    />
                </div>
                <div className="input-group">
                    <Label className="mb-2">Description</Label>
                    <Textarea
                        className="min-h-[150px]"
                        placeholder="Enter assignment description"
                        {...register("description")}
                    />
                </div>
                <div className="input-group">
                    <Label className="mb-2">Marks</Label>
                    <Input
                        type="number"
                        placeholder="Enter assignment marks"
                        {...register("marks", {
                            valueAsNumber: true,
                        })}
                    />
                </div>
                <div className="input-group">
                    <Label className="mb-2">Course</Label>
                    <Select
                        value={quiz?.course_id}
                        {...register("course_id", {
                            valueAsNumber: true,
                        })}
                        onValueChange={(value) => {
                            register("course_id").onChange({
                                target: {
                                    name: "course_id",
                                    value,
                                },
                            });
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Course" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {courses.map((course) => (
                                    <SelectItem
                                        key={course.id}
                                        value={course.id}
                                    >
                                        {course.title}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center justify-end gap-2">
                    <Button
                        onClick={() => router.back()}
                        type="button"
                        variant="outline"
                    >
                        <X className="h-4 w-4" /> Cancel
                    </Button>
                    <Button type="submit" className="btn-primary">
                        {isSubmitting && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        )}
                        {isSubmitting ? "Updating..." : "Update Quiz"}
                    </Button>
                </div>
            </form>
        </main>
    );
};

export default QuizEditForm;
