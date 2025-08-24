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
import { Loader2, X } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { createAssignment } from "@/lib/api/assignment";
import { useTranslations } from "next-intl";
import { Textarea } from "@/components/ui/textarea";

const AssignmentNewForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Assignment>();
    const [courses, setCourses] = useState<CourseType[]>([]);
    const [user] = useLocalStorage("user_profile", null);
    const router = useRouter();
    const t = useTranslations("TEACHER_DASHBOARD.ASSIGNMENTS.NEW_ASSIGNMENT");

    useEffect(() => {
        const fetchCourses = async () => {
            const response: CourseType[] | null = await getAllTeachersCourses(
                user?.id,
            );
            setCourses(response || []);
        };
        fetchCourses();
    }, []);

    const onSubmit: SubmitHandler<Assignment> = async (data) => {
        try {
            await createAssignment({
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
                    <Label className="mb-2">{t("label1")}</Label>
                    <Input
                        type="text"
                        placeholder={t("label1_cap")}
                        {...register("title")}
                    />
                </div>
                <div className="input-group">
                    <Label className="mb-2">{t("label2")}</Label>
                    <Textarea
                        className="min-h-[150px]"
                        placeholder={t("label2_cap")}
                        {...register("description")}
                    />
                </div>
                <div className="input-group">
                    <Label className="mb-2">{t("label3")}</Label>
                    <Input
                        type="number"
                        placeholder={t("label3_cap")}
                        {...register("marks", {
                            valueAsNumber: true,
                        })}
                    />
                </div>
                <div className="input-group">
                    <Label className="mb-2">{t("label4")}</Label>
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
                        {isSubmitting ? "Creating..." : t("cta1")}
                    </Button>
                </div>
            </form>
        </main>
    );
};

export default AssignmentNewForm;
