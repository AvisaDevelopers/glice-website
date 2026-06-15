"use client";

import { Play } from "lucide-react";
import { useMemo } from "react";
import {
  pickVideoPlayUrl,
  pickVideoPosterSrc,
} from "../lib/pick-attachment-src";
import type { ChatAttachment } from "../types";
import { ChatImage } from "./chat-image";

type ChatVideoProps = {
  attachment: ChatAttachment;
  eager?: boolean;
  skipBlur?: boolean;
  onOpen?: (payload: { url: string; poster?: string }) => void;
};

export function ChatVideo({
  attachment,
  eager = false,
  skipBlur = false,
  onOpen,
}: ChatVideoProps) {
  const playUrl = useMemo(() => pickVideoPlayUrl(attachment), [attachment]);
  const posterSrc = useMemo(() => pickVideoPosterSrc(attachment), [attachment]);
  const localBlob =
    attachment.localPreview?.startsWith("blob:") ? attachment.localPreview : "";

  const openPayload = useMemo(() => {
    const url = playUrl || localBlob;
    if (!url) return null;
    return { url, poster: posterSrc || undefined };
  }, [playUrl, localBlob, posterSrc]);

  if (!openPayload) {
    return <span className="chat-media-placeholder" />;
  }

  const handleOpen = () => {
    onOpen?.(openPayload);
  };

  return (
    <button
      type="button"
      className="chat-media-btn relative block w-full"
      onClick={handleOpen}
      aria-label="Play video"
    >
      {posterSrc ? (
        <ChatImage
          attachment={attachment}
          src={posterSrc}
          fallbackSrc={posterSrc}
          eager={eager}
          skipBlur={skipBlur}
          className="chat-media-img"
        />
      ) : localBlob ? (
        <video
          src={localBlob}
          className="chat-media-img chat-media-video"
          muted
          playsInline
          preload="metadata"
          aria-hidden
        />
      ) : (
        <span className="chat-media-placeholder chat-media-placeholder--video" />
      )}
      <span className="chat-video-play-overlay" aria-hidden>
        <Play className="h-10 w-10 fill-white text-white" />
      </span>
    </button>
  );
}
