const before = ["Outdated website", "Low trust", "Confusing message", "Few leads", "Weak CTA"];
const after = [
  "Modern premium design",
  "Crystal-clear offer",
  "Built-in lead generation",
  "Stronger trust signals",
  "Steady stream of appointments",
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
            Before &amp; After.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-border bg-secondary/30 p-8">
            <header className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Before
              </span>
              <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                Status quo
              </span>
            </header>
            <h3 className="mt-4 text-2xl font-semibold text-muted-foreground">
              A site that exists, not one that earns.
            </h3>
            <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
              {before.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
                  {b}
                </li>
              ))}
            </ul>
          </article>

          <article className="glass-card relative rounded-2xl p-8 ring-1 ring-primary/30">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-[radial-gradient(circle_at_70%_0%,var(--glow-blue),transparent_60%)] blur-xl"
            />
            <header className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                After
              </span>
              <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs text-primary ring-1 ring-primary/30">
                ClickAdMedia build
              </span>
            </header>
            <h3 className="mt-4 text-2xl font-semibold text-foreground">
              A revenue system that compounds.
            </h3>
            <ul className="mt-6 space-y-2.5 text-sm text-foreground">
              {after.map((a) => (
                <li key={a} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_var(--glow-blue)]" />
                  {a}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
