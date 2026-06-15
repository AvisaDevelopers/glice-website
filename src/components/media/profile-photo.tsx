"use client";

import { ModeratedImage } from "@/components/media/moderated-image";
import { cn } from "@/lib/utils";
import type {
  MediaBlurVariant,
  MediaVerificationStatus,
} from "@/lib/verification-status";

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

function profileInitial(name: string) {
  return (name.trim()[0] ?? "?").toUpperCase();
}

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
  if (!url?.trim()) {
    return (
      <span className={cn("profile-photo profile-photo--initial", className)}>
        {profileInitial(name)}
      </span>
    );
  }

  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={url} alt="" className={cn("profile-photo-img", imgClassName)} />
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
