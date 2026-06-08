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
      { title: "Revenue Engine for Contractors — $500 One-Time Setup | ClickAdMedia" },
      {
        name: "description",
        content:
          "ClickAdMedia builds contractors a done-for-you lead-gen website plus instant follow-up automation for a one-time $500 setup. No huge agency bill.",
      },
      {
        property: "og:title",
        content: "Revenue Engine for Contractors — $500 One-Time Setup | ClickAdMedia",
      },
      {
        property: "og:description",
        content:
          "Lead-gen website plus automated follow-up, built for a one-time $500 setup. Apply today.",
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
            "Done-for-you lead-gen website plus automated follow-up system for contractors. One-time $500 setup.",
          areaServed: "United States, Canada",
          serviceType: "Lead Generation Website & Follow-Up Setup for Contractors",
          offers: [
            {
              "@type": "Offer",
              name: "Revenue Engine Setup",
              price: "500",
              priceCurrency: "USD",
              description:
                "One-time done-for-you lead-gen website plus instant SMS/email follow-up automation setup.",
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
