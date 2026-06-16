/**
 * Spark dating lobby socket contract — must match Flutter `socket_bloc.dart`:
 * - join_event / leave_event: `{ name, email }`
 * - get_joined_count: event name string only (`"spark_dating"`)
 * - spark_count response: `{ count, users?, genderCounts? }`
 */

export const SPARK_DATING_EVENT_NAME = "spark_dating" as const;

export type SparkJoinLeavePayload = {
  name: typeof SPARK_DATING_EVENT_NAME;
  email: string;
};

export type SparkCountPayload = {
  count: number;
  users: unknown[];
  genderCounts: Record<string, number>;
};

export function buildSparkJoinPayload(email: string): SparkJoinLeavePayload {
  return {
    name: SPARK_DATING_EVENT_NAME,
    email,
  };
}

export function buildSparkLeavePayload(email: string): SparkJoinLeavePayload {
  return buildSparkJoinPayload(email);
}

/** Flutter: `_socket?.emit("get_joined_count", event.eventName)` */
export function sparkJoinedCountRequest(): typeof SPARK_DATING_EVENT_NAME {
  return SPARK_DATING_EVENT_NAME;
}

export function parseSparkCountPayload(raw: unknown): SparkCountPayload {
  if (typeof raw === "number" || typeof raw === "string") {
    const count = Number(raw);
    return {
      count: Number.isNaN(count) ? 0 : count,
      users: [],
      genderCounts: {},
    };
  }

  if (!raw || typeof raw !== "object") {
    return { count: 0, users: [], genderCounts: {} };
  }

  const data = raw as Record<string, unknown>;
  const count = Number(data.count ?? 0);

  const users = Array.isArray(data.users) ? data.users : [];

  const genderCounts: Record<string, number> = {};
  if (data.genderCounts && typeof data.genderCounts === "object") {
    for (const [key, value] of Object.entries(
      data.genderCounts as Record<string, unknown>,
    )) {
      genderCounts[key] = Number(value) || 0;
    }
  }

  return {
    count: Number.isNaN(count) ? 0 : count,
    users,
    genderCounts,
  };
}

/** Flutter `sparkDatingJoinedMessage` — [count] includes the current user. */
export function sparkDatingJoinedMessage(count: number): string {
  const total = Math.max(0, Math.floor(count));
  if (total <= 0) return "";
  if (total === 1) return "Only you have joined";
  if (total === 2) return "You & 1 other have joined";
  return `You & ${total - 1} others have joined`;
}

/** Flutter `onlineStatus` l10n — e.g. "12 online". */
export function onlineStatusLabel(online: number): string {
  const n = Math.max(0, Math.floor(online));
  return `${n} online`;
}

import {
  type GenderFilterOption,
  lobbyGenderKey as filterToLobbyKey,
} from "@/lib/gender-options";

/** Map hero gender filter to `spark_count.genderCounts` keys (Flutter lowercase titles). */
export function lobbyGenderKey(gender: GenderFilterOption): string {
  return filterToLobbyKey(gender);
}

export function lobbyGenderOnlineCount(
  genderCounts: Record<string, number>,
  gender: GenderFilterOption,
): number {
  const key = lobbyGenderKey(gender);
  const direct = genderCounts[key];
  if (direct != null) return direct;

  const fallbacks: Record<string, string[]> = {
    any: ["any", "everyone"],
    female: ["female", "woman", "women"],
    male: ["male", "man", "men"],
    other: ["other", "nonbinary", "non-binary"],
  };
  for (const alt of fallbacks[key] ?? [key]) {
    if (genderCounts[alt] != null) return genderCounts[alt];
  }
  return 0;
}
