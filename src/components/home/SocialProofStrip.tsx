import { Check } from "lucide-react";

const points = [
  "Mobile Optimized",
  "Google Ready",
  "Fast Loading",
  "AI Enhanced",
  "Built In Days",
  "Local Business Focused",
];

export function SocialProofStrip() {
  return (
    <section className="border-y border-border bg-secondary/20" aria-label="What's included">
      <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-7 gap-y-3 px-4 py-5 sm:px-6 lg:px-8">
        {points.map((p) => (
          <li key={p} className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Check className="h-4 w-4 flex-none text-primary" aria-hidden />
            {p}
          </li>
        ))}
      </ul>
    </section>
  );
}
