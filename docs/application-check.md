# Application verification — 14 October 2026

The local production build passed the checks below after two small UI fixes.
This verifies the current application before hosting preparation; no deployment,
domain registration, push or commit was performed during this review.

## Fixes

- The Cybersecurity Analyst heading overflowed a 320px viewport. Occupation
  headings now use smaller text on narrow screens and wrap long words.
- Yellow `.za` text in the header failed contrast checks (1.64:1). It now uses
  the existing green primary colour, which passed the accessibility scan.

## Results

| Check | Result |
| --- | --- |
| Frozen dependency lockfile | Unchanged |
| Production build | Passed |
| TypeScript compiler | Zero errors |
| Vitest | Four tests passed |
| ESLint | Zero errors, six existing Fast Refresh warnings |
| Production browser smoke checks | 27 passed in Chromium; 27 passed in WebKit |
| Automated accessibility | Zero WCAG A/AA violations on the four scanned pages |
| Browser runtime | No uncaught errors or failed requests recorded during the smoke runs |
| Public build privacy | Configured recipient and API key absent from browser assets |

Browser checks covered all six direct roadmap URLs, initial rendering and
hydration, search, empty results, category/format/certificate/low-data filters,
filter URLs after reload, navigation and browser Back, five academy links,
contact scrolling and validation, favicon configuration, and 404 recovery.
Widths of 320px, 375px and 768px were checked on the home, academy, cybersecurity
and network roadmap pages. Desktop checks used a 1366px viewport.

The accessibility scan used axe-core against the home, academy, software
roadmap and cybersecurity roadmap pages. Automated scans do not replace manual
screen-reader testing or tests on real mobile devices. WebKit was tested with
Playwright; this is a Safari-engine check, not a test of every Safari version.

## Contact form

A separate local development server ran the real contact server function with
the email provider simulated. The checks passed for:

- Successful submission, disabled controls during sending, and cleared fields.
- Correct private recipient and visitor Reply-To in the outgoing provider request.
- Provider failure, retained message text, and the ability to retry.
- Rejection of cross-site submissions with HTTP 403 before contacting the provider.

No additional live emails were sent. The production preview had no email
credentials; its form correctly reported that sending was unavailable.
The earlier live activation test was accepted by Resend, but inbox receipt
still requires the owner's confirmation. Hosting must configure the three
server-only email settings described in [contact setup](contact-setup.md).

## Remaining release work

The app is ready for hosting preparation, with the following limits recorded:

- Third-party course and academy URLs are configured as HTTPS links opening in
  new tabs, but their content, availability, certificate costs and admission
  claims were not independently reverified in this runtime review.
- DHET codes, demand tiers and salaries still need dated sources.
- The current brand remains SkillsPathway.za; the project name is SkillUp South Africa.
- Contact spam protection is basic and per instance; configure host-level limits
  or bot protection before public release.
- Provider account access, student credits, domain ownership, deployed email
  delivery and HTTPS must be verified during the hosting stage.

IntelliJ's native inspection messages remain separate from the successful
compiler, lint, build and runtime checks. This review does not claim those IDE
messages have all been resolved.

Browser and accessibility tools were installed only in temporary directories;
no application dependencies or lockfile entries were added. The two UI fixes
and this report remain uncommitted for review.
