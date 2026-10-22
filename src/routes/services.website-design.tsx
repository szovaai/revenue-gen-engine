import { createFileRoute, Link } from "@tanstack/react-router";
import { portfolioImg } from "@/lib/cam-assets";

export const Route = createFileRoute("/services/website-design")({
  head: () => ({
    meta: [
      { title: "Website Design — ClickAdMedia" },
      {
        name: "description",
        content:
          "$997 flat. Free personalized preview first. A website built for your trade.",
      },
    ],
  }),
  component: WebsiteDesignPage,
});

function WebsiteDesignPage() {
  const features = [
    { name: "Mobile-first design", why: "70% of your customers are on phones" },
    { name: "Click-to-call buttons", why: "One tap = they're talking to you" },
    { name: "Before/after gallery", why: "Visual proof sells your work" },
    { name: "Review integration", why: "5 stars = instant trust" },
    { name: "Fast loading", why: "Slow sites = lost customers" },
    { name: "Google Business connected", why: "Show up in local search" },
  ];

  const niches = [
    { label: "Plumber", img: portfolioImg.plumber },
    { label: "Roofer", img: portfolioImg.roofer },
    { label: "HVAC", img: portfolioImg.hvac },
    { label: "Electrician", img: portfolioImg.autorepair },
    { label: "Cleaner", img: portfolioImg.landscaping },
    { label: "Contractor", img: portfolioImg.realestate },
  ];

  const faqs = [
    { q: "Do I own the site?", a: "Yes, 100%. We hand over all files." },
    { q: "What if I don't like it?", a: "We revise until you do. No extra charge." },
    { q: "How fast?", a: "We build your free preview first. Once you approve the direction, we complete the full build under the agreed scope." },
    { q: "What about updates?", a: "Our $49 CAD/month Website Care plan covers hosting coordination, maintenance and minor edits." },
  ];

  return (
    <>
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-[1280px] mx-auto">
          <span className="section-label">Website Design for Contractors</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.02em] mb-4 max-w-[800px]">
            A Website That Books Jobs —<br />
            <span className="text-gradient">Not Just Looks Pretty</span>
          </h1>
          <p className="text-[rgba(255,255,255,0.55)] text-lg max-w-[550px] mb-6">
            $997 flat. No hidden fees. We build a free personalized preview first — you don&apos;t pay for a website you don&apos;t approve.
          </p>
          <Link to="/book-a-call" className="btn-primary">
            See Your Free Preview
          </Link>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-2xl font-bold mb-6">What You Get</h2>
          <div className="space-y-3">
            {features.map((f) => (
              <div key={f.name} className="glass-card p-5 flex items-center gap-4">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                  <path
                    d="M4 10L8 14L16 6"
                    stroke="#007bff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <div className="font-semibold text-[15px]">{f.name}</div>
                  <div className="text-xs text-[rgba(255,255,255,0.5)]">{f.why}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Pick Your Trade. See Your Demo.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {niches.map((n) => (
              <Link
                key={n.label}
                to="/portfolio"
                className="glass-card p-5 flex items-center gap-4 group"
              >
                <img src={n.img} alt={n.label} className="w-20 h-14 object-cover rounded-lg" />
                <div className="flex-1">
                  <div className="font-bold text-[15px]">{n.label}</div>
                  <div className="text-xs text-[rgba(255,255,255,0.45)]">View Demo</div>
                </div>
                <span className="text-lg text-[rgba(255,255,255,0.3)] group-hover:text-[#007bff] transition-colors">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-2xl font-bold mb-6">Pricing</h2>
          <div className="grid gap-5 mb-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold mb-1">Website Build</h3>
              <div className="text-3xl font-extrabold text-gradient mb-3">$997</div>
              <ul className="space-y-2 text-sm text-[rgba(255,255,255,0.7)]">
                <li>5 pages</li>
                <li>Mobile-ready</li>
                <li>Contact form</li>
                <li>Click-to-call</li>
              </ul>
            </div>
          </div>
          <div className="glass-card p-5 text-center">
            <span className="text-sm text-[rgba(255,255,255,0.6)]">Care Plan: </span>
            <span className="text-gradient font-bold">$49 CAD/month</span>
            <span className="text-sm text-[rgba(255,255,255,0.6)]">
              {" "}— hosting coordination, maintenance, monitoring and minor edits
            </span>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-2xl font-bold mb-6">Common Questions</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <div key={f.q} className="glass-card p-5">
                <h4 className="font-semibold mb-1">{f.q}</h4>
                <p className="text-sm text-[rgba(255,255,255,0.55)]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #007bff, #00c6ff, transparent)",
          }}
        />
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready for a Site That Actually Works?</h2>
          <Link
            to="/book-a-call"
            className="btn-primary text-lg px-10 py-4 inline-block"
            style={{ boxShadow: "var(--cam-glow)" }}
          >
            Get Your Free Preview →
          </Link>
          <p className="text-sm text-[rgba(255,255,255,0.4)] mt-4">
            Or call (555) 123-4567
          </p>
        </div>
      </section>
    </>
  );
}
