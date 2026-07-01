import type { Metadata } from "next";
import type { SeoPageContent } from "@/content/seo/types";
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_TAGLINE,
} from "./site-config";

export type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
  pageName?: string;
  noindex?: boolean;
  ogImage?: string;
};

const MIN_SEO_TITLE_LENGTH = 50;
const MAX_SEO_TITLE_LENGTH = 60;

function resolveOgImage(ogImage?: string): string {
  return absoluteUrl(ogImage ?? DEFAULT_OG_IMAGE);
}

function stripTrailingBrand(title: string): string {
  return title.replace(/\s*(?:—|–|-|\|)\s*Glice\s*$/i, "").trim();
}

export function formatBrandedPageTitle(rawTitle: string): string {
  let cleanTitle = stripTrailingBrand(rawTitle);
  const suffix = ` | ${SITE_NAME}`;
  const maxContentLength = MAX_SEO_TITLE_LENGTH - suffix.length;

  if (cleanTitle.length > maxContentLength) {
    cleanTitle = cleanTitle.slice(0, maxContentLength).trimEnd();
    if (cleanTitle.endsWith("—") || cleanTitle.endsWith("-")) {
      cleanTitle = cleanTitle.slice(0, -1).trimEnd();
    }
  }

  return `${cleanTitle}${suffix}`;
}

export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const {
    title: rawTitle,
    description,
    path,
    keywords,
    noindex = false,
    ogImage,
  } = input;
  const title = formatBrandedPageTitle(rawTitle);
  const canonical = absoluteUrl(path);
  const image = resolveOgImage(ogImage);

  return {
    title: { absolute: title },
    description,
    ...(keywords?.length ? { keywords: [...keywords] } : {}),
    alternates: {
      canonical,
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      images: [{ url: image, alt: SITE_NAME }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    publisher: SITE_NAME,
  };
}

export function buildSeoPageMetadata(content: SeoPageContent): Metadata {
  const pageTitle = formatBrandedPageTitle(content.metadata.title);
  const base = buildPageMetadata({
    title: content.metadata.title,
    description: content.metadata.description,
    path: content.path,
    keywords: content.metadata.keywords,
  });

  return {
    ...base,
    title: { absolute: pageTitle },
    openGraph: {
      ...base.openGraph,
      title: pageTitle,
    },
    twitter: {
      ...base.twitter,
      title: pageTitle,
    },
  };
}

export function buildRootMetadataDefaults(): Metadata {
  return {
    metadataBase: new URL(absoluteUrl("/")),
    title: {
      default: `${SITE_NAME} - ${SITE_TAGLINE}`,
      template: "%s",
    },
    description:
      "Glice is a live random video chat and social discovery app with mutual matching, nearby discovery, and safer conversations.",
    robots: { index: true, follow: true },
    openGraph: {
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [{ url: resolveOgImage(), alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
    },
    publisher: SITE_NAME,
    icons: {
      icon: DEFAULT_OG_IMAGE,
    },
  };
}
