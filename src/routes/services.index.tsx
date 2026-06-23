import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — ClickAdMedia" },
      {
        name: "description",
        content:
          "Websites, SEO, and Paid Ads built for contractors. From $500 sites to $997/mo full domination.",
      },
      { property: "og:title", content: "Services — ClickAdMedia" },
      { property: "og:description", content: "Websites, SEO, and Paid Ads for contractors." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-[1280px] mx-auto text-center">
          <span className="section-label">Full-Service Digital Marketing for Contractors</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.02em] mb-4">
            Websites, SEO, and Paid Ads —<br />
            <span className="text-gradient">Built for Your Trade</span>
          </h1>
          <p className="text-[rgba(255,255,255,0.55)] text-lg max-w-[600px] mx-auto">
            Most agencies build pretty sites. We build systems that make your phone ring. From $500
            sites to $997/month full domination.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "🖥️",
              title: "Website Design",
              price: "$500 flat",
              desc:
                "$500 flat. Live in 48 hours. Mobile-first, built for contractors — not generic templates.",
              cta: "Learn More →",
              to: "/services/website-design" as const,
            },
            {
              icon: "🔍",
              title: "SEO",
              price: "$297/mo",
              desc:
                'Rank when customers search "plumber near me." Local optimization that actually works.',
              cta: "Learn More →",
              to: "/services/seo" as const,
            },
            {
              icon: "🎯",
              title: "Paid Ads",
              price: "20% of spend",
              desc:
                "Google Ads + Facebook retargeting. Every click becomes a booked job. We manage it all.",
              cta: "Learn More →",
              to: "/services/paid-ads" as const,
            },
          ].map((s) => (
            <div key={s.title} className="glass-card p-8 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: "linear-gradient(90deg, #007bff, transparent)" }}
              />
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold mb-1">{s.title}</h3>
              <div className="text-sm text-gradient font-bold mb-4">{s.price}</div>
              <p className="text-sm text-[rgba(255,255,255,0.6)] leading-relaxed mb-6">
                {s.desc}
              </p>
              <Link
                to={s.to}
                className="text-sm text-[#007bff] hover:text-[#00c6ff] font-medium transition-colors"
              >
                {s.cta}
              </Link>
            </div>
          ))}
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
        <div className="max-w-[700px] mx-auto text-center">
          <div
            className="glass-card p-8 relative overflow-hidden"
            style={{ border: "1px solid rgba(0,123,255,0.3)" }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ background: "var(--cam-gradient)" }}
            />
            <h3 className="text-2xl font-bold mb-3">
              The Dominate Package — All Three, One Price
            </h3>
            <p className="text-[rgba(255,255,255,0.6)] mb-2">
              Website + SEO + Paid Ads for{" "}
              <span className="text-gradient font-bold text-xl">$997/month</span>
            </p>
            <p className="text-sm text-[rgba(255,255,255,0.5)] mb-6">
              Dedicated account manager. Monthly strategy calls. We handle everything. You handle
              the jobs.
            </p>
            <Link to="/pricing" className="btn-primary">
              See Full Pricing →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
