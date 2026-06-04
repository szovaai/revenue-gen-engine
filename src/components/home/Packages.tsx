import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

const packages = [
  {
    name: "Essential",
    price: "$997",
    suffix: "starting",
    tagline: "For businesses needing a professional online presence.",
    features: [
      "Website foundation",
      "Mobile responsive design",
      "Core pages",
      "Basic contact form",
      "Launch support",
    ],
    featured: false,
  },
  {
    name: "Growth",
    price: "$2,497",
    suffix: "starting",
    tagline: "Designed to generate leads consistently.",
    features: [
      "Conversion-focused website",
      "Direct-response homepage",
      "Lead capture forms",
      "SEO foundation",
      "Tracking setup",
      "Trust-building sections",
    ],
    featured: true,
  },
  {
    name: "Authority",
    price: "$4,997+",
    suffix: "starting",
    tagline: "Full direct-response website system.",
    features: [
      "Everything in Growth",
      "Direct-response copywriting",
      "Lead funnel build",
      "CRM integration",
      "Conversion tracking",
      "Advanced trust & proof sections",
    ],
    featured: false,
  },
];

export function Packages() {
  return (
    <section
      className="relative border-t border-border py-20 md:py-28"
      aria-labelledby="packages-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Packages
          </span>
          <h2
            id="packages-heading"
            className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Built for every stage of growth.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Pick the package that matches where you are — upgrade as you scale.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {packages.map((p) => (
            <article
              key={p.name}
              className={`glass-card relative flex flex-col rounded-2xl p-8 transition-all hover:-translate-y-1 ${
                p.featured ? "ring-1 ring-primary/50" : ""
              }`}
            >
              {p.featured && (
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
              <h3 className="text-xl font-semibold text-foreground">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight text-foreground">{p.price}</span>
                <span className="text-sm text-muted-foreground">{p.suffix}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/90">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-primary" aria-hidden />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/strategy-call"
                className={`mt-8 inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  p.featured
                    ? "bg-primary text-primary-foreground shadow-[0_0_30px_var(--glow-blue)] hover:shadow-[0_0_40px_var(--glow-blue)]"
                    : "border border-border bg-secondary/40 text-foreground hover:bg-secondary"
                }`}
              >
                Get Started
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
