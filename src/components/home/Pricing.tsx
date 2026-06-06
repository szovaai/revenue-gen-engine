import { Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";

const tiers = [
  {
    name: "Core Engine",
    price: "$199",
    cadence: "/mo",
    tagline: "Your 24/7 digital salesperson. Built, hosted, and automated.",
    features: [
      "Professional lead-gen website",
      "Hosting, SSL & ongoing updates",
      "GHL CRM included",
      "Auto SMS & email follow-up on every lead",
      "Lead routed to your phone instantly",
      "Mobile-first, sub-2s load times",
    ],
    cta: "Apply for the Pilot Program",
    featured: true,
  },
  {
    name: "Growth Engine",
    price: "$499",
    cadence: "/mo + ad spend",
    tagline: "Everything in Core, plus managed traffic pushing leads into the CRM.",
    features: [
      "Everything in Core Engine",
      "Managed Google & Meta ad campaigns",
      "Geo-targeted to your service area",
      "Lead scoring & routing in GHL",
      "Monthly performance reporting",
      "Conversion optimization built in",
    ],
    cta: "Apply for the Pilot Program",
    featured: false,
  },
];

export function Pricing() {
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
            $0 Setup Fee
          </span>
          <h2
            id="pricing-heading"
            className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Lease a Revenue Engine. Not a website project.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No $5k upfront. No 6-week build. Pick a tier, get plugged in, and only pay to scale.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {tiers.map((t) => (
            <article
              key={t.name}
              className={`glass-card relative flex flex-col rounded-2xl p-8 transition-all hover:-translate-y-1 ${
                t.featured ? "ring-1 ring-primary/50" : ""
              }`}
            >
              {t.featured && (
                <>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-[radial-gradient(circle_at_50%_0%,var(--glow-blue),transparent_60%)] blur-xl"
                  />
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground shadow-[0_0_20px_var(--glow-blue)]">
                    Start Here
                  </span>
                </>
              )}
              <h3 className="text-xl font-semibold text-foreground">{t.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.tagline}</p>
              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="text-5xl font-bold tracking-tight text-foreground">{t.price}</span>
                <span className="text-sm text-muted-foreground">{t.cadence}</span>
              </div>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary">
                $0 Setup
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/90">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-primary" aria-hidden />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/apply"
                className={`mt-8 inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  t.featured
                    ? "bg-primary text-primary-foreground shadow-[0_0_30px_var(--glow-blue)] hover:shadow-[0_0_40px_var(--glow-blue)]"
                    : "border border-border bg-secondary/40 text-foreground hover:bg-secondary"
                }`}
              >
                {t.cta}
              </Link>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          Cancel anytime. We win when you win — that's why setup is on us.
        </p>
      </div>
    </section>
  );
}
