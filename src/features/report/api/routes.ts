const RESTRICTION_PREFIX = "/restriction/api";
const REPORT_PREFIX = "/report/api";

export const reportRoutes = {
  getRestrictions: `${RESTRICTION_PREFIX}/get_all`,
  submitReport: `${REPORT_PREFIX}/add`,
} as const;
