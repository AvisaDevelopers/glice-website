# TO-seo-slug-rename-027 — Direct app-name URL slugs (Monkey-style)

**Date:** 2026-07-01

## User request

> rename some pages like omegle-alternative to direct omegle and with all real existing apps

**Reference:** [monkey.app/omegle](https://www.monkey.app/omegle/) uses `/omegle` not `/omegle-alternative`.

---

## Slug migration map

| Old path | New path | Real app |
|----------|----------|----------|
| `/talk-to-strangers/omegle-alternative` | `/talk-to-strangers/omegle` | Omegle |
| `/talk-to-strangers/monkey-alternative` | `/talk-to-strangers/monkey` | Monkey |
| `/talk-to-strangers/emerald-chat` | `/talk-to-strangers/emerald` | Emerald Chat |

**Already direct app names — keep:**
`coomeet`, `y99`, `chatroulette`, `bazoocam`, `ometv`, `joingy`, `chat-avenue`, `monkey-run`, `text-chat`, `random-chat`, hub `/talk-to-strangers`

---

## File operations

### Rename App Router folders

```
src/app/talk-to-strangers/omegle-alternative/ → omegle/
src/app/talk-to-strangers/monkey-alternative/ → monkey/
src/app/talk-to-strangers/emerald-chat/ → emerald/
```

### Update `slug` + `path` in `src/content/seo/pages.ts`

- `omegle-alternative` → `omegle`, path `/talk-to-strangers/omegle`
- `monkey-alternative` → `monkey`, path `/talk-to-strangers/monkey`
- `emerald-chat` → `emerald`, path `/talk-to-strangers/emerald`
- Rename exports: `omegleAlternativePage` → `omeglePage` (update all imports)

### Update `src/content/seo/brand-schemes.ts`

- Keys: `emerald-chat` → `emerald`, `monkey-alternative` → `monkey`
- Update `id` fields to match new slug
- Omegle has no brand scheme (uses omegle-theme) — N/A

### Update references

| File | Change |
|------|--------|
| `src/lib/seo/routes.ts` | slugs, SITELINK_PATHS, sitemap priority for `omegle` |
| `src/components/layout/site-chrome.tsx` | `isOmegleRoute` → `/talk-to-strangers/omegle` |
| `src/components/site/ui-session-provider.tsx` | same |
| `src/app/talk-to-strangers/omegle/page.tsx` | import `omeglePage` |

### 301 redirects (`next.config.ts`)

```ts
async redirects() {
  return [
    { source: '/talk-to-strangers/omegle-alternative', destination: '/talk-to-strangers/omegle', permanent: true },
    { source: '/talk-to-strangers/omegle-alternative/:path*', destination: '/talk-to-strangers/omegle/:path*', permanent: true },
    { source: '/talk-to-strangers/monkey-alternative', destination: '/talk-to-strangers/monkey', permanent: true },
    { source: '/talk-to-strangers/emerald-chat', destination: '/talk-to-strangers/emerald', permanent: true },
  ];
},
```

---

## Do / Don't

| Do | Don't |
|----|-------|
| Grep entire `src/` for old slugs — zero leftovers | Break Omegle video page behavior |
| Keep page content/metadata (update paths only) | Change hub URL |
| `npm run build` | |

---

## Acceptance

- [ ] `/talk-to-strangers/omegle` loads Omegle page with video
- [ ] `/talk-to-strangers/monkey` loads premium SEO page
- [ ] `/talk-to-strangers/emerald` loads premium SEO page
- [ ] Old URLs 308/301 redirect to new paths
- [ ] `rg "omegle-alternative|monkey-alternative|emerald-chat" src/` → 0
- [ ] `npm run build` exit 0
