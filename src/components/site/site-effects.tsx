"use client";

import { useMounted } from "@/hooks/use-mounted";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const STAGGER_CLASS_PREFIX = "reveal-stagger-";
const MAX_STAGGER_INDEX = 6;

function isRevealInView(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.height > 0 &&
    rect.top < window.innerHeight - 80 &&
    rect.bottom > 0
  );
}

function bindNewRevealElements(
  observer: IntersectionObserver,
  boundElements: WeakSet<Element>,
) {
  let delayIndex = document.querySelectorAll(".reveal.is-visible").length;

  document.querySelectorAll(".reveal:not(.is-visible)").forEach((element) => {
    if (boundElements.has(element)) return;

    boundElements.add(element);
    const staggerIndex = Math.min(delayIndex, MAX_STAGGER_INDEX);
    element.classList.add(`${STAGGER_CLASS_PREFIX}${staggerIndex}`);
    delayIndex += 1;

    if (isRevealInView(element)) {
      element.classList.add("is-visible");
      return;
    }

    observer.observe(element);
  });
}

export function SiteEffects() {
  const pathname = usePathname();
  const mounted = useMounted();
  const bindScheduledRef = useRef(false);
  const boundElementsRef = useRef(new WeakSet<Element>());

  useEffect(() => {
    if (!mounted) return;

    const onScroll = () => {
      if (window.scrollY > 12) {
        document.body.classList.add("is-scrolled");
      } else {
        document.body.classList.remove("is-scrolled");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -80px 0px" },
    );

    const bindReveals = () =>
      bindNewRevealElements(observer, boundElementsRef.current);

    const scheduleBindReveals = () => {
      if (bindScheduledRef.current) return;
      bindScheduledRef.current = true;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          bindScheduledRef.current = false;
          bindReveals();
        });
      });
    };

    const initialId = window.setTimeout(scheduleBindReveals, 100);

    const mutationObserver = new MutationObserver(() => {
      scheduleBindReveals();
    });

    const mutationStartId = window.setTimeout(() => {
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }, 100);

    const retryIds = [200, 450, 850].map((delay) =>
      window.setTimeout(scheduleBindReveals, delay),
    );

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(initialId);
      window.clearTimeout(mutationStartId);
      retryIds.forEach(clearTimeout);
      observer.disconnect();
      mutationObserver.disconnect();
      document.querySelectorAll(".reveal").forEach((element) => {
        for (let i = 0; i <= MAX_STAGGER_INDEX; i += 1) {
          element.classList.remove(`${STAGGER_CLASS_PREFIX}${i}`);
        }
      });
    };
  }, [mounted, pathname]);

  return null;
}
