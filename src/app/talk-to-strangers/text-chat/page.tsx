import { PremiumSeoLandingPage } from "@/components/marketing/seo/premium-seo-landing-page";
import { seoMetadata } from "@/content/seo/metadata";
import { textChatPage } from "@/content/seo/pages";

export const metadata = seoMetadata(textChatPage);

export default function TextChatPage() {
  return <PremiumSeoLandingPage content={textChatPage} />;
}
