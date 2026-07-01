import type { SeoFaqItem } from "./types";

export type OmegleFeatureItem = {
  icon: string;
  title: string;
  description: string;
};

export type OmeglePageSeoContent = {
  heroBanner: {
    title: string;
    paragraphs: string[];
  };
  modernExperience: {
    eyebrow: string;
    title: string;
    description: string;
    features: OmegleFeatureItem[];
  };
  featuresGrid: {
    title: string;
    subtitle: string;
    items: OmegleFeatureItem[];
  };
  safety: {
    title: string;
    description: string;
    bullets: string[];
  };
  whyGlice: {
    title: string;
    subtitle: string;
    cards: OmegleFeatureItem[];
  };
  faq: SeoFaqItem[];
  cta: {
    title: string;
    description: string;
    primaryLabel: string;
    secondaryLabel: string;
  };
};

export const omeglePageSeoContent: OmeglePageSeoContent = {
  heroBanner: {
    title: "Glice: A Safe Omegle Alternative for 2026",
    paragraphs: [
      "Omegle defined random video chat for a generation — spontaneous conversations with strangers from anywhere in the world. When the original platform shut down, millions of people still wanted that same thrill: tap in, get paired, and see where the conversation goes.",
      "Glice carries forward the spirit of random live video while rebuilding the experience for mobile, moderation, and mutual consent. You still meet strangers in real time, but follow-up chat only happens when both people choose to connect. That is the difference between legacy random chat and a platform built for today.",
      "This page lets you try Glice's Omegle-style pairing right in your browser. Confirm you are 18+, press Start, and you are live. For the full experience — filters, matching, and in-app safety tools — download Glice on Google Play.",
    ],
  },
  modernExperience: {
    eyebrow: "Modern experience",
    title: "Random video chat, rebuilt for how people connect now",
    description:
      "Glice keeps the fast, unpredictable energy of classic Omegle while adding design choices that reduce harassment and make every session feel intentional.",
    features: [
      {
        icon: "ri-vidicon-line",
        title: "Instant random pairing",
        description:
          "One tap connects you with a new stranger through live video — no lengthy sign-up flows before your first conversation.",
      },
      {
        icon: "ri-skip-forward-line",
        title: "Skip anytime",
        description:
          "Not feeling the vibe? Move on immediately. You control the pace of every session without awkward exits.",
      },
      {
        icon: "ri-smartphone-line",
        title: "Mobile-first design",
        description:
          "Glice is built as a native app with quick actions, stable connections, and a UI that works on the device you actually use.",
      },
      {
        icon: "ri-global-line",
        title: "Meet people worldwide",
        description:
          "Talk to strangers across countries and time zones. Every session is a chance to hear a new perspective.",
      },
    ] satisfies OmegleFeatureItem[],
  },
  featuresGrid: {
    title: "Why people choose Glice over other Omegle alternatives",
    subtitle:
      "Not every random chat app is the same. Here is what sets Glice apart when you want live video with strangers.",
    items: [
      {
        icon: "ri-user-heart-line",
        title: "Mutual matching before messaging",
        description:
          "A great random call can turn into an ongoing chat — but only when both people express interest. No one-sided DMs from strangers you never wanted to hear from.",
      },
      {
        icon: "ri-shield-check-line",
        title: "18+ community standards",
        description:
          "Glice is an adult-only platform with clear rules, report workflows, and moderation designed to keep sessions respectful.",
      },
      {
        icon: "ri-flag-2-line",
        title: "Report and block tools",
        description:
          "See something that crosses the line? Flag it in-app. Our team reviews reports and takes action against accounts that break community guidelines.",
      },
      {
        icon: "ri-lock-line",
        title: "Privacy by design",
        description:
          "We do not sell your conversations. Session data is handled with care, and you decide how much you share on camera.",
      },
      {
        icon: "ri-chat-smile-2-line",
        title: "Text and video in one place",
        description:
          "Start on live video and continue in chat when you match. One app for the full journey from stranger to connection.",
      },
      {
        icon: "ri-refresh-line",
        title: "Always someone new",
        description:
          "The queue refreshes constantly. Whether you want a quick laugh or a deeper conversation, the next stranger is one tap away.",
      },
    ] satisfies OmegleFeatureItem[],
  },
  safety: {
    title: "Safety first — because random chat should not mean risky chat",
    description:
      "Omegle's legacy included real problems: underage users, harassment, and little recourse when things went wrong. Glice was designed with those lessons in mind.",
    bullets: [
      "Adult-only platform — users must confirm they are 18+ before starting a session",
      "In-session reporting so you can flag inappropriate behavior immediately",
      "Mutual matching prevents unwanted follow-up messages after you skip",
      "Community guidelines enforced with account review and removal",
      "No affiliation with Omegle — Glice is an independent product with its own standards",
    ],
  },
  whyGlice: {
    title: "Making new connections on your terms",
    subtitle:
      "Four pillars that shape every Glice session — whether you are here for five minutes or building lasting friendships.",
    cards: [
      {
        icon: "ri-eye-off-line",
        title: "Privacy controls",
        description:
          "You choose what to show on camera and when to move on. Skip freely without explaining yourself to anyone.",
      },
      {
        icon: "ri-heart-2-line",
        title: "Interest-based matching",
        description:
          "Optional filters help pair you with people who share similar vibes, so random does not have to mean random chaos.",
      },
      {
        icon: "ri-group-line",
        title: "DUO mode",
        description:
          "Bring a friend and meet new people together. DUO sessions add a social layer to random video chat.",
      },
      {
        icon: "ri-community-line",
        title: "Growing community",
        description:
          "Join thousands of adults who use Glice daily for spontaneous conversations, practice languages, or simply pass the time.",
      },
    ] satisfies OmegleFeatureItem[],
  },
  faq: [
    {
      question: "Is Glice the same as Omegle?",
      answer:
        "No. Glice is a separate product built after Omegle shut down. It offers random live video chat with strangers but adds mutual matching, mobile apps, moderation, and stricter 18+ standards. Glice is not affiliated with Omegle or its creators.",
    },
    {
      question: "Why are people looking for Omegle alternatives in 2026?",
      answer:
        "When Omegle closed, users still wanted spontaneous video conversations with strangers. Many alternatives appeared, but few combined fast pairing with consent-based follow-up and real safety tools. Glice was built to fill that gap.",
    },
    {
      question: "Is this Omegle alternative free to use?",
      answer:
        "Yes — Glice is free to download on Google Play with core random video features available at no cost. Optional in-app purchases may exist for premium capabilities. Check the store listing for current details.",
    },
    {
      question: "Do I need to create an account to start chatting?",
      answer:
        "You can try browser-based pairing on this page after confirming you are 18+. The full Glice app offers account features, matching history, and additional safety tools for a richer experience.",
    },
    {
      question: "How does Glice keep conversations safe?",
      answer:
        "Glice enforces adult-only use, provides in-session reporting, requires mutual interest before private messaging, and reviews flagged accounts against community guidelines. You can skip or report any session that makes you uncomfortable.",
    },
    {
      question: "Can I use Glice on my phone?",
      answer:
        "Absolutely. Glice is designed for mobile first. Download the Android app from Google Play for the best performance, filters, and safety features alongside random live video.",
    },
  ] satisfies SeoFaqItem[],
  cta: {
    title: "Ready to meet someone new?",
    description:
      "Start a random video chat right here, or download Glice for the full mobile experience with matching, DUO mode, and in-app safety tools.",
    primaryLabel: "Get Glice on Google Play",
    secondaryLabel: "Start video chat above",
  },
};
