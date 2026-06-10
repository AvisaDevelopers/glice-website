# Glice Web (Next.js)

Frontend for the Glice marketing site and web client. Connects to the existing Node.js backend and Socket.io server (same as the mobile app).

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- TanStack Query

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```txt
src/
├── app/                 # Routes (pages)
├── components/layout/   # Header, Footer (shared shell)
├── config/              # Brand + app config
├── features/            # Feature modules (auth, chat, video — Phase 2+)
├── lib/                 # API client, utilities
└── providers/           # React Query provider
```

## Workspace references

| Folder | Purpose |
|--------|---------|
| `Glice-Web/` | Static HTML/CSS reference for UI port |
| `GliceFlutterV1/` | API + Socket.io integration reference |
| `GliceServerV1-js/` | Backend API |

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — ESLint
