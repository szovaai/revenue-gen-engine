import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { usePaddleCheckout } from "@/hooks/use-paddle-checkout";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — ClickAdMedia" },
      {
        name: "description",
        content:
          "Start with a $500 site. Grow into Growth or Dominate. Simple pricing, no surprises.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { openCheckout, loading } = usePaddleCheckout();

  const buy = (priceId: string) => {
    if (!user) {
      navigate({ to: "/auth", search: { next: "/pricing" } as never });
      return;
    }
    openCheckout({
      priceId,
      customerEmail: user.email,
      customData: { userId: user.id },
      successUrl: `${window.location.origin}/thank-you`,
    });
  };
  const rows = [
    { label: "Price", starter: "$500", growth: "$297/mo", dominate: "$997/mo" },
    { label: "Website (5 pages)", starter: "✅", growth: "✅ (if needed)", dominate: "✅ (if needed)" },
    { label: "Hosting", starter: "+$97/mo", growth: "✅ Included", dominate: "✅ Included" },
    { label: "Local SEO", starter: "❌", growth: "✅", dominate: "✅ Advanced" },
    { label: "Content (blogs/mo)", starter: "❌", growth: "✅ 2", dominate: "✅ 4" },
    { label: "Paid Ads", starter: "❌", growth: "❌", dominate: "✅ Google + Facebook" },
    { label: "Landing Pages", starter: "❌", growth: "❌", dominate: "✅ Unlimited" },
    { label: "Call Tracking", starter: "❌", growth: "❌", dominate: "✅" },
    { label: "Account Manager", starter: "❌", growth: "❌", dominate: "✅ Dedicated" },
    { label: "Strategy Calls", starter: "❌", growth: "Monthly", dominate: "Weekly" },
  ];

  return (
    <>
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-[1280px] mx-auto text-center">
          <span className="section-label">Simple Pricing. No Surprises.</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.02em] mb-4">
            Start With a $500 Site.
            <br />
            <span className="text-gradient">Grow Into Everything.</span>
          </h1>
          <p className="text-[rgba(255,255,255,0.55)] text-lg max-w-[500px] mx-auto">
            Or go all-in with Dominate. You decide the speed.
          </p>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="max-w-[900px] mx-auto overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.1)]">
                <th className="text-left py-4 pr-4 text-sm text-[rgba(255,255,255,0.5)] font-medium"></th>
                <th className="py-4 px-4 text-center">
                  <div className="text-lg font-bold">Starter</div>
                  <div className="text-2xl font-extrabold text-gradient">$500</div>
                  <div className="text-[11px] text-[rgba(255,255,255,0.4)]">one-time</div>
                </th>
                <th
                  className="py-4 px-4 text-center"
                  style={{
                    background: "rgba(0,123,255,0.05)",
                    borderRadius: "8px 8px 0 0",
                  }}
                >
                  <div className="text-lg font-bold">Growth</div>
                  <div className="text-2xl font-extrabold text-gradient">
                    $297<span className="text-sm">/mo</span>
                  </div>
                </th>
                <th
                  className="py-4 px-4 text-center"
                  style={{
                    background: "rgba(0,123,255,0.08)",
                    borderRadius: "8px 8px 0 0",
                    border: "1px solid rgba(0,123,255,0.2)",
                    borderBottom: "none",
                  }}
                >
                  <div
                    className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1"
                    style={{ background: "var(--cam-gradient)", color: "white" }}
                  >
                    Best Value
                  </div>
                  <div className="text-lg font-bold">Dominate</div>
                  <div className="text-2xl font-extrabold text-gradient">
                    $997<span className="text-sm">/mo</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-b border-[rgba(255,255,255,0.05)]">
                  <td className="py-3.5 pr-4 text-sm text-[rgba(255,255,255,0.7)]">{r.label}</td>
                  <td className="py-3.5 px-4 text-center text-sm">{r.starter}</td>
                  <td
                    className="py-3.5 px-4 text-center text-sm"
                    style={{ background: "rgba(0,123,255,0.03)" }}
                  >
                    {r.growth}
                  </td>
                  <td
                    className="py-3.5 px-4 text-center text-sm font-medium"
                    style={{
                      background: "rgba(0,123,255,0.05)",
                      borderLeft: "1px solid rgba(0,123,255,0.15)",
                      borderRight: "1px solid rgba(0,123,255,0.15)",
                    }}
                  >
                    {r.dominate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 text-center text-sm text-[rgba(255,255,255,0.4)]">
            Ad spend is separate for Dominate tier. You pay Google/Facebook directly. We manage it.
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-[900px] mx-auto grid sm:grid-cols-3 gap-4">
          <Link to="/services/website-design" className="btn-primary text-center text-sm py-3">
            Get Starter →
          </Link>
          <Link to="/services/seo" className="btn-secondary text-center text-sm py-3">
            Get Growth →
          </Link>
          <Link
            to="/book-a-call"
            className="btn-primary text-center text-sm py-3"
            style={{ boxShadow: "var(--cam-glow-strong)" }}
          >
            Get Dominate →
          </Link>
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
          <h2 className="text-2xl font-bold mb-3">Not Sure Which Fits?</h2>
          <p className="text-[rgba(255,255,255,0.55)] mb-6">
            Book a 10-minute call. We&apos;ll audit your current presence and recommend the right
            tier.
          </p>
          <Link to="/book-a-call" className="btn-primary" style={{ boxShadow: "var(--cam-glow)" }}>
            Book a Free Call →
          </Link>
        </div>
      </section>
    </>
  );
}
