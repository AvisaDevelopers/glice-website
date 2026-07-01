import { PremiumSeoLandingPage } from "@/components/marketing/seo/premium-seo-landing-page";
import { seoMetadata } from "@/content/seo/metadata";
import { randomChatPage } from "@/content/seo/pages";

export const metadata = seoMetadata(randomChatPage);

export default function RandomChatPage() {
  return <PremiumSeoLandingPage content={randomChatPage} />;
}
