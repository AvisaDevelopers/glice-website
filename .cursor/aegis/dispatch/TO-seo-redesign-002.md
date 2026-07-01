# Task Order TO-seo-redesign-002

**Director:** Algoristali  
**Date:** 2026-07-01  
**Priority:** HIGH — user rejected v1 as "very bad / too simple"  
**Stack:** Next.js 16 App Router · React 19 · Tailwind v4 · TypeScript

---

## User feedback (MUST address)

1. **Do NOT reuse simple existing marketing components** (`PageHero` + 4-card grid + FAQ is NOT acceptable)
2. **Production-ready premium UI** — richer than monkey.app SEO pages
3. **Study competitor reference** — monkey.app `/talk-to-strangers/*` pages have: hero with CTA, feature sections with icons, comparison blocks, FAQ accordion, download CTA, visual hierarchy, gradients, stats
4. **Omegle page is special** — copy A-to-Z classic Omegle design + wire real video calling from home

---

## Wave A — Premium SEO redesign (13 pages, dark Glice theme)

**Pages:** all `/talk-to-strangers/*` EXCEPT `omegle-alternative`

### Design requirements (better than monkey.app)

Each page must include ALL of:

1. **Cinematic hero** — gradient mesh/bg, large H1, subcopy, primary CTA (Start video / Download), trust chips (18+, Moderated, Free)
2. **Live stats strip** — animated counters or pills (e.g. "10K+ online", "150+ countries") — can be static mock for now
3. **Feature showcase** — 3-column bento OR alternating image+text rows (use `/icons/feature_images/*.png`)
4. **Comparison table** — "Glice vs [Competitor]" with checkmarks (honest, not fake claims)
5. **How it works** — 3-step timeline with icons
6. **Social proof / safety block** — moderation, report/block, mutual matching
7. **FAQ accordion** — styled premium (not plain list)
8. **Bottom CTA band** — gradient panel + Play Store button

### Architecture

- Refactor `SeoLandingPage` → new `PremiumSeoLandingPage` component(s) in `src/components/marketing/seo/`
- Add `src/styles/seo-landing.css` for page-specific animations/gradients
- Extend `SeoPageContent` type with optional: `competitorName`, `stats`, `comparisonRows`, `steps`, `heroCta`
- Keep thin `page.tsx` route files — content stays in `src/content/seo/pages.ts`

### Reference

Monkey hub structure (from fetch): hero → why choose → how to start → feature grid → FAQ → download  
**Beat them:** more visual depth, Glice brand (#32e6a1), motion (`reveal`), bento panels, comparison tables

---

## Wave B — Omegle Alternative page (full clone + live video)

**Route:** `/talk-to-strangers/omegle-alternative`

### Visual — classic Omegle A-to-Z

- **Hide Glice Header + Footer** on this route (update `site-chrome.tsx`)
- White/light gray page (`#fff` / `#f0f0f0`) — NOT Glice dark
- Omegle-style top bar: logo text "Omegle" style heading + tagline "Talk to strangers!"
- Mode tabs: **Video** | **Text** (Text can show "coming soon" or link to messages — Video is primary)
- Classic **green buttons** (`#4CAF50`, hover `#45a049`) — NOT Glice mint
- Checkbox row: "I'm 18+" (required before start)
- Disclaimer text like classic Omegle
- Below fold: SEO content sections (why Glice, FAQ) in omegle-style simple typography

### Functional — real video calling

- **Integrate `VideoHero`** (or extract shared `VideoCallShell`) on omegle page
- Add `variant="omegle"` prop to `VideoHero`:
  - Omegle green for Start / New chat / Like-Skip buttons
  - Light panel backgrounds when idle
  - Same call flow as home: search → connect → in-call controls → feedback
- Update `ui-session-provider.tsx`: `video-hero-active` class also on `/talk-to-strangers/omegle-alternative`
- Add CSS: `.video-hero--omegle` overrides in `src/styles/omegle-theme.css`
- Omegle page layout: when NOT in session show omegle landing UI; when session starts, expand video hero full viewport (like home)

### Files likely touched

- `src/app/talk-to-strangers/omegle-alternative/page.tsx` — new client page shell
- `src/components/omegle/omegle-landing-shell.tsx` — omegle UI wrapper
- `src/components/video/video-hero.tsx` — add `variant?: "default" | "omegle"`
- `src/components/layout/site-chrome.tsx` — hide chrome on omegle route
- `src/components/site/ui-session-provider.tsx` — pathname check
- `src/styles/omegle-theme.css` — import in layout or page

---

## Out of scope

- Footer nav links for SEO pages
- sitemap.xml
- Removing home test grid (keep it)

---

## Verify

```bash
npm run build
```

Manual: visit `/talk-to-strangers` (premium UI), `/talk-to-strangers/coomeet`, `/talk-to-strangers/omegle-alternative` (omegle look + start call works)

---

## Department Report format

1. Hydration confirmation  
2. Before/after summary  
3. Files changed  
4. Screenshots description (what user should see)  
5. Build result
