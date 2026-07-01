import { enrichPremiumPage } from "./premium-shared";
import type { SeoPageContent } from "./types";

const COMPETITOR_BY_SLUG: Record<string, string> = {
  hub: "Legacy Chat Sites",
  coomeet: "Coomeet",
  y99: "Y99",
  chatroulette: "Chatroulette",
  bazoocam: "Bazoocam",
  ometv: "OmeTV",
  joingy: "Joingy",
  emerald: "Emerald Chat",
  "text-chat": "Text-Only Chat",
  "random-chat": "Random Chat Apps",
  "monkey-run": "Monkey Run",
  "chat-avenue": "Chat Avenue",
  "monkey-app": "Monkey",
};

const hubPageBase: SeoPageContent = {
  slug: "hub",
  path: "/talk-to-strangers",
  label: "Talk to Strangers",
  variant: "dark",
  metadata: {
    title: "Talk to Strangers Online — Free Live Video Chat 2026",
    description:
      "Free talk to strangers on Glice. Live random video chat, mutual matching & 18+ safety. Meet new people face-to-face — start now.",
    keywords: [
      "talk to strangers",
      "random video chat",
      "free video chat",
      "meet strangers online",
      "live video chat 2026",
      "stranger chat",
      "Glice",
    ],
  },
  hero: {
    title: "Talk to strangers online, safely.",
    description:
      "Glice connects you with real people through live video. Mutual matching means chat only opens when both sides are interested — no cold messages, no spam.",
  },
  benefits: [
    {
      icon: "ri-vidicon-line",
      title: "Live video discovery",
      description:
        "Start a random video session in seconds and meet someone new face-to-face. Skip, like, or super like after each call to keep control of your flow.",
    },
    {
      icon: "ri-user-heart-line",
      title: "Mutual match before chat",
      description:
        "Messaging unlocks only when both people show interest. That consent gate keeps conversations respectful from the first hello.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Built-in safety tools",
      description:
        "Report, block, and moderation workflows are available throughout the app. Glice is 18+ only with active review of flagged accounts.",
    },
    {
      icon: "ri-map-pin-2-line",
      title: "Nearby and global reach",
      description:
        "Discover people around you or connect across borders. Location is used for matching context — not sold or shared with third parties.",
    },
  ],
  faq: [
    {
      question: "Is Glice free to talk to strangers?",
      answer:
        "Glice is free to download on Google Play. Core live video and matching features are available in-app. Optional in-app purchases may apply for premium features.",
    },
    {
      question: "Do I need an account to start?",
      answer:
        "Yes. Creating a profile helps verify you are 18+ and gives you access to match history, chat, and safety controls like block and report.",
    },
    {
      question: "How is Glice different from old random chat sites?",
      answer:
        "Glice uses mutual matching instead of anonymous one-way messaging. Video sessions are live and consent-based, with moderation tools built into every interaction.",
    },
  ],
  cta: {
    title: "Start talking to strangers on Glice.",
    description:
      "Download the app and join live video discovery with mutual matching and safer conversations.",
  },
};

export const hubPage = enrichPremiumPage(hubPageBase, COMPETITOR_BY_SLUG.hub);

const coomeetPageBase: SeoPageContent = {
  slug: "coomeet",
  path: "/talk-to-strangers/coomeet",
  label: "Coomeet Alternative",
  variant: "dark",
  metadata: {
    title: "Coomeet Alternative 2026 — Free Random Video Chat",
    description:
      "Free Coomeet alternative on Glice. Random live video chat with strangers, mutual matching & 18+ safety. Start talking now.",
    keywords: [
      "coomeet alternative",
      "coomeet alternative 2026",
      "random video chat",
      "talk to strangers",
      "free video chat",
      "Glice",
    ],
  },
  hero: {
    title: "A Coomeet alternative with mutual matching.",
    description:
      "If you want random live video without the noise of one-way outreach, Glice pairs consent-first discovery with report and block tools on every session.",
  },
  benefits: [
    {
      icon: "ri-live-line",
      title: "Random live video",
      description:
        "Connect camera-to-camera in real time. Each session is randomized so you meet genuine people, not endless profile loops.",
    },
    {
      icon: "ri-chat-check-line",
      title: "Chat after mutual interest",
      description:
        "Unlike platforms where anyone can message you, Glice requires two-way interest before chat opens — reducing spam and unwanted contact.",
    },
    {
      icon: "ri-shield-star-line",
      title: "18+ community standards",
      description:
        "Glice enforces adult-only use. Suspected underage accounts are reviewed and removed according to our community guidelines.",
    },
    {
      icon: "ri-flag-line",
      title: "One-tap report and block",
      description:
        "Leave any session instantly and flag behavior that violates our rules. Moderation reviews reports and takes action when needed.",
    },
  ],
  faq: [
    {
      question: "Can Glice replace Coomeet for video chat?",
      answer:
        "Glice is a live social discovery app with random video and mutual matching. It is designed for adults 18+ who want consent-based connections rather than anonymous mass messaging.",
    },
    {
      question: "Does Glice support filters or gender selection?",
      answer:
        "Glice focuses on randomized discovery with optional nearby matching. Specific filter features may vary — check the app for current availability.",
    },
    {
      question: "Is my video call private on Glice?",
      answer:
        "Sessions are between matched participants in real time. Always follow our safety tips, never share personal financial details, and use block/report if someone makes you uncomfortable.",
    },
  ],
  cta: {
    title: "Try Glice as your Coomeet alternative.",
    description: "Download on Google Play and start live video discovery with mutual matching today.",
  },
};

