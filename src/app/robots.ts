import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/site-config";
import { NOINDEX_ROUTES } from "@/lib/seo/routes";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...NOINDEX_ROUTES],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
