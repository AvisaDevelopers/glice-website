export function formatRelativeTime(date: Date, now = Date.now()): string {
  const diffMs = Math.max(0, now - date.getTime());
  const seconds = Math.floor(diffMs / 1000);

  if (seconds < 10) return "now";
  if (seconds < 60) return `${seconds}s ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

/** Inbox / room list timestamps */
export function formatTimeAgo(date: Date): string {
  return formatRelativeTime(date);
}

/** Message bubble timestamps */
export function formatMessageTime(date: Date): string {
  return formatRelativeTime(date);
}

export function capitalizeSentences(text: string): string {
  if (!text.trim()) return text;
  return text
    .split(/([.!?]\s+)/)
    .map((part, i) => {
      if (i % 2 === 0 && part.length > 0) {
        return part.charAt(0).toUpperCase() + part.slice(1);
      }
      return part;
    })
    .join("");
}
