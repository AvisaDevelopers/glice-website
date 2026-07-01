import { FeatureRow } from "@/components/marketing/feature-row";
import { MarketingCta } from "@/components/marketing/marketing-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingPageJsonLd } from "@/components/seo/marketing-page-json-ld";
import { buildPageMetadata } from "@/lib/seo/build-metadata";

const SEO = {
  title: "Glice Features — Random Video Chat, Match & Safety",
  description:
    "Explore Glice features: random live video calls, mutual matching, nearby discovery, real-time chat, profile cards, and built-in safety tools.",
  path: "/features",
  pageName: "Features",
  keywords: [
    "glice features",
    "random live video",
    "mutual matching",
    "nearby discovery",
    "video chat safety",
    "stranger chat app",
    "profile cards",
    "real-time chat",
  ],
} as const;

export const metadata = buildPageMetadata(SEO);

const FEATURES = [
  {
    icon: "ri-vidicon-line",
    title: "Random live video calls",
    description:
      "Start real-time video calls in seconds and meet new people naturally. Every session is random, fast, and built for human-first interaction instead of endless swiping.",
    bullets: [
      "Instant camera-to-camera connections",
      "Randomized pairing for genuine discovery",
      "Clear post-call actions: like, super like, skip",
      "Smooth session transitions",
    ],
    image: "/icons/feature_images/7.png",
    imageAlt: "Glice random live video call screen",
  },
  {
    icon: "ri-user-heart-line",
    title: "Mutual match system",
    description:
      "Messaging opens only after both people show interest. This mutual-like model reduces spam and keeps conversations consent-based from the start.",
    bullets: [
      "Like / Super Like / Skip after interactions",
      "Chat unlocks only with two-way interest",
      "No unsolicited messaging from strangers",
      "Higher quality matches with less noise",
    ],
    image: "/icons/feature_images/5.png",
    imageAlt: "Glice mutual match and chat unlock flow",
    reverse: true,
  },
  {
    icon: "ri-layout-grid-line",
    title: "Profile card discovery",
    description:
      "Explore people through cards on the home screen with direct actions instead of aggressive swipe mechanics. The experience is simple, focused, and intentional.",
    bullets: [
      "Quick actions: Like, Super Like, Skip",
      "Card-first browsing for easy decisions",
      "Built for both local and global discovery",
      "No forced swipe loop",
    ],
    image: "/icons/feature_images/2.png",
    imageAlt: "Glice profile cards and discovery interface",
  },
  {
    icon: "ri-chat-check-line",
    title: "Real-time chat after match",
    description:
      "Once a match is mutual, users can continue with direct chat. Messaging supports text and image sharing, while moderation tools help maintain respectful communication.",
    bullets: [
      "Text and image messaging",
      "Mutual consent gate before chat opens",
      "Block and report available in chat",
      "Conversation controls at user level",
    ],
    image: "/icons/feature_images/8.png",
    imageAlt: "Glice real-time chat interface",
    reverse: true,
  },
  {
    icon: "ri-map-pin-2-line",
    title: "Nearby users, smart local discovery",
    description:
      "Glice uses in-app location signals to highlight people around you, helping users build local connections while keeping location handling privacy-conscious.",
    bullets: [
      "Distance-aware matching",
      "Nearby suggestions in meters or kilometers",
      "Location used for matching context only",
      "Balanced local and broader discovery",
    ],
    image: "/icons/feature_images/3.png",
    imageAlt: "Glice nearby users and location discovery view",
  },
  {
    icon: "ri-user-settings-line",
    title: "Profile setup and personalization",
    description:
      "Users can personalize profiles with photos and core details to improve match quality. Media access is user-initiated, keeping profile setup clear and permission-based.",
    bullets: [
      "Gallery-selected photo uploads",
      "Editable display name and basics",
      "Simple profile management",
      "User-controlled media permissions",
    ],
    image: "/icons/feature_images/6.png",
    imageAlt: "Glice profile setup and customization screen",
    reverse: true,
  },
] as const;

export default function FeaturesPage() {
  return (
    <>
      <MarketingPageJsonLd {...SEO} />
      <PageHero
        title={
          <>
            Live social discovery,
            <br />
            end to end.
          </>
        }
        description="Six tightly-designed features that turn random video into mutual matches and meaningful conversations."
      />

      <section className="section pt-12">
        <div className="page-container space-y-32">
          {FEATURES.map((feature) => (
            <FeatureRow key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="page-container">
          <div className="reveal mb-16 text-center">
            <h2 className="display-2 balance mt-4">How connections happen.</h2>
          </div>

          <div className="relative">
            <div className="absolute top-[48px] right-[10%] left-[10%] hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent md:block" />
            <div className="pointer-events-none absolute top-[40px] right-[10%] left-[10%] hidden justify-between md:flex">
              <div className="h-4 w-4 rounded-full border border-white/10 bg-background" />
              <div className="h-4 w-4 rounded-full border border-white/10 bg-background" />
              <div className="h-4 w-4 rounded-full border border-white/10 bg-background" />
            </div>

            <div className="grid gap-12 md:grid-cols-3 md:gap-8">
              {[
                [
                  "ri-user-add-line",
                  "1. Set up profile",
                  "Create your profile with photos and basic details so others can discover you.",
                ],
                [
                  "ri-live-line",
                  "2. Connect live",
                  "Join random video sessions or discover people via cards and nearby suggestions.",
                ],
                [
                  "ri-chat-4-line",
                  "3. Match & chat",
                  "When interest is mutual, chat unlocks so conversations stay consent-based.",
                ],
              ].map(([icon, title, text]) => (
                <div key={title} className="reveal text-center md:pt-24">
                  <div className="step-num mx-auto mb-5">
                    <i className={`${icon} text-xl`} />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{title}</h3>
                  <p className="mx-auto max-w-xs text-sm leading-relaxed text-textMuted">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MarketingCta
        title="Experience the Glice difference."
        description="Join thousands waiting to connect through live video, mutual matching, and safer conversations."
      />
    </>
  );
}
