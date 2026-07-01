import { LegalDocument } from "@/components/legal/legal-document";
import { MarketingPageJsonLd } from "@/components/seo/marketing-page-json-ld";
import { buildPageMetadata } from "@/lib/seo/build-metadata";

const SEO = {
  title: "Privacy Policy — How Glice Protects Your Data",
  description:
    "Read Glice's privacy policy: how we collect, use, store, and protect your personal data, video chat activity, and account information.",
  path: "/privacy-policy",
  pageName: "Privacy Policy",
  keywords: [
    "glice privacy policy",
    "data protection",
    "video chat privacy",
    "user data safety",
    "personal information",
    "account privacy",
    "gdpr compliance",
  ],
} as const;

export const metadata = buildPageMetadata(SEO);

export default function PrivacyPolicyPage() {
  return (
    <>
      <MarketingPageJsonLd {...SEO} />
      <LegalDocument
        title="Privacy Policy."
        description="How we collect, use, and safeguard your information when you use Glice."
        chips={[
          { icon: "ri-time-line", label: "Updated February 17, 2026" },
          { icon: "ri-shield-check-line", label: "12 sections" },
        ]}
        contentFile="privacy-policy.html"
      />
    </>
  );
}
