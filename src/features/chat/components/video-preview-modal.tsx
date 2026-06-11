"use client";

import {
  Maximize,
  Minimize,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  resolveDisplayMediaUrl,
  resolveMediaUrl,
} from "../lib/resolve-media-url";

export type VideoPreviewState = {
  url: string;
  poster?: string;
} | null;

type VideoPreviewModalProps = {
  media: VideoPreviewState;
  onClose: () => void;
};

function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function VideoPreviewModal({ media, onClose }: VideoPreviewModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPoster, setShowPoster] = useState(true);

  const videoUrl = media ? resolveDisplayMediaUrl(resolveMediaUrl(media.url)) : "";
  const posterUrl = media?.poster
    ? resolveDisplayMediaUrl(resolveMediaUrl(media.poster))
    : "";

  const reset = useCallback(() => {
    setPlaying(false);
    setProgress(0);
    setDuration(0);
    setCurrent(0);
    setShowPoster(true);
    setMuted(false);
  }, []);

  useEffect(() => {
    if (!media) {
      reset();
      return;
    }
    reset();
  }, [media, reset]);

  useEffect(() => {
    if (!media) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [media, onClose]);

  useEffect(() => {
    const onFs = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  if (!media || !videoUrl) return null;

  const togglePlay = async () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      setShowPoster(false);
      await el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  const toggleFullscreen = async () => {
    const target = shellRef.current;
    if (!target) return;
    if (!document.fullscreenElement) {
      await target.requestFullscreen?.();
    } else {
      await document.exitFullscreen?.();
    }
  };

  const seek = (pct: number) => {
    const el = videoRef.current;
    if (!el || !duration) return;
    el.currentTime = (pct / 100) * duration;
  };

  return (
    <div
      className="chat-video-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
      onClick={onClose}
    >
      <div
        ref={shellRef}
        className="chat-video-player"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="chat-video-lightbox-close"
          onClick={onClose}
          aria-label="Close video"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="chat-video-stage">
          {showPoster && posterUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={posterUrl}
              alt=""
              className="chat-video-poster"
              aria-hidden
            />
          )}

          <video
            ref={videoRef}
            src={videoUrl}
            poster={posterUrl || undefined}
            className={cn("chat-video-element", showPoster && posterUrl && "opacity-0")}
            playsInline
            preload="metadata"
            onLoadedMetadata={(e) => {
              setDuration(e.currentTarget.duration || 0);
            }}
            onTimeUpdate={(e) => {
              const el = e.currentTarget;
              setCurrent(el.currentTime);
              if (el.duration) {
                setProgress((el.currentTime / el.duration) * 100);
              }
            }}
            onPlay={() => {
              setPlaying(true);
              setShowPoster(false);
            }}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onClick={togglePlay}
          />

          {!playing && (
            <button
              type="button"
              className="chat-video-center-play"
              onClick={togglePlay}
              aria-label="Play video"
            >
              <Play className="h-10 w-10 fill-white text-white" />
            </button>
          )}
        </div>

        <div className="chat-video-controls">
          <button
            type="button"
            className="chat-video-control-btn"
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 fill-current" />
            )}
          </button>

          <span className="chat-video-time">
            {formatTime(current)} / {formatTime(duration)}
          </span>

          <input
            type="range"
            min={0}
            max={100}
            step={0.1}
            value={progress}
            onChange={(e) => seek(Number(e.target.value))}
            className="chat-video-seek"
            aria-label="Seek"
          />

          <button
            type="button"
            className="chat-video-control-btn"
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </button>

          <button
            type="button"
            className="chat-video-control-btn"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize className="h-5 w-5" />
            ) : (
              <Maximize className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
