# Initial project audit

Inspected locally on 14 October 2026. This is an initial development audit,
not a migration or deployment.

Subsequent change: a contact form and server-side Resend delivery adapter were
added at the user's request. This introduces an email service dependency for
message delivery only. The initial service inventory below describes the app
before that change. See [contact setup](contact-setup.md); an API key and account
verification were initially required. A later local activation test was accepted
by Resend; inbox receipt and hosted deployment remain unverified.

## Repository and stack

The checkout started clean on `main`, tracking `origin/main`. The origin is
`https://github.com/LethaboDev/skillup-southafrica.git`. README identifies `main`
as the Lovable sync branch; the actual Lovable account settings still need
verification. No remote, commit history or connection was changed.

The app uses React 19, TypeScript, TanStack Start and Router, Vite 8, Tailwind
CSS 4 and Radix/shadcn UI components. React Query is configured, but no service
queries were found. Nitro builds the server-rendered app for Cloudflare Workers.
Bun is the package manager, with `bun.lock` and a 24-hour package release-age
guard in `bunfig.toml`. No guard exceptions were added.

## Features and gaps

- Six occupations have salary ranges, OFO codes, demand tiers and learning roadmaps.
- Search and category, format, certificate and low-data filters use shareable URL parameters.
- Occupation pages link to learning resources and matching academies.
- Five academies have external application links, programme descriptions and stipend flags.
- Route metadata, error pages and missing-page handling are implemented.

This is a curated directory. Its source data is real app content rather than a
mock API. It has no learner accounts, saved progress, internal applications,
course delivery, admin editor or automated content updates. Those features
require a product decision before implementation. Filters check whether an
occupation contains each requested resource attribute independently; combined
filters need not match the same resource. Low-data badges describe linked
resources and do not provide an offline or data-saving mode.

The UI currently calls itself **SkillsPathway.za**, while the project is
**SkillUp South Africa**. Social metadata includes `@Lovable`. These should be
reviewed before release. DHET codes, demand tiers, salaries, free certificates,
course access and academy offers need current sources and review dates;
their accuracy was not verified in this setup audit.

## Services and ownership

| Area | Evidence in this checkout | Ownership / next verification |
| --- | --- | --- |
| GitHub | Origin points to LethaboDev's repository | User reports ownership; account access and branch settings are unverified |
| Lovable | Project link, template metadata, Vite configuration package and optional browser error hooks | Verify project account, sync settings and current hosting in Lovable |
| Database / Lovable Cloud data | No database client, schema, migrations or data API found | No data migration indicated by code; check dashboard for resources outside this checkout |
| Authentication / storage / business server functions | No implementation found; SSR and generic CSRF/error middleware are present | No service accounts required by current app |
| AI / email / payments | No integration found | No associated accounts indicated by code |
| Google Fonts | Browser loads fonts from Google | External runtime font dependency; no application credentials required |
| Courses and academies | Ordinary external links | Availability is controlled by providers; these are not connected service accounts |
| Hosting / domain / HTTPS | Cloudflare build target, no deployed account evidence | Current host, domain ownership, DNS and billing remain unknown |

Optional Lovable error reporting calls editor-provided browser hooks. The
Lovable Vite package supplies build plugins and environment injection; it is
an actual tooling dependency. Retain it while the sync connection is in use.
Moving source code does not transfer any dashboard resources, data or accounts.

No environment files or credential references were found in project source.
Environment files are now ignored, with `.env.example` allowed for placeholders.
If integrations are added, keep private keys on the server; values exposed with
`VITE_` are browser-visible. No example environment file is needed yet.

## Verification and next steps

Dependencies installed using Bun 1.3.11 with `--frozen-lockfile`, using Node
24.19.0. Build, TypeScript and the existing single route-matching test passed.
Formatting errors were corrected without intended behavior changes. Lint's
remaining Fast Refresh warnings concern shared UI exports.

Local HTTP checks verified the home page, academy page, software roadmap and
Security-filtered home page, plus 404 responses for unknown pages and occupations.
Production pages also passed local Wrangler runtime checks. The original
`vite preview` command failed because TanStack looked for `dist/server/server.js`
while Nitro outputs `.output/server/index.mjs`. The preview script now uses
pinned Wrangler 4.150.0 and the generated Worker configuration. Its local-only
compatibility date override is 2026-10-13: the build defaults to today's date,
but that Wrangler runtime supports dates only through 2026-10-13. The production
build date is unchanged. Review the CLI/date together when upgrading tooling.
These checks establish server rendering; they do not establish browser hydration,
interactive navigation, mobile layout, accessibility or external link validity.

Next, verify the app in a browser: combine filters, copy a filtered URL into a
new tab, open roadmaps and academy links, and check a narrow mobile viewport.
Then agree on branding and the minimum release scope, audit content sources,
and add focused coverage for filters and invalid occupations.

The simplest initial independent hosting candidate is **Cloudflare Workers
with static assets**, matching the existing build. No database is needed for
the current directory. The free tier allows 100,000 Worker requests per day
and 10 ms CPU per invocation; static asset requests are free and unlimited.
SSR runs as Worker requests, and this app's CPU usage and bundle eligibility
must be measured before choosing the free tier. See Cloudflare's
[pricing](https://developers.cloudflare.com/workers/platform/pricing/),
[limits](https://developers.cloudflare.com/workers/platform/limits/) and
[asset billing](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/).
A custom domain has separate registration costs. Use an account you control
when deployment is authorized; verify routes, assets, domain and HTTPS there
before disconnecting Lovable. No deployment has been performed.

The fresh-repository handover remains deferred. No root licence file was found;
review third-party licences and attribution before that handover, and preserve
the original repository as the requested backup.
