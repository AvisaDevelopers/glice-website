"use client";

import { useEffect } from "react";

export function HomeVideoDeepLink() {
  useEffect(() => {
    const scrollToVideoHero = () => {
      const hero = document.getElementById("videoHero");
      if (!hero) return;
      hero.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const shouldScroll =
      window.location.hash === "#videoHero" ||
      new URLSearchParams(window.location.search).get("start") === "1";

    if (!shouldScroll) return;

    const timer = window.setTimeout(scrollToVideoHero, 120);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