export const coomeetPage = enrichPremiumPage(
  coomeetPageBase,
  COMPETITOR_BY_SLUG.coomeet,
);

const y99PageBase: SeoPageContent = {
  slug: "y99",
  path: "/talk-to-strangers/y99",
  label: "Y99 Alternative",
  variant: "dark",
  metadata: {
    title: "Y99 Alternative 2026 — Free Live Random Video Chat",
    description:
      "Free Y99 alternative on Glice. Live random video chat with strangers, mutual matching & 18+ moderation. Meet someone new now.",
    keywords: [
      "y99 alternative",
      "y99 chat alternative",
      "random chat strangers",
      "video chat",
      "free chat",
      "Glice",
    ],
  },
  hero: {
    title: "Y99 alternative with video and consent.",
    description:
      "Move beyond text-only rooms. Glice adds live video discovery and a mutual-like gate so conversations start only when both people opt in.",
  },
  benefits: [
    {
      icon: "ri-vidicon-line",
      title: "Video-first social discovery",
      description:
        "See and hear the person you are talking to in real time. Video adds context that text-only chat rooms often miss.",
    },
    {
      icon: "ri-user-heart-line",
      title: "No unsolicited inbox",
      description:
        "Glice does not open messaging until interest is mutual. That design cuts down on the random DM spam common on legacy chat sites.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Active moderation",
      description:
        "Reports are reviewed by our team. Repeated violations can lead to restrictions or account removal to keep the community safer.",
    },
    {
      icon: "ri-layout-grid-line",
      title: "Profile cards and nearby",
      description:
        "Browse discovery cards or find people near you. Multiple paths to meet strangers without a single crowded public room.",
    },
  ],
  faq: [
    {
      question: "Is Glice better than Y99 for meeting strangers?",
      answer:
        "Glice is built for live video and mutual matching rather than anonymous text rooms. If you prefer face-to-face discovery with consent gates, Glice may be a better fit.",
    },
    {
      question: "Can I use Glice without sharing my location?",
      answer:
        "Location powers optional nearby discovery. You control app permissions on your device. Review our Privacy Policy for how location data is handled.",
    },
    {
      question: "What age do I need to use Glice?",
      answer:
        "Glice is strictly 18+. Accounts suspected of being underage are removed after review.",
    },
  ],
  cta: {
    title: "Discover a smarter Y99 alternative.",
    description: "Get Glice on Google Play and meet strangers through live video with mutual matching.",
  },
};

export const y99Page = enrichPremiumPage(y99PageBase, COMPETITOR_BY_SLUG.y99);

