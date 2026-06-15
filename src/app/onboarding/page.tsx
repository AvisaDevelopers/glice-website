"use client";

import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";
import { useUiSession } from "@/components/site/ui-session-provider";
import { userNeedsOnboarding } from "@/features/onboarding/lib/needs-onboarding";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OnboardingPage() {
  const router = useRouter();
  const { isLoggedIn, isInitializing, user } = useUiSession();

  useEffect(() => {
    if (isInitializing) return;
    if (!isLoggedIn) {
      router.replace("/");
      return;
    }
    if (!userNeedsOnboarding(user)) {
      router.replace("/");
    }
  }, [isInitializing, isLoggedIn, router, user]);

  if (isInitializing || !isLoggedIn || !userNeedsOnboarding(user)) {
    return (
      <div className="onboarding-shell">
        <div className="onboarding-card onboarding-card--loading">
          <span className="onboarding-spinner" aria-hidden />
        </div>
      </div>
    );
  }

  return <OnboardingWizard />;
}
