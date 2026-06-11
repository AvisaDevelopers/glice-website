"use client";

import { HomeProfileMenu } from "@/components/layout/home-profile-menu";
import { MessagesBadgeButton } from "@/components/layout/messages-badge-button";

export function HomeHeaderActions() {
  return (
    <div className="home-header-actions">
      <MessagesBadgeButton />
      <HomeProfileMenu />
    </div>
  );
}