const chatroulettePageBase: SeoPageContent = {
  slug: "chatroulette",
  path: "/talk-to-strangers/chatroulette",
  label: "Chatroulette Alternative",
  variant: "dark",
  metadata: {
    title: "Chatroulette Alt 2026 — Free Safe Random Video Chat",
    description:
      "Free Chatroulette alternative on Glice. Random live video chat, skip anytime & mutual matching. Safer stranger chat starts here.",
    keywords: [
      "chatroulette alternative",
      "random video chat",
      "roulette chat",
      "talk to strangers",
      "free video chat",
      "Glice",
    ],
  },
  hero: {
    title: "Chatroulette alternative, rethought for consent.",
    description:
      "Random video pairing stays — but Glice adds mutual matching, profile context, and safety tools so you are not stuck in a loop of bad sessions.",
  },
  benefits: [
    {
      icon: "ri-shuffle-line",
      title: "True random pairing",
      description:
        "Tap to join the next live session. Randomized connections keep the surprise of classic roulette-style chat.",
    },
    {
      icon: "ri-skip-forward-line",
      title: "Skip anytime",
      description:
        "Leave a session instantly and move on. You stay in control of who you continue talking to.",
    },
    {
      icon: "ri-user-heart-line",
      title: "Like to unlock chat",
      description:
        "Interested after a call? Like or super like. Chat opens only when the feeling is mutual.",
    },
    {
      icon: "ri-flag-2-line",
      title: "Report bad actors fast",
      description:
        "Flag inappropriate behavior in-app. Our moderation workflow investigates confirmed violations.",
    },
  ],
  faq: [
    {
      question: "How is Glice like Chatroulette?",
      answer:
        "Both offer random live video with strangers. Glice adds mutual matching, persistent profiles, and in-app safety tools that classic browser roulette sites often lack.",
    },
    {
      question: "Can I stay anonymous on Glice?",
      answer:
        "You create a profile with photos and basics to improve match quality. Use a display name you are comfortable with and avoid sharing sensitive personal details on calls.",
    },
    {
      question: "What happens if someone is inappropriate?",
      answer:
        "Skip the session, then block or report the user. Serious or repeated violations can result in account action.",
    },
  ],
  cta: {
    title: "Try the Glice Chatroulette alternative.",
    description: "Random live video with mutual matching — download Glice on Google Play.",
  },
};

export const chatroulettePage = enrichPremiumPage(
  chatroulettePageBase,
  COMPETITOR_BY_SLUG.chatroulette,
);

const bazoocamPageBase: SeoPageContent = {
  slug: "bazoocam",
  path: "/talk-to-strangers/bazoocam",
  label: "Bazoocam Alternative",
  variant: "dark",
  metadata: {
    title: "Bazoocam Alternative 2026 — Free Random Video Chat",
    description:
      "Free Bazoocam alternative on Glice. Random webcam chat with strangers, mutual matching & 18+ safety. Start a live session now.",
    keywords: [
      "bazoocam alternative",
      "webcam chat strangers",
      "random video chat",
      "free video chat",
      "safe chat",
      "Glice",
    ],
  },
  hero: {
    title: "Bazoocam alternative with modern safety.",
    description:
      "Glice brings random webcam chat into a mobile app with mutual matching, moderation, and clear 18+ standards — built for today’s expectations.",
  },
  benefits: [
    {
      icon: "ri-webcam-line",
      title: "Webcam-to-webcam live chat",
      description:
        "Real-time video sessions connect you with strangers instantly. No waiting in crowded lobbies.",
    },
    {
      icon: "ri-chat-check-line",
      title: "Consent-based messaging",
      description:
        "Follow-up chat is not automatic. Both people must like each other before messages can flow.",
    },
    {
      icon: "ri-smartphone-line",
      title: "Mobile-native experience",
      description:
        "Glice is designed for phones first — smooth sessions, quick actions, and on-the-go discovery.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Safety by design",
      description:
        "Block, report, and community guidelines are core to the product — not bolted on after the fact.",
    },
  ],
  faq: [
    {
      question: "Does Glice work like Bazoocam?",
      answer:
        "Glice offers random live video with strangers, similar in spirit to Bazoocam. The key difference is mutual matching and a mobile app experience with stronger safety tooling.",
    },
    {
      question: "Is Glice available on desktop?",
      answer:
        "Glice is currently available on Google Play for Android. Check the app listing for the latest platform support.",
    },
    {
      question: "How do I stay safe on random video chat?",
      answer:
        "Never share passwords, financial info, or exact address. End calls that feel wrong, and use report/block. See our Safety Tips page for more guidance.",
    },
  ],
  cta: {
    title: "Download the Bazoocam alternative adults trust.",
    description: "Glice on Google Play — random video, mutual matching, safer stranger chat.",
  },
};

export const bazoocamPage = enrichPremiumPage(
  bazoocamPageBase,
  COMPETITOR_BY_SLUG.bazoocam,
);

