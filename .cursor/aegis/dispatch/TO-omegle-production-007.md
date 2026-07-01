# Task Order TO-omegle-production-007

**Director:** Algoristali  
**Date:** 2026-07-01  
**Priority:** HIGH  
**Route:** `/talk-to-strangers/omegle-alternative` ONLY

---

## 1. User feedback (verbatim intent)

> "On Omegle change the text or video — only Video not text"
> "For logout user give Omegle landing page with start call"
> "For login then functionality page"
> "Make sure production ready"

---

## 2. Requirements

### 2.1 Remove Text mode — Video only

- **Remove** Video | Text tab switcher entirely from `omegle-page.tsx`
- **Remove** Text "coming soon" overlay and related state (`activeMode`, `text` tab UI)
- Page is **video chat only** — no text chat option shown
- Clean up dead CSS in `omegle-theme.css` for tabs and text overlay

### 2.2 Auth-based page modes (production UX)

| Auth state | What user sees |
|------------|----------------|
| **Logged OUT** | Full Omegle **landing page**: orange Omegle logo, "Talk to strangers!" tagline, 18+ checkbox, disclaimer, SEO content below fold, **VideoHero** in landing area with visible green **Start** — marketing + start call CTA |
| **Logged IN** | **Functional call page only**: orange Omegle logo in compact sticky mini-header (always visible), **VideoHero variant="omegle"** full focus — NO landing marketing blocks (no disclaimer, no SEO section, no duplicate start buttons) |

**Logged-in must NOT be a blank VideoHero with zero branding** — user complained logo missing when logged in. Add minimal header:

```
┌─────────────────────────────────────────┐
│ Omegle (orange)    Talk to strangers!   │  ← compact, white bg, thin border
├─────────────────────────────────────────┤
│         VideoHero (full call UI)        │
└─────────────────────────────────────────┘
```

### 2.3 Production polish

- No console errors, no dead code from removed text mode
- 18+ gate still required when logged out before Start enables
- When logged in, 18+ assumed from account (or keep checkbox in mini-header if legally needed — prefer skip if user is verified 18+)
- Session active (`inSession`): mini-header can hide OR stay minimal — prefer **keep mini logo** during call
- All modals remain Omegle-styled (`variant="omegle"`) — verify still wired
- Mobile responsive: landing stacks cleanly; logged-in video fills viewport below mini-header
- `npm run build` exit 0

---

## 3. Files to edit

- `src/components/omegle/omegle-page.tsx` — main logic rewrite
- `src/styles/omegle-theme.css` — remove tab styles, add `.omegle-mini-header` for logged-in
- Do NOT change SEO pages (13 Monkey pages)
- Do NOT change home VideoHero default variant

---

## 4. Implementation notes

**Current problem (from prior audit):**
```tsx
if (isLoggedIn) {
  return <VideoHero variant="omegle" />; // no logo, no landing
}
```

**Target logged-in:**
```tsx
if (isLoggedIn) {
  return (
    <div className="omegle-page omegle-page--logged-in">
      <header className="omegle-mini-header">...</header>
      <VideoHero variant="omegle" />
    </div>
  );
}
```

**Target logged-out:** Keep landing chrome, remove tabs, single Video mode label optional ("Video chat" subtitle) — NOT a switcher.

---

## 5. Acceptance checklist

- [ ] No Video | Text tabs anywhere on omegle page
- [ ] No text chat overlay / coming soon UI
- [ ] Logged OUT: landing + logo + 18+ + Start + SEO below
- [ ] Logged IN: mini Omegle header + VideoHero only (no landing SEO/disclaimer)
- [ ] Orange logo visible in BOTH states
- [ ] Call flow works: start → auth (if needed) → permissions → connect
- [ ] Modals still Omegle white/green styling
- [ ] Mobile layout OK
- [ ] `npm run build` exit 0

---

## 6. Verify

1. Log out → `/talk-to-strangers/omegle-alternative` → landing, no text tab, Start works
2. Log in → same URL → mini header + video UI only
3. Complete a call → feedback → next call works
4. Home `/` unchanged
