# Task Order TO-seo-omegle-content-009

**Director:** Algoristali  
**Date:** 2026-07-01  
**Priority:** HIGH  
**Project:** `GliceFlutterV1/glice-website`

---

## 1. User feedback

> "On all pages I see sections with bg white but I think there should be other color like app or other not white — solve these issues."
> "For Omegle page the content is too low right now."
> Reference: https://www.monkey.app/omegle/ — redesign like that on our web, NOT the same, change design some way, make font some large."

---

## 2. Reference analysis — Monkey `/omegle/` page structure

From https://www.monkey.app/omegle/ (do NOT copy text — match **structure & density**):

1. **Hero banner** — full-width image/banner with headline overlay
2. **Intro long-form copy** — multiple paragraphs about Omegle history + alternative positioning
3. **"Modern Experience" section** — feature bullets with icons
4. **"Safety First" section** — contrasting background
5. **Features grid** — 2-column feature cards with headings + paragraphs
6. **"Making New Friends" section** — 4 sub-cards (Privacy, Interests, DUO, Group)
7. **FAQ accordion** — 5+ questions, large readable text
8. **Bottom CTA section** — meet strangers CTA
9. **Varied section backgrounds** — NOT all white; alternates purple tint, light gray, white, dark accents
10. **Large typography** — H1/H2 noticeably large, body 18px+

**Glice adaptation:**
- Position **Glice** as Omegle alternative (not Monkey)
- Original copy only
- Omegle route keeps **Omegle brand colors** on functional area (white/orange/green for video UI)
- **SEO content below video** can use richer layout with soft purple `#F3EEFF`, light gray `#F5F5F5`, white `#FFFFFF` alternating — NOT stark plain white everywhere

---

## 3. Wave A — Fix white section colors on 13 SEO pages

**Routes:** all `/talk-to-strangers/*` EXCEPT `omegle-alternative`

**Problem:** Body sections alternate to harsh plain `#FFFFFF` white blocks that clash with Monkey purple/black hero — looks broken vs app theme.

**Fix in `seo-landing.css` + `premium-seo-landing-page.tsx`:**

| Section | New background |
|---------|----------------|
| Stats strip | Purple tint `#EDE9FE` or dark `#1a1a1a` |
| Features | Light lavender `#F5F3FF` |
| Comparison table | White `#FFFFFF` (one white section OK) |
| How it works | Dark `#111111` with white text |
| Safety | Purple `#6B46C1` with white text |
| FAQ | Light gray `#F0F0F0` |
| Bottom CTA | Yellow accent band `#FFFF00` on dark `#000` |

- Remove generic `.seo-section--light { background: #fff }` if applied to all sections
- Use explicit per-section tokens: `--seo-bg-purple`, `--seo-bg-dark`, `--seo-bg-lavender`, `--seo-bg-gray`
- Increase body font: `font-size: 1.125rem` (18px) for lede paragraphs, H2 `clamp(2rem, 4vw, 3rem)`

---

## 4. Wave B — Omegle page rich content redesign

**Route:** `/talk-to-strangers/omegle-alternative` ONLY

**Problem:** Content "too low" — logged-out page has video hero at top but SEO content is sparse/minimal below; logged-in shows only video.

### 4.1 Logged OUT layout (priority)

```
┌─────────────────────────────────────┐
│ Mini header: Omegle logo            │
├─────────────────────────────────────┤
│ VIDEO HERO (compact, max ~480px h)  │  ← not pushing content to bottom
├─────────────────────────────────────┤
│ HERO BANNER SECTION (lavender bg)   │  ← NEW: large H1 "Glice: Safe Omegle    │
│   Alternative 2026" + intro paragraph│     Alternative" 2-3 paragraphs       │
├─────────────────────────────────────┤
│ Features 2-col grid                 │
├─────────────────────────────────────┤
│ Safety section (purple bg)          │
├─────────────────────────────────────┤
│ 4-card "Why Glice" grid             │
├─────────────────────────────────────┤
│ FAQ (large text)                    │
├─────────────────────────────────────┤
│ Bottom CTA → Start / Download       │
└─────────────────────────────────────┘
```

- **Move rich SEO content UP** — immediately below video area (not buried at page bottom)
- Video area: **compact** on landing (`max-height: 420px`) so content visible without long scroll
- Create `src/components/omegle/omegle-seo-content.tsx` — rich sections like Monkey reference
- Create `src/content/seo/omegle-page-content.ts` — original copy data
- Typography: H1 `clamp(2.5rem, 5vw, 3.5rem)`, H2 `clamp(1.75rem, 3vw, 2.5rem)`, body `1.125rem`
- Section backgrounds alternate: `#F5F3FF`, `#FFFFFF`, `#EDE9FE`, `#6B46C1` (purple safety block with white text) — **not all white**

### 4.2 Logged IN

- VideoHero functional UI only + mini header (unchanged from TO-007)
- No SEO sections when logged in

### 4.3 Omegle functional area colors (keep)

- Video UI: white/orange/green — do NOT change video toolbar to purple
- SEO sections below: can use app-adjacent colors (lavender, purple tints) — NOT stark white blocks

---

## 5. Files to edit

**Wave A:**
- `src/styles/seo-landing.css`
- `src/components/marketing/seo/premium-seo-landing-page.tsx` (section class names if needed)

**Wave B:**
- `src/components/omegle/omegle-page.tsx`
- `src/components/omegle/omegle-seo-content.tsx` (new or expand existing `OmegleSeoSection`)
- `src/content/seo/omegle-page-content.ts` (new)
- `src/styles/omegle-theme.css` (SEO section styles, compact video, typography)

---

## 6. Do NOT

- Copy Monkey.app text verbatim
- Change home `/` page
- Change omegle video toolbar to purple/monkey colors
- Use app screenshots

---

## 7. Acceptance checklist

**SEO pages (13):**
- [ ] No long runs of plain white sections — alternating themed backgrounds
- [ ] Larger fonts on headings and body
- [ ] Visually cohesive with purple/yellow hero

**Omegle page:**
- [ ] Logged out: rich content visible without excessive scroll past empty space
- [ ] Video area compact; SEO sections immediately below
- [ ] Structure similar density to monkey.app/omegle (hero copy, features, safety, cards, FAQ, CTA)
- [ ] Original Glice copy, larger typography
- [ ] Section backgrounds varied (not all white)
- [ ] Logged in: video only unchanged
- [ ] `npm run build` exit 0

---

## 8. Verify

1. `/talk-to-strangers/emerald-chat` — no harsh white blocks, larger text
2. `/talk-to-strangers/omegle-alternative` logged out — rich content below compact video, scroll feels like Monkey omegle page density
3. `/talk-to-strangers/omegle-alternative` logged in — video only