const ometvPageBase: SeoPageContent = {
  slug: "ometv",
  path: "/talk-to-strangers/ometv",
  label: "OmeTV Alternative",
  variant: "dark",
  metadata: {
    title: "#1 OmeTV Alternative 2026 — Free Safe Video Chat",
    description:
      "Free OmeTV alternative on Glice. Random video chat with strangers, mutual matching & 18+ safety. Start talking now.",
    keywords: [
      "ometv alternative",
      "ome tv alternative",
      "random video chat",
      "talk to strangers",
      "free video chat",
      "Glice",
    ],
  },
  hero: {
    title: "OmeTV alternative with mutual match chat.",
    description:
      "Random live video stays fast and fun. Glice adds a mutual-like step so follow-up conversations happen only when both people want them.",
  },
  benefits: [
    {
      icon: "ri-live-line",
      title: "Instant random video",
      description:
        "Join the next available live session in one tap. Random pairing keeps every connection fresh.",
    },
    {
      icon: "ri-user-heart-line",
      title: "Mutual interest gate",
      description:
        "Like or super like after a good call. Chat unlocks when interest goes both ways — cutting unsolicited messages.",
    },
    {
      icon: "ri-map-pin-user-line",
      title: "Nearby discovery option",
      description:
        "Meet strangers globally or explore people closer to your area with privacy-conscious location signals.",
    },
    {
      icon: "ri-flag-line",
      title: "Report and block built in",
      description:
        "Safety tools are always one tap away during and after every session.",
    },
  ],
  faq: [
    {
      question: "Is Glice a good OmeTV replacement?",
      answer:
        "If you want random live video with stronger consent controls and a mutual-match chat model, Glice is built for that experience on mobile.",
    },
    {
      question: "Do I need a webcam?",
      answer:
        "Yes — live video sessions use your device camera and microphone. Grant permissions only when you are ready to connect.",
    },
    {
      question: "What content is not allowed?",
      answer:
        "Harassment, illegal activity, and underage use violate our Community Guidelines. Violations can lead to removal from the platform.",
    },
  ],
  cta: {
    title: "Switch to Glice as your OmeTV alternative.",
    description: "Live random video with mutual matching — available on Google Play.",
  },
};

export const ometvPage = enrichPremiumPage(ometvPageBase, COMPETITOR_BY_SLUG.ometv);

const joingyPageBase: SeoPageContent = {
  slug: "joingy",
  path: "/talk-to-strangers/joingy",
  label: "Joingy Alternative",
  variant: "dark",
  metadata: {
    title: "Joingy Alternative 2026 — Free Random Video Chat",
    description:
      "Free Joingy alternative on Glice. Live random video chat with strangers, mutual matching & 18+ moderation. Connect face-to-face now.",
    keywords: [
      "joingy alternative",
      "random video chat",
      "talk to strangers",
      "free chat",
      "video chat strangers",
      "Glice",
    ],
  },
  hero: {
    title: "Joingy alternative for live and lasting connections.",
    description:
      "Quick random sessions are just the start. Glice lets you like, match, and continue chatting when both sides are interested.",
  },
  benefits: [
    {
      icon: "ri-vidicon-line",
      title: "Video and discovery cards",
      description:
        "Jump into live video or browse profile cards — multiple ways to meet strangers beyond a single chat mode.",
    },
    {
      icon: "ri-chat-4-line",
      title: "Continue after a good call",
      description:
        "Mutual matching turns a one-time random chat into an ongoing conversation when both people opt in.",
    },
    {
      icon: "ri-shield-star-line",
      title: "Adult-only platform",
      description:
        "Glice is rated for mature audiences. Underage use is not permitted and is actively reviewed.",
    },
    {
      icon: "ri-eye-off-line",
      title: "Privacy-conscious design",
      description:
        "Location and media access are permission-based. You control what the app can use and when.",
    },
  ],
  faq: [
    {
      question: "Does Glice support both video and text?",
      answer:
        "Live video is the primary discovery mode. Text chat opens after a mutual match, keeping messaging consent-based.",
    },
    {
      question: "How fast can I meet someone new?",
      answer:
        "Most users connect to a live session within seconds, depending on availability and your connection quality.",
    },
    {
      question: "Can I delete my account?",
      answer:
        "Yes. Account deletion is available in settings or through support. Data handling follows our privacy retention policy.",
    },
  ],
  cta: {
    title: "Try Glice as a Joingy alternative.",
    description: "Random live video plus mutual match chat — download on Google Play.",
  },
};

