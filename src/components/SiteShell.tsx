import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ContactSection } from "./ContactSection";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b-2 border-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <Link to="/" className="font-display text-2xl font-extrabold tracking-tight">
            Skills<span className="text-primary">Pathway</span>
            <span className="text-accent">.za</span>
          </Link>
          <nav className="flex gap-5 text-sm font-semibold">
            <Link
              to="/"
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-primary underline underline-offset-4" }}
            >
              Occupations
            </Link>
            <Link
              to="/academies"
              activeProps={{ className: "text-primary underline underline-offset-4" }}
            >
              Academies
            </Link>
            <a href="#contact" className="hover:text-primary">
              Contact
            </a>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10">{children}</main>
      <ContactSection />
      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-6 text-xs text-muted-foreground">
          <p>
            OFO codes and demand tiers reference the DHET National List of Occupations in High
            Demand. Salaries are indicative entry-level ranges — always verify against the latest
            gazette and job listings.
          </p>
          <p className="mt-3">© {new Date().getFullYear()} Lethabo Ratau. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export function Badge({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: "muted" | "primary" | "accent";
}) {
  const t = {
    muted: "bg-muted text-foreground",
    primary: "bg-primary text-primary-foreground",
    accent: "bg-accent text-accent-foreground",
  }[tone];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${t}`}
    >
      {children}
    </span>
  );
}
