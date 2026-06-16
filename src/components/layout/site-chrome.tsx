"use client";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { usePathname } from "next/navigation";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isChatRoute = pathname.startsWith("/messages");
  const isOnboardingRoute = pathname.startsWith("/onboarding");

  if (isOnboardingRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      {!isChatRoute && <Footer />}
    </>
  );
}
