import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { TrendingUp, ArrowRight } from "lucide-react";

const INVESTMENT = 500; // Starter package price

export function ROICalculator() {
  const [jobValue, setJobValue] = useState(1500);
  const [perMonth, setPerMonth] = useState(1);

  // Clamp to non-negative so the figures can never render as garbage.
  const annual = Math.max(0, jobValue * perMonth * 12);
  const roi = Math.max(0, Math.round(((annual - INVESTMENT) / INVESTMENT) * 100));

  const money = (n: number) => `$${Math.max(0, Math.round(n)).toLocaleString()}`;

  return (
    <section
      className="relative border-t border-border py-20 md:py-28"
      aria-labelledby="roi-heading"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Do The Math
          </span>
          <h2
            id="roi-heading"
            className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            What's one new customer worth?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A single extra job a month usually pays for the whole website many times over. Slide to
            see your numbers.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-[1fr_1fr] md:items-stretch">
          {/* Inputs */}
          <div className="glass-card flex flex-col justify-center gap-8 rounded-2xl p-8">
            <div>
              <div className="flex items-baseline justify-between">
                <label htmlFor="job-value" className="text-sm font-medium text-foreground">
                  Average job value
                </label>
                <span className="font-mono text-lg font-semibold text-primary tabular-nums">
                  {money(jobValue)}
                </span>
              </div>
              <input
                id="job-value"
                type="range"
                min={250}
                max={15000}
                step={250}
                value={jobValue}
                onChange={(e) => setJobValue(Number(e.target.value))}
                className="mt-3 w-full accent-primary"
              />
            </div>
            <div>
              <div className="flex items-baseline justify-between">
                <label htmlFor="per-month" className="text-sm font-medium text-foreground">
                  New customers / month
                </label>
                <span className="font-mono text-lg font-semibold text-primary tabular-nums">
                  {perMonth}
                </span>
              </div>
              <input
                id="per-month"
                type="range"
                min={1}
                max={20}
                step={1}
                value={perMonth}
                onChange={(e) => setPerMonth(Number(e.target.value))}
                className="mt-3 w-full accent-primary"
              />
            </div>
          </div>

          {/* Result */}
          <div className="glass-card relative flex flex-col justify-center rounded-2xl p-8 text-center ring-1 ring-primary/30">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-[radial-gradient(circle_at_50%_0%,var(--glow-blue),transparent_60%)] blur-xl"
            />
            <span className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <TrendingUp className="h-4 w-4" />
              Estimated new revenue / year
            </span>
            <p
              className="mt-2 font-mono text-5xl font-extrabold tracking-tight text-foreground tabular-nums sm:text-6xl"
              aria-live="polite"
            >
              {money(annual)}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Investment from {money(INVESTMENT)} ·{" "}
              <span className="font-semibold text-primary">{roi.toLocaleString()}% ROI</span>
            </p>
            <Link
              to="/strategy-call"
              className="group mt-6 inline-flex h-12 items-center justify-center gap-2 self-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_var(--glow-blue)] transition-all hover:shadow-[0_0_40px_var(--glow-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Book Free Website Review
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Estimates for illustration only — actual results vary by trade, market, and effort.
        </p>
      </div>
    </section>
  );
}
