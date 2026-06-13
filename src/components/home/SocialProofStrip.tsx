import { Check } from "lucide-react";

// We're a new company with no client metrics yet, so "social proof" here is
// third-party industry research (each stat is attributed to its source) rather
// than testimonials or invented numbers.
const stats = [
  {
    value: "75%",
    label: "of people judge a business's credibility by its website design",
    source: "Stanford Web Credibility Project",
  },
  {
    value: "53%",
    label: "of mobile visitors leave a site that takes over 3 seconds to load",
    source: "Google — The Need for Mobile Speed",
  },
  {
    value: "46%",
    label: "of all Google searches are looking for a local business",
    source: "Google / HubSpot",
  },
  {
    value: "80%",
    label: "of consumers search online for local businesses every week",
    source: "SOCi Consumer Behavior Index, 2024",
  },
];

const features = [
  "Mobile Optimized",
  "Google Ready",
  "Fast Loading",
  "AI Enhanced",
  "Built In Days",
  "Local Business Focused",
];

export function SocialProofStrip() {
  return (
    <section className="relative py-12 md:py-16" aria-labelledby="proof-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Why It Matters
          </span>
          <h2
            id="proof-heading"
            className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            The research is clear: your website is your first impression.
          </h2>
        </div>

        <dl className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.value} className="text-center sm:text-left">
              <dt className="text-4xl font-extrabold tracking-tight text-gradient-brand sm:text-5xl">
                {s.value}
              </dt>
              <dd className="mt-2 text-sm leading-snug text-muted-foreground">
                {s.label}
                <span className="mt-1.5 block text-xs text-muted-foreground/70">
                  Source: {s.source}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Check className="h-4 w-4 flex-none text-primary" aria-hidden />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
