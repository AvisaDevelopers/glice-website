import { MarketingCta } from "@/components/marketing/marketing-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { SeoFaqSection } from "@/components/marketing/seo-faq-section";
import type { SeoPageContent } from "@/content/seo/types";
import Link from "next/link";

type SeoLandingPageProps = {
  content: SeoPageContent;
};

function DarkSeoLandingPage({ content }: SeoLandingPageProps) {
  return (
    <>
      <PageHero title={content.hero.title} description={content.hero.description} />

      <section className="section pt-12">
        <div className="page-container">
          <div className="reveal mb-14 text-center">
            <h2 className="display-2 balance mt-4">Why choose Glice.</h2>
            <p className="lede balance mx-auto mt-4 max-w-2xl">
              Honest positioning: Glice is 18+ live social discovery with mutual
              matching — not anonymous mass messaging.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {content.benefits.map((benefit) => (
              <div key={benefit.title} className="panel reveal p-8">
                <div className="step-num mb-5">
                  <i className={`${benefit.icon} text-xl`} />
                </div>
                <h3 className="mb-3 text-xl font-semibold">{benefit.title}</h3>
                <p className="leading-relaxed text-textMuted">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SeoFaqSection items={content.faq} />

      <MarketingCta
        title={content.cta.title}
        description={content.cta.description}
      />
    </>
  );
}

function LightSeoLandingPage({ content }: SeoLandingPageProps) {
  return (
    <div className="seo-landing--light min-h-[60vh] bg-[#f5f5f0] text-neutral-900">
      <section className="hero hero--below-header px-6 pb-16 text-center">
        <div className="page-container">
          <div className="reveal relative z-10 mx-auto max-w-3xl">
            <h1 className="display-1 balance mt-5 mb-6 text-neutral-900">
              {content.hero.title}
            </h1>
            <p className="lede balance mx-auto max-w-xl text-neutral-600">
              {content.hero.description}
            </p>
          </div>
        </div>
      </section>

      <section className="section pt-12">
        <div className="page-container">
          <div className="reveal mb-14 text-center">
            <h2 className="display-2 balance mt-4 text-neutral-900">
              Why choose Glice.
            </h2>
            <p className="lede balance mx-auto mt-4 max-w-2xl text-neutral-600">
              A modern Omegle-style alternative with mutual matching and mobile
              safety tools. Adults 18+ only.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {content.benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="reveal rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#32E6A1]/15 text-[#1a8f62]">
                  <i className={`${benefit.icon} text-xl`} />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-neutral-900">
                  {benefit.title}
                </h3>
                <p className="leading-relaxed text-neutral-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SeoFaqSection items={content.faq} variant="light" />

      <section className="section">
        <div className="page-container relative">
          <div className="reveal relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-12 text-center shadow-sm md:p-16">
            <h2 className="display-2 balance mt-5 mb-5 text-neutral-900">
              {content.cta.title}
            </h2>
            <p className="lede balance mx-auto mb-10 max-w-xl text-neutral-600">
              {content.cta.description}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://play.google.com/store/apps/details?id=com.glice.app"
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="ri-google-play-fill" />
                <span>Get on Google Play</span>
              </a>
              <Link href="/contact" className="btn-ghost border-neutral-300 text-neutral-800">
                <span>Get in touch</span>
                <i className="ri-arrow-right-line" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function SeoLandingPage({ content }: SeoLandingPageProps) {
  if (content.variant === "light") {
    return <LightSeoLandingPage content={content} />;
  }

  return <DarkSeoLandingPage content={content} />;
}
