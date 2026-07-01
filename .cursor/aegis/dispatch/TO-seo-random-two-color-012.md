# Task Order TO-seo-random-two-color-012

**Director:** Algoristali  
**Date:** 2026-07-01  
**Priority:** HIGH  
**Scope:** 13 SEO pages ONLY — **NOT** `omegle-alternative`

---

## 1. User feedback

> "On all pages like random except Omegle — change color theme to random, not like our color. Right now there are so many colors — choose two and give random color scheming, not white."

**Intent:**
- Simplify from current multi-color mess (purple hero + yellow CTA + lavender + dark + gray + black + etc.)
- Each SEO page gets **exactly 2 colors** in its scheme (primary + accent)
- **Different random pair per page** (stable per slug — not changing on every refresh)
- **NO white** backgrounds anywhere on these pages
- **Omegle page untouched** — keeps white/orange/green Omegle brand

---

## 2. Color system design

### 2.1 Predefined 2-color pairs (pick one per page by slug hash)

No white. Each pair = `[primary, accent]`:

| ID | Primary (dominant bg/text areas) | Accent (CTA, highlights) |
|----|----------------------------------|--------------------------|
| A | `#1E1B4B` indigo-dark | `#FBBF24` amber |
| B | `#134E4A` teal-dark | `#FB7185` coral |
| C | `#4C1D95` violet-dark | `#A3E635` lime |
| D | `#7C2D12` rust-dark | `#38BDF8` sky |
| E | `#312E81` indigo | `#F472B6` pink |
| F | `#14532D` forest | `#FCD34D` gold |
| G | `#581C87` purple-dark | `#22D3EE` cyan |
| H | `#1E3A5F` navy | `#F97316` orange |
| I | `#3F3F46` zinc-dark | `#84CC16` lime |
| J | `#701A75` fuchsia-dark | `#FDE047` yellow |
| K | `#1C1917` stone-dark | `#2DD4BF` teal |
| L | `#172554` blue-dark | `#E879F9` fuchsia |
| M | `#422006` brown-dark | `#60A5FA` blue |

Assign deterministically: `hash(slug) % 13` → pair A–M (one per page, all 13 get unique pairs if possible).

### 2.2 How 2 colors apply per page

**Only 2 colors visible** (+ black for text on light accent areas if needed):

| UI element | Color |
|------------|-------|
| Page shell / hero left panel | **Primary** |
| Hero headline + CTA pill | **Accent** (text on primary or accent bg) |
| Top bar | **Primary** (darker shade +10% luminance) |
| All body sections | **Primary** OR **Accent** at 15% opacity alternating — NO third colors |
| Stats, features, comparison, steps, safety, FAQ, bottom CTA | alternate: primary bg / accent tint only |
| Cards | `color-mix(in srgb, accent 12%, primary)` |
| Text on primary bg | white or accent |
| Text on accent areas | primary or black |

**FORBIDDEN on SEO pages:**
- `#FFFFFF` / `#fff` / white backgrounds
- Glice mint `#32e6a1`
- Monkey-specific purple `#6B46C1` + yellow `#FFFF00` as fixed global theme
- Lavender `#F5F3FF`, `#EDE9FE`, `#F0EBFF` as separate tokens
- More than 2 hue families per page

---

## 3. Implementation

### 3.1 Data layer

- Create `src/content/seo/color-schemes.ts`:
  - `SEO_COLOR_PAIRS` array (13 pairs)
  - `getColorSchemeForSlug(slug: string)` → `{ primary, accent, id }`
  - Map each page slug in `pages.ts` to scheme OR compute from slug

### 3.2 Component

- Update `premium-seo-landing-page.tsx`:
  - Accept `colorScheme` prop or read from content
  - Set inline style OR `data-scheme="A"` on root wrapper
  - CSS variables: `--seo-primary`, `--seo-accent` on `.seo-landing--premium`

### 3.3 CSS rewrite

- Rewrite `seo-landing.css` to use **only** `var(--seo-primary)` and `var(--seo-accent)` (+ black/white text contrast only)
- Remove hardcoded `--seo-purple`, `--seo-yellow`, `--seo-bg-lavender`, etc.
- Hero: primary bg left, accent headline + CTA
- Photo panels: duotone overlay using primary+accent only
- Body sections: alternate primary / accent-15% — no white

### 3.4 Routes

- All 13 `page.tsx` files pass scheme via enriched content OR auto from slug in `PremiumSeoLandingPage`

**DO NOT touch:**
- `omegle-alternative` route, `omegle-theme.css`, `omegle-page.tsx`
- Home `/`

---

## 4. Acceptance checklist

- [ ] Each of 13 SEO pages has unique 2-color pair (visually distinct when clicking test grid)
- [ ] Zero white section backgrounds
- [ ] No Glice mint, no fixed purple/yellow Monkey palette on all pages
- [ ] Only 2 hues per page (+ neutral text black/white for contrast)
- [ ] Omegle page unchanged
- [ ] `npm run build` exit 0

---

## 5. Verify

1. Open `/talk-to-strangers/random-chat` — 2 colors only, no white
2. Open `/talk-to-strangers/coomeet` — different 2-color pair
3. Open `/talk-to-strangers/omegle-alternative` — still Omegle white/orange/green
