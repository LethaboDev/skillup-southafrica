# Skillup Southafrica

Build an EdTech platform for South Africans to find scarce digital skills and courses according to the Department of Higher Education and Training (DHET) National List of Occupations in High Demand (including Software Developer, Cybersecurity Analyst, Data Analyst, Cloud Architect). 

For each high-demand digital occupation:
- Show its DHET OFO code, national demand tier, and typical entry-level South African salary ranges in ZAR.
- Provide curated, zero-cost step-by-step learning roadmaps linking to free courses and platforms (including cybersecurity pathways and free labs inspired by https://cybersecurity-simplified.com/, freeCodeCamp, CS50, and Microsoft/AWS free tiers).
- Connect learners to top South African youth tech academies, bootcamps, and sponsored internship/learnership pipelines: Deviare Academy, Umuzi, WeThinkCode_, UVU Africa (Capaciti), and Shaper.
- Include data-saving indicators (low-data/text-friendly flags) and searchable filters by role category, free certification availability, and learning format.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/26b8f05c-3df7-410a-8536-30d484d2491a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Use **Node.js 22.12 or newer** and **Bun**. TanStack Start requires Node >=22.12;
the local setup was verified with Node 24.19.0 and Bun 1.3.11. The repository
does not currently pin tool versions. `bun.lock` is the dependency lockfile;
use Bun rather than `npm install` to preserve the locked dependency versions.

If these tools are missing from your IntelliJ terminal, install Node 24 LTS
from [Node.js](https://nodejs.org/en/download) and Bun using the
[official installation instructions](https://bun.sh/docs/installation), then
restart the terminal. IntelliJ's agent runtime may provide Node to the agent
without providing it to your regular terminal.

```sh
node --version
bun --version
bun install --frozen-lockfile
bun run dev --host 127.0.0.1
```

Open the address printed by Vite (normally http://127.0.0.1:8080).
Browsing occupations and academies needs no credentials. Contact form delivery
requires private email settings; see [contact setup](docs/contact-setup.md).

```sh
bun run build
bun run test
bun run lint
bunx --no-install tsc --noEmit
```

After building, `bun run preview` previews the production build at
http://127.0.0.1:4173 using a pinned Wrangler CLI (downloaded on first use).
It runs locally without Cloudflare credentials or deployment. The preview
uses compatibility date 2026-10-13, the latest date supported by that CLI's
runtime; this override does not change the production build's date.
The current build
uses Nitro's `cloudflare-module` target; `.output/public` alone is not the
complete server-rendered app.

See [the initial project audit](docs/project-audit.md) for implemented features,
service dependencies, verification limits and next steps.
