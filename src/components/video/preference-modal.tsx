"use client";

type PreferenceModalProps = {
  open: boolean;
  minAge: number;
  maxAge: number;
  maxDistance: number;
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

export function PreferenceModal({
  open,
  minAge,
  maxAge,
  maxDistance,
  onClose,
  onDone,
  onMinAgeChange,
  onMaxAgeChange,
  onMaxDistanceChange,
}: PreferenceModalProps) {
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
        <h2 id="preferenceModalTitle">Preferences</h2>
        <p className="auth-modal-sub">Set who you want to match with.</p>

        <div className="hero-pref-row">
          <label className="hero-pref-label" htmlFor="prefMinAge">
            Min age
          </label>
          <input
            type="number"
            className="hero-pref-input"
            id="prefMinAge"
            min={18}
            max={99}
            value={minAge}
            inputMode="numeric"
            onChange={(event) => onMinAgeChange(Number(event.target.value))}
          />
        </div>

        <div className="hero-pref-row">
          <label className="hero-pref-label" htmlFor="prefMaxAge">
            Max age
          </label>
          <input
            type="number"
            className="hero-pref-input"
            id="prefMaxAge"
            min={18}
            max={99}
            value={maxAge}
            inputMode="numeric"
            onChange={(event) => onMaxAgeChange(Number(event.target.value))}
          />
        </div>

        <div className="hero-pref-row hero-pref-row--range">
          <div className="hero-pref-range-head">
            <label className="hero-pref-label" htmlFor="prefMaxDistance">
              Max distance
            </label>
            <span className="hero-pref-range-val">{maxDistance} km</span>
          </div>
          <input
            type="range"
            className="hero-pref-range"
            id="prefMaxDistance"
            min={5}
            max={500}
            step={5}
            value={maxDistance}
            onChange={(event) =>
              onMaxDistanceChange(Number(event.target.value))
            }
          />
        </div>

        <button
          type="button"
          className="pref-modal-done"
          onClick={() => onDone({ minAge, maxAge, maxDistance })}
        >
          Done
        </button>
      </div>
    </div>
  );
}
