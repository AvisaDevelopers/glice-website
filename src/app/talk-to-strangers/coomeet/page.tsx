import { PremiumSeoLandingPage } from "@/components/marketing/seo/premium-seo-landing-page";
import { seoMetadata } from "@/content/seo/metadata";
import { coomeetPage } from "@/content/seo/pages";

export const metadata = seoMetadata(coomeetPage);

export default function CoomeetAlternativePage() {
  return <PremiumSeoLandingPage content={coomeetPage} />;
}
