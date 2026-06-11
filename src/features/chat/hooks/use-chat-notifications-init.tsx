"use client";

import {
  requestChatNotificationPermission,
  setChatNotificationRoute,
} from "@/features/chat/lib/chat-notifications";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

/** Keeps notification routing in sync + requests permission once on messages. */
export function ChatNotificationsInit(): null {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const roomId = searchParams.get("room") ?? "";

  useEffect(() => {
    const onMessages = pathname.startsWith("/messages");
    setChatNotificationRoute(onMessages, roomId);
  }, [pathname, roomId]);

  useEffect(() => {
    if (!pathname.startsWith("/messages")) return;
    void requestChatNotificationPermission();
  }, [pathname]);

  useEffect(() => {
    const prime = () => {
      void import("@/features/chat/lib/chat-notifications").then(
        ({ primeChatNotificationAudio }) => primeChatNotificationAudio(),
      );
    };
    window.addEventListener("pointerdown", prime, { once: true });
    return () => window.removeEventListener("pointerdown", prime);
  }, []);

  return null;
}
