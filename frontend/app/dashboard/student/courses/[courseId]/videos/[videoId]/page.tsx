import Link from "next/link";
import { cookies } from "next/headers";
import { getVideoById, getVideosById, updateViews } from "@/lib/api/video";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoTabs from "./VideoTabs";
import { format } from "timeago.js";
import LikeButton from "./LikeButton";

export async function generateStaticParams() {
    // Return at least one static param for static export
    // In a real app, you would fetch all videos here
    return [{ courseId: "1", videoId: "1" }];
}

export default async function VideoPage({
    params,
}: {
    params: Promise<{ courseId: string; videoId: string }>;
}) {
    const { courseId, videoId } = await params;
    const cookiesStore = await cookies();
    const user = JSON.parse(cookiesStore.get("user")?.value || "");
    const video: Video | null = await getVideoById(videoId);
    const videos: Video[] = await getVideosById(courseId);

    if (!video) return <p>Video not found</p>;

    // Increment Video Views
    const views = video.views + 1;
    await updateViews(videoId, views);

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
                    <div className="aspect-video w-full flex-3 rounded-2xl border bg-black/50 p-4 shadow-lg">
                        <video
                            className="w-full rounded-2xl"
                            src={video?.url || ""}
                            controls
                        ></video>
                        {/* Feedback */}
                        <div className="mt-4 flex items-center justify-between gap-2 px-2">
                            <div className="flex items-center gap-2">
                                <p className="p-lead">
                                    {video?.views || 0} views
                                </p>
                                <span className="text-gray-400">|</span>
                                <p className="p-lead">
                                    {format(video?.created_at || "")}
                                </p>
                            </div>
                            <LikeButton
                                id={video?.id || ""}
                                likes={video?.likes || 0}
                            />
                        </div>
                    </div>
                    <aside className="flex-1 overflow-y-auto rounded-2xl border bg-black/50 p-4 shadow-lg">
                        <ul className="max-h-full space-y-3">
                            {videos.map(({ id, title }) => (
                                <li
                                    key={id}
                                    className="flex items-center justify-between rounded-2xl border bg-black/50 p-3"
                                >
                                    <Link
                                        href={`/dashboard/student/courses/${courseId}/videos/${id}`}
                                    >
                                        {title}
                                    </Link>
                                    {/* Video player icon */}
                                    <Button asChild variant="outline">
                                        <Link
                                            href={`/dashboard/student/courses/${courseId}/videos/${id}`}
                                        >
                                            <Play />
                                        </Link>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </aside>
                </section>
                {/* Video Tabs */}
                <section className="mb-2">
                    <VideoTabs video={video || null} currentUser={user} />
                </section>
                {/* Navigation Actions */}
                <footer></footer>
            </section>
        </>
    );
}
