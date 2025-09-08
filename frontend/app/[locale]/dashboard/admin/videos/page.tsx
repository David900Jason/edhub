"use client";

import { useEffect, useMemo, useState } from "react";
import { getVideos, deleteVideo } from "@/lib/api/video";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import VideoCard from "../../teacher/videos/_components/VideoCard";
import { useRouter } from "@/i18n/routing";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const AdminVideosPage = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCourseId, setSelectedCourseId] = useState<string>("all");
    const router = useRouter();

    useEffect(() => {
        getVideos().then((res: Video[] | null) => setVideos(res || []));
    }, [setVideos]);

    // Filter Courses according to course or title
    const filteredVideos = useMemo(() => {
        return videos.filter((video) => {
            const matchesCourses =
                selectedCourseId === "all" ||
                video.course?.id === selectedCourseId;

            return (
                matchesCourses &&
                video.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                video.course?.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            );
        });
    }, [videos, searchQuery, selectedCourseId]);

    const uniqueCourses = useMemo(() => {
        return videos.reduce((acc, video) => {
            if (!acc.some((course) => course.id === video.course?.id)) {
                acc.push(video.course as CourseType);
            }
            return acc;
        }, [] as CourseType[]);
    }, [videos]);

    const handleDelete = async (id: string) => {
        // Confirm deletion
        toast("Are you sure you want to delete this video?", {
            position: "top-center",
            action: (
                <>
                    <Button
                        variant="destructive"
                        onClick={async () => {
                            try {
                                await deleteVideo(id);
                                setVideos(
                                    videos.filter((video) => video.id !== id),
                                );
                                toast.success("Video deleted successfully");
                            } catch (error) {
                                console.error("Error deleting video:", error);
                                toast.error("Failed to delete video");
                            }
                        }}
                    >
                        Yes
                    </Button>
                    <Button variant="outline" onClick={() => toast.dismiss()}>
                        No
                    </Button>
                </>
            ),
        });
    };

    return (
        <section>
            <header className="mb-8">
                <h1 className="text-3xl font-semibold">Videos</h1>
                <p className="p-lead">
                    Here&apos;s a table containing all videos
                </p>
            </header>

            {videos && (
                <main className="rounded-2xl border p-6">
                    <aside className="flex flex-col items-center justify-between gap-2 md:flex-row mb-6">
                        <Input
                            type="search"
                            onChange={(e) => setSearchQuery(e.target.value)}
                            value={searchQuery}
                            placeholder="Search videos..."
                        />
                        <Select
                            value={selectedCourseId}
                            onValueChange={setSelectedCourseId}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a course" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {uniqueCourses.map((course) => (
                                    <SelectItem
                                        key={course.id}
                                        value={course.id}
                                    >
                                        {course.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </aside>

                    {filteredVideos.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filteredVideos.map((video: Video) => (
                                <VideoCard
                                    key={video.id}
                                    video={video}
                                    onDelete={handleDelete}
                                    onEdit={(video) =>
                                        router.push(
                                            `/dashboard/admin/videos/edit/${video.id}`,
                                        )
                                    }
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex min-h-[40vh] items-center justify-center">
                            <p className="text-center">No videos found</p>
                        </div>
                    )}
                </main>
            )}

            {!videos && (
                <main className="flex min-h-[40vh] items-center justify-center rounded-2xl border p-6">
                    <p className="text-center">No videos found</p>
                </main>
            )}
        </section>
    );
};

export default AdminVideosPage;
