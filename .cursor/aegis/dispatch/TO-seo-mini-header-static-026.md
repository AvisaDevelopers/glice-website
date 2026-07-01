# TO-seo-mini-header-static-026 — Omegle-style mini header + static page SEO

**Date:** 2026-07-01

---

## User request

> Omegle Talk to strangers! like you did on omegal do same thing on all other pages
> and also do seo of all static pages like contact us and other pages

---

## Part A — Omegle-style mini header on all 13 premium SEO pages

### Reference (Omegle — do NOT change omegle route)

```tsx
<header className="omegle-mini-header">
  <h1 className="omegle-mini-header__logo">
    <span className="omegle-logo__mark">Omegle</span>
  </h1>
  <p className="omegle-mini-header__tagline">Talk to strangers!</p>
</header>
```

### Implement for premium SEO template

**New:** `src/components/marketing/seo/seo-mini-header.tsx`

```tsx
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
```

**Wire:** `premium-seo-landing-page.tsx` — render `<SeoMiniHeader brandLabel={content.label} />` as **first child** inside `.seo-landing--premium`, before hero.

**CSS:** `seo-landing.css` — mirror omegle mini header layout:
- White/light surface background (`var(--brand-surface-alt)`)
- Sticky top, subtle bottom border
- Brand name in `var(--brand-primary)` bold
- Tagline "Talk to strangers!" in `var(--brand-text)` — **exact copy from Omegle**

**NOT** the removed blue `seo-topbar` (Back / Get Glice Free).

**Hub label:** `content.label` = "Talk to Strangers" → shows that + tagline.

---

## Part B — Full SEO on static/marketing pages

### Pages (indexable)

| Path | File |
|------|------|
| `/` | `app/page.tsx` |
| `/about` | `app/about/page.tsx` |
| `/features` | `app/features/page.tsx` |
| `/contact` | `app/contact/page.tsx` |
| `/privacy-policy` | `app/privacy-policy/page.tsx` |
| `/terms-and-conditions` | `app/terms-and-conditions/page.tsx` |
| `/community-guidelines` | `app/community-guidelines/page.tsx` |
| `/safety-tips` | `app/safety-tips/page.tsx` |
| `/safety-child-protection` | `app/safety-child-protection/page.tsx` |

### Add to each page

1. **Metadata** — already uses `buildPageMetadata`; ensure:
   - `title: { absolute: ... }` via enhanced `buildPageMetadata` return OR spread pattern like home
   - Description 115–130 chars, keyword-rich
   - `keywords` array (5–8 terms)

2. **JSON-LD** — new `buildMarketingPageSchemas(path, title, description)` in `structured-data.ts`:
   - `WebPage`
   - `BreadcrumbList` (Home → Page name)

3. **Component:** `src/components/seo/marketing-page-json-ld.tsx` (server component)

4. **Central config (optional):** `src/content/marketing-seo.ts` — single source for title/description/keywords per path to avoid drift

### Example enhanced contact metadata

- Title: `Contact Glice — Support, Help & Partnerships` (50–60 chars with ` | Glice`)
- Description: `Contact Glice for video chat support, safety reports, press inquiries, and partnership opportunities. We respond to every message.`
- Keywords: contact glice, glice support, video chat help, ...

Apply similar upgrades to all 8 marketing pages + home.

---

## Do / Don't

| Do | Don't |
|----|-------|
| Same "Talk to strangers!" tagline on all 13 SEO pages | Change omegle page |
| Brand-colored mini header per `data-brand` | Bring back blue seo-topbar |
| JsonLd on every marketing static page | noindex pages (messages, etc.) |
| `npm run build` pass | |

---

## Acceptance

- [ ] `/talk-to-strangers/ometv` shows sticky mini header: "OmeTV Alternative" + "Talk to strangers!"
- [ ] All 13 premium SEO routes have mini header
- [ ] `/contact` has WebPage + Breadcrumb JSON-LD in HTML
- [ ] All 9 marketing routes have enhanced metadata + JSON-LD
- [ ] `npm run build` exit 0
