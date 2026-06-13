import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/home/PageShell";
import { ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/strategy-call")({
  head: () => ({
    meta: [
      { title: "$500 Revenue Engine Setup — Replaces the Strategy Call | ClickAdMedia" },
      {
        name: "description",
        content:
          "The strategy call is now the $500 Revenue Engine Setup: a done-for-you contractor lead-gen website plus instant follow-up automation. Apply now.",
      },
      { property: "og:title", content: "$500 Revenue Engine Setup — ClickAdMedia" },
      {
        property: "og:description",
        content: "One-time $500 setup. Done-for-you contractor lead-gen website + follow-up.",
      },
      { property: "og:url", content: "/strategy-call" },
    ],
    links: [{ rel: "canonical", href: "/apply" }],
  }),
  component: StrategyCallRedirect,
});

function StrategyCallRedirect() {
  return (
    <PageShell>
      <section className="relative pt-36 pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            We've Simplified
          </span>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            The strategy call is now the <span className="text-gradient-brand">$500 Setup.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Instead of a sales call, we hand you a working Revenue Engine — a done-for-you
            contractor lead-gen website plus instant follow-up automation — for a one-time $500
            setup fee.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/apply"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-[0_10px_40px_var(--glow-blue)] transition-all hover:translate-y-[-1px]"
            >
              Apply for the $500 Setup
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/free-audit"
              className="inline-flex h-14 items-center justify-center rounded-full border border-border bg-secondary/40 px-8 text-base font-semibold text-foreground hover:bg-secondary"
            >
              Get a Free Revenue Audit
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
