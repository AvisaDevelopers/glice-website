import { SeoFaqSection } from "@/components/marketing/seo-faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { getBrandScheme } from "@/content/seo/brand-schemes";
import {
  GOOGLE_PLAY_HREF,
  HERO_CTA_EYEBROW,
  HERO_CTA_PRIMARY_LABEL,
  VIDEO_HERO_HREF,
} from "@/content/seo/premium-shared";
import type { CSSProperties } from "react";
import type {
  SeoComparisonRow,
  SeoFeatureShowcase,
  SeoPageContent,
} from "@/content/seo/types";
import Link from "next/link";
import { SeoMiniHeader } from "@/components/marketing/seo/seo-mini-header";
import { buildSeoLandingSchemas } from "@/lib/seo/structured-data";

type PremiumSeoLandingPageProps = {
  content: SeoPageContent;
};

const AVATAR_INITIALS = [
  "SK",
  "MR",
  "JL",
  "AT",
  "NP",
  "EW",
  "DK",
  "LF",
  "BH",
  "CM",
] as const;

function ComparisonCell({ value }: { value: boolean | "partial" }) {
  if (value === true) {
    return (
      <span className="seo-compare__yes" aria-label="Yes">
        <i className="ri-check-line" />
      </span>
    );
  }
  if (value === "partial") {
    return <span className="seo-compare__partial">Varies</span>;
  }
  return (
    <span className="seo-compare__no" aria-label="No">
      <i className="ri-close-line" />
    </span>
  );
}

