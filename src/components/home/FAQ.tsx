import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Why is the setup $0? What's the catch?",
    a: "Because we win when you win. We've productized our build process so we can roll out a proven Revenue Engine in days, not months. There's no catch — we're betting that once you see leads come in, you'll stay subscribed (and most contractors upgrade to Growth within 60 days).",
  },
  {
    q: "What exactly is the Pilot Program?",
    a: "We're rolling out our system to a limited number of contractors per trade, per city — so we don't compete two roofers in the same zip code against each other. Pilot members get $0 setup, locked-in monthly pricing, and priority onboarding.",
  },
  {
    q: "Do I own the website?",
    a: "You lease a turnkey Revenue Engine — site, CRM, automations, and (on Growth) ad management — for one monthly fee. Think of it as a digital salesperson on payroll, not a one-off build that goes stale.",
  },
  {
    q: "What is GHL and why does it matter?",
    a: "GHL (GoHighLevel) is the CRM brain behind your Revenue Engine. Every form fill, call, and inquiry triggers automated SMS and email follow-up within seconds — because the contractor who responds first almost always wins the job.",
  },
  {
    q: "What if I already have a website?",
    a: "Most contractor sites are 'digital ghost towns' — they exist, but they don't sell. We'll either rebuild on the Revenue Engine framework or wire your existing site into the CRM and automations. The Free Audit will tell you which path makes sense.",
  },
  {
    q: "Can I cancel?",
    a: "Yes. Month-to-month. No long-term contracts. If the engine isn't producing, you shouldn't be paying for it.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section
      className="relative border-t border-border py-20 md:py-28"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            FAQ
          </span>
          <h2
            id="faq-heading"
            className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Questions, answered.
          </h2>
        </div>
        <ul className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="glass-card rounded-2xl">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                >
                  <span className="text-base font-semibold text-foreground sm:text-lg">{f.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 flex-none text-primary transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {f.a}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
