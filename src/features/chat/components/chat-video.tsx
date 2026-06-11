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
};

export function ChatVideo({ attachment, eager = false }: ChatVideoProps) {
  const playUrl = useMemo(() => pickVideoPlayUrl(attachment), [attachment]);
  const posterSrc = useMemo(() => pickVideoPosterSrc(attachment), [attachment]);
  const localBlob =
    attachment.localPreview?.startsWith("blob:") ? attachment.localPreview : "";
  const previewSrc = localBlob || playUrl;

  const content =
    posterSrc && !localBlob ? (
      <ChatImage
        attachment={attachment}
        src={posterSrc}
        fallbackSrc={posterSrc}
        eager={eager}
        className="chat-media-img"
      />
    ) : previewSrc ? (
      <video
        src={previewSrc}
        className="chat-media-img chat-media-video"
        muted
        playsInline
        preload={eager ? "auto" : "metadata"}
        poster={posterSrc || undefined}
      />
    ) : (
      <span className="chat-media-placeholder" />
    );

  if (!playUrl && !localBlob) {
    return <span className="chat-media-placeholder" />;
  }

  return (
    <a
      href={playUrl || localBlob}
      target="_blank"
      rel="noopener noreferrer"
      className="chat-media-btn relative block"
    >
      {content}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30">
        <Play className="h-10 w-10 fill-white text-white" />
      </span>
    </a>
  );
}
