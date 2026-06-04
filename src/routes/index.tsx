import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/home/PageShell";
import { Hero } from "@/components/home/Hero";
import { WhyWebsitesFail } from "@/components/home/WhyWebsitesFail";
import { Framework } from "@/components/home/Framework";
import { Packages } from "@/components/home/Packages";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { Industries } from "@/components/home/Industries";
import { Checklist } from "@/components/home/Checklist";
import { Founder } from "@/components/home/Founder";
import { AuditForm } from "@/components/home/AuditForm";
import { FooterCTA } from "@/components/home/FooterCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Websites That Turn Clicks Into Customers | ClickAdMedia" },
      {
        name: "description",
        content:
          "ClickAdMedia builds premium direct-response websites designed to generate more leads, calls, appointments, and customers for local businesses.",
      },
      {
        property: "og:title",
        content: "Websites That Turn Clicks Into Customers — ClickAdMedia",
      },
      {
        property: "og:description",
        content: "Premium direct-response websites built for local business growth.",
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
            "Direct-response website design and lead generation for local service businesses.",
          areaServed: "United States",
          serviceType: "Web Design & Lead Generation",
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
      <WhyWebsitesFail />
      <Framework />
      <Packages />
      <BeforeAfter />
      <Industries />
      <Checklist />
      <Founder />
      <AuditForm />
      <FooterCTA />
    </PageShell>
  );
}
