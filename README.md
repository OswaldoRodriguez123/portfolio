# portfolio

Personal portfolio of **Oswaldo Rodríguez** — AI & full-stack engineer. A bilingual (EN/ES), statically generated site with case studies for real, shipped projects.

Live: https://oswaldorodriguez.vercel.app

## Stack

- Next.js (App Router, static prerender + PPR) with TypeScript `strict` + `noUncheckedIndexedAccess`
- Tailwind CSS v4 and shadcn-style components
- next-intl for EN/ES routing (`/en`, `/es`; `/` redirects to `/en`)
- Vitest + Testing Library for unit tests, Playwright (+ axe-core) for end-to-end and accessibility
- Deployed on Vercel

## Requirements

- Node.js 20 or newer (see `.nvmrc`)

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000> — you will be redirected to `/en`.

## Scripts

| Command            | What it does                                        |
| ------------------ | --------------------------------------------------- |
| `npm run dev`      | Start the dev server                                |
| `npm run build`    | Production build                                    |
| `npm start`        | Serve the production build                          |
| `npm run lint`     | ESLint                                              |
| `npm run typecheck`| `tsc --noEmit`                                      |
| `npm test`         | Unit tests (Vitest)                                 |
| `npm run e2e`      | End-to-end tests (Playwright, Chromium)             |

## Project structure

```text
app/                # App Router routes ([locale] segment, sitemap, robots, OG image)
components/         # UI components (server components where possible)
content/            # Typed project content, validated at import time
  projects/         # One module per project; add new ones here
  work.ts           # Work history entries
i18n/               # next-intl routing and request config
lib/                # site config, SEO helpers, content queries
messages/           # EN/ES message catalogs
tests/              # Vitest unit tests (tests/render.tsx renders with intl)
e2e/                # Playwright e2e + accessibility specs
public/projects/    # Project screenshots/covers
```

### Adding a project

1. Copy an existing module in `content/projects/` (e.g. `psico-yerma.ts`) to `<slug>.ts`.
2. Fill in **both locales** (`en` and `es`): `tagline` (≤ 120 chars), `role`, `problem` (2–4 paragraphs), `approach` (3–5 `{ title, body }` decision blocks) and `results` (2–4 bullets). If a metric is not verified, write `TODO(metric)` instead of inventing one.
3. Import it in `content/projects/index.ts` and add it to the `projects` array.
4. If the project has a public demo, capture the home page at 1440×900, convert it to WebP (≤ 200 KB) into `public/projects/<slug>.webp` and set `cover` in the module. Do **not** link to dead or private URLs — use screenshots instead.
5. Run `npm test` — `validateProject` runs at import time and fails the build/tests if EN or ES content is incomplete.

## Testing

CI runs lint, typecheck, unit tests, a production build and the Playwright suite on every push and PR (see `.github/workflows/ci.yml`).

## Deployment

The site deploys on Vercel with zero configuration beyond importing the repository:

1. Push this repository to GitHub.
2. In Vercel, "Add New… → Project" and import the repo. Framework preset: **Next.js**. No environment variables are required.
3. Every push to `main` redeploys production; PRs get preview deployments.

Optional: set `NEXT_PUBLIC_SITE_URL` (e.g. `https://your.domain`) in the Vercel project settings if you use a custom domain, then update it in your DNS. The SEO metadata (canonical, sitemap, hreflang) is generated from this value.

## License

MIT
