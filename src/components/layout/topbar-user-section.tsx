"use client";

import { UserAvatar } from "@/components/chat/user-avatar";
import { useUiSession } from "@/components/site/ui-session-provider";
import { useSocketStore } from "@/features/chat/stores/socket-store";
import { Mail } from "lucide-react";

type TopbarUserSectionProps = {
  className?: string;
  /** Show name/email on smaller screens (used on home header). */
  showMeta?: boolean;
};

function isSocketOnline(phase: string): boolean {
  return phase === "ready" || phase === "connected" || phase === "success";
}

export function TopbarUserSection({
  className = "",
  showMeta = false,
}: TopbarUserSectionProps) {
  const { user, userName } = useUiSession();
  const socketPhase = useSocketStore((s) => s.phase);
  const isOnline = isSocketOnline(socketPhase);

  const email = user?.email ?? "";
  const username = user?.username?.trim() || user?.name?.trim() || userName;

  return (
    <div
      className={`topbar-user-profile${showMeta ? " topbar-user-profile--prominent" : ""} ${className}`.trim()}
    >
      <UserAvatar
        name={userName}
        url={user?.profileUrl}
        size="sm"
        isOnline={isOnline}
        showStatus
      />
      <div className="topbar-user-profile-meta">
        <p className="topbar-user-profile-name">{username}</p>
        {email && (
          <p className="topbar-user-profile-email">
            <Mail className="topbar-user-profile-email-icon" aria-hidden />
            <span className="truncate">{email}</span>
          </p>
        )}
      </div>
    </div>
  );
}
