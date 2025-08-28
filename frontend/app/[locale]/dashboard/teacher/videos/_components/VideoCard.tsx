"use client";

import { Button } from "@/components/ui/button";
import { format } from "timeago.js";
import { Edit, Eye, ThumbsUp, Trash2, Video } from "lucide-react";
import Image from "next/image";
import Tag from "@/components/ui/Tag";
import Link from "next/link";

const VideoCard = ({
    video,
    onDelete,
    onEdit,
}: {
    video: Video;
    onDelete: (id: string) => void;
    onEdit: (video: Video) => void;
}) => (
    <div className="flex flex-col relative overflow-hidden rounded-2xl border">
        {/* Image */}
        <div>
            {video.thumbnail_url == null ? (
                <Video className="text-muted-foreground h-12 w-12" />
            ) : (
                <Image
                    src={video.thumbnail_url}
                    alt={video.title}
                    width={600}
                    height={400}
                    className="h-48 w-full object-cover"
                />
            )}
        </div>
        {/* Course */}
        <div className="flex absolute top-4 left-4 items-center justify-between gap-2">
            <Tag color="blue">{video.course?.title}</Tag>
        </div>
        {/* Content */}
        <div className="flex-1 px-4 py-4">
            <h3 className="line-clamp-2 text-lg font-medium">
                <Link href={`${video.video_url}`}>{video.title}</Link>
            </h3>
            <p className="p-lead mt-1 line-clamp-2 text-sm">
                {video.description === "" ? "No description" : video.description}
            </p>
        </div>
        {/* Tags */}
        <div className="flex items-center justify-between gap-2 pb-4 px-4 text-sm">
            <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">{video.likes} <ThumbsUp className="h-4 w-4" /></span>
                <span className="flex items-center gap-1">{video.views} <Eye className="h-4 w-4" /></span>
            </div>
            <span>{format(video.created_at)}</span>
        </div>
        {/* Actions */}
        <div className="flex items-center justify-end gap-2 px-4 pb-4">
            <Button variant="outline" onClick={() => onEdit(video)}>
                <Edit />
            </Button>
            <Button
                variant="destructive"
                onClick={() => onDelete(video.id as string)}
            >
                <Trash2 />
            </Button>
        </div>
    </div>
);

export default VideoCard;
