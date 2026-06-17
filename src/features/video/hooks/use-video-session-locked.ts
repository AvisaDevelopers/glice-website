"use client";

import { useVideoCallStore } from "@/features/video/stores/video-call-store";
import { isVideoSessionActive } from "@/features/video/lib/video-session-lock";

export function useVideoSessionLocked(): boolean {
  const stage = useVideoCallStore((s) => s.stage);
  return isVideoSessionActive(stage);
}
