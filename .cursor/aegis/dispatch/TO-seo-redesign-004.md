# Task Order TO-seo-redesign-004

**Director:** Algoristali  
**Date:** 2026-07-01  
**Priority:** CRITICAL  
**Project:** `GliceFlutterV1/glice-website`

---

## 1. User feedback (verbatim intent)

> "Omegle redesign — I didn't say to change color on that page. Rebuild with their own color, not our theme."
> "Remove header on Omegle if logged in; if not show start call and vice versa."
> "On other pages your header is making issues. Don't like the design. Start button is very bad."
> "Make it perfect."

**Screenshots provided:**
- `assets/c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_d659c7a41841f2127197e85279738b6d_images_image-a97bb6f6-bbfb-45c0-b99a-075f20cfa333.png` — CURRENT BAD STATE (emerald-chat): sparse black hero, tiny label, weak yellow pill "Ready when you are", abstract blobs — user hates this
- `assets/c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_d659c7a41841f2127197e85279738b6d_images_image-f9a11b49-d6bc-477c-9360-77e5c2bee485.png` — TARGET REFERENCE (Monkey.app): purple top bar, split hero, bold yellow headline, large yellow CTA pill with two lines + arrow + decorative cam/chat icons, avatar row, halftone photo panels

---

## 2. Scope split

| Route group | Count | Theme |
|-------------|-------|-------|
| `/talk-to-strangers/omegle-alternative` | 1 | **Omegle brand only** — see §4 |
| All other `/talk-to-strangers/*` (13 pages) | 13 | **Monkey-inspired premium** — Glice-adapted, see §3 |

---

## 3. Wave A — 13 SEO pages (NOT omegle)

### 3.1 Header / chrome fix (CRITICAL)

**Problem:** Site `Header` + SEO page `seo-topbar` stack/overlap and look broken.

**Fix:**
1. In `src/components/layout/site-chrome.tsx` — hide **Glice Header AND Footer** on ALL `/talk-to-strangers/*` routes EXCEPT do NOT break omegle special logic (omegle has its own chrome in Wave B).
2. SEO pages get **only** their own minimal top bar (Back + Get Glice Free) — no double header.
3. Top bar: sticky, full-width, **purple `#6B46C1`** background (Monkey reference), white text, z-index above content.

### 3.2 Hero redesign (match Monkey reference)

Current state is WRONG (see screenshot a97bb6f6): too empty, bad CTA.

**Required layout (desktop):**

```
┌──────────────────────────────────────────────────────────────┐
│ PURPLE BAR: [← Back]                    [🐵 Get Glice Free]  │
├────────────────────────────┬─────────────────────────────────┤
│ BLACK PANEL (55%)          │ PHOTO PANELS (45%)              │
│                            │ 2 slanted panels, purple        │
│ EMERALD CHAT ALTERNATIVE   │ duotone/halftone overlay        │
│ (small caps label)         │ (use unsplash portrait URLs or  │
│                            │  CSS-only if no external img)   │
│ BIG YELLOW HEADLINE        │                                 │
│ (display, 2-3 lines)       │                                 │
│                            │                                 │
│ White subtitle paragraph   │                                 │
│                            │                                 │
│ ┌────────────────────────┐ │                                 │
│ │ Get For Fun Now        │ │  ← small gray line             │
│ │ Start Video Chat    →  │ │  ← BIG black text on YELLOW    │
│ │  📹 💬 (deco icons)    │ │  ← overlapping decorative icons │
│ └────────────────────────┘ │                                 │
│                            │                                 │
│ 👤👤👤👤👤 avatar row       │                                 │
└────────────────────────────┴─────────────────────────────────┘
│ YELLOW ACCENT BAR (full width, 8px)                          │
└──────────────────────────────────────────────────────────────┘
```

**CTA button spec:**
- Background: `#FFFF00` or `#F5C518` (electric yellow)
- Shape: `border-radius: 9999px`, min-height 72px, min-width 280px
- Two-line text inside button (NOT separate pill below hero)
- Line 1: "Get For Fun Now" — 12px, gray `#666`
- Line 2: "Start Video Chat" — 22px bold black + arrow `→`
- Decorative: small 3D-style cam + chat bubble icons positioned absolute overlapping button top-right and bottom-right (use Remix icons with colored circles behind them)
- **href:** `/#videoHero` (via `VIDEO_HERO_HREF` constant)
- Hover: scale 1.02, shadow

**Colors for SEO pages (Monkey-adapted, NOT Glice mint gradient):**
- Purple bar: `#6B46C1`
- Hero left bg: `#000000`
- Headline: `#FFFF00` (yellow) — NOT white
- Body text: `#FFFFFF` / muted `#CCCCCC`
- Yellow accent bar below hero: `#FFFF00`
- CTA pill: `#FFFF00` bg, black text
- Do NOT use Glice mint `#32e6a1` as dominant color on SEO pages
- Do NOT use abstract blob shapes — use photo panels with halftone

### 3.3 Body sections (below yellow bar)

Keep existing content structure but restyle to match Monkey energy:
- White/light sections alternating with dark sections
- Stats strip with purple cards
- Icon feature grid (Remix icons only, no screenshots)
- Comparison table
- 3-step timeline
- Safety block
- FAQ accordion
- Bottom CTA: same yellow pill → `/#videoHero`

### 3.4 Files to edit (Wave A)

