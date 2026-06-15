const INTEREST_PREFIX = "/interest/api";
const RESTRICTION_PREFIX = "/restriction/api";

export const onboardingRoutes = {
  getAllInterests: `${INTEREST_PREFIX}/get_all`,
  getRestrictions: `${RESTRICTION_PREFIX}/get_all`,
} as const;
