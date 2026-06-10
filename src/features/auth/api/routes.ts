// Route paths will mirror GliceFlutterV1/lib/services/api_routes.dart in Phase 2.

const AUTH_PREFIX = "/auth/api";

export const authRoutes = {
  login: `${AUTH_PREFIX}/login`,
  signup: `${AUTH_PREFIX}/signup`,
  sendOtp: `${AUTH_PREFIX}/send_otp`,
  verifyOtp: `${AUTH_PREFIX}/verify_otp`,
  updatePassword: `${AUTH_PREFIX}/update_password`,
  getUser: (identifier: string) =>
    `${AUTH_PREFIX}/get_user/${encodeURIComponent(identifier)}`,
} as const;

export const refreshTokenRoute = "/refereshtoken/api";
