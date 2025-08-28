"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Fullscreen, Pause, Play, Volume2, VolumeX } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function VideoPlayer({
    videoUrl,
    timestamps,
}: {
    videoUrl: string;
    timestamps?: { label: string; time: number }[];
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [progress, setProgress] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);

    const changeSpeed = (rate: number) => {
        const video = videoRef.current;
        if (!video) return;
        video.playbackRate = rate;
        setPlaybackRate(rate);
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const handleTimeUpdate = () => {
            setProgress((video.currentTime / video.duration) * 100);
        };
        video.addEventListener("timeupdate", handleTimeUpdate);
        return () => video.removeEventListener("timeupdate", handleTimeUpdate);
    }, [videoRef, setProgress]);

    const togglePlayPause = () => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = !video.muted;
        setIsMuted(video.muted);
    };

    const handleVolumeChange = (value: number[]) => {
        const video = videoRef.current;
        if (!video) return;
        const vol = value[0];
        video.volume = vol;
        setVolume(vol);
        setIsMuted(vol === 0);
    };

    const handleProgressChange = (value: number[]) => {
        const video = videoRef.current;
        if (!video) return;
        const newTime = (value[0] / 100) * video.duration;
        video.currentTime = newTime;
        setProgress(value[0]);
    };

    const handleFullscreen = () => {
        const video = videoRef.current;
        if (video?.requestFullscreen) {
            video.requestFullscreen();
        }
    };

    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (!video) return;
        setProgress((video.currentTime / video.duration) * 100);
    };

    function formatTime(seconds: number) {
        const mins = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const secs = Math.floor(seconds % 60)
            .toString()
            .padStart(2, "0");
        return `${mins}:${secs}`;
    }

    return (
        <Card className="mx-auto max-w-4xl p-0">
            <CardContent className="space-y-4 p-4 py-2 pt-5">
                <video
                    ref={videoRef}
                    src={videoUrl}
                    className="w-full cursor-pointer rounded-xl"
                    onClick={togglePlayPause}
                    onTimeUpdate={handleTimeUpdate}
                />
                <div className="mb-0 space-y-2">
                    {/* Progress Bar */}
                    <Slider
                        value={[progress]}
                        onValueChange={handleProgressChange}
                    />

                    {/* Controls */}
                    <div className="flex items-center justify-between">
                        {/* Progress Control */}
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" onClick={togglePlayPause}>
                                {isPlaying ? (
                                    <Pause className="h-5 w-5" />
                                ) : (
                                    <Play className="h-5 w-5" />
                                )}
                            </Button>
                            <Button variant="ghost" onClick={toggleMute}>
                                {isMuted || volume === 0 ? (
                                    <VolumeX className="h-5 w-5" />
                                ) : (
                                    <Volume2 className="h-5 w-5" />
                                )}
                            </Button>
                            <Slider
                                className="w-24"
                                value={[volume]}
                                max={1}
                                step={0.01}
                                onValueChange={handleVolumeChange}
                            />
                            <div className="mx-2 flex items-center gap-2 text-center text-sm text-gray-600">
                                <span>⏱</span>{" "}
                                {formatTime(videoRef.current?.currentTime || 0)}{" "}
                                / {formatTime(videoRef.current?.duration || 0)}
                            </div>
                        </div>
                        {/* Playrate Control */}
                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="w-12 text-xs"
                                    >
                                        {playbackRate}x
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {[0.25, 0.5, 0.75, 1, 1.5, 1.75, 2].map(
                                        (rate) => (
                                            <DropdownMenuItem
                                                key={rate}
                                                onClick={() =>
                                                    changeSpeed(rate)
                                                }
                                            >
                                                {rate}x
                                            </DropdownMenuItem>
                                        ),
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button variant="ghost" onClick={handleFullscreen}>
                                <Fullscreen className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
                {timestamps && (
                    <div className="mt-4 space-y-2">
                        {timestamps?.map(({ label, time }) => (
                            <Button
                                key={time}
                                variant="outline"
                                className="w-full justify-start text-left"
                                onClick={() => {
                                    if (videoRef.current) {
                                        videoRef.current.currentTime = time;
                                        videoRef.current.play();
                                    }
                                }}
                            >
                                ⏱ {formatTime(time)} – {label}
                            </Button>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
