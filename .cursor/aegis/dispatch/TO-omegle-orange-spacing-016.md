# Task Order TO-omegle-orange-spacing-016

**Director:** Algoristali  
**Date:** 2026-07-01  
**Route:** `/talk-to-strangers/omegle-alternative` ONLY

---

## 1. User feedback + screenshot

**Screenshot:** `assets/c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_d659c7a41841f2127197e85279738b6d_images_image-3402b8a9-1349-477b-a816-48bab43e71b0.png`

**Problems visible:**
1. **Random colors** on SEO sections below video — purple header band, **mint green** checkmarks/icons, white/lavender card backgrounds — NOT orange+white
2. **UI spacing** — uneven card title wrapping ("Interest-based matching" 2 lines vs "DUO mode" 1 line), large gap between purple band and heading, cards cut off / inconsistent padding

User mandate (repeated): **Omegle page = ORANGE `#FF6600` + WHITE only** (+ light gray `#F0F0F0` borders ok). No purple, no green, no lavender, no gold.

---

## 2. Color fix — entire Omegle page (video + SEO)

### FORBIDDEN on omegle route
- `#6B46C1` purple
- `#4CAF50` / mint `#32e6a1` green
- `#C9A227` gold
- `#F5F3FF` / `#EDE9FE` lavender
- `#581C87` purple-dark
- Any `omegle-rich-section--safety` purple bg

### REQUIRED palette

| Token | Value | Usage |
|-------|-------|-------|
| White | `#FFFFFF` | Page bg, card bg, toolbar |
| Light gray | `#F5F5F5` / `#F0F0F0` | Alternate section bg, card subtle |
| Orange | `#FF6600` | Icons, checkmarks, headings accent, CTA buttons, links |
| Orange hover | `#E55A00` | Button hover |
| Text dark | `#333333` | Body on white |
| Border | `#E0E0E0` | Card borders |

### Section-by-section

| Section | Background | Icons/accents |
|---------|------------|---------------|
| Safety/bullet band | `#FFF5EB` (orange tint 5%) OR `#F5F5F5` | Orange checkmarks NOT green |
| "Making new connections" | `#FFFFFF` | Black heading, gray subtext |
| 4-card grid | Cards `#FFFFFF` border `#E0E0E0` | Orange icon circles `rgba(255,102,0,0.12)` bg, orange icon `#FF6600` |
| Features grid | `#F5F5F5` alternate | Orange only |
| FAQ | `#FFFFFF` | Orange open border |
| Bottom CTA | `#FF6600` band OR white with orange button | Orange CTA |

**Grep cleanup required:**
```bash
grep -i "6b46c1\|4caf50\|32e6a1\|581c87\|ede9fe\|f5f3ff\|c9a227" omegle-theme.css omegle-seo-content.tsx omegle-page-content.ts
→ 0 hits in styles (content text ok)
```

---

## 3. Spacing fix

**Files:** `omegle-seo-content.tsx`, `omegle-theme.css` (`.omegle-rich-*` classes)

| Issue | Fix |
|-------|-----|
| Large gap purple band → heading | Reduce `padding-top` on `.omegle-rich-section` first after safety — use consistent `py-16` (64px) max between sections |
| Card title uneven wrap | Fixed `min-height` on card titles OR `min-height: 3rem` on `.omegle-rich-card h3` so all 4 cards align |
| 4-card grid | `display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px` desktop; 2 col tablet; 1 col mobile — equal height cards `align-items: stretch` |
| Card internal padding | Uniform `padding: 24px` all cards |
| Icon circle | Fixed `48px` circle, `margin-bottom: 16px` |
| Section max-width | `max-width: 1100px; margin: 0 auto; padding: 0 24px` consistent |
| Bottom cards not cut off | Add `padding-bottom: 80px` on last section before footer |

---

## 4. Files to edit

- `src/styles/omegle-theme.css` — all `.omegle-rich-*` colors + spacing
- `src/components/omegle/omegle-seo-content.tsx` — section class names if needed
- `src/content/seo/omegle-page-content.ts` — only if inline styles referenced

**DO NOT touch:** 13 SEO premium pages, home `/`

---

## 5. Acceptance checklist

- [ ] Zero purple/green/lavender/gold on omegle page scroll (video + all SEO)
- [ ] Only orange + white + light gray
- [ ] 4-card row equal height, aligned titles
- [ ] Consistent section vertical rhythm (no huge white gaps)
- [ ] Orange checkmarks in safety band
- [ ] `npm run build` exit 0

---

## 6. Verify

Scroll full `/talk-to-strangers/omegle-alternative` logged out — no purple band, no green icons, even card grid.
