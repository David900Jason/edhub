"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
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
import { uploadVideo } from "@/lib/api/video"; // ✅ our chunk upload wrapper
import { ArrowLeft, Loader2, Upload } from "lucide-react";
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
    const [video, setVideo] = useState<CreateVideoForm>({
        title: "",
        description: "",
        video_url: undefined,
        thumbnail_url: undefined,
        course_id: "",
    });

    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            const courses = await getCourses();
            if (courses) setCourses(courses);
        };
        fetchCourses();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!video.video_url) {
            toast.error("Please select a video file");
            return;
        }

        try {
            setDialogOpen(true);
            setLoading(true);

            await uploadVideo(
                video.video_url,
                {
                    title: video.title,
                    description: video.description,
                    course_id: video.course_id,
                    thumbnail_url: video.thumbnail_url || null,
                },
                (percent) => setProgress(percent),
            );

            toast.success("Video uploaded successfully!");
            setDialogOpen(false);
            router.back();
        } catch (error) {
            console.error(error);
            toast.error("Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="mx-auto max-w-2xl space-y-8">
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
                    <h1 className="text-2xl font-semibold">Upload Video</h1>
                    <p className="text-muted-foreground text-sm">
                        Fill in the details and upload your video to the
                        platform.
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
                        placeholder="Enter video title"
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
                        placeholder="Briefly describe this video"
                    />
                </div>

                {/* Video File */}
                <div className="space-y-2">
                    <Label htmlFor="video_url">Video File</Label>
                    <Input
                        id="video_url"
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

                {/* Thumbnail */}
                <div className="space-y-2">
                    <Label htmlFor="thumbnail_url">Thumbnail</Label>
                    <Input
                        id="thumbnail_url"
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

                {/* Course */}
                <div className="space-y-2">
                    <Label htmlFor="course_id">Course</Label>
                    <Select
                        value={video.course_id}
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
                        {loading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload className="h-4 w-4" />
                                Upload Video
                            </>
                        )}
                    </Button>
                </div>
            </form>

            {/* Progress Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Uploading Video</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 py-6">
                        <Progress value={progress} className="w-full" />
                        <p className="text-muted-foreground text-center text-sm">
                            {progress < 100 ? `${progress}%` : "Finalizing..."}
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
}
