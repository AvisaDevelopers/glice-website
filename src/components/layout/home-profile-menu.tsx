"use client";

import { LogoutConfirmModal } from "@/components/auth/logout-confirm-modal";
import { UserAvatar } from "@/components/chat/user-avatar";
import {
  getCountryDisplay,
  getGenderDisplay,
  getReferralCode,
  isVerified,
  shouldResolveCountryFromIp,
} from "@/components/layout/profile-menu-utils";
import {
  resolveCountryFromIp,
  type ResolvedCountry,
} from "@/components/layout/resolve-country-from-ip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUiSession } from "@/components/site/ui-session-provider";
import { getUser } from "@/features/auth/api/auth-api";
import { useSocketStore } from "@/features/chat/stores/socket-store";
import { useVideoSessionLocked } from "@/features/video/hooks/use-video-session-locked";
import {
  Check,
  Copy,
  Headphones,
  LogOut,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { profileStatusFromUser } from "@/lib/verification-status";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function isSocketOnline(phase: string): boolean {
  return phase === "ready" || phase === "connected" || phase === "success";
}

export function HomeProfileMenu() {
  const router = useRouter();
  const { user, userName, logout, applySessionUser } = useUiSession();
  const sessionLocked = useVideoSessionLocked();
  const socketPhase = useSocketStore((s) => s.phase);
  const isOnline = isSocketOnline(socketPhase);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [resolvedCountry, setResolvedCountry] =
    useState<ResolvedCountry | null>(null);

  useEffect(() => {
    if (!menuOpen || !user?.email) return;

    let cancelled = false;
    const email = user.email;

    getUser(email)
      .then((profile) => {
        if (!cancelled) {
          applySessionUser({ ...user, ...profile, email });
        }
      })
      .catch(() => {
        /* profile refresh optional */
      });

    return () => {
      cancelled = true;
    };
  }, [menuOpen, user, applySessionUser]);

  useEffect(() => {
    if (!menuOpen || !user || !shouldResolveCountryFromIp(user)) {
      setResolvedCountry(null);
      return;
    }

    let cancelled = false;
    const ip = user.ipAddress!.trim();

    resolveCountryFromIp(ip).then((country) => {
      if (!cancelled) setResolvedCountry(country);
    });

    return () => {
      cancelled = true;
    };
  }, [menuOpen, user]);

  const username = user?.username?.trim() || user?.name?.trim() || userName;
  const email = user?.email ?? "";
  const verified = isVerified(user);
  const country = getCountryDisplay(user, resolvedCountry);
  const genderDisplay = getGenderDisplay(user?.gender);
  const GenderIcon = genderDisplay?.Icon;
  const referralCode = getReferralCode(user);
  const mediaVerificationStatus = profileStatusFromUser(user);

  const copyReferralCode = async () => {
    if (!referralCode) return;
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <>
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="home-header-avatar-btn"
            aria-label="Open profile menu"
          >
            <UserAvatar
              name={userName}
              url={user?.profileUrl}
              size="sm"
              isOnline={isOnline}
              showStatus
              verified={verified}
              verification={user?.verification}
              mediaVerificationStatus={mediaVerificationStatus}
              profileStatus={mediaVerificationStatus}
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="home-profile-panel">
          <div className="home-profile-hero">
            <div className="home-profile-hero-glow" aria-hidden />
            <div className="home-profile-hero-body">
              <UserAvatar
                name={userName}
                url={user?.profileUrl}
                size="lg"
                isOnline={isOnline}
                showStatus
                verified={verified}
                verification={user?.verification}
                mediaVerificationStatus={mediaVerificationStatus}
              profileStatus={mediaVerificationStatus}
              />
              <div className="home-profile-hero-copy">
                <p className="home-profile-name">
                  <span className="truncate">{username}</span>
                </p>
                {email && (
                  <p className="home-profile-email truncate">{email}</p>
                )}
              </div>
            </div>

            {(country || genderDisplay) && (
              <div className="home-profile-chips">
                {country && (
                  <span className="home-profile-chip">
                    {country.flag ? (
                      <span className="home-profile-chip-flag" aria-hidden>
                        {country.flag}
                      </span>
                    ) : (
                      <country.Icon className="home-profile-chip-icon" aria-hidden />
                    )}
                    <span>{country.label}</span>
                  </span>
                )}
                {country && genderDisplay && (
                  <span className="home-profile-chip-sep" aria-hidden />
                )}
                {genderDisplay && GenderIcon && (
                  <span className="home-profile-chip">
                    <GenderIcon
                      className="home-profile-chip-icon"
                      aria-hidden
                    />
                    <span>{genderDisplay.label}</span>
                  </span>
                )}
              </div>
            )}
          </div>

          {referralCode && (
            <div className="home-profile-referral-wrap">
              <button
                type="button"
                className="home-profile-referral"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  void copyReferralCode();
                }}
              >
                <span className="home-profile-referral-label">Referral code</span>
                <span className="home-profile-referral-value">{referralCode}</span>
                {copied ? (
                  <Check className="home-profile-referral-action" aria-hidden />
                ) : (
                  <Copy className="home-profile-referral-action" aria-hidden />
                )}
                <span className="sr-only">
                  {copied ? "Copied referral code" : "Copy referral code"}
                </span>
              </button>
            </div>
          )}

          <DropdownMenuSeparator className="home-profile-separator" />

          <div className="home-profile-nav">
            <DropdownMenuItem
              asChild
              className="home-profile-item"
              disabled={sessionLocked}
            >
              <Link
                href="/messages"
                onClick={(event) => {
                  if (sessionLocked) event.preventDefault();
                }}
                aria-disabled={sessionLocked}
                tabIndex={sessionLocked ? -1 : undefined}
              >
                <MessageSquare className="h-4 w-4" />
                Messages
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              asChild
              className="home-profile-item"
              disabled={sessionLocked}
            >
              <Link
                href="/features"
                onClick={(event) => {
                  if (sessionLocked) event.preventDefault();
                }}
                aria-disabled={sessionLocked}
                tabIndex={sessionLocked ? -1 : undefined}
              >
                <Sparkles className="h-4 w-4" />
                Features
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              asChild
              className="home-profile-item"
              disabled={sessionLocked}
            >
              <Link
                href="/contact"
                onClick={(event) => {
                  if (sessionLocked) event.preventDefault();
                }}
                aria-disabled={sessionLocked}
                tabIndex={sessionLocked ? -1 : undefined}
              >
                <Headphones className="h-4 w-4" />
                Contact us
              </Link>
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator className="home-profile-separator" />

          <DropdownMenuItem
            className="home-profile-item home-profile-item--danger"
            onSelect={() => setLogoutOpen(true)}
          >
            <LogOut className="h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

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
