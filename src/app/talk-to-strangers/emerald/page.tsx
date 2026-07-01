import { PremiumSeoLandingPage } from "@/components/marketing/seo/premium-seo-landing-page";
import { seoMetadata } from "@/content/seo/metadata";
import { emeraldChatPage } from "@/content/seo/pages";

export const metadata = seoMetadata(emeraldChatPage);

export default function EmeraldChatAlternativePage() {
  return <PremiumSeoLandingPage content={emeraldChatPage} />;
}
