"use client";

import { cn } from "@/lib/utils";
import {
  isMediaApproved,
  mediaBlurPx,
  type MediaBlurVariant,
  type MediaVerificationStatus,
} from "@/lib/verification-status";
import { AlertCircle, Clock, ImageIcon } from "lucide-react";
import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

type ModeratedImageProps = {
  children: ReactNode;
  verificationStatus?: MediaVerificationStatus;
  blurVariant?: MediaBlurVariant;
  /** Skip blur/overlay while a local preview is uploading. */
  skipBlur?: boolean;
  className?: string;
  /** Compact overlay for small avatars. */
  compact?: boolean;
};

function applyBlurToImage(child: ReactNode, blur: number): ReactNode {
  if (!isValidElement(child) || child.type !== "img") return child;
  const img = child as ReactElement<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  return cloneElement(img, {
    className: cn(img.props.className, "moderated-image-target"),
    style: {
      ...img.props.style,
      filter: blur > 0 ? `blur(${blur}px)` : undefined,
      WebkitFilter: blur > 0 ? `blur(${blur}px)` : undefined,
    },
  });
}

export function ModeratedImage({
  children,
  verificationStatus = "approved",
  blurVariant = "tile",
  skipBlur = false,
  className,
  compact = false,
}: ModeratedImageProps) {
  const approved = isMediaApproved(verificationStatus);
  if (approved || skipBlur) {
    return <span className={cn("moderated-image", className)}>{children}</span>;
  }

  const blur = mediaBlurPx(verificationStatus, blurVariant);
  const isPending = verificationStatus === "pending";

  return (
    <span
      className={cn(
        "moderated-image",
        isPending && "moderated-image--pending",
        !isPending && "moderated-image--rejected",
        blurVariant === "card" && "moderated-image--card",
        className,
      )}
      data-moderation={verificationStatus}
    >
      <span
        className="moderated-image-media"
        style={blur > 0 ? { filter: `blur(${blur}px)` } : undefined}
        aria-hidden
      >
        {applyBlurToImage(children, blur)}
      </span>

      <span
        className={cn(
          "moderated-image-overlay",
          compact && "moderated-image-overlay--compact",
        )}
        role="status"
        aria-label={isPending ? "Photo pending review" : "Photo rejected"}
      >
        <span className="moderated-image-placeholder">
          {isPending ? (
            <>
              <ImageIcon className="moderated-image-placeholder-icon" aria-hidden />
              <Clock className="moderated-image-placeholder-badge" aria-hidden />
            </>
          ) : (
            <AlertCircle className="moderated-image-placeholder-icon" aria-hidden />
          )}
        </span>
      </span>
    </span>
  );
}
