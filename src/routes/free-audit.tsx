import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/home/PageShell";
import { AuditForm } from "@/components/home/AuditForm";

export const Route = createFileRoute("/free-audit")({
  head: () => ({
    meta: [
      { title: "Free Website Conversion Audit | ClickAdMedia" },
      {
        name: "description",
        content:
          "Request a free website conversion audit. We'll show you what's costing you leads and the fastest wins for more conversions.",
      },
      { property: "og:title", content: "Free Website Conversion Audit" },
      {
        property: "og:description",
        content: "Discover what's costing you leads — and how to fix it.",
      },
      { property: "og:url", content: "/free-audit" },
    ],
    links: [{ rel: "canonical", href: "/free-audit" }],
  }),
  component: AuditPage,
});

function AuditPage() {
  return (
    <PageShell>
      <div className="pt-28 pb-4">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Free Audit
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Free Website Conversion Audit
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Tell us about your site and we'll show you what's costing you leads — and the fastest wins to fix it.
          </p>
        </div>
      </div>
      <AuditForm />
    </PageShell>
  );
}