export const joingyPage = enrichPremiumPage(joingyPageBase, COMPETITOR_BY_SLUG.joingy);

const emeraldChatPageBase: SeoPageContent = {
  slug: "emerald",
  path: "/talk-to-strangers/emerald",
  label: "Emerald Chat Alternative",
  variant: "dark",
  metadata: {
    title: "Emerald Chat Alternative 2026 — Free Video Chat",
    description:
      "Free Emerald Chat alternative on Glice. Random live video with strangers, mutual matching & 18+ safety. Start your next chat now.",
    keywords: [
      "emerald chat alternative",
      "random video chat",
      "talk to strangers",
      "free video chat",
      "safe stranger chat",
      "Glice",
    ],
  },
  hero: {
    title: "Emerald Chat alternative with mutual matching.",
    description:
      "Meet strangers through live video on a platform built around consent, moderation, and connections that can continue after the first call.",
  },
  benefits: [
    {
      icon: "ri-group-line",
      title: "Real people, live presence",
      description:
        "Video chat shows who you are talking to in real time — reducing the guesswork of text-only stranger rooms.",
    },
    {
      icon: "ri-user-heart-line",
      title: "Match before you message",
      description:
        "Glice’s mutual-like model means no one can flood your inbox without your approval.",
    },
    {
      icon: "ri-layout-grid-line",
      title: "Card-based discovery",
      description:
        "Beyond random video, browse profile cards with clear like, super like, and skip actions.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Community guidelines enforced",
      description:
        "Reports are reviewed. Confirmed abuse leads to restrictions so good users can keep connecting safely.",
    },
  ],
  faq: [
    {
      question: "What makes Glice different from Emerald Chat?",
      answer:
        "Glice emphasizes mutual matching before messaging, mobile-native live video, and integrated safety tools across the full journey — not just the first random session.",
    },
    {
      question: "Is Glice moderated?",
      answer:
        "Yes. User reports, automated signals, and community guidelines work together. Moderation action depends on severity and repeat behavior.",
    },
    {
      question: "Who can use Glice?",
      answer:
        "Adults 18 and older. Glice is not intended for minors and removes accounts that violate age requirements.",
    },
  ],
  cta: {
    title: "Explore Glice as an Emerald Chat alternative.",
    description: "Live video discovery with mutual matching — get the app on Google Play.",
  },
};

export const emeraldChatPage = enrichPremiumPage(
  emeraldChatPageBase,
  COMPETITOR_BY_SLUG.emerald,
);

const textChatPageBase: SeoPageContent = {
  slug: "text-chat",
  path: "/talk-to-strangers/text-chat",
  label: "Text Chat with Strangers",
  variant: "dark",
  metadata: {
    title: "Text Chat with Strangers 2026 — Free & Safe Video",
    description:
      "Text chat strangers on Glice after mutual match. No cold DMs — safe, free messaging when both show interest. Start with live video.",
    keywords: [
      "text chat strangers",
      "text chat online",
      "stranger messaging",
      "mutual match chat",
      "free text chat",
      "Glice",
    ],
  },
  hero: {
    title: "Text chat with strangers — after mutual match.",
    description:
      "Glice is video-first, but meaningful text conversations follow when both people like each other. No anonymous spam inbox.",
  },
  benefits: [
    {
      icon: "ri-chat-check-line",
      title: "Consent-gated messaging",
      description:
        "Text chat unlocks only after mutual interest. You decide who gets past the first live interaction.",
    },
    {
      icon: "ri-image-line",
      title: "Text and image sharing",
      description:
        "Once matched, continue with text and image messages while keeping block and report one tap away.",
    },
    {
      icon: "ri-vidicon-line",
      title: "Start with live video",
      description:
        "Most connections begin face-to-face, so text follows a real conversation — not a random username in a crowded room.",
    },
    {
      icon: "ri-flag-line",
      title: "Safety in every thread",
      description:
        "Report or block directly from chat. Our guidelines prohibit harassment and illegal content.",
    },
  ],
  faq: [
    {
      question: "Can I text strangers without video on Glice?",
      answer:
        "Glice is designed around live video discovery first. Text chat becomes available after a mutual match, typically following a video session or profile interaction.",
    },
    {
      question: "Will strangers message me unsolicited?",
      answer:
        "No. Messaging requires mutual interest. That significantly reduces the unsolicited text spam common on legacy stranger chat sites.",
    },
    {
      question: "Is text chat monitored?",
      answer:
        "We use a combination of user reports and policy enforcement. Do not share illegal content or personal financial information in any chat.",
    },
  ],
  cta: {
    title: "Text strangers the safer way on Glice.",
    description: "Mutual matching before messaging — download Glice on Google Play.",
  },
};

