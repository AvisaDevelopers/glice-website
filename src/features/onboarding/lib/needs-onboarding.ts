import type { GliceUser } from "@/features/auth/types";

/** Mirrors mobile splash routing: users without interests go to highlights. */
export function userNeedsOnboarding(user: GliceUser | null | undefined): boolean {
  if (!user?.email) return false;
  const interests = user.interests;
  return !interests || interests.length === 0;
}
