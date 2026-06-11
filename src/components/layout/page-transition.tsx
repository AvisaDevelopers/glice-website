"use client";

import { RouteLoader } from "@/components/layout/route-loader";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const LOADER_MS = 1050;
const SWAP_MS = 420;

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState(children);
  const pendingContent = useRef(children);
  const prevPath = useRef(pathname);
  const isFirstRender = useRef(true);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    pendingContent.current = children;
    if (!isLoading && pathname === prevPath.current) {
      setContent(children);
    }
  }, [children, isLoading, pathname]);

  useEffect(() => {
    const clearTimers = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };

    if (pathname === prevPath.current) {
      return clearTimers;
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevPath.current = pathname;
      setContent(pendingContent.current);
      return clearTimers;
    }

    if (reduceMotion) {
      prevPath.current = pathname;
      setContent(pendingContent.current);
      window.scrollTo(0, 0);
      return clearTimers;
    }

    setIsLoading(true);

    timers.current.push(
      window.setTimeout(() => {
        prevPath.current = pathname;
        setContent(pendingContent.current);
        window.scrollTo(0, 0);
      }, SWAP_MS),
    );

    timers.current.push(
      window.setTimeout(() => {
        setIsLoading(false);
      }, LOADER_MS),
    );

    return clearTimers;
  }, [pathname, reduceMotion]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? <RouteLoader key="glice-route-loader" /> : null}
      </AnimatePresence>

      <div
        className={`page-content-shell${isLoading ? " page-content-shell--loading" : " page-content-shell--ready"}`}
      >
        {content}
      </div>
    </>
  );
}
