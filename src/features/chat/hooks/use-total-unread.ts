"use client";

import { useRoomStore } from "../stores/room-store";

/** Sum of unread message counts across all conversations (Flutter inbox style). */
export function useTotalUnreadMessages(excludeRoomId?: string): number {
  return useRoomStore((s) =>
    s.rooms.reduce((sum, room) => {
      if (excludeRoomId && room.roomId === excludeRoomId) return sum;
      return sum + (room.unread || 0);
    }, 0),
  );
}

export function formatUnreadBadge(count: number): string {
  if (count <= 0) return "";
  if (count > 99) return "99+";
  return String(count);
}
