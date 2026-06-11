"use client";

import Link from "next/link";
import { ChatHeaderUser } from "./chat-header-user";

export function ChatTopbar() {
  return (
    <header className="chat-topbar">
      <nav className="chat-topbar-nav" aria-label="Messages navigation">
        <Link href="/" className="chat-topbar-logo" aria-label="Glice home">
          <span className="chat-topbar-logo-mark" aria-hidden="true" />
        </Link>

        <Link href="/messages" className="chat-topbar-messages-link">
          <h1>Messages</h1>
        </Link>
      </nav>

      <div className="chat-topbar-actions">
        <ChatHeaderUser />
      </div>
    </header>
  );
}
