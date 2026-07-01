import { PremiumSeoLandingPage } from "@/components/marketing/seo/premium-seo-landing-page";
import { seoMetadata } from "@/content/seo/metadata";
import { ometvPage } from "@/content/seo/pages";

export const metadata = seoMetadata(ometvPage);

export default function OmeTvAlternativePage() {
  return <PremiumSeoLandingPage content={ometvPage} />;
}
