"use client";

import { OmegleSeoContent } from "@/components/omegle/omegle-seo-content";
import { VideoHero } from "@/components/video/video-hero";
import { useUiSession } from "@/components/site/ui-session-provider";
import { omeglePageSeoContent } from "@/content/seo/omegle-page-content";
import { useCallback, useEffect, useRef, useState } from "react";
import "@/styles/omegle-theme.css";

function useVideoSessionActive() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const sync = () => {
      setActive(document.body.classList.contains("video-session-active"));
    };

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

function OmegleMiniHeader() {
  return (
    <header className="omegle-mini-header" aria-label="Omegle">
      <h1 className="omegle-mini-header__logo">
        <span className="omegle-logo__mark">Omegle</span>
      </h1>
      <p className="omegle-mini-header__tagline">Talk to strangers!</p>
    </header>
  );
}

export function OmeglePage() {
  const { isLoggedIn } = useUiSession();
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const inSession = useVideoSessionActive();
  const videoWrapRef = useRef<HTMLDivElement>(null);

  const triggerVideoStart = useCallback(() => {
    if (!ageConfirmed) return;
    const startBtn = videoWrapRef.current?.querySelector<HTMLButtonElement>(
      ".hero-toolbar-btn--start",
    );
    startBtn?.click();
  }, [ageConfirmed]);

  if (isLoggedIn) {
    return (
      <div
        className={`omegle-page omegle-page--modern omegle-page--logged-in${inSession ? " omegle-page--session" : ""}`}
      >
        <OmegleMiniHeader />
        <div className="omegle-video-wrap">
          <VideoHero variant="omegle" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`omegle-page omegle-page--modern${inSession ? " omegle-page--session" : ""}`}
    >
      <OmegleMiniHeader />

      {!inSession && (
        <section
          id="omegle-video-start"
          className="omegle-landing-controls"
          aria-label="Start a video chat"
        >
          <p className="omegle-mode-label">
            <i className="ri-vidicon-line" aria-hidden />
            Video chat
          </p>

          <div className="omegle-page-controls">
            <label className="omegle-age-row">
              <input
                type="checkbox"
                checked={ageConfirmed}
                onChange={(event) => setAgeConfirmed(event.target.checked)}
              />
              <span>
                I confirm that I am at least 18 years old and agree to the{" "}
                <a href="/terms-and-conditions">terms</a>
              </span>
            </label>
            {!ageConfirmed && (
              <p className="omegle-age-hint">
                Confirm you are 18+ to enable the Start button.
              </p>
            )}
          </div>

          <button
            type="button"
            className="omegle-start-btn"
            onClick={triggerVideoStart}
            disabled={!ageConfirmed}
          >
            Start
          </button>
        </section>
      )}

      <div className="omegle-video-wrap" ref={videoWrapRef}>
        <VideoHero variant="omegle" startDisabled={!ageConfirmed} />
      </div>

      {!inSession && (
        <>
          <p className="omegle-disclaimer">
            By using this service, you accept our{" "}
            <a href="/terms-and-conditions">Terms of Service</a> and{" "}
            <a href="/privacy-policy">Privacy Policy</a>. Do not share personal
            information with strangers. Glice is an independent platform — not
            affiliated with Omegle. Report inappropriate behavior immediately.
          </p>

          <OmegleSeoContent content={omeglePageSeoContent} />
        </>
      )}
    </div>
  );
}
