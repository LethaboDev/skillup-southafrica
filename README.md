# SkillUp South Africa

A career and learning directory that helps South Africans explore high-demand
digital occupations, follow curated learning roadmaps, and find tech academies
and learnership programmes.

**Maintained by [Lethabo Ratau](https://github.com/LethaboDev).**

[Visit the live application](https://skillup-southafrica-lethabo-axaddkaafkbnejdz.southafricanorth-01.azurewebsites.net)

## Features

- Six digital occupations with OFO codes, demand labels and indicative entry-level salary ranges in ZAR.
- Step-by-step learning roadmaps with links to external courses and labs.
- Search and filters for category, learning format, free certificate availability and low-data resources.
- Shareable filtered views through URL search parameters.
- Five South African academy and learnership listings, with external application links.
- A contact form that delivers messages through a server-side Resend integration.
- Responsive layouts, missing-page handling and a South African flag favicon with SP lettering.

Occupation, roadmap and academy content is maintained in
[src/data/skills.ts](src/data/skills.ts). The curated directory does not require
a database. Learner accounts and saved progress are not currently implemented.
The interface currently displays **SkillsPathway.za** branding.

OFO codes reference the DHET National List of Occupations in High Demand.
Demand labels, salaries, course access, certificate offers and programme details
need checking against current sources. Low-data labels describe linked resources;
they do not provide an offline mode.

## Technology

| Area                         | Technology                                     |
| ---------------------------- | ---------------------------------------------- |
| Interface                    | React 19 and TypeScript                        |
| Routing and server rendering | TanStack Start and TanStack Router             |
| Styling and UI components    | Tailwind CSS 4 and Radix/shadcn components     |
| Build and server output      | Vite 8 and Nitro                               |
| Package manager              | Bun, with dependencies locked in `bun.lock`    |
| Tests and checks             | Vitest, Testing Library, TypeScript and ESLint |
| Email delivery               | Resend, called only from the server            |
| Current hosting              | Azure App Service, Linux and Node 24 LTS       |

## Run locally

Use **Node.js 22.12 or newer**; Node 24 LTS is recommended. The setup was tested
with Node 24.19.0 and Bun 1.3.11. Install [Node.js](https://nodejs.org/en/download)
and [Bun](https://bun.sh/docs/installation) if needed.

```sh
git clone https://github.com/LethaboDev/skillup-southafrica.git
cd skillup-southafrica
bun install --frozen-lockfile
bun run dev --host 127.0.0.1
```

Open the address printed by Vite, normally http://127.0.0.1:8080.
Use Bun for installation so the existing lockfile is respected.

Browsing occupations and academies needs no credentials. To enable local
contact-form delivery, copy `.env.example` to `.env.local` and enter your own
server settings. See [contact setup](docs/contact-setup.md).

## Check the code

```sh
bun run test
bun run lint
bunx --no-install tsc --noEmit
bun run build
```

The application passed production browser checks in Chromium and WebKit,
including filtering, navigation, direct roadmap URLs, 404 recovery and mobile
layouts. See [application verification](docs/application-check.md) for the scope
and limits of those checks.

## Builds and deployment

| Command                 | Purpose                                                  |
| ----------------------- | -------------------------------------------------------- |
| `bun run build`         | Build the Cloudflare-targeted output in `.output`        |
| `bun run preview`       | Preview that build locally using pinned Wrangler tooling |
| `bun run build:azure`   | Build a standalone Node server in `.output-azure`        |
| `bun run package:azure` | Create `.deploy/skillup-southafrica-azure.zip`           |
| `bun run start:azure`   | Start the Azure Node build locally                       |

For an Azure-build preview on your Mac:

```sh
bun run build:azure
PORT=4175 HOST=127.0.0.1 bun run start:azure
```

The live app is deployed independently on Azure App Service using a prebuilt
ZIP. These local build and packaging commands do not deploy it. Pushing source
changes to GitHub does not automatically update Azure; rebuild and deploy a new
ZIP for each release. See [Azure deployment](docs/azure-deployment.md).

This app includes server code. Deploying only its static `public` output will
not run the complete app or its contact form.

## Private settings

The contact form uses `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and
`CONTACT_FROM_EMAIL`. Configure them in `.env.local` for local development and
in Azure's server-side app settings for hosting. The standalone Node build does
not automatically load `.env.local`.

Keep real keys and recipient addresses out of Git and browser code. Never
prefix private settings with `VITE_`. `.env.example` contains placeholders;
environment files and generated deployment output are ignored by Git.

## Development workflow and attribution

The initial prototype was created with [Lovable](https://lovable.dev), and the
repository remains connected to the
[Lovable project](https://lovable.dev/projects/26b8f05c-3df7-410a-8536-30d484d2491a).
Development continues locally in IntelliJ, with commits under the maintainer's
Git identity. Changes pushed to the connected `main` branch sync with Lovable.
Preserve published Git history; do not force-push or rewrite pushed commits.

See [AGENTS.md](AGENTS.md) for repository instructions and the
[project audit](docs/project-audit.md) for service dependencies and remaining
release work.
