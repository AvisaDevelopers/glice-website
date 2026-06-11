"use client";

import { ChatNotificationToasts } from "./chat-notification-toasts";
import { ChatNotificationsInit } from "../hooks/use-chat-notifications-init";

/** In-app toasts + browser notification routing (global). */
export function ChatNotificationHost() {
  return (
    <>
      <ChatNotificationsInit />
      <ChatNotificationToasts />
    </>
  );
}
