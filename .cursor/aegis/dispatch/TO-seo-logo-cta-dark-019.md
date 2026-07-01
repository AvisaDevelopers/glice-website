# TO-seo-logo-cta-dark-019 — Home-style logo, restore CTA icons, solid colors (no gradients)

**Date:** 2026-07-01  
**Stack:** Next.js — `GliceFlutterV1/glice-website`  
**Follows:** TO-glice-logo-replace-018 (user revises that work)

---

## User request (verbatim)

> check logo on home page like the rectangle with and green at it border and also remove the border of roun on other pages and also make the start button like before you remove those icon and aslo remove gradient thee will be theme dark color only

---

## Interpretation

| # | Ask | Action |
|---|-----|--------|
| 1 | Logo should match **home header** | Use `.nav-brand-mark` style: **rounded rectangle** (`border-radius: 20%`), **green border** `#02FFA2`, Glice icon inside — same as `Header.tsx` / `theme.css` lines 240–266 |
| 2 | Remove **round** border on SEO pages | Drop circular white badges (`border-radius: 50%`, white circle bg) on topbar logo wrapper |
| 3 | **Start Video Chat** CTA pill | **Restore pre-018 design**: dual decorative Remix icons `ri-vidicon-fill` + `ri-chat-smile-3-fill` in two offset circles — **remove Glice logo from CTA pill** |
| 4 | **No gradients** on SEO template | Replace all `linear-gradient` / `radial-gradient` in `seo-landing.css` with **solid** brand colors (`var(--brand-primary)`, `var(--brand-accent)`, `var(--brand-surface)`) |

**Topbar "Get Glice Free"** keeps Glice logo but in **home rectangle+green border** style (not round badge).

**Omegle route:** out of scope.

---

## Reference — home logo (canonical)

```css
/* theme.css .nav-brand-mark */
width: 36px; height: 36px;
border-radius: 20%;
border: 1px solid #02FFA2;
/* ::before mask with /icons/transparent_icon.png */
```

`Header.tsx` uses `<span className="nav-brand-mark" />` — no Image component.

**Preferred approach for SEO topbar:** Reuse `.nav-brand-mark` class directly OR add `variant="framed"` to `GliceBrandMark` that applies same rectangle+green border (no white circle).

---

## Reference — CTA pill before TO-018

```tsx
<span className="seo-cta-pill__deco seo-cta-pill__deco--cam">
  <span className="seo-cta-pill__deco-circle seo-cta-pill__deco-circle--primary">
    <i className="ri-vidicon-fill" />
  </span>
</span>
<span className="seo-cta-pill__deco seo-cta-pill__deco--chat">
  <span className="seo-cta-pill__deco-circle seo-cta-pill__deco-circle--accent">
    <i className="ri-chat-smile-3-fill" />
  </span>
</span>
```

Restore `.seo-cta-pill__deco--cam`, `.seo-cta-pill__deco--chat`, `--primary`, `--accent` circle variants in CSS if removed.

---

## Files to edit

| File | Changes |
|------|---------|
| `src/components/brand/glice-brand-mark.tsx` | Optional: `variant="framed"` matching nav-brand-mark |
| `src/components/marketing/seo/premium-seo-landing-page.tsx` | Topbar: framed logo; SeoCtaPill: restore dual Remix icons |
| `src/styles/seo-landing.css` | Remove round badges on topbar; restore CTA deco layout; **purge gradients** → solids |

### Gradients to replace in `seo-landing.css`

| Selector | Current | Replace with |
|----------|---------|--------------|
| `.seo-cta-pill` | `linear-gradient(135deg, primary, accent mix)` | `background: var(--brand-primary)` |
| `.seo-hero-accent` | `linear-gradient(90deg, primary, accent)` | `background: var(--brand-primary)` (or solid accent — pick one) |
| `.seo-photo-panel::after` | brand gradient overlay | `background: color-mix(in srgb, var(--brand-primary) 45%, transparent)` solid overlay OR remove blend |
| `.seo-photo-panel::before` | radial dot pattern | remove or solid tint |

Grep `seo-landing.css` for `gradient` → **0** when done.

---

## Do / Don't

| Do | Don't |
|----|-------|
| Match home `.nav-brand-mark` exactly on SEO topbar | Round white circle badge on logo |
| Restore cam+chat icons on CTA only | Put Glice logo on CTA pill |
| Solid fills for CTA, accent bar, overlays | `linear-gradient` / `radial-gradient` in seo-landing.css |
| Keep per-platform `--brand-*` vars from brand-schemes | Revert to unified black/gold or omegle changes |
| `npm run build` pass | Touch video-hero or omegle |

---

## Acceptance checklist

- [ ] SEO topbar logo = rounded rectangle + `#02FFA2` green border (matches home header)
- [ ] No `border-radius: 50%` white circle on topbar logo wrapper
- [ ] `SeoCtaPill` has `ri-vidicon-fill` + `ri-chat-smile-3-fill` (two deco circles), no `GliceBrandMark` on pill
- [ ] `rg gradient src/styles/seo-landing.css` → 0 matches
- [ ] CTA pill background = solid `var(--brand-primary)` (no gradient)
- [ ] `npm run build` exit 0

---

## Verify

```bash
cd GliceFlutterV1/glice-website
rg "gradient" src/styles/seo-landing.css
rg "GliceBrandMark" src/components/marketing/seo/premium-seo-landing-page.tsx  # should only be topbar, not CTA
rg "ri-vidicon-fill|ri-chat-smile-3-fill" src/components/marketing/seo/
npm run build
```

Manual: `/` home header vs `/talk-to-strangers/emerald-chat` topbar — logo frames should match.
