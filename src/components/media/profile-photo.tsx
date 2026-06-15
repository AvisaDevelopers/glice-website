"use client";

import { ModeratedImage } from "@/components/media/moderated-image";
import { resolveMediaUrl } from "@/features/chat/lib/resolve-media-url";
import { DEFAULT_PROFILE_AVATAR } from "@/lib/default-avatar";
import { cn } from "@/lib/utils";
import type {
  MediaBlurVariant,
  MediaVerificationStatus,
} from "@/lib/verification-status";
import { useState } from "react";

type ProfilePhotoProps = {
  name: string;
  url?: string;
  /** Profile photo moderation from API `profileStatus`. */
  profileStatus?: MediaVerificationStatus;
  verificationStatus?: MediaVerificationStatus;
  className?: string;
  imgClassName?: string;
  blurVariant?: MediaBlurVariant;
  compact?: boolean;
};

export function ProfilePhoto({
  name,
  url,
  profileStatus,
  verificationStatus = "approved",
  className,
  imgClassName,
  blurVariant = "tile",
  compact = false,
}: ProfilePhotoProps) {
  const moderationStatus = profileStatus ?? verificationStatus;
  const [broken, setBroken] = useState(false);
  const mediaUrl = resolveMediaUrl(url);
  const hasPhoto = Boolean(mediaUrl?.trim()) && !broken;
  const displaySrc = hasPhoto ? mediaUrl! : DEFAULT_PROFILE_AVATAR;

  if (!hasPhoto) {
    const image = (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={displaySrc}
        alt=""
        className={cn("profile-photo-img", imgClassName)}
      />
    );

    return (
      <span className={cn("profile-photo", className)}>
        {image}
      </span>
    );
  }

  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={displaySrc}
      alt=""
      className={cn("profile-photo-img", imgClassName)}
      onError={() => setBroken(true)}
    />
  );

  return (
    <span className={cn("profile-photo", className)}>
      <ModeratedImage
        verificationStatus={moderationStatus}
        blurVariant={blurVariant}
        compact={compact}
        className="moderated-image--avatar profile-photo-moderated h-full w-full overflow-hidden rounded-full"
      >
        {image}
      </ModeratedImage>
    </span>
  );
}
