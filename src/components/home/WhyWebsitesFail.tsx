import { Check, X } from "lucide-react";

const failures = [
  "Pretty but don't convert",
  "No direct-response copy",
  "No lead capture strategy",
  "Slow load speeds",
  "No follow-up system",
  "No clear offer",
];

const wins = [
  "Built around conversion psychology",
  "Direct-response copywriting",
  "Mobile-first design",
  "Lightning-fast loading",
  "Lead capture systems built in",
  "Optimized for SEO",
  "Built for paid advertising",
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
            Why most business websites fail.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Most agencies design websites to look pretty. We engineer them to generate revenue.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="glass-card relative rounded-2xl p-8">
            <header className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/15 text-destructive ring-1 ring-destructive/30">
                <X className="h-5 w-5" />
              </span>
              <h3 className="text-xl font-semibold text-foreground">Typical Websites</h3>
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
              <h3 className="text-xl font-semibold text-foreground">The ClickAdMedia Difference</h3>
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
