"use client";

import { MutualMatchCelebration } from "@/components/video/mutual-match-celebration";
import { ProfilePhoto } from "@/components/media/profile-photo";
import type { FeedbackPhase } from "@/features/video/types";
import type { MediaVerificationStatus } from "@/lib/verification-status";
import { motion } from "framer-motion";
import { Flag } from "lucide-react";

type VideoFeedbackPanelProps = {
  partnerName: string;
  profileUrl?: string;
  profileVerificationStatus?: MediaVerificationStatus;
  userName?: string;
  userProfileUrl?: string;
  userVerificationStatus?: MediaVerificationStatus;
  phase: FeedbackPhase;
  mutualMatch: boolean;
  endedByMe?: boolean;
  onLike: () => void;
  onPass: () => void;
  onSkip: () => void;
  onReport?: () => void;
};

export function VideoFeedbackPanel({
  partnerName,
  profileUrl,
  profileVerificationStatus = "approved",
  userName,
  userProfileUrl,
  userVerificationStatus = "approved",
  phase,
  mutualMatch,
  endedByMe = true,
  onLike,
  onPass,
  onSkip,
  onReport,
}: VideoFeedbackPanelProps) {
  if (mutualMatch || phase === "matched") {
    return (
      <MutualMatchCelebration
        partnerName={partnerName}
        profileUrl={profileUrl}
        profileVerificationStatus={profileVerificationStatus}
        userName={userName}
        userProfileUrl={userProfileUrl}
        userVerificationStatus={userVerificationStatus}
      />
    );
  }

  return (
    <motion.div
      className="hero-panel-overlay hero-panel-overlay--feedback"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="hero-feedback-card">
        <div className="hero-feedback-profile">
          <motion.div
            className="hero-feedback-avatar"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <ProfilePhoto
              name={partnerName}
              url={profileUrl}
              verificationStatus={profileVerificationStatus}
              className="hero-feedback-avatar-inner"
              imgClassName="hero-feedback-avatar-img"
            />
          </motion.div>
          <p className="hero-feedback-name">{partnerName}</p>
        </div>

        <p className="hero-feedback-eyebrow">Did you hit it off?</p>
        <h3 className="hero-feedback-title">Like or pass to continue</h3>
        <p className="hero-feedback-desc">
          {endedByMe
            ? "You ended the call. Like them if you want a chance to match in Messages."
            : `${partnerName} left the round. Like them if you want a chance to match.`}
        </p>
        <div className="hero-feedback-actions">
          <motion.button
            type="button"
            className="hero-feedback-btn hero-feedback-btn--pass"
            onClick={onPass}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <i className="ri-close-line" aria-hidden />
            Pass
          </motion.button>
          <motion.button
            type="button"
            className="hero-feedback-btn hero-feedback-btn--like"
            onClick={onLike}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
          >
            <i className="ri-heart-fill" aria-hidden />
            Like
          </motion.button>
        </div>

        {onReport && (
          <div className="hero-feedback-safety">
            <p className="hero-feedback-safety-label">Something felt off?</p>
            <button
              type="button"
              className="hero-feedback-report"
              onClick={onReport}
            >
              <Flag className="h-4 w-4" aria-hidden />
              Report {partnerName}
            </button>
          </div>
        )}

        <button type="button" className="hero-feedback-skip" onClick={onSkip}>
          Skip feedback
        </button>
      </div>
    </motion.div>
  );
}