export const textChatPage = enrichPremiumPage(
  textChatPageBase,
  COMPETITOR_BY_SLUG["text-chat"],
);

const randomChatPageBase: SeoPageContent = {
  slug: "random-chat",
  path: "/talk-to-strangers/random-chat",
  label: "Random Chat",
  variant: "dark",
  metadata: {
    title: "Random Video Chat with Strangers 2026 — Free & Safe",
    description:
      "Free random video chat on Glice. Meet strangers live, skip anytime & unlock chat with mutual matching. 18+ safe discovery starts now.",
    keywords: [
      "random chat",
      "random chat strangers",
      "random video chat",
      "talk to strangers",
      "free chat",
      "Glice",
    ],
  },
  hero: {
    title: "Random chat that respects consent.",
    description:
      "Every session is a surprise — but you are never locked in. Skip freely, match mutually, and keep safety tools close at hand.",
  },
  benefits: [
    {
      icon: "ri-shuffle-line",
      title: "Unpredictable pairings",
      description:
        "Random live video connects you with someone new each time. Discovery stays fresh without repetitive swiping.",
    },
    {
      icon: "ri-skip-forward-line",
      title: "Leave any session instantly",
      description:
        "Not feeling it? Skip and move to the next person. You control the pace of your random chat experience.",
    },
    {
      icon: "ri-user-heart-line",
      title: "Turn random into real",
      description:
        "When a random chat clicks, like or super like to unlock ongoing conversation through mutual matching.",
    },
    {
      icon: "ri-shield-check-line",
      title: "18+ with active review",
      description:
        "Glice enforces adult-only use and investigates reports to keep random chat safer for everyone.",
    },
  ],
  faq: [
    {
      question: "How random is Glice chat?",
      answer:
        "Live video sessions pair you with another available user in real time. Nearby discovery can add local context, but core random video remains unpredictable by design.",
    },
    {
      question: "Can I filter who I meet?",
      answer:
        "Glice prioritizes genuine random discovery. Check the app for current filter or preference options as features evolve.",
    },
    {
      question: "What should I avoid sharing in random chat?",
      answer:
        "Do not share legal name, home address, passwords, or payment details. End calls that pressure you and report violations immediately.",
    },
  ],
  cta: {
    title: "Start random chat on Glice.",
    description: "Live video with strangers, mutual matching, and safety built in — on Google Play.",
  },
};

export const omeglePage: SeoPageContent = {
  slug: "omegle",
  path: "/talk-to-strangers/omegle",
  label: "Omegle Alternative",
  variant: "light",
  metadata: {
    title: "#1 Omegle Alternative 2026 — Free Safe Video Chat",
    description:
      "Free Omegle alternative 2026 on Glice. Random live video chat, mutual matching & 18+ safety. The safer way to talk to strangers now.",
    keywords: [
      "omegle alternative",
      "omegle alternative 2026",
      "random video chat",
      "talk to strangers",
      "free video chat",
      "safe video chat",
      "Glice",
    ],
  },
  hero: {
    title: "Omegle alternative for a new era of random chat.",
    description:
      "Classic Omegle-style random pairing, rebuilt for mobile with mutual matching, moderation, and clear adult-only rules. Glice is not Omegle — it is something safer and more intentional.",
  },
  benefits: [
    {
      icon: "ri-live-line",
      title: "Random live video pairing",
      description:
        "Connect with strangers through real-time video — the spirit of Omegle, updated for today’s expectations.",
    },
    {
      icon: "ri-user-heart-line",
      title: "Mutual match, not blind DMs",
      description:
        "Follow-up chat requires two-way interest. That single design choice removes much of the harassment legacy random chat was known for.",
    },
    {
      icon: "ri-smartphone-line",
      title: "Built for phones",
      description:
        "No brittle browser tabs. Glice is a native app experience with quick skip, like, and report actions.",
    },
    {
      icon: "ri-shield-check-line",
      title: "18+ and moderated",
      description:
        "Adult-only platform with report workflows and community guidelines enforced across sessions.",
    },
  ],
  faq: [
    {
      question: "Is Glice the same as Omegle?",
      answer:
        "No. Glice is a separate product with mutual matching, mobile apps, and stricter safety standards. It offers random live video with strangers but is not affiliated with Omegle.",
    },
    {
      question: "Why did people look for Omegle alternatives?",
      answer:
        "After Omegle closed, many users wanted random video chat with better moderation and consent controls. Glice was built around mutual matching and in-app safety for that reason.",
    },
    {
      question: "Is Glice free?",
      answer:
        "Glice is free to download with core features available in-app. Optional purchases may exist for premium capabilities — see Google Play for details.",
    },
  ],
  cta: {
    title: "Try Glice — a thoughtful Omegle alternative.",
    description:
      "Random live video with mutual matching. Download on Google Play and meet strangers with clearer safety guardrails.",
  },
};

