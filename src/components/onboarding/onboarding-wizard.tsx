"use client";

import { useUiSession } from "@/components/site/ui-session-provider";
import {
  createInitialDraft,
  fetchInterests,
  fetchOnboardingRestrictions,
  submitOnboardingProfile,
} from "@/features/onboarding/api/onboarding-api";
import { setHomeTabPreference } from "@/features/onboarding/lib/home-tab-preference";
import { normalizeGenderKey } from "@/features/onboarding/lib/build-highlights-payload";
import {
  formatGenderDisplayLabel,
  genderIconClass,
} from "@/lib/gender-options";
import {
  HOME_TAB_LIVE_VIDEO,
  ONBOARDING_STEPS,
  type OnboardingDraft,
  type OnboardingRestrictions,
  type OnboardingStep,
} from "@/features/onboarding/types";
import { HeightWheelPicker } from "@/components/onboarding/height-wheel-picker";
import { getUser } from "@/features/auth/api/auth-api";
import { getErrorMessage } from "@/features/auth/lib/get-error-message";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const STEP_LABELS: Record<OnboardingStep, string> = {
  profile: "About you",
  gender: "Your gender",
  age: "Your age",
  height: "Your height",
  photo: "Profile photo",
  interests: "Your interests",
};

export function OnboardingWizard() {
  const router = useRouter();
  const { user, applySessionUser } = useUiSession();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [stepIndex, setStepIndex] = useState(0);
  const [draft, setDraft] = useState<OnboardingDraft>(() =>
    createInitialDraft(user),
  );
  const [restrictions, setRestrictions] =
    useState<OnboardingRestrictions | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stepConfirmed, setStepConfirmed] = useState({
    gender: false,
    age: false,
    height: false,
    heightUnit: false,
  });

  const step = ONBOARDING_STEPS[stepIndex];
  const isLastStep = stepIndex === ONBOARDING_STEPS.length - 1;
  const progressTotal = ONBOARDING_STEPS.length;
  const progressCurrent = stepIndex + 1;

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoadingData(true);
      setError(null);
      try {
        const [interestList, restrictionData] = await Promise.all([
          fetchInterests(),
          fetchOnboardingRestrictions(),
        ]);
        if (cancelled) return;

        setRestrictions(restrictionData);
        setDraft((prev) => {
          const selected = new Set(
            user?.interests?.map((title) => title.toLowerCase()) ?? [],
          );
          return {
            ...prev,
            interests: interestList.map((item) => ({
              ...item,
              isSelected: selected.has(item.title.toLowerCase()),
            })),
            age: Math.min(
              Math.max(prev.age, restrictionData.ageMin),
              restrictionData.ageMax,
            ),
          };
        });
      } catch (err) {
        if (!cancelled) {
          setError(getErrorMessage(err, "Could not load onboarding data"));
        }
      } finally {
        if (!cancelled) setLoadingData(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [user?.interests]);

  const patchDraft = useCallback((patch: Partial<OnboardingDraft>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
  }, []);

  const goNext = useCallback(() => {
    setError(null);
    setStepIndex((prev) => Math.min(prev + 1, ONBOARDING_STEPS.length - 1));
  }, []);

  const goBack = useCallback(() => {
    setError(null);
    setStepIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const validateStep = useCallback((): string | null => {
    switch (step) {
      case "profile":
        if (!draft.name.trim()) return "Enter your display name";
        if (draft.name.trim().length > 30) return "Name must be 30 characters or less";
        return null;
      case "gender":
        if (!draft.gender || !stepConfirmed.gender) {
          return "Choose your gender";
        }
        return null;
      case "age":
        if (!restrictions) return "Please wait…";
        if (!stepConfirmed.age) return "Select your age";
        if (draft.age < restrictions.ageMin || draft.age > restrictions.ageMax) {
          return `Age must be between ${restrictions.ageMin} and ${restrictions.ageMax}`;
        }
        return null;
      case "height":
        if (!stepConfirmed.heightUnit) return "Choose cm or ft / in";
        if (!stepConfirmed.height) return "Select your height";
        if (draft.heightCm < 120 || draft.heightCm > 230) {
          return "Enter a valid height";
        }
        return null;
      case "photo":
        return null;
      case "interests": {
        const selected = draft.interests.filter((item) => item.isSelected).length;
        const max = restrictions?.maxInterestsSelection ?? 5;
        if (selected < 1) return "Select at least one interest";
        if (selected > max) return `Select up to ${max} interests`;
        return null;
      }
      default:
        return null;
    }
  }, [draft, restrictions, step, stepConfirmed]);

  const handleContinue = () => {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    if (isLastStep) {
      void handleFinish();
      return;
    }
    goNext();
  };

  const handleFinish = async () => {
    if (!user?.email) return;

    setSubmitting(true);
    setError(null);
    setHomeTabPreference(HOME_TAB_LIVE_VIDEO);

    try {
      let userId = user._id;
      if (!userId) {
        const profile = await getUser(user.email);
        userId = profile._id;
        applySessionUser(profile);
      }

      const updatedUser = await submitOnboardingProfile({
        email: user.email,
        userId,
        draft,
        isHeightFeet: draft.isHeightFeet,
      });

      applySessionUser(updatedUser);
      router.replace("/");
    } catch (err) {
      setSubmitting(false);
      setError(getErrorMessage(err, "Could not save your profile"));
    }
  };

  const toggleInterest = (title: string) => {
    const max = restrictions?.maxInterestsSelection ?? 5;
    setDraft((prev) => {
      const target = prev.interests.find((item) => item.title === title);
      if (!target) return prev;

      if (target.isSelected) {
        setError(null);
        return {
          ...prev,
          interests: prev.interests.map((item) =>
            item.title === title ? { ...item, isSelected: false } : item,
          ),
        };
      }

      const selected = prev.interests.filter((item) => item.isSelected).length;
      if (selected >= max) {
        setError(`You can select up to ${max} interests`);
        return prev;
      }

      setError(null);
      return {
        ...prev,
        interests: prev.interests.map((item) =>
          item.title === title ? { ...item, isSelected: true } : item,
        ),
      };
    });
  };

  const handlePhotoPick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file");
      return;
    }
    const preview = URL.createObjectURL(file);
    patchDraft({ profileFile: file, profilePreview: preview });
    setError(null);
  };

  const selectedInterestCount = draft.interests.filter(
    (item) => item.isSelected,
  ).length;

  if (loadingData) {
    return (
      <div className="onboarding-shell">
        <div className="onboarding-card onboarding-card--loading">
          <span className="onboarding-spinner" aria-hidden />
          <p>Setting up your profile…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="onboarding-shell">
      <div className="onboarding-card">
        <header className="onboarding-header">
            <button
              type="button"
              className="onboarding-back"
              onClick={goBack}
              disabled={stepIndex === 0 || submitting}
              aria-label="Go back"
            >
              <i className="ri-arrow-left-line" aria-hidden />
            </button>
            <div className="onboarding-progress" aria-hidden>
              <span
                className="onboarding-progress-bar"
                style={{ width: `${(progressCurrent / progressTotal) * 100}%` }}
              />
            </div>
            <span className="onboarding-step-count">
              {progressCurrent} / {progressTotal}
            </span>
          </header>

        <div className="onboarding-body">
          <h1 className="onboarding-title">{STEP_LABELS[step]}</h1>

          {step === "profile" && (
            <>
              <p className="onboarding-desc">
                This is how people will see you on Glice.
              </p>
              <label className="onboarding-field">
                <span>Display name</span>
                <input
                  type="text"
                  maxLength={30}
                  value={draft.name}
                  onChange={(e) => patchDraft({ name: e.target.value })}
                  placeholder="Your name"
                  autoComplete="name"
                />
              </label>
              <label className="onboarding-field">
                <span>Bio <em>(optional)</em></span>
                <textarea
                  rows={3}
                  maxLength={160}
                  value={draft.bio}
                  onChange={(e) => patchDraft({ bio: e.target.value })}
                  placeholder="Say something about yourself"
                />
              </label>
            </>
          )}

          {step === "gender" && restrictions && (
            <>
              <p className="onboarding-desc">Helps us match you with the right people.</p>
              <div className="onboarding-gender-grid">
                {restrictions.genders.map((gender) => {
                  const key = normalizeGenderKey(gender.title);
                  const active = draft.gender === key;
                  return (
                    <button
                      key={gender.title}
                      type="button"
                      className={`onboarding-gender-card${active ? " is-active" : ""}`}
                      onClick={() => {
                        patchDraft({ gender: key });
                        setStepConfirmed((prev) => ({ ...prev, gender: true }));
                        setError(null);
                      }}
                    >
                      {gender.url ? (
                        <Image
                          src={gender.url}
                          alt=""
                          width={56}
                          height={56}
                          unoptimized
                        />
                      ) : (
                        <i
                          className={genderIconClass(key)}
                          aria-hidden
                        />
                      )}
                      <span>{formatGenderDisplayLabel(gender.title)}</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {step === "age" && restrictions && (
            <>
              <p className="onboarding-desc">To help us find your best matches.</p>
              <div className="onboarding-age-picker">
                <button
                  type="button"
                  className="onboarding-stepper-btn"
                  onClick={() => {
                    patchDraft({
                      age: Math.max(restrictions.ageMin, draft.age - 1),
                    });
                    setStepConfirmed((prev) => ({ ...prev, age: true }));
                    setError(null);
                  }}
                  aria-label="Decrease age"
                >
                  <i className="ri-subtract-line" aria-hidden />
                </button>
                <span className="onboarding-age-value">{draft.age}</span>
                <button
                  type="button"
                  className="onboarding-stepper-btn"
                  onClick={() => {
                    patchDraft({
                      age: Math.min(restrictions.ageMax, draft.age + 1),
                    });
                    setStepConfirmed((prev) => ({ ...prev, age: true }));
                    setError(null);
                  }}
                  aria-label="Increase age"
                >
                  <i className="ri-add-line" aria-hidden />
                </button>
              </div>
            </>
          )}

          {step === "height" && (
            <HeightWheelPicker
              heightCm={draft.heightCm}
              isHeightFeet={draft.isHeightFeet}
              onHeightCmChange={(heightCm) => patchDraft({ heightCm })}
              onUnitChange={(isHeightFeet) => {
                patchDraft({ isHeightFeet });
                setStepConfirmed((prev) => ({
                  ...prev,
                  heightUnit: true,
                  height: false,
                }));
                setError(null);
              }}
              onUserInteract={() => {
                setStepConfirmed((prev) => ({ ...prev, height: true }));
                setError(null);
              }}
            />
          )}

          {step === "photo" && (
            <>
              <p className="onboarding-desc">
                A clear photo helps you get more matches.
              </p>
              <button
                type="button"
                className="onboarding-photo-picker"
                onClick={() => fileInputRef.current?.click()}
              >
                {draft.profilePreview ? (
                  <Image
                    src={draft.profilePreview}
                    alt="Profile preview"
                    width={160}
                    height={160}
                    className="onboarding-photo-preview"
                    unoptimized
                  />
                ) : (
                  <>
                    <i className="ri-camera-line" aria-hidden />
                    <span>Upload photo</span>
                  </>
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handlePhotoPick}
              />
            </>
          )}

          {step === "interests" && (
            <>
              <p className="onboarding-desc">
                Pick up to {restrictions?.maxInterestsSelection ?? 5} interests.
                <span className="onboarding-interest-count">
                  {selectedInterestCount} selected
                </span>
              </p>
              <div className="onboarding-interest-grid">
                {draft.interests.map((interest) => (
                  <button
                    key={interest.title}
                    type="button"
                    className={`onboarding-interest-chip${interest.isSelected ? " is-active" : ""}`}
                    onClick={() => toggleInterest(interest.title)}
                  >
                    <span>{interest.title}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {error && (
            <p className="onboarding-error" role="alert">
              {error}
            </p>
          )}
        </div>

        <footer className="onboarding-footer">
          <button
            type="button"
            className="onboarding-continue-btn"
            onClick={handleContinue}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span className="onboarding-spinner onboarding-spinner--dark" aria-hidden />
                Saving…
              </>
            ) : isLastStep ? (
              "Finish"
            ) : (
              "Next"
            )}
          </button>
        </footer>
      </div>
    </div>
  );
}
