import type { GliceUser } from "@/features/auth/types";
import { normalizeCountryValue } from "./country-options";

export function resolveUserCountry(user: GliceUser | null | undefined): string {
  const raw =
    user?.country ??
    user?.location?.country ??
    user?.phone?.country ??
    "";

  return normalizeCountryValue(String(raw));
}

export function userCountryLabel(user: GliceUser | null | undefined): string {
  const value = resolveUserCountry(user);
  if (!value) return "Not set";
  return value
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