export const randomChatPage = enrichPremiumPage(
  randomChatPageBase,
  COMPETITOR_BY_SLUG["random-chat"],
);

const monkeyRunPageBase: SeoPageContent = {
  slug: "monkey-run",
  path: "/talk-to-strangers/monkey-run",
  label: "Monkey Run Alternative",
  variant: "dark",
  metadata: {
    title: "Monkey Run Alternative 2026 — Free Random Video Chat",
    description:
      "Free Monkey Run alternative on Glice. Fast random live video with strangers, mutual matching & 18+ safety. Download and chat now.",
    keywords: [
      "monkey run alternative",
      "random video chat",
      "talk to strangers",
      "free video chat",
      "mobile chat app",
      "Glice",
    ],
  },
  hero: {
    title: "Monkey Run alternative with mutual matching.",
    description:
      "Fast random video sessions meet a consent-first chat model. Glice is built for adults who want quick connections without the chaos of open inboxes.",
  },
  benefits: [
    {
      icon: "ri-flashlight-line",
      title: "Fast session starts",
      description:
        "Tap in and get paired quickly. Random live video keeps the energy high without long wait screens.",
    },
    {
      icon: "ri-user-heart-line",
      title: "Match to continue",
      description:
        "A great random call can become an ongoing chat — but only when both people like each other.",
    },
    {
      icon: "ri-shield-star-line",
      title: "Adult-only community",
      description:
        "Glice enforces 18+ use. Underage accounts are not welcome and are removed on review.",
    },
    {
      icon: "ri-flag-2-line",
      title: "Skip and report freely",
      description:
        "Leave uncomfortable sessions immediately and flag users who break community rules.",
    },
  ],
  faq: [
    {
      question: "How does Glice compare to Monkey Run?",
      answer:
        "Both focus on fast random video on mobile. Glice differentiates with mutual matching before messaging and integrated moderation across the full user journey.",
    },
    {
      question: "Do I need friends on Glice to start?",
      answer:
        "No. Random live video pairs you with strangers automatically. Friends and matches build over time through likes and mutual interest.",
    },
    {
      question: "What devices support Glice?",
      answer:
        "Glice is available on Android via Google Play. Check the store listing for the latest compatibility information.",
    },
  ],
  cta: {
    title: "Download the Monkey Run alternative.",
    description: "Fast random video with mutual matching — get Glice on Google Play.",
  },
};

export const monkeyRunPage = enrichPremiumPage(
  monkeyRunPageBase,
  COMPETITOR_BY_SLUG["monkey-run"],
);

