import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteShell, Badge } from "@/components/SiteShell";
import { occupations, categories, formats, filterOccupations, formatZAR } from "@/data/skills";

type Search = {
  q?: string | undefined;
  category?: string | undefined;
  format?: string | undefined;
  freeCert?: boolean | undefined;
  lowData?: boolean | undefined;
};
const str = (v: unknown) => (typeof v === "string" && v ? v : undefined);
const bool = (v: unknown) => v === true || v === "true" || undefined;

export const Route = createFileRoute("/")({
  validateSearch: (r: Record<string, unknown>): Search => ({
    q: str(r["q"]),
    category: str(r["category"]),
    format: str(r["format"]),
    freeCert: bool(r["freeCert"]),
    lowData: bool(r["lowData"]),
  }),
  head: () => ({
    meta: [
      { title: "SkillsPathway.za — Free roadmaps for SA's scarce digital skills" },
      {
        name: "description",
        content:
          "Find DHET high-demand digital occupations, ZAR salaries, zero-cost learning roadmaps and SA tech academies.",
      },
      {
        property: "og:title",
        content: "SkillsPathway.za — Scarce digital skills for South Africans",
      },
      {
        property: "og:description",
        content: "Free, low-data learning roadmaps for DHET occupations in high demand.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const raw = Route.useSearch();
  const s = {
    q: raw.q ?? "",
    category: raw.category ?? "",
    format: raw.format ?? "",
    freeCert: !!raw.freeCert,
    lowData: !!raw.lowData,
  };
  const navigate = useNavigate({ from: "/" });
  const set = (patch: Partial<Search>) =>
    navigate({ search: (p) => ({ ...p, ...patch }), replace: true });
  const list = filterOccupations(occupations, s);

  return (
    <SiteShell>
      <section className="mb-10 grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">
            DHET Occupations in High Demand
          </p>
          <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
            Scarce skills. <span className="text-primary">Zero rand</span> to start.
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Pick a digital career South Africa needs, follow a free step-by-step roadmap, then join a
          sponsored academy or learnership.
        </p>
      </section>

      <section className="mb-8 rounded-xl border-2 border-foreground bg-card p-4">
        <div className="grid gap-3 md:grid-cols-4">
          <input
            aria-label="Search occupations"
            value={s.q}
            onChange={(e) => set({ q: e.target.value })}
            placeholder="Search role or OFO code…"
            className="rounded-md border border-input bg-background px-3 py-2 text-sm md:col-span-2"
          />
          <select
            aria-label="Role category"
            value={s.category}
            onChange={(e) => set({ category: e.target.value })}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            aria-label="Learning format"
            value={s.format}
            onChange={(e) => set({ format: e.target.value })}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Any format</option>
            {formats.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="mt-3 flex flex-wrap gap-5 text-sm font-medium">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={s.freeCert}
              onChange={(e) => set({ freeCert: e.target.checked })}
            />{" "}
            Free certificate available
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={s.lowData}
              onChange={(e) => set({ lowData: e.target.checked })}
            />{" "}
            Low-data / text-friendly options
          </label>
        </div>
      </section>

      {list.length === 0 && (
        <p className="text-muted-foreground">No occupations match these filters.</p>
      )}
      <div className="grid gap-5 md:grid-cols-2">
        {list.map((o) => {
          const res = o.steps.flatMap((x) => x.resources);
          const low = res.filter((r) => r.lowData).length;
          return (
            <Link
              key={o.slug}
              to="/occupations/$slug"
              params={{ slug: o.slug }}
              className="group rounded-xl border-2 border-foreground bg-card p-6 transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--color-foreground)]"
            >
              <div className="mb-3 flex flex-wrap gap-2">
                <Badge tone={o.tier === "Critical" ? "accent" : "muted"}>{o.tier} demand</Badge>
                <Badge>{o.category}</Badge>
                <Badge>OFO {o.ofo}</Badge>
              </div>
              <h2 className="font-display text-2xl font-bold group-hover:text-primary">
                {o.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{o.summary}</p>
              <div className="mt-4 flex flex-wrap items-end justify-between gap-2 border-t border-border pt-4">
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">
                    Entry salary / year
                  </div>
                  <div className="font-display text-xl font-bold">
                    {formatZAR(o.salary[0])} – {formatZAR(o.salary[1])}
                  </div>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  {o.steps.length} steps · {res.length} free resources
                  <br />
                  {low} low-data
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </SiteShell>
  );
}
