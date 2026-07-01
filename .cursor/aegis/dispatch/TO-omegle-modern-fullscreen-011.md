# Task Order TO-omegle-modern-fullscreen-011

**Director:** Algoristali  
**Date:** 2026-07-01  
**Priority:** CRITICAL  
**Route:** `/talk-to-strangers/omegle-alternative` ONLY

---

## 1. User feedback (verbatim)

> "Why are you design Omegle like old design — give it full screen width and completely modern UI"

**User REJECTS:** Classic boxed 800px Omegle card from TO-010 (bordered box, small centered card, 2010 aesthetic).

**User WANTS:**
- **Full screen width** video experience (edge-to-edge or near full viewport)
- **Completely modern UI** (2024–2026 premium video chat app feel)
- **Keep Omegle brand colors** — white/orange `#FF6600`/green `#4CAF50` — NOT Glice mint, NOT Monkey purple/yellow on call UI

---

## 2. Modern full-screen Omegle design spec

### 2.1 Layout — full viewport

```
┌──────────────────────────────────────────────────────────────┐
│ [Omegle orange]  Talk to strangers!          [profile?]     │  slim sticky header 56px
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌─────────────────────────┬─────────────────────────┐    │
│   │                         │                         │    │
│   │      STRANGER           │         YOU             │    │  FULL WIDTH dual panels
│   │      (50% viewport)     │      (50% viewport)     │    │  min-height: calc(100dvh - header - toolbar)
│   │                         │                         │    │
│   └─────────────────────────┴─────────────────────────┘    │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  [Everyone ▼]  [🌍 Global]     [Mute] [Cam]  [Start ▶]     │  floating or fixed bottom toolbar — glass/blur
└──────────────────────────────────────────────────────────────┘
```

**Key differences from old design:**
- NO `max-width: 800px` card
- NO `border: 1px solid #DDD` box wrapper
- Panels span **full width** with small gap (8–12px) and edge padding (16px)
- **min-height:** `calc(100dvh - var(--omegle-header) - var(--omegle-toolbar))` — immersive
- Rounded corners on panels only: `border-radius: 16px` (modern), not 8px box

### 2.2 Modern UI elements

| Element | Modern treatment |
|---------|------------------|
| Header | Sticky, white, subtle `box-shadow: 0 1px 0 rgba(0,0,0,0.08)`, orange logo 1.5rem |
| Panels | `#1a1a1a` dark idle bg OR `#E8E8E8` light — use **dark modern** for video areas: `#0f0f0f` with subtle inner glow |
| Panel gap | 12px between panels, full bleed horizontal |
| Video | `object-fit: cover`, `border-radius: 16px`, overflow hidden |
| Toolbar | Bottom fixed bar: `backdrop-filter: blur(12px)`, `background: rgba(255,255,255,0.92)`, pill buttons |
| Start button | Large green pill `#4CAF50`, `border-radius: 9999px`, shadow `0 4px 14px rgba(76,175,80,0.4)` — modern NOT square |
| Controls | Icon circles 48px, white bg, subtle shadow |
| Status badges | Floating pill top-left on panel, `backdrop-filter: blur(8px)` |
| Typography | System-ui / inherit, clean 15–16px |

### 2.3 Auth states (unchanged logic, new visuals)

| State | UI |
|-------|-----|
| **Logged OUT** | Slim header + full-width modern video card + landing Start + 18+ gate + SEO content below (compact video, not boxed) |
| **Logged IN** | Slim header + full-width immersive video only — no SEO |
| **In session** | Full viewport video, toolbar floats bottom, header stays minimal |

### 2.4 Remove from TO-010 (explicitly delete)

- `.hero-dual-shell` max-width 800px / 480px borders
- Square green Start `border-radius: 4px`
- Static "Stranger/You" text tags (optional — can use modern floating badges instead)
- Compact boxed card aesthetic

---

## 3. Files to edit

- `src/styles/omegle-theme.css` — **full rewrite** of `.video-hero--omegle` section for modern fullscreen
- `src/components/omegle/omegle-page.tsx` — wrapper classes if needed (`omegle-page--modern`)
- `src/components/video/video-hero.tsx` — only if classNames needed for modern variant hooks
- `src/components/omegle/omegle-seo-content.tsx` — keep below fold, ensure doesn't constrain video width

**DO NOT change:** home `/` VideoHero, 13 Monkey SEO pages

---

## 4. Acceptance checklist

- [ ] Video area uses **full viewport width** (no 800px max-width box)
- [ ] Modern UI: rounded panels 16px, glass toolbar, green pill Start, dark video panels
- [ ] NOT classic 2010 Omegle boxed layout
- [ ] Omegle colors only: orange logo, green actions, white/light chrome
- [ ] No stretch/distortion — aspect-ratio or min-height handled correctly
- [ ] Logged out + logged in both modern fullscreen
- [ ] Modals still omegle-styled (white/green)
- [ ] `npm run build` exit 0

---

## 5. Verify

1. `/talk-to-strangers/omegle-alternative` — video spans nearly full browser width
2. Looks like modern video chat app (FaceTime/Zoom casual), not old Omegle.com box
3. `/` home unchanged
