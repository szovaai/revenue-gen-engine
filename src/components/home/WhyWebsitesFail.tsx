import { Check, X } from "lucide-react";

const failures = [
  "Looks like a brochure, sells like a ghost",
  "Visitors leave without leaving a name",
  "Zero follow-up when a lead does come in",
  "No SMS, no CRM, no automation",
  "Slow on mobile, invisible on Google",
  "Built and forgotten — never optimized",
];

const wins = [
  "Direct-response site built to convert clicks",
  "Auto SMS + email follow-up within seconds",
  "GHL CRM tracks every lead end-to-end",
  "Lead routed to your phone in real time",
  "Sub-2s mobile load, optimized for ads",
  "Continuously tuned for more booked jobs",
];

export function WhyWebsitesFail() {
  return (
    <section
      className="relative border-t border-border py-20 md:py-28"
      aria-labelledby="why-fail-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            The Difference
          </span>
          <h2
            id="why-fail-heading"
            className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Most contractor sites are a digital ghost town.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Your website exists, but it doesn't do anything. We turn it into a 24/7 salesperson
            that books jobs while you're on the truck.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="glass-card relative rounded-2xl p-8">
            <header className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/15 text-destructive ring-1 ring-destructive/30">
                <X className="h-5 w-5" />
              </span>
              <h3 className="text-xl font-semibold text-foreground">Digital Ghost Town</h3>
            </header>
            <ul className="space-y-3.5">
              {failures.map((f) => (
                <li key={f} className="flex items-start gap-3 text-base text-muted-foreground">
                  <X className="mt-0.5 h-5 w-5 flex-none text-destructive" aria-hidden />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card relative rounded-2xl p-8 ring-1 ring-primary/30">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-[radial-gradient(circle_at_30%_0%,var(--glow-blue),transparent_60%)] blur-xl"
            />
            <header className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
                <Check className="h-5 w-5" />
              </span>
              <h3 className="text-xl font-semibold text-foreground">Your Revenue Engine</h3>
            </header>
            <ul className="space-y-3.5">
              {wins.map((w) => (
                <li key={w} className="flex items-start gap-3 text-base text-foreground">
                  <Check className="mt-0.5 h-5 w-5 flex-none text-primary" aria-hidden />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
