"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useUiSession } from "@/components/site/ui-session-provider";
import { AuthModal } from "./auth-modal";
import { PreferenceModal } from "./preference-modal";

const PARTNERS = [
  { name: "Mia", location: "London, UK", initial: "M" },
  { name: "Alex", location: "Berlin, DE", initial: "A" },
  { name: "Sofia", location: "Madrid, ES", initial: "S" },
  { name: "Jordan", location: "Toronto, CA", initial: "J" },
  { name: "Yuki", location: "Tokyo, JP", initial: "Y" },
];

type CallStage = "idle" | "searching" | "connected";

const GENDER_OPTIONS = ["Everyone", "Women", "Men"] as const;

export function VideoHero() {
  const { isLoggedIn, openAuth } = useUiSession();
  const [liveCount, setLiveCount] = useState(2847);
  const [gender, setGender] = useState<(typeof GENDER_OPTIONS)[number]>("Everyone");
  const [genderMenuOpen, setGenderMenuOpen] = useState(false);
  const [prefOpen, setPrefOpen] = useState(false);
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(35);
  const [maxDistance, setMaxDistance] = useState(50);
  const [callStage, setCallStage] = useState<CallStage>("idle");
  const [partner, setPartner] = useState(PARTNERS[0]);
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLiveCount((count) => count + Math.floor(Math.random() * 5) - 2);
    }, 4000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setCallStage("idle");
      setIsBusy(false);
    }
  }, [isLoggedIn]);

  const preferenceLabel = `${minAge}–${maxAge} · ${maxDistance} km`;

  const startVideo = () => {
    if (!isLoggedIn) {
      openAuth("login");
      return;
    }
    if (isBusy) return;

    setIsBusy(true);
    setCallStage("searching");

    window.setTimeout(() => {
      const nextPartner =
        PARTNERS[Math.floor(Math.random() * PARTNERS.length)] ?? PARTNERS[0];
      setPartner(nextPartner);
      setCallStage("connected");
      setIsBusy(false);
    }, 2200);
  };

  const cancelSearch = () => {
    setCallStage("idle");
    setIsBusy(false);
  };

  const endCall = () => {
    setCallStage("idle");
    setIsBusy(false);
  };

  const nextPartner = () => {
    setCallStage("searching");
    setIsBusy(true);
    window.setTimeout(() => {
      const next =
        PARTNERS[Math.floor(Math.random() * PARTNERS.length)] ?? PARTNERS[0];
      setPartner(next);
      setCallStage("connected");
      setIsBusy(false);
    }, 1500);
  };

  return (
    <>
      <section className="video-hero" id="videoHero">
        <div className="video-hero-inner">
          <div className="hero-shell">
            <div className="hero-stage">
              <div className="hero-stage-shine" aria-hidden="true" />

              <div className="hero-stage-center hero-guest-ui">
                <div className="hero-stage-mark">
                  <Image
                    src="/icons/transparent_icon.png"
                    alt=""
                    width={56}
                    height={56}
                    className="hero-stage-logo"
                  />
                  <span className="hero-stage-wordmark">Glice</span>
                </div>
                <div className="hero-live-pill">
                  <span className="hero-live-dot" aria-hidden="true" />
                  <span className="hero-live-pill-text">
                    <strong>{liveCount.toLocaleString()}</strong> are matching now
                  </span>
                </div>
              </div>

              <div className="hero-video hero-user-ui">
                {callStage === "idle" && (
                  <div className="vc-stage">
                    <div className="vc-local-placeholder">
                      <i className="ri-camera-line" aria-hidden="true" />
                      <span>Camera preview</span>
                    </div>
                  </div>
                )}

                {callStage === "searching" && (
                  <div className="vc-stage">
                    <div className="vc-local-placeholder">
                      <i className="ri-camera-line" aria-hidden="true" />
                    </div>
                    <div className="vc-searching-ui">
                      <div className="vc-spinner" aria-hidden="true" />
                      <p>Finding someone for you…</p>
                      <button
                        type="button"
                        className="vc-cancel-search"
                        onClick={cancelSearch}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {callStage === "connected" && (
                  <div className="vc-stage">
                    <div className="vc-remote-placeholder">
                      <div className="vc-remote-avatar">{partner.initial}</div>
                      <span className="vc-remote-name">{partner.name}</span>
                      <span className="vc-remote-location">{partner.location}</span>
                    </div>
                    <div className="vc-connected-badge">Live</div>
                    <div className="vc-local-pip" />
                  </div>
                )}
              </div>

              {callStage === "connected" && (
                <div className="hero-dock hero-dock--call hero-user-ui">
                  <div className="hero-dock-connected">
                    <button type="button" className="hero-dock-action" aria-label="Mute">
                      <i className="ri-mic-line" />
                    </button>
                    <button
                      type="button"
                      className="hero-dock-action hero-dock-action--next"
                      aria-label="Next"
                      onClick={nextPartner}
                    >
                      <i className="ri-skip-forward-fill" />
                      <span>Next</span>
                    </button>
                    <button
                      type="button"
                      className="hero-dock-action hero-dock-action--end"
                      aria-label="End call"
                      onClick={endCall}
                    >
                      <i className="ri-phone-fill" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <aside className="hero-filters" aria-label="Match filters">
              <div className={`hero-filters-card${isBusy ? " is-busy" : ""}`}>
                <div className="hero-filters-brand">
                  <span
                    className="nav-brand-mark hero-filters-mark"
                    aria-hidden="true"
                  />
                  <span className="hero-filters-name">Glice</span>
                </div>
                <p className="hero-filters-desc">Live video. Real connections.</p>

                <div className="hero-filter-grid">
                  <div className="hero-filter-item">
                    <button
                      type="button"
                      className="hero-filter-btn"
                      aria-expanded={genderMenuOpen}
                      aria-haspopup="listbox"
                      onClick={() => setGenderMenuOpen((open) => !open)}
                    >
                      <i className="ri-user-line" aria-hidden="true" />
                      <span className="hero-filter-btn-label">Gender</span>
                      <span className="hero-filter-btn-value">{gender}</span>
                      <i className="ri-arrow-down-s-line hero-filter-chevron" aria-hidden="true" />
                    </button>
                    <div
                      className={`hero-filter-menu${genderMenuOpen ? "" : " is-hidden"}`}
                      role="listbox"
                    >
                      {GENDER_OPTIONS.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`hero-filter-option${gender === option ? " is-active" : ""}`}
                          onClick={() => {
                            setGender(option);
                            setGenderMenuOpen(false);
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="hero-filter-item">
                    <button
                      type="button"
                      className="hero-filter-btn"
                      aria-expanded={prefOpen}
                      aria-haspopup="dialog"
                      onClick={() => setPrefOpen(true)}
                    >
                      <i className="ri-equalizer-line" aria-hidden="true" />
                      <span className="hero-filter-btn-label">Preference</span>
                      <span className="hero-filter-btn-value">{preferenceLabel}</span>
                      <i className="ri-arrow-down-s-line hero-filter-chevron" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="hero-start-chat"
                  onClick={startVideo}
                >
                  <i className="ri-vidicon-fill" aria-hidden="true" />
                  Start video chat
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <PreferenceModal
        open={prefOpen}
        minAge={minAge}
        maxAge={maxAge}
        maxDistance={maxDistance}
        onClose={() => setPrefOpen(false)}
        onDone={() => setPrefOpen(false)}
        onMinAgeChange={setMinAge}
        onMaxAgeChange={setMaxAge}
        onMaxDistanceChange={setMaxDistance}
      />

      <AuthModal />
    </>
  );
}
