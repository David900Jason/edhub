"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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

type FieldValue = string | File | null | undefined;

// Type guard to check if value is a File-like object
const isFile = (value: unknown): value is File => {
    return value instanceof File || (typeof value === 'object' && value !== null && 'name' in value && 'type' in value);
};

const formSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().optional(),
    thumbnail: z.string().optional(),
    courseId: z.string().min(1, "Course is required"),
    isPublished: z.boolean().default(false),
    tags: z.string().optional(),
});

export default function EditVideoPage() {
    const router = useRouter();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [video, setVideo] = useState<Video | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [courses] = useState<Array<{ id: string; name: string }>>([
        { id: "1", name: "Math 101" },
        { id: "2", name: "Physics 201" },
        // Fetch courses from API in a real app
    ]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            title: "",
            description: "",
            isPublished: false,
        },
    });

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                // In a real app, fetch the video data from your API
                // const response = await fetch(`/api/teacher/videos/${id}`);
                // const data = await response.json();

                // Mock data for demonstration
                const mockVideo = {
                    id: id as string,
                    title: "Introduction to Calculus",
                    description:
                        "Learn the basics of calculus in this introductory video.",
                    url: "https://example.com/video1.mp4",
                    thumbnail: "https://via.placeholder.com/300x169",
                    views: 1250,
                    likes: 50,
                    isPublished: true,
                    course_id: "1",
                    courseName: "Math 101",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    tags: ["math", "calculus", "education"],
                };

                setVideo(mockVideo as any);
                form.reset({
                    title: mockVideo.title,
                    description: mockVideo.description,
                    courseId: mockVideo.course_id,
                    isPublished: mockVideo.isPublished,
                    tags: mockVideo.tags?.join(", "),
                });
                setPreviewUrl(mockVideo.thumbnail);
            } catch (error) {
                console.error("Error fetching video:", error);
                toast.error("Failed to load video");
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchVideo();
        }
    }, [id, form]);

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: { onChange: (value: FieldValue) => void },
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

            // In a real app, you would upload the thumbnail if changed
            // and then update the video data in your database
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                if (key === "thumbnail" && value) {
                    formData.append(key, value as any);
                } else if (value !== undefined && value !== null) {
                    formData.append(key, String(value));
                }
            });

            await new Promise((resolve) => setTimeout(resolve, 1000));

            toast.success("Video updated successfully");
            router.push("/dashboard/teacher/videos");
        } catch (error) {
            console.error("Error updating video:", error);
            toast.error("Failed to update video");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
            </div>
        );
    }

    if (!video) {
        return (
            <div className="py-12 text-center">
                <h2 className="text-xl font-semibold">Video not found</h2>
                <p className="text-muted-foreground mt-2">
                    The requested video could not be found.
                </p>
                <Button
                    className="mt-4"
                    onClick={() => router.push("/dashboard/teacher/videos")}
                >
                    Back to Videos
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    Edit Video
                </h1>
                <p className="text-muted-foreground">
                    Update the video details and settings
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
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter video title"
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
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter video description"
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
                                        <FormLabel>Course</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
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
                                        <FormLabel>Tags</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Add tags separated by commas"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Add tags to help students find your
                                            video
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
                                            <FormLabel>Publish video</FormLabel>
                                            <FormDescription>
                                                This video will be visible to
                                                students if published
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-6">
                            <div>
                                <p className="mb-2 text-sm font-medium">
                                    Video Preview
                                </p>
                                <div className="bg-muted flex aspect-video items-center justify-center rounded-md">
                                    <video
                                        src={video.url}
                                        className="max-h-48 max-w-full rounded-md"
                                        controls
                                    />
                                </div>
                                <p className="text-muted-foreground mt-1 text-xs">
                                    Duration: {video.duration} • {video.views}{" "}
                                    views
                                </p>
                            </div>

                            <FormField
                                control={form.control}
                                name="thumbnail"
                                render={({ field: { onChange, ...field } }) => (
                                    <FormItem>
                                        <FormLabel>Change Thumbnail</FormLabel>
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
                                                            {typeof field.value === "string" 
                                                                ? field.value 
                                                                : isFile(field.value) 
                                                                    ? (field.value as File).name 
                                                                    : "Select a new thumbnail"}
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

                    <div className="flex justify-between pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                router.push("/dashboard/teacher/videos")
                            }
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <div className="space-x-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    if (
                                        confirm(
                                            "Are you sure you want to delete this video? This action cannot be undone.",
                                        )
                                    ) {
                                        // Handle delete
                                        router.push(
                                            "/dashboard/teacher/videos",
                                        );
                                    }
                                }}
                                disabled={isLoading}
                                className="text-destructive hover:bg-destructive/10"
                            >
                                Delete Video
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}
