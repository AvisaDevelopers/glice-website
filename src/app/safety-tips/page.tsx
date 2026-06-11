import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safety Tips",
  description:
    "Practical safety tips for live video chat, matching, and messaging on Glice.",
};

const TIPS = [
  {
    icon: "ri-user-settings-line",
    title: "Protect personal information",
    text: "Avoid sharing sensitive details like home address, workplace, bank details, or government IDs in chat or calls.",
  },
  {
    icon: "ri-video-line",
    title: "Use video calls wisely",
    text: "In early conversations, keep calls in-app and end the session immediately if behavior turns uncomfortable.",
  },
  {
    icon: "ri-shield-check-line",
    title: "Trust your instincts",
    text: "If something feels wrong, pause contact. You are never required to continue a conversation or respond instantly.",
  },
  {
    icon: "ri-flag-2-line",
    title: "Report and block quickly",
    text: "Use report and block tools for harassment, scams, explicit abuse, impersonation, or repeated unwanted contact.",
  },
  {
    icon: "ri-map-pin-user-line",
    title: "Be careful with location",
    text: "Nearby matching helps discovery, but avoid sharing exact real-time meeting points too early in new connections.",
  },
  {
    icon: "ri-camera-off-line",
    title: "Never share explicit content",
    text: "Do not share intimate media with people you do not fully trust. Once sent, content can be saved or misused.",
  },
  {
    icon: "ri-alert-line",
    title: "Watch for scam signals",
    text: "Be cautious of users asking for money, gift cards, off-platform payments, or urgent personal favors.",
  },
  {
    icon: "ri-phone-line",
    title: "Meet offline safely",
    text: "When meeting in person, choose public places, tell a trusted contact your plan, and arrange your own transport.",
  },
  {
    icon: "ri-lock-2-line",
    title: "Stay in control",
    text: "You can always block, mute, or end a conversation. Safety controls are accessible from any screen in the app.",
  },
];

export default function SafetyTipsPage() {
  return (
    <>
      <section className="hero px-6 pt-36 pb-12">
        <div className="reveal relative z-10 page-container">
          <h1 className="display-1 balance mt-5 mb-5">Safety Tips.</h1>
          <p className="lede balance mb-6 max-w-2xl">
            Simple habits to keep your video and chat experience safer on Glice.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="chip-meta">
              <i className="ri-shield-star-line" />
              8 essential tips
            </span>
            <Link
              href="/community-guidelines"
              className="chip-meta transition-colors hover:text-textMain"
            >
              <i className="ri-arrow-right-line" />
              Read guidelines
            </Link>
          </div>
        </div>
      </section>

      <section className="section pt-8 pb-16">
        <div className="page-container">
          <div className="reveal grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TIPS.map((tip) => (
              <div key={tip.title} className="panel tip">
                <div className="tip-icon">
                  <i className={tip.icon} />
                </div>
                <h3>{tip.title}</h3>
                <p>{tip.text}</p>
              </div>
            ))}
          </div>

          <div className="reveal mt-12 text-center">
            <p className="mb-5 text-sm text-textMuted">
              Need to report something urgent or have a safety question?
            </p>
            <Link href="/contact" className="btn-primary">
              <i className="ri-mail-line" />
              <span>Contact safety team</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
