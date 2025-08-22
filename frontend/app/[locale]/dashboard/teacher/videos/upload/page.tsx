"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

const formSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().optional(),
    videoFile: z
        .any()
        .refine((file) => file?.size > 0, "Video file is required"),
    thumbnail: z.any().optional(),
    courseId: z.string().min(1, "Course is required"),
    isPublished: z.boolean().default(false),
    duration: z.string().optional(),
    tags: z.string().optional(),
});

export default function UploadVideoPage() {
    const router = useRouter();
    const t = useTranslations("TEACHER_DASHBOARD.VIDEOS.NEW_VIDEO");
    const [isLoading, setIsLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [courses, setCourses] = useState<Array<{ id: string; name: string }>>(
        [
            { id: "1", name: "Math 101" },
            { id: "2", name: "Physics 201" },
            // Fetch courses from API in a real app
        ],
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            title: "",
            description: "",
            isPublished: false,
        },
    });

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: any,
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            field.onChange(file);
            if (file.type.startsWith("image/")) {
                setPreviewUrl(URL.createObjectURL(file));
            }
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);

            // In a real app, you would upload the files to a storage service
            // and then save the video data to your database
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                if (key === "videoFile" || key === "thumbnail") {
                    formData.append(key, value);
                } else {
                    formData.append(key, String(value));
                }
            });

            // Example API call
            // const response = await fetch('/api/teacher/videos/upload', {
            //   method: 'POST',
            //   body: formData,
            // });
            // const data = await response.json();

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            toast.success("Video uploaded successfully");
            router.push("/dashboard/teacher/videos");
        } catch (error) {
            console.error("Error uploading video:", error);
            toast.error("Failed to upload video");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    {t("title")}
                </h1>
                <p className="text-muted-foreground">
                    {t("description")}
                </p>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="space-y-6 md:col-span-2">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("label1")}</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={t("label1_cap")}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("label2")}</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder={t("label2_cap")}
                                                className="min-h-[120px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="courseId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("label4")}</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a course" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {courses.map((course) => (
                                                    <SelectItem
                                                        key={course.id}
                                                        value={course.id}
                                                    >
                                                        {course.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("label5")}</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={t("label5_cap")}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {t("label5_cap")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="isPublished"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>{t("label6")}</FormLabel>
                                            <FormDescription>
                                                {t("label6_cap")}
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="videoFile"
                                render={({ field: { onChange, ...field } }) => (
                                    <FormItem>
                                        <FormLabel>{t("label7")}</FormLabel>
                                        <FormControl>
                                            <div className="flex w-full items-center justify-center">
                                                <label className="hover:bg-accent hover:text-accent-foreground flex h-32 w-full cursor-pointer flex-col rounded-md border-2 border-dashed">
                                                    <div className="flex flex-col items-center justify-center pt-7">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="text-muted-foreground group-hover:text-foreground h-8 w-8"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                            />
                                                        </svg>
                                                        <p className="text-muted-foreground group-hover:text-foreground pt-1 text-sm tracking-wider">
                                                            {field.value
                                                                ?.name ||
                                                                t("label7_cap")}
                                                        </p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        className="opacity-0"
                                                        accept="video/*"
                                                        onChange={(e) =>
                                                            handleFileChange(
                                                                e,
                                                                { onChange },
                                                            )
                                                        }
                                                    />
                                                </label>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="thumbnail"
                                render={({ field: { onChange, ...field } }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("label8")}
                                        </FormLabel>
                                        <FormControl>
                                            <div className="flex w-full items-center justify-center">
                                                <label className="hover:bg-accent hover:text-accent-foreground flex h-32 w-full cursor-pointer flex-col rounded-md border-2 border-dashed">
                                                    <div className="flex flex-col items-center justify-center pt-7">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="text-muted-foreground group-hover:text-foreground h-8 w-8"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                            />
                                                        </svg>
                                                        <p className="text-muted-foreground group-hover:text-foreground pt-1 text-sm tracking-wider">
                                                            {field.value
                                                                ?.name ||
                                                                t("label8_cap")}
                                                        </p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        className="opacity-0"
                                                        accept="image/*"
                                                        onChange={(e) =>
                                                            handleFileChange(
                                                                e,
                                                                { onChange },
                                                            )
                                                        }
                                                    />
                                                </label>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                        {previewUrl && (
                                            <div className="mt-2">
                                                <p className="text-muted-foreground mb-1 text-sm">
                                                    Preview:
                                                </p>
                                                <img
                                                    src={previewUrl}
                                                    alt="Thumbnail preview"
                                                    className="h-20 w-full rounded-md object-cover"
                                                />
                                            </div>
                                        )}
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                            disabled={isLoading}
                        >
                            {t("cta2")}
                        </Button>
                        <Button type="submit" className="btn-primary" disabled={isLoading}>
                            {isLoading ? "Uploading..." : t("cta1")}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}


