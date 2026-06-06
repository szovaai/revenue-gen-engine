import { ArrowRight, Megaphone, LayoutTemplate, MessageSquare } from "lucide-react";

const steps = [
  {
    title: "Connect The Traffic",
    icon: Megaphone,
    body: "Ads, SEO, and our scraper outreach push qualified contractor-shoppers to your site.",
  },
  {
    title: "Convert On The Site",
    icon: LayoutTemplate,
    body: "A direct-response site engineered around one job: turning the click into a form fill or call.",
  },
  {
    title: "Close With GHL",
    icon: MessageSquare,
    body: "Every lead gets automated SMS + email follow-up in seconds — booked into your calendar.",
  },
];

export function Framework() {
  return (
    <section
      className="relative border-t border-border py-20 md:py-28"
      aria-labelledby="framework-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            How It Works
          </span>
          <h2
            id="framework-heading"
            className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            The 3-Step Revenue Framework
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Traffic. Conversion. Automated closing. Your Revenue Engine, end to end.
          </p>
        </div>

        <ol className="mt-16 grid gap-4 md:grid-cols-3 md:gap-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.title} className="relative">
                <div className="glass-card group h-full rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-primary/50">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/30 transition-shadow group-hover:shadow-[0_0_24px_var(--glow-blue)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight
                    aria-hidden
                    className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-primary md:block"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
