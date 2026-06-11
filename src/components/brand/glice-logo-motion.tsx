"use client";

import { motion, useReducedMotion } from "framer-motion";

type GliceLogoMotionProps = {
  size?: number;
};

export function GliceLogoMotion({ size = 80 }: GliceLogoMotionProps) {
  const reduceMotion = useReducedMotion();
  const iconSize = Math.round(size * 0.72);

  return (
    <div
      className="glice-logo-motion"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg
        className="glice-logo-motion-svg"
        viewBox="0 0 100 100"
        width={size}
        height={size}
      >
        <defs>
          <radialGradient id="glice-loader-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#32e6a1" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#02ffa2" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#02ffa2" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="glice-loader-sweep" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="45%" stopColor="#b8ffe4" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <mask id="glice-loader-icon-mask">
            <image
              href="/icons/transparent_icon.png"
              x={50 - iconSize / 2}
              y={50 - iconSize / 2}
              width={iconSize}
              height={iconSize}
              preserveAspectRatio="xMidYMid meet"
            />
          </mask>
          <filter id="glice-loader-soft-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle
          className={reduceMotion ? undefined : "glice-logo-glow-pulse"}
          cx="50"
          cy="50"
          r="38"
          fill="url(#glice-loader-glow)"
        />

        <circle
          className={reduceMotion ? undefined : "glice-logo-orbit"}
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke="#32e6a1"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeDasharray="18 14"
          opacity="0.55"
        />

        <circle
          className={reduceMotion ? undefined : "glice-logo-orbit-reverse"}
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="#02ffa2"
          strokeWidth="0.75"
          strokeLinecap="round"
          strokeDasharray="6 18"
          opacity="0.35"
        />

        <image
          href="/icons/transparent_icon.png"
          x={50 - iconSize / 2}
          y={50 - iconSize / 2}
          width={iconSize}
          height={iconSize}
          preserveAspectRatio="xMidYMid meet"
          filter="url(#glice-loader-soft-glow)"
          className={reduceMotion ? undefined : "glice-logo-icon-breathe"}
        />

        {!reduceMotion && (
          <rect
            className="glice-logo-shine-sweep"
            x="8"
            y="8"
            width="84"
            height="84"
            fill="url(#glice-loader-sweep)"
            mask="url(#glice-loader-icon-mask)"
            opacity="0.65"
          />
        )}
      </svg>

      {!reduceMotion && (
        <motion.span
          className="glice-logo-motion-ring"
          animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.7, 0.35] }}
          transition={{
            duration: 1.6,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      )}
    </div>
  );
}
