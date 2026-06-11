/** Normalize `user_typing` socket payloads (string roomId or object). */
export function parseTypingRoomId(data: unknown): string {
  if (typeof data === "string" && data.trim()) {
    return data.trim();
  }

  if (data && typeof data === "object" && !Array.isArray(data)) {
    const map = data as Record<string, unknown>;
    for (const key of ["roomId", "room_id", "id", "room"] as const) {
      const val = map[key];
      if (typeof val === "string" && val.trim()) return val.trim();
    }
  }

  return "";
}
