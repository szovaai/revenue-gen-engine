import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/home/PageShell";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/website-examples")({
  head: () => ({
    meta: [
      { title: "Website Examples | ClickAdMedia" },
      {
        name: "description",
        content:
          "A growing portfolio of revenue-generating websites built by ClickAdMedia for local service businesses.",
      },
      { property: "og:title", content: "Website Examples — ClickAdMedia" },
      {
        property: "og:description",
        content: "See how we build websites that turn clicks into customers.",
      },
      { property: "og:url", content: "/website-examples" },
    ],
    links: [{ rel: "canonical", href: "/website-examples" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Website Examples — ClickAdMedia",
          description:
            "A curated portfolio of revenue-generating websites built by ClickAdMedia for local service businesses.",
          url: "https://revenue-gen-engine.lovable.app/website-examples",
        }),
      },
    ],
  }),
  component: ExamplesPage,
});

function ExamplesPage() {
  return (
    <PageShell>
      <section className="relative pt-36 pb-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Portfolio
          </span>
          <h1 className="mt-3 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            Website examples — <span className="text-gradient-brand">launching soon.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            We're curating a fresh set of case studies and live builds. In the meantime, book a
            call and we'll walk you through recent client results in detail.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/strategy-call"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_var(--glow-blue)] transition-all hover:translate-y-[-1px]"
            >
              Book A Strategy Call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/free-audit"
              className="inline-flex h-14 items-center justify-center rounded-full border border-border bg-secondary/40 px-7 text-sm font-semibold text-foreground hover:bg-secondary"
            >
              Get a Free Audit
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
