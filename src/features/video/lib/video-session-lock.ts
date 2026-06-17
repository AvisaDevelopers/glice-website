import type { CallStage } from "../types";

export const VIDEO_SESSION_HOME_ROUTE = "/";

export const VIDEO_SESSION_ACTIVE_STAGES = new Set<CallStage>([
  "searching",
  "connecting",
  "connected",
  "feedback",
]);

export function isVideoSessionActive(stage: CallStage): boolean {
  return VIDEO_SESSION_ACTIVE_STAGES.has(stage);
}
