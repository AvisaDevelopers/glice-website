import { LegalDocument } from "@/components/legal/legal-document";
import { MarketingPageJsonLd } from "@/components/seo/marketing-page-json-ld";
import { buildPageMetadata } from "@/lib/seo/build-metadata";

const SEO = {
  title: "Community Guidelines — Respect & Safety on Glice",
  description:
    "Glice community guidelines for respectful video chat, mutual matching, and messaging. Standards for behavior, consent, and account enforcement.",
  path: "/community-guidelines",
  pageName: "Community Guidelines",
  keywords: [
    "glice community guidelines",
    "chat safety rules",
    "respectful behavior",
    "video chat standards",
    "consent-first chat",
    "account enforcement",
    "community standards",
  ],
} as const;

export const metadata = buildPageMetadata(SEO);

export default function CommunityGuidelinesPage() {
  return (
    <>
      <MarketingPageJsonLd {...SEO} />
      <LegalDocument
        title="Community Guidelines."
        description="How we keep Glice respectful, safe, and consent-first for everyone."
        chips={[
          { icon: "ri-group-line", label: "Community standards" },
          { icon: "ri-shield-check-line", label: "Safety first" },
        ]}
        contentFile="community-guidelines.html"
      />
    </>
  );
}
