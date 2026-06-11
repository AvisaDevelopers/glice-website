"use client";

import { CallChatPanel } from "@/components/video/call-chat-panel";
import { MediaPermissionGate } from "@/components/video/media-permission-gate";
import { NearbySearchMotion } from "@/components/video/match-search-motion";
import { useUiSession } from "@/components/site/ui-session-provider";
import { useMediaStream } from "@/features/video/hooks/use-media-stream";
import { useMounted } from "@/hooks/use-mounted";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { AuthModal } from "./auth-modal";
import { PreferenceModal } from "./preference-modal";

const PARTNERS = [
  { name: "Mia", distance: "1.2 km", initial: "M" },
  { name: "Alex", distance: "3.8 km", initial: "A" },
  { name: "Sofia", distance: "0.9 km", initial: "S" },
  { name: "Jordan", distance: "5.1 km", initial: "J" },
  { name: "Yuki", distance: "2.4 km", initial: "Y" },
];

type CallStage = "idle" | "searching" | "connected" | "feedback";

const GENDER_OPTIONS = ["Everyone", "Women", "Men"] as const;

const SEARCH_MS = 3000;
const REMATCH_MS = 2400;

function remoteBadge(callStage: CallStage, partnerName: string) {
  if (callStage === "searching") return "Searching…";
  if (callStage === "connected" || callStage === "feedback") return partnerName;
  return "Waiting";
}

