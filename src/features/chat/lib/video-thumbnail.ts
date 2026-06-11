import { createPlaceholderThumbnailDataUrl } from "./video-media";

function seekAndCapture(video: HTMLVideoElement): string {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth || 320;
  canvas.height = video.videoHeight || 240;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.82);
}

export function captureVideoThumbnail(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    const url = URL.createObjectURL(file);
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "true");

    const seekTimes = [0.1, 0.5, 1, 0];
    let seekIdx = 0;

    const cleanup = () => {
      URL.revokeObjectURL(url);
      video.remove();
    };

    const trySeek = () => {
      if (seekIdx >= seekTimes.length) {
        cleanup();
        reject(new Error("Video thumbnail failed"));
        return;
      }
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      const t =
        duration > 0
          ? Math.min(seekTimes[seekIdx], Math.max(0, duration - 0.05))
          : seekTimes[seekIdx];
      video.currentTime = t;
      seekIdx += 1;
    };

    video.onloadedmetadata = () => {
      trySeek();
    };

    video.onseeked = () => {
      try {
        const dataUrl = seekAndCapture(video);
        cleanup();
        resolve(dataUrl);
      } catch {
        trySeek();
      }
    };

    video.onerror = () => {
      cleanup();
      reject(new Error("Video thumbnail failed"));
    };

    video.src = url;
    video.load();
  });
}

/** Always returns a JPEG data URL suitable for S3 thumbnail upload. */
export async function ensureVideoThumbnailDataUrl(
  file: File,
  existing?: string,
): Promise<string> {
  if (existing?.startsWith("data:image")) return existing;
  try {
    return await captureVideoThumbnail(file);
  } catch {
    return createPlaceholderThumbnailDataUrl();
  }
}
