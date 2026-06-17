export type OnboardingInterest = {
  title: string;
  iconUrl: string;
  activeIconUrl: string;
  isSelected: boolean;
};

export type AppGenderOption = {
  title: string;
  url: string;
  isDisable?: boolean;
};

export type OnboardingRestrictions = {
  maxInterestsSelection: number;
  genders: AppGenderOption[];
  ageMin: number;
  ageMax: number;
};

export type OnboardingDraft = {
  name: string;
  bio: string;
  gender: string;
  age: number;
  heightCm: number;
  isHeightFeet: boolean;
  profileFile: File | null;
  profilePreview: string;
  interests: OnboardingInterest[];
};

export const HOME_TAB_SWIPE = 0;
export const HOME_TAB_LIVE_VIDEO = 1;

export type HomeTabPreference = typeof HOME_TAB_SWIPE | typeof HOME_TAB_LIVE_VIDEO;

export const ONBOARDING_STEPS = [
  "profile",
  "gender",
  "age",
  "height",
  "photo",
  "interests",
] as const;

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number];
