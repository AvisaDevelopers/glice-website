"use client";

import { ProfilePhoto } from "@/components/media/profile-photo";
import { motion } from "framer-motion";
import type { MediaVerificationStatus } from "@/lib/verification-status";

type MatchConnectingOverlayProps = {
  partnerName: string;
  profileUrl?: string;
  profileVerificationStatus?: MediaVerificationStatus;
};

export function MatchConnectingOverlay({
  partnerName,
  profileUrl,
  profileVerificationStatus = "approved",
}: MatchConnectingOverlayProps) {
  return (
    <motion.div
      className="match-connecting-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="match-connecting-backdrop" aria-hidden />

      <motion.div
        className="match-connecting-card"
        initial={{ scale: 0.88, y: 24 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <div className="match-connecting-avatar-wrap">
          <span className="match-connecting-ring match-connecting-ring--1" aria-hidden />
          <span className="match-connecting-ring match-connecting-ring--2" aria-hidden />
          <span className="match-connecting-ring match-connecting-ring--3" aria-hidden />
          <div className="match-connecting-avatar">
            <ProfilePhoto
              name={partnerName}
              url={profileUrl}
              profileStatus={profileVerificationStatus}
              verificationStatus={profileVerificationStatus}
              className="match-connecting-avatar-photo"
              imgClassName="match-connecting-avatar-img"
              compact
            />
          </div>
        </div>

        <p className="match-connecting-eyebrow">Match found</p>
        <h3 className="match-connecting-title">{partnerName}</h3>
        <p className="match-connecting-sub">Connecting your video…</p>

        <div className="match-connecting-dots" aria-hidden>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="match-connecting-dot"
              animate={{ opacity: [0.25, 1, 0.25], y: [0, -4, 0] }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
