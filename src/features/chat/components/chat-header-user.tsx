"use client";

import { LogoutConfirmModal } from "@/components/auth/logout-confirm-modal";
import { TopbarUserSection } from "@/components/layout/topbar-user-section";
import { useUiSession } from "@/components/site/ui-session-provider";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ChatHeaderUser() {
  const router = useRouter();
  const { logout } = useUiSession();
  const [logoutOpen, setLogoutOpen] = useState(false);

  return (
    <>
      <TopbarUserSection className="chat-header-user" />
      <button
        type="button"
        className="chat-topbar-btn chat-topbar-btn--text"
        onClick={() => setLogoutOpen(true)}
      >
        Log out
      </button>

      <LogoutConfirmModal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={() => {
          setLogoutOpen(false);
          logout();
          router.push("/");
        }}
      />
    </>
  );
}
