import type { ReactNode } from "react";

export type SeoFaqItem = {
  question: string;
  answer: string;
};

export type SeoBenefit = {
  icon: string;
  title: string;
  description: string;
};

export type SeoStat = {
  value: string;
  label: string;
  icon: string;
};

export type SeoComparisonRow = {
  feature: string;
  glice: boolean | "partial";
  competitor: boolean | "partial";
};

export type SeoStep = {
  icon: string;
  title: string;
  description: string;
};

export type SeoFeatureShowcase = {
  icon: string;
  title: string;
  description: string;
};

export type SeoHeroCta = {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export type SeoPageContent = {
  slug: string;
  path: string;
  label: string;
  variant: "dark" | "light";
  metadata: {
    title: string;
    description: string;
    keywords?: string[];
  };
  hero: {
    title: ReactNode;
    description: string;
  };
  benefits: SeoBenefit[];
  faq: SeoFaqItem[];
  cta: {
    title: string;
    description: string;
  };
  competitorName?: string;
  stats?: SeoStat[];
  comparisonRows?: SeoComparisonRow[];
  steps?: SeoStep[];
  features?: SeoFeatureShowcase[];
  heroCta?: SeoHeroCta;
};
