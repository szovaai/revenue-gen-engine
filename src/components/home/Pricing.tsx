import { Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";

const coreFeatures = [
  "Professional contractor lead-gen website",
  "Mobile-first homepage built to convert",
  "Phone and form CTA above the fold",
  "Service-area focused structure",
  "Trust sections for reviews, licenses, badges, and before/after work",
  "Contact form connected for lead capture",
  "CRM-ready lead routing",
  "Instant SMS/email follow-up automation setup",
  "Basic local SEO foundation",
  "Ad-ready landing page structure",
  "Hosting/tech handoff guidance",
  "Built for contractors who want leads, not just a pretty website",
];

const growthFeatures = [
  "Google Ads or Meta Ads management",
  "Monthly optimization",
  "Lead tracking",
  "Reporting",
  "Landing page improvements",
  "Follow-up sequence tuning",
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
            $500 One-Time Setup
          </span>
          <h2
            id="pricing-heading"
            className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Own your Revenue Engine setup without a huge agency bill.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            One transparent, one-time fee. Built to capture leads, follow up fast, and look more
            professional online.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <article className="glass-card relative flex flex-col rounded-2xl p-8 ring-1 ring-primary/50 transition-all hover:-translate-y-1">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-[radial-gradient(circle_at_50%_0%,var(--glow-blue),transparent_60%)] blur-xl"
            />
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground shadow-[0_0_20px_var(--glow-blue)]">
              Main Offer
            </span>
            <h3 className="text-xl font-semibold text-foreground">Revenue Engine Setup</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The done-for-you build that turns your site into a lead-capturing, follow-up
              machine.
            </p>
            <div className="mt-6 flex items-baseline gap-1.5">
              <span className="text-5xl font-bold tracking-tight text-foreground">$500</span>
              <span className="text-sm text-muted-foreground">one-time</span>
            </div>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary">
              $500 One-Time Setup
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {coreFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/90">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-primary" aria-hidden />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/apply"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_var(--glow-blue)] transition-all hover:shadow-[0_0_40px_var(--glow-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Apply for the $500 Setup
            </Link>
          </article>

          <article className="glass-card relative flex flex-col rounded-2xl p-8 transition-all hover:-translate-y-1">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-border bg-secondary px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground">
              Optional Add-On
            </span>
            <h3 className="text-xl font-semibold text-foreground">Growth Add-On</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Once your engine is live, add managed traffic and ongoing optimization to scale.
            </p>
            <div className="mt-6 flex items-baseline gap-1.5">
              <span className="text-5xl font-bold tracking-tight text-foreground">Custom</span>
              <span className="text-sm text-muted-foreground">monthly pricing</span>
            </div>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Available after setup
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {growthFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/90">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-primary" aria-hidden />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/apply"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full border border-border bg-secondary/40 px-6 text-sm font-semibold text-foreground transition-all hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Ask About Growth
            </Link>
          </article>
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          One-time $500 setup. No long contracts. Optional monthly growth support if and when
          you want to scale.
        </p>
      </div>
    </section>
  );
}
