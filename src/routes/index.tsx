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
      { title: "Revenue Engine for Contractors — $0 Setup | ClickAdMedia" },
      {
        name: "description",
        content:
          "ClickAdMedia builds a 24/7 Revenue Engine for contractors — lead-gen website + automated GHL CRM. $0 setup, $199/mo. You only pay to scale.",
      },
      {
        property: "og:title",
        content: "Revenue Engine for Contractors — $0 Setup | ClickAdMedia",
      },
      {
        property: "og:description",
        content: "Lead-gen website + automated CRM follow-up. $0 down. Apply for the Pilot Program.",
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
            "Revenue-as-a-Service for contractors: lead-gen website plus automated GHL CRM. $0 setup, monthly subscription.",
          areaServed: "United States, Canada",
          serviceType: "Lead Generation & CRM Automation for Contractors",
          offers: [
            {
              "@type": "Offer",
              name: "Core Engine",
              price: "199",
              priceCurrency: "USD",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "199",
                priceCurrency: "USD",
                billingIncrement: 1,
                unitText: "MONTH",
              },
            },
            {
              "@type": "Offer",
              name: "Growth Engine",
              price: "499",
              priceCurrency: "USD",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "499",
                priceCurrency: "USD",
                billingIncrement: 1,
                unitText: "MONTH",
              },
            },
          ],
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
