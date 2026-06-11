"use client";

import { useId } from "react";

type NearbySearchMotionProps = {
  radiusKm?: number;
};

export function NearbySearchMotion({ radiusKm = 50 }: NearbySearchMotionProps) {
  const uid = useId().replace(/:/g, "");
  const glowId = `nearby-glow-${uid}`;
  const beamId = `nearby-beam-${uid}`;

  return (
    <div className="nearby-search-motion" role="status" aria-live="polite">
      <svg className="nearby-search-svg" viewBox="0 0 420 420" aria-hidden>
        <defs>
          <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#32e6a1" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#02ffa2" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#02ffa2" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={beamId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#32e6a1" stopOpacity="0" />
            <stop offset="50%" stopColor="#7fffd4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#32e6a1" stopOpacity="0" />
          </linearGradient>
        </defs>

        <circle
          cx="210"
          cy="210"
          r="140"
          fill={`url(#${glowId})`}
          className="nearby-search-glow"
        />

        <circle
          cx="210"
          cy="210"
          r="72"
          fill="none"
          stroke="#32e6a1"
          strokeWidth="1"
          opacity="0.2"
          className="nearby-search-ring nearby-search-ring--1"
        />
        <circle
          cx="210"
          cy="210"
          r="108"
          fill="none"
          stroke="#32e6a1"
          strokeWidth="1"
          opacity="0.15"
          className="nearby-search-ring nearby-search-ring--2"
        />
        <circle
          cx="210"
          cy="210"
          r="148"
          fill="none"
          stroke="#02ffa2"
          strokeWidth="1"
          opacity="0.1"
          className="nearby-search-ring nearby-search-ring--3"
        />

        <g className="nearby-search-radar" transform="translate(210 210)">
          <path
            d="M 0 0 L 0 -148 A 148 148 0 0 1 104 -104 Z"
            fill={`url(#${beamId})`}
            opacity="0.35"
          />
        </g>

        <circle
          cx="268"
          cy="158"
          r="5"
          fill="#32e6a1"
          className="nearby-search-blip nearby-search-blip--1"
        />
        <circle
          cx="142"
          cy="248"
          r="4"
          fill="#7fffd4"
          className="nearby-search-blip nearby-search-blip--2"
        />
        <circle
          cx="298"
          cy="268"
          r="4"
          fill="#32e6a1"
          className="nearby-search-blip nearby-search-blip--3"
        />

        <g className="nearby-search-pin">
          <circle cx="210" cy="210" r="22" fill="rgba(50,230,161,0.15)" />
          <circle cx="210" cy="210" r="10" fill="#32e6a1" />
          <path
            d="M 210 222 L 202 242 L 210 236 L 218 242 Z"
            fill="#32e6a1"
          />
        </g>

        <image
          href="/icons/transparent_icon.png"
          x="186"
          y="56"
          width="48"
          height="48"
          className="nearby-search-logo"
        />
      </svg>

      <p className="nearby-search-label">Finding people near you…</p>
      <p className="nearby-search-sublabel">
        Scanning within {radiusKm} km of your location
      </p>
    </div>
  );
}
