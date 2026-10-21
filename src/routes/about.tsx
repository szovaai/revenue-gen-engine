import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ClickAdMedia — Websites for Tradesmen" },
      { name: "description", content: "ClickAdMedia builds premium websites and digital systems for plumbers, electricians, HVAC companies, roofers and contractors." },
      { property: "og:title", content: "About ClickAdMedia" },
      { property: "og:description", content: "A practical digital partner for trades and home-service businesses." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { t: "Premium Design", d: "A professional website that reflects the quality of your work." },
  { t: "Clear Pricing", d: "A defined $997 CAD website package with clearly scoped deliverables." },
  { t: "Connected Tools", d: "Optional CRM, booking, and lead-management workflows." },
  { t: "Personal Support", d: "A practical digital partner who can help with implementation and ongoing needs." },
];

function AboutPage() {
  return (
    <>
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-[860px] mx-auto">
          <span className="section-label">About</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-[-0.02em] mb-6">Premium Websites. Smarter Lead Management. Built for the Trades.</h1>
          <p className="text-lg text-[rgba(255,255,255,0.65)] mb-4">
            We build professional websites for tradesmen, then help connect the tools they need to capture inquiries, manage leads, and organize their business online.
          </p>
          <p className="text-[rgba(255,255,255,0.6)]">
            ClickAdMedia works with plumbers, electricians, HVAC contractors, roofers, landscapers, painters, general contractors and renovation companies. We&apos;re not a DIY template marketplace or a generic marketing agency — we customize every site around your trade, your services and the areas you serve. And we show you a free, personalized preview first: you don&apos;t pay for a website you don&apos;t approve.
          </p>
        </div>
      </section>
      <section className="px-6 pb-16">
        <div className="max-w-[1100px] mx-auto grid sm:grid-cols-2 gap-6">
          {VALUES.map((v) => (
            <div key={v.t} className="glass-card p-7"><h2 className="font-bold text-lg mb-2">{v.t}</h2><p className="text-sm text-[rgba(255,255,255,0.6)]">{v.d}</p></div>
          ))}
        </div>
      </section>
      <section className="px-6 pb-24 text-center">
        <Link to="/contact" className="btn-primary">Start Your Website — $997 →</Link>
      </section>
    </>
  );
}
