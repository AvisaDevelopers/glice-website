import {
  coerceProfileStatusRaw,
  profileStatusFromRecord,
  readProfileStatus,
} from "@/lib/verification-status";
import type { PeerFoundPayload, VideoPartner } from "../types";

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function unwrapPayload(raw: unknown): Record<string, unknown> | null {
  const map = asRecord(raw);
  if (!map) return null;
  const nested = asRecord(map.data) ?? asRecord(map.payload);
  return nested ?? map;
}

function readString(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

/** Read a field by exact or case-insensitive key (socket payloads vary). */
function readMapField(
  map: Record<string, unknown>,
  ...keys: string[]
): unknown {
  for (const key of keys) {
    const value = map[key];
    if (value != null && value !== "") return value;
  }
  const wanted = new Set(keys.map((key) => key.toLowerCase()));
  for (const [key, value] of Object.entries(map)) {
    if (value != null && value !== "" && wanted.has(key.toLowerCase())) {
      return value;
    }
  }
  return undefined;
}

/** Scan payload keys for partner profile moderation status fields. */
function readProfileStatusFromMap(
  map: Record<string, unknown>,
): string | undefined {
  const direct = coerceProfileStatusRaw(
    readMapField(
      map,
      "otherUserProfileStatus",
      "other_user_profile_status",
      "otherUserProfilestatus",
      "profileStatus",
      "otherUserProfileVerificationStatus",
      "profileVerificationStatus",
    ),
  );
  if (direct) return direct;

  for (const [key, value] of Object.entries(map)) {
    const normalized = key.toLowerCase().replace(/[_-]/g, "");
    if (
      normalized === "otheruserprofilestatus" ||
      normalized === "profilestatus" ||
      normalized === "otheruserprofileverificationstatus" ||
      normalized === "profileverificationstatus"
    ) {
      const status = coerceProfileStatusRaw(value);
      if (status) return status;
    }
  }

  return undefined;
}

/**
 * Normalizes `peer_found` socket payloads (flat or nested profile object).
 */
export function parsePeerFoundPayload(raw: unknown): PeerFoundPayload | null {
  const map = unwrapPayload(raw);
  if (!map) return null;

  const roomId = readString(map.roomId);
  if (!roomId) return null;

  const nestedUser = asRecord(map.otherUser);
  const nestedProfile = asRecord(map.otherUserProfile);

  const otherUserId =
    typeof map.otherUser === "string"
      ? map.otherUser.trim()
      : readString(nestedUser?.uid, nestedUser?._id, nestedUser?.id);

  if (!otherUserId) return null;

  const profileUrl = readString(
    map.otherUserProfilePic,
    map.otherUserProfileUrl,
    map.profileUrl,
    nestedProfile?.url,
    nestedProfile?.profileUrl,
    nestedUser?.profileUrl,
    nestedUser?.profilePic,
    nestedUser?.profile,
  );

  const otherUserProfileStatus = readProfileStatus(
    readProfileStatusFromMap(map),
    nestedUser ? readProfileStatusFromMap(nestedUser) : undefined,
    nestedProfile ? readProfileStatusFromMap(nestedProfile) : undefined,
  );

  const email = readString(map.otherUserEmail, nestedUser?.email);

  const otherUserName =
    readString(map.otherUserName, nestedUser?.name, nestedProfile?.name) ||
    "Match";

  return {
    roomId,
    otherUser: otherUserId,
    otherUserName,
    otherUserProfilePic: profileUrl || undefined,
    otherUserEmail: email || undefined,
    otherUserProfileStatus,
    profileStatus: otherUserProfileStatus,
  };
}

/** Build store partner from normalized `peer_found` data. */
export function videoPartnerFromPeerFound(
  data: PeerFoundPayload,
): VideoPartner {
  const status =
    data.otherUserProfileStatus ??
    data.profileStatus ??
    profileStatusFromRecord(data as unknown as Record<string, unknown>);

  return {
    id: data.otherUser,
    name: data.otherUserName || "Match",
    profileUrl: data.otherUserProfilePic ?? "",
    email: data.otherUserEmail?.trim() || undefined,
    otherUserProfileStatus: status,
    profileStatus: status,
  };
}
