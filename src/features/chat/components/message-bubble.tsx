"use client";

import {
  ChatBubble,
  ChatMessage,
  ChatMessageMeta,
} from "@/components/chat/message";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, CheckCheck, MoreHorizontal, Undo2 } from "lucide-react";
import { RelativeTime } from "@/components/chat/relative-time";
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
  onVideoClick?: (payload: { url: string; poster?: string }) => void;
};

export function MessageBubble({
  message,
  isSentByMe,
  isLastSame,
  loading = false,
  onUnsend,
  onImageClick,
  onVideoClick,
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
  const canUnsend = Boolean(onUnsend) && !isDeleted && !isUploading;

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
      <RelativeTime date={message.timestamp} />
      {ticks}
    </ChatMessageMeta>
  );

  const bubbleContent = (
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
                skipBlur={isUploading}
                onClick={() => onImageClick?.(resolveMediaUrl(previewUrl))}
              />
            )}
            {attachment.type === "video" && (
              <ChatVideo
                attachment={attachment}
                eager={Boolean(attachment.localPreview)}
                skipBlur={isUploading}
                onOpen={onVideoClick}
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
          <p className={isDeleted ? "chat-bubble-deleted" : undefined}>
            {isDeleted ? deletedText : displayText}
          </p>
        </ChatBubble>
      )}
    </>
  );

  return (
    <ChatMessage
      from={from}
      compact={isLastSame}
      className="chat-msg-row-wrap"
    >
      <div className={`chat-msg-bubble-wrap${isSentByMe ? " chat-msg-bubble-wrap--sent" : ""}`}>
        {canUnsend && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="chat-msg-action-btn"
                aria-label="Message options"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align={isSentByMe ? "end" : "start"}
              className="chat-menu-panel chat-msg-menu"
            >
              <DropdownMenuItem
                className="chat-menu-item chat-menu-item--danger"
                onClick={onUnsend}
              >
                <Undo2 className="h-4 w-4" />
                Unsend message
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {bubbleContent}
      </div>
      {meta}
    </ChatMessage>
  );
}
