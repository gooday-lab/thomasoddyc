# Thomas Oddy Portfolio

A bilingual personal portfolio and CV website for Thomas Oddy Chrisdwianto — MIS Analyst, Data & Reporting Automation.

The site is multi-page: About, Experience, Case studies, Projects, and Contact are separate pages (each opens in its own browser tab), not anchors on one long page.

## Stack

- Next.js 16 + TypeScript
- Tailwind CSS 4
- Supabase Auth, Postgres, and Storage
- Vercel-ready deployment

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The public portfolio is available at `/` and the admin workspace at `/admin`. Public routes: `/about`, `/experience`, `/case-studies`, `/projects`, `/contact`.

## Connect Supabase

1. Create a Supabase project.
2. In Supabase SQL Editor, run [`supabase/schema.sql`](./supabase/schema.sql). It is idempotent — safe to re-run at any time to repair or add missing columns.
   - To start from scratch instead, run [`supabase/reset.sql`](./supabase/reset.sql) first to drop the portfolio tables, then run `schema.sql`.
3. Create the single admin user under **Authentication → Users**.
4. Copy `.env.example` to `.env.local` and add the project URL and anon key:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

5. Restart the dev server.

Without Supabase environment variables, `/admin` runs in a safe preview mode so the interface can be reviewed before credentials are connected. Once configured, sign-in and Storage uploads use Supabase.

## Content notes

- English is the default public language; use the `EN / ID` control to switch to Indonesian.
- The public site reads profile, projects, certifications, testimonials, and site copy from Supabase. Anything edited in `/admin` appears on the live site; until Supabase has content, the built-in defaults are shown.
- Every greeting, heading, and label is editable from `/admin` → **Site copy** (both EN and ID), stored in the `site_copy` table.
- Projects are routed by their **Content type**: values containing "case study" appear on `/case-studies`, everything else on `/projects`.
- Every content type supports both English and Indonesian fields (`*_en` / `*_id`), so the `EN / ID` toggle switches real translations, not just UI labels.
- The starter CV is copied to `public/Thomas_Oddy_ATS_CV.docx` for the Download CV action (replaced by the CV uploaded from `/admin` → Profile once Supabase Storage is connected).

## Checks

```bash
npm run lint
npm run build
```
