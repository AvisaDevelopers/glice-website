/** Max video length — mirrors Flutter iceBreakerDurationError(30). */
export const MAX_VIDEO_DURATION_SEC = 30;

/** Soft cap before upload; large raw files often fail server-side without compression. */
export const MAX_VIDEO_UPLOAD_BYTES = 80 * 1024 * 1024;

export function isVideoFileUrl(url?: string | null): boolean {
  if (!url?.trim()) return false;
  const path = url.toLowerCase().split("?")[0];
  return /\.(mp4|mov|webm|m4v|avi|mkv|3gp|quicktime)$/.test(path);
}

export function isImageDisplayUrl(url?: string | null): boolean {
  if (!url?.trim()) return false;
  if (url.startsWith("data:image")) return true;
  if (isVideoFileUrl(url)) return false;
  const path = url.toLowerCase().split("?")[0];
  return (
    /\.(jpe?g|png|gif|webp|bmp|avif|heic|heif)$/.test(path) ||
    (!isVideoFileUrl(url) && !url.startsWith("blob:"))
  );
}

export function getVideoDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    const url = URL.createObjectURL(file);
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;

    const cleanup = () => {
      URL.revokeObjectURL(url);
      video.remove();
    };

    video.onloadedmetadata = () => {
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      cleanup();
      resolve(duration);
    };

    video.onerror = () => {
      cleanup();
      reject(new Error("Could not read video file"));
    };

    video.src = url;
  });
}

export function createPlaceholderThumbnailDataUrl(): string {
  const canvas = document.createElement("canvas");
  canvas.width = 320;
  canvas.height = 240;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

  ctx.fillStyle = "#1e1e1e";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.beginPath();
  ctx.moveTo(140, 100);
  ctx.lineTo(200, 120);
  ctx.lineTo(140, 140);
  ctx.closePath();
  ctx.fill();

  return canvas.toDataURL("image/jpeg", 0.82);
}
