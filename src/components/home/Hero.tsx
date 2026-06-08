import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone, Calendar, TrendingUp, Globe, Users, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, durationMs = 1400, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, start]);
  return value;
}

type Step = {
  label: string;
  icon: typeof Globe;
  value: number;
  suffix: string;
  custom?: string;
};

const steps: Step[] = [
  { label: "Traffic", icon: Globe, value: 1284, suffix: " visits" },
  { label: "Leads", icon: Users, value: 87, suffix: " inquiries" },
  { label: "Auto Follow-up", icon: Phone, value: 42, suffix: " SMS sent" },
  { label: "Booked Jobs", icon: Calendar, value: 19, suffix: " jobs" },
  { label: "Revenue", icon: TrendingUp, value: 0, suffix: "", custom: "↗ Growth" },
];

function FunnelMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setStarted(true)),
      { threshold: 0.3 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative">
      <div className="absolute -inset-8 -z-10 rounded-3xl bg-[radial-gradient(circle_at_50%_30%,var(--glow-blue),transparent_60%)] blur-2xl" />
      <div className="glass-card relative rounded-2xl p-6 shadow-[var(--shadow-card)]">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-muted-foreground">Revenue Engine · Live</span>
        </div>
        <ul className="space-y-3">
          {steps.map((step, i) => (
            <FunnelStep key={step.label} step={step} index={i} started={started} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function FunnelStep({
  step,
  index,
  started,
}: {
  step: Step;
  index: number;
  started: boolean;
}) {
  const Icon = step.icon;
  const value = useCountUp(step.value, 1400 + index * 150, started);
  return (
    <li>
      <div className="group flex items-center justify-between rounded-xl border border-border bg-background/40 px-4 py-3 transition-all hover:border-primary/50 hover:bg-background/60">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/30">
            <Icon className="h-4 w-4" />
          </span>
          <span className="text-sm font-medium text-foreground">{step.label}</span>
        </div>
        <span className="font-mono text-sm font-semibold text-foreground tabular-nums">
          {step.custom ? (
            <span className="text-accent">{step.custom}</span>
          ) : (
            <>
              {value.toLocaleString()}
              <span className="text-muted-foreground">{step.suffix}</span>
            </>
          )}
        </span>
      </div>
      {index < steps.length - 1 && (
        <div className="ml-7 flex justify-start py-1">
          <span
            className="block h-3 w-px bg-gradient-to-b from-primary/60 to-transparent motion-safe:animate-pulse"
            aria-hidden="true"
          />
        </div>
      )}
    </li>
  );
}

export function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-28 pb-20 sm:pt-32 md:pt-40 md:pb-32"
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
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-10 lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Revenue-as-a-Service for Contractors
          </span>
          <h1
            id="hero-heading"
            className="mt-5 text-[clamp(2.25rem,6vw,5.5rem)] font-extrabold leading-[1.02] tracking-tight text-foreground"
          >
            We build your contractor{" "}
            <span className="text-gradient-brand">Revenue Engine</span> for a one-time $500 setup.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Get a high-converting lead-gen website, CRM-ready forms, instant follow-up automation,
            and a system designed to turn visitors into booked jobs — without paying $5k+ for a
            website build.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/apply"
              aria-label="Apply for the $500 Revenue Engine setup"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_var(--glow-blue)] transition-all hover:translate-y-[-1px] hover:shadow-[0_14px_50px_var(--glow-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Apply for the $500 Setup
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/free-audit"
              aria-label="Get a free revenue audit"
              className="inline-flex h-14 items-center justify-center rounded-full border border-border bg-secondary/40 px-7 text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Get a Free Revenue Audit
            </Link>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">Setup</dt>
              <dd className="mt-1 text-2xl font-bold text-foreground">$500</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">Timeline</dt>
              <dd className="mt-1 text-2xl font-bold text-foreground">Fast</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">Goal</dt>
              <dd className="mt-1 text-2xl font-bold text-foreground">Leads</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">System</dt>
              <dd className="mt-1 text-2xl font-bold text-foreground">Site + Follow-Up</dd>
            </div>
          </dl>
        </div>
        <FunnelMockup />
      </div>
    </section>
  );
}
