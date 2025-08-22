"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { useEffect } from "react";
import { getAllTeachersCourses } from "@/lib/api/course";
import { updateAssignment, getAssignmentById } from "@/lib/api/assignment";
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
import { useTranslations } from "next-intl";

const AssignmentEditForm = () => {
    const [courses, setCourses] = useState<CourseType[]>([]);
    const [assignment, setAssignment] = useState<Assignment | null>(null);
    const t = useTranslations("TEACHER_DASHBOARD.ASSIGNMENTS.EDIT_ASSIGNMENT");

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { isSubmitting },
    } = useForm<Assignment>();

    const [user] = useLocalStorage("user", null);
    const { assignmentId } = useParams();
    const router = useRouter();

    useEffect(() => {
        const fetchAssignment = async () => {
            const res: Assignment | null = await getAssignmentById(
                assignmentId as string,
            );
            setAssignment(res || null);
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
        fetchAssignment();
        fetchCourses();
    }, []);

    const onSubmit: SubmitHandler<Assignment> = async (data) => {
        try {
            await updateAssignment(assignment?.id as string, data);
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
                    <Label className="mb-2">{t("title")}</Label>
                    <Input
                        type="text"
                        placeholder="Enter assignment title"
                        {...register("title")}
                    />
                </div>
                <div className="input-group">
                    <Label className="mb-2">{t("description")}</Label>
                    <Textarea
                        className="min-h-[150px]"
                        placeholder="Enter assignment description"
                        {...register("description")}
                    />
                </div>
                <div className="input-group">
                    <Label className="mb-2">{t("marks")}</Label>
                    <Input
                        type="number"
                        placeholder="Enter assignment marks"
                        {...register("marks", {
                            valueAsNumber: true,
                        })}
                    />
                </div>
                <div className="input-group">
                    <Label className="mb-2">{t("course")}</Label>
                    <Select
                        value={assignment?.course_id}
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
                        <X className="h-4 w-4" /> {t("cta2")}
                    </Button>
                    <Button type="submit" className="btn-primary">
                        {isSubmitting && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        )}
                        {isSubmitting ? "Updating..." : t("cta1")}
                    </Button>
                </div>
            </form>
        </main>
    );
};

export default AssignmentEditForm;