function ComparisonTable({
  competitorName,
  rows,
}: {
  competitorName: string;
  rows: SeoComparisonRow[];
}) {
  return (
    <div className="seo-compare reveal">
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th className="seo-compare__cell">
              <span className="seo-compare__brand">Glice</span>
            </th>
            <th className="seo-compare__cell">{competitorName}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.feature}>
              <td>{row.feature}</td>
              <td className="seo-compare__cell">
                <ComparisonCell value={row.glice} />
              </td>
              <td className="seo-compare__cell">
                <ComparisonCell value={row.competitor} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FeatureCard({ feature }: { feature: SeoFeatureShowcase }) {
  return (
    <article className="seo-feature-card reveal">
      <span className="seo-feature-card__icon" aria-hidden="true">
        <i className={feature.icon} />
      </span>
      <h3 className="seo-feature-card__title">{feature.title}</h3>
      <p className="seo-feature-card__desc">{feature.description}</p>
    </article>
  );
}

function SeoCtaPill({
  href,
  compact = false,
  primaryLabel = HERO_CTA_PRIMARY_LABEL,
}: {
  href: string;
  compact?: boolean;
  primaryLabel?: string;
}) {
  return (
    <Link
      href={href}
      className={`seo-cta-pill${compact ? " seo-cta-pill--compact" : ""}`}
    >
      <span className="seo-cta-pill__text">
        <span className="seo-cta-pill__eyebrow">{HERO_CTA_EYEBROW}</span>
        <span className="seo-cta-pill__main">
          {primaryLabel}
          <span className="seo-cta-pill__arrow" aria-hidden="true">
            →
          </span>
        </span>
      </span>
      <span className="seo-cta-pill__deco seo-cta-pill__deco--cam" aria-hidden="true">
        <span className="seo-cta-pill__deco-circle seo-cta-pill__deco-circle--primary">
          <i className="ri-vidicon-fill" />
        </span>
      </span>
      <span className="seo-cta-pill__deco seo-cta-pill__deco--chat" aria-hidden="true">
        <span className="seo-cta-pill__deco-circle seo-cta-pill__deco-circle--accent">
          <i className="ri-chat-smile-3-fill" />
        </span>
      </span>
    </Link>
  );
}

export function PremiumSeoLandingPage({ content }: PremiumSeoLandingPageProps) {
  const scheme = getBrandScheme(content.slug);
  const competitorName = content.competitorName ?? "Other apps";
  const stats = content.stats ?? [];
  const steps = content.steps ?? [];
  const features = content.features ?? [];
  const comparisonRows = content.comparisonRows ?? [];
  const heroCta = content.heroCta;

  const brandStyle = {
    "--brand-primary": scheme.primary,
    "--brand-accent": scheme.accent,
    "--brand-surface": scheme.surface,
    "--brand-surface-alt": scheme.surfaceAlt,
    "--brand-text-on-primary": scheme.textOnPrimary,
    "--brand-text-on-accent": scheme.textOnAccent,
  } as CSSProperties;

  return (
    <div
      className="seo-landing--premium"
      data-brand={scheme.id}
      style={brandStyle}
    >
      <JsonLd data={buildSeoLandingSchemas(content)} />

      <SeoMiniHeader brandLabel={content.label} />

      <section className="seo-split-hero">
        <div className="seo-split-hero__content">
          <div className="seo-split-hero__inner reveal">
            <span className="seo-split-hero__label">{content.label}</span>
            <h1 className="seo-split-hero__title balance">{content.hero.title}</h1>
            <p className="seo-split-hero__lede balance">{content.hero.description}</p>

            <div className="seo-split-hero__actions">
              <SeoCtaPill
                href={heroCta?.primaryHref ?? VIDEO_HERO_HREF}
                primaryLabel={heroCta?.primaryLabel ?? HERO_CTA_PRIMARY_LABEL}
              />
            </div>

            <div className="seo-avatar-strip" aria-label="Active community members">
              {AVATAR_INITIALS.map((initials, index) => (
                <span
                  key={initials}
                  className={`seo-avatar-strip__item ${
                    index % 2 === 0
                      ? "seo-avatar-strip__item--primary"
                      : "seo-avatar-strip__item--accent"
                  }`}
                  aria-hidden="true"
                >
                  {initials}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="seo-split-hero__visual" aria-hidden="true">
          <div className="seo-photo-panel seo-photo-panel--a" />
          <div className="seo-photo-panel seo-photo-panel--b" />
        </div>
      </section>

      <div className="seo-hero-accent" aria-hidden="true" />

      {stats.length > 0 ? (
        <section className="seo-stats" aria-label="Platform stats">
          <div className="page-container">
            <div className="seo-stats__grid">
              {stats.map((stat) => (
                <div key={stat.label} className="seo-stat reveal">
                  <span className="seo-stat__icon">
                    <i className={stat.icon} aria-hidden="true" />
                  </span>
                  <span className="seo-stat__value">{stat.value}</span>
                  <span className="seo-stat__label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section seo-section--features seo-features-section">
        <div className="page-container">
          <div className="reveal seo-section-head">
            <span className="seo-eyebrow">Why Glice</span>
            <h2 className="seo-display balance mt-4">
              Built for consent-first stranger chat.
            </h2>
            <p className="seo-lede balance mt-4">
              Live video discovery with mutual matching, moderation, and safety
              tools at every step — not another open inbox.
            </p>
          </div>

          <div className="seo-feature-grid">
            {features.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {comparisonRows.length > 0 ? (
        <section className="section seo-section--compare">
          <div className="page-container">
            <div className="reveal seo-section-head seo-section-head--center">
              <span className="seo-eyebrow">Honest comparison</span>
              <h2 className="seo-display balance mt-4">
                Glice vs {competitorName}
              </h2>
              <p className="seo-lede balance mt-4">
                We focus on mutual consent before messaging — a deliberate
                trade-off that reduces spam and unwanted contact.
              </p>
            </div>
            <ComparisonTable
              competitorName={competitorName}
              rows={comparisonRows}
            />
          </div>
        </section>
      ) : null}

      {steps.length > 0 ? (
        <section className="section seo-section--steps" id="how-it-works">
          <div className="page-container">
            <div className="reveal seo-section-head">
              <span className="seo-eyebrow">How it works</span>
              <h2 className="seo-display balance mt-4">Three steps. No friction.</h2>
            </div>

            <div className="seo-steps">
              {steps.map((step, index) => (
                <article key={step.title} className="seo-step reveal">
                  <div className="seo-step__num">{index + 1}</div>
                  <div className="seo-step__icon" aria-hidden="true">
                    <i className={step.icon} />
                  </div>
                  <h3 className="seo-step__title">{step.title}</h3>
                  <p className="seo-step__desc">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section seo-section--safety">
        <div className="page-container">
          <div className="seo-safety reveal">
            <div className="seo-section-head">
              <span className="seo-eyebrow">Safety first</span>
              <h2 className="seo-display balance mt-4">
                Moderation, reporting, and mutual matching.
              </h2>
              <p className="seo-lede balance mt-4">
                Glice is 18+ only. Every session includes skip, block, and report
                controls — and messaging opens only when both people opt in.
              </p>
            </div>
            <div className="seo-safety__grid">
              <div className="seo-safety__item">
                <span className="seo-safety__icon">
                  <i className="ri-shield-star-line" aria-hidden="true" />
                </span>
                <h3 className="seo-safety__title">Active moderation</h3>
                <p className="seo-safety__desc">
                  User reports are reviewed. Repeated violations can lead to
                  restrictions or account removal.
                </p>
              </div>
              <div className="seo-safety__item">
                <span className="seo-safety__icon">
                  <i className="ri-flag-2-line" aria-hidden="true" />
                </span>
                <h3 className="seo-safety__title">Report &amp; block</h3>
                <p className="seo-safety__desc">
                  Leave any session instantly. Block or report users from video
                  and matched chat threads.
                </p>
              </div>
              <div className="seo-safety__item">
                <span className="seo-safety__icon">
                  <i className="ri-user-heart-line" aria-hidden="true" />
                </span>
                <h3 className="seo-safety__title">Mutual matching</h3>
                <p className="seo-safety__desc">
                  No cold DMs. Chat unlocks only after two-way interest — cutting
                  unsolicited contact by design.
                </p>
              </div>
            </div>
            <p className="seo-safety__link">
              <Link href="/safety-tips" className="seo-link">
                Read our safety tips
              </Link>{" "}
              before your first session.
            </p>
          </div>
        </div>
      </section>

      <div className="seo-section--faq">
        <SeoFaqSection items={content.faq} variant="light" />
      </div>

      <section className="section seo-section--cta">
        <div className="page-container">
          <div className="seo-cta-band reveal">
            <h2 className="seo-display balance seo-cta-band__title">
              {content.cta.title}
            </h2>
            <p className="seo-lede balance seo-cta-band__lede">
              {content.cta.description}
            </p>
            <div className="seo-cta-band__actions">
              <SeoCtaPill href={VIDEO_HERO_HREF} compact />
              <a
                href={GOOGLE_PLAY_HREF}
                className="seo-cta-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="ri-google-play-fill" aria-hidden="true" />
                <span>Get on Google Play</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
