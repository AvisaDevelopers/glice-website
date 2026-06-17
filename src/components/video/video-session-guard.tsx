"use client";

import {
  VIDEO_SESSION_HOME_ROUTE,
  isVideoSessionActive,
} from "@/features/video/lib/video-session-lock";
import { useVideoCallStore } from "@/features/video/stores/video-call-store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

/** Locks page scroll and in-app navigation while a video session is active. */
export function VideoSessionGuard() {
  const stage = useVideoCallStore((s) => s.stage);
  const pathname = usePathname();
  const router = useRouter();
  const locked = isVideoSessionActive(stage);

  useEffect(() => {
    document.body.classList.toggle("video-session-locked", locked);
    return () => {
      document.body.classList.remove("video-session-locked");
    };
  }, [locked]);

  useEffect(() => {
    if (!locked) return;

    const blockNavigation = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.origin);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (url.pathname === pathname) return;

      event.preventDefault();
      event.stopPropagation();
    };

    document.addEventListener("click", blockNavigation, true);
    return () => document.removeEventListener("click", blockNavigation, true);
  }, [locked, pathname]);

  useEffect(() => {
    if (!locked) return;

    const onPopState = () => {
      router.replace(VIDEO_SESSION_HOME_ROUTE);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [locked, router]);

  useEffect(() => {
    if (!locked || pathname === VIDEO_SESSION_HOME_ROUTE) return;
    router.replace(VIDEO_SESSION_HOME_ROUTE);
  }, [locked, pathname, router]);

  return null;
}
