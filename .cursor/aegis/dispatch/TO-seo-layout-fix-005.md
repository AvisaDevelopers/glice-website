# Task Order TO-seo-layout-fix-005

**Director:** Algoristali  
**Date:** 2026-07-01  
**Priority:** HOTFIX  
**Bug:** SEO landing hero content shifted to right — large empty black void on left half of viewport

---

## 1. User report + screenshot

**Screenshot:** `assets/c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_d659c7a41841f2127197e85279738b6d_images_image-e756b487-ff7c-4bf4-a739-285df15d8899.png`

**Symptoms on `/talk-to-strangers/emerald-chat` (and likely all 13 SEO pages):**
- Purple top bar spans full width correctly
- Hero split layout broken: entire text block + photo panels sit on RIGHT side
- LEFT ~50% of viewport is empty black — no content
- Yellow headline, copy, and slanted photo panels all clustered right
- Looks like grid column misalignment, wrong `grid-template-columns`, missing full-bleed, or `page-container` / `margin-left` pushing content

**Expected (Monkey reference):**
- Hero fills **full viewport width**
- Left 55%: black panel with label, yellow H1, subtitle, CTA, avatars — **flush from left edge** (with normal page padding only)
- Right 45%: photo panels — flush to right edge
- No empty black dead zone on the left

---

## 2. Root cause investigation

Read and diagnose:
- `src/components/marketing/seo/premium-seo-landing-page.tsx` — hero HTML structure, wrapper classes
- `src/styles/seo-landing.css` — `.seo-hero`, `.seo-hero__split`, `.seo-hero__copy`, `.seo-hero__visual`, grid/flex rules
- `src/app/layout.tsx` / `globals.css` — any `page-container`, `hero--below-header` padding left from hidden header
- `src/components/layout/site-chrome.tsx` — header hidden on SEO routes; check if `padding-top: var(--site-header-h)` still applied on body/hero when header hidden

**Likely causes to check:**
1. `grid-template-columns: 1fr 1fr` with copy in wrong column or empty first column
2. `max-width` + `margin: 0 auto` on inner wrapper but visual panel absolute-positioned wrong
3. `hero--below-header` or `padding-top: var(--site-header-h)` on SEO pages where header is hidden → content offset
4. `page-container` class constraining hero to center column instead of full bleed
5. Photo panels `position: absolute; right: 0` without copy panel filling left
6. Missing `width: 100%` on `.seo-hero` or parent
7. Flex `justify-content: flex-end` on hero row

---

## 3. Fix requirements

1. Hero section must be **full viewport width** (`width: 100%`, no unintended max-width on split container)
2. Split grid: **55% copy left | 45% visual right** on desktop (≥1024px)
3. Copy panel: `background: #000`, fills its grid cell completely, content padded `clamp(24px, 4vw, 64px)`
4. Visual panel: fills right cell, photo panels visible, no overflow pushing layout right
5. On mobile (<1024px): stack vertically — copy full width on top, visual below (or hide visual)
6. Remove any `padding-top: var(--site-header-h)` on SEO hero when site header is hidden — SEO pages use their own purple topbar only
7. Add body class `seo-route` via site-chrome or page wrapper to zero out header offset if needed:
   ```css
   body.seo-route .seo-hero { padding-top: 0; }
   body.seo-route { --site-header-h: 0px; } /* only on SEO routes */
   ```
8. Verify on `/talk-to-strangers/emerald-chat` and `/talk-to-strangers` hub

---

## 4. Files to edit

- `src/styles/seo-landing.css` — primary fix
- `src/components/marketing/seo/premium-seo-landing-page.tsx` — structure if markup is wrong
- `src/components/layout/site-chrome.tsx` — optional `seo-route` body class
- Do NOT touch omegle-alternative

---

## 5. Acceptance checklist

- [ ] No empty black void on left half at 1920px, 1440px, 1280px widths
- [ ] Yellow headline starts near left padding (not center-screen)
- [ ] Photo panels on right half only
- [ ] Purple topbar still full width
- [ ] Mobile: stacked, no horizontal scroll
- [ ] `npm run build` exit 0

---

## 6. Verify

Open `/talk-to-strangers/emerald-chat` at desktop width — hero should match Monkey split (content left, photos right, full bleed).
