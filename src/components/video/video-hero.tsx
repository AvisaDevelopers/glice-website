"use client";

import { ProfilePhoto } from "@/components/media/profile-photo";
import { CallChatPanel } from "@/components/video/call-chat-panel";
import { MatchConnectingOverlay } from "@/components/video/match-connecting-overlay";
import { MediaPermissionGate } from "@/components/video/media-permission-gate";
import { NearbySearchMotion } from "@/components/video/match-search-motion";
import { VideoFeedbackPanel } from "@/components/video/video-feedback-panel";
import { useUiSession } from "@/components/site/ui-session-provider";
import { ReportUserDialog } from "@/features/report/components/report-user-dialog";
import { useMediaStream } from "@/features/video/hooks/use-media-stream";
import { useVideoCall } from "@/features/video/hooks/use-video-call";
import { sparkVideoService } from "@/features/video/services/spark-video-service";
import { profileStatusFromUser } from "@/lib/verification-status";
import {
  lobbyGenderOnlineCount,
  onlineStatusLabel,
  sparkDatingJoinedMessage,
} from "@/features/video/lib/spark-lobby-payload";
import { useMounted } from "@/hooks/use-mounted";
import { AnimatePresence, motion } from "framer-motion";
import {
  clampAgeInRange,
  normalizeAgeRangeInBounds,
} from "@/features/video/lib/pref-bounds";
import {
  countryFilterLabel,
  GLOBAL_COUNTRY_VALUE,
  normalizeCountryFilter,
  searchScopeMessage,
} from "@/features/video/lib/country-options";
import { userCountryLabel } from "@/features/video/lib/user-country";
import {
  fetchVideoMatchRestrictions,
  videoGenderFilterOptions,
  VIDEO_MATCH_DEFAULT_RESTRICTIONS,
  type VideoMatchRestrictions,
} from "@/features/video/api/match-restrictions-api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useArFilters } from "@/features/ar-filters/hooks/use-ar-filters";
import { ArFilterRail } from "./ar-filter-rail";
import { AuthModal } from "./auth-modal";
import { PreferenceModal } from "./preference-modal";

import { genderIconClass } from "@/lib/gender-options";
import type { VideoGenderFilterOption } from "@/features/video/api/match-restrictions-api";

function GenderFilterIcon({ option }: { option: VideoGenderFilterOption }) {
  if (option.url) {
    return (
      <img
        src={option.url}
        alt=""
        className="hero-toolbar-gender-icon"
        width={16}
        height={16}
      />
    );
  }

  return (
    <i
      className={`${genderIconClass(option.title)} hero-toolbar-gender-fallback`}
      aria-hidden
    />
  );
}

