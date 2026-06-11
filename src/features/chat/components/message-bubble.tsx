"use client";

import type { MouseEvent } from "react";
import {
  ChatBubble,
  ChatMessage,
  ChatMessageMeta,
} from "@/components/chat/message";
import { Check, CheckCheck } from "lucide-react";
import { formatMessageTime } from "../lib/format";
import { attachmentCaptionText } from "../lib/attachment-text";
import {
  pickAttachmentImageSrc,
  pickAttachmentPreviewUrl,
} from "../lib/pick-attachment-src";
import { resolveMediaUrl } from "../lib/resolve-media-url";
import type { ChatMessage as ChatMessageType } from "../types";
import { ChatImage } from "./chat-image";
import { ChatVideo } from "./chat-video";
import { VoiceMessagePlayer } from "./voice-message-player";

type MessageBubbleProps = {
  message: ChatMessageType;
  isSentByMe: boolean;
  isLastSame: boolean;
  loading?: boolean;
  onUnsend?: () => void;
  onImageClick?: (url: string) => void;
};

export function MessageBubble({
  message,
  isSentByMe,
  isLastSame,
  loading = false,
  onUnsend,
  onImageClick,
}: MessageBubbleProps) {
  const isDeleted = message.status === "deleted";
  const attachment = message.attachment;
  const imageSrc = attachment ? pickAttachmentImageSrc(attachment) : "";
  const previewUrl = attachment ? pickAttachmentPreviewUrl(attachment) : "";
  const hasAttachment =
    Boolean(
      attachment &&
        (attachment.type === "video"
          ? attachment.url || attachment.localPreview || attachment.thumbnail
          : attachment.type === "audio"
            ? attachment.url || attachment.localPreview
            : imageSrc || attachment.url),
    ) && !isDeleted;
  const uploadPct = attachment?.uploadProgress ?? 0;
  const isUploading = loading || message.status === "sending";
  const captionText = attachment
    ? attachmentCaptionText(message.text, attachment.type)
    : (message.text ?? "").trim();
  const hasCaption = Boolean(captionText) && !isDeleted;
  const from = isSentByMe ? "user" : "assistant";

  const displayText = (message.text ?? "").trim();
  const deletedText = isSentByMe
    ? "You deleted this message"
    : "This message was deleted";

  const ticks = isSentByMe && !isDeleted && (
    <>
      {message.status === "read" ? (
        <CheckCheck className="h-3 w-3 text-[var(--primary)]" />
      ) : message.status === "delivered" ? (
        <CheckCheck className="h-3 w-3 text-[var(--muted)]" />
      ) : (
        <Check className="h-3 w-3 text-[var(--muted)]" />
      )}
    </>
  );

  const meta = (
    <ChatMessageMeta sent={isSentByMe}>
      <time dateTime={message.timestamp.toISOString()}>
        {formatMessageTime(message.timestamp)}
      </time>
      {ticks}
    </ChatMessageMeta>
  );

  const handleContextMenu = (e: MouseEvent) => {
    if (!onUnsend) return;
    e.preventDefault();
    if (window.confirm("Unsend this message?")) onUnsend();
  };

  const content = (
    <>
      {hasAttachment && attachment ? (
        <ChatBubble
          from={from}
          media={attachment.type !== "audio"}
          className={attachment.type === "audio" ? "chat-bubble--audio" : undefined}
        >
          <div className="relative">
            {attachment.type === "image" && (
              <ChatImage
                key={`${imageSrc}|${previewUrl}`}
                attachment={attachment}
                src={imageSrc}
                fallbackSrc={attachment.url || attachment.thumbnail}
                eager={Boolean(attachment.localPreview)}
                onClick={() => onImageClick?.(resolveMediaUrl(previewUrl))}
              />
            )}
            {attachment.type === "video" && (
              <ChatVideo
                attachment={attachment}
                eager={Boolean(attachment.localPreview)}
              />
            )}
            {attachment.type === "audio" && (
              <VoiceMessagePlayer
                src={
                  attachment.localPreview ||
                  attachment.url ||
                  attachment.thumbnail
                }
                sent={isSentByMe}
                uploading={isUploading}
                durationHint={attachment.audioDurationSec}
              />
            )}
            {isUploading && attachment.type !== "audio" && (
              <div className="chat-upload-overlay">
                <svg viewBox="0 0 36 36" className="chat-upload-ring">
                  <circle cx="18" cy="18" r="15" className="chat-upload-ring-track" />
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    className="chat-upload-ring-progress"
                    strokeDasharray={`${(uploadPct / 100) * 94.2} 94.2`}
                  />
                </svg>
              </div>
            )}
          </div>
          {hasCaption && (
            <p className="chat-bubble-caption">{captionText}</p>
          )}
        </ChatBubble>
      ) : (
        <ChatBubble from={from}>
          <p className={isDeleted ? "italic opacity-70" : undefined}>
            {isDeleted ? deletedText : displayText}
          </p>
        </ChatBubble>
      )}
      {meta}
    </>
  );

  return (
    <ChatMessage
      from={from}
      compact={isLastSame}
      className={onUnsend ? "cursor-context-menu" : undefined}
      onContextMenu={onUnsend ? handleContextMenu : undefined}
    >
      {content}
    </ChatMessage>
  );
}
