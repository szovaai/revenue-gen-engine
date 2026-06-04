import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/home/PageShell";
import { Calendar, Mail, Phone, Check } from "lucide-react";

export const Route = createFileRoute("/strategy-call")({
  head: () => ({
    meta: [
      { title: "Book A Strategy Call | ClickAdMedia" },
      {
        name: "description",
        content:
          "Book a free 30-minute strategy call with ClickAdMedia. We'll map out a website plan to grow your business.",
      },
      { property: "og:title", content: "Book A Strategy Call — ClickAdMedia" },
      {
        property: "og:description",
        content: "Map a revenue-focused website plan for your business in 30 minutes.",
      },
      { property: "og:url", content: "/strategy-call" },
    ],
    links: [{ rel: "canonical", href: "/strategy-call" }],
  }),
  component: StrategyCallPage,
});

const benefits = [
  "Review your current website and lead flow",
  "Identify the 3 biggest conversion gaps",
  "Map a tailored plan to grow revenue",
  "No pressure, no obligation",
];

function StrategyCallPage() {
  return (
    <PageShell>
      <section className="relative pt-36 pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              30-Minute Strategy Call
            </span>
            <h1 className="mt-3 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              Let's map your <span className="text-gradient-brand">growth plan.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              On this call we'll review your website and lead generation, then design a clear plan
              to turn more clicks into customers.
            </p>
            <ul className="mt-8 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-base text-foreground">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md bg-primary/15 text-primary ring-1 ring-primary/30">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card relative rounded-3xl p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-px -z-10 rounded-3xl bg-[radial-gradient(circle_at_50%_0%,var(--glow-blue),transparent_60%)] blur-xl"
            />
            <h2 className="text-xl font-semibold text-foreground">Choose your next step</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We'll confirm a time within one business day.
            </p>
            <div className="mt-6 space-y-3">
              <a
                href="mailto:hello@clickadmedia.co?subject=Strategy%20Call%20Request"
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/40 px-4 py-4 transition-all hover:border-primary/50 hover:bg-background/60"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/30">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-foreground">Email us</span>
                    <span className="block text-xs text-muted-foreground">
                      hello@clickadmedia.co
                    </span>
                  </span>
                </span>
                <span className="text-xs text-muted-foreground">→</span>
              </a>

              <a
                href="tel:+10000000000"
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/40 px-4 py-4 transition-all hover:border-primary/50 hover:bg-background/60"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/30">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-foreground">Call us</span>
                    <span className="block text-xs text-muted-foreground">
                      Mon–Fri, 9am–6pm ET
                    </span>
                  </span>
                </span>
                <span className="text-xs text-muted-foreground">→</span>
              </a>

              <Link
                to="/free-audit"
                className="flex items-center justify-between gap-3 rounded-xl border border-primary/40 bg-primary/10 px-4 py-4 transition-all hover:bg-primary/15"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-[0_0_20px_var(--glow-blue)]">
                    <Calendar className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-foreground">
                      Request a free audit instead
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      We'll review your site first, then talk.
                    </span>
                  </span>
                </span>
                <span className="text-xs text-muted-foreground">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
