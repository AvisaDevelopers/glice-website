import { LegalDocument } from "@/components/legal/legal-document";
import { MarketingPageJsonLd } from "@/components/seo/marketing-page-json-ld";
import { buildPageMetadata } from "@/lib/seo/build-metadata";

const SEO = {
  title: "Terms & Conditions for Glice Video Chat Platform",
  description:
    "Glice terms and conditions for using our live video chat app and website. User responsibilities, content rules, and service guidelines.",
  path: "/terms-and-conditions",
  pageName: "Terms & Conditions",
  keywords: [
    "glice terms",
    "terms and conditions",
    "video chat rules",
    "app usage policy",
    "user agreement",
    "service guidelines",
    "platform rules",
  ],
} as const;

export const metadata = buildPageMetadata(SEO);

export default function TermsPage() {
  return (
    <>
      <MarketingPageJsonLd {...SEO} />
      <LegalDocument
        title="Terms & Conditions."
        description="The rules and guidelines for using Glice services."
        chips={[
          { icon: "ri-time-line", label: "Updated February 17, 2026" },
          { icon: "ri-file-list-3-line", label: "Legal agreement" },
        ]}
        contentFile="terms-and-conditions.html"
      />
    </>
  );
}
