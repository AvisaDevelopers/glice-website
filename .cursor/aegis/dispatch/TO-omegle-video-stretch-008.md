# Task Order TO-omegle-video-stretch-008

**Director:** Algoristali  
**Date:** 2026-07-01  
**Priority:** HOTFIX  
**Route:** `/talk-to-strangers/omegle-alternative` (logged-in state)

---

## 1. User report

> "UI is stretched why?"

**Screenshot:** `assets/c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_d659c7a41841f2127197e85279738b6d_images_image-e2c07b12-3768-4f13-a93b-7c0646779c2f.png`

**Symptoms (logged IN on omegle page):**
- Local video feed in right panel is **vertically stretched** — face appears long/narrow
- Video container is tall thin column; aspect ratio wrong
- Possible: entire VideoHero card shifted left with white space on right
- Mini-header "Omegle / Talk to strangers!" visible at top

**Expected:**
- Video panels maintain **16:9 or natural camera aspect ratio**
- `object-fit: cover` on `<video>` elements inside hero panels
- Dual panels side-by-side with equal reasonable aspect ratio (like home page `/`)
- Omegle logged-in layout: centered max-width container, not stretched to fill broken flex height

---

## 2. Root cause investigation

Read and compare:

| File | Why |
|------|-----|
| `src/styles/omegle-theme.css` | `.video-hero--omegle`, `.omegle-page--logged-in` height/flex rules — likely forcing 100dvh on narrow column |
| `src/styles/theme.css` | Base `.hero-panel`, `.hero-dual`, `video` object-fit rules (home works correctly) |
| `src/components/omegle/omegle-page.tsx` | Logged-in wrapper structure |
| `src/components/video/video-hero.tsx` | Panel markup, video element classes |

**Common stretch causes:**
1. `height: 100%` on `video` without `object-fit: cover`
2. `.hero-dual` grid with extreme aspect ratio on logged-in omegle (flex child stretched)
3. `min-height: 100dvh` on video-hero inside flex column with mini-header — panels grow vertically
4. `aspect-ratio` missing on `.hero-panel`
5. Omegle overrides breaking home page rules that use `object-fit: cover`

**Fix approach:**
- Match home page video panel CSS for omegle variant OR add explicit:
  ```css
  .video-hero--omegle .hero-panel video,
  .video-hero--omegle .hero-panel-media video {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  .video-hero--omegle .hero-panel {
    aspect-ratio: 4 / 3; /* or 16/9 */
    min-height: 0;
  }
  .video-hero--omegle .hero-dual {
    aspect-ratio: unset;
    max-height: min(70vh, 520px);
    grid-template-columns: 1fr 1fr;
  }
  ```
- Logged-in page: center VideoHero with `max-width: 960px; margin: 0 auto` — prevent left-shift + right white void
- Ensure mini-header + video area use flex without stretching panels beyond aspect ratio

---

## 3. Scope

**Fix:** omegle logged-in + logged-out video layout only  
**Do NOT break:** home `/` VideoHero layout  
**Test both:** omegle page logged in AND home page video hero

---

## 4. Acceptance checklist

- [ ] Local camera video not vertically stretched on omegle logged-in
- [ ] Remote + local panels side-by-side, balanced aspect ratio
- [ ] VideoHero centered on omegle page (no huge white void on right)
- [ ] `object-fit: cover` on all video elements in omegle variant
- [ ] Home `/` video hero unchanged / still correct
- [ ] Mobile omegle: panels stack without stretch
- [ ] `npm run build` exit 0

---

## 5. Verify

1. Log in → `/talk-to-strangers/omegle-alternative`
2. Camera preview should look natural (not elongated face)
3. Visit `/` — video panels still normal
