import { authRoutes } from "@/features/auth/api/routes";
import { persistAuthSession } from "@/features/auth/lib/persist-session";
import { tokenStorage } from "@/features/auth/lib/token-storage";
import type { GliceUser } from "@/features/auth/types";
import { uploadChatFile } from "@/features/chat/api/upload";
import {
  buildHighlightsPayload,
  normalizeGenderKey,
} from "@/features/onboarding/lib/build-highlights-payload";
import type {
  AppGenderOption,
  OnboardingDraft,
  OnboardingInterest,
  OnboardingRestrictions,
} from "@/features/onboarding/types";
import { onboardingRoutes } from "@/features/onboarding/api/routes";
import { apiClient } from "@/lib/api-client";

const DEFAULT_GENDERS: AppGenderOption[] = [
  { title: "Male", url: "" },
  { title: "Female", url: "" },
  { title: "Other", url: "" },
];

function unwrapList(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") {
    const map = data as Record<string, unknown>;
    if (Array.isArray(map.body)) return map.body;
    if (Array.isArray(map.data)) return map.data;
  }
  return [];
}

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

export async function fetchInterests(): Promise<OnboardingInterest[]> {
  const data = await apiClient.get<unknown>(onboardingRoutes.getAllInterests);
  return unwrapList(data).map((item) => {
    const row = item as Record<string, unknown>;
    return {
      title: String(row.title ?? ""),
      iconUrl: String(row.iconUrl ?? ""),
      activeIconUrl: String(row.activeIconUrl ?? ""),
      isSelected: false,
    };
  });
}

export async function fetchOnboardingRestrictions(): Promise<OnboardingRestrictions> {
  try {
    const data = await apiClient.get<unknown>(onboardingRoutes.getRestrictions);
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
      .filter((gender) => gender.title && !gender.isDisable);

    const age = (body.age ?? {}) as Record<string, unknown>;

    return {
      maxInterestsSelection: Number(body.maxInterestsSelection ?? 5) || 5,
      genders: genders.length > 0 ? genders : DEFAULT_GENDERS,
      ageMin: Number(age.min ?? 18) || 18,
      ageMax: Number(age.max ?? 70) || 70,
    };
  } catch {
    return {
      maxInterestsSelection: 5,
      genders: DEFAULT_GENDERS,
      ageMin: 18,
      ageMax: 70,
    };
  }
}

export async function submitOnboardingProfile(input: {
  email: string;
  userId: string;
  draft: OnboardingDraft;
  isHeightFeet: boolean;
}): Promise<GliceUser> {
  let profileUrl = input.draft.profilePreview;

  if (input.draft.profileFile) {
    const uploaded = await uploadChatFile(
      input.draft.profileFile,
      input.userId,
    );
    profileUrl = uploaded.publicUrl;
  }

  const highlights = buildHighlightsPayload(input.draft, profileUrl);

  const updatedUser = await apiClient.post<GliceUser>(authRoutes.updateUser, {
    email: input.email,
    highlights,
    referralLink: "",
    referralCode: "",
  });

  const mergedUser: GliceUser = {
    ...tokenStorage.getUser(),
    ...updatedUser,
    name: highlights.name,
    age: highlights.age,
    gender: highlights.gender,
    bio: highlights.bio,
    height: highlights.height,
    isFeet: input.isHeightFeet,
    interests: highlights.interests,
    profileUrl: highlights.profileUrl,
  };

  const accessToken = tokenStorage.getAccessToken();
  const refreshToken = tokenStorage.getRefreshToken();
  if (accessToken && refreshToken) {
    persistAuthSession(accessToken, refreshToken, mergedUser);
  } else {
    tokenStorage.setUser(mergedUser);
  }

  return mergedUser;
}

export function createInitialDraft(user: GliceUser | null): OnboardingDraft {
  return {
    name: user?.name?.trim() ?? "",
    bio: user?.bio?.trim() ?? "",
    gender: user?.gender
      ? normalizeGenderKey(String(user.gender))
      : "",
    age: user?.age && user.age >= 18 ? user.age : 25,
    heightCm: user?.height && user.height > 0 ? user.height : 175,
    isHeightFeet: user?.isFeet ?? false,
    profileFile: null,
    profilePreview: user?.profileUrl ?? "",
    interests: [],
  };
}
