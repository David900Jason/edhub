import { Play } from "lucide-react";
import { Link } from "@/i18n/routing";

interface RelatedVideosProps {
    videos: { id: string; title: string }[] | undefined;
    currentVideoId: string | number;
    courseId: string;
}

export default function RelatedVideos({
    videos,
    currentVideoId,
    courseId,
}: RelatedVideosProps) {
    if (!videos || videos.length === 0) {
        return (
            <div className="rounded-lg border p-4 text-center">
                <p className="text-muted-foreground">
                    No related videos available
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-[60vh] space-y-4">
            {videos
                .filter(
                    (video) =>
                        video.id.toString() !== currentVideoId.toString(),
                )
                .map((video) => (
                    <Link
                        key={video.id}
                        href={`/dashboard/student/courses/${courseId}/videos/${video.id}`}
                        className="group hover:bg-muted/50 flex items-center gap-3 rounded-lg border p-3 transition-colors"
                    >
                        <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-md">
                            <Play className="h-4 w-4 fill-current" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <h3 className="group-hover:text-primary truncate font-medium group-hover:no-underline">
                                {video.title}
                            </h3>
                        </div>
                    </Link>
                ))}
        </div>
    );
}


