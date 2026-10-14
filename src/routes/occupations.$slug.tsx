import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell, Badge } from "@/components/SiteShell";
import { occupations, academies, formatZAR } from "@/data/skills";

export const Route = createFileRoute("/occupations/$slug")({
  loader: async ({ params }) => {
    const o = occupations.find((x) => x.slug === params.slug);
    if (!o) throw notFound();
    return { slug: o.slug, title: o.title, summary: o.summary };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.title} roadmap — SkillsPathway.za`
          : "Occupation — SkillsPathway.za",
      },
      { name: "description", content: loaderData?.summary ?? "Free learning roadmap" },
      {
        property: "og:title",
        content: loaderData
          ? `Free ${loaderData.title} roadmap (South Africa)`
          : "Occupation roadmap",
      },
      { property: "og:description", content: loaderData?.summary ?? "Free learning roadmap" },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
  notFoundComponent: () => (
    <SiteShell>
      <p>
        Occupation not found.{" "}
        <Link to="/" className="text-primary underline">
          Back to all
        </Link>
      </p>
    </SiteShell>
  ),
  errorComponent: ({ error }) => (
    <SiteShell>
      <p role="alert">{error instanceof Error ? error.message : String(error)}</p>
    </SiteShell>
  ),
});

function Page() {
  const { slug } = Route.useLoaderData();
  const o = occupations.find((x) => x.slug === slug)!;
  const acads = academies.filter((a) => a.roles.includes(o.category));

  return (
    <SiteShell>
      <Link to="/" className="text-sm font-semibold text-muted-foreground hover:text-primary">
        ← All occupations
      </Link>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone="accent">{o.tier} demand</Badge>
        <Badge>{o.category}</Badge>
      </div>
      <h1 className="mt-3 break-words font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
        {o.title}
      </h1>
      <p className="mt-2 max-w-2xl text-lg text-muted-foreground">{o.summary}</p>

      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          ["DHET OFO code", o.ofo],
          ["National demand tier", o.tier],
          ["Entry salary (ZAR/yr)", `${formatZAR(o.salary[0])} – ${formatZAR(o.salary[1])}`],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl border-2 border-foreground bg-card p-4">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">{k}</dt>
            <dd className="mt-1 font-display text-xl font-bold">{v}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-12 font-display text-3xl font-bold">Zero-cost roadmap</h2>
      <ol className="mt-6 space-y-6">
        {o.steps.map((st, i) => (
          <li key={st.title} className="grid gap-4 md:grid-cols-[3rem_1fr]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-display text-xl font-bold text-primary-foreground">
              {i + 1}
            </div>
            <div>
              <h3 className="font-display text-xl font-bold">{st.title}</h3>
              <p className="text-sm text-muted-foreground">{st.goal}</p>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {st.resources.map((r) => (
                  <li key={r.title + r.url}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block h-full rounded-lg border border-border bg-card p-4 hover:border-primary"
                    >
                      <div className="text-xs font-semibold text-primary">{r.provider}</div>
                      <div className="font-semibold">{r.title}</div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <Badge>{r.format}</Badge>
                        <Badge>~{r.hours}h</Badge>
                        {r.freeCert && <Badge tone="primary">Free certificate</Badge>}
                        {r.lowData ? (
                          <Badge tone="accent">Low-data</Badge>
                        ) : (
                          <Badge>Video-heavy</Badge>
                        )}
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <h2 className="mt-12 font-display text-3xl font-bold">Next: academies & learnerships</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {acads.map((a) => (
          <a
            key={a.name}
            href={a.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border-2 border-foreground bg-card p-4 hover:bg-muted"
          >
            <div className="font-display text-lg font-bold">{a.name}</div>
            <div className="text-xs text-muted-foreground">
              {a.model}
              {a.stipend ? " · stipend" : ""}
            </div>
            <p className="mt-2 text-sm">{a.focus}</p>
          </a>
        ))}
      </div>
    </SiteShell>
  );
}
