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

    useEffect(() => {
        const fetchVideo = async () => {
            const video = await getTeacherVideo(videoId as string);
            if (video) {
                setVideo({
                    title: video.title,
                    description: video.description,
                    video_url: undefined,
                    thumbnail_url: undefined,
                    course_id: video.course?.id as string,
                });
            }
        };

        const fetchCoursesIds = async () => {
            const courses = await getCourses();
            if (courses) {
                setCourses(courses);
            }
        };

        fetchVideo();
        fetchCoursesIds();
    }, [videoId]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", video.title);
        formData.append("description", video.description);
        if (video.video_url) {
            formData.append("video_url", video.video_url as File);
        }
        if (video.thumbnail_url) {
            formData.append("thumbnail_url", video.thumbnail_url as File);
        }
        formData.append("course_id", video.course_id);

        updateVideo(videoId as string, formData);
        router.back();
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
                    <h1 className="text-3xl font-semibold">Edit Video</h1>
                    <p className="text-muted-foreground">
                        Edit the video details below.
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
                        <Label className="mb-2" htmlFor="url">
                            Video file
                        </Label>
                        <Input
                            id="url"
                            name="url"
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
                        <Label className="mb-2" htmlFor="thumbnail">
                            Thumbnail
                        </Label>
                        <Input
                            id="thumbnail"
                            name="thumbnail"
                            type="file"
                            placeholder="Upload another video instead of the latter"
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
                        <Label className="mb-2" htmlFor="course">
                            Course
                        </Label>
                        <Select
                            value={video?.course_id}
                            onValueChange={(value) =>
                                setVideo({ ...video, course_id: value })
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
                        <Button className="btn-primary w-fit" type="submit">
                            <FileText /> Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => router.back()}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </main>
        </section>
    );
};
