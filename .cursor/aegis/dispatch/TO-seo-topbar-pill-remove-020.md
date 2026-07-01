# TO-seo-topbar-pill-remove-020 — Remove outer pill border on "Get Glice Free"

**Date:** 2026-07-01  
**Stack:** `GliceFlutterV1/glice-website`

---

## User request (verbatim)

> remove the out border rounded too

**Screenshot:** SEO topbar "Get Glice Free" — outer pill-shaped border (rounded-full wrapper with semi-transparent bg) around logo + text. User wants **only** logo (green rectangle) + text, **no outer pill**.

---

## Target

`.seo-topbar__app` in `src/styles/seo-landing.css` (lines ~54–61)

**Remove:**
- `border-radius: 999px`
- `border: 1px solid ...`
- `background: color-mix(...)` pill fill
- Extra asymmetric padding meant for pill (`0.35rem 0.85rem 0.35rem 0.35rem`) → simple inline-flex gap like plain link

**Keep:**
- `.nav-brand-mark` / `.seo-topbar__brand-mark` green rectangle logo
- "Get Glice Free" white text
- `color: var(--brand-text-on-primary)`
- Hover opacity

**Do NOT change:** `.seo-topbar__back` pill (Back button) unless user asks.

---

## Acceptance

- [ ] "Get Glice Free" has no visible outer pill border/background
- [ ] Logo rectangle + green border unchanged
- [ ] `npm run build` exit 0
