import { reportRoutes } from "@/features/report/api/routes";
import { apiClient } from "@/lib/api-client";
import {
  DEFAULT_PROFILE_GENDERS,
} from "@/lib/gender-options";

export type VideoMatchRestrictions = {
  genders: { title: string; url: string }[];
  ageMin: number;
  ageMax: number;
  distanceMin: number;
  distanceMax: number;
};

const DEFAULT_RESTRICTIONS: VideoMatchRestrictions = {
  genders: [...DEFAULT_PROFILE_GENDERS],
  ageMin: 18,
  ageMax: 60,
  distanceMin: 1,
  distanceMax: 100,
};

export { DEFAULT_RESTRICTIONS as VIDEO_MATCH_DEFAULT_RESTRICTIONS };

function unwrapObject(data: unknown): Record<string, unknown> {
  if (data && typeof data === "object" && !Array.isArray(data)) {
    const map = data as Record<string, unknown>;
    if (map.body && typeof map.body === "object" && !Array.isArray(map.body)) {
      return map.body as Record<string, unknown>;
    }
    return map;
  }
  return {};
}

function unwrapList(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") {
    const map = data as Record<string, unknown>;
    if (Array.isArray(map.body)) return map.body;
    if (Array.isArray(map.data)) return map.data;
  }
  return [];
}

export async function fetchVideoMatchRestrictions(): Promise<VideoMatchRestrictions> {
  try {
    const data = await apiClient.get<unknown>(
      reportRoutes.getRestrictions,
      undefined,
      false,
    );
    const body = unwrapObject(data);

    const genders = unwrapList(body.genders)
      .map((item) => {
        const row = item as Record<string, unknown>;
        return {
          title: String(row.title ?? ""),
          url: String(row.url ?? ""),
          isDisable: row.isDisable === true,
        };
      })
      .filter((gender) => gender.title && !gender.isDisable)
      .map(({ title, url }) => ({ title, url }));

    const age = (body.age ?? {}) as Record<string, unknown>;
    const distance = (body.distance ?? {}) as Record<string, unknown>;

    return {
      genders: genders.length > 0 ? genders : DEFAULT_RESTRICTIONS.genders,
      ageMin: Number(age.min ?? DEFAULT_RESTRICTIONS.ageMin) || DEFAULT_RESTRICTIONS.ageMin,
      ageMax: Number(age.max ?? DEFAULT_RESTRICTIONS.ageMax) || DEFAULT_RESTRICTIONS.ageMax,
      distanceMin:
        Number(distance.min ?? DEFAULT_RESTRICTIONS.distanceMin) ||
        DEFAULT_RESTRICTIONS.distanceMin,
      distanceMax:
        Number(distance.max ?? DEFAULT_RESTRICTIONS.distanceMax) ||
        DEFAULT_RESTRICTIONS.distanceMax,
    };
  } catch {
    return DEFAULT_RESTRICTIONS;
  }
}

export type VideoGenderFilterOption = {
  title: string;
  url: string;
};

export function videoGenderFilterOptions(
  restrictions: VideoMatchRestrictions,
): VideoGenderFilterOption[] {
  return [
    { title: "Everyone", url: "" },
    ...videoPreferenceGenderOptions(restrictions),
  ];
}

export function videoPreferenceGenderOptions(
  restrictions: VideoMatchRestrictions,
): VideoGenderFilterOption[] {
  return restrictions.genders.map((gender) => ({
    title: gender.title,
    url: gender.url,
  }));
}
