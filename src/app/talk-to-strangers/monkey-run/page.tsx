import { PremiumSeoLandingPage } from "@/components/marketing/seo/premium-seo-landing-page";
import { seoMetadata } from "@/content/seo/metadata";
import { monkeyRunPage } from "@/content/seo/pages";

export const metadata = seoMetadata(monkeyRunPage);

export default function MonkeyRunAlternativePage() {
  return <PremiumSeoLandingPage content={monkeyRunPage} />;
}
