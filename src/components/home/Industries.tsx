import { Home, Wind, Wrench, Trees, Zap, Hammer, PaintRoller, Snowflake } from "lucide-react";

const industries = [
  { name: "Roofing", icon: Home },
  { name: "HVAC", icon: Wind },
  { name: "Plumbing", icon: Wrench },
  { name: "Landscaping", icon: Trees },
  { name: "Electrical", icon: Zap },
  { name: "General Contracting", icon: Hammer },
  { name: "Painting", icon: PaintRoller },
  { name: "Snow & Ice", icon: Snowflake },
];

export function Industries() {
  return (
    <section
      className="relative border-t border-border py-20 md:py-28"
      aria-labelledby="industries-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Built For The Trades
          </span>
          <h2
            id="industries-heading"
            className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Engineered for contractors.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We obsess over one buyer: the time-starved contractor who needs more booked jobs, not
            another web design project.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <li key={ind.name}>
                <div className="glass-card group flex h-full items-center gap-3 rounded-xl p-5 transition-all hover:-translate-y-0.5 hover:border-primary/50">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/30 transition-shadow group-hover:shadow-[0_0_24px_var(--glow-blue)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium text-foreground">{ind.name}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
