export function SeoMiniHeader({ brandLabel }: { brandLabel: string }) {
  return (
    <header className="seo-mini-header" aria-label={brandLabel}>
      <h1 className="seo-mini-header__brand">
        <span className="seo-mini-header__mark">{brandLabel}</span>
      </h1>
      <p className="seo-mini-header__tagline">Talk to strangers!</p>
    </header>
  );
}
