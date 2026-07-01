import { PremiumSeoLandingPage } from "@/components/marketing/seo/premium-seo-landing-page";
import { seoMetadata } from "@/content/seo/metadata";
import { chatAvenuePage } from "@/content/seo/pages";

export const metadata = seoMetadata(chatAvenuePage);

export default function ChatAvenueAlternativePage() {
  return <PremiumSeoLandingPage content={chatAvenuePage} />;
}
