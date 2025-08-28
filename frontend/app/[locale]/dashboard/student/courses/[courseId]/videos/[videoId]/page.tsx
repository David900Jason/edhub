"use client";

import { Link } from "@/i18n/routing";
import { format } from "timeago.js";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getVideo } from "@/lib/api/video";
import LikeButton from "./_components/LikeButton";
import VideoTabs from "./_components/VideoTabs";

export default function VideoPage() {
    const { courseId, videoId } = useParams();
    const [video, setVideo] = useState<Video | null>(null);

    useEffect(() => {
        const fetchVideo = async () => {
            const video = await getVideo(videoId as string);
            setVideo(video);
        };
        fetchVideo();
    }, [videoId]);

    return (
        <>
            <section>
                <header className="mb-6 hidden">
                    <h1 className="text-3xl font-semibold">
                        {video?.title || "Video Title"}
                    </h1>
                    <p className="text-lg">
                        {video?.description || "Video Description"}
                    </p>
                </header>
                <section className="mb-2 flex max-h-[600px] w-full gap-4">
                    {/* Video Container */}
                    <div className="aspect-video w-full flex-3 rounded-2xl border bg-white p-6 dark:bg-black/50">
                        <video
                            className="h-full w-full rounded-2xl"
                            controlsList="nodownload"
                            src={video?.video_url}
                            controls
                        ></video>
                        {/* Feedback */}
                        <div className="mt-4 flex items-center justify-between gap-2 px-2">
                            <div className="flex items-center gap-2">
                                <p className="p-lead">
                                    {video?.views || 0} views
                                </p>
                                <span className="text-gray-400 dark:text-gray-500">
                                    |
                                </span>
                                <p className="p-lead">
                                    {format(video?.created_at || "")}
                                </p>
                            </div>
                            <LikeButton
                                id={video?.id as string}
                                likes={video?.likes as number}
                            />
                        </div>
                    </div>
                    <aside className="flex-1 overflow-y-auto rounded-2xl border bg-white p-6 dark:bg-black/50">
                        <ul className="flex flex-col gap-6">
                            {video?.related_videos?.map((video) => (
                                <li
                                    className="rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800"
                                    key={video.id}
                                >
                                    <Link
                                        className="block p-4"
                                        href={`/dashboard/student/courses/${courseId}/videos/${video.id}`}
                                    >
                                        {video.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </aside>
                </section>
                {/* Video Tabs */}
                <section className="my-4 rounded-2xl border bg-white p-6 dark:bg-black/50">
                    <VideoTabs video={video} />
                </section>
            </section>
        </>
    );
}
