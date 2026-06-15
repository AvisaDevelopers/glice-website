"use client";

import { useVideoCallStore } from "@/features/video/stores/video-call-store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const ACTIVE_STAGES = new Set(["searching", "connecting", "connected", "feedback"]);

/** Locks page scroll and in-app navigation while a video session is active. */
export function VideoSessionGuard() {
  const stage = useVideoCallStore((s) => s.stage);
  const pathname = usePathname();
  const router = useRouter();
  const locked = ACTIVE_STAGES.has(stage);

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
      router.replace(pathname);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [locked, pathname, router]);

  return null;
}
