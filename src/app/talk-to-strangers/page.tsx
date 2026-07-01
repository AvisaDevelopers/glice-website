import { PremiumSeoLandingPage } from "@/components/marketing/seo/premium-seo-landing-page";
import { seoMetadata } from "@/content/seo/metadata";
import { hubPage } from "@/content/seo/pages";

export const metadata = seoMetadata(hubPage);

export default function TalkToStrangersHubPage() {
  return <PremiumSeoLandingPage content={hubPage} />;
}
