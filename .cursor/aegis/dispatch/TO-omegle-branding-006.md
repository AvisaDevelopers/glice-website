# Task Order TO-omegle-branding-006

**Director:** Algoristali  
**Date:** 2026-07-01  
**Priority:** HIGH  
**Route:** `/talk-to-strangers/omegle-alternative` ONLY

---

## 1. User feedback

> "Why Omegle logo not appear on Omegle page"
> "All popups should also look like their design"

Two bugs:
1. **Missing Omegle logo** on the omegle landing page
2. **Popups/modals** on omegle route still use Glice dark theme — must match **Omegle white/green/orange** design

---

## 2. Omegle brand reference

| Element | Value |
|---------|-------|
| Page bg | `#FFFFFF` |
| Logo | Orange `#FF6600` — classic Omegle wordmark (text or SVG) |
| Tagline | "Talk to strangers!" |
| Primary button | `#4CAF50` green |
| Button hover | `#45A049` |
| Panel bg | `#F0F0F0` |
| Text | `#000000` / `#333333` |
| Links | `#4CAF50` |

**Logo implementation options (pick best):**
1. SVG inline Omegle-style wordmark (orange "Omegle" with distinctive O)
2. Text logo with proper styling: `font-size: 2rem`, `color: #FF6600`, `font-weight: bold`, letter-spacing
3. If logo hidden by CSS (`display:none`, `opacity:0`, wrong z-index, white on white) — fix visibility

**Investigate why logo missing:**
- Read `src/components/omegle/omegle-page.tsx` — is logo element rendered?
- Read `src/styles/omegle-theme.css` — is `.omegle-logo` hidden, zero height, wrong color on white?
- Logged-in state hides landing chrome including logo — expected. Test **logged OUT**.
- Check if `inSession` or `isLoggedIn` incorrectly hiding logo when user expects it

---

## 3. Popups to restyle on Omegle route

When user is on `/talk-to-strangers/omegle-alternative`, ALL overlays opened from VideoHero must use Omegle styling:

| Component | Path | Trigger |
|-----------|------|---------|
| Auth modal | `src/components/video/auth-modal.tsx` | Login/signup from Start |
| Media permission gate | `src/components/video/media-permission-gate.tsx` | Camera/mic request |
| Preference modal | `src/components/video/preference-modal.tsx` | Filter/preferences |
| Report dialog | `src/features/report/components/report-user-dialog.tsx` | Report user |

### Approach (preferred)

1. Add `variant="omegle"` prop to each modal component (or read pathname / parent context)
2. When `variant="omegle"` OR `body.omegle-route` class:
   - White modal background `#FFFFFF`
   - Black/dark gray text `#333`
   - Green primary buttons `#4CAF50`
   - Orange accent for logo/branding `#FF6600`
   - Light gray borders `#CCCCCC`
   - NO Glice dark `#111` panels
   - NO Glice mint `#32e6a1` buttons
   - NO dark backdrop blur with green glow

3. Add `body.omegle-route` class in `site-chrome.tsx` (alongside existing seo-route) for CSS scoping:
   ```css
   body.omegle-route .auth-modal { ... omegle styles }
   ```

4. Pass `variant="omegle"` from `VideoHero` when `variant="omegle"` is set:
   - `AuthModal variant={variant}`
   - `MediaPermissionGate variant={variant}`
   - `PreferenceModal variant={variant}`
   - `ReportUserDialog` — check if opened from video hero on omegle page

5. Create `src/styles/omegle-modals.css` for all omegle modal overrides — import in globals or omegle page

### Omegle modal design spec

```
┌─────────────────────────────────┐
│  Omegle (orange)                │  ← logo in modal header
│─────────────────────────────────│
│  Sign in to start chatting      │  ← black heading
│  [Google] [Apple] [Email]       │  ← white cards, gray borders
│  [        Green Submit       ]  │
└─────────────────────────────────┘
Backdrop: rgba(0,0,0,0.5) — simple dark overlay, no green glow
```

---

## 4. Files to edit

- `src/components/omegle/omegle-page.tsx` — fix logo visibility
- `src/styles/omegle-theme.css` — logo styles
- `src/components/layout/site-chrome.tsx` — `body.omegle-route` class
- `src/components/video/video-hero.tsx` — pass variant to child modals
- `src/components/video/auth-modal.tsx`
- `src/components/video/media-permission-gate.tsx`
- `src/components/video/preference-modal.tsx`
- `src/features/report/components/report-user-dialog.tsx` (if applicable)
- `src/styles/omegle-modals.css` — **new**
- `src/app/globals.css` — import omegle-modals.css

**Do NOT** change SEO pages (13 dark Monkey pages) or home page modals — omegle variant only.

---

## 5. Acceptance checklist

- [ ] Logged OUT on omegle page: orange "Omegle" logo clearly visible at top
- [ ] Logo not hidden by CSS, z-index, or conditional render bug
- [ ] Auth modal on omegle: white bg, green buttons, orange branding
- [ ] Permission gate on omegle: white/light, green allow button
- [ ] Preference modal on omegle: white/light, green confirm
- [ ] Report dialog on omegle: white/light styling
- [ ] Home page modals unchanged (still Glice dark)
- [ ] `npm run build` exit 0

---

## 6. Verify

1. Visit `/talk-to-strangers/omegle-alternative` logged OUT — see orange Omegle logo
2. Click Start → auth modal opens — Omegle styled (white, green)
3. Log in → grant permissions → permission gate Omegle styled
4. Open preferences → Omegle styled
5. Visit `/` home — modals still Glice dark theme
