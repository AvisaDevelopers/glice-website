import { genderFilterToLookingFor } from "@/lib/gender-options";
import type { VideoFilterInput } from "../types";
import {
  GLOBAL_COUNTRY_VALUE,
  normalizeCountryFilter,
} from "./country-options";

/** Payload for socket `discover` — country-based matching (no geo radius). */
export function buildDiscoverFilter(input: VideoFilterInput) {
  const countries = normalizeCountryFilter(input.countries);

  return {
    minAge: input.minAge,
    maxAge: input.maxAge,
    interest: "any",
    lookingFor: genderFilterToLookingFor(input.gender),
    countries:
      countries.length === 1 && countries[0] === GLOBAL_COUNTRY_VALUE
        ? GLOBAL_COUNTRY_VALUE
        : countries,
  };
}
