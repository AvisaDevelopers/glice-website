export const DEFAULT_PROFILE_AVATAR = "/assets/default-profile.svg";

export function resolveAvatarUrl(url?: string | null): string {
  const trimmed = url?.trim();
  return trimmed ? trimmed : DEFAULT_PROFILE_AVATAR;
}
