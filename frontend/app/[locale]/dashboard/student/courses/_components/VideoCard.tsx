import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { Eye, Play, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { format } from "timeago.js";

interface VideoCardProps {
    video: {
        id: string;
        title: string;
        video_url?: string;
        thumbnail_url?: string;
        likes: number;
        views: number;
        duration?: string;
        created_at?: string;
    };
    className?: string;
    showCourseLink?: boolean;
}

const VideoCard = ({ video, className, showCourseLink = false }: VideoCardProps) => {
    const { courseId } = useParams();
    
    // Format duration if available
    const formatDuration = (seconds?: number) => {
        if (!seconds) return null;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <article
            className={cn(
                "group border-border/50 bg-card relative flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-300",
                "hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg",
                className,
            )}
        >
            {/* Thumbnail with play button overlay */}
            <div className="relative aspect-video overflow-hidden">
                <Image
                    src={
                        video.thumbnail_url
                            ? video.thumbnail_url
                            : "/videos/thumbnails/placeholder-image.png"
                    }
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                />

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="text-primary flex h-16 w-16 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                        <Link
                            href={`/dashboard/student/courses/${courseId}/videos/${video.id}`}
                        >
                            <Play className="ml-1 h-6 w-6 cursor-pointer fill-current" />
                        </Link>
                    </div>
                </div>

                {/* Video duration badge */}
                {video.duration && (
                    <span className="absolute right-2 bottom-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
                        {formatDuration(Number(video.duration))}
                    </span>
                )}
            </div>

            {/* Video info */}
            <div className="flex flex-1 flex-col p-4">
                <div className="flex-1">
                    <h3 className="text-foreground group-hover:text-primary mb-1.5 line-clamp-2 text-sm leading-tight font-semibold transition-colors">
                        {video.title}
                    </h3>

                    {video.created_at && (
                        <p className="text-muted-foreground mb-2 text-xs">
                            {format(video.created_at)}
                        </p>
                    )}
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <div className="text-muted-foreground flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1">
                            <Eye className="h-3.5 w-3.5" />
                            {video.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                            <ThumbsUp className="h-3.5 w-3.5" />
                            {video.likes.toLocaleString()}
                        </span>
                    </div>

                    {showCourseLink && courseId && (
                        <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="btn-primary h-7 text-xs font-medium"
                        >
                            <Link
                                href={`/dashboard/student/courses/${courseId}`}
                            >
                                View Course
                            </Link>
                        </Button>
                    )}
                </div>

                <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="border-primary text-primary hover:border-primary/50 hover:text-primary mt-3 w-full gap-1.5 text-xs font-medium transition-all"
                >
                    <Link
                        href={`/dashboard/student/courses/${courseId}/videos/${video.id}`}
                    >
                        <Play className="h-3.5 w-3.5" />
                        Watch Now
                    </Link>
                </Button>
            </div>
        </article>
    );
};

export default VideoCard;


