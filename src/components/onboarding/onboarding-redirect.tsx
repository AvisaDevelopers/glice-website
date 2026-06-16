"use client";

import { useUiSession } from "@/components/site/ui-session-provider";
import { userNeedsOnboarding } from "@/features/onboarding/lib/needs-onboarding";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const SKIP_PATHS = ["/onboarding", "/reset-password"];

export function OnboardingRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, isInitializing, user } = useUiSession();

  useEffect(() => {
    if (isInitializing || !isLoggedIn) return;
    if (SKIP_PATHS.some((path) => pathname.startsWith(path))) return;
    if (!userNeedsOnboarding(user)) return;
    router.replace("/onboarding");
  }, [isInitializing, isLoggedIn, pathname, router, user]);

  return null;
}
