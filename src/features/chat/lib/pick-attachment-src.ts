import type { ChatAttachment } from "../types";
import {
  mediaDisplayCandidates,
  resolveMediaUrl,
} from "./resolve-media-url";
import { isImageDisplayUrl, isVideoFileUrl } from "./video-media";

function isRemoteUrl(url?: string | null): boolean {
  if (!url?.trim()) return false;
  return (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("//") ||
    url.startsWith("blob:") ||
    url.startsWith("data:")
  );
}

/** All display URLs to try — Flutter order: thumbnail then url for images/videos. */
export function attachmentImageCandidates(attachment: ChatAttachment): string[] {
  const raw =
    attachment.type === "image" || attachment.type === "video"
      ? [attachment.thumbnail, attachment.url, attachment.localPreview]
      : [attachment.url, attachment.thumbnail, attachment.localPreview];

  const seen = new Set<string>();
  const out: string[] = [];

  for (const item of raw) {
    if (!item) continue;
    if (attachment.type === "video" && isVideoFileUrl(item)) continue;
    if (attachment.type === "video" && item.startsWith("blob:")) continue;
    if (!isImageDisplayUrl(item) && !item.startsWith("data:image")) continue;

    for (const candidate of mediaDisplayCandidates(item)) {
      if (!candidate || seen.has(candidate)) continue;
      if (isVideoFileUrl(candidate)) continue;
      seen.add(candidate);
      out.push(candidate);
    }
  }

  return out;
}

/** JPEG poster for video bubbles — never a raw .mp4 URL. */
export function pickVideoPosterSrc(attachment: ChatAttachment): string {
  for (const item of [
    attachment.thumbnail,
    attachment.localPreview,
  ]) {
    if (!item) continue;
    if (item.startsWith("data:image")) return item;
    const resolved = resolveMediaUrl(item);
    if (resolved && isImageDisplayUrl(resolved)) {
      return mediaDisplayCandidates(resolved)[0] ?? resolved;
    }
  }
  return attachmentImageCandidates(attachment)[0] ?? "";
}

export function pickVideoPlayUrl(attachment: ChatAttachment): string {
  const raw =
    attachment.url?.trim() ||
    attachment.localPreview?.trim() ||
    "";
  return resolveMediaUrl(raw);
}

export function pickAttachmentImageSrc(attachment: ChatAttachment): string {
  return attachmentImageCandidates(attachment)[0] ?? "";
}

export function pickAttachmentPreviewUrl(attachment: ChatAttachment): string {
  const url = resolveMediaUrl(attachment.url);
  const thumb = resolveMediaUrl(attachment.thumbnail);
  if (isRemoteUrl(url) && !url.startsWith("blob:")) return url;
  if (isRemoteUrl(thumb) && !thumb.startsWith("blob:")) return thumb;
  return pickAttachmentImageSrc(attachment);
}
