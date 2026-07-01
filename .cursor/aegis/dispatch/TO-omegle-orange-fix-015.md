# Task Order TO-omegle-orange-fix-015

**Director:** Algoristali  
**Date:** 2026-07-01  
**Priority:** HOTFIX — Shell QA FAIL on TO-013

---

## 1. QA failures to fix

Shell QA [31ee2a2f] reported TO-013 incomplete:

| Issue | Current | Required |
|-------|---------|----------|
| Toolbar position | `position: fixed; bottom: 0` on `.hero-toolbar--omegle` | `position: relative` — NOT fixed, flows below video |
| `.hero-toolbar-btn--start` | `#4CAF50` green | `#FF6600` orange |
| `.hero-toolbar-btn--next` | `#4CAF50` green | `#FF6600` orange |
| `.omegle-rich-cta-btn--primary` | `#4CAF50` green | `#FF6600` orange |
| `omegle-modals.css` | 13 green `#4caf50` hits | All primary CTAs `#FF6600` orange |

`.omegle-start-btn` is already orange — hero toolbar Start was missed.

---

## 2. Grep acceptance (must pass)

```bash
grep -i "4caf50\|45a049" src/styles/omegle-theme.css src/styles/omegle-modals.css → 0 hits
grep "position: fixed" src/styles/omegle-theme.css → 0 hits on .hero-toolbar--omegle
grep -i "ff6600" src/styles/omegle-theme.css → hits on --start and --next
```

---

## 3. Scope

- `src/styles/omegle-theme.css`
- `src/styles/omegle-modals.css`
- Omegle route only

---

## 4. Verify

`/talk-to-strangers/omegle-alternative` — orange Start in toolbar, toolbar scrolls with page, no green anywhere on call UI.
