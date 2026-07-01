# TO-glice-logo-replace-018 — Replace generic icons with Glice web logo

**Date:** 2026-07-01  
**Stack:** Next.js 16 / React 19 — `GliceFlutterV1/glice-website`  
**Priority:** UI polish — user screenshot shows wrong icon on SEO topbar

---

## User request (verbatim)

> on all pages remove icon and replace with our web logo

**Screenshot context:** Emerald SEO topbar — "Get Glice Free" pill has a circular badge with Remix `ri-video-chat-line` (generic video-chat icon). User wants the **Glice web logo** instead.

---

## Canonical logo asset

| Asset | Path | Used by |
|-------|------|---------|
| **Web logo (primary)** | `/icons/transparent_icon.png` | `Header` (`.nav-brand-mark` CSS mask), `Footer` (`next/image`), `GliceLogoMotion`, favicon companion `/icons/logo.png` |

**Do NOT** invent a new logo or use Remix icons where Glice branding is expected.

---

## Scope

### In scope — SEO landing template (13 pages via one component)

File: `src/components/marketing/seo/premium-seo-landing-page.tsx`

1. **Top bar "Get Glice Free"** (`seo-topbar__app-icon`)
   - **Remove:** `<i className="ri-video-chat-line" />`
   - **Replace with:** Glice logo image (`/icons/transparent_icon.png`) via `next/image` or shared brand component
   - Keep pill layout; logo sits in the existing circular badge

2. **Hero CTA pill** (`SeoCtaPill` decorative circles)
   - **Remove:** `ri-vidicon-fill` and `ri-chat-smile-3-fill` Remix icons
   - **Replace with:** Glice logo — prefer **one** logo mark on the pill (simplify dual cam/chat deco if cleaner) OR both circles show scaled logo; director preference: **single Glice logo** on the right side of the pill, remove redundant second deco circle unless design needs balance

3. **Styles:** `src/styles/seo-landing.css`
   - Update `.seo-topbar__app-icon` and `.seo-cta-pill__deco*` for `img` sizing (`object-fit: contain`, ~1.1–1.25rem in badge, ~1.5–2rem on CTA pill)
   - Logo is full-color PNG — badge background may stay `var(--brand-accent)` or switch to white/neutral so logo reads clearly on all 13 brand palettes

### Out of scope

- Omegle page (uses Omegle branding, not Glice topbar)
- Main site `Header` / `Footer` (already use Glice logo)
- Video hero idle icons, stat section Remix icons, feature cards
- `GliceLogoMotion` animated loader

---

## Implementation guidance

**Preferred:** Extract tiny reusable `GliceBrandMark` in `src/components/brand/glice-brand-mark.tsx`:

```tsx
import Image from "next/image";

type Props = { size?: number; className?: string };
export function GliceBrandMark({ size = 28, className }: Props) {
  return (
    <Image
      src="/icons/transparent_icon.png"
      alt=""
      width={size}
      height={size}
      className={className}
      aria-hidden
    />
  );
}
```

Use in `premium-seo-landing-page.tsx` for topbar + CTA pill. Match Footer/Header visual weight.

---

## Do / Don't

| Do | Don't |
|----|-------|
| Use `/icons/transparent_icon.png` | Use Remix icons for Glice branding |
| Keep accessible labels on links ("Get Glice Free" text stays) | Change CTA copy or hrefs |
| Test on 2+ brand schemes (e.g. emerald-chat, monkey-alternative) | Touch omegle theme |
| `npm run build` must pass | Add new public assets |

---

## Acceptance checklist

- [ ] `premium-seo-landing-page.tsx`: zero `ri-video-chat-line`, `ri-vidicon-fill`, `ri-chat-smile-3-fill` in topbar/CTA
- [ ] Glice logo visible in topbar "Get Glice Free" on all `/talk-to-strangers/*` SEO pages (not omegle)
- [ ] Hero CTA pill shows Glice logo instead of generic cam/chat icons
- [ ] Logo readable on light and saturated brand topbars (emerald, purple, coral)
- [ ] `npm run build` exit 0

---

## Verify

```bash
cd GliceFlutterV1/glice-website
rg "ri-video-chat-line|ri-vidicon-fill|ri-chat-smile-3-fill" src/components/marketing/seo/
npm run build
```

Manual: open `/talk-to-strangers/emerald-chat` and `/talk-to-strangers/monkey-alternative` — confirm logo in topbar + hero CTA.
