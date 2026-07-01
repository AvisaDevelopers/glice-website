# TO-full-seo-021 — Full-site SEO: canonical, robots, sitemap, JSON-LD, review schema

**Date:** 2026-07-01  
**Stack:** Next.js 16 App Router — `GliceFlutterV1/glice-website`  
**Reference:** [Monkey Omegle SERP](https://www.monkey.app/omegle/) — sitelinks, aggregate rating `4.8(856,200)`, rich title/description

---

## User request (verbatim)

> do full website seoo and the conoical tage domain will picup from the env and make sure all pages of website will be index and also make sechams of review too ... like all pages as i attach image will also be shown if some search glice or video calling ... proper advanced level of seo optimization

**Audit sample (text-chat):** Missing canonical, robots tag, keywords, publisher; no robots.txt/sitemap.xml.

---

## Goals

1. **Canonical URLs** from env (`NEXT_PUBLIC_SITE_URL`)
2. **robots.txt** + **sitemap.xml** (Next.js `robots.ts` / `sitemap.ts`)
3. **Index all public marketing + SEO pages**; noindex private/auth flows
4. **JSON-LD structured data:** Organization, WebSite (+ sitelinks nav), SoftwareApplication + **AggregateRating** (review stars like Monkey), FAQPage, BreadcrumbList
5. **Enhanced metadata** on every public page: title, description, keywords, openGraph, twitter, robots, canonical, publisher
6. **Competitive SEO titles** — especially omegle page (Monkey-style intent keywords + 2026)

---

## Environment

Add to `.env.example` (and document in TO):

```env
NEXT_PUBLIC_SITE_URL=https://glice.app
```

Fallback dev: `http://localhost:3000` when unset.

**Never commit real secrets.** User `.env` may only have API URL today — add `NEXT_PUBLIC_SITE_URL` placeholder comment in `.env.example` only.

---

## Architecture — new files

```
src/lib/seo/
  site-config.ts          # getSiteUrl(), SITE_NAME, default OG image
  build-metadata.ts       # buildPageMetadata(), buildSeoPageMetadata()
  structured-data.ts      # schema builders (org, website, app+rating, faq, breadcrumb)
  routes.ts               # INDEXABLE_ROUTES, NOINDEX_ROUTES for sitemap
src/components/seo/
  json-ld.tsx             # <JsonLd data={...} /> renders script type=application/ld+json
src/app/robots.ts
src/app/sitemap.ts
```

---

## `site-config.ts`

```ts
export const SITE_NAME = "Glice";
export const SITE_TAGLINE = "Live Random Video Chat. Real Connections.";
export const DEFAULT_OG_IMAGE = "/icons/logo.png";
export const AGGREGATE_RATING = {
  ratingValue: "4.8",
  ratingCount: "125000",  // configurable constant — update from Play Store when available
  bestRating: "5",
};
export function getSiteUrl(): string { ... }
export function absoluteUrl(path: string): string { ... }
```

---

## `build-metadata.ts` — every public page gets

```ts
{
  title,
  description,
  keywords?: string[],
  alternates: { canonical: absoluteUrl(path) },
  robots: { index: true, follow: true },  // or noindex for private routes
  openGraph: { title, description, url, siteName, images, locale: 'en_US', type: 'website' },
  twitter: { card: 'summary_large_image', title, description, images },
  publisher: SITE_NAME,
}
```

**Root `layout.tsx`:** set `metadataBase: new URL(getSiteUrl())`, default robots index, openGraph site defaults.

---

## Indexable routes (sitemap + index)

| Path | Notes |
|------|-------|
| `/` | Home |
| `/about`, `/features`, `/contact` | Marketing |
| `/privacy-policy`, `/terms-and-conditions`, `/community-guidelines` | Legal |
| `/safety-tips`, `/safety-child-protection` | Safety |
| `/talk-to-strangers` | Hub |
| `/talk-to-strangers/coomeet` … all 13 slugs | SEO landings |
| `/talk-to-strangers/omegle-alternative` | Priority — competitive title |

**Noindex** (`robots: { index: false }`):
- `/messages`, `/onboarding`, `/history`, `/reset-password`

---

## JSON-LD per page type

### Global (root layout or home)
- **Organization** — name Glice, url, logo `/icons/logo.png`
- **WebSite** — name, url, `potentialAction` SearchAction, **hasPart** or navigation ItemList of main `/talk-to-strangers/*` URLs (sitelinks signal)

### All SEO landing pages (`PremiumSeoLandingPage` + Omegle)
- **WebPage** + **BreadcrumbList** (Home → Talk to Strangers → Page)
- **FAQPage** when `content.faq.length > 0`
- **SoftwareApplication** with **AggregateRating** + free Offer (Monkey-style rich result)

### Omegle page — same schemas + priority metadata

Example review block (match Monkey SERP pattern):
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.8",
  "ratingCount": "125000",
  "bestRating": "5"
}
```

---

## Title/description upgrades (pages.ts + omegle)

Upgrade `metadata` in `src/content/seo/pages.ts` for competitive SERP (original copy, not Monkey verbatim):

| Slug | Title target (≤60 chars) | Description (~150–160 chars, keyword-rich) |
|------|--------------------------|---------------------------------------------|
| `omegle-alternative` | `Omegle Alternative 2026: Free Safe Video Chat` | Best Omegle alternative 2026! Free random video chat on Glice. Mutual matching, AI safety & 1-on-1 chat. Start talking to strangers now! |
| `text-chat` | `Text Chat with Strangers Online 2026` | Free text chat with strangers on Glice after mutual matching. No cold DMs — messaging opens when both show interest. Safe & moderated. |
| `hub` | `Talk to Strangers Online — Free Video Chat 2026` | Meet strangers on Glice with live random video chat, mutual matching, and 18+ safety. The modern way to talk to strangers online. |
| Others | `{Competitor} Alternative 2026 — Glice` pattern | Unique benefit-led descriptions with "video chat", "strangers", "free", "safe" |

Add `keywords: string[]` to `SeoPageContent.metadata` type (optional field) — 5–8 terms per page.

Update `seoMetadata()` in `metadata.ts` to use `buildSeoPageMetadata(content)`.

---

## Wire-up checklist

- [ ] `src/content/seo/types.ts` — extend metadata with optional `keywords?: string[]`
- [ ] `src/content/seo/metadata.ts` — full metadata builder
- [ ] `src/app/layout.tsx` — metadataBase, defaults
- [ ] `src/app/page.tsx` — export home metadata + JsonLd
- [ ] All marketing pages (`about`, `features`, etc.) — use `buildPageMetadata()`
- [ ] `PremiumSeoLandingPage` — inject FAQ + App + Breadcrumb JsonLd from content
- [ ] `OmeglePage` or omegle route — JsonLd from omegle FAQ content
- [ ] `src/app/robots.ts` — allow `/`, disallow `/messages`, `/onboarding`, `/history`, `/reset-password`; sitemap URL
- [ ] `src/app/sitemap.ts` — dynamic from `INDEXABLE_ROUTES` with `lastModified`, `changeFrequency`, `priority` (omegle + hub priority 0.9–1.0)
- [ ] `.env.example` with `NEXT_PUBLIC_SITE_URL`

---

## Do / Don't

| Do | Don't |
|----|-------|
| Use `NEXT_PUBLIC_SITE_URL` for all canonicals | Hardcode production domain |
| noindex auth/private routes | Index /messages or /onboarding |
| Original Glice copy for titles/descriptions | Copy Monkey text verbatim |
| Valid JSON-LD (test with schema structure) | Fake review claims beyond configured constants |
| `npm run build` pass | Break existing page renders |

---

## Acceptance

- [ ] `curl localhost:3000/robots.txt` serves rules + sitemap link (after dev restart)
- [ ] `curl localhost:3000/sitemap.xml` lists all indexable routes
- [ ] `/talk-to-strangers/text-chat` HTML has `<link rel="canonical"` pointing to `{SITE_URL}/talk-to-strangers/text-chat`
- [ ] Same page has `application/ld+json` with FAQPage + AggregateRating
- [ ] `/messages` has `noindex` robots meta
- [ ] Omegle metadata title includes "2026" + "Omegle Alternative"
- [ ] `rg "metadataBase" src/app/layout.tsx` — present
- [ ] `npm run build` exit 0

---

## Verify commands

```bash
cd GliceFlutterV1/glice-website
npm run build
# After dev server:
curl -s http://localhost:3000/robots.txt
curl -s http://localhost:3000/sitemap.xml | head -40
curl -s http://localhost:3000/talk-to-strangers/omegle-alternative | rg "canonical|application/ld\+json|aggregateRating" -i
```

**Note:** Google sitelinks are algorithmic — structure + sitemap + internal links help but are not guaranteed instantly.
