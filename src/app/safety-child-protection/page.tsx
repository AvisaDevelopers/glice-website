import { LegalDocument } from "@/components/legal/legal-document";
import { MarketingPageJsonLd } from "@/components/seo/marketing-page-json-ld";
import { buildPageMetadata } from "@/lib/seo/build-metadata";

const SEO = {
  title: "Child Safety — Glice Minor Protection Policies",
  description:
    "Glice child safety and minor protection policies. Age verification, 18+ requirements, reporting procedures, and zero tolerance for child exploitation.",
  path: "/safety-child-protection",
  pageName: "Child Safety",
  keywords: [
    "child safety",
    "minor protection",
    "glice child policy",
    "18+ video chat",
    "age verification",
    "child exploitation reporting",
    "youth safety",
  ],
} as const;

export const metadata = buildPageMetadata(SEO);

export default function ChildSafetyPage() {
  return (
    <>
      <MarketingPageJsonLd {...SEO} />
      <LegalDocument
        title="Child Safety."
        description="How Glice protects minors and responds to child safety concerns."
        chips={[
          { icon: "ri-shield-user-line", label: "Child protection" },
          { icon: "ri-alarm-warning-line", label: "Zero tolerance" },
        ]}
        contentFile="safety-child-protection.html"
      />
    </>
  );
}
