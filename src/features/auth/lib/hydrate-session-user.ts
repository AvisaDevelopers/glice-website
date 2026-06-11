import { getUser } from "@/features/auth/api/auth-api";
import { tokenStorage } from "@/features/auth/lib/token-storage";
import type { GliceUser } from "@/features/auth/types";

/** Ensures stored session has a real user id (required for socket + chat APIs). */
export async function hydrateSessionUser(
  user: GliceUser,
): Promise<GliceUser> {
  if (user._id?.trim()) return user;
  if (!user.email?.trim()) return user;

  try {
    const profile = await getUser(user.email);
    if (!profile._id?.trim()) return user;
    const merged = { ...user, ...profile, email: user.email };
    tokenStorage.setUser(merged);
    return merged;
  } catch {
    return user;
  }
}
