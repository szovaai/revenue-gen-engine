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
      <div className="pt-20">
        <AuditForm />
      </div>
    </PageShell>
  );
}
