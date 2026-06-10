import { MarketingCta } from "@/components/marketing/marketing-cta";
import { PageHero } from "@/components/marketing/page-hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Glice - consent-first live video chat, social discovery, and meaningful conversations.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Live social discovery,
            <br />
            built for today.
          </>
        }
        description="We believe everyone deserves meaningful connections built on authenticity, consent, and trust."
      />

      <section className="section pt-12">
        <div className="reveal mx-auto max-w-3xl">
          <h2 className="display-2 balance mt-4 mb-10">
            A simple vision for real connection.
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-textMuted">
            <p>
              Glice was founded in 2024 with a simple vision: to revolutionize the
              way people find meaningful connections in the digital age. Our
              founders, a team of passionate engineers and designers, recognized
              that existing social apps had fallen short in delivering genuine,
              quality matches.
            </p>
            <p>
              After witnessing countless frustrating experiences on other
              platforms, they decided to build something better. Glice combines
              real-time live video, mutual consent, and human-centered design to
              create an experience that feels natural, authentic, and genuinely
              helpful.
            </p>
            <p>
              Today, Glice is dedicated to helping thousands of people find real
              connections, meaningful conversations, and the possibility of
              lasting relationships through live social discovery.
            </p>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="mx-auto max-w-6xl">
          <div className="reveal mb-14 text-center">
            <h2 className="display-2 balance mt-4">What we stand for.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="panel reveal p-10">
              <div className="step-num mb-6">
                <i className="ri-focus-3-line text-xl" />
              </div>
              <h3 className="display-3 mb-4">Our mission</h3>
              <div className="quote-card">
                <p className="leading-relaxed text-textMuted">
                  To empower individuals to find authentic connections through
                  intelligent matching, consent-first interactions, and
                  meaningful conversations in a safe, supportive community.
                </p>
              </div>
            </div>

            <div className="panel reveal p-10">
              <div className="step-num mb-6">
                <i className="ri-award-line text-xl" />
              </div>
              <h3 className="display-3 mb-6">Our values</h3>
              <div className="space-y-4">
                {[
                  ["Authenticity", "real people, real connections."],
                  ["Safety", "your security is paramount."],
                  ["Innovation", "continuously improving the experience."],
                  ["Inclusivity", "built for everyone, every identity."],
                  ["Privacy", "your data is your own."],
                ].map(([label, text]) => (
                  <div key={label} className="flex gap-3">
                    <i className="ri-checkbox-circle-line mt-0.5 text-lg text-textMuted" />
                    <div>
                      <strong className="font-semibold text-textMain">
                        {label}
                      </strong>
                      <span className="text-textMuted"> — {text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="mx-auto max-w-6xl">
          <div className="stat-strip hairline-t hairline-b reveal">
            {[
              ["10K", "+", "Growing community"],
              ["98", "%", "Match success rate"],
              ["4.9", "★", "Average rating"],
              ["50", "+", "Team members"],
            ].map(([value, suffix, label]) => (
              <div key={label} className="stat-cell text-center md:text-left">
                <div className="text-4xl font-bold tracking-tight md:text-5xl">
                  {value}
                  <span className="text-textMuted">{suffix}</span>
                </div>
                <p className="mt-2 text-sm text-textMuted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-4xl">
          <div className="reveal mb-12">
            <h2 className="display-2 balance mt-4">
              Designed for genuine connection.
            </h2>
          </div>

          <div className="reveal">
            {[
              [
                "ri-robot-2-line",
                "Intelligent matching",
                "Our matching system learns your preferences and surfaces compatible people based on personality, values, and interests.",
              ],
              [
                "ri-verified-badge-line",
                "Verified-adult profiles",
                "Profile checks and 18+ enforcement help ensure you meet real, authentic people across the app.",
              ],
              [
                "ri-shield-check-line",
                "Safety first",
                "Comprehensive safety features including content moderation, reporting workflows, and one-tap blocking.",
              ],
              [
                "ri-chat-3-line",
                "Meaningful conversations",
                "Live video and mutual-match chat help you skip the small talk and connect on what actually matters.",
              ],
              [
                "ri-group-line",
                "Inclusive community",
                "A welcoming space for all orientations and identities. Everyone deserves to find connection.",
              ],
            ].map(([icon, title, text]) => (
              <div key={title} className="why-row">
                <div className="step-num">
                  <i className={`${icon} text-xl`} />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold">{title}</h3>
                  <p className="leading-relaxed text-textMuted">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MarketingCta
        title="Ready to find your match?"
        description="Join thousands of people already waiting for Glice. Get early access and exclusive launch benefits."
      />
    </>
  );
}
