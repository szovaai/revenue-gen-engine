import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/home/PageShell";
import { AuditForm } from "@/components/home/AuditForm";

export const Route = createFileRoute("/free-audit")({
  head: () => ({
    meta: [
      { title: "Free Digital Ghost Town Audit | ClickAdMedia" },
      {
        name: "description",
        content:
          "Find out why your contractor website is a digital ghost town. Free audit reveals the leaks and the fastest fixes to turn it into a Revenue Engine.",
      },
      { property: "og:title", content: "Free Digital Ghost Town Audit — ClickAdMedia" },
      {
        property: "og:description",
        content: "See where your site is leaking leads — and how to turn it into a Revenue Engine.",
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
            Free Digital Ghost Town Audit
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Drop your URL and we'll show you where your site is silently losing leads — and the
            fastest wins to turn it into a 24/7 Revenue Engine.
          </p>
        </div>
      </div>
      <AuditForm />
    </PageShell>
  );
}
