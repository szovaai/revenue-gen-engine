import { createFileRoute } from "@tanstack/react-router";
import { Ascent } from "@/components/ascent/Ascent";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Lead-Generation Websites for Calgary Trades | ClickAdMedia",
      },
      {
        name: "description",
        content:
          "ClickAdMedia builds convert-first, locally-optimized websites for Calgary contractors — engineered to rank, convert, and book jobs. Quoted per project. Book a discovery call.",
      },
      {
        property: "og:title",
        content: "Lead-Generation Websites for Calgary Trades | ClickAdMedia",
      },
      {
        property: "og:description",
        content:
          "Convert-first websites for Calgary contractors — built to rank, convert, and book jobs. Quoted per project, done-for-you. Book a discovery call.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "ClickAdMedia",
          description:
            "Convert-first, locally-optimized lead-generation websites for Calgary trades and contractors. Done-for-you and quoted per project.",
          areaServed: "Calgary, Alberta, Canada",
          serviceType: "Website Design & Local SEO for Trades",
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return <Ascent />;
}
