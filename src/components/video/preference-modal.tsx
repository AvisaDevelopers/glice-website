"use client";

import type { CSSProperties } from "react";
import {
  clampDistance,
  distanceStepForRange,
} from "@/features/video/lib/pref-bounds";

type PreferenceModalProps = {
  open: boolean;
  maxDistance: number;
  distanceMin: number;
  distanceMax: number;
  onClose: () => void;
  onDone: (values: { maxDistance: number }) => void;
  onMaxDistanceChange: (value: number) => void;
};

function distanceLabel(km: number, distanceMax: number) {
  if (km >= distanceMax) return `${distanceMax} km`;
  return `${km} km`;
}

function distanceMidLabel(distanceMin: number, distanceMax: number) {
  const step = distanceStepForRange(distanceMin, distanceMax);
  const mid = Math.round((distanceMin + distanceMax) / 2 / step) * step;
  return `${mid} km`;
}

export function PreferenceModal({
  open,
  maxDistance,
  distanceMin,
  distanceMax,
  onClose,
  onDone,
  onMaxDistanceChange,
}: PreferenceModalProps) {
  const safeDistanceMin = Math.max(1, distanceMin);
  const safeDistanceMax = Math.max(safeDistanceMin, distanceMax);
  const distanceStep = distanceStepForRange(safeDistanceMin, safeDistanceMax);
  const safeDistance = clampDistance(
    maxDistance,
    safeDistanceMin,
    safeDistanceMax,
  );
  const distanceFill =
    ((safeDistance - safeDistanceMin) /
      (safeDistanceMax - safeDistanceMin)) *
    100;

  const handleDone = () => {
    const distance = clampDistance(
      maxDistance,
      safeDistanceMin,
      safeDistanceMax,
    );
    if (distance !== maxDistance) onMaxDistanceChange(distance);
    onDone({ maxDistance: distance });
  };

  return (
    <div
      className={`modal-backdrop${open ? " is-open" : ""}`}
      aria-hidden={!open}
      role="dialog"
      aria-labelledby="preferenceModalTitle"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="pref-modal">
        <button
          type="button"
          className="auth-modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          <i className="ri-close-line" />
        </button>

        <div className="pref-modal-header">
          <div className="pref-modal-icon" aria-hidden>
            <i className="ri-equalizer-3-line" />
          </div>
          <div>
            <h2 id="preferenceModalTitle">Preferences</h2>
            <p className="auth-modal-sub pref-modal-sub">
              Set who you want to match with.
            </p>
          </div>
        </div>

        <div className="pref-modal-summary" aria-live="polite">
          <span className="pref-modal-summary-chip">
            <i className="ri-map-pin-line" aria-hidden />
            Within {distanceLabel(safeDistance, safeDistanceMax)}
          </span>
        </div>

        <section
          className="pref-modal-section"
          aria-labelledby="prefDistanceHeading"
        >
          <div className="pref-modal-section-head">
            <h3 id="prefDistanceHeading" className="pref-modal-section-title">
              <i className="ri-radar-line" aria-hidden />
              Max distance
            </h3>
            <span className="pref-modal-section-meta pref-modal-section-meta--accent">
              {distanceLabel(safeDistance, safeDistanceMax)}
            </span>
          </div>

          <div className="pref-distance-slider">
            <div
              className="pref-distance-track"
              aria-hidden
              style={
                { "--pref-distance-fill": `${distanceFill}%` } as CSSProperties
              }
            >
              <span className="pref-distance-track-rail" />
              <span className="pref-distance-track-fill" />
            </div>
            <input
              type="range"
              className="pref-distance-range"
              id="prefMaxDistance"
              min={safeDistanceMin}
              max={safeDistanceMax}
              step={distanceStep}
              value={safeDistance}
              onChange={(event) =>
                onMaxDistanceChange(
                  clampDistance(
                    Number(event.target.value),
                    safeDistanceMin,
                    safeDistanceMax,
                  ),
                )
              }
            />
          </div>

          <div className="pref-distance-scale" aria-hidden>
            <span>{safeDistanceMin} km</span>
            <span>{distanceMidLabel(safeDistanceMin, safeDistanceMax)}</span>
            <span>{safeDistanceMax} km</span>
          </div>
        </section>

        <button type="button" className="pref-modal-done" onClick={handleDone}>
          <i className="ri-check-line" aria-hidden />
          Done
        </button>
      </div>
    </div>
  );
}
