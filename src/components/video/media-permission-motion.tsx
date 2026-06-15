"use client";

import { useId } from "react";

export function MediaPermissionMotion() {
  const uid = useId().replace(/:/g, "");
  const glowId = `media-gate-glow-${uid}`;
  const lensId = `media-gate-lens-${uid}`;
  const shineId = `media-gate-shine-${uid}`;

  return (
    <div className="media-permission-motion" aria-hidden>
      <svg className="media-permission-motion-svg" viewBox="0 0 420 420">
        <defs>
          <radialGradient id={glowId} cx="50%" cy="48%" r="52%">
            <stop offset="0%" stopColor="#32e6a1" stopOpacity="0.38" />
            <stop offset="55%" stopColor="#02ffa2" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#02ffa2" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={lensId} cx="42%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#7fffd4" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#32e6a1" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0.85" />
          </radialGradient>
          <linearGradient id={shineId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <clipPath id={`${uid}-frame-clip`}>
            <rect x="118" y="118" width="184" height="132" rx="18" />
          </clipPath>
        </defs>

        <circle
          cx="210"
          cy="200"
          r="150"
          fill={`url(#${glowId})`}
          className="media-permission-motion-glow"
        />

        <circle
          cx="210"
          cy="200"
          r="68"
          fill="none"
          stroke="#32e6a1"
          strokeWidth="1"
          opacity="0.22"
          className="media-permission-motion-ring media-permission-motion-ring--1"
        />
        <circle
          cx="210"
          cy="200"
          r="104"
          fill="none"
          stroke="#32e6a1"
          strokeWidth="1"
          opacity="0.16"
          className="media-permission-motion-ring media-permission-motion-ring--2"
        />
        <circle
          cx="210"
          cy="200"
          r="142"
          fill="none"
          stroke="#02ffa2"
          strokeWidth="1"
          opacity="0.1"
          className="media-permission-motion-ring media-permission-motion-ring--3"
        />

        <g className="media-permission-motion-orbit" transform="translate(210 200)">
          <circle
            cx="0"
            cy="-118"
            r="26"
            fill="rgba(10,10,10,0.72)"
            stroke="rgba(50,230,161,0.35)"
            strokeWidth="1.5"
          />
          <g transform="translate(0 -118)">
            <rect
              x="-5"
              y="-14"
              width="10"
              height="18"
              rx="5"
              fill="none"
              stroke="#32e6a1"
              strokeWidth="1.75"
            />
            <path
              d="M -11 2 Q -11 10 0 10 Q 11 10 11 2"
              fill="none"
              stroke="#32e6a1"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
            <line
              x1="0"
              y1="10"
              x2="0"
              y2="15"
              stroke="#32e6a1"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </g>
        </g>

        <g className="media-permission-motion-frame">
          <rect
            x="118"
            y="118"
            width="184"
            height="132"
            rx="18"
            fill="rgba(10,10,10,0.55)"
            stroke="rgba(50,230,161,0.3)"
            strokeWidth="1.5"
          />
          <rect
            x="118"
            y="118"
            width="184"
            height="132"
            rx="18"
            fill={`url(#${shineId})`}
            className="media-permission-motion-shine"
            clipPath={`url(#${uid}-frame-clip)`}
          />

          <g className="media-permission-motion-lens" transform="translate(210 174)">
            <circle r="34" fill={`url(#${lensId})`} />
            <circle
              r="34"
              fill="none"
              stroke="rgba(127,255,212,0.35)"
              strokeWidth="1"
            />
            <circle
              r="22"
              fill="none"
              stroke="rgba(50,230,161,0.25)"
              strokeWidth="1"
              strokeDasharray="4 6"
              className="media-permission-motion-aperture"
            />
            <circle r="8" fill="#32e6a1" opacity="0.85" />
            <circle r="3" fill="#e8fff5" opacity="0.9" />
          </g>

          <line
            x1="118"
            y1="174"
            x2="302"
            y2="174"
            stroke="rgba(50,230,161,0.12)"
            strokeWidth="1"
            className="media-permission-motion-scan"
          />
        </g>

        <g className="media-permission-motion-waves" transform="translate(210 292)">
          {[-48, -24, 0, 24, 48].map((x, i) => (
            <rect
              key={x}
              x={x - 4}
              y={-14}
              width="8"
              height="28"
              rx="4"
              fill="#32e6a1"
              opacity="0.55"
              className={`media-permission-motion-wave media-permission-motion-wave--${i + 1}`}
            />
          ))}
        </g>

        <g opacity="0.55">
          <circle cx="92" cy="128" r="3" fill="#7fffd4" className="media-permission-motion-particle media-permission-motion-particle--1" />
          <circle cx="328" cy="156" r="2.5" fill="#32e6a1" className="media-permission-motion-particle media-permission-motion-particle--2" />
          <circle cx="318" cy="268" r="2" fill="#7fffd4" className="media-permission-motion-particle media-permission-motion-particle--3" />
          <circle cx="98" cy="252" r="2.5" fill="#32e6a1" className="media-permission-motion-particle media-permission-motion-particle--4" />
        </g>

        <path
          d="M 148 248 Q 210 218 272 248"
          fill="none"
          stroke="rgba(50,230,161,0.18)"
          strokeWidth="1"
          strokeDasharray="5 7"
          className="media-permission-motion-arc"
        />
      </svg>

      <p className="media-permission-motion-label">Enable your devices</p>
      <p className="media-permission-motion-sublabel">Camera &amp; mic for live video</p>
    </div>
  );
}
