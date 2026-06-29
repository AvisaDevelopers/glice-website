"use client";

import { useEffect, useMemo, useState } from "react";
import {
  clampAgeInRange,
  normalizeAgeRangeInBounds,
} from "@/features/video/lib/pref-bounds";
import {
  countryFilterLabel,
  filterCountryOptions,
  GLOBAL_COUNTRY_VALUE,
  normalizeCountryFilter,
  toggleCountrySelection,
} from "@/features/video/lib/country-options";

type PreferenceModalProps = {
  open: boolean;
  minAge: number;
  maxAge: number;
  countries: string[];
  ownCountryLabel?: string;
  ageMin: number;
  ageMax: number;
  onClose: () => void;
  onDone: (values: {
    minAge: number;
    maxAge: number;
    countries: string[];
  }) => void;
  onMinAgeChange: (value: number) => void;
  onMaxAgeChange: (value: number) => void;
  onCountriesChange: (value: string[]) => void;
};

export function PreferenceModal({
  open,
  minAge,
  maxAge,
  countries,
  ownCountryLabel,
  ageMin,
  ageMax,
  onClose,
  onDone,
  onMinAgeChange,
  onMaxAgeChange,
  onCountriesChange,
}: PreferenceModalProps) {
  const safeAgeMin = Math.max(1, ageMin);
  const safeAgeMax = Math.max(safeAgeMin, ageMax);
  const selectedCountries = normalizeCountryFilter(countries);
  const [countrySearch, setCountrySearch] = useState("");

  const filteredCountryOptions = useMemo(
    () => filterCountryOptions(countrySearch),
    [countrySearch],
  );

  const safeMin = clampAgeInRange(minAge, safeAgeMin, safeAgeMax);
  const safeMax = clampAgeInRange(maxAge, safeAgeMin, safeAgeMax);
  const displayMin = Math.min(safeMin, safeMax);
  const displayMax = Math.max(safeMin, safeMax);

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
    if (ages.minAge !== minAge) onMinAgeChange(ages.minAge);
    if (ages.maxAge !== maxAge) onMaxAgeChange(ages.maxAge);
    onDone({
      minAge: ages.minAge,
      maxAge: ages.maxAge,
      countries: selectedCountries,
    });
  };

  useEffect(() => {
    if (!open) {
      setCountrySearch("");
      return;
    }

    const scrollY = window.scrollY;
    const { style } = document.body;
    const previous = {
      position: style.position,
      top: style.top,
      left: style.left,
      right: style.right,
      width: style.width,
      overflow: style.overflow,
    };

    document.body.classList.add("pref-modal-open");
    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.left = "0";
    style.right = "0";
    style.width = "100%";
    style.overflow = "hidden";

    return () => {
      document.body.classList.remove("pref-modal-open");
      style.position = previous.position;
      style.top = previous.top;
      style.left = previous.left;
      style.right = previous.right;
      style.width = previous.width;
      style.overflow = previous.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  return (
    <div
      className={`modal-backdrop pref-modal-backdrop${open ? " is-open" : ""}`}
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
            <h2 id="preferenceModalTitle">Match preferences</h2>
            <p className="auth-modal-sub pref-modal-sub">
              Choose countries and age range for random video calls.
            </p>
          </div>
        </div>

        <div className="pref-modal-summary" aria-live="polite">
          <span className="pref-modal-summary-chip">
            <i className="ri-calendar-line" aria-hidden />
            Ages {displayMin}–{displayMax}
          </span>
          <span className="pref-modal-summary-chip">
            <i className="ri-earth-line" aria-hidden />
            {countryFilterLabel(selectedCountries)}
          </span>
        </div>

        {ownCountryLabel ? (
          <p className="pref-modal-own-country">
            <i className="ri-map-pin-user-line" aria-hidden />
            Your country: <strong>{ownCountryLabel}</strong>
          </p>
        ) : null}

        <section
          className="pref-modal-section pref-modal-section--countries"
          aria-labelledby="prefCountryHeading"
        >
          <div className="pref-modal-section-head">
            <h3 id="prefCountryHeading" className="pref-modal-section-title">
              <i className="ri-earth-line" aria-hidden />
              Connect with
            </h3>
            <span className="pref-modal-section-meta pref-modal-section-meta--accent">
              {countryFilterLabel(selectedCountries)}
            </span>
          </div>
          <p className="pref-modal-section-hint">
            Pick one or more countries, or choose Global to match worldwide.
            Both people must accept each other&apos;s country.
          </p>
          <label className="pref-modal-country-search" htmlFor="prefCountrySearch">
            <i className="ri-search-line pref-modal-country-search-icon" aria-hidden />
            <input
              id="prefCountrySearch"
              type="search"
              className="pref-modal-country-search-input"
              placeholder="Search countries..."
              value={countrySearch}
              onChange={(event) => setCountrySearch(event.target.value)}
              autoComplete="off"
              enterKeyHint="search"
            />
            {countrySearch ? (
              <button
                type="button"
                className="pref-modal-country-search-clear"
                aria-label="Clear country search"
                onClick={() => setCountrySearch("")}
              >
                <i className="ri-close-line" aria-hidden />
              </button>
            ) : null}
          </label>
          <div className="pref-modal-country-grid" role="listbox" aria-multiselectable>
            {filteredCountryOptions.length ? (
              filteredCountryOptions.map((option) => {
              const active = selectedCountries.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={`pref-modal-country-chip${active ? " is-active" : ""}`}
                  onClick={() =>
                    onCountriesChange(
                      toggleCountrySelection(selectedCountries, option.value),
                    )
                  }
                >
                  <span className="pref-modal-country-flag" aria-hidden>
                    {option.flag}
                  </span>
                  <span>{option.label}</span>
                  {active && option.value !== GLOBAL_COUNTRY_VALUE ? (
                    <i className="ri-check-line pref-modal-country-check" aria-hidden />
                  ) : null}
                </button>
              );
              })
            ) : (
              <p className="pref-modal-country-empty">No countries found.</p>
            )}
          </div>
        </section>

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

        <button type="button" className="pref-modal-done" onClick={handleDone}>
          <i className="ri-check-line" aria-hidden />
          Save preferences
        </button>
      </div>
    </div>
  );
}
