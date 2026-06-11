"use client";

import { UserAvatar } from "@/components/chat/user-avatar";
import { useUiSession } from "@/components/site/ui-session-provider";
import { ArrowLeft, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export function ChatTopbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeRoomId = searchParams.get("room");
  const { userName } = useUiSession();

  const goToInbox = () => {
    router.push("/messages", { scroll: false });
  };

  return (
    <header className="chat-topbar">
      <nav className="chat-topbar-nav" aria-label="Messages navigation">
        <Link
          href="/messages"
          onClick={(e) => {
            if (activeRoomId) {
              e.preventDefault();
              goToInbox();
            }
          }}
          className="chat-topbar-messages-link"
        >
          <MessageSquare className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span className="chat-topbar-mark" aria-hidden="true" />
          <h1>Messages</h1>
        </Link>

        {activeRoomId ? (
          <button
            type="button"
            onClick={goToInbox}
            className="chat-topbar-btn"
            aria-label="Back to chats"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        ) : (
          <Link href="/" className="chat-topbar-btn" aria-label="Back to home">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        )}
      </nav>

      <div className="chat-topbar-actions">
        <UserAvatar name={userName} size="sm" />
      </div>
    </header>
  );
}
