"use client";

import { HomeHeaderActions } from "@/components/layout/home-header-actions";
import { MessagesBadgeButton } from "@/components/layout/messages-badge-button";
import { useUiSession } from "@/components/site/ui-session-provider";
import Link from "next/link";

export function Header() {
  const { isLoggedIn, openAuth } = useUiSession();

  return (
    <header
      className={`topbar${isLoggedIn ? " topbar--home-premium" : ""}`}
      aria-label="Site"
    >
      <Link href="/" className="nav-brand">
        <span className="nav-brand-mark" aria-hidden="true" />
        <span className="nav-name">
          <span className="nav-name-brand">Glice:</span> Live Video Chat Nearby
        </span>
      </Link>

      {!isLoggedIn && (
        <div className="topbar-actions">
          <MessagesBadgeButton />
          <button
            type="button"
            className="topbar-btn"
            onClick={() => openAuth("login")}
          >
            Login
          </button>
          <button
            type="button"
            className="topbar-btn topbar-btn--signup"
            onClick={() => openAuth("signup")}
          >
            Sign up
          </button>
        </div>
      )}

      {isLoggedIn && <HomeHeaderActions />}
    </header>
  );
}
