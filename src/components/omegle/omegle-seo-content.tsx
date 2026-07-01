import type { OmeglePageSeoContent } from "@/content/seo/omegle-page-content";

type OmegleSeoContentProps = {
  content: OmeglePageSeoContent;
};

function FeatureIcon({ icon }: { icon: string }) {
  return (
    <div className="omegle-rich-icon" aria-hidden>
      <i className={icon} />
    </div>
  );
}

export function OmegleSeoContent({ content }: OmegleSeoContentProps) {
  const {
    heroBanner,
    modernExperience,
    featuresGrid,
    safety,
    whyGlice,
    faq,
    cta,
  } = content;

  return (
    <div className="omegle-rich-seo" aria-label="About Glice Omegle alternative">
      <section className="omegle-rich-section omegle-rich-section--white">
        <div className="omegle-rich-inner">
          <h1 className="omegle-rich-h1">{heroBanner.title}</h1>
          {heroBanner.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="omegle-rich-lede">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="omegle-rich-section omegle-rich-section--white">
        <div className="omegle-rich-inner">
          <span className="omegle-rich-eyebrow">{modernExperience.eyebrow}</span>
          <h2 className="omegle-rich-h2">{modernExperience.title}</h2>
          <p className="omegle-rich-lede omegle-rich-lede--spaced">
            {modernExperience.description}
          </p>
          <ul className="omegle-rich-bullets">
            {modernExperience.features.map((feature) => (
              <li key={feature.title}>
                <FeatureIcon icon={feature.icon} />
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="omegle-rich-section omegle-rich-section--gray">
        <div className="omegle-rich-inner">
          <h2 className="omegle-rich-h2">{featuresGrid.title}</h2>
          <p className="omegle-rich-lede omegle-rich-lede--spaced">
            {featuresGrid.subtitle}
          </p>
          <div className="omegle-rich-grid omegle-rich-grid--2col">
            {featuresGrid.items.map((item) => (
              <article key={item.title} className="omegle-rich-card">
                <FeatureIcon icon={item.icon} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="omegle-rich-section omegle-rich-section--safety">
        <div className="omegle-rich-inner">
          <h2 className="omegle-rich-h2">{safety.title}</h2>
          <p className="omegle-rich-lede">
            {safety.description}
          </p>
          <ul className="omegle-rich-safety-list">
            {safety.bullets.map((bullet) => (
              <li key={bullet.slice(0, 48)}>
                <i className="ri-check-line" aria-hidden />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="omegle-rich-section omegle-rich-section--white">
        <div className="omegle-rich-inner">
          <h2 className="omegle-rich-h2">{whyGlice.title}</h2>
          <p className="omegle-rich-lede omegle-rich-lede--spaced">
            {whyGlice.subtitle}
          </p>
          <div className="omegle-rich-grid omegle-rich-grid--4col">
            {whyGlice.cards.map((card) => (
              <article key={card.title} className="omegle-rich-card omegle-rich-card--compact">
                <FeatureIcon icon={card.icon} />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="omegle-rich-section omegle-rich-section--white">
        <div className="omegle-rich-inner omegle-rich-inner--faq">
          <h2 className="omegle-rich-h2">Frequently asked questions</h2>
          <div className="omegle-rich-faq">
            {faq.map((item) => (
              <details key={item.question}>
                <summary>
                  <span>{item.question}</span>
                  <i className="ri-add-line omegle-rich-faq-icon" aria-hidden />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="omegle-rich-section omegle-rich-section--cta">
        <div className="omegle-rich-inner omegle-rich-inner--cta">
          <h2 className="omegle-rich-h2 omegle-rich-h2--light">{cta.title}</h2>
          <p className="omegle-rich-lede omegle-rich-lede--light">
            {cta.description}
          </p>
          <div className="omegle-rich-cta-actions">
            <a
              href="https://play.google.com/store/apps/details?id=com.glice.app"
              className="omegle-rich-cta-btn omegle-rich-cta-btn--primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="ri-google-play-fill" aria-hidden />
              {cta.primaryLabel}
            </a>
            <a href="#omegle-video-start" className="omegle-rich-cta-btn omegle-rich-cta-btn--ghost">
              <i className="ri-vidicon-line" aria-hidden />
              {cta.secondaryLabel}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
