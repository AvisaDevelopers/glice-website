# Task Order TO-seo-omegle-polish-010

**Director:** Algoristali  
**Date:** 2026-07-01  
**Priority:** CRITICAL — user still sees white bg sections + bad omegle call UI

---

## 1. User feedback

> "On all pages still there are white bg section why"
> "Omegle calling design is not good — redesign A to Z"

---

## 2. Wave A — ELIMINATE white sections on 13 SEO pages

**Routes:** `/talk-to-strangers/*` EXCEPT `omegle-alternative`

**Problem:** User still sees white background blocks after Wave 009. Likely causes:
- `.seo-section--compare` still `#FFFFFF`
- Feature cards inner `background: white`
- FAQ accordion items white
- Comparison table white cells
- Body/html default white showing through gaps
- `seo-section--light` still used somewhere

**Policy — ZERO plain white section backgrounds:**

| Section | Required bg (no #fff, #ffffff, white) |
|---------|--------------------------------------|
| Page shell | `#0a0a0a` or `#111` dark OR purple tint — never bare white page |
| Stats | `#EDE9FE` purple tint |
| Features | `#E9E0FF` deeper lavender |
| Comparison | `#F0EBFF` very light purple (NOT white) |
| Steps | `#111111` dark |
| Safety | `#6B46C1` purple |
| FAQ | `#E8E8E8` warm gray |
| CTA | `#000000` black |
| All cards inside sections | `rgba(255,255,255,0.08)` on dark OR `#EDE9FE` tint on light-purple sections — **never pure #fff cards on white** |

**Actions:**
1. Grep entire `seo-landing.css` and `premium-seo-landing-page.tsx` for `#fff`, `#ffffff`, `white`, `seo-section--light`, `seo-section--compare` white
2. Replace ALL with themed tokens
3. Set `.seo-landing` page wrapper `background: #111` so no white bleed between sections
4. Feature cards: semi-transparent on lavender OR purple-bordered cards `#DDD6FE` bg
5. Comparison table: purple-tinted rows, not white table on white section

**Typography:** Keep large fonts from 009

---

## 3. Wave B — Omegle call UI A-to-Z redesign

**Route:** `/talk-to-strangers/omegle-alternative`

**Problem:** Video calling area looks bad — stretched panels fixed but overall design not production-quality vs classic Omegle or modern competitor.

### 3.1 Omegle call design spec (authentic + polished)

**Colors (Omegle only — NOT Glice mint, NOT Monkey purple):**
- Page: `#FFFFFF`
- Logo: `#FF6600`
- Start/Next/primary: `#4CAF50`, hover `#45A049`
- Panels idle: `#E8E8E8` border `#CCCCCC`
- Toolbar: `#F5F5F5` bar, buttons white with gray border
- Error banner: `#FFF3F3` bg, `#CC0000` text

**Layout — classic Omegle dual-panel:**
```
┌─────────────────────────────────────────────┐
│  Omegle          Talk to strangers!         │  mini header
├─────────────────────────────────────────────┤
│  ┌──────────────────┬──────────────────┐   │
│  │   STRANGER       │   YOU            │   │  equal 50/50 panels
│  │   (gray idle)    │   (your camera)  │   │  4:3 aspect, centered
│  └──────────────────┴──────────────────┘   │
│  [Everyone ▼]  [Global]     [Start ▶]    │  toolbar row — green Start right
└─────────────────────────────────────────────┘
```

**Redesign scope in `omegle-theme.css` + minimal `video-hero.tsx` omegle variant hooks:**

1. **Card container** — single bordered box `#DDD` 1px, `border-radius: 8px`, `max-width: 800px`, centered, padding 12px (classic Omegle box look)
2. **Dual panels** — equal width 50/50, `aspect-ratio: 4/3`, `background: #E8E8E8`, `border: 1px solid #CCC`
3. **Panel labels** — small gray "Stranger" / "You" top-left inside panel
4. **Toolbar** — horizontal row BELOW panels (not floating overlay): gray bg `#F0F0F0`, full width of card
   - Gender dropdown left
   - Country/global center  
   - Green **Start** button right — large, `#4CAF50`, white text, rounded 4px (Omegle style NOT pill)
5. **Remove** AR filter rail prominence on omegle OR style minimally below toolbar
6. **Badges** — simplify "Waiting" pill to small gray Omegle-style text
7. **Logged-in** — same card design, mini header above
8. **Logged-out landing** — compact video card (max 480px wide centered) + Start button above OR below matching Omegle.com flow
9. **Session active** — expand card to max-width 900px but keep Omegle box aesthetic (not full-bleed dark Glice hero)

**Files:**
- `src/styles/omegle-theme.css` — full rewrite of `.video-hero--omegle` section
- `src/components/omegle/omegle-page.tsx` — wrapper structure if needed
- `src/components/video/video-hero.tsx` — only add omegle-specific classNames if needed (prefer CSS-only)

**Do NOT change** home `/` VideoHero design.

### 3.2 Rich SEO content below (keep from 009)

- Keep `OmegleSeoContent` sections but ensure they also avoid harsh white — use lavender/purple tints per Wave A policy

---

## 4. Acceptance checklist

**SEO 13 pages:**
- [ ] Grep shows zero `#fff` / `#ffffff` as section backgrounds in seo-landing.css (cards may use rgba only)
- [ ] Visual: no white bands between colored sections
- [ ] Page feels purple/dark themed end-to-end below hero

**Omegle:**
- [ ] Call UI looks like polished Omegle box layout (bordered card, 50/50 panels, toolbar below, green Start)
- [ ] Not stretched, centered max-width
- [ ] Orange logo, green buttons, gray panels
- [ ] Logged out + logged in both polished
- [ ] Home `/` unchanged
- [ ] `npm run build` exit 0

---

## 5. Verify

1. `/talk-to-strangers/coomeet` — scroll full page, no white sections
2. `/talk-to-strangers/omegle-alternative` — call UI looks like classic Omegle box
3. `/` — home video unchanged
