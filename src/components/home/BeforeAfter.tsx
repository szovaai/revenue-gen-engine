import { X, Check, ArrowDown, ArrowRight } from "lucide-react";

const before = [
  "No website — or an outdated one",
  "Facebook page only",
  "No way to capture leads",
  "Invisible on Google",
  "Losing jobs to competitors",
];

const after = [
  "Professional website that builds trust",
  "Contact forms that capture every lead",
  "Mobile optimized for on-the-go customers",
  "Google indexed and easy to find",
  "Call tracking so you know what works",
];

export function BeforeAfter() {
  return (
    <section
      className="relative border-t border-border py-20 md:py-28"
      aria-labelledby="before-after-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            The Transformation
          </span>
          <h2
            id="before-after-heading"
            className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            From invisible to in-demand.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Here's what changes when your business gets a real online presence.
          </p>
        </div>

        <div className="mt-14 grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
          {/* Before */}
          <article className="rounded-2xl border border-border bg-secondary/30 p-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Business Before
            </span>
            <ul className="mt-5 space-y-3.5">
              {before.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-muted-foreground">
                  <X className="mt-0.5 h-5 w-5 flex-none text-destructive" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* Arrow */}
          <div className="flex justify-center" aria-hidden>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/30">
              <ArrowRight className="hidden h-5 w-5 lg:block" />
              <ArrowDown className="h-5 w-5 lg:hidden" />
            </span>
          </div>

          {/* After */}
          <article className="glass-card relative rounded-2xl p-8 ring-1 ring-primary/30">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-[radial-gradient(circle_at_70%_0%,var(--glow-blue),transparent_60%)] blur-xl"
            />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Business After
            </span>
            <ul className="mt-5 space-y-3.5">
              {after.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-foreground">
                  <Check className="mt-0.5 h-5 w-5 flex-none text-primary" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
