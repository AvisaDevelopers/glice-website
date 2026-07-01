import { PremiumSeoLandingPage } from "@/components/marketing/seo/premium-seo-landing-page";
import { seoMetadata } from "@/content/seo/metadata";
import { chatroulettePage } from "@/content/seo/pages";

export const metadata = seoMetadata(chatroulettePage);

export default function ChatrouletteAlternativePage() {
  return <PremiumSeoLandingPage content={chatroulettePage} />;
}