function formatTimer(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function partnerInitial(name: string) {
  return (name.trim()[0] ?? "?").toUpperCase();
}

function remoteBadge(
  stage: string,
  partnerName: string,
  searching: boolean,
) {
  if (searching) return "Searching…";
  if (stage === "connecting") return "Connecting…";
  if (stage === "connected" || stage === "feedback") return partnerName;
  return "Waiting";
}

function bindRemoteStream(
  video: HTMLVideoElement | null,
  stream: MediaStream | null,
) {
  if (!video) return;

  if (stream && stream !== video.srcObject) {
    video.srcObject = stream;
    void video.play().catch(() => {
      /* autoplay */
    });
    return;
  }

  if (!stream && video.srcObject) {
    video.srcObject = null;
  }
}

export function VideoHero() {
  const { isLoggedIn, openAuth, user } = useUiSession();
  const {
    attachLocalVideo,
    status: mediaStatus,
    cameraEnabled,
    requestAccess,
    setMuted,
    setCameraEnabled,
    syncVideo,
  } = useMediaStream();

  const {
    stage: callStage,
    partner,
    roomId,
    messages,
    remoteStream,
    remoteVideoOn,
    isLocalPrimary,
    searchSecondsLeft,
    callSecondsLeft,
    error: callError,
    endedByMe,
    feedbackPhase,
    mutualMatch,
    startSearch,
    cancelSearch,
    endCall,
    nextPerson,
    submitFeedback,
    sendMessage,
    notifyVideoState,
    onlineCount,
    lobbyGenderCounts,
  } = useVideoCall();

  const remoteRef = useRef<HTMLVideoElement>(null);
  const [gender, setGender] = useState("Everyone");
  const [genderMenuOpen, setGenderMenuOpen] = useState(false);
  const [prefOpen, setPrefOpen] = useState(false);
  const [minAge, setMinAge] = useState(VIDEO_MATCH_DEFAULT_RESTRICTIONS.ageMin);
  const [maxAge, setMaxAge] = useState(VIDEO_MATCH_DEFAULT_RESTRICTIONS.ageMax);
  const [countries, setCountries] = useState<string[]>([GLOBAL_COUNTRY_VALUE]);
  const [restrictions, setRestrictions] = useState<VideoMatchRestrictions>(() => ({
    ...VIDEO_MATCH_DEFAULT_RESTRICTIONS,
    genders: [],
  }));
  const [reportOpen, setReportOpen] = useState(false);

  const ageMin = restrictions.ageMin;
  const ageMax = restrictions.ageMax;
  const countryScopeLabel = countryFilterLabel(countries);
  const searchScope = searchScopeMessage(countries);
  const ownCountryLabel = userCountryLabel(user);
  const genderOptions = useMemo(
    () => videoGenderFilterOptions(restrictions),
    [restrictions],
  );
  const selectedGender =
    genderOptions.find((option) => option.title === gender) ??
    genderOptions[0];

  const setCountriesBounded = useCallback((value: string[]) => {
    setCountries(normalizeCountryFilter(value));
  }, []);

  const setMinAgeBounded = useCallback(
    (value: number) => {
      setMinAge(clampAgeInRange(value, ageMin, ageMax));
    },
    [ageMin, ageMax],
  );

  const setMaxAgeBounded = useCallback(
    (value: number) => {
      setMaxAge(clampAgeInRange(value, ageMin, ageMax));
    },
    [ageMin, ageMax],
  );

  useEffect(() => {
    let cancelled = false;

    void fetchVideoMatchRestrictions().then((data) => {
      if (cancelled) return;
      setRestrictions(data);
      setMinAge((prev) => clampAgeInRange(prev, data.ageMin, data.ageMax));
      setMaxAge((prev) => clampAgeInRange(prev, data.ageMin, data.ageMax));
    });

    return () => {
      cancelled = true;
    };
  }, [isLoggedIn]);

  useEffect(() => {
    if (!genderOptions.some((option) => option.title === gender)) {
      setGender("Everyone");
    }
  }, [gender, genderOptions]);

  useEffect(() => {
    if (callStage !== "feedback") {
      setReportOpen(false);
    }
  }, [callStage]);

  useEffect(() => {
    if (!isLoggedIn || callStage !== "idle") return;
    sparkVideoService.refreshJoinedCount();
  }, [isLoggedIn, callStage, gender]);

  useEffect(() => {
    sparkVideoService.setOnCountriesReset(setCountriesBounded);
    return () => {
      sparkVideoService.setOnCountriesReset(null);
    };
  }, [setCountriesBounded]);

  useEffect(() => {
    if (!prefOpen) return;
    const ages = normalizeAgeRangeInBounds(minAge, maxAge, ageMin, ageMax);
    if (ages.minAge !== minAge) setMinAge(ages.minAge);
    if (ages.maxAge !== maxAge) setMaxAge(ages.maxAge);
  }, [prefOpen, minAge, maxAge, ageMin, ageMax]);
  const [isMuted, setIsMuted] = useState(false);
  const genderMenuRef = useRef<HTMLDivElement>(null);
  const mounted = useMounted();
  const mediaReady = mounted && mediaStatus === "ready";
  const { activeFilter, switchFilter } = useArFilters({
    enabled: isLoggedIn && mediaReady,
  });
  const showArFilterRail =
    isLoggedIn &&
    mediaReady &&
    callStage !== "feedback" &&
    cameraEnabled;

  const attachRemoteVideo = useCallback(
    (node: HTMLVideoElement | null) => {
      remoteRef.current = node;
      bindRemoteStream(node, remoteStream);
    },
    [remoteStream],
  );

  const showVideoStage = mounted && mediaStatus === "ready";
  const isBusy = callStage === "searching";
  const pendingStartRef = useRef(false);
  const isConnecting = callStage === "connecting";
  const inCall = callStage === "connected";
  const isInVideoSession =
    callStage === "searching" ||
    callStage === "connecting" ||
    callStage === "connected" ||
    callStage === "feedback";
  const showChat =
    callStage === "connecting" || callStage === "connected";
  const partnerName = partner?.name ?? "Match";
  const joinedLobbyMessage =
    isLoggedIn && onlineCount > 0
      ? sparkDatingJoinedMessage(onlineCount)
      : "";
  const genderOnlineCount = lobbyGenderOnlineCount(lobbyGenderCounts, gender);
  const genderOnlineLabel =
    isLoggedIn && genderOnlineCount > 0
      ? onlineStatusLabel(genderOnlineCount)
      : "";
  const userMediaStatus = profileStatusFromUser(user);
  const partnerMediaStatus =
    partner?.otherUserProfileStatus ?? partner?.profileStatus ?? "approved";
  const swapped = isLocalPrimary;
  const showRemoteVideo =
    (inCall || isConnecting) && Boolean(remoteStream) && remoteVideoOn;
  const showRemotePlaceholder = (inCall || isConnecting) && !showRemoteVideo;
  const showConnectingOverlay = isConnecting && !remoteStream;
  const showRemoteCell = inCall || isConnecting;
  const showPartnerInBadge = Boolean(
    partner &&
      (isConnecting || inCall || callStage === "feedback"),
  );

  const [permissionGateOpen, setPermissionGateOpen] = useState(false);
  const [permissionGateExiting, setPermissionGateExiting] = useState(false);

  const buildFilter = useCallback(
    () => ({
      gender,
      minAge,
      maxAge,
      countries,
    }),
    [gender, minAge, maxAge, countries],
  );

  useEffect(() => {
    if (!pendingStartRef.current || mediaStatus !== "ready") return;

    pendingStartRef.current = false;
    syncVideo();
    startSearch(buildFilter());
  }, [mediaStatus, syncVideo, startSearch, buildFilter]);

  useEffect(() => {
    if (!permissionGateOpen || mediaStatus !== "ready") return;

    setPermissionGateExiting(true);
    const timer = window.setTimeout(() => {
      setPermissionGateOpen(false);
      setPermissionGateExiting(false);
    }, 240);
    return () => window.clearTimeout(timer);
  }, [permissionGateOpen, mediaStatus]);

  useEffect(() => {
    if (mediaStatus !== "ready" || permissionGateOpen) return;
    syncVideo();
    const raf = requestAnimationFrame(() => syncVideo());
    const retry = window.setTimeout(() => syncVideo(), 120);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(retry);
    };
  }, [mediaStatus, permissionGateOpen, syncVideo]);

  useEffect(() => {
    if (!isLoggedIn) {
      queueMicrotask(() => {
        setGenderMenuOpen(false);
        if (isBusy) cancelSearch();
      });
    }
  }, [isLoggedIn, isBusy, cancelSearch]);

  useEffect(() => {
    if (!showVideoStage) return;
    syncVideo();
    const raf = requestAnimationFrame(() => syncVideo());
    const retry = window.setTimeout(() => syncVideo(), 120);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(retry);
    };
  }, [
    callStage,
    showVideoStage,
    syncVideo,
    cameraEnabled,
    swapped,
    showRemoteCell,
  ]);

  useEffect(() => {
    bindRemoteStream(remoteRef.current, remoteStream);
  }, [remoteStream, callStage, swapped]);

  useEffect(() => {
    document.body.classList.toggle("video-session-active", isInVideoSession);
    return () => {
      document.body.classList.remove("video-session-active");
    };
  }, [isInVideoSession]);

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

  const startVideo = async () => {
    if (!isLoggedIn) {
      openAuth("login");
      return;
    }
    if (isBusy) return;

    if (isConnecting) {
      cancelSearch();
    }

    if (!mediaReady) {
      pendingStartRef.current = true;
      setPermissionGateOpen(true);
      setPermissionGateExiting(false);
      return;
    }

    syncVideo();
    startSearch(buildFilter());
  };

  const handlePermissionRequest = async () => {
    return requestAccess();
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    setMuted(next);
  };

  const toggleCamera = () => {
    const next = !cameraEnabled;
    setCameraEnabled(next);
    if (inCall) notifyVideoState(next);
  };

  return (
    <>
      <section
        className={`video-hero${isInVideoSession ? " video-hero--session" : ""}`}
        id="videoHero"
      >
        <div className="video-hero-inner">
          <div className="hero-dual-shell">
            {callError &&
              (callStage === "idle" || callStage === "connecting") && (
              <p className="hero-call-error" role="alert">
                {callError}
              </p>
            )}

            <div className="hero-dual-wrap">
              {permissionGateOpen && (
                <MediaPermissionGate
                  status={mediaStatus}
                  exiting={permissionGateExiting}
                  onRequest={handlePermissionRequest}
                />
              )}
              <div className="hero-dual">
                <div className="hero-panel hero-panel--remote">
                  <div
                    className={`hero-panel-badge hero-panel-badge--remote${isBusy || isConnecting || inCall || callStage === "feedback" ? " hero-panel-badge--active" : ""}${showPartnerInBadge ? " hero-panel-badge--with-avatar" : ""}`}
                  >
                    {showPartnerInBadge ? (
                      <span className="hero-panel-badge-avatar" aria-hidden>
                        <ProfilePhoto
                          name={partnerName}
                          url={partner?.profileUrl}
                          profileStatus={partnerMediaStatus}
                          className="hero-panel-badge-avatar-photo"
                          imgClassName="hero-panel-badge-avatar-img"
                          compact
                        />
                      </span>
                    ) : (
                      <span className="hero-panel-badge-dot" aria-hidden />
                    )}
                    <span className="hero-panel-badge-label">
                      {remoteBadge(
                        callStage,
                        partnerName,
                        callStage === "searching",
                      )}
                    </span>
                    {inCall && (
                      <span className="hero-panel-badge-meta">
                        {formatTimer(callSecondsLeft)}
                      </span>
                    )}
                    {isBusy && searchSecondsLeft > 0 && (
                      <span className="hero-panel-badge-meta">
                        {searchSecondsLeft}s
                      </span>
                    )}
                  </div>

                  {callStage === "idle" && (
                    <div className="hero-panel-idle hero-panel-idle--remote">
                      <div className="hero-panel-idle-icon" aria-hidden>
                        <i className="ri-user-3-line" />
                      </div>
                      <p>Your match appears here</p>
                      {joinedLobbyMessage ? (
                        <span className="hero-panel-idle-joined">
                          {joinedLobbyMessage}
                        </span>
                      ) : isLoggedIn ? (
                        <span className="hero-panel-idle-joined hero-panel-idle-joined--muted hero-panel-idle-shimmer">
                          <span className="chat-shimmer hero-panel-idle-shimmer-bar" aria-hidden />
                          <span className="sr-only">Checking who&apos;s online…</span>
                        </span>
                      ) : null}
                      <span>
                        Press Start to find people — {searchScope}
                      </span>
                      {genderOnlineLabel ? (
                        <span className="hero-panel-idle-online">
                          <i className="ri-user-heart-line" aria-hidden />
                          {genderOnlineLabel}
                          {gender !== "Everyone" ? ` · ${gender}` : ""}
                        </span>
                      ) : null}
                    </div>
                  )}

                  <AnimatePresence>
                    {showConnectingOverlay && (
                      <MatchConnectingOverlay
                        partnerName={partnerName}
                        profileUrl={partner?.profileUrl}
                        profileVerificationStatus={partnerMediaStatus}
                      />
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {callStage === "searching" && (
                      <motion.div
                        key="searching"
                        className="hero-panel-overlay hero-panel-overlay--search"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <NearbySearchMotion scopeLabel={countryScopeLabel} />
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

                  {inCall && swapped && !cameraEnabled && (
                    <div className="hero-panel-camera-off hero-panel-camera-off--inline">
                      <i className="ri-camera-off-line" aria-hidden />
                    </div>
                  )}

                  {showRemotePlaceholder && !swapped && (
                    <div className="hero-panel-media hero-panel-media--placeholder">
                      <div className="vc-remote-placeholder vc-remote-placeholder--live">
                        <div className="vc-remote-avatar">
                          <ProfilePhoto
                            name={partnerName}
                            url={partner?.profileUrl}
                            profileStatus={partnerMediaStatus}
                            className="vc-remote-avatar-photo"
                            imgClassName="vc-remote-avatar-img"
                            compact
                          />
                        </div>
                        <span className="vc-remote-name">{partnerName}</span>
                      </div>
                    </div>
                  )}

                  {inCall && <div className="vc-connected-badge">Live</div>}

                  <AnimatePresence>
                    {callStage === "feedback" && (
                      <VideoFeedbackPanel
                        partnerName={partnerName}
                        profileUrl={partner?.profileUrl}
                        profileVerificationStatus={partnerMediaStatus}
                        userName={user?.name ?? user?.username ?? "You"}
                        userProfileUrl={user?.profileUrl}
                        userVerificationStatus={userMediaStatus}
                        phase={feedbackPhase}
                        mutualMatch={mutualMatch}
                        endedByMe={endedByMe}
                        onLike={() => submitFeedback(true)}
                        onPass={() => submitFeedback(false)}
                        onSkip={() => submitFeedback(null)}
                        onReport={
                          partner && roomId
                            ? () => setReportOpen(true)
                            : undefined
                        }
                      />
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

                  {showRemotePlaceholder && swapped && (
                    <div className="hero-panel-media hero-panel-media--placeholder">
                      <div className="vc-remote-placeholder vc-remote-placeholder--live">
                        <div className="vc-remote-avatar">
                          <ProfilePhoto
                            name={partnerName}
                            url={partner?.profileUrl}
                            profileStatus={partnerMediaStatus}
                            className="vc-remote-avatar-photo"
                            imgClassName="vc-remote-avatar-img"
                            compact
                          />
                        </div>
                        <span className="vc-remote-name">{partnerName}</span>
                      </div>
                    </div>
                  )}

                  {!cameraEnabled && !swapped && (
                    <div className="hero-panel-camera-off">
                      <i className="ri-camera-off-line" aria-hidden />
                      <p>Camera is off</p>
                      <span>Others cannot see your video</span>
                    </div>
                  )}

                </div>
              </div>

              {showVideoStage && (
                <div
                  className={`hero-video-stage${swapped ? " hero-video-stage--swapped" : ""}${!showRemoteCell ? " hero-video-stage--local-only" : ""}`}
                >
                  {showRemoteCell && (
                    <div className="hero-video-cell hero-video-cell--remote">
                      <video
                        ref={attachRemoteVideo}
                        className={`hero-panel-video hero-panel-video--remote${!showRemoteVideo ? " hero-panel-video--hidden" : ""}`}
                        playsInline
                        autoPlay
                        aria-label={`${partnerName} video`}
                      />
                    </div>
                  )}
                  <div className="hero-video-cell hero-video-cell--local">
                    <video
                      ref={attachLocalVideo}
                      className={`hero-panel-video hero-panel-video--local${!cameraEnabled ? " hero-panel-video--hidden" : ""}`}
                      playsInline
                      muted
                      autoPlay
                      aria-label="Your camera"
                    />
                    <ArFilterRail
                      activeFilter={activeFilter}
                      visible={showArFilterRail}
                      onSelect={(id) => {
                        void switchFilter(id);
                      }}
                    />
                  </div>
                </div>
              )}

              <CallChatPanel
                partnerName={partnerName}
                active={showChat}
                messages={messages}
                layoutSide={swapped ? "left" : "right"}
                onSend={sendMessage}
              />
            </div>

            <div className="hero-toolbar" role="toolbar" aria-label="Video controls">
              {isConnecting ? (
                <p className="hero-toolbar-hint">Setting up your video call…</p>
              ) : inCall ? (
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
                    onClick={() => nextPerson()}
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
                  {mutualMatch || feedbackPhase === "matched"
                    ? "It's a match!"
                    : "Like, pass, or report if needed"}
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
                      <GenderFilterIcon option={selectedGender} />
                      <span>{selectedGender.title}</span>
                      <i className="ri-arrow-down-s-line" aria-hidden />
                    </button>
                    {genderMenuOpen && (
                      <div className="hero-toolbar-menu" role="listbox">
                        {genderOptions.map((option) => (
                          <button
                            key={option.title}
                            type="button"
                            role="option"
                            aria-selected={gender === option.title}
                            className={`hero-toolbar-menu-item${gender === option.title ? " is-active" : ""}`}
                            onClick={() => {
                              setGender(option.title);
                              setGenderMenuOpen(false);
                            }}
                          >
                            <GenderFilterIcon option={option} />
                            <span>{option.title}</span>
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
                    <i className="ri-earth-line" aria-hidden />
                    <span>{countryScopeLabel}</span>
                  </button>

                  <button
                    type="button"
                    className="hero-toolbar-btn hero-toolbar-btn--start"
                    onClick={startVideo}
                    disabled={isBusy}
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
        countries={countries}
        ownCountryLabel={ownCountryLabel}
        ageMin={ageMin}
        ageMax={ageMax}
        onClose={() => setPrefOpen(false)}
        onDone={() => setPrefOpen(false)}
        onMinAgeChange={setMinAgeBounded}
        onMaxAgeChange={setMaxAgeBounded}
        onCountriesChange={setCountriesBounded}
      />

      {partner && roomId && (
        <ReportUserDialog
          open={reportOpen}
          onClose={() => setReportOpen(false)}
          reporteeId={partner.id}
          reporteeName={partner.name}
          roomId={roomId}
          reporteeEmail={partner.email ?? ""}
        />
      )}

      <AuthModal />
    </>
  );
}
