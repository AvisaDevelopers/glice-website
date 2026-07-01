# TO-remove-seo-test-links-024 — Remove dev QA SEO link grid from home

**Date:** 2026-07-01

## User request

> remove all these pages Dev / QA only — SEO Pages (testing) — Quick links to all talk-to-strangers landing pages for verification. like links dev done

## Scope

1. Remove `<SeoPagesTestLinks />` from `src/app/page.tsx` and its import
2. Delete `src/components/home/seo-pages-test-links.tsx`
3. Grep repo — no remaining references to `SeoPagesTestLinks` or "SEO Pages (testing)"

## Out of scope

- Do NOT remove `/talk-to-strangers/*` routes — only the home-page dev link grid
- Do NOT change sitemap or SEO metadata

## Acceptance

- [ ] Home page has no "SEO Pages (testing)" section
- [ ] `rg SeoPagesTestLinks` → 0 matches
- [ ] `npm run build` exit 0
