# ASPNSPS Web

ASPNSPS website built with Next.js App Router, Chakra UI, and Prisma.

This repository contains the current implementation of the public parish website plus the internal admin area for blog posts, events, and account management. It combines static parish content with Prisma-backed blog and event data, a server-routed contact form, and a scroll-driven home experience.

## Current Status

### Stack

- **Framework:** Next.js 16 App Router
- **Language:** TypeScript
- **UI:** Chakra UI with custom theme tokens and light/dark mode
- **Database:** PostgreSQL via Prisma
- **Authentication:** NextAuth credentials flow for admin access
- **Content:** Markdown-backed blog posts and event descriptions
- **Integrations:** Web3Forms for contact submissions, UploadThing for admin image uploads, Google Maps embed for location details

### Implemented Public Pages

- `/` home page with smooth scroll paging, snap sections, animated transitions, latest posts, and image-strip storytelling
- `/about` parish overview
- `/about/history` parish history timeline
- `/blog` public blog index with search
- `/blog/[slug]` markdown blog post pages with related posts
- `/events` public events index with calendar-oriented listing
- `/events/[slug]` event detail pages
- `/events.ics` sitewide calendar feed
- `/events/[slug]/ics` per-event calendar download
- `/schedule` mass, confession, and devotional schedules
- `/services` parish services overview with search and requirement details
- `/marriage` marriage information page
- `/ministries` ministries, organizations, and apostolates directory with tabs, search, and detail drawers
- `/contact` parish contact details, office hours, map embed, and contact form

### Implemented Admin Area

- `/admin/login` credentials-based sign-in
- `/admin` dashboard with post, event, and account counts
- `/admin/blogs` create, edit, publish, unpublish, and delete blog posts
- `/admin/events` create, edit, publish, unpublish, and delete events
- `/admin/users` sysadmin-only account management for administrators and editors

## Home Scroll UX

The public layout wraps site content in a smooth-scrolling container powered by Lenis and a snap-based pager. The home page currently uses three full-height sections:

1. Hero
2. Latest blog posts
3. Moments in images

### Behavior

- One mouse wheel / key / pager click moves one section at a time (carousel-style)
- Total scroll transport duration: **0.76s on desktop**, **0.62s on touch-first devices**, both comfortably under the 800ms target
- Subtle easing curves (`easeOutCubic` for snap transport, `easeInOutCubic` otherwise) keep transitions from feeling abrupt
- Manual scrollbar drags land cleanly via buffered snap-to-nearest, with longer grace windows on mobile touch
- `passive: true` is used everywhere except desktop wheel interception in paged mode (where `preventDefault()` is required), so scroll listeners do not block the main thread
- Animations use only GPU-friendly `transform` and `opacity`; no blur/filter effects are applied during section transitions

### Section-specific transitions

All three sections use distinct entrance motion profiles, activated as each section comes into view (via IntersectionObserver-backed `useInView`):

- **Hero (section 0):** slight scale + vertical fade, so the opening frame settles into place
- **Announcements (section 1):** vertical rise with staggered card entrance for the blog grid
- **Moments (section 2):** gentle horizontal offset + vertical rise to give the image strip a “reveal” feel

Motion intensity scales down on mobile (smaller Y/X deltas) for better perceived performance on touch hardware.

### Accessibility

- System `prefers-reduced-motion: reduce` is respected:
  - Framer Motion disables entrance transitions via `useReducedMotion()`
  - Lenis `smoothWheel` is disabled
  - Paged snap logic falls back to buffered non-mandatory scrolling without intercept locks
- Snap navigation remains functional for users with reduced motion; the animated transitions are the only part disabled

## Contact Flow

The contact page submits to `POST /api/contact`, not directly to Web3Forms from the browser.

Current behavior:

- validates required fields server-side
- validates email format server-side
- reads the Web3Forms access key from environment variables
- forwards the message to Web3Forms from the server
- returns structured JSON success and error responses
- keeps the access key out of client-side code

## Data Sources

### Prisma-backed Content

- admin users
- blog posts
- events

### Local Data Modules

These sections are currently content-driven from source files in `src/lib/`:

- about page data
- ministries directory
- schedule content
- service requirements and office request cards
- parish contact and navigation config

## Local Setup

### Prerequisites

