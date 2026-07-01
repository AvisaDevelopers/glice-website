# Task Order TO-omegle-orange-white-toolbar-013

**Director:** Algoristali  
**Date:** 2026-07-01  
**Route:** `/talk-to-strangers/omegle-alternative` ONLY

---

## 1. User feedback + screenshot

**Screenshot:** `assets/c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_d659c7a41841f2127197e85279738b6d_images_image-ca097d1c-7ca7-43f5-9d1e-d87092594e97.png`

Shows bottom toolbar with:
- Everyone dropdown (teal icon)
- Global button
- **Green** Start pill button

User says:
> "This should not be fixed"
> "Color scheme only be orange and white"

---

## 2. Requirements

### 2.1 Toolbar positioning — NOT fixed

**Problem:** Toolbar likely uses `position: fixed` at bottom (from TO-011 modern fullscreen glass bar).

**Fix:**
- Remove `position: fixed` / `bottom: 0` from omegle toolbar (`.hero-toolbar--omegle`, `.video-hero--omegle .hero-toolbar`, or equivalent)
- Toolbar sits **in document flow** directly below video panels (static/relative)
- No floating overlay over video content
- Page scrolls naturally if content exceeds viewport
- Adjust video height calc — remove toolbar from fixed viewport math if it was subtracted for fixed bar

### 2.2 Color scheme — ORANGE + WHITE only

**Only two colors for entire Omegle call UI** (video area + toolbar + buttons):

| Token | Value | Usage |
|-------|-------|-------|
| **White** | `#FFFFFF` | Page bg, toolbar bg, dropdown buttons, panel idle bg `#F5F5F5` ok as white variant |
| **Orange** | `#FF6600` | Logo, Start button, primary actions, active states, icons accent |
| **Orange hover** | `#E55A00` | Button hover |

**FORBIDDEN on Omegle call UI:**
- Green `#4CAF50` / `#45A049` — **replace Start and all green with orange**
- Teal/mint icons on Everyone dropdown — **orange or dark gray on white**
- Dark `#0f0f0f` video panels — use **white/light gray** `#F0F0F0` panels with orange accents OR white panels with gray border
- Purple, cyan, Glice mint, any third color

**Start button spec:**
- Background: `#FF6600` orange (NOT green pill)
- Text: white
- `border-radius: 9999px` ok
- White toolbar bar, orange Start on right

**Everyone / Global buttons:**
- White bg, light gray border `#E0E0E0`
- Icons: `#FF6600` orange or `#333` dark gray — NOT teal

### 2.3 Scope

Files:
- `src/styles/omegle-theme.css` — toolbar position + orange/white palette for `.video-hero--omegle`
- `src/styles/omegle-modals.css` — update modals to orange primary (not green) if they use green submit
- `omegle-page.tsx` — only if wrapper affects toolbar position

**DO NOT change:** 13 SEO pages, home `/`

---

## 3. Acceptance checklist

- [ ] Toolbar NOT `position: fixed` — flows below video panels
- [ ] Start button orange `#FF6600`, not green
- [ ] Toolbar white background
- [ ] No teal/green accents on Everyone/Global controls
- [ ] Overall omegle call area only orange + white (+ gray borders ok for definition)
- [ ] Modals: orange primary buttons (optional but preferred for consistency)
- [ ] Home `/` unchanged
- [ ] `npm run build` exit 0

---

## 4. Verify

1. `/talk-to-strangers/omegle-alternative` — toolbar scrolls with page, not stuck to viewport bottom
2. Start button is orange, toolbar white
3. No green visible on call UI
