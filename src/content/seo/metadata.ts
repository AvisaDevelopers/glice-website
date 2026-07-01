import type { Metadata } from "next";
import type { SeoPageContent } from "./types";
import { buildSeoPageMetadata } from "@/lib/seo/build-metadata";

export function seoMetadata(content: SeoPageContent): Metadata {
  return buildSeoPageMetadata(content);
}
