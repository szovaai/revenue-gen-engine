import type { CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, PlayCircle, ChevronDown } from "lucide-react";

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
      {/* Ambient drifting glows */}
      <div
        aria-hidden
        className="animate-float-slow pointer-events-none absolute -left-24 top-10 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,var(--glow-blue),transparent_65%)] blur-3xl"
      />
      <div
        aria-hidden
        className="animate-float-slower pointer-events-none absolute -right-24 top-32 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,var(--glow-purple),transparent_65%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <span
          className="animate-rise inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
          style={{ "--rise-delay": "0ms" } as CSSProperties}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Premium Websites for Local Businesses
        </span>
        <h1
          id="hero-heading"
          className="animate-rise mt-5 text-[clamp(2.25rem,6vw,5rem)] font-extrabold leading-[1.04] tracking-tight text-foreground"
          style={{ "--rise-delay": "90ms" } as CSSProperties}
        >
          Get More Calls, More Leads &amp; More Customers For Your{" "}
          <span className="text-gradient-animated">Local Business</span>
        </h1>
        <p
          className="animate-rise mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          style={{ "--rise-delay": "180ms" } as CSSProperties}
        >
          We build professional websites in days, not months. Starting at just{" "}
          <span className="font-semibold text-foreground">$500</span> with no hidden fees.
        </p>
        <div
          className="animate-rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ "--rise-delay": "270ms" } as CSSProperties}
        >
          <Link
            to="/strategy-call"
            aria-label="Book your free website review"
            className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground shadow-[0_10px_40px_var(--glow-blue)] transition-all hover:translate-y-[-2px] hover:shadow-[0_18px_60px_var(--glow-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Book Free Website Review
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/website-examples"
            aria-label="See live website examples"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-border bg-secondary/40 px-7 text-base font-semibold text-foreground backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <PlayCircle className="h-4 w-4" />
            See Live Examples
          </Link>
        </div>
      </div>

      {/* Cinematic hero video */}
      <div
        className="animate-rise mt-14 sm:mt-16"
        style={{ "--rise-delay": "360ms" } as CSSProperties}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="group relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 bg-[radial-gradient(ellipse_60%_60%_at_50%_40%,var(--glow-blue),transparent_70%)] blur-3xl"
            />
            <video
              className="animate-video-bob w-full rounded-2xl border border-border shadow-[0_30px_90px_rgba(0,0,0,0.55)] ring-1 ring-primary/20 transition-shadow duration-500 group-hover:shadow-[0_40px_120px_var(--glow-blue)]"
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

      {/* Scroll cue */}
      <div
        aria-hidden
        className="animate-rise mt-12 flex justify-center"
        style={{ "--rise-delay": "520ms" } as CSSProperties}
      >
        <ChevronDown className="animate-cue h-6 w-6 text-primary" />
      </div>
    </section>
  );
}
