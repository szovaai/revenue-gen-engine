import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How much does a website cost?",
    a: "Websites start at just $500 for our Starter Growth Package — a 5-page, mobile-friendly site with a contact form and hosting setup. Growth ($997) adds SEO and Google Business optimization, and Dominate Your Market ($1,997) adds premium design, animations, an AI chatbot, and conversion optimization. One-time pricing, no hidden fees.",
  },
  {
    q: "How fast can my website be ready?",
    a: "Days, not months. Most builds go live within a week of your free website review, depending on the package and how quickly we get your content and photos.",
  },
  {
    q: "Is this monthly?",
    a: "No — the build is a one-time fee. Optional monthly add-ons (SEO, Google Ads, AI chatbot, reputation management) are available later if you want help scaling, but they're never required.",
  },
  {
    q: "Do I own the website?",
    a: "Yes. The website is built for your business and it's yours. We can hand it off or keep optimizing it for you — your call.",
  },
  {
    q: "Who is this for?",
    a: "Roofers, plumbers, HVAC, electricians, fencing, landscapers, dentists, general contractors, and other local businesses that want more calls, leads, and customers.",
  },
  {
    q: "What's the Launch Guarantee?",
    a: "If we don't deliver your website as promised, you don't pay. All the risk is on us — booking your free website review costs nothing.",
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
