import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/home/PageShell";
import { ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/strategy-call")({
  head: () => ({
    meta: [
      { title: "Book a Free Strategy Call | ClickAdMedia Calgary" },
      {
        name: "description",
        content:
          "Book a free strategy call with ClickAdMedia to map out a lead-generation website for your Calgary or Alberta trades business.",
      },
      { property: "og:title", content: "Book a Free Strategy Call — ClickAdMedia" },
      {
        property: "og:description",
        content: "A clear, no-pressure conversation about turning your website into more calls and booked jobs.",
      },
      { property: "og:url", content: "/strategy-call" },
    ],
    links: [{ rel: "canonical", href: "/strategy-call" }],
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
            Free · No pressure · 20 minutes
          </span>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            Let's map your route to <span className="text-gradient-brand">more booked jobs.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Tell us about your trade, service area, and growth goals. We'll identify what is holding
            your website back and show you the clearest next step.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/quote"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-[0_10px_40px_var(--glow-blue)] transition-all hover:translate-y-[-1px]"
            >
              Request your free call
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
