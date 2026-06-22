export const GLOBAL_COUNTRY_VALUE = "global";

export type VideoCountryOption = {
  value: string;
  label: string;
  flag: string;
};

export const VIDEO_COUNTRY_OPTIONS: VideoCountryOption[] = [
  { value: GLOBAL_COUNTRY_VALUE, label: "Global", flag: "🌍" },
  { value: "usa", label: "United States", flag: "🇺🇸" },
  { value: "pakistan", label: "Pakistan", flag: "🇵🇰" },
  { value: "india", label: "India", flag: "🇮🇳" },
  { value: "uk", label: "United Kingdom", flag: "🇬🇧" },
  { value: "canada", label: "Canada", flag: "🇨🇦" },
  { value: "australia", label: "Australia", flag: "🇦🇺" },
  { value: "uae", label: "UAE", flag: "🇦🇪" },
  { value: "saudi arabia", label: "Saudi Arabia", flag: "🇸🇦" },
  { value: "germany", label: "Germany", flag: "🇩🇪" },
  { value: "france", label: "France", flag: "🇫🇷" },
  { value: "spain", label: "Spain", flag: "🇪🇸" },
  { value: "italy", label: "Italy", flag: "🇮🇹" },
  { value: "brazil", label: "Brazil", flag: "🇧🇷" },
  { value: "mexico", label: "Mexico", flag: "🇲🇽" },
  { value: "turkey", label: "Turkey", flag: "🇹🇷" },
  { value: "bangladesh", label: "Bangladesh", flag: "🇧🇩" },
  { value: "nigeria", label: "Nigeria", flag: "🇳🇬" },
  { value: "south africa", label: "South Africa", flag: "🇿🇦" },
  { value: "japan", label: "Japan", flag: "🇯🇵" },
  { value: "south korea", label: "South Korea", flag: "🇰🇷" },
  { value: "philippines", label: "Philippines", flag: "🇵🇭" },
  { value: "indonesia", label: "Indonesia", flag: "🇮🇩" },
];

export function normalizeCountryValue(value: string): string {
  return value.trim().toLowerCase();
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
  const match = VIDEO_COUNTRY_OPTIONS.find(
    (option) => normalizeCountryValue(option.value) === normalized,
  );
  if (match) return match.label;
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
