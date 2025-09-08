"use client";

import { useRef, useEffect, useState } from "react";
import { Loader2, Play, Pause, Fullscreen, Volume2, VolumeX } from 'lucide-react';

interface SecureVideoPlayerProps {
    url: string;
    thumbnail?: string;
    className?: string;
}

export function SecureVideoPlayer({
    url,
    thumbnail,
    className = "",
}: SecureVideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Handle fullscreen changes
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleFullscreenChange = () => {
            const isNowFullscreen = !!document.fullscreenElement;
            setIsFullscreen(isNowFullscreen);
            setShowControls(!isNowFullscreen);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        
        // Initial setup
        video.controls = false;
        
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            video.controls = false;
        };
    }, []);

    // Block various download and context menu attempts
    useEffect(() => {
        const blockEvent = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        };

        const blockKeys = (e: KeyboardEvent) => {
            // Block F12, Ctrl+S, Ctrl+Shift+S, Ctrl+U, Ctrl+Shift+I, etc.
            if (
                e.key === "F12" ||
                (e.ctrlKey &&
                    (e.key === "s" ||
                        e.key === "S" ||
                        e.key === "u" ||
                        e.key === "U" ||
                        e.key === "i" ||
                        e.key === "I")) ||
                (e.ctrlKey &&
                    e.shiftKey &&
                    (e.key === "I" ||
                        e.key === "J" ||
                        e.key === "C" ||
                        e.key === "S"))
            ) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        };

        const blockContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            return false;
        };

        const blockDragStart = (e: DragEvent) => {
            e.preventDefault();
            return false;
        };

        // Add event listeners
        document.addEventListener("contextmenu", blockContextMenu, true);
        document.addEventListener("keydown", blockKeys, true);
        document.addEventListener("dragstart", blockDragStart, true);
        document.addEventListener("selectstart", blockEvent, true);

        // Add video-specific listeners
        const videoElement = videoRef.current;
        if (videoElement) {
            // Hide native controls completely
            videoElement.controls = false;

            // Block right-click menu
            videoElement.addEventListener("contextmenu", blockContextMenu);

            // Block video element from being dragged
            videoElement.addEventListener("dragstart", blockDragStart);

            // Block text selection on the video
            videoElement.addEventListener("selectstart", blockEvent);

            // Block keyboard shortcuts
            videoElement.addEventListener("keydown", blockKeys);
        }

        return () => {
            // Clean up all event listeners
            document.removeEventListener("contextmenu", blockContextMenu, true);
            document.removeEventListener("keydown", blockKeys, true);
            document.removeEventListener("dragstart", blockDragStart, true);
            document.removeEventListener("selectstart", blockEvent, true);

            if (videoElement) {
                videoElement.removeEventListener(
                    "contextmenu",
                    blockContextMenu,
                );
                videoElement.removeEventListener("dragstart", blockDragStart);
                videoElement.removeEventListener("selectstart", blockEvent);
                videoElement.removeEventListener("keydown", blockKeys);
            }
        };
    }, []);

    const togglePlay = () => {
        const video = videoRef.current;
        if (video) {
            if (video.paused) {
                video.play().then(() => setIsPlaying(true));
            } else {
                video.pause();
                setIsPlaying(false);
            }
        }
    };

    const toggleMute = () => {
        const video = videoRef.current;
        if (video) {
            video.muted = !video.muted;
            setIsMuted(video.muted);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        const video = videoRef.current;
        if (video) {
            video.volume = newVolume;
            setVolume(newVolume);
            setIsMuted(newVolume === 0);
        }
    };

    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (video) {
            const progress = (video.currentTime / video.duration) * 100;
            setProgress(progress);
            setCurrentTime(video.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        const video = videoRef.current;
        if (video) {
            setDuration(video.duration);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    if (!url) {
        return (
            <div
                className={`flex aspect-video items-center justify-center bg-gray-100 ${className}`}
            >
                <div className="text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-gray-400" />
                    <p className="mt-2 text-gray-500">Loading video...</p>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`relative overflow-hidden bg-black ${className}`}
            onClick={togglePlay}
            onDoubleClick={() => {
                const video = videoRef.current;
                if (video) {
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                    } else {
                        video.requestFullscreen().catch(console.error);
                    }
                }
            }}
        >
            <video
                ref={videoRef}
                src={url}
                className="h-full w-full cursor-pointer"
                preload="metadata"
                playsInline
                disablePictureInPicture
                poster={thumbnail}
                onEnded={() => setIsPlaying(false)}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onContextMenu={(e) => e.preventDefault()}
                onAuxClick={(e) => e.preventDefault()}
            />

            {/* Custom play button overlay */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <button
                        className="text-primary flex h-16 w-16 items-center justify-center rounded-full bg-white/90 transition-transform hover:scale-110"
                        onClick={(e) => {
                            e.stopPropagation();
                            togglePlay();
                        }}
                    >
                        <Play className="ml-1 h-8 w-8 fill-current" />
                    </button>
                </div>
            )}

            {/* Custom controls - only render when not in fullscreen */}
            {!isFullscreen && (
                <div 
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300"
                    style={{ opacity: showControls ? 1 : 0 }}
                    onMouseEnter={() => setShowControls(true)}
                    onMouseLeave={() => setShowControls(false)}
                >
                <div className="flex flex-col gap-2">
                    {/* Progress bar */}
                    <div className="flex w-full items-center gap-2 text-xs text-white">
                        <span>{formatTime(currentTime)}</span>
                        <div className="relative h-1 flex-1 bg-gray-600 rounded-full">
                            <div 
                                className="absolute left-0 top-0 h-full bg-primary rounded-full"
                                style={{ width: `${progress}%` }}
                            />
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={progress}
                                className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
                                onChange={(e) => {
                                    const video = videoRef.current;
                                    if (video) {
                                        video.currentTime = (parseInt(e.target.value) / 100) * video.duration;
                                    }
                                }}
                            />
                        </div>
                        <span>{formatTime(duration)}</span>
                    </div>
                    
                    {/* Controls */}
                    <div className="flex items-center p-4 justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    togglePlay();
                                }}
                                className="text-white hover:text-primary"
                            >
                                {isPlaying ? (
                                    <Pause className="h-5 w-5" />
                                ) : (
                                    <Play className="h-5 w-5 fill-current" />
                                )}
                            </button>
                            
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleMute();
                                }}
                                className="text-white hover:text-primary"
                            >
                                {isMuted || volume === 0 ? (
                                    <VolumeX className="h-5 w-5" />
                                ) : (
                                    <Volume2 className="h-5 w-5" />
                                )}
                            </button>
                            
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={isMuted ? 0 : volume}
                                className="w-20 accent-primary"
                                onChange={handleVolumeChange}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                        
                        <div className="flex items-center">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (document.fullscreenElement) {
                                        document.exitFullscreen();
                                    } else {
                                        videoRef.current?.requestFullscreen().catch(console.error);
                                    }
                                }}
                                className="text-white hover:text-primary"
                                title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                            >
                                <Fullscreen className="h-5 w-5" />
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
