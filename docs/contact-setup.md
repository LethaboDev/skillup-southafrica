# Contact form setup

The contact section appears on every page and sends through a TanStack Start
server function. The recipient address and API key stay on the server. No
database is needed. A live activation test on 14 October 2026 was accepted by
Resend (HTTP 200) through the server delivery handler. Inbox receipt still
needs confirmation. The sending-only API key cannot query delivery status.

## Activate delivery

1. Create a [Resend](https://resend.com/) account you control and create a sending API key.
2. Copy `.env.example` to `.env.local`. Enter your API key and your requested Gmail address as `CONTACT_TO_EMAIL`. Keep this file private; Git ignores it.
3. Set `CONTACT_FROM_EMAIL` to an address on a domain you have verified in Resend. For initial testing, `SkillUp South Africa <onboarding@resend.dev>` can send only to the email address registered on your Resend account. Register with your intended recipient address if using this test sender.
4. Restart `bun run dev`. Submit a test message and check your inbox and spam folder, plus Resend's delivery status.

See [Resend's sender restrictions](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain)
and [sending API documentation](https://resend.com/docs/api-reference/emails/send-email).
The visitor's address is Reply-To; it is never used as the sender.

## Hosting and privacy

For Lovable or independent hosting, configure the same three values in the
host's **server-side secrets**, not browser settings or Git. For local Wrangler
preview, use an ignored `.dev.vars` file with those settings. Never use `VITE_`
for the recipient or API key. Restart the server after changing settings.

The form sends the visitor's name, email and message through Resend to your
inbox; it does not store them in an application database. Add your chosen
privacy/retention policy before release. Replies you send from Gmail will show
your Gmail address to the person receiving your reply.

Validation, a honeypot and a budget of 20 send attempts per hour per server
instance are included. This budget resets on restarts and is not shared across
instances; add host-level rate limiting or bot verification before making the
form public. Existing server-function CSRF protection remains enabled.

Without settings, the form reports that sending is unavailable. A success
message means the provider accepted the email, not that inbox delivery has
been independently confirmed.
