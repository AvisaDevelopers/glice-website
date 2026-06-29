import { countryCodeToFlag } from "@/components/layout/profile-menu-utils";
import countries from "world-countries";

export const GLOBAL_COUNTRY_VALUE = "global";

export type VideoCountryOption = {
  value: string;
  label: string;
  flag: string;
};

/** Legacy short values still accepted from saved preferences / backend. */
const COUNTRY_VALUE_ALIASES: Record<string, string> = {
  usa: "united states",
  uk: "united kingdom",
  uae: "united arab emirates",
};

const GLOBAL_OPTION: VideoCountryOption = {
  value: GLOBAL_COUNTRY_VALUE,
  label: "Global",
  flag: "🌍",
};

const WORLD_COUNTRY_OPTIONS: VideoCountryOption[] = countries
  .map((country) => ({
    value: country.name.common.toLowerCase(),
    label: country.name.common,
    flag: countryCodeToFlag(country.cca2),
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

export const VIDEO_COUNTRY_OPTIONS: VideoCountryOption[] = [
  GLOBAL_OPTION,
  ...WORLD_COUNTRY_OPTIONS,
];

const COUNTRY_LABEL_BY_VALUE = new Map(
  VIDEO_COUNTRY_OPTIONS.map((option) => [
    normalizeCountryValue(option.value),
    option.label,
  ]),
);

export function normalizeCountryValue(value: string): string {
  const normalized = value.trim().toLowerCase();
  return COUNTRY_VALUE_ALIASES[normalized] ?? normalized;
}

export function isGlobalCountryFilter(values: string[]): boolean {
  return (
    values.length === 0 ||
    values.some((value) => normalizeCountryValue(value) === GLOBAL_COUNTRY_VALUE)
  );
}

export function normalizeCountryFilter(values: string[]): string[] {
  if (!values.length) return [GLOBAL_COUNTRY_VALUE];
  if (isGlobalCountryFilter(values)) return [GLOBAL_COUNTRY_VALUE];
  return [...new Set(values.map(normalizeCountryValue).filter(Boolean))];
}

export function countryOptionLabel(value: string): string {
  const normalized = normalizeCountryValue(value);
  const match = COUNTRY_LABEL_BY_VALUE.get(normalized);
  if (match) return match;
  return value
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function countryFilterLabel(values: string[]): string {
  const normalized = normalizeCountryFilter(values);
  if (isGlobalCountryFilter(normalized)) return "Global";

  const labels = normalized.map(countryOptionLabel);
  if (labels.length === 1) return labels[0];
  if (labels.length === 2) return `${labels[0]} & ${labels[1]}`;
  return `${labels.length} countries`;
}

export function toggleCountrySelection(
  current: string[],
  value: string,
): string[] {
  const nextValue = normalizeCountryValue(value);

  if (nextValue === GLOBAL_COUNTRY_VALUE) {
    return [GLOBAL_COUNTRY_VALUE];
  }

  const withoutGlobal = normalizeCountryFilter(current).filter(
    (item) => item !== GLOBAL_COUNTRY_VALUE,
  );

  if (withoutGlobal.includes(nextValue)) {
    const filtered = withoutGlobal.filter((item) => item !== nextValue);
    return filtered.length ? filtered : [GLOBAL_COUNTRY_VALUE];
  }

  return [...withoutGlobal, nextValue];
}

export function searchScopeMessage(values: string[]): string {
  const label = countryFilterLabel(values);
  if (isGlobalCountryFilter(normalizeCountryFilter(values))) {
    return "Searching worldwide";
  }
  return `Matching with ${label}`;
}

export function filterCountryOptions(
  query: string,
  options: VideoCountryOption[] = VIDEO_COUNTRY_OPTIONS,
): VideoCountryOption[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return options;

  return options.filter((option) => {
    const label = option.label.toLowerCase();
    const value = normalizeCountryValue(option.value);
    return label.includes(trimmed) || value.includes(trimmed);
  });
}
