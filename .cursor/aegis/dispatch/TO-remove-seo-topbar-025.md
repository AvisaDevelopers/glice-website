# TO-remove-seo-topbar-025 — Remove SEO landing topbar header

**Date:** 2026-07-01

## User request (screenshot)

Blue sticky bar on SEO pages: **Back** (left) + **Get Glice Free** (right). User wants this **header removed**.

## Scope

**Remove** entire `<header className="seo-topbar">` block from:
- `src/components/marketing/seo/premium-seo-landing-page.tsx`

**Remove** unused CSS block `.seo-topbar*` from:
- `src/styles/seo-landing.css`

## Keep

- Hero, CTA pills, all page content
- Bottom CTA band Google Play link (still uses `GOOGLE_PLAY_HREF`)
- Omegle page header (separate component) — **do not touch** unless same bar appears there

## Acceptance

- [ ] No `seo-topbar` in premium-seo-landing-page.tsx
- [ ] `/talk-to-strangers/ometv` — no blue Back/Get Glice Free bar
- [ ] `npm run build` exit 0