- `src/components/layout/site-chrome.tsx`
- `src/components/marketing/seo/premium-seo-landing-page.tsx` — **full rewrite of hero + topbar**
- `src/styles/seo-landing.css` — **full rewrite** with Monkey color tokens
- `src/content/seo/premium-shared.ts` — update CTA labels to match Monkey copy

### 3.5 Do NOT

- Use Glice mint green gradients
- Use `/icons/feature_images/`
- Use abstract blob placeholders on right panel
- Use small "Ready when you are" text-only CTA
- Leave site Header visible on SEO routes

---

## 4. Wave B — Omegle alternative ONLY

### 4.1 Brand colors (Omegle's own — NOT Glice, NOT Monkey purple/gold)

| Token | Value | Usage |
|-------|-------|-------|
| Page bg | `#FFFFFF` | Main background |
| Logo text | `#FF6600` | "Omegle" orange |
| Body text | `#000000` / `#333333` | Paragraphs |
| Primary button | `#4CAF50` | Start, New chat |
| Button hover | `#45A049` | Hover state |
| Link accent | `#4CAF50` | Disclaimer links |
| Panel bg | `#F0F0F0` | Video area idle |
| Border | `#CCCCCC` | Inputs, panels |

**FORBIDDEN on omegle route:**
- Glice dark `#111` background
- Gold `#F5C518` / yellow Monkey CTA
- Purple `#6B46C1` top bar
- Glice mint `#32e6a1`

### 4.2 Header behavior (login-aware)

**On `/talk-to-strangers/omegle-alternative` only:**

| Auth state | What shows |
|------------|------------|
| **Not logged in** | Minimal Omegle header: orange "Omegle" logo + tagline. Prominent **"Start a chat"** / green Start button visible in hero. NO Glice site header. |
| **Logged in** | Hide the marketing/header chrome entirely. Show **only** the VideoHero call UI (video panels + toolbar). User goes straight to call interface. |

Implementation:
- `omegle-page.tsx` is `"use client"`
- Use `useUiSession()` from `@/components/site/ui-session-provider`
- `isLoggedIn` → `showLandingChrome = false`, render only `<VideoHero variant="omegle" />`
- `!isLoggedIn` → show full Omegle landing (white page, 18+ checkbox, mode tabs, start CTA) + VideoHero below fold or in hero area
- Keep `site-chrome.tsx` hiding Glice Header/Footer on this route always

### 4.3 Omegle visual (premium but authentic)

- Clean white page, centered max-width 960px
- Orange "Omegle" wordmark (text, not image)
- "Talk to strangers!" tagline
- Video | Text mode tabs (green active state)
- 18+ checkbox required before start
- Video area: light gray panels, integrated `VideoHero variant="omegle"`
- Green Start button (Omegle green, not yellow)
- Disclaimer paragraph (Omegle style)
- Below fold: simple SEO content (white cards, not dark bento)
- `omegle-theme.css`: restyle `.video-hero--omegle` with Omegle colors only

### 4.4 Files to edit (Wave B)

- `src/components/omegle/omegle-page.tsx` — login-aware chrome + white Omegle design
- `src/styles/omegle-theme.css` — Omegle palette only, remove dark/purple/gold
- `src/components/video/video-hero.tsx` — ensure `variant="omegle"` uses green buttons, light panels (minimal changes)

### 4.5 Do NOT

- Apply Monkey purple/yellow design to omegle
- Apply Glice dark theme to omegle
- Show Glice Header on omegle route
- Show marketing landing chrome when user is logged in

---

## 5. Wave C — Home deep-link (verify still works)

- `src/components/home/home-video-deeplink.tsx` — ensure `/#videoHero` and `?start=1` scroll still works after changes
- No changes unless broken

---

## 6. Acceptance checklist

### SEO pages (13)
- [ ] No Glice site Header visible on `/talk-to-strangers/coomeet` etc.
- [ ] Purple top bar only
- [ ] Split hero: black left + photo panels right
- [ ] Yellow headline (not white)
- [ ] Large yellow two-line CTA pill with decorative icons
- [ ] Avatar row below CTA
- [ ] Yellow accent bar below hero
- [ ] CTA links to `/#videoHero`
- [ ] No mint gradients, no blobs, no app screenshots

### Omegle page
- [ ] White background, orange logo, green buttons
- [ ] No purple, no gold, no Glice dark theme
- [ ] Logged out: Omegle landing + start visible
- [ ] Logged in: marketing chrome hidden, VideoHero only
- [ ] 18+ gate works when logged out
- [ ] Call flow works (start → search → connect)

### Build
- [ ] `npm run build` exit 0

---

## 7. Verify steps for user

1. Visit `/talk-to-strangers/emerald-chat` — should look like Monkey reference (purple bar, yellow headline, big CTA)
2. Click Start Video Chat → home video section
3. Visit `/talk-to-strangers/omegle-alternative` logged OUT — white Omegle page, green start
4. Log in, revisit omegle page — only video UI, no marketing header
5. Start call on omegle — green controls, light panels

---

## 8. Reference image paths (read with Read tool)

```
C:\Users\HP\.cursor\projects\c-Users-HP-Desktop-Avisa-Dev-Glice-web\assets\c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_d659c7a41841f2127197e85279738b6d_images_image-a97bb6f6-bbfb-45c0-b99a-075f20cfa333.png
C:\Users\HP\.cursor\projects\c-Users-HP-Desktop-Avisa-Dev-Glice-web\assets\c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_d659c7a41841f2127197e85279738b6d_images_image-f9a11b49-d6bc-477c-9360-77e5c2bee485.png
```
