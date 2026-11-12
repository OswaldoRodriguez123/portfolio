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
| `npm run build`    | Production build (syncs GitHub facts first)         |
| `npm start`        | Serve the production build                          |
| `npm run lint`     | ESLint                                              |
| `npm run typecheck`| `tsc --noEmit`                                      |
| `npm test`         | Unit tests (Vitest)                                 |
| `npm run e2e`      | End-to-end tests (Playwright, Chromium)             |
| `npm run sync:github` | Refresh `content/github-snapshot.json` from the GitHub API |
| `npm run import:linkedin` | Read a LinkedIn export and propose an About update (never edits) |

## GitHub facts

The site does not hit the GitHub API at request time. `npm run build` runs `sync:github` first, which writes `content/github-snapshot.json` (gitignored) with the public facts of the owner's repos: `topics`, `homepage`, `html_url`. `lib/content.ts` merges those facts into each project:

- `topics` become stack chips, added after the local ones (case-insensitive dedupe, 8 max).
- `homepage` fills `links.live` **only** when the project does not define one.
- the repo's Open Graph image (`opengraph.githubassets.com`) fills `cover` only when the project has no screenshot.

Private repos, forks and archived repos are ignored, even though `/users/{user}/repos` only returns public repos today.

Everything written in `content/projects/*` wins, so a stale `homepage` in a repo can never overwrite a link you set by hand. If the API is down or rate-limited, the sync deletes the snapshot instead of leaving a stale one behind, and the site renders exactly what is in `content/projects/*`.

Optional: set `GITHUB_TOKEN` (5,000 req/h instead of 60) and `GITHUB_USER` (defaults to `OswaldoRodriguez123`) for the sync step. `GITHUB_SNAPSHOT` points the reader at another snapshot path. Run `npm run sync:github` once if you want the GitHub data in `npm run dev` too; Vercel runs `npm run build`, so production always syncs first.

## LinkedIn import

The About section is not scraped and not read through an API — LinkedIn's API only exposes `openid`/`email` outside the EU/EEA, and scraping profiles breaks its user agreement. The supported path is the member's own data export (Settings & Privacy → Data Privacy → Download your data), which ships `Profile.csv`, `Positions.csv`, `Skills.csv` and `Projects.csv`.

```bash
npm run import:linkedin -- ~/Downloads/export
npm run import:linkedin -- ~/Downloads/Basic_LinkedInDataExport.zip
```

`lib/linkedin.ts` parses the CSVs and `scripts/linkedin-import.mjs` writes `content/linkedin-proposal.json` (gitignored: it is personal data) with:

- the About text split into paragraphs — LinkedIn flattens paragraph breaks into runs of two spaces and keeps bullets inline as `•\t`, so both are normalised;
- `about.status` (`identical` / `different` / `no-summary`) against `home.aboutP1`/`aboutP2` in `messages/*.json`;
- positions that are only on LinkedIn, only in `content/work.ts`, or matched with a different period (compared by year, empty `Finished On` = present);
- the skill list and projects.

It **never edits the site**: translating the About text into Spanish is a human decision, so the script stops at the proposal. Copy what you want into `messages/en.json` and `messages/es.json` by hand.

Column names differ between export versions (`Name` vs `Skill Name`, `Started On` vs `Start Date`), so fields are looked up through aliases. Fixtures in `tests/fixtures/linkedin/` mirror the real headers with invented content.

## Project structure

```text
app/                # App Router routes ([locale] segment, sitemap, robots, OG image)
components/         # UI components (server components where possible)
content/            # Typed project content, validated at import time
  projects/         # One module per project; add new ones here
  work.ts           # Work history entries
i18n/               # next-intl routing and request config
lib/                # site config, SEO helpers, content queries, GitHub facts
messages/           # EN/ES message catalogs
scripts/            # Build-time helpers (GitHub snapshot sync)
tests/              # Vitest unit tests (tests/render.tsx renders with intl)
e2e/                # Playwright e2e + accessibility specs
public/projects/    # Project screenshots/covers
```

### Adding a project

1. Copy an existing module in `content/projects/` (e.g. `psico-yerma.ts`) to `<slug>.ts`.
2. Fill in **both locales** (`en` and `es`): `tagline` (≤ 120 chars), `role`, `problem` (2–4 paragraphs), `approach` (3–5 `{ title, body }` decision blocks) and `results` (2–4 bullets). If a metric is not verified, write `TODO(metric)` instead of inventing one.
3. Import it in `content/projects/index.ts` and add it to the `projects` array.
4. If the project has a public demo, capture the home page at 1440×900, convert it to WebP (≤ 200 KB) into `public/projects/<slug>.webp` and set `cover` in the module. Do **not** link to dead or private URLs — use screenshots instead. Without a screenshot the repo's Open Graph image is used (see *GitHub facts*). For private work, ship the case study with **no links at all**.
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
