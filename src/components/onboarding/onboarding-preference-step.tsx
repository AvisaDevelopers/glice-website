"use client";

import {
  HOME_TAB_LIVE_VIDEO,
  HOME_TAB_SWIPE,
  type HomeTabPreference,
} from "@/features/onboarding/types";
import Image from "next/image";

const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.glice.app";

type PreferenceCardProps = {
  badge: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imagePosition: string;
  accent: "live" | "swipe";
  iconClass: string;
  selected: boolean;
  dimmed: boolean;
  onSelect: () => void;
};

function PreferenceCard({
  badge,
  title,
  subtitle,
  imageSrc,
  imagePosition,
  accent,
  iconClass,
  selected,
  dimmed,
  onSelect,
}: PreferenceCardProps) {
  return (
    <button
      type="button"
      className={`pref-card pref-card--${accent}${selected ? " is-selected" : ""}${dimmed ? " is-dimmed" : ""}`}
      onClick={onSelect}
    >
      <Image
        src={imageSrc}
        alt=""
        fill
        className="pref-card-image"
        style={{ objectPosition: imagePosition }}
        sizes="(max-width: 720px) 100vw, 50vw"
        priority
      />
      <span className="pref-card-gradient" aria-hidden />
      <span className={`pref-card-chip pref-card-chip--${accent}${selected ? " is-selected" : ""}`}>
        <i className={iconClass} aria-hidden />
      </span>
      <span className="pref-card-content">
        <span className={`pref-card-badge pref-card-badge--${accent}`}>{badge}</span>
        <strong className="pref-card-title">{title}</strong>
        <span className="pref-card-subtitle">{subtitle}</span>
      </span>
    </button>
  );
};

type OnboardingPreferenceStepProps = {
  homeTab: HomeTabPreference | null;
  onSelect: (tab: HomeTabPreference) => void;
  onBack: () => void;
  onContinue: () => void;
  submitting: boolean;
  disabled: boolean;
};

export function OnboardingPreferenceStep({
  homeTab,
  onSelect,
  onBack,
  onContinue,
  submitting,
  disabled,
}: OnboardingPreferenceStepProps) {
  const hasPick = homeTab !== null;
  const continueAccent =
    homeTab === HOME_TAB_SWIPE
      ? "pref-step-continue--swipe"
      : "pref-step-continue--live";

  return (
    <div className="pref-step">
      <div
        className={`pref-step-backdrop${homeTab === HOME_TAB_SWIPE ? " pref-step-backdrop--swipe" : homeTab === HOME_TAB_LIVE_VIDEO ? " pref-step-backdrop--live" : ""}${hasPick ? " has-selection" : ""}`}
        aria-hidden
      />

      <button
        type="button"
        className="pref-step-back"
        onClick={onBack}
        disabled={submitting}
        aria-label="Go back"
      >
        <i className="ri-arrow-left-line" aria-hidden />
      </button>

      <div className="pref-step-inner">
        <div className="pref-step-scroll">
          <h1 className="pref-step-title">Where do you want to start?</h1>
          <p className="pref-step-desc">
            Pick the experience that excites you most.
            <br />
            You can switch any time from the bottom bar.
          </p>

          <div className="pref-step-cards">
            <PreferenceCard
              badge="LIVE"
              title={"Live Video\nChat"}
              subtitle="Jump into a face-to-face call with someone new."
              imageSrc="/onboarding/pref_image_card_2.jpg"
              imagePosition="70% 30%"
              accent="live"
              iconClass="ri-vidicon-line"
              selected={homeTab === HOME_TAB_LIVE_VIDEO}
              dimmed={hasPick && homeTab !== HOME_TAB_LIVE_VIDEO}
              onSelect={() => onSelect(HOME_TAB_LIVE_VIDEO)}
            />
            <PreferenceCard
              badge="SWIPE"
              title={"Swipe &\nDiscover"}
              subtitle="Browse profiles, like, super-like and match."
              imageSrc="/onboarding/pref_image_card_1.jpg"
              imagePosition="30% 30%"
              accent="swipe"
              iconClass="ri-heart-line"
              selected={homeTab === HOME_TAB_SWIPE}
              dimmed={hasPick && homeTab !== HOME_TAB_SWIPE}
              onSelect={() => onSelect(HOME_TAB_SWIPE)}
            />
          </div>
        </div>

        <div className="pref-step-footer">
          <button
            type="button"
            className={`pref-step-continue ${hasPick ? continueAccent : "pref-continue--idle"}`}
            onClick={onContinue}
            disabled={!hasPick || submitting || disabled}
          >
            {submitting ? (
              <>
                <span className="onboarding-spinner onboarding-spinner--dark" aria-hidden />
                Saving…
              </>
            ) : (
              "Continue"
            )}
          </button>
          {!hasPick && (
            <p className="pref-step-hint">Select an option above to continue</p>
          )}
        </div>
      </div>
    </div>
  );
}

type OnboardingDiscoverDownloadProps = {
  onUseWeb: () => void;
};

export function OnboardingDiscoverDownload({
  onUseWeb,
}: OnboardingDiscoverDownloadProps) {
  return (
    <div className="pref-download-overlay" role="dialog" aria-modal="true">
      <div className="pref-download-card">
        <span className="pref-download-badge">SWIPE</span>
        <h2>Download Glice to Swipe &amp; Discover</h2>
        <p>
          Swipe &amp; Discover is available in the Glice mobile app. Browse
          profiles, like, super-like, and match on the go.
        </p>
        <p className="pref-download-note">
          Your profile is saved. Open the app and sign in with the same account
          to start discovering.
        </p>

        <a
          href={GOOGLE_PLAY_URL}
          className="pref-download-store"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="store-icon" aria-hidden>
            <i className="ri-google-play-fill" />
          </span>
          <span>
            <span className="pref-download-store-eyebrow">Get it on</span>
            <span className="pref-download-store-label">Google Play</span>
          </span>
        </a>

        <button type="button" className="pref-download-web" onClick={onUseWeb}>
          Use Live Video on web instead
        </button>
      </div>
    </div>
  );
}
