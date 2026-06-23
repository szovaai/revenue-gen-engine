import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/lib/use-reveal";
import { portfolioImg } from "@/lib/cam-assets";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — ClickAdMedia" },
      {
        name: "description",
        content:
          "Browse contractor and home service website demos. Like what you see? We'll build yours for $500.",
      },
    ],
  }),
  component: PortfolioPage,
});

const demos = [
  { name: "RapidFlow Plumbing", city: "Dallas, TX", niche: "Plumber", img: portfolioImg["plumber-emergency"] },
  { name: "Summit Roofing", city: "Phoenix, AZ", niche: "Roofer", img: portfolioImg.roofer },
  { name: "Elite Electric Services", city: "Houston, TX", niche: "Electrician", img: portfolioImg.electrician },
  { name: "Apex HVAC", city: "Atlanta, GA", niche: "HVAC", img: portfolioImg.hvac },
  { name: "Sterling Build & Design", city: "Denver, CO", niche: "Contractor", img: portfolioImg.contractor },
  { name: "Pristine Home Cleaning", city: "Miami, FL", niche: "Cleaner", img: portfolioImg.cleaner },
  { name: "Master Plumbers Co", city: "Chicago, IL", niche: "Plumber", img: portfolioImg.plumber },
  { name: "GreenScape Outdoor", city: "Portland, OR", niche: "Landscaping", img: portfolioImg.landscaping },
  { name: "Shield Restoration", city: "Seattle, WA", niche: "Water Damage", img: portfolioImg.autorepair },
  { name: "Peak Property Services", city: "San Diego, CA", niche: "Property Mgmt", img: portfolioImg.realestate },
];

function PortfolioPage() {
  const gridRef = useReveal<HTMLElement>();
  const ctaRef = useReveal<HTMLElement>();

  return (
    <>
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-[1280px] mx-auto text-center">
          <span className="section-label">Our Work</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.02em] mb-4">
            See What Your New Website
            <br />
            <span className="text-gradient">Could Look Like</span>
          </h1>
          <p className="text-[rgba(255,255,255,0.55)] text-lg max-w-[600px] mx-auto">
            Browse demos built for contractors and home service businesses. Like what you see?
            We&apos;ll build yours for $500.
          </p>
        </div>
      </section>

      <section ref={gridRef} className="px-6 pb-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {demos.map((d, i) => (
              <div
                key={d.name}
                className={`reveal reveal-delay-${(i % 4) + 1} glass-card overflow-hidden group`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={d.img}
                    alt={d.name}
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      background: "rgba(10,22,40,0.9)",
                      border: "1px solid rgba(0,123,255,0.3)",
                      color: "#007bff",
                    }}
                  >
                    {d.niche}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-sm mb-0.5">{d.name}</h4>
                  <p className="text-[11px] text-[rgba(255,255,255,0.4)] mb-3">{d.city}</p>
                  <div className="flex gap-2">
                    <button
                      className="flex-1 py-2 rounded-lg text-xs font-semibold text-center"
                      style={{ background: "var(--cam-gradient)" }}
                    >
                      Live Preview
                    </button>
                    <Link
                      to="/book-a-call"
                      className="flex-1 py-2 rounded-lg text-xs font-semibold text-center border border-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.8)] hover:border-[#007bff] transition-colors"
                    >
                      Want This?
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={ctaRef} className="relative py-24 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #007bff, #00c6ff, transparent)",
          }}
        />
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="reveal text-3xl md:text-4xl font-extrabold tracking-[-0.02em] mb-3">
            Like What You See?
          </h2>
          <p className="reveal reveal-delay-1 text-[rgba(255,255,255,0.55)] mb-8">
            Book a call and we&apos;ll send you a free preview of your site in 24 hours.
          </p>
          <div className="reveal reveal-delay-2">
            <Link to="/book-a-call" className="btn-primary" style={{ boxShadow: "var(--cam-glow)" }}>
              Send Me My Free Preview →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
