"use client";

import type { CSSProperties } from "react";
import {
  clampAgeInRange,
  clampDistance,
  distanceDisplayLabel,
  distanceStepForRange,
  normalizeAgeRangeInBounds,
} from "@/features/video/lib/pref-bounds";

type PreferenceModalProps = {
  open: boolean;
  minAge: number;
  maxAge: number;
  maxDistance: number;
  ageMin: number;
  ageMax: number;
  distanceMin: number;
  distanceMax: number;
  onClose: () => void;
  onDone: (values: {
    minAge: number;
    maxAge: number;
    maxDistance: number;
  }) => void;
  onMinAgeChange: (value: number) => void;
  onMaxAgeChange: (value: number) => void;
  onMaxDistanceChange: (value: number) => void;
};

function distanceMidLabel(distanceMin: number, distanceMax: number) {
  const step = distanceStepForRange(distanceMin, distanceMax);
  const mid = Math.round((distanceMin + distanceMax) / 2 / step) * step;
  return `${mid} km`;
}

export function PreferenceModal({
  open,
  minAge,
  maxAge,
  maxDistance,
  ageMin,
  ageMax,
  distanceMin,
  distanceMax,
  onClose,
  onDone,
  onMinAgeChange,
  onMaxAgeChange,
  onMaxDistanceChange,
}: PreferenceModalProps) {
  const safeAgeMin = Math.max(1, ageMin);
  const safeAgeMax = Math.max(safeAgeMin, ageMax);
  const safeDistanceMin = Math.max(1, distanceMin);
  const safeDistanceMax = Math.max(safeDistanceMin, distanceMax);
  const distanceStep = distanceStepForRange(safeDistanceMin, safeDistanceMax);

  const safeMin = clampAgeInRange(minAge, safeAgeMin, safeAgeMax);
  const safeMax = clampAgeInRange(maxAge, safeAgeMin, safeAgeMax);
  const displayMin = Math.min(safeMin, safeMax);
  const displayMax = Math.max(safeMin, safeMax);

  const safeDistance = clampDistance(
    maxDistance,
    safeDistanceMin,
    safeDistanceMax,
  );
  const distanceFill =
    ((safeDistance - safeDistanceMin) /
      (safeDistanceMax - safeDistanceMin)) *
    100;

  const setMinAge = (value: number) => {
    const next = clampAgeInRange(value, safeAgeMin, safeAgeMax);
    onMinAgeChange(next);
    if (next > clampAgeInRange(maxAge, safeAgeMin, safeAgeMax)) {
      onMaxAgeChange(next);
    }
  };

  const setMaxAge = (value: number) => {
    const next = clampAgeInRange(value, safeAgeMin, safeAgeMax);
    onMaxAgeChange(next);
    if (next < clampAgeInRange(minAge, safeAgeMin, safeAgeMax)) {
      onMinAgeChange(next);
    }
  };

  const handleDone = () => {
    const ages = normalizeAgeRangeInBounds(
      minAge,
      maxAge,
      safeAgeMin,
      safeAgeMax,
    );
    const distance = clampDistance(
      maxDistance,
      safeDistanceMin,
      safeDistanceMax,
    );
    if (ages.minAge !== minAge) onMinAgeChange(ages.minAge);
    if (ages.maxAge !== maxAge) onMaxAgeChange(ages.maxAge);
    if (distance !== maxDistance) onMaxDistanceChange(distance);
    onDone({
      minAge: ages.minAge,
      maxAge: ages.maxAge,
      maxDistance: distance,
    });
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
            <i className="ri-calendar-line" aria-hidden />
            Ages {displayMin}–{displayMax}
          </span>
          <span className="pref-modal-summary-chip">
            <i className="ri-map-pin-line" aria-hidden />
            Within {distanceDisplayLabel(safeDistance, safeDistanceMax)}
          </span>
        </div>

        <section className="pref-modal-section" aria-labelledby="prefAgeHeading">
          <div className="pref-modal-section-head">
            <h3 id="prefAgeHeading" className="pref-modal-section-title">
              <i className="ri-user-smile-line" aria-hidden />
              Age range
            </h3>
            <span className="pref-modal-section-meta">
              {displayMin} – {displayMax}
            </span>
          </div>

          <div className="pref-age-grid">
            <div className="pref-field">
              <label className="pref-field-label" htmlFor="prefMinAge">
                Min age
              </label>
              <div className="pref-stepper">
                <button
                  type="button"
                  className="pref-stepper-btn"
                  aria-label="Decrease minimum age"
                  disabled={safeMin <= safeAgeMin}
                  onClick={() => setMinAge(safeMin - 1)}
                >
                  <i className="ri-subtract-line" aria-hidden />
                </button>
                <input
                  type="number"
                  className="pref-stepper-input"
                  id="prefMinAge"
                  min={safeAgeMin}
                  max={safeAgeMax}
                  value={safeMin}
                  inputMode="numeric"
                  onChange={(event) => setMinAge(Number(event.target.value))}
                  onBlur={() => setMinAge(safeMin)}
                />
                <button
                  type="button"
                  className="pref-stepper-btn"
                  aria-label="Increase minimum age"
                  disabled={safeMin >= safeAgeMax}
                  onClick={() => setMinAge(safeMin + 1)}
                >
                  <i className="ri-add-line" aria-hidden />
                </button>
              </div>
            </div>

            <div className="pref-field">
              <label className="pref-field-label" htmlFor="prefMaxAge">
                Max age
              </label>
              <div className="pref-stepper">
                <button
                  type="button"
                  className="pref-stepper-btn"
                  aria-label="Decrease maximum age"
                  disabled={safeMax <= safeAgeMin}
                  onClick={() => setMaxAge(safeMax - 1)}
                >
                  <i className="ri-subtract-line" aria-hidden />
                </button>
                <input
                  type="number"
                  className="pref-stepper-input"
                  id="prefMaxAge"
                  min={safeAgeMin}
                  max={safeAgeMax}
                  value={safeMax}
                  inputMode="numeric"
                  onChange={(event) => setMaxAge(Number(event.target.value))}
                  onBlur={() => setMaxAge(safeMax)}
                />
                <button
                  type="button"
                  className="pref-stepper-btn"
                  aria-label="Increase maximum age"
                  disabled={safeMax >= safeAgeMax}
                  onClick={() => setMaxAge(safeMax + 1)}
                >
                  <i className="ri-add-line" aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </section>

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
              {distanceDisplayLabel(safeDistance, safeDistanceMax)}
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
            <span>{safeDistanceMax}+ km</span>
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
