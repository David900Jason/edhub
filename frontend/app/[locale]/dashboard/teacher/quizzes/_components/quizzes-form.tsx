"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getAllTeachersCourses } from "@/lib/api/course";
import { generateId } from "@/lib/utils";
import { Loader2, Plus, X } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { createQuiz } from "@/lib/api/quiz";
import { Textarea } from "@/components/ui/textarea";

const QuizzesNewForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Quiz>();
    const [courses, setCourses] = useState<CourseType[]>([]);
    const [user] = useLocalStorage("user", null);
    const router = useRouter();

    useEffect(() => {
        const fetchCourses = async () => {
            const response: CourseType[] | null = await getAllTeachersCourses(
                user?.id,
            );
            setCourses(response || []);
        };
        fetchCourses();
    }, []);

    const onSubmit: SubmitHandler<Quiz> = async (data) => {
        try {
            await createQuiz({
                ...data,
                id: generateId(4),
                created_at: new Date().toISOString(),
                teacher_id: user?.id,
                questions: [],
            });
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
                        placeholder="Enter quiz title"
                        {...register("title")}
                    />
                </div>
                <div className="input-group">
                    <Label className="mb-2">Description</Label>
                    <Textarea
                        className="min-h-[150px]"
                        placeholder="Enter quiz description"
                        {...register("description")}
                    />
                </div>
                <div className="input-group">
                    <Label className="mb-2">Marks</Label>
                    <Input
                        type="number"
                        placeholder="Enter quiz marks"
                        {...register("marks", {
                            valueAsNumber: true,
                        })}
                    />
                </div>
                <div className="input-group">
                    <Label className="mb-2">Duration (min.)</Label>
                    <Input
                        type="number"
                        placeholder="Enter quiz duration"
                        {...register("duration", {
                            valueAsNumber: true,
                        })}
                    />
                </div>
                <div className="input-group">
                    <Label className="mb-2">Course</Label>
                    <Select
                        {...register("course_id")}
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
                        {isSubmitting ? "Creating..." : "Create Quiz"}
                    </Button>
                </div>
            </form>
        </main>
    );
};

export default QuizzesNewForm;
