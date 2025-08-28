"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getCourses } from "@/lib/api/course";
import { uploadVideo } from "@/lib/api/video";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

type CreateVideoForm = {
    title: string;
    description: string;
    video_url: File | undefined;
    thumbnail_url: File | undefined;
    course_id: string;
};

export default function UploadVideoPage() {
    const router = useRouter();
    const [courses, setCourses] = useState<{ id: string; title: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [video, setVideo] = useState<CreateVideoForm>({
        title: "",
        description: "",
        video_url: undefined,
        thumbnail_url: undefined,
        course_id: "",
    });

    useEffect(() => {
        const fetchCoursesIds = async () => {
            const courses = await getCourses();
            await new Promise((resolve) => setTimeout(resolve, 2000));
            if (courses) {
                setCourses(courses);
            }
        };
        fetchCoursesIds();
    }, [setCourses]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);

            // Prepare data for upload
            const formData = new FormData();
            formData.append("title", video.title);
            formData.append("description", video.description);
            formData.append("video_url", video.video_url as File);
            formData.append("thumbnail_url", video.thumbnail_url as File);
            formData.append("course_id", video.course_id);

            const res = await uploadVideo(formData);

            // Success message
            if (res.id) {
                toast.success("Video uploaded successfully");
            }
            router.back();
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <header className="mb-8 flex flex-col gap-4">
                <Button
                    className="w-fit"
                    variant="outline"
                    onClick={() => router.back()}
                >
                    <ArrowLeft /> Back
                </Button>
                <div>
                    <h1 className="text-3xl font-semibold">Upload Video</h1>
                    <p className="text-muted-foreground">
                        Upload the video details below.
                    </p>
                </div>
            </header>
            <main>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 rounded-2xl border p-6"
                >
                    <div className="input-group">
                        <Label className="mb-2" htmlFor="title">
                            Title
                        </Label>
                        <Input
                            id="title"
                            name="title"
                            type="text"
                            value={video.title}
                            onChange={(e) =>
                                setVideo({ ...video, title: e.target.value })
                            }
                        />
                    </div>
                    <div className="input-group">
                        <Label className="mb-2" htmlFor="description">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={video.description}
                            onChange={(e) =>
                                setVideo({
                                    ...video,
                                    description: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="input-group">
                        <Label className="mb-2" htmlFor="video_url">
                            Video File
                        </Label>
                        <Input
                            id="video_url"
                            name="video_url"
                            type="file"
                            accept="video/*"
                            onChange={(e) =>
                                setVideo({
                                    ...video,
                                    video_url: e.target.files?.[0],
                                })
                            }
                        />
                    </div>
                    <div className="input-group">
                        <Label className="mb-2" htmlFor="thumbnail_url">
                            Thumbnail
                        </Label>
                        <Input
                            id="thumbnail_url"
                            name="thumbnail_url"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setVideo({
                                    ...video,
                                    thumbnail_url: e.target.files?.[0],
                                })
                            }
                        />
                    </div>
                    <div className="input-group">
                        <Label className="mb-2" htmlFor="course_id">
                            Course
                        </Label>
                        <Select
                            value={video.course_id}
                            onValueChange={(value) =>
                                setVideo({
                                    ...video,
                                    course_id: value,
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a course" />
                            </SelectTrigger>
                            <SelectContent>
                                {courses.map((course) => (
                                    <SelectItem
                                        key={course.id}
                                        value={course.id}
                                    >
                                        {course.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center justify-end gap-4">
                        <Button
                            disabled={loading}
                            className="btn-primary w-fit"
                            type="submit"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Uploading
                                </>
                            ) : (
                                "Upload Video"
                            )}
                        </Button>
                        <Button variant="outline" onClick={() => router.back()}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </main>
        </section>
    );
}
