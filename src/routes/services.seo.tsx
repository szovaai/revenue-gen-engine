import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/services/seo")({
  head: () => ({
    meta: [
      { title: "Local SEO — ClickAdMedia" },
      {
        name: "description",
        content:
          'Be the first name customers see when they search "plumber near me." Local SEO for contractors.',
      },
    ],
  }),
  component: SEOPage,
});

function SEOPage() {
  const services = [
    {
      name: "Google Business Optimization",
      what: "Complete profile, photos, posts, Q&A",
      result: "Show in Maps pack",
    },
    {
      name: "Local Keyword Targeting",
      what: '"Plumber [city]," "roofer near me"',
      result: "Rank for what people actually search",
    },
    { name: "On-Page SEO", what: "Titles, meta, schema markup", result: "Google understands your business" },
    {
      name: "Content Strategy",
      what: "2 blog posts/month targeting local searches",
      result: "Organic traffic growth",
    },
    {
      name: "Citation Building",
      what: "Consistent listings on Yelp, Angi, BBB",
      result: "Higher local ranking",
    },
    {
      name: "Review Generation",
      what: "System to get more 5-star reviews",
      result: "Social proof + ranking boost",
    },
  ];

  return (
    <>
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-[1280px] mx-auto">
          <span className="section-label">Local SEO for Contractors</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.02em] mb-4 max-w-[800px]">
            Be the First Name Customers See{" "}
            <span className="text-gradient">When They Search</span>
          </h1>
          <p className="text-[rgba(255,255,255,0.55)] text-lg max-w-[550px] mb-6">
            &quot;Plumber near me.&quot; &quot;Roofer Dallas.&quot; &quot;Emergency HVAC.&quot; We
            optimize your site and Google Business so you show up — and get the call.
          </p>
          <Link to="/book-a-call" className="btn-primary">
            Get a Free SEO Audit
          </Link>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-2xl font-bold mb-3">
            Your Competitor Ranks #1. You&apos;re on Page 3.
          </h2>
          <p className="text-[rgba(255,255,255,0.6)] mb-8">
            75% of customers never scroll past the first page. If you&apos;re not there, you
            don&apos;t exist. We fix that.
          </p>
          <h2 className="text-2xl font-bold mb-6">What We Do</h2>
          <div className="space-y-3">
            {services.map((s) => (
              <div key={s.name} className="glass-card p-5">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-[15px]">{s.name}</h4>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#007bff]">
                    {s.result}
                  </span>
                </div>
                <p className="text-sm text-[rgba(255,255,255,0.5)]">{s.what}</p>
              </div>
            ))}
          </div>
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
                <li>Everything above</li>
                <li>Monthly ranking report</li>
                <li>Content strategy</li>
                <li>Citation building</li>
              </ul>
            </div>
            <div className="glass-card p-6" style={{ border: "1px solid rgba(0,123,255,0.3)" }}>
              <h3 className="text-lg font-bold mb-1">Dominate</h3>
              <div className="text-3xl font-extrabold text-gradient mb-3">
                $997<span className="text-base font-normal text-[rgba(255,255,255,0.4)]">/mo</span>
              </div>
              <ul className="space-y-2 text-sm text-[rgba(255,255,255,0.7)]">
                <li>Growth + Paid Ads</li>
                <li>Dedicated manager</li>
                <li>Weekly strategy calls</li>
                <li>Priority everything</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[700px] mx-auto glass-card p-8 text-center">
          <div className="text-2xl mb-3">&ldquo;</div>
          <p className="text-lg text-[rgba(255,255,255,0.8)] leading-relaxed mb-4">
            We went from page 3 to #1 for &apos;emergency plumber Dallas&apos; in 60 days. Calls
            doubled.
          </p>
          <p className="text-sm text-[rgba(255,255,255,0.5)]">— Johnson&apos;s Plumbing, Dallas</p>
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
            Get a Free SEO Audit →
          </Link>
          <p className="text-sm text-[rgba(255,255,255,0.4)] mt-4">Or call (555) 123-4567</p>
        </div>
      </section>
    </>
  );
}
