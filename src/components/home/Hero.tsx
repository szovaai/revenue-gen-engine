import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, PlayCircle } from "lucide-react";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 md:pt-40 md:pb-20"
      aria-labelledby="hero-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Premium Websites for Local Businesses
        </span>
        <h1
          id="hero-heading"
          className="mt-5 text-[clamp(2.25rem,6vw,5rem)] font-extrabold leading-[1.04] tracking-tight text-foreground"
        >
          Get More Calls, More Leads &amp; More Customers For Your{" "}
          <span className="text-gradient-brand">Local Business</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          We build professional websites in days, not months. Starting at just{" "}
          <span className="font-semibold text-foreground">$500</span> with no hidden fees.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/strategy-call"
            aria-label="Book your free website review"
            className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground shadow-[0_10px_40px_var(--glow-blue)] transition-all hover:translate-y-[-1px] hover:shadow-[0_14px_50px_var(--glow-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Book Free Website Review
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/website-examples"
            aria-label="See live website examples"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-border bg-secondary/40 px-7 text-base font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <PlayCircle className="h-4 w-4" />
            See Live Examples
          </Link>
        </div>
      </div>

      {/* Cinematic hero video */}
      <div className="mt-14 sm:mt-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 bg-[radial-gradient(ellipse_60%_60%_at_50%_40%,var(--glow-blue),transparent_70%)] blur-3xl"
            />
            <video
              className="w-full rounded-2xl border border-border shadow-[0_30px_90px_rgba(0,0,0,0.55)] ring-1 ring-primary/20"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Showcase of local business websites we build"
            >
              <source src="/hero-websites.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
