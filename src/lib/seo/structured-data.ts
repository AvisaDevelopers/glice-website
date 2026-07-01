import type { SeoFaqItem } from "@/content/seo/types";
import { SITELINK_PATHS } from "./routes";
import {
  absoluteUrl,
  AGGREGATE_RATING,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_TAGLINE,
} from "./site-config";

type JsonLdObject = Record<string, unknown>;

function withContext(type: string, data: JsonLdObject): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };
}

export function buildOrganizationSchema(): JsonLdObject {
  return withContext("Organization", {
    name: SITE_NAME,
    url: absoluteUrl("/"),
    logo: absoluteUrl(DEFAULT_OG_IMAGE),
    description: SITE_TAGLINE,
  });
}

export function buildWebSiteSchema(): JsonLdObject {
  const sitelinks = SITELINK_PATHS.map((path, index) => ({
    "@type": "WebPage",
    position: index + 1,
    name: path.split("/").pop()?.replace(/-/g, " ") ?? SITE_NAME,
    url: absoluteUrl(path),
  }));

  return withContext("WebSite", {
    name: SITE_NAME,
    url: absoluteUrl("/"),
    description: SITE_TAGLINE,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absoluteUrl("/talk-to-strangers")}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    hasPart: {
      "@type": "ItemList",
      itemListElement: sitelinks,
    },
  });
}

export function buildSoftwareApplicationSchema(
  pageUrl: string,
  pageName: string,
): JsonLdObject {
  return withContext("SoftwareApplication", {
    name: SITE_NAME,
    applicationCategory: "SocialNetworkingApplication",
    operatingSystem: "Android",
    url: pageUrl,
    description: pageName,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: AGGREGATE_RATING.ratingValue,
      ratingCount: AGGREGATE_RATING.ratingCount,
      bestRating: AGGREGATE_RATING.bestRating,
    },
  });
}

export function buildFaqPageSchema(faq: SeoFaqItem[]): JsonLdObject | null {
  if (faq.length === 0) {
    return null;
  }

  return withContext("FAQPage", {
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  });
}

export function buildBreadcrumbSchema(
  items: { name: string; path: string }[],
): JsonLdObject {
  return withContext("BreadcrumbList", {
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  });
}

export function buildWebPageSchema(
  path: string,
  title: string,
  description: string,
): JsonLdObject {
  return withContext("WebPage", {
    name: title,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
  });
}

export function buildSeoLandingSchemas(content: {
  path: string;
  label: string;
  metadata: { title: string; description: string };
  faq: SeoFaqItem[];
}): JsonLdObject[] {
  const pageUrl = absoluteUrl(content.path);
  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Talk to Strangers", path: "/talk-to-strangers" },
    { name: content.label, path: content.path },
  ]);
  const webPage = buildWebPageSchema(
    content.path,
    content.metadata.title,
    content.metadata.description,
  );
  const app = buildSoftwareApplicationSchema(pageUrl, content.metadata.title);
  const faq = buildFaqPageSchema(content.faq);

  return faq ? [webPage, breadcrumbs, app, faq] : [webPage, breadcrumbs, app];
}

export function buildHomeSchemas(): JsonLdObject[] {
  return [buildOrganizationSchema(), buildWebSiteSchema()];
}

export function buildMarketingPageSchemas(
  path: string,
  title: string,
  description: string,
  pageName: string,
): JsonLdObject[] {
  const webPage = buildWebPageSchema(path, title, description);

  if (path === "/") {
    return [webPage];
  }

  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: pageName, path },
  ]);

  return [webPage, breadcrumbs];
}
