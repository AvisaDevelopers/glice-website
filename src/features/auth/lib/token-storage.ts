const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_EMAIL_KEY = "user";

function canUseStorage(): boolean {
  return typeof window !== "undefined";
}

export const tokenStorage = {
  getAccessToken(): string | null {
    if (!canUseStorage()) return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  getRefreshToken(): string | null {
    if (!canUseStorage()) return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  getUserEmail(): string | null {
    if (!canUseStorage()) return null;
    return localStorage.getItem(USER_EMAIL_KEY);
  },

  setSession(accessToken: string, refreshToken: string, email: string): void {
    if (!canUseStorage()) return;
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(USER_EMAIL_KEY, email);
  },

  setAccessToken(accessToken: string): void {
    if (!canUseStorage()) return;
    localStorage.setItem(TOKEN_KEY, accessToken);
  },

  setRefreshToken(refreshToken: string): void {
    if (!canUseStorage()) return;
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  clear(): void {
    if (!canUseStorage()) return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_EMAIL_KEY);
  },

  hasPersistedSession(): boolean {
    const email = this.getUserEmail();
    const refreshToken = this.getRefreshToken();
    return Boolean(email && refreshToken);
  },
};
