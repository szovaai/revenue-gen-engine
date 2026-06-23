import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/services/paid-ads")({
  head: () => ({
    meta: [
      { title: "Paid Ads — ClickAdMedia" },
      {
        name: "description",
        content:
          "Google Ads, Local Service Ads, and Facebook retargeting for contractors. Every click becomes a booked job.",
      },
    ],
  }),
  component: PaidAdsPage,
});

function PaidAdsPage() {
  const platforms = [
    {
      name: "Google Search Ads",
      best: 'High-intent searches: "emergency plumber near me"',
      fee: "20% of ad spend",
    },
    {
      name: "Google Local Service Ads",
      best: "Verified badge, pay per lead",
      fee: "15% of ad spend",
    },
    {
      name: "Facebook / Instagram",
      best: "Before/after photos, brand awareness, retargeting",
      fee: "20% of ad spend",
    },
  ];

  const features = [
    { name: "Landing page design", why: "Converts clicks to calls (not just your homepage)" },
    { name: "Call tracking", why: "Know which ad drove which call" },
    { name: "Daily optimization", why: "We adjust bids, keywords, audiences weekly" },
    { name: "Monthly reporting", why: "See exactly what you spent and what you earned" },
    { name: "Budget flexibility", why: "Start at $500/month ad spend, scale as you grow" },
  ];

  return (
    <>
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-[1280px] mx-auto">
          <span className="section-label">Paid Ads for Contractors</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.02em] mb-4 max-w-[800px]">
            Every Click Becomes a <span className="text-gradient">Booked Job</span>
          </h1>
          <p className="text-[rgba(255,255,255,0.55)] text-lg max-w-[550px] mb-6">
            Google Search Ads. Facebook retargeting. Local Service Ads. We build the campaigns,
            write the copy, and optimize daily. You just answer the phone.
          </p>
          <Link to="/book-a-call" className="btn-primary">
            Get a Free Ad Strategy Call
          </Link>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-2xl font-bold mb-6">Platforms We Manage</h2>
          <div className="space-y-3">
            {platforms.map((p) => (
              <div
                key={p.name}
                className="glass-card p-5 flex flex-col sm:flex-row sm:items-center gap-3"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-[15px] mb-0.5">{p.name}</h4>
                  <p className="text-sm text-[rgba(255,255,255,0.5)]">{p.best}</p>
                </div>
                <span className="text-sm font-bold text-gradient whitespace-nowrap">{p.fee}</span>
              </div>
            ))}
          </div>
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
        <div className="max-w-[700px] mx-auto glass-card p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">The Math</h3>
          <div className="text-4xl font-extrabold text-gradient mb-2">
            $40 Per Click. $800 Per Job.
          </div>
          <p className="text-[rgba(255,255,255,0.6)]">
            One roofing job pays for 20 clicks. One plumbing emergency covers a month of ads. The
            numbers work — if the site converts.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-2xl font-bold mb-6">Pricing</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold mb-1">Growth</h3>
              <div className="text-3xl font-extrabold text-gradient mb-3">
                $297<span className="text-base font-normal text-[rgba(255,255,255,0.4)]">/mo</span>
              </div>
              <ul className="space-y-2 text-sm text-[rgba(255,255,255,0.7)]">
                <li>Google Ads only</li>
                <li>1 landing page</li>
                <li>Monthly report</li>
              </ul>
            </div>
            <div className="glass-card p-6" style={{ border: "1px solid rgba(0,123,255,0.3)" }}>
              <h3 className="text-lg font-bold mb-1">Dominate</h3>
              <div className="text-3xl font-extrabold text-gradient mb-3">
                $997<span className="text-base font-normal text-[rgba(255,255,255,0.4)]">/mo</span>
              </div>
              <ul className="space-y-2 text-sm text-[rgba(255,255,255,0.7)]">
                <li>Google + Facebook + LSA</li>
                <li>3 landing pages</li>
                <li>Weekly optimization</li>
                <li>Dedicated manager</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-[rgba(255,255,255,0.4)] mt-4 text-center">
            Ad spend is separate — you pay Google/Facebook directly. We manage it.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-2xl font-bold mb-6">FAQ</h2>
          <div className="space-y-3">
            {[
              {
                q: "How much do I need to spend on ads?",
                a: "Start at $500/month. We recommend $1,000–$2,000 for competitive markets.",
              },
              {
                q: "How fast until I see results?",
                a: "Google Ads: 24–48 hours. Facebook: 1–2 weeks for optimization.",
              },
              {
                q: "Do I need a website first?",
                a: "Yes — and we'll build it. Bundle with our $500 site for a discount.",
              },
            ].map((f) => (
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
          <Link
            to="/book-a-call"
            className="btn-primary text-lg px-10 py-4 inline-block"
            style={{ boxShadow: "var(--cam-glow)" }}
          >
            Get a Free Ad Strategy Call →
          </Link>
          <p className="text-sm text-[rgba(255,255,255,0.4)] mt-4">Or call (555) 123-4567</p>
        </div>
      </section>
    </>
  );
}
