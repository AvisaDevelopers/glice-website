export type UserLocation = {
  type?: string;
  coordinates?: [number, number];
  text?: string;
  name?: string;
  city?: string;
  region?: string;
  country?: string;
  district?: string;
  latitude?: number;
  longitude?: number;
  mapboxId?: string;
  fullAddress?: string;
  placeFormatted?: string;
};

export type UserPhone = {
  code?: string;
  phoneCode?: string;
  country?: string;
  number?: string;
};

export type UserMembership = {
  planId?: string;
  orderId?: string;
  rewardPlan?: boolean;
};

export type GliceUser = {
  _id: string;
  email: string;
  name?: string;
  username?: string;
  profileUrl?: string;
  age?: number;
  gender?: string | number;
  country?: string;
  phone?: UserPhone;
  ipAddress?: string;
  referralCode?: string;
  location?: UserLocation;
  membership?: UserMembership;
  verification?: { status: string; deadline?: string };
  /** Profile photo moderation — API `profileStatus` (pending | approved | rejected). */
  profileStatus?: string;
  /** Account verification badge — separate from profile photo moderation. */
  verificationStatus?: string;
  isBan?: boolean;
  isPermanentBan?: boolean;
  bio?: string;
  height?: number;
  isFeet?: boolean;
  speaks?: string;
  interests?: string[];
  lookingFor?: string;
};

export type AuthResponse = {
  user: GliceUser;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt?: string;
};

export type RefreshTokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  message?: string;
};
