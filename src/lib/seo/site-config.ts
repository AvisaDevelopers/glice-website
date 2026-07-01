const DEFAULT_SITE_URL = "http://localhost:3000";

export const SITE_NAME = "Glice";
export const SITE_TAGLINE = "Live Random Video Chat. Real Connections.";
export const DEFAULT_OG_IMAGE = "/icons/logo.png";

export const AGGREGATE_RATING = {
  ratingValue: "4.8",
  ratingCount: "91800",
  bestRating: "5",
} as const;

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (url) {
    return url.replace(/\/$/, "");
  }
  return DEFAULT_SITE_URL;
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
