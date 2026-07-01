export type SitemapRoute = {
  path: string;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
};

export const NOINDEX_ROUTES = [
  "/messages",
  "/onboarding",
  "/history",
  "/reset-password",
] as const;

const SEO_LANDING_SLUGS = [
  "coomeet",
  "y99",
  "chatroulette",
  "bazoocam",
  "ometv",
  "joingy",
  "emerald",
  "text-chat",
  "random-chat",
  "omegle",
  "monkey-run",
  "chat-avenue",
  "monkey-app",
] as const;

const SEO_LANDING_ROUTES: SitemapRoute[] = SEO_LANDING_SLUGS.map((slug) => ({
  path: `/talk-to-strangers/${slug}`,
  changeFrequency: "weekly" as const,
  priority: slug === "omegle" ? 0.95 : 0.8,
}));

export const INDEXABLE_ROUTES: SitemapRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/features", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.4 },
  { path: "/community-guidelines", changeFrequency: "yearly", priority: 0.4 },
  { path: "/safety-tips", changeFrequency: "monthly", priority: 0.6 },
  { path: "/safety-child-protection", changeFrequency: "yearly", priority: 0.5 },
  {
    path: "/talk-to-strangers",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  ...SEO_LANDING_ROUTES,
];

export const SITELINK_PATHS = [
  "/talk-to-strangers",
  "/talk-to-strangers/omegle",
  "/talk-to-strangers/text-chat",
  "/talk-to-strangers/random-chat",
  "/talk-to-strangers/coomeet",
  "/talk-to-strangers/chatroulette",
] as const;
