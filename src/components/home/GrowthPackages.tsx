import { Link } from "@tanstack/react-router";
import { Check, ArrowRight, Sparkles } from "lucide-react";

type Pkg = {
  name: string;
  price: string;
  blurb: string;
  features: string[];
  featured?: boolean;
};

const packages: Pkg[] = [
  {
    name: "Starter Growth Package",
    price: "$500",
    blurb: "Everything you need to get online and start capturing leads.",
    features: ["5-page website", "Mobile friendly", "Contact form", "Hosting setup"],
  },
  {
    name: "Growth Package",
    price: "$997",
    blurb: "Get found on Google and turn more visitors into customers.",
    featured: true,
    features: [
      "Everything in Starter",
      "SEO setup",
      "Google Business optimization",
      "Lead capture forms",
    ],
  },
  {
    name: "Dominate Your Market",
    price: "$1,997",
    blurb: "The premium build engineered to own your local market.",
    features: [
      "Everything in Growth",
      "Premium design",
      "3D effects & animations",
      "AI chatbot",
      "Conversion optimization",
    ],
  },
];

export function GrowthPackages() {
  return (
    <section
      className="relative border-t border-border py-20 md:py-28"
      aria-labelledby="pricing-heading"
      id="pricing"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Growth Packages
          </span>
          <h2
            id="pricing-heading"
            className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Pick the package that grows your business.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Transparent, one-time pricing. No hidden fees, no long contracts — just a website built
            to bring you customers.
          </p>
        </div>

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <article
              key={pkg.name}
              className={`glass-card relative flex flex-col rounded-2xl p-8 transition-all hover:-translate-y-1 ${
                pkg.featured ? "ring-1 ring-primary/50 md:-mt-3 md:mb-3" : ""
              }`}
            >
              {pkg.featured && (
                <>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-[radial-gradient(circle_at_50%_0%,var(--glow-blue),transparent_60%)] blur-xl"
                  />
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground shadow-[0_0_20px_var(--glow-blue)]">
                    Most Popular
                  </span>
                </>
              )}
              <h3 className="text-lg font-semibold text-foreground">{pkg.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight text-foreground">
                  {pkg.price}
                </span>
                <span className="text-sm text-muted-foreground">one-time</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{pkg.blurb}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/90">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-primary" aria-hidden />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/strategy-call"
                aria-label={`Book a free website review for the ${pkg.name}`}
                className={`group mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  pkg.featured
                    ? "bg-primary text-primary-foreground shadow-[0_0_30px_var(--glow-blue)] hover:shadow-[0_0_40px_var(--glow-blue)]"
                    : "border border-border bg-secondary/40 text-foreground hover:bg-secondary"
                }`}
              >
                Book Free Review
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          Not sure which fits? Book a free website review and we'll recommend the right package for
          your goals.
        </p>
      </div>
    </section>
  );
}
