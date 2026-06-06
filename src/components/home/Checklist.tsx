import { Check } from "lucide-react";
import { useState } from "react";

const items = [
  "Lead-gen homepage with one clear offer",
  "Phone & form CTA above the fold",
  "Instant SMS reply to every new lead",
  "Automated email follow-up sequence",
  "CRM that captures every inquiry",
  "Call tracking & lead source attribution",
  "Trust signals (reviews, licenses, badges)",
  "Sub-2s mobile load time",
  "Local SEO foundation in place",
  "Ad-ready landing pages for paid traffic",
];

export function Checklist() {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section
      className="relative border-t border-border py-20 md:py-28"
      aria-labelledby="checklist-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              What's Inside The Engine
            </span>
            <h2
              id="checklist-heading"
              className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
            >
              Everything your Revenue Engine ships with.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              How many of these does your current site have? Tick what applies — the missing ones
              are leads slipping through your fingers every day.
            </p>
            <p
              className="mt-6 font-mono text-sm text-muted-foreground"
              aria-live="polite"
            >
              {checked.size}/{items.length} you already have
            </p>
          </div>

          <ul className="glass-card grid gap-2 rounded-2xl p-4 sm:grid-cols-2">
            {items.map((item, i) => {
              const isOn = checked.has(i);
              return (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-pressed={isOn}
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                      isOn
                        ? "border-primary/50 bg-primary/10 text-foreground shadow-[0_0_20px_var(--glow-blue)]"
                        : "border-border bg-background/40 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 flex-none items-center justify-center rounded-md border transition-all ${
                        isOn
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background"
                      }`}
                      aria-hidden
                    >
                      {isOn && <Check className="h-4 w-4" />}
                    </span>
                    <span>{item}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
