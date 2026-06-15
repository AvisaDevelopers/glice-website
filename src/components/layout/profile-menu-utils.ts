import type { GliceUser } from "@/features/auth/types";
import type { ResolvedCountry } from "@/components/layout/resolve-country-from-ip";
import { isAccountVerified } from "@/lib/verification-status";
import { Globe, Mars, UserRound, Venus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function isVerified(user: GliceUser | null): boolean {
  return isAccountVerified(user?.verification, user?.verificationStatus);
}

export function countryCodeToFlag(code: string): string {
  const upper = code.trim().toUpperCase();
  if (upper.length !== 2 || !/^[A-Z]{2}$/.test(upper)) return "";
  return String.fromCodePoint(
    ...upper.split("").map((char) => 0x1f1e6 - 65 + char.charCodeAt(0)),
  );
}

export function normalizeGenderValue(raw: unknown): string {
  if (raw == null || raw === "") return "";

  if (typeof raw === "number") {
    if (raw === 0) return "man";
    if (raw === 1) return "woman";
    return "";
  }

  const value = String(raw).trim().toLowerCase().replace(/\s+/g, "");
  if (!value) return "";

  if (value === "0") return "man";
  if (value === "1") return "woman";

  if (
    value === "woman" ||
    value === "women" ||
    value === "female" ||
    value === "f"
  ) {
    return "woman";
  }

  if (value === "man" || value === "men" || value === "male" || value === "m") {
    return "man";
  }

  return value;
}

export function getCountryDisplay(
  user: GliceUser | null,
  resolvedFromIp?: ResolvedCountry | null,
): {
  label: string;
  flag: string;
  Icon: LucideIcon;
} | null {
  const locationText = user?.location?.text?.trim() ?? "";
  if (locationText) {
    const isCode = /^[A-Za-z]{2}$/.test(locationText);
    const code = isCode ? locationText.toUpperCase() : "";
    return {
      label: isCode ? code : locationText,
      flag: isCode ? countryCodeToFlag(code) : "",
      Icon: Globe,
    };
  }

  const phoneCode = user?.phone?.code?.trim() ?? "";
  if (/^[A-Za-z]{2}$/.test(phoneCode)) {
    const code = phoneCode.toUpperCase();
    return {
      label: code,
      flag: countryCodeToFlag(code),
      Icon: Globe,
    };
  }

  if (resolvedFromIp?.code) {
    return {
      label: resolvedFromIp.code,
      flag: countryCodeToFlag(resolvedFromIp.code),
      Icon: Globe,
    };
  }

  return null;
}

export function getGenderDisplay(raw: unknown): {
  label: string;
  Icon: LucideIcon;
} | null {
  const value = normalizeGenderValue(raw);
  if (!value) return null;

  if (value === "man") {
    return { label: "Male", Icon: Mars };
  }
  if (value === "woman") {
    return { label: "Female", Icon: Venus };
  }
  if (value === "other") {
    return { label: "Other", Icon: UserRound };
  }

  const label = value.charAt(0).toUpperCase() + value.slice(1);
  return { label, Icon: UserRound };
}

export function getReferralCode(user: GliceUser | null): string {
  return user?.referralCode?.trim() ?? "";
}

export function shouldResolveCountryFromIp(user: GliceUser | null): boolean {
  if (!user?.ipAddress?.trim()) return false;
  if (user.location?.text?.trim()) return false;
  if (/^[A-Za-z]{2}$/.test(user.phone?.code?.trim() ?? "")) return false;
  return true;
}
