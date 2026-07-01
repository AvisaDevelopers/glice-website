import { PremiumSeoLandingPage } from "@/components/marketing/seo/premium-seo-landing-page";
import { seoMetadata } from "@/content/seo/metadata";
import { y99Page } from "@/content/seo/pages";

export const metadata = seoMetadata(y99Page);

export default function Y99AlternativePage() {
  return <PremiumSeoLandingPage content={y99Page} />;
}
