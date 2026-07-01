import type {
  SeoBenefit,
  SeoComparisonRow,
  SeoFeatureShowcase,
  SeoHeroCta,
  SeoPageContent,
  SeoStat,
  SeoStep,
} from "./types";

export const VIDEO_HERO_HREF = "/#videoHero";

export const GOOGLE_PLAY_HREF =
  "https://play.google.com/store/apps/details?id=com.glice.app";

export const HERO_CTA_EYEBROW = "Get For Fun Now";
export const HERO_CTA_PRIMARY_LABEL = "Start Video Chat";

export const DEFAULT_STATS: SeoStat[] = [
  { value: "10K+", label: "users online daily", icon: "ri-user-smile-line" },
  { value: "150+", label: "countries represented", icon: "ri-global-line" },
  { value: "18+", label: "adults only community", icon: "ri-shield-check-line" },
  { value: "Free", label: "to download on Android", icon: "ri-google-play-line" },
];

export const DEFAULT_STEPS: SeoStep[] = [
  {
    icon: "ri-download-cloud-line",
    title: "Download & verify",
    description:
      "Get Glice on Google Play, create your 18+ profile, and set permissions on your terms.",
  },
  {
    icon: "ri-live-line",
    title: "Start live video",
    description:
      "Tap to join a random live session or browse discovery cards — meet strangers face-to-face in seconds.",
  },
  {
    icon: "ri-user-heart-line",
    title: "Match & continue",
    description:
      "Like or super like after a good call. Chat unlocks only when interest is mutual.",
  },
];

export const DEFAULT_HERO_CTA: SeoHeroCta = {
  primaryLabel: HERO_CTA_PRIMARY_LABEL,
  primaryHref: VIDEO_HERO_HREF,
  secondaryLabel: "Get on Google Play",
  secondaryHref: GOOGLE_PLAY_HREF,
};

export function buildComparison(_competitorName: string): SeoComparisonRow[] {
  return [
    {
      feature: "Live random video chat",
      glice: true,
      competitor: true,
    },
    {
      feature: "Mutual match before messaging",
      glice: true,
      competitor: false,
    },
    {
      feature: "Mobile-native Android app",
      glice: true,
      competitor: "partial",
    },
    {
      feature: "18+ community enforcement",
      glice: true,
      competitor: "partial",
    },
    {
      feature: "In-app report & block",
      glice: true,
      competitor: "partial",
    },
    {
      feature: "Open unsolicited inbox",
      glice: false,
      competitor: true,
    },
  ];
}

export function benefitsToFeatures(benefits: SeoBenefit[]): SeoFeatureShowcase[] {
  return benefits.map((benefit) => ({
    icon: benefit.icon,
    title: benefit.title,
    description: benefit.description,
  }));
}

export function enrichPremiumPage(
  page: SeoPageContent,
  competitorName: string,
): SeoPageContent {
  if (page.variant !== "dark") return page;

  return {
    ...page,
    competitorName,
    stats: page.stats ?? DEFAULT_STATS,
    steps: page.steps ?? DEFAULT_STEPS,
    comparisonRows: page.comparisonRows ?? buildComparison(competitorName),
    features: page.features ?? benefitsToFeatures(page.benefits),
    heroCta: page.heroCta ?? DEFAULT_HERO_CTA,
  };
}
