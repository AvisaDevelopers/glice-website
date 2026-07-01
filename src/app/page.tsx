import { HomeVideoDeepLink } from "@/components/home/home-video-deeplink";
import { HomeSections } from "@/components/home/home-sections";
import { MarketingPageJsonLd } from "@/components/seo/marketing-page-json-ld";
import { VideoHero } from "@/components/video/video-hero";
import { buildPageMetadata } from "@/lib/seo/build-metadata";

const SEO = {
  title: "Glice — Live Random Video Chat & Real Connections",
  description:
    "Glice is a live random video chat and social discovery app with mutual matching, nearby discovery, and safer conversations worldwide.",
  path: "/",
  pageName: "Home",
  keywords: [
    "glice",
    "random video chat",
    "talk to strangers",
    "live video chat",
    "omegle alternative",
    "social discovery",
    "mutual matching",
    "nearby discovery",
  ],
} as const;

export const metadata = buildPageMetadata(SEO);

export default function HomePage() {
  return (
    <>
      <MarketingPageJsonLd {...SEO} />
      <HomeVideoDeepLink />
      <VideoHero />
      <HomeSections />
    </>
  );
}
