# Task Order TO-seo-landing-pages-001

**Director:** Algoristali  
**Date:** 2026-07-01  
**Stack:** Next.js 16 App Router · React 19 · Tailwind v4 · TypeScript  
**Project:** `GliceFlutterV1/glice-website`  
**Specialist:** Web Marketing / SEO Landing Pages (factory-generated)

---

## Mission

Create competitor-style SEO landing pages for Glice (original copy, not copied from monkey.app). Use Glice dark theme on all pages **except** `omegle-alternative` (that page uses a distinct lighter/minimal layout to differentiate). Add a new **Monkey Alternative** page. Add a home-page test link grid so the user can visit every page.

---

## Pages to create (14 routes)

| URL slug | Page focus |
|----------|------------|
| `/talk-to-strangers` | Hub — talk to strangers online with Glice |
| `/talk-to-strangers/coomeet` | Coomeet alternative |
| `/talk-to-strangers/y99` | Y99 alternative |
| `/talk-to-strangers/chatroulette` | Chatroulette alternative |
| `/talk-to-strangers/bazoocam` | Bazoocam alternative |
| `/talk-to-strangers/ometv` | OmeTV alternative |
| `/talk-to-strangers/joingy` | Joingy alternative |
| `/talk-to-strangers/emerald-chat` | Emerald Chat alternative |
| `/talk-to-strangers/text-chat` | Text chat with strangers |
| `/talk-to-strangers/random-chat` | Random chat |
| `/talk-to-strangers/omegle-alternative` | Omegle alternative — **distinct theme (NOT Glice dark)** |
| `/talk-to-strangers/monkey-run` | Monkey Run alternative |
| `/talk-to-strangers/chat-avenue` | Chat Avenue alternative |
| `/talk-to-strangers/monkey-alternative` | **NEW** — Glice as Monkey alternative |

---

## Implementation requirements

1. **DRY architecture** — shared `SeoLandingPage` component + content config (`src/content/seo/` or similar). Do NOT duplicate 14 nearly-identical page files with inline copy.
2. **SEO metadata** — unique `title` + `description` per page via Next.js `metadata` export.
3. **Glice theme** — reuse `PageHero`, `MarketingCta`, `section`, `page-container`, `panel`, `display-*`, `lede`, `chip`, `btn-primary` from existing marketing pages (`src/app/features/page.tsx` pattern).
4. **Omegle exception** — `/talk-to-strangers/omegle-alternative` uses a separate layout variant (e.g. light/neutral background, different accent) — still Glucose Glice branding but visually distinct.
5. **Original content** — each page needs unique H1, intro, 3–4 benefit bullets, FAQ (2–3 items), and CTA. Position Glice honestly (mutual matching, safety, 18+).
6. **Home page test section** — add `SeoPagesTestLinks` (or similar) to home showing all 14 URLs as a simple link grid (dev/testing only — label it clearly e.g. "SEO Pages (testing)").
7. **No footer spam** — do NOT add all links to Footer; home test grid only unless user asks later.
8. **Follow Next.js 16 App Router** — read `AGENTS.md` in project root.

---

## Reference files

- `src/app/features/page.tsx` — marketing page template
- `src/components/marketing/*` — reusable components
- `src/components/home/home-sections.tsx` — home sections
- `src/app/page.tsx` — add test links here
- `src/styles/theme.css` — design tokens

---

## Deliverables

- [ ] Shared SEO landing component + content data
- [ ] 14 route folders under `src/app/talk-to-strangers/`
- [ ] Home page test link grid
- [ ] Department Report with all URLs for user verification

---

## Verify

```bash
cd GliceFlutterV1/glice-website && npm run build
```

Visit each URL from home test grid.

---

## Out of scope

- sitemap.xml / robots.txt
- Footer nav updates
- Copying competitor content
