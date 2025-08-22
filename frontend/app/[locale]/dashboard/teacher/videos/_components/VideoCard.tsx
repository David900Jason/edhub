"use client";

import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Edit, Trash2, Video } from "lucide-react";

const VideoCard = ({
    video,
    onDelete,
    onEdit,
}: {
    video: Video;
    onDelete: (id: string) => void;
    onEdit: (video: Video) => void;
}) => (
    <div className="bg-card text-card-foreground overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md">
        <div className="bg-muted relative flex aspect-video items-center justify-center">
            <Video className="text-muted-foreground h-12 w-12" />
        </div>
        <div className="p-4">
            <div className="flex items-start justify-between">
                <h3 className="line-clamp-2 text-lg font-medium">{video.title}</h3>
            </div>
            <p className="p-lead mt-1 line-clamp-2 text-sm">
                {video.description}
            </p>
            <div className="text-muted-foreground mt-3 mb-3 flex items-center justify-between text-xs">
                <span>{video.views} views</span>
                <span>{format(new Date(video.created_at), "MMM d, yyyy")}</span>
            </div>
            <hr />
            <div className="mt-4 flex justify-end space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(video)}
                >
                    <Edit className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(video.id as string)}
                >
                    <Trash2 className="text-red-500 h-4 w-4" />
                </Button>
            </div>
        </div>
    </div>
);

export default VideoCard;
