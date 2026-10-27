# Next.js + shadcn/ui on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nextjs-16)

A minimal Next.js 16 starter, ready to deploy on [Railway](https://railway.com).

- **Next.js 16.4** with the App Router and Cache Components
- **React 19.3**
- **Tailwind CSS 4.3**
- **shadcn/ui** (Radix, New York style) with Button, Card, Badge, and Separator
- **Geist** fonts bundled from npm, so builds don't depend on Google Fonts
- **`/api/health`** healthcheck endpoint for zero-downtime deploys

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Edit `app/page.tsx` to change the home page.

Add more shadcn/ui components:

```bash
npx shadcn@latest add dialog input
```

## Deploying on Railway

Click the button above, or connect this repo to a Railway service. Railway's
builder (Railpack) detects Next.js and runs `npm run build` and `npm start`
automatically. Next.js listens on the `PORT` Railway provides.

The template configures:

| Setting | Value |
|---|---|
| Public domain | Generated on deploy |
| Healthcheck path | `/api/health` |
| Node.js | 24 (from `engines` in `package.json`) |

The home page shows live deployment details (service, region, commit) read
from [Railway-provided variables](https://docs.railway.com/variables#railway-provided-variables)
at request time.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run the TypeScript compiler |
