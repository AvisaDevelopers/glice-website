"use client";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isChatRoute = pathname.startsWith("/messages");
  const isOnboardingRoute = pathname.startsWith("/onboarding");
  const isSeoRoute = pathname.startsWith("/talk-to-strangers");
  const isOmegleRoute = pathname.startsWith(
    "/talk-to-strangers/omegle",
  );

  useEffect(() => {
    if (!isSeoRoute) return;
    document.body.classList.add("seo-route");
    return () => document.body.classList.remove("seo-route");
  }, [isSeoRoute]);

  useEffect(() => {
    if (!isOmegleRoute) return;
    document.body.classList.add("omegle-route");
    return () => document.body.classList.remove("omegle-route");
  }, [isOmegleRoute]);

  if (isOnboardingRoute || isSeoRoute) {
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
