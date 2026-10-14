# Azure deployment preparation

Prepared on 14 October 2026. No Azure resources have been created and nothing
has been deployed. Subscription type, available credits, region quotas and
resource pricing still require verification in the owner's Azure account.

## Build and package locally

Use the existing Bun lockfile and Node 24:

```sh
bun install --frozen-lockfile
bun run build:azure
bun run package:azure
```

The Azure build is a standalone Nitro **node-server** build in `.output-azure`.
The ZIP is `.deploy/skillup-southafrica-azure.zip`, containing `server/`,
`public/` and a small runtime `package.json` at the archive root. It includes
no project environment files, source checkout or Git history. Both output
folders are ignored by Git. Packaging uses the `zip` command supplied on macOS.

The usual `bun run build` continues to target Cloudflare; the Lovable build
configuration and sync branch are retained. No new dependencies or lockfile
changes are needed. The Azure helper sets `SKILLUP_AZURE_BUILD=1` only in its
build subprocess to select the additional output target.

For a local Azure-build preview:

```sh
PORT=4175 HOST=127.0.0.1 bun run start:azure
```

Visit http://127.0.0.1:4175. This command does not automatically read
`.env.local`; production-style server settings must be supplied to the process
when testing actual email delivery. Never embed those settings into the ZIP.

## Proposed first Azure deployment

After confirming the subscription and approving resource creation/deployment,
use **Azure App Service**, with code deployment on **Linux, Node 24 LTS**.
Start with the **Free F1** tier if available in the subscription and region.
Verify the portal's pricing and quota availability before creating anything;
do not accept a paid replacement automatically. No database, virtual machine,
container registry or Kubernetes cluster is required for the current app.

Configure these server settings on the Azure app:

| Setting | Value |
| --- | --- |
| Startup command | `node /home/site/wwwroot/server/index.mjs` |
| `NODE_ENV` | `production` |
| `SCM_DO_BUILD_DURING_DEPLOYMENT` | `false` — the ZIP is already built |
| `RESEND_API_KEY` | Owner's private Resend sending key |
| `CONTACT_TO_EMAIL` | Owner's private recipient address |
| `CONTACT_FROM_EMAIL` | Approved Resend sender address |

App Service supplies `PORT`; Nitro's Node server listens on it. The startup
command should run the Node server directly. Keep the email settings in the
host's server configuration and out of Git and browser-visible `VITE_` values.
The Resend test sender is restricted to the Resend account's own address;
verify a sender domain when needed, as described in [contact setup](contact-setup.md).

Deploy the prebuilt ZIP using Azure CLI's `az webapp deploy`. Azure Cloud Shell
is a browser-based option; no Azure CLI installation on the Mac is currently
required. Its subscription/storage options also need review before setup.
The Kudu drag-and-drop ZIP deployment UI is not supported for Linux App Service.
Account authentication and any publication remain owner-controlled.

## Verification before a domain or Lovable disconnection

On the Azure-supplied HTTPS address, verify initial rendering, fonts/styles,
SP favicon, all six roadmap URLs, filters and shared URLs, academy navigation,
mobile layout, missing-page responses, and contact success/failure. Confirm a
test email reaches the intended inbox, inspect provider delivery status and
Azure logs without exposing personal message contents or secrets, and monitor
resource usage against subscription credits. Configure suitable public contact
abuse protection; the current send budget is per server instance.

The F1 plan is for initial testing and has quotas. For **App Service**, a
custom domain needs a paid plan, and its managed HTTPS certificate requires
Basic or higher. Review the actual monthly price before upgrading. The domain
can be registered with a Student Pack registrar; it need not be bought through
Azure. Do not disconnect Lovable until independent hosting, email, domain and
HTTPS have been verified.

## Local verification performed

The Azure ZIP was unpacked outside the repository and started using Node
24.19.0 on a supplied port. It passed 27 production browser smoke checks,
including filters, navigation, six roadmaps, contact unavailable feedback,
404 recovery and mobile layouts. It did not require the checkout's
`node_modules` or environment files. Scanning the unpacked package found no
configured recipient address or API key. Four existing tests and TypeScript
checks passed. No additional live emails were sent.

## References

- [Nitro Node server output](https://nitro.build/deploy/runtimes/node)
- [Azure Node configuration](https://learn.microsoft.com/en-us/azure/app-service/configure-language-nodejs)
- [Deploy a prebuilt ZIP](https://learn.microsoft.com/en-us/azure/app-service/deploy-zip)
- [App Service plan tiers](https://learn.microsoft.com/en-us/azure/app-service/overview-hosting-plans)
- [Custom domain requirements](https://learn.microsoft.com/en-us/azure/app-service/app-service-web-tutorial-custom-domain)
- [Managed HTTPS certificates](https://learn.microsoft.com/en-us/azure/app-service/configure-ssl-certificate)
