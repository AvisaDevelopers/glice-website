# TO-seo-title-hydration-022 — Fix duplicate titles + reveal hydration mismatch

**Date:** 2026-07-01

---

## User issues

1. **SEO title duplication:** `OmeTV Alternative 2026 — Glice - Glice` (38 chars + duplicate brand)
   - Root cause: `layout.tsx` `title.template: '%s - Glice'` + SEO titles already end with `— Glice`

2. **Hydration mismatch** on home (`/`): `.reveal` elements get `data-reveal-bound` + inline `transition-delay` on client before/during hydration
   - Source: `src/components/site/site-effects.tsx` imperative DOM mutation

---

## Fix 1 — Titles (`build-metadata.ts`)

In `buildSeoPageMetadata()`:
- Strip trailing `— Glice` / `- Glice` / `| Glice` from `content.metadata.title`
- Return `title: { absolute: \`${cleanTitle} | ${SITE_NAME}\` }` so root **template does not apply** (no double suffix)

Target output examples:
- `OmeTV Alternative 2026 | Glice` (NOT `... — Glice - Glice`)
- `Talk to Strangers Online — Free Video Chat 2026 | Glice`

Also audit `buildPageMetadata` for marketing pages — template `About - Glice` is fine (short titles without brand).

Optional cleanup in `pages.ts`: remove redundant `— Glice` suffix from metadata titles (cosmetic; builder should handle either way).

**Title length:** aim ≤60 chars total; shorten competitor pattern to `OmeTV Alternative 2026` if needed after `| Glice` suffix.

---

## Fix 2 — Reveal hydration (`site-effects.tsx` + CSS)

**Do NOT** set inline `style.transitionDelay` or `data-reveal-bound` on DOM nodes.

Refactor:
1. Track bound elements in `WeakSet` (in-memory), not DOM attributes
2. Stagger via CSS classes: `reveal-stagger-0` … `reveal-stagger-6` with delays in `theme.css` or `globals.css`
3. Delay first bind until hydration complete: `setTimeout(bind, 100)` minimum (or double `requestAnimationFrame`) — remove `setTimeout(..., 0)`
4. MutationObserver start delay ≥100ms after mount

Cleanup on unmount: remove stagger classes only (no attribute cleanup needed for WeakSet).

---

## Acceptance

- [ ] View-source `/talk-to-strangers/ometv` — single `<title>OmeTV Alternative 2026 | Glice</title>` (one Glice only)
- [ ] Home page console — no hydration mismatch on `.reveal` / `data-reveal-bound`
- [ ] Reveal animations still work on scroll
- [ ] `npm run build` exit 0
