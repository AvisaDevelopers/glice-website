"use client";

import {
  formatUnreadBadge,
  useTotalUnreadMessages,
} from "@/features/chat/hooks/use-total-unread";
import { useUiSession } from "@/components/site/ui-session-provider";
import { useVideoSessionLocked } from "@/features/video/hooks/use-video-session-locked";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

type MessagesBadgeButtonProps = {
  className?: string;
  showLabel?: boolean;
  variant?: "topbar" | "icon";
};

export function MessagesBadgeButton({
  className = "",
  showLabel = true,
  variant = "topbar",
}: MessagesBadgeButtonProps) {
  const router = useRouter();
  const { isLoggedIn, openAuth } = useUiSession();
  const sessionLocked = useVideoSessionLocked();
  const unread = useTotalUnreadMessages();
  const badge = formatUnreadBadge(unread);

  const openMessages = () => {
    if (sessionLocked) return;
    if (isLoggedIn) {
      router.push("/messages");
      return;
    }
    openAuth("login");
  };

  if (variant === "icon") {
    return (
      <button
        type="button"
        className={`topbar-messages-icon-btn ${className}`.trim()}
        onClick={openMessages}
        disabled={sessionLocked}
        aria-label={
          unread > 0 ? `Messages, ${unread} unread` : "Messages"
        }
        title={sessionLocked ? "Finish your video call first" : undefined}
      >
        <MessageSquare className="h-5 w-5" aria-hidden />
        {badge && (
          <span className="topbar-messages-badge" aria-hidden>
            {badge}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`topbar-btn topbar-btn--messages ${className}`.trim()}
      onClick={openMessages}
      disabled={sessionLocked}
      aria-label={unread > 0 ? `Messages, ${unread} unread` : "Messages"}
      title={sessionLocked ? "Finish your video call first" : undefined}
    >
      <span className="topbar-messages-icon-wrap">
        <i className="ri-message-3-line" aria-hidden="true" />
        {badge && (
          <span className="topbar-messages-badge" aria-hidden>
            {badge}
          </span>
        )}
      </span>
      {showLabel && <span>Messages</span>}
    </button>
  );
}
