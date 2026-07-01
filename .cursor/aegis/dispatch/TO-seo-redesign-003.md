# Task Order TO-seo-redesign-003

**Director:** Algoristali  
**Date:** 2026-07-01  
**Priority:** CRITICAL — user rejected v2 design  
**Stack:** Next.js 16 · React 19 · Tailwind v4

---

## User feedback (MUST fix)

1. **Call-start section on ALL pages** (except omegle-alternative) — prominent "Start Video Chat" CTA that navigates to `/?start=1` or `/#videoHero` on Glice home where real calling begins. NOT inline video on SEO pages.
2. **Omegle page ONLY** keeps inline `VideoHero` — but redesign A-to-Z with **modern premium UI** (NOT old classic Omegle white/green clone from v2).
3. **Design reference:** Monkey.app SEO hero (see workspace image `assets/c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_d659c7a41841f2127197e85279738b6d_images_image-f9a11b49-d6bc-477c-9360-77e5c2bee485.png`):
   - Bold split hero: dark content panel + stylized photo panel
   - High-contrast accent (Monkey uses purple + yellow) — **Glice adaptation:** use Glice brand but NOT mint gradient washes
   - Large yellow/primary CTA pill "Start Video Chat"
   - Avatar row, decorative icons, premium typography
   - Production marketing feel — NOT template/AI-generated
4. **REMOVE gradient green** — no mint gradient meshes, no `radial-gradient` green glows on SEO pages. Looks AI-generated.
5. **REMOVE app screenshots** (`/icons/feature_images/*.png`) from SEO pages — user says they make no sense on competitor landing pages.
6. **Production-ready** — custom illustrations/icons, halftone or duotone photo treatments (CSS), bento cards, comparison tables, FAQ — all polished.

---

## Wave A — 13 dark SEO pages redesign

**Routes:** all `/talk-to-strangers/*` EXCEPT `omegle-alternative`

### Hero (Monkey-inspired, Glice-branded)

```
┌─────────────────────────────────────────────────┐
│ [← Back]                    [Get Glice Free]    │  subtle top bar
├──────────────────┬──────────────────────────────┤
│ BLACK/dark panel │ Stylized photo panel         │
│ Big bold H1      │ (CSS duotone/halftone overlay│
│ Subtitle         │  — use unsplash or CSS shapes)│
│ [Start Video Chat →] links to /#videoHero        │
│ Avatar strip     │                              │
└──────────────────┴──────────────────────────────┘
```

- CTA button: solid accent (consider amber/gold `#F5C518` or white on dark — NOT green gradient)
- Secondary CTA: Download app
- Trust line below CTA

### Body sections (no screenshots)

- Stats strip (numbers only, clean)
- Feature cards with **Remix icons only** — no phone mockups
- Comparison table (Glice vs competitor)
- 3-step how it works (icon steps)
- Safety block
- FAQ accordion
- Bottom CTA → links to `/#videoHero` again

### Home deep-link

- Ensure home `VideoHero` can auto-focus/start when `?start=1` or hash `#videoHero` — add scroll-into-view + optional auto-highlight on Start button if simple; at minimum scroll to video hero section.

---

## Wave B — Omegle alternative premium redesign

**Route:** `/talk-to-strangers/omegle-alternative` ONLY

- **Modern premium Omegle-style** — think 2024+ redesign, not 2010 white page
- Monkey-level visual quality: split hero, bold typography, premium video area
- Keep **inline VideoHero** with `variant="omegle"` but restyle to match new premium design language
- Green can be used sparingly for Omegle brand recognition on buttons — not gradient washes
- Hide Glice header/footer on this route (keep)
- 18+ gate before start (keep)
- Video | Text tabs (keep)

---

## Wave C — CSS cleanup

- Gut `seo-landing.css` green gradients
- Replace with solid surfaces, hairline borders, subtle noise texture if needed
- Match Glice dark `#111` bg + single accent `#32e6a1` used sparingly (borders, icons) — NOT full-page green glow

---

## Files likely touched

- `src/components/marketing/seo/premium-seo-landing-page.tsx` — full rewrite
- `src/styles/seo-landing.css` — rewrite
- `src/content/seo/pages.ts` — remove feature image refs
- `src/components/omegle/omegle-page.tsx` — premium redesign
- `src/styles/omegle-theme.css` — update
- `src/components/video/video-hero.tsx` — home deep-link support if needed
- `src/app/page.tsx` — handle `?start=1`

---

## Out of scope

- Footer SEO links
- sitemap

---

## Verify

- All 13 SEO pages: hero CTA → navigates to home video
- No green gradients, no feature_images on SEO pages
- Omegle: premium UI + inline call works
- `npm run build` passes
