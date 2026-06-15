/** Mirrors Flutter `VerificationStatusType` on attachments / profile media. */
export type MediaVerificationStatus = "pending" | "approved" | "rejected";

export type MediaBlurVariant = "tile" | "card";

/** Flutter ImageFilter sigma values used in AttachmentTile vs discover cards. */
export const MEDIA_BLUR_SIGMA: Record<MediaBlurVariant, number> = {
  tile: 10,
  card: 35,
};

export function parseMediaVerificationStatus(
  raw: unknown,
  fallback: MediaVerificationStatus = "approved",
): MediaVerificationStatus {
  const value = coerceProfileStatusRaw(raw).toLowerCase();
  if (
    value === "pending" ||
    value === "review" ||
    value === "in_review" ||
    value === "in-review"
  ) {
    return "pending";
  }
  if (
    value === "rejected" ||
    value === "reject" ||
    value === "declined" ||
    value === "denied"
  ) {
    return "rejected";
  }
  if (value === "approved" || value === "active") {
    return "approved";
  }
  return fallback;
}

/** Normalize API / socket values into a status string. */
export function coerceProfileStatusRaw(raw: unknown): string {
  if (raw == null || raw === "") return "";
  if (typeof raw === "string") return raw.trim();
  if (typeof raw === "number") {
    if (raw === 2) return "rejected";
    if (raw === 1) return "pending";
    if (raw === 0) return "approved";
    return String(raw);
  }
  if (typeof raw === "object" && !Array.isArray(raw)) {
    const record = raw as Record<string, unknown>;
    return coerceProfileStatusRaw(
      record.status ??
        record.profileStatus ??
        record.otherUserProfileStatus ??
        record.state,
    );
  }
  const text = String(raw).trim();
  return text === "[object Object]" ? "" : text;
}

export function isMediaApproved(
  status?: MediaVerificationStatus | null,
): boolean {
  return !status || status === "approved";
}

/** Chat attachments / gallery tiles — pending and rejected are moderated. */
export function mediaBlurPx(
  status: MediaVerificationStatus | undefined,
  variant: MediaBlurVariant,
): number {
  return isMediaApproved(status) ? 0 : MEDIA_BLUR_SIGMA[variant];
}

/** First non-empty profile moderation value from API/socket payloads. */
export function readProfileStatus(
  ...values: unknown[]
): MediaVerificationStatus {
  for (const value of values) {
    const raw = coerceProfileStatusRaw(value);
    if (!raw) continue;
    return parseMediaVerificationStatus(raw, "approved");
  }
  return "approved";
}

export function profileStatusFromRecord(
  record?: Record<string, unknown> | null,
): MediaVerificationStatus {
  if (!record) return "approved";
  return readProfileStatus(
    record.profileStatus,
    record.otherUserProfileStatus,
    record.otherUserProfileVerificationStatus,
    record.profileVerificationStatus,
    record.otherUserVerificationStatus,
  );
}

export function profileStatusFromUser(
  user?: {
    profileStatus?: string;
    profile?: { status?: string; profileStatus?: string };
  } | null,
): MediaVerificationStatus {
  return readProfileStatus(
    user?.profileStatus,
    user?.profile?.profileStatus,
    user?.profile?.status,
  );
}

/** Account-level verification badge — Flutter `verification.verified` (status === approved). */
export function isAccountVerified(
  verification?: { status?: string } | null,
  legacyStatus?: string | null,
): boolean {
  const status = (
    verification?.status ??
    legacyStatus ??
    ""
  )
    .trim()
    .toLowerCase();
  return status === "approved" || status === "verified";
}
