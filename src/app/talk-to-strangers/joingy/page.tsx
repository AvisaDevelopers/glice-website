import { PremiumSeoLandingPage } from "@/components/marketing/seo/premium-seo-landing-page";
import { seoMetadata } from "@/content/seo/metadata";
import { joingyPage } from "@/content/seo/pages";

export const metadata = seoMetadata(joingyPage);

export default function JoingyAlternativePage() {
  return <PremiumSeoLandingPage content={joingyPage} />;
}
