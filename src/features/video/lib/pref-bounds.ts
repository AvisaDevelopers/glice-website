export const PREF_AGE_MIN = 18;
export const PREF_AGE_MAX = 99;
export const PREF_DISTANCE_MIN = 5;
export const PREF_DISTANCE_MAX = 500;
export const PREF_DISTANCE_STEP = 5;

export function clampAge(value: number): number {
  if (!Number.isFinite(value)) return PREF_AGE_MIN;
  return Math.min(PREF_AGE_MAX, Math.max(PREF_AGE_MIN, Math.round(value)));
}

export function distanceStepForRange(min: number, max: number): number {
  if (max - min <= 100) return 1;
  return PREF_DISTANCE_STEP;
}

export function clampDistance(
  value: number,
  min = PREF_DISTANCE_MIN,
  max = PREF_DISTANCE_MAX,
): number {
  if (!Number.isFinite(value)) return min;
  const safeMin = Math.max(1, min);
  const safeMax = Math.max(safeMin, max);
  const step = distanceStepForRange(safeMin, safeMax);
  const stepped = Math.round(value / step) * step;
  return Math.min(safeMax, Math.max(safeMin, stepped));
}

export function normalizeAgeRange(
  minAge: number,
  maxAge: number,
): { minAge: number; maxAge: number } {
  const min = clampAge(minAge);
  const max = clampAge(maxAge);
  if (min > max) return { minAge: max, maxAge: min };
  return { minAge: min, maxAge: max };
}

export function clampAgeInRange(
  value: number,
  min: number,
  max: number,
): number {
  const safeMin = Math.max(1, Math.round(min));
  const safeMax = Math.max(safeMin, Math.round(max));
  if (!Number.isFinite(value)) return safeMin;
  return Math.min(safeMax, Math.max(safeMin, Math.round(value)));
}

export function normalizeAgeRangeInBounds(
  minAge: number,
  maxAge: number,
  boundMin: number,
  boundMax: number,
): { minAge: number; maxAge: number } {
  const min = clampAgeInRange(minAge, boundMin, boundMax);
  const max = clampAgeInRange(maxAge, boundMin, boundMax);
  if (min > max) return { minAge: max, maxAge: min };
  return { minAge: min, maxAge: max };
}

export function ageTrackPercentInRange(
  age: number,
  boundMin: number,
  boundMax: number,
): number {
  const clamped = clampAgeInRange(age, boundMin, boundMax);
  const span = boundMax - boundMin;
  if (span <= 0) return 0;
  return ((clamped - boundMin) / span) * 100;
}

export function distanceDisplayLabel(km: number, distanceMax: number): string {
  if (km >= distanceMax) return `${distanceMax}+ km`;
  return `${km} km`;
}
