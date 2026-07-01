import { ContactPageContent } from "@/components/contact/contact-page-content";
import { MarketingPageJsonLd } from "@/components/seo/marketing-page-json-ld";
import { buildPageMetadata } from "@/lib/seo/build-metadata";

const SEO = {
  title: "Contact Glice — Support, Help & Partnerships",
  description:
    "Contact Glice for video chat support, safety reports, press inquiries, and partnership opportunities. We respond to every message.",
  path: "/contact",
  pageName: "Contact",
  keywords: [
    "contact glice",
    "glice support",
    "video chat help",
    "glice partnership",
    "customer support",
    "safety reports",
    "press inquiries",
  ],
} as const;

export const metadata = buildPageMetadata(SEO);

export default function ContactPage() {
  return (
    <>
      <MarketingPageJsonLd {...SEO} />
      <ContactPageContent />
    </>
  );
}
