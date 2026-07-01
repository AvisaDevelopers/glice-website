import { PremiumSeoLandingPage } from "@/components/marketing/seo/premium-seo-landing-page";
import { seoMetadata } from "@/content/seo/metadata";
import { monkeyAlternativePage } from "@/content/seo/pages";

export const metadata = seoMetadata(monkeyAlternativePage);

export default function MonkeyAlternativePage() {
  return <PremiumSeoLandingPage content={monkeyAlternativePage} />;
}
