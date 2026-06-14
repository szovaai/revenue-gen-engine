import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/home/PageShell";
import { AscentExperience } from "@/components/home/AscentExperience";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Calgary Web Design for Trades | ClickAdMedia",
      },
      {
        name: "description",
        content:
          "Calgary web design for contractors and trades. Get found, look credible, and turn more clicks into calls with a lead-generation website.",
      },
      {
        property: "og:title",
        content: "Calgary Web Design for Trades | ClickAdMedia",
      },
      {
        property: "og:description",
        content:
          "Lead-generation websites for Calgary contractors and trades, built to turn local searches into calls and booked jobs.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "ClickAdMedia",
          description:
            "Calgary web design and lead-generation websites for contractors and trades businesses.",
          areaServed: ["Calgary", "Alberta"],
          serviceType: "Website Design and Lead Generation for Trades",
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <PageShell>
      <AscentExperience />
    </PageShell>
  );
}
