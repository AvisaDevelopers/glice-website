"use client";

import { ModeratedImage } from "@/components/media/moderated-image";
import { resolveMediaUrl } from "@/features/chat/lib/resolve-media-url";
import { cn } from "@/lib/utils";
import {
  isAccountVerified,
  type MediaVerificationStatus,
} from "@/lib/verification-status";
import { BadgeCheck } from "lucide-react";

type UserAvatarProps = {
  name: string;
  url?: string;
  size?: "sm" | "md" | "lg";
  isOnline?: boolean;
  /** When true, shows green (online) or red (offline) status dot. */
  showStatus?: boolean;
  /** Account verified badge — Flutter `verification.verified`. */
  verified?: boolean;
  verification?: { status?: string };
  /** Profile photo moderation — API `profileStatus`. */
  profileStatus?: MediaVerificationStatus;
  mediaVerificationStatus?: MediaVerificationStatus;
};

const sizes = {
  sm: "h-9 w-9 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-12 w-12 text-base",
} as const;

const verifiedSizes = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-4 w-4",
} as const;

export function UserAvatar({
  name,
  url,
  size = "md",
  isOnline = false,
  showStatus = false,
  verified,
  verification,
  profileStatus,
  mediaVerificationStatus = "approved",
}: UserAvatarProps) {
  const initial = name.charAt(0).toUpperCase() || "G";
  const resolved = resolveMediaUrl(url);
  const showVerified =
    verified ?? isAccountVerified(verification, undefined);
  const moderationStatus = profileStatus ?? mediaVerificationStatus;

  const inner = resolved ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={resolved} alt={name} className="h-full w-full object-cover" />
  ) : (
    <span className="font-semibold">{initial}</span>
  );

  return (
    <div className={cn("relative shrink-0", sizes[size])}>
      <div
        className={cn(
          "flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[var(--surface-2)] text-[var(--text)]",
        )}
      >
        {resolved ? (
          <ModeratedImage
            verificationStatus={moderationStatus}
            blurVariant="tile"
            compact
            className="moderated-image--avatar h-full w-full"
          >
            {inner}
          </ModeratedImage>
        ) : (
          inner
        )}
      </div>

      {showVerified && (
        <BadgeCheck
          className={cn(
            "absolute bottom-0 right-0 text-[var(--primary)] drop-shadow-sm",
            verifiedSizes[size],
          )}
          aria-label="Verified account"
        />
      )}

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
        <span
          className="chat-avatar-status chat-avatar-status--online"
          aria-label="Online"
        />
      )}
    </div>
  );
}
