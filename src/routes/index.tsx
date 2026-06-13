import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/home/PageShell";
import { Hero } from "@/components/home/Hero";
import { SocialProofStrip } from "@/components/home/SocialProofStrip";
import { Framework } from "@/components/home/Framework";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { IndustrySelector } from "@/components/home/IndustrySelector";
import { GrowthPackages } from "@/components/home/GrowthPackages";
import { ROICalculator } from "@/components/home/ROICalculator";
import { Guarantee } from "@/components/home/Guarantee";
import { Founder } from "@/components/home/Founder";
import { FAQ } from "@/components/home/FAQ";
import { FooterCTA } from "@/components/home/FooterCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Websites That Get Local Businesses More Customers | ClickAdMedia",
      },
      {
        name: "description",
        content:
          "Professional local business websites built in days, not months — starting at $500 with no hidden fees. More calls, more leads, more customers. Book a free website review.",
      },
      {
        property: "og:title",
        content: "Websites That Get Local Businesses More Customers | ClickAdMedia",
      },
      {
        property: "og:description",
        content:
          "Professional websites built in days from $500. More calls, leads, and customers for your local business. Book a free website review.",
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
            "Professional website design for local businesses, built in days. Lead-gen websites starting at $500 with no hidden fees.",
          areaServed: "United States, Canada",
          serviceType: "Website Design & Lead Generation for Local Businesses",
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price: "500",
            description: "Starter Growth Package — professional 5-page lead-gen website.",
          },
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <PageShell>
      <Hero />
      <SocialProofStrip />
      <Framework />
      <BeforeAfter />
      <IndustrySelector />
      <GrowthPackages />
      <ROICalculator />
      <Guarantee />
      <Founder />
      <FAQ />
      <FooterCTA />
    </PageShell>
  );
}
