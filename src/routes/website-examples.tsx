import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/home/PageShell";
import { ArrowRight, ExternalLink } from "lucide-react";
import westlightsAsset from "@/assets/westlights.png.asset.json";
import truecanAsset from "@/assets/truecan.png.asset.json";
import truecantechAsset from "@/assets/truecantech.png.asset.json";
import caminoAsset from "@/assets/camino.png.asset.json";

export const Route = createFileRoute("/website-examples")({
  head: () => ({
    meta: [
      { title: "Website Examples | ClickAdMedia" },
      {
        name: "description",
        content:
          "A growing portfolio of revenue-generating websites built by ClickAdMedia for local service businesses.",
      },
      { property: "og:title", content: "Website Examples — ClickAdMedia" },
      {
        property: "og:description",
        content: "See how we build websites that turn clicks into customers.",
      },
      { property: "og:url", content: "/website-examples" },
    ],
    links: [{ rel: "canonical", href: "/website-examples" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Website Examples — ClickAdMedia",
          description:
            "A curated portfolio of revenue-generating websites built by ClickAdMedia for local service businesses.",
          url: "https://revenue-gen-engine.lovable.app/website-examples",
        }),
      },
    ],
  }),
  component: ExamplesPage,
});

const examples = [
  {
    name: "WestLights",
    url: "https://westlights.ca",
    industry: "Permanent Lighting — Calgary, AB",
    description:
      "Lead-capture-first website for a premium permanent roofline lighting company. High-converting hero with above-the-fold authorized dealer form, social proof gallery, trust badges, and clear how-it-works flow.",
    image: westlightsAsset.url,
  },
  {
    name: "TrueCan Power Systems",
    url: "https://truecanpower.com",
    industry: "Electrical Contractor — Calgary, AB",
    description:
      "Conversion-optimized site for a licensed ESA-certified electrical contractor. Bold trust-driven hero with instant consultation form, dual emergency CTAs, featured services grid, reliability proof points, and FAQ to overcome objections before the call.",
    image: truecanAsset.url,
  },
  {
    name: "TrueCan Tech",
    url: "https://truecantech.com",
    industry: "Industrial Automation & Controls",
    description:
      "B2B authority site for an industrial automation and control systems firm. Outcome-focused messaging (protect assets, increase production, decrease OPEX), industries-served grid, proof-driven performance stats, and a structured request-a-technical-review form for high-intent leads.",
    image: truecantechAsset.url,
  },
  {
    name: "Camino Chemicals",
    url: "https://caminochemicals.com",
    industry: "Industrial Chemicals — Canada",
    description:
      "Conversion-optimized site for a Canadian manufacturer of industrial detergents and specialty chemicals. Bold benefit-led hero, trust badges, featured product grid, industries-served section, and dual quote/SDS CTAs that match how B2B buyers actually shop.",
    image: caminoAsset.url,
  },
];

function ExamplesPage() {
  return (
    <PageShell>
      <section className="relative pt-36 pb-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Portfolio
          </span>
          <h1 className="mt-3 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            Revenue Engines that <span className="text-gradient-brand">convert.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Real builds for real contractors and operators. Every site ships wired to a CRM and
            automated follow-up — not a brochure, a 24/7 salesperson.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10">
            {examples.map((ex) => (
              <article
                key={ex.name}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
              >
                <div className="grid gap-0 md:grid-cols-2">
                  <a
                    href={ex.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block max-h-[600px] overflow-hidden border-b border-border md:border-b-0 md:border-r"
                    aria-label={`Visit ${ex.name} website`}
                  >
                    <img
                      src={ex.image}
                      alt={`${ex.name} website screenshot`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </a>
                  <div className="flex flex-col justify-center p-8 sm:p-10">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      {ex.industry}
                    </span>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                      {ex.name}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                      {ex.description}
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <a
                        href={ex.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_30px_var(--glow-blue)]"
                      >
                        Visit Site
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <Link
                        to="/apply"
                        className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-secondary/40 px-6 text-sm font-semibold text-foreground hover:bg-secondary"
                      >
                        Get an Engine like this
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
            <Link
              to="/apply"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_var(--glow-blue)] transition-all hover:translate-y-[-1px]"
            >
              Apply for the Pilot Program
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/free-audit"
              className="inline-flex h-14 items-center justify-center rounded-full border border-border bg-secondary/40 px-7 text-sm font-semibold text-foreground hover:bg-secondary"
            >
              Get a Free Ghost Town Audit
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