export function VideoHero() {
  const { isLoggedIn, openAuth } = useUiSession();
  const {
    localRef,
    status: mediaStatus,
    cameraEnabled,
    requestAccess,
    setMuted,
    setCameraEnabled,
    syncVideo,
  } = useMediaStream();

  const [gender, setGender] = useState<(typeof GENDER_OPTIONS)[number]>("Everyone");
  const [genderMenuOpen, setGenderMenuOpen] = useState(false);
  const [prefOpen, setPrefOpen] = useState(false);
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(35);
  const [maxDistance, setMaxDistance] = useState(50);
  const [callStage, setCallStage] = useState<CallStage>("idle");
  const [partner, setPartner] = useState(PARTNERS[0]);
  const [isMuted, setIsMuted] = useState(false);
  const genderMenuRef = useRef<HTMLDivElement>(null);
  const mounted = useMounted();

  const mediaReady = mounted && mediaStatus === "ready";
  const showPermissionGate =
    mounted &&
    (mediaStatus === "idle" ||
      mediaStatus === "denied" ||
      mediaStatus === "error" ||
      mediaStatus === "requesting");
  const isCheckingMedia = !mounted || mediaStatus === "checking";
  const isBusy = callStage === "searching";
  const inCall = callStage === "connected";
  const showChat = inCall;

  useEffect(() => {
    if (!isLoggedIn) {
      queueMicrotask(() => {
        setCallStage("idle");
        setGenderMenuOpen(false);
      });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (mediaReady) syncVideo();
  }, [callStage, mediaReady, syncVideo, cameraEnabled]);

  useEffect(() => {
    if (!genderMenuOpen) return;

    const close = (event: MouseEvent) => {
      if (
        genderMenuRef.current &&
        !genderMenuRef.current.contains(event.target as Node)
      ) {
        setGenderMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [genderMenuOpen]);

  const pickPartner = useCallback(() => {
    return PARTNERS[Math.floor(Math.random() * PARTNERS.length)] ?? PARTNERS[0];
  }, []);

  const beginSearch = useCallback(
    (duration = SEARCH_MS) => {
      setCallStage("searching");
      window.setTimeout(() => {
        setPartner(pickPartner());
        setCallStage("connected");
      }, duration);
    },
    [pickPartner],
  );

  const startVideo = () => {
    if (!mediaReady) return;
    if (!isLoggedIn) {
      openAuth("login");
      return;
    }
    if (isBusy) return;
    beginSearch();
  };

  const cancelSearch = () => setCallStage("idle");

  const endCall = () => {
    setCallStage("idle");
    setGenderMenuOpen(false);
  };

  const handleNext = () => setCallStage("feedback");

  const completeFeedback = () => beginSearch(REMATCH_MS);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    setMuted(next);
  };

  const toggleCamera = () => {
    setCameraEnabled(!cameraEnabled);
  };

  return (
    <>
      <section className="video-hero" id="videoHero">
        {showPermissionGate && (
          <MediaPermissionGate
            status={mediaStatus}
            onRequest={requestAccess}
          />
        )}

        <div
          className={`video-hero-inner${showPermissionGate ? " video-hero-inner--locked" : ""}${isCheckingMedia ? " video-hero-inner--checking" : ""}`}
          aria-hidden={showPermissionGate}
        >
          <div className="hero-dual-shell">
            <div className="hero-dual-wrap">
            <div className="hero-dual">
              <div className="hero-panel hero-panel--remote">
                <div
                  className={`hero-panel-badge hero-panel-badge--remote${callStage === "searching" || inCall || callStage === "feedback" ? " hero-panel-badge--active" : ""}`}
                >
                  <span className="hero-panel-badge-dot" aria-hidden />
                  {remoteBadge(callStage, partner.name)}
                  {(callStage === "connected" || callStage === "feedback") && (
                    <span className="hero-panel-badge-meta">
                      {partner.distance}
                    </span>
                  )}
                </div>

                {callStage === "idle" && (
                  <div className="hero-panel-idle hero-panel-idle--remote">
                    <div className="hero-panel-idle-icon" aria-hidden>
                      <i className="ri-radar-line" />
                    </div>
                    <p>Your match appears here</p>
                    <span>Press Start to find people within {maxDistance} km</span>
                  </div>
                )}

                <AnimatePresence>
                  {callStage === "searching" && (
                    <motion.div
                      key="searching"
                      className="hero-panel-overlay hero-panel-overlay--search"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <NearbySearchMotion radiusKm={maxDistance} />
                      <button
                        type="button"
                        className="vc-cancel-search"
                        onClick={cancelSearch}
                      >
                        Cancel search
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {inCall && (
                    <motion.div
                      key={`partner-${partner.name}`}
                      className="hero-panel-overlay hero-panel-overlay--connected"
                      initial={{ opacity: 0, scale: 1.03, filter: "blur(8px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="vc-remote-placeholder vc-remote-placeholder--live">
                        <motion.div
                          className="vc-remote-avatar"
                          initial={{ scale: 0.65, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.1, duration: 0.45 }}
                        >
                          {partner.initial}
                        </motion.div>
                        <span className="vc-remote-name">{partner.name}</span>
                        <span className="vc-remote-location">
                          <i className="ri-map-pin-2-fill" aria-hidden />
                          {partner.distance} away
                        </span>
                      </div>
                      <div className="vc-connected-badge">Live</div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {callStage === "feedback" && (
                    <motion.div
                      key="feedback"
                      className="hero-panel-overlay hero-panel-overlay--feedback"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="hero-feedback-card">
                        <p className="hero-feedback-eyebrow">Rate this match</p>
                        <h3 className="hero-feedback-title">
                          How was your chat with {partner.name}?
                        </h3>
                        <p className="hero-feedback-desc">
                          Your feedback improves future matches near you.
                        </p>
                        <div className="hero-feedback-actions">
                          <button
                            type="button"
                            className="hero-feedback-btn hero-feedback-btn--like"
                            onClick={completeFeedback}
                          >
                            <i className="ri-heart-fill" aria-hidden />
                            Like
                          </button>
                          <button
                            type="button"
                            className="hero-feedback-btn hero-feedback-btn--pass"
                            onClick={completeFeedback}
                          >
                            <i className="ri-thumb-down-line" aria-hidden />
                            Pass
                          </button>
                        </div>
                        <button
                          type="button"
                          className="hero-feedback-skip"
                          onClick={completeFeedback}
                        >
                          Skip feedback
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="hero-panel hero-panel--local">
                <div className="hero-panel-badge hero-panel-badge--local">
                  <span>You</span>
                  {!cameraEnabled && (
                    <span className="hero-panel-badge-meta hero-panel-badge-meta--warn">
                      Camera off
                    </span>
                  )}
                  {isMuted && (
                    <span className="hero-panel-badge-meta hero-panel-badge-meta--warn">
                      Muted
                    </span>
                  )}
                </div>

                <div className="hero-panel-media">
                  <video
                    ref={localRef}
                    className={`hero-panel-video${!cameraEnabled ? " hero-panel-video--hidden" : ""}`}
                    playsInline
                    muted
                    autoPlay
                    aria-label="Your camera"
                  />
                </div>

                {!cameraEnabled && (
                  <div className="hero-panel-camera-off">
                    <i className="ri-camera-off-line" aria-hidden />
                    <p>Camera is off</p>
                    <span>Others cannot see your video</span>
                  </div>
                )}

                <CallChatPanel partnerName={partner.name} active={showChat} />
              </div>
            </div>
            </div>

            <div className="hero-toolbar" role="toolbar" aria-label="Video controls">
              {inCall ? (
                <>
                  <button
                    type="button"
                    className={`hero-toolbar-btn${isMuted ? " is-active" : ""}`}
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    aria-pressed={isMuted}
                  >
                    <i
                      className={isMuted ? "ri-mic-off-line" : "ri-mic-line"}
                      aria-hidden
                    />
                  </button>
                  <button
                    type="button"
                    className={`hero-toolbar-btn${!cameraEnabled ? " is-active" : ""}`}
                    onClick={toggleCamera}
                    aria-label={cameraEnabled ? "Turn camera off" : "Turn camera on"}
                    aria-pressed={!cameraEnabled}
                  >
                    <i
                      className={
                        cameraEnabled ? "ri-camera-line" : "ri-camera-off-line"
                      }
                      aria-hidden
                    />
                  </button>
                  <button
                    type="button"
                    className="hero-toolbar-btn hero-toolbar-btn--next"
                    onClick={handleNext}
                    aria-label="Next person"
                  >
                    <i className="ri-skip-forward-fill" aria-hidden />
                    <span>Next</span>
                  </button>
                  <button
                    type="button"
                    className="hero-toolbar-btn hero-toolbar-btn--end"
                    onClick={endCall}
                    aria-label="End call"
                  >
                    <i className="ri-phone-fill" aria-hidden />
                  </button>
                </>
              ) : callStage === "feedback" ? (
                <p className="hero-toolbar-hint">
                  Choose Like or Pass above to find your next match
                </p>
              ) : (
                <>
                  <div className="hero-toolbar-menu-wrap" ref={genderMenuRef}>
                    <button
                      type="button"
                      className="hero-toolbar-btn"
                      aria-expanded={genderMenuOpen}
                      aria-haspopup="listbox"
                      disabled={isBusy}
                      onClick={() => setGenderMenuOpen((open) => !open)}
                    >
                      <i className="ri-user-line" aria-hidden />
                      <span>{gender}</span>
                      <i className="ri-arrow-down-s-line" aria-hidden />
                    </button>
                    {genderMenuOpen && (
                      <div className="hero-toolbar-menu" role="listbox">
                        {GENDER_OPTIONS.map((option) => (
                          <button
                            key={option}
                            type="button"
                            role="option"
                            aria-selected={gender === option}
                            className={`hero-toolbar-menu-item${gender === option ? " is-active" : ""}`}
                            onClick={() => {
                              setGender(option);
                              setGenderMenuOpen(false);
                            }}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    className="hero-toolbar-btn"
                    disabled={isBusy}
                    onClick={() => setPrefOpen(true)}
                  >
                    <i className="ri-equalizer-line" aria-hidden />
                    <span>
                      {minAge}–{maxAge} · {maxDistance} km
                    </span>
                  </button>

                  <button
                    type="button"
                    className="hero-toolbar-btn hero-toolbar-btn--start"
                    onClick={startVideo}
                    disabled={isBusy || !mediaReady}
                  >
                    <i className="ri-vidicon-fill" aria-hidden />
                    <span>{isBusy ? "Searching…" : "Start"}</span>
                  </button>
                </>
              )}
            </div>
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
