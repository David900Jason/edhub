"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { getTeacherVideo, updateVideo } from "@/lib/api/video";
import { getCourses } from "@/lib/api/course";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, FileText } from "lucide-react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type EditVideoForm = {
    title: string;
    description: string;
    video_url: File | undefined;
    thumbnail_url: File | undefined;
    course_id: string;
};

export default function EditVideoPage() {
    const router = useRouter();
    const { videoId } = useParams();

    const [video, setVideo] = useState<EditVideoForm>({
        title: "",
        description: "",
        video_url: undefined,
        thumbnail_url: undefined,
        course_id: "",
    });
    const [courses, setCourses] = useState<{ id: string; title: string }[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchVideo = async () => {
            const data = await getTeacherVideo(videoId as string);
            if (data) {
                setVideo({
                    title: data.title,
                    description: data.description,
                    video_url: undefined,
                    thumbnail_url: undefined,
                    course_id: data.course?.id as string,
                });
            }
        };

        const fetchCoursesIds = async () => {
            const data = await getCourses();
            if (data) setCourses(data);
        };

        fetchVideo();
        fetchCoursesIds();
    }, [videoId]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("title", video.title);
            formData.append("description", video.description);
            formData.append("course_id", video.course_id);

            await updateVideo(videoId as string, formData);

            toast.success("Video updated successfully");
            router.back();
        } catch (err) {
            console.error(err);
            toast.error("Failed to update video");
        } finally {
            setLoading(false);
        }
    };

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
        <section className="mx-auto mt-10 max-w-3xl space-y-8">
            {/* Header */}
            <header className="flex flex-col items-start gap-4">
                <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>
                <div>
                    <h1 className="text-2xl font-semibold">Edit Video</h1>
                    <p className="text-muted-foreground text-sm">
                        Update the details and save your changes.
                    </p>
                </div>
            </header>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-card space-y-6 rounded-xl border p-6 shadow-sm"
            >
                {/* Title */}
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        value={video.title}
                        onChange={(e) =>
                            setVideo({ ...video, title: e.target.value })
                        }
                    />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        rows={4}
                        value={video.description}
                        onChange={(e) =>
                            setVideo({ ...video, description: e.target.value })
                        }
                    />
                </div>

                {/* Course */}
                <div className="space-y-2">
                    <Label htmlFor="course_id">Course</Label>
                    <Select
                        value={
                            courses.find(
                                (course) => course.id === video.course_id,
                            )?.id
                        }
                        onValueChange={(value) =>
                            setVideo({ ...video, course_id: value })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent>
                            {courses.map((course) => (
                                <SelectItem key={course.id} value={course.id}>
                                    {course.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2"
                    >
                        <FileText className="h-4 w-4" />
                        {loading ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </form>
        </section>
    );
}
