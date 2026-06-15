import {
  HOME_TAB_LIVE_VIDEO,
  HOME_TAB_SWIPE,
  type HomeTabPreference,
} from "@/features/onboarding/types";

const STORAGE_KEY = "homePreferredTab";

export function getHomeTabPreference(): HomeTabPreference | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) return null;
  const value = Number(raw);
  if (value === HOME_TAB_SWIPE || value === HOME_TAB_LIVE_VIDEO) return value;
  return null;
}

export function setHomeTabPreference(tab: HomeTabPreference): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, String(tab));
}
