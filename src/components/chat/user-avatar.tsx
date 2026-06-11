"use client";

import { cn } from "@/lib/utils";
import { resolveMediaUrl } from "@/features/chat/lib/resolve-media-url";

type UserAvatarProps = {
  name: string;
  url?: string;
  size?: "sm" | "md" | "lg";
  isOnline?: boolean;
  /** When true, shows green (online) or red (offline) status dot. */
  showStatus?: boolean;
};

const sizes = {
  sm: "h-9 w-9 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-12 w-12 text-base",
} as const;

export function UserAvatar({
  name,
  url,
  size = "md",
  isOnline = false,
  showStatus = false,
}: UserAvatarProps) {
  const initial = name.charAt(0).toUpperCase() || "G";
  const resolved = resolveMediaUrl(url);

  return (
    <div className="relative shrink-0">
      <div
        className={cn(
          "flex items-center justify-center overflow-hidden rounded-full bg-[var(--surface-2)] font-semibold text-[var(--text)]",
          sizes[size],
        )}
      >
        {resolved ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={resolved}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          initial
        )}
      </div>
      {showStatus && (
        <span
          className={cn(
            "chat-avatar-status",
            isOnline
              ? "chat-avatar-status--online"
              : "chat-avatar-status--offline",
          )}
          aria-label={isOnline ? "Online" : "Offline"}
        />
      )}
      {!showStatus && isOnline && (
        <span className="chat-avatar-status chat-avatar-status--online" aria-label="Online" />
      )}
    </div>
  );
}
