import type { OnboardingDraft } from "@/features/onboarding/types";
import type { UserPhone } from "@/features/auth/types";
import { normalizeGenderKey } from "@/lib/gender-options";

export { normalizeGenderKey };

const EMPTY_PHONE: UserPhone = {
  code: "",
  phoneCode: "",
  country: "",
  number: "",
};

export function buildHighlightsPayload(
  draft: OnboardingDraft,
  profileUrl: string,
) {
  const selectedInterests = draft.interests
    .filter((item) => item.isSelected)
    .map((item) => item.title);

  return {
    interests: selectedInterests,
    gender: draft.gender,
    profileUrl,
    lookingFor: draft.gender,
    speaks: "English",
    height: draft.heightCm,
    phone: EMPTY_PHONE,
    name: draft.name.trim(),
    age: draft.age,
    bio: draft.bio.trim(),
  };
}
