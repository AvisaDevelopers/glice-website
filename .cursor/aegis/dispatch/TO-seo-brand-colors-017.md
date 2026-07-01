# Task Order TO-seo-brand-colors-017

**Director:** Algoristali  
**Date:** 2026-07-01  
**Scope:** 13 SEO pages — **NOT** `omegle-alternative`

---

## 1. User feedback

> "Why you design all other pages like yellow and black — I don't like black."
> "I want the platform I mention or page is about — choose their color scheme and give page their color pattern."

**Reject:** Unified dark black + gold premium theme (TO-014).

**Want:** Each SEO landing page uses a **brand-inspired color pattern** matching the **competitor/platform** that page is about — NOT black-dominant, NOT one theme for all.

---

## 2. Design rules

### Global rules (all 13 pages)
- **NO black-dominant** backgrounds (`#000`, `#0B0B0F`, `#111` as page shell) — user dislikes black
- **NO unified gold** accent on every page
- **2–3 colors per page** inspired by that platform's real branding
- Hero + sections use that page's palette only
- CTA still links to `VIDEO_HERO_HREF` (`/#videoHero`)
- Light/mid-tone backgrounds preferred over dark unless brand requires

### Per-page brand palettes

Assign in `src/content/seo/brand-schemes.ts`:

| Slug | Page about | Primary | Accent | Surface (sections) |
|------|------------|---------|--------|-------------------|
| `hub` | Talk to strangers / Glice | `#2563EB` blue | `#F59E0B` amber | `#EFF6FF` light blue |
| `coomeet` | Coomeet | `#FF6B35` coral-orange | `#004E89` navy | `#FFF5F0` |
| `y99` | Y99 chat | `#7C3AED` violet | `#EC4899` pink | `#F5F3FF` |
| `chatroulette` | Chatroulette | `#00A651` CR green | `#FFFFFF` white cards | `#E8F5E9` |
| `bazoocam` | Bazoocam | `#E85D04` orange | `#1D3557` dark blue | `#FFF4ED` |
| `ometv` | OmeTV | `#FF5722` deep orange | `#2196F3` blue | `#FFF3E0` |
| `joingy` | Joingy | `#6366F1` indigo | `#14B8A6` teal | `#EEF2FF` |
| `emerald-chat` | Emerald Chat | `#10B981` emerald | `#065F46` forest | `#ECFDF5` |
| `text-chat` | Text chat | `#3B82F6` blue | `#8B5CF6` purple | `#EFF6FF` |
| `random-chat` | Random chat | `#F43F5E` rose | `#FB923C` orange | `#FFF1F2` |
| `monkey-run` | Monkey Run | `#A855F7` purple | `#FACC15` yellow | `#FAF5FF` |
| `chat-avenue` | Chat Avenue | `#0EA5E9` sky | `#22C55E` green | `#F0F9FF` |
| `monkey-alternative` | Monkey app | `#6B46C1` purple | `#FACC15` yellow | `#F3E8FF` |

**Note:** These are brand-*inspired*, not exact copies. No black page shells — use primary/accent/surface tints.

---

## 3. Implementation

### 3.1 Create `src/content/seo/brand-schemes.ts`
```ts
export type BrandScheme = {
  id: string;
  primary: string;
  accent: string;
  surface: string;
  surfaceAlt: string; // alternate section
  textOnPrimary: string;
  textOnAccent: string;
};
export const BRAND_SCHEMES: Record<string, BrandScheme>;
export function getBrandScheme(slug: string): BrandScheme;
```

### 3.2 Update `premium-seo-landing-page.tsx`
- `getBrandScheme(content.slug)`
- Set CSS vars on root: `--brand-primary`, `--brand-accent`, `--brand-surface`, `--brand-surface-alt`
- `data-brand={scheme.id}`

### 3.3 Rewrite `seo-landing.css`
- Remove all `--premium-*` black/gold tokens
- All sections use `var(--brand-primary)`, `var(--brand-accent)`, `var(--brand-surface)`
- Hero: surface or primary tint left, accent headline + CTA pill
- Top bar: `background: var(--brand-primary)` white text
- Stats/features/comparison/FAQ: alternate surface / surfaceAlt
- **Zero `#000` / `#111` page backgrounds**

### 3.4 Delete unused
- Remove any leftover `color-schemes.ts` if exists
- Remove `--premium-*` CSS

**DO NOT touch:** omegle-alternative (orange+white)

---

## 4. Acceptance checklist

- [ ] `/talk-to-strangers/emerald-chat` — green emerald theme (not black/gold)
- [ ] `/talk-to-strangers/monkey-alternative` — purple + yellow
- [ ] `/talk-to-strangers/coomeet` — coral + navy accents
- [ ] No page uses black `#000`/`#111` as main background
- [ ] Each of 13 pages visually distinct brand colors
- [ ] CTA → `/#videoHero`
- [ ] Omegle unchanged
- [ ] `npm run build` exit 0

---

## 5. Verify

Open 3 pages — emerald-chat (green), monkey-alternative (purple/yellow), coomeet (coral) — all different, none black-dominant.
