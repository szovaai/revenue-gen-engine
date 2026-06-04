import { ArrowRight, MousePointerClick, LayoutTemplate, Inbox, DollarSign } from "lucide-react";

const steps = [
  {
    title: "Traffic",
    icon: MousePointerClick,
    body: "Google Ads, Facebook Ads, SEO, and referrals drive qualified visitors.",
  },
  {
    title: "Conversion Website",
    icon: LayoutTemplate,
    body: "Headline, offer, trust, proof, and a single clear call to action.",
  },
  {
    title: "Lead Capture",
    icon: Inbox,
    body: "Forms, calls, bookings, and messenger — every visitor has a path.",
  },
  {
    title: "Revenue",
    icon: DollarSign,
    body: "More jobs, more clients, predictable monthly growth.",
  },
];

export function Framework() {
  return (
    <section
      className="relative border-t border-border py-20 md:py-28"
      aria-labelledby="framework-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Our Method
          </span>
          <h2
            id="framework-heading"
            className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            The Revenue Website Framework™
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A repeatable four-step system that turns clicks into customers.
          </p>
        </div>

        <ol className="mt-16 grid gap-4 md:grid-cols-4 md:gap-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.title} className="relative">
                <div className="glass-card group h-full rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-primary/50">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/30 transition-shadow group-hover:shadow-[0_0_24px_var(--glow-blue)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight
                    aria-hidden
                    className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-primary md:block"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