const chatAvenuePageBase: SeoPageContent = {
  slug: "chat-avenue",
  path: "/talk-to-strangers/chat-avenue",
  label: "Chat Avenue Alternative",
  variant: "dark",
  metadata: {
    title: "Chat Avenue Alternative 2026 — Free Video Chat",
    description:
      "Free Chat Avenue alternative on Glice. Live random video chat with strangers, mutual matching — no crowded text rooms. Start now.",
    keywords: [
      "chat avenue alternative",
      "random video chat",
      "talk to strangers",
      "free chat",
      "stranger chat",
      "Glice",
    ],
  },
  hero: {
    title: "Chat Avenue alternative for live video discovery.",
    description:
      "Skip the endless text channels. Glice puts you face-to-face with strangers through live video, then lets you match mutually to keep talking.",
  },
  benefits: [
    {
      icon: "ri-vidicon-line",
      title: "Video over anonymous text",
      description:
        "Live video adds accountability and context that anonymous text rooms often lack.",
    },
    {
      icon: "ri-chat-check-line",
      title: "No open inbox",
      description:
        "Messaging is gated behind mutual interest — a sharp contrast to always-on public chat feeds.",
    },
    {
      icon: "ri-map-pin-2-line",
      title: "Local and global strangers",
      description:
        "Meet people worldwide or explore nearby suggestions with privacy-conscious location handling.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Guidelines with teeth",
      description:
        "Community rules are enforced through reports and moderation — not just posted on a FAQ page.",
    },
  ],
  faq: [
    {
      question: "Does Glice have public chat rooms like Chat Avenue?",
      answer:
        "Glice does not use open public text rooms. Discovery happens through live video, profile cards, and mutual-match messaging instead.",
    },
    {
      question: "Is Glice safer than legacy chat sites?",
      answer:
        "Glice combines 18+ enforcement, block/report tools, and mutual matching to reduce unsolicited contact. No platform is risk-free — always follow our Safety Tips.",
    },
    {
      question: "Can I talk to multiple strangers in one session?",
      answer:
        "Glice pairs you one-to-one in live video. You can skip to meet someone new whenever you want.",
    },
  ],
  cta: {
    title: "Move beyond Chat Avenue on Glice.",
    description: "Live video stranger chat with mutual matching — download on Google Play.",
  },
};

export const chatAvenuePage = enrichPremiumPage(
  chatAvenuePageBase,
  COMPETITOR_BY_SLUG["chat-avenue"],
);

const monkeyAlternativePageBase: SeoPageContent = {
  slug: "monkey-app",
  path: "/talk-to-strangers/monkey-app",
  label: "Monkey Alternative",
  variant: "dark",
  metadata: {
    title: "Monkey App Alternative 2026 — Free Random Video Chat",
    description:
      "Free Monkey app alternative on Glice. Random live video chat, mutual matching & 18+ safety. Consent-first stranger chat starts now.",
    keywords: [
      "monkey alternative",
      "monkey app alternative",
      "random video chat",
      "talk to strangers",
      "free video chat",
      "Glice",
    ],
  },
  hero: {
    title: "Monkey alternative built for mutual consent.",
    description:
      "Random live video stays fun and fast. Glice adds mutual matching so strangers cannot message you unless you both want to continue.",
  },
  benefits: [
    {
      icon: "ri-vidicon-line",
      title: "Random live video on mobile",
      description:
        "Meet strangers through real-time video designed for quick sessions and easy skip controls.",
    },
    {
      icon: "ri-user-heart-line",
      title: "Mutual match messaging",
      description:
        "Unlike apps where anyone can reach out, Glice opens chat only after two-way interest — cutting spam and pressure.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Safety tools throughout",
      description:
        "Block, report, and moderation are available during video and in matched chats. Glice is 18+ only.",
    },
    {
      icon: "ri-layout-grid-line",
      title: "Cards plus random video",
      description:
        "Discover through live sessions or profile cards with like, super like, and skip — more control over who you meet.",
    },
  ],
  faq: [
    {
      question: "Is Glice a good Monkey app alternative?",
      answer:
        "If you want random live video on mobile with stronger consent controls before messaging, Glice is designed for that experience. It is an independent product, not affiliated with Monkey.",
    },
    {
      question: "Does Glice copy Monkey’s features?",
      answer:
        "Glice has its own mutual-match model, safety stack, and discovery flows. We focus on consent-first stranger chat rather than replicating any competitor.",
    },
    {
      question: "How do I get started?",
      answer:
        "Download Glice from Google Play, create your 18+ profile, and tap to start a live random video session or browse discovery cards.",
    },
  ],
  cta: {
    title: "Try Glice as your Monkey alternative.",
    description:
      "Random live video with mutual matching and built-in safety — available on Google Play.",
  },
};

export const monkeyAlternativePage = enrichPremiumPage(
  monkeyAlternativePageBase,
  COMPETITOR_BY_SLUG["monkey-app"],
);

export const ALL_SEO_PAGES: SeoPageContent[] = [
  hubPage,
  coomeetPage,
  y99Page,
  chatroulettePage,
  bazoocamPage,
  ometvPage,
  joingyPage,
  emeraldChatPage,
  textChatPage,
  randomChatPage,
  omeglePage,
  monkeyRunPage,
  chatAvenuePage,
  monkeyAlternativePage,
];

export const SEO_PAGE_BY_SLUG = Object.fromEntries(
  ALL_SEO_PAGES.map((page) => [page.slug, page]),
) as Record<string, SeoPageContent>;
