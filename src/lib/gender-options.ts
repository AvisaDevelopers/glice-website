/** Gender filter shown in the live video toolbar. */
export const GENDER_FILTER_OPTIONS = [
  "Everyone",
  "Female",
  "Male",
  "Other",
] as const;

export type GenderFilterOption = (typeof GENDER_FILTER_OPTIONS)[number];

export const DEFAULT_PROFILE_GENDERS = [
  { title: "Male", url: "" },
  { title: "Female", url: "" },
  { title: "Other", url: "" },
] as const;

/** Canonical lowercase key sent to the backend (matches Flutter). */
export function normalizeGenderKey(title: string): string {
  const key = title.split(" ").join("").toLowerCase();
  if (key === "man" || key === "men") return "male";
  if (key === "woman" || key === "women") return "female";
  if (key === "nonbinary" || key === "non-binary") return "other";
  return key;
}

export function formatGenderDisplayLabel(title: string): string {
  switch (normalizeGenderKey(title)) {
    case "male":
      return "Male";
    case "female":
      return "Female";
    case "other":
      return "Other";
    default:
      return title.replace(/([a-z])([A-Z])/g, "$1 $2");
  }
}

export function genderFilterToLookingFor(gender: GenderFilterOption): string {
  switch (gender) {
    case "Female":
      return "female";
    case "Male":
      return "male";
    case "Other":
      return "other";
    default:
      return "any";
  }
}

export function lobbyGenderKey(gender: GenderFilterOption): string {
  return genderFilterToLookingFor(gender);
}

export function genderIconClass(titleOrKey: string): string {
  switch (normalizeGenderKey(titleOrKey)) {
    case "everyone":
    case "any":
      return "ri-group-line";
    case "female":
      return "ri-women-line";
    case "male":
      return "ri-men-line";
    case "other":
      return "ri-genderless-line";
    default:
      return "ri-user-line";
  }
}
