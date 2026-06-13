import { useState } from "react";
import {
  House,
  Wrench,
  Wind,
  Zap,
  Fence,
  Trees,
  HardHat,
  Check,
  type LucideIcon,
} from "lucide-react";

type Industry = {
  tag: string;
  icon: LucideIcon;
  hue: number;
  headline: string;
  features: string[];
};

const industries: Industry[] = [
  {
    tag: "Roofing",
    icon: House,
    hue: 14,
    headline: "Free Roof Inspections — Booked Online",
    features: ["Storm-damage lead forms", "Photo gallery of completed roofs", "Financing CTA"],
  },
  {
    tag: "Plumbing",
    icon: Wrench,
    hue: 205,
    headline: "24/7 Emergency Plumbing, One Tap Away",
    features: ["Click-to-call header", "Service-area pages", "Instant quote request"],
  },
  {
    tag: "HVAC",
    icon: Wind,
    hue: 190,
    headline: "Stay Comfortable Year-Round",
    features: ["Seasonal tune-up offers", "Maintenance plan signup", "Financing options"],
  },
  {
    tag: "Electrical",
    icon: Zap,
    hue: 45,
    headline: "Licensed Electricians On Call",
    features: ["Safety-inspection lead magnet", "Panel-upgrade landing page", "Review showcase"],
  },
  {
    tag: "Fencing",
    icon: Fence,
    hue: 25,
    headline: "Get a Fence Quote in Minutes",
    features: ["Material picker", "Before/after gallery", "Free estimate form"],
  },
  {
    tag: "Landscaping",
    icon: Trees,
    hue: 130,
    headline: "Lawns the Whole Street Notices",
    features: ["Project portfolio", "Seasonal package offers", "Quote calculator"],
  },
  {
    tag: "Contractors",
    icon: HardHat,
    hue: 220,
    headline: "Build Trust Before the First Call",
    features: ["License & insurance badges", "Project case studies", "Consultation booking"],
  },
];

function MockPreview({ industry }: { industry: Industry }) {
  const top = `hsl(${industry.hue} 80% 30%)`;
  const base = `hsl(${industry.hue} 70% 16%)`;
  const accent = `hsl(${industry.hue} 85% 60%)`;
  return (
    <div className="overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-black/40 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
      </div>
      <div className="p-7" style={{ background: `linear-gradient(160deg, ${top}, ${base})` }}>
        <span
          className="inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-black"
          style={{ background: accent }}
        >
          {industry.tag}
        </span>
        <h3 className="mt-3 text-2xl font-bold text-white">{industry.headline}</h3>
        <div className="mt-4 flex gap-2">
          <span
            className="inline-flex h-9 items-center rounded-full px-4 text-xs font-semibold text-black"
            style={{ background: accent }}
          >
            Get a Free Quote
          </span>
          <span className="inline-flex h-9 items-center rounded-full bg-white/10 px-4 text-xs font-semibold text-white">
            Call Now
          </span>
        </div>
        <ul className="mt-5 grid gap-2 sm:grid-cols-3">
          {industry.features.map((f) => (
            <li
              key={f}
              className="rounded-lg bg-black/25 p-3 text-xs leading-snug text-white/90 backdrop-blur"
            >
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function IndustrySelector() {
  const [active, setActive] = useState(0);
  const current = industries[active];

  return (
    <section
      className="relative border-t border-border py-20 md:py-28"
      aria-labelledby="industries-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Built For Your Trade
          </span>
          <h2
            id="industries-heading"
            className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Pick your industry. See your site.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every build is tailored to how your customers actually search and book.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[300px_1fr] lg:items-start">
          {/* Selector cards */}
          <div
            className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-1"
            role="tablist"
            aria-label="Select an industry"
          >
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              const selected = i === active;
              return (
                <button
                  key={ind.tag}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    selected
                      ? "border-primary/50 bg-primary/10 text-foreground shadow-[0_0_24px_var(--glow-blue)]"
                      : "border-border bg-background/40 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 flex-none items-center justify-center rounded-lg ring-1 ${
                      selected
                        ? "bg-primary/20 text-primary ring-primary/40"
                        : "bg-primary/10 text-primary ring-primary/20"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="flex-1">{ind.tag}</span>
                  {selected && <Check className="h-4 w-4 flex-none text-primary" aria-hidden />}
                </button>
              );
            })}
          </div>

          {/* Live mockup */}
          <div>
            <MockPreview industry={current} />
          </div>
        </div>
      </div>
    </section>
  );
}
