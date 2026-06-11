"use client";

import { HomeProfileMenu } from "@/components/layout/home-profile-menu";
import { MessagesBadgeButton } from "@/components/layout/messages-badge-button";
import {
  formatUnreadBadge,
  useTotalUnreadMessages,
} from "@/features/chat/hooks/use-total-unread";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";

export function HomeHeaderActions() {
  const router = useRouter();
  const unread = useTotalUnreadMessages();
  const badge = formatUnreadBadge(unread);
  const hasUnread = unread > 0;

  return (
    <div className="home-header-actions">
      <MessagesBadgeButton />

      <button
        type="button"
        className="home-header-icon-btn"
        onClick={() => router.push("/messages")}
        aria-label={hasUnread ? "Notifications, unread messages" : "Notifications"}
      >
        <Bell className="h-[1.15rem] w-[1.15rem]" aria-hidden />
        {badge && <span className="home-header-dot" aria-hidden />}
      </button>

      <HomeProfileMenu />
    </div>
  );
}
