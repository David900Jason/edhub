import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { Eye, Play, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

interface VideoCardProps {
    video: {
        id: string;
        title: string;
        video_url?: string;
        thumbnail_url?: string;
        likes: number;
        views: number;
    };
}

const VideoCard = ({ video }: VideoCardProps) => {
    const { courseId } = useParams();

    return (
        <div key={video.id} className="overflow-hidden rounded-lg border">
            <Image
                src={video.thumbnail_url == null ? "https://dummyimage.com/600x400" : video.thumbnail_url}
                alt={video.title}
                width={600}
                height={400}
            />
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <h3 className="mb-2 line-clamp-1 flex-1 text-lg font-semibold">
                        {video.title}
                    </h3>
                    <Button asChild variant="ghost" size="sm">
                        <Link href={`/dashboard/student/courses/${courseId}/videos/${video.id}`}>
                            <Play size={16} className="inline" />
                        </Link>
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <p className="p-lead flex items-center gap-1">
                        {video.likes} <ThumbsUp className="inline" size={16} />
                    </p>
                    <span>|</span>
                    <p className="p-lead flex items-center gap-1">
                        {video.views} <Eye className="inline" size={16} />
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;