- Node.js 25+
- npm
- PostgreSQL

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env`

There is currently no committed `.env.example`, so create a local `.env` file manually in the project root.

Minimum recommended variables:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public"
AUTH_SECRET="replace-with-a-long-random-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
WEB3FORMS_ACCESS_KEY="your-web3forms-access-key"
INITIAL_ADMIN_EMAIL="admin@example.com"
INITIAL_ADMIN_PASSWORD="change-me"
SYSADMIN_NAME="System Administrator"
```

Additional notes:

- `NEXTAUTH_SECRET` is also supported if you prefer it over `AUTH_SECRET`
- `SYSADMIN_EMAIL` and `SYSADMIN_PASSWORD` can also be used instead of `INITIAL_ADMIN_EMAIL` and `INITIAL_ADMIN_PASSWORD`
- UploadThing server credentials are required if you want file uploads from the admin blog and event forms

### 3. Initialize Prisma

The repository includes `prisma/schema.prisma` but does not currently include committed migration files. For a fresh local database, the quickest setup is:

```bash
npx prisma generate
npx prisma db push
```

If you prefer migration-based local development, create the initial migration after your database is available:

```bash
npx prisma migrate dev --name init
```

### 4. Start the app

```bash
npm run dev
```

Open `http://localhost:3000`.

### 5. Bootstrap the first admin account

Once the database is ready and the admin environment variables are set, visiting `/admin/login` will trigger the bootstrap check and seed the first sysadmin account when none exists yet.

## Available Scripts

- `npm run dev` starts the Next.js development server
- `npm run build` builds the production app
- `npm run start` starts the production server
- `npm run lint` runs ESLint
- `npm run check` runs ESLint plus TypeScript type-checking
- `npm run test:ui` runs the Playwright UI smoke and accessibility suite
- `npm run test:ui:headed` runs the same suite with a visible browser
- `npm run test:ui:audit` runs only the accessibility audit coverage
- `npm run test:ui:report` converts the Playwright JSON output into a Markdown improvement report
- `npm run test:ui:report:open` opens the Playwright HTML report
- `npm run prebuild` (auto) runs `prisma generate` before `npm run build`; add `postinstall: prisma generate` if your host requires it

## UI Testing

The repository now includes a Playwright-based UI test suite under `tests/ui/` for public-page smoke coverage, critical interactions, responsive navigation, and accessibility checks.

### What It Covers

- public-route rendering for the main marketing pages
- schedule, services, ministries, and contact interactions
- mobile navigation behavior
- accessibility audits for the highest-traffic public pages using axe
- HTML and JSON report artifacts for debugging and follow-up improvements

### First-Time Setup

Install the Playwright browser used by the suite:

```bash
npx playwright install chromium
```

### Running The Suite

```bash
npm run test:ui
```

Artifacts generated after a run:

- `playwright-report/` for the interactive HTML report
- `test-results/ui-report.json` for machine-readable results
- `test-results/artifacts/` for screenshots, traces, and videos on failures

### Generating The Improvement Report

After `npm run test:ui` completes, generate the Markdown summary:

```bash
npm run test:ui:report
```

This writes `playwright-report/ui-improvement-report.md`, which summarizes failures, highlights the slowest tests, and suggests which parts of the website to improve next.

## Project Structure

```text
src/
├── app/
│   ├── (public)/        # Public routes and route-group layout
│   ├── admin/           # Protected admin routes
│   ├── api/             # Route handlers
│   └── uploadthing/     # UploadThing router config
├── components/          # Reusable UI by feature/area
├── features/            # Blog and events data logic
├── lib/                 # Shared config, Prisma, auth, and local content data
├── providers/           # Chakra and Emotion providers
├── styles/              # Theme definition
└── types/               # Shared type declarations
```

## Related Documentation

- `docs/docs.md` for the broader project framework and architectural direction
- `docs/pages-current-state-with-screenshots.md` for page screenshots and current visual coverage
- `docs/website-assets-checklist.md` for the current asset inventory and replacement priorities

## In Progress

The repository is usable, but several areas are still actively maturing:

- **Environment bootstrap:** there is no committed `.env.example` yet
- **Database setup:** schema is present, but Prisma migration history is not yet committed
- **Asset quality:** several ministries, services, and marriage visuals still use AI-generated or remote-hosted placeholders
- **Content population:** public blog and events pages depend on seeded Prisma data to feel complete
- **Testing:** no automated test suite is currently committed

## Notes

- The public website mixes static parish content with database-backed blog and event content
- Blog and events data loaders use safe fallbacks, so missing database content can result in empty listings rather than a full public-page crash
- Admin pages require working database connectivity and valid auth secrets
