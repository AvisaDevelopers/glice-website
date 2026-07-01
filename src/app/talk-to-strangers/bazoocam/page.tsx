import { PremiumSeoLandingPage } from "@/components/marketing/seo/premium-seo-landing-page";
import { seoMetadata } from "@/content/seo/metadata";
import { bazoocamPage } from "@/content/seo/pages";

export const metadata = seoMetadata(bazoocamPage);

export default function BazoocamAlternativePage() {
  return <PremiumSeoLandingPage content={bazoocamPage} />;
}
