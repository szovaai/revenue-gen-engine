import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/home/PageShell";
import { Hero } from "@/components/home/Hero";
import { WhyWebsitesFail } from "@/components/home/WhyWebsitesFail";
import { Framework } from "@/components/home/Framework";
import { Pricing } from "@/components/home/Pricing";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { Industries } from "@/components/home/Industries";
import { Checklist } from "@/components/home/Checklist";
import { Founder } from "@/components/home/Founder";
import { FAQ } from "@/components/home/FAQ";
import { AuditForm } from "@/components/home/AuditForm";
import { FooterCTA } from "@/components/home/FooterCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Revenue Engine for Contractors — Custom Quote | ClickAdMedia" },
      {
        name: "description",
        content:
          "ClickAdMedia builds contractors a done-for-you lead-gen website plus instant follow-up automation. Request a custom quote tailored to your trade.",
      },
      {
        property: "og:title",
        content: "Revenue Engine for Contractors — Custom Quote | ClickAdMedia",
      },
      {
        property: "og:description",
        content:
          "Lead-gen website plus automated follow-up, quoted per project. Request a free quote today.",
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
            "Done-for-you lead-gen website plus automated follow-up system for contractors. Quoted per project.",
          areaServed: "United States, Canada",
          serviceType: "Lead Generation Website & Follow-Up Setup for Contractors",
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
      <Pricing />
      <BeforeAfter />
      <Industries />
      <Checklist />
      <Founder />
      <FAQ />
      <AuditForm />
      <FooterCTA />
    </PageShell>
  );
}
