import type { AttachmentType } from "../types";
import { isVideoFileUrl } from "../lib/video-media";
import { uploadChatFile } from "./upload";

export type UploadedMedia = {
  url: string;
  thumbnail: string;
  isAdult: boolean;
};

async function dataUrlToFile(dataUrl: string): Promise<File> {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], `thumb-${Date.now()}.jpg`, {
    type: blob.type || "image/jpeg",
  });
}

/**
 * Chat media upload — mirrors Flutter bottom_builder.dart
 * Chat messages use S3 only (not addAttachment).
 */
export async function uploadChatMedia(
  file: File,
  type: AttachmentType,
  userId: string,
  options?: {
    videoThumbnail?: string;
    onProgress?: (percent: number) => void;
  },
): Promise<UploadedMedia> {
  const onProgress = options?.onProgress;

  const result = await uploadChatFile(file, userId, onProgress);
  const publicUrl = result.publicUrl;

  if (type === "image") {
    return {
      url: publicUrl,
      thumbnail: publicUrl,
      isAdult: Boolean(result.isAdult),
    };
  }

  let thumbnailUrl = "";
  const thumbData = options?.videoThumbnail;

  if (thumbData?.startsWith("data:image")) {
    try {
      const thumbFile = await dataUrlToFile(thumbData);
      const thumbResult = await uploadChatFile(thumbFile, userId);
      thumbnailUrl = thumbResult.publicUrl;
    } catch {
      /* poster is optional; bubble falls back to <video> preview */
    }
  }

  if (type === "video" && (!thumbnailUrl || isVideoFileUrl(thumbnailUrl))) {
    return {
      url: publicUrl,
      thumbnail: "",
      isAdult: Boolean(result.isAdult),
    };
  }

  return {
    url: publicUrl,
    thumbnail: thumbnailUrl || publicUrl,
    isAdult: Boolean(result.isAdult),
  };
}
