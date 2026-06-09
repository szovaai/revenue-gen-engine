import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How does pricing work?",
    a: "Every contractor's setup is a little different, so we quote per project. Share your trade, service area, and goals through the quote form and we'll send a tailored price within one business day — no surprise agency-style invoices.",
  },
  {
    q: "Is this monthly?",
    a: "The build is a one-time setup fee, quoted per project. Optional monthly growth support — ads, hosting, CRM, or optimization — can be added later if you want help scaling the system.",
  },
  {
    q: "Do I own the website?",
    a: "Yes, the setup is built for your business. We can either hand it off or help maintain and optimize it through an optional monthly growth plan.",
  },
  {
    q: "Who is this for?",
    a: "Roofers, electricians, HVAC companies, plumbers, landscapers, painters, general contractors, snow removal companies, and other local service businesses that want more quote requests and booked jobs.",
  },
  {
    q: "What happens after I request a quote?",
    a: "We review your trade, service area, current website, and goals. If it is a fit, we send a tailored quote and map out your Revenue Engine before starting the setup process.",
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
