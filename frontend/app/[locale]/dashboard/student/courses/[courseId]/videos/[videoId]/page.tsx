"use client";

import { Link } from "@/i18n/routing";
import { format } from "timeago.js";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getVideo } from "@/lib/api/video";
import LikeButton from "./_components/LikeButton";
import VideoTabs from "./_components/VideoTabs";
import { Clock, Eye } from "lucide-react";
import { SecureVideoPlayer } from "@/components/player/SecureVideoPlayer";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home, Video } from "lucide-react";

export default function VideoPage() {
    const { courseId, videoId } = useParams();
    const [video, setVideo] = useState<Video | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                setIsLoading(true);
                const video = await getVideo(videoId as string);
                setVideo(video);
            } catch (error) {
                console.error("Error fetching video:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchVideo();
    }, [videoId]);

    if (isLoading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <div className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Back Navigation */}

            <nav className="mb-6 flex items-center gap-2">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link
                                className="flex items-center gap-2"
                                href={"/dashboard"}
                            >
                                <Home size={16} />
                                Home
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link
                                className="flex items-center gap-2"
                                href={`/dashboard/student/courses/${courseId}`}
                            >
                                <Video size={16} />
                                {video?.course?.title}
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                {video?.title}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </nav>

            {/* Video Player Section */}
            <section className="bg-card overflow-hidden rounded-2xl border shadow-sm">
                <div className="aspect-video w-full">
                    <SecureVideoPlayer
                        url={video?.video_url || ""}
                        thumbnail={video?.thumbnail_url}
                        className="h-full w-full"
                    />
                </div>

                {/* Video Info */}
                <div className="border-t p-6">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold tracking-tight">
                                {video?.title || "Untitled Video"}
                            </h1>
                            <div className="text-muted-foreground mt-2 flex items-center gap-4 text-sm">
                                <span className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {format(video?.created_at || new Date())}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Eye className="h-4 w-4" />
                                    {video?.views?.toLocaleString() || 0} views
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {video && (
                                <LikeButton
                                    id={video.id as string}
                                    likes={video.likes}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabs Section */}
            <VideoTabs video={video} />
        </div>
    );
}

