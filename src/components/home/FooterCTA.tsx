import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function FooterCTA() {
  return (
    <section className="relative border-t border-border py-20 md:py-28" aria-labelledby="cta-heading">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,var(--glow-blue),transparent_70%)] blur-3xl"
      />
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2
          id="cta-heading"
          className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
        >
          Ready to install your{" "}
          <span className="text-gradient-brand">Revenue Engine?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          For a one-time $500 setup, we'll build the core system your contracting business needs
          to capture leads, follow up faster, and look more professional online.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/apply"
            className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-[0_10px_40px_var(--glow-blue)] transition-all hover:translate-y-[-1px] hover:shadow-[0_14px_50px_var(--glow-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Apply for the $500 Setup
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/free-audit"
            className="inline-flex h-14 items-center justify-center rounded-full border border-border bg-secondary/40 px-8 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Get a Free Revenue Audit
          </Link>
        </div>
      </div>
    </section>
  );
}
