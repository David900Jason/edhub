"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Save, X } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getAllTeachersCourses } from "@/lib/api/course";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { generateId } from "@/lib/utils";
import { createExam } from "@/lib/api/exam";
import { useTranslations } from "next-intl";

interface NewExamFormType {
    title: string;
    duration: number;
    marks: number;
    course_id: string;
}

const NewExamForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<NewExamFormType>();
    const [user] = useLocalStorage("user", null);
    const [courses, setCourses] = useState<CourseType[]>([]);
    const router = useRouter();
    const t = useTranslations("TEACHER_DASHBOARD.EXAMS.NEW_EXAM");

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await getAllTeachersCourses(user?.id);
            setCourses(response || []);
            console.log(response);
        };
        fetchCourses();
    }, []);

    const onSubmit: SubmitHandler<NewExamFormType> = async (
        data: NewExamFormType,
    ) => {
        try {
            await createExam({
                ...data,
                id: generateId(4),
                created_at: new Date().toISOString(),
                teacher_id: user?.id,
                questions: [],
            });

            await new Promise((resolve) => setTimeout(resolve, 2000));
            router.push("/dashboard/teacher/exams");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col gap-6 rounded-lg border p-6 py-8">
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="input-group mb-4">
                    <Label className="mb-2">{t("label1")}</Label>
                    <Input
                        {...register("title", {
                            required: "Title is required",
                        })}
                        placeholder={t("label1_cap")}
                    />
                    {errors.title && (
                        <p className="text-red-500">{errors.title.message}</p>
                    )}
                </div>
                <div className="input-group mb-4">
                    <Label className="mb-2">{t("label2")}</Label>
                    <Input
                        {...register("duration", {
                            required: "Duration is required",
                            valueAsNumber: true,
                        })}
                        placeholder={t("label2_cap")}
                    />
                    {errors.duration && (
                        <p className="text-red-500">
                            {errors.duration.message}
                        </p>
                    )}
                </div>
                <div className="input-group mb-4">
                    <Label className="mb-2">{t("label3")}</Label>
                    <Input
                        {...register("marks", {
                            required: "Marks is required",
                            valueAsNumber: true,
                        })}
                        placeholder={t("label3_cap")}
                    />
                    {errors.marks && (
                        <p className="text-red-500">{errors.marks.message}</p>
                    )}
                </div>
                <div className="input-group mb-4">
                    <Label className="mb-2">{t("label4")}</Label>
                    <Select
                        onValueChange={(value) => {
                            register("course_id").onChange({
                                target: {
                                    name: "course_id",
                                    value: value,
                                },
                            });
                        }}
                        {...register("course_id")}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t("label4_cap")} />
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
                    {errors.course_id && (
                        <p className="text-red-500">
                            {errors.course_id.message}
                        </p>
                    )}
                </div>
                <div className="flex items-center justify-end gap-2">
                    <Button
                        variant="outline"
                        className="btn-secondary w-fit"
                        type="button"
                        onClick={() => router.back()}
                    >
                        <X /> {t("cta2")}
                    </Button>
                    <Button className="btn-primary w-fit" type="submit">
                        {isSubmitting ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="mr-2 h-4 w-4" />
                        )}
                        {isSubmitting ? "Creating..." : t("cta1")}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default NewExamForm;
