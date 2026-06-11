"use client";

import { useRoomStore } from "../stores/room-store";
import type { ChatRoom } from "../types";

/** Subscribes to one room with fresh references when typing/unread/online change. */
export function useRoomById(roomId: string): ChatRoom | undefined {
  return useRoomStore((s) => s.rooms.find((r) => r.roomId === roomId));
}

export function useRoomTyping(roomId: string): boolean {
  return useRoomStore(
    (s) => s.rooms.find((r) => r.roomId === roomId)?.typing ?? false,
  );
}
