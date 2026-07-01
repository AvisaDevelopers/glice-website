# Task Order TO-seo-premium-unified-014

**Director:** Algoristali  
**Date:** 2026-07-01  
**Priority:** CRITICAL  
**Scope:** 13 SEO pages — **NOT** omegle-alternative

---

## 1. User feedback

> "Two color scheme is very bad which make theme very bad — give premium theme to design, go and remove two color setup"

**Action:** **REMOVE** TO-012 random 2-color-per-page system entirely. Replace with **ONE unified premium theme** across all 13 SEO landing pages.

---

## 2. Remove (delete or gut)

- `src/content/seo/color-schemes.ts` — delete OR stop importing
- `getColorSchemeForSlug()` wiring in `premium-seo-landing-page.tsx`
- `data-scheme` attributes on root
- Per-page `--seo-primary` / `--seo-accent` CSS variable overrides
- Random hash color assignment in `pages.ts` / `premium-shared.ts` if any

---

## 3. Unified premium theme (single design system for ALL 13 pages)

**One cohesive palette — not random, not 2-color gimmick:**

| Token | Value | Role |
|-------|-------|------|
| `--premium-bg-deep` | `#0B0B0F` | Page shell, hero left |
| `--premium-bg-elevated` | `#14141A` | Cards, panels |
| `--premium-bg-surface` | `#1C1C24` | Alternate sections |
| `--premium-accent` | `#C9A227` | Gold — CTAs, highlights, icons (premium feel) |
| `--premium-accent-bright` | `#E8C547` | Hover, headline accent |
| `--premium-text` | `#F5F5F7` | Primary text |
| `--premium-muted` | `#9CA3AF` | Secondary text |
| `--premium-border` | `rgba(201, 162, 39, 0.2)` | Subtle gold borders |

**Optional secondary accent (sparingly):** `#8B5CF6` soft violet for photo duotone overlay only — NOT a second theme color on every section.

### 3.1 Premium design language

- **Hero:** Deep black left panel + photo right with gold duotone overlay (not random colors)
- **CTA pill:** Gold gradient `linear-gradient(135deg, #E8C547, #C9A227)`, dark text, subtle shadow — "Start Video Chat"
- **Top bar:** Deep `#14141A` with gold "Get Glice Free" text link — NOT purple Monkey bar
- **Sections:** Alternate `#0B0B0F` / `#14141A` / `#1C1C24` — **NO white**, NO random hues per page
- **Cards:** Glass effect `background: rgba(28,28,36,0.8)`, `border: 1px solid rgba(201,162,39,0.15)`, `backdrop-filter: blur(8px)`
- **Typography:** Large — H1 `clamp(2.5rem,5vw,3.75rem)`, body `1.125rem`, generous line-height
- **Stats:** Gold numbers, dark cards
- **Comparison table:** Dark surface, gold checkmarks
- **FAQ:** Dark accordion, gold open-state border
- **Bottom CTA:** Gold accent line top, deep bg, gold button

### 3.2 Same look on EVERY page

All 13 pages share identical visual theme. Only **copy** changes per competitor (H1, comparison table competitor name). **No per-slug color variation.**

---

## 4. Files to edit

- **Delete or deprecate:** `src/content/seo/color-schemes.ts`
- **Rewrite:** `src/styles/seo-landing.css` — unified premium tokens
- **Update:** `src/components/marketing/seo/premium-seo-landing-page.tsx` — remove scheme props/vars
- **Update:** `src/content/seo/premium-shared.ts` — remove color scheme refs if any
- **Update:** `src/content/seo/types.ts` — remove colorScheme type if added

**DO NOT touch:** omegle route, omegle-theme.css, home `/`

---

## 5. Acceptance checklist

- [ ] `color-schemes.ts` removed or unused
- [ ] All 13 pages look **identical** in theme (visit 2 slugs — same colors)
- [ ] Premium dark + gold aesthetic — not cheap 2-color random
- [ ] No white section backgrounds
- [ ] No per-page color differences
- [ ] Large premium typography
- [ ] CTA still links to `/#videoHero`
- [ ] Omegle unchanged
- [ ] `npm run build` exit 0

---

## 6. Verify

1. `/talk-to-strangers/random-chat` vs `/talk-to-strangers/coomeet` — **same** gold/dark theme
2. `/talk-to-strangers/omegle-alternative` — still orange/white omegle
