export type UserLocation = {
  type?: string;
  coordinates?: [number, number];
  text?: string;
};

export type UserPhone = {
  code?: string;
  phoneCode?: string;
  country?: string;
  number?: string;
};

export type GliceUser = {
  _id: string;
  email: string;
  name?: string;
  username?: string;
  profileUrl?: string;
  age?: number;
  gender?: string | number;
  phone?: UserPhone;
  ipAddress?: string;
  referralCode?: string;
  location?: UserLocation;
  verification?: { status: string; deadline?: string };
  verificationStatus?: string;
  isBan?: boolean;
  isPermanentBan?: boolean;
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
