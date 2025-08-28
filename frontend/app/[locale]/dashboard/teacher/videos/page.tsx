"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Video as VideoIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import VideoCard from "./_components/VideoCard";
import { useTranslations } from "next-intl";
import { deleteVideo, getTeacherVideos } from "@/lib/api/video";

export default function TeacherVideosPage() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const t = useTranslations("TEACHER_DASHBOARD.VIDEOS");

    useEffect(() => {
        fetchVideos();
    }, [setVideos]);

    const fetchVideos = async () => {
        try {
            // Replace with your actual API endpoint
            const response = await getTeacherVideos();
            setVideos(response as Video[]);
        } catch (error) {
            console.error("Error fetching videos:", error);
            toast.error("Failed to load videos");
        } finally {
            setIsLoading(false);
        }
    };

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

    const filteredVideos = videos.filter(
        (video) =>
            video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            video.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
            </div>
        );
    }

    return (
        <section>
            <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-semibold">{t("title")}</h1>
                    <p className="text-muted-foreground">{t("description")}</p>
                </div>
                <Button
                    onClick={() =>
                        router.push("/dashboard/teacher/videos/upload")
                    }
                    className="btn-primary"
                >
                    <Plus className="h-4 w-4" /> {t("upload_btn")}
                </Button>
            </header>

            <main className="flex flex-col gap-6 rounded-2xl border p-6">
                <div className="relative">
                    <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <Input
                        placeholder={t("search_placeholder")}
                        className="max-w-sm pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                {filteredVideos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-18">
                        <VideoIcon className="text-muted-foreground mb-4 h-12 w-12" />
                        <h3 className="mb-1 text-lg font-medium">
                            {t("no_videos")}
                        </h3>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredVideos.map((video) => (
                            <VideoCard
                                key={video.id}
                                video={video}
                                onDelete={handleDelete}
                                onEdit={(video) =>
                                    router.push(
                                        `/dashboard/teacher/videos/edit/${video.id}`,
                                    )
                                }
                            />
                        ))}
                    </div>
                )}
            </main>
        </section>
    );
}
