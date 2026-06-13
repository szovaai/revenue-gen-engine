import { ShieldCheck } from "lucide-react";

export function Guarantee() {
  return (
    <section
      className="relative border-t border-border py-20 md:py-28"
      aria-labelledby="guarantee-heading"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="glass-card relative overflow-hidden rounded-3xl p-8 text-center sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,var(--glow-blue),transparent_60%)] blur-2xl"
          />
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30 shadow-[0_0_40px_var(--glow-blue)]">
            <ShieldCheck className="h-8 w-8" />
          </span>
          <h2
            id="guarantee-heading"
            className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            The Launch Guarantee
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            If we don't deliver your website as promised, you don't pay. Simple as that — all the
            risk is on us, not you.
          </p>
        </div>
      </div>
    </section>
  );
}
