"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams } from "next/navigation";
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
import { updateExam, getExamById } from "@/lib/api/exam";
import { useTranslations } from "next-intl";

export interface EditExamFormType {
    title: string;
    description: string;
    duration: number;
    questions: QuestionBase[];
    marks: number;
    passing_score?: number;
    course_id: string;
}

const EditExamPage = () => {
    const { examId }: { examId: string } = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<EditExamFormType>();
    const [user] = useLocalStorage("user_profile", null);
    const [exam, setExam] = useState<Exam | null>(null);
    const [courses, setCourses] = useState<CourseType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const t = useTranslations("TEACHER_DASHBOARD.EXAMS.EDIT_EXAM");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // Fetch courses first
                const coursesResponse = await getAllTeachersCourses(user?.id);
                setCourses(coursesResponse || []);

                // Then fetch exam data
                const examResponse = await getExamById(examId as string);
                if (examResponse) {
                    setExam(examResponse);
                    // Reset form with exam data after courses are loaded
                    reset({
                        title: examResponse.title,
                        description: examResponse.description || "",
                        duration: examResponse.duration,
                        marks: examResponse.marks,
                        course_id: examResponse.course_id,
                        questions: examResponse.questions || [],
                        passing_score: examResponse.passing_score,
                    });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [examId, reset, user?.id]);

    const onSubmit: SubmitHandler<EditExamFormType> = async (
        data: EditExamFormType,
    ) => {
        try {
            await updateExam(examId, data as EditExamFormType);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            router.push("/dashboard/teacher/exams");
        } catch (error) {
            console.error(error);
        }
        return;
    };

    return (
        <section>
            <header className="mb-8">
                <h1 className="text-3xl font-semibold">{t("title")}</h1>
                <p className="p-lead">{t("description")}</p>
            </header>
            <main>
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
                                defaultValue={exam?.title}
                            />
                            {errors.title && (
                                <p className="text-red-500">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>
                        <div className="input-group mb-4">
                            <Label className="mb-2">{t("label2")}</Label>
                            <textarea
                                {...register("description", {
                                    required: "Description is required",
                                })}
                                placeholder={t("label2_cap")}
                                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring min-h-[100px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                                defaultValue={exam?.description}
                            />
                            {errors.description && (
                                <p className="text-red-500">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>
                        <div className="input-group mb-4">
                            <Label className="mb-2">{t("label3")}</Label>
                            <Input
                                type="number"
                                {...register("duration", {
                                    required: "Duration is required",
                                    valueAsNumber: true,
                                    min: {
                                        value: 1,
                                        message:
                                            "Duration must be at least 1 minute",
                                    },
                                })}
                                placeholder={t("label3_cap")}
                                defaultValue={exam?.duration}
                            />
                            {errors.duration && (
                                <p className="text-red-500">
                                    {errors.duration.message}
                                </p>
                            )}
                        </div>
                        <div className="input-group mb-4">
                            <Label className="mb-2">{t("label4")}</Label>
                            <Input
                                type="number"
                                {...register("marks", {
                                    required: "Marks is required",
                                    valueAsNumber: true,
                                    min: {
                                        value: 1,
                                        message: "Marks must be at least 1",
                                    },
                                })}
                                placeholder={t("label4_cap")}
                                defaultValue={exam?.marks}
                            />
                            {errors.marks && (
                                <p className="text-red-500">
                                    {errors.marks.message}
                                </p>
                            )}
                        </div>
                        <div className="input-group mb-4">
                            <Label className="mb-2">{t("label5")}</Label>
                            <Select
                                defaultValue={exam?.course_id}
                                onValueChange={(value) => {
                                    register("course_id").onChange({
                                        target: {
                                            name: "course_id",
                                            value: value,
                                        },
                                    });
                                }}
                                {...register("course_id", {
                                    required: "Course is required",
                                })}
                            >
                                <SelectTrigger disabled={isLoading}>
                                    <SelectValue
                                        placeholder={
                                            isLoading
                                                ? t("label5_cap")
                                                : t("label5_cap")
                                        }
                                    >
                                        {!isLoading &&
                                            exam?.course_id &&
                                            courses.find(
                                                (c) => c.id === exam.course_id,
                                            )?.title}
                                    </SelectValue>
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
                                {isSubmitting ? t("cta1") : t("cta1")}
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        </section>
    );
};

export default EditExamPage;
