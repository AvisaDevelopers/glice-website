"use client";

import { motion } from "framer-motion";
import { Heart, ThumbsDown, X } from "lucide-react";

type CallFeedbackOverlayProps = {
  partnerName: string;
  onLike: () => void;
  onDislike: () => void;
  onSkip: () => void;
};

export function CallFeedbackOverlay({
  partnerName,
  onLike,
  onDislike,
  onSkip,
}: CallFeedbackOverlayProps) {
  return (
    <motion.div
      className="call-feedback-overlay"
      initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="call-feedback-card">
        <p className="call-feedback-eyebrow">Quick feedback</p>
        <h3 className="call-feedback-title">How was {partnerName}?</h3>
        <p className="call-feedback-desc">
          Your response helps us match you with better connections.
        </p>

        <div className="call-feedback-actions">
          <button
            type="button"
            className="call-feedback-btn call-feedback-btn--like"
            onClick={onLike}
            aria-label="Like"
          >
            <Heart className="h-6 w-6" fill="currentColor" />
            <span>Like</span>
          </button>
          <button
            type="button"
            className="call-feedback-btn call-feedback-btn--dislike"
            onClick={onDislike}
            aria-label="Dislike"
          >
            <ThumbsDown className="h-6 w-6" />
            <span>Pass</span>
          </button>
        </div>

        <button
          type="button"
          className="call-feedback-skip"
          onClick={onSkip}
        >
          <X className="h-4 w-4" aria-hidden />
          Skip feedback
        </button>
      </div>
    </motion.div>
  );
}
