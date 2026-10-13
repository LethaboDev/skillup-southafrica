import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Badge } from "@/components/SiteShell";
import { academies } from "@/data/skills";

export const Route = createFileRoute("/academies")({
  head: () => ({
    meta: [
      { title: "SA tech academies & learnerships — SkillsPathway.za" },
      { name: "description", content: "WeThinkCode_, Umuzi, UVU Africa Capaciti, Deviare and Shaper: free bootcamps and sponsored learnerships." },
      { property: "og:title", content: "South African youth tech academies & learnerships" },
      { property: "og:description", content: "Free bootcamps, stipends and internship pipelines for young South Africans." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell>
      <h1 className="font-display text-5xl font-extrabold tracking-tight">Academies & pipelines</h1>
      <p className="mt-2 max-w-2xl text-lg text-muted-foreground">Finished a free roadmap? These programmes offer tuition-free training, stipends and placements with employers.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {academies.map((a) => (
          <div key={a.name} className="flex flex-col rounded-xl border-2 border-foreground bg-card p-6">
            <div className="flex flex-wrap gap-2"><Badge tone="primary">{a.model}</Badge>{a.stipend && <Badge tone="accent">Stipend</Badge>}</div>
            <h2 className="mt-3 font-display text-2xl font-bold">{a.name}</h2>
            <p className="mt-1 text-sm">{a.focus}</p>
            <p className="mt-3 text-xs text-muted-foreground">📍 {a.locations}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">{a.roles.map((r) => <Badge key={r}>{r}</Badge>)}</div>
            <a href={a.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex w-fit rounded-md bg-foreground px-4 py-2 text-sm font-semibold text-background hover:bg-primary">Visit & apply →</a>
          </div>
        ))}
      </div>
    </SiteShell>
  );
}
