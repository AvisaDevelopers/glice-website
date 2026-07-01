# TO-seo-titles-catchy-023 — Fix double Glice + shorter catchy titles

**Date:** 2026-07-01

---

## User report

Still seeing: `OmeTV Alternative 2026 — Glice - Glice` (38 chars, duplicate brand)

Wants: **fewer characters**, **catchier titles** (Monkey SERP style — punchy, keyword-forward)

---

## Root cause (likely)

1. Root `layout.tsx` has `title.template: '%s - Glice'` — may still merge with child titles in some Next.js 16 paths despite `absolute`
2. Old em-dash `— Glice` in cached build or OG fields

## Nuclear fix — no double suffix ever

1. **`buildRootMetadataDefaults()`** — change template to `'%s'` only (NO auto `- Glice` suffix)
2. **`buildPageMetadata()`** — append ` | Glice` to marketing/legal page titles via helper (About → `About | Glice`)
3. **`buildSeoPageMetadata()`** — keep `title: { absolute: pageTitle }` with `formatSeoPageTitle()`
4. **NEW** `src/app/talk-to-strangers/layout.tsx`:
   ```tsx
   export const metadata = { title: { template: '%s' } };
   ```
   Blocks parent template on all SEO routes.

5. Ensure `openGraph.title` and `twitter.title` use the same final `pageTitle` string (not raw content title)

---

## Rewrite ALL 14 SEO metadata titles (pages.ts)

**Rules:** ≤32 chars before ` | Glice` suffix; use `—` sparingly; power words: Free, Safe, #1, Live, 2026; Monkey-inspired but original Glice copy.

| slug | New `metadata.title` |
|------|---------------------|
| hub | Talk to Strangers — Free Video Chat |
| coomeet | Coomeet Alt — Free Video Chat |
| y99 | Y99 Alt — Live Video Chat |
| chatroulette | Chatroulette Alt — Free Chat |
| bazoocam | Bazoocam Alt — Video Chat |
| ometv | #1 OmeTV Alt — Free Video Chat |
| joingy | Joingy Alt — Free Video Chat |
| emerald-chat | Emerald Chat Alt — Video Chat |
| text-chat | Text Chat Strangers — Free & Safe |
| random-chat | Random Video Chat — Strangers |
| omegle-alternative | Omegle Alt 2026 — Free Safe Video |
| monkey-run | Monkey Run Alt — Free Chat |
| chat-avenue | Chat Avenue Alt — Video Chat |
| monkey-alternative | Monkey Alt — Free Video Chat |

**Expected `<title>`:** `#1 OmeTV Alt — Free Video Chat | Glice` (~38 chars, **one** Glice)

---

## Shorter descriptions (~115–130 chars)

Rewrite `metadata.description` for all 14 pages — one line, keyword-rich, no fluff.

Example ometv:
> Free OmeTV alternative on Glice. Random video chat with strangers, mutual matching & 18+ safety. Start talking now.

---

## Acceptance

- [ ] `curl -s localhost:3000/talk-to-strangers/ometv | rg "<title>"` → exactly one "Glice"
- [ ] Title ≤45 chars total
- [ ] No `— Glice - Glice` anywhere
- [ ] `npm run build` exit 0
