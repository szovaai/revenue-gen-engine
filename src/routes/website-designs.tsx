import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { DESIGNS } from "@/lib/designs";

export const Route = createFileRoute("/website-designs")({
  head: () => ({
    meta: [
      { title: "Website Designs for Trades — ClickAdMedia" },
      { name: "description", content: "Plumber, electrician, HVAC, roofing, landscaping and contractor website design concepts. Customized for your business from $997 CAD." },
      { property: "og:title", content: "Website Designs for Trades — ClickAdMedia" },
      { property: "og:description", content: "Explore trade-specific website designs for plumbers, electricians, HVAC, roofers and contractors." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DesignsPage,
});

export function DesignGallery() {
  const [open, setOpen] = useState<(typeof DESIGNS)[number] | null>(null);
  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DESIGNS.map((d) => (
          <article key={d.slug} className="glass-card overflow-hidden flex flex-col">
            <button onClick={() => setOpen(d)} className="block overflow-hidden" aria-label={`View ${d.trade} design`}>
              <img src={d.image} alt={`${d.trade} website design concept`} width={1200} height={800} loading="lazy" className="w-full aspect-[3/2] object-cover object-top transition-transform duration-500 hover:scale-[1.03]" />
            </button>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-lg font-bold mb-1">{d.trade}</h3>
              <p className="text-xs font-mono uppercase tracking-wider text-[rgba(255,255,255,0.4)] mb-3">{d.palette}</p>
              <p className="text-sm text-[rgba(255,255,255,0.6)] mb-5 flex-1">{d.desc}</p>
              <button onClick={() => setOpen(d)} className="btn-secondary text-sm self-start">View Design →</button>
            </div>
          </article>
        ))}
      </div>
      {open && (
        <div className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-sm overflow-y-auto p-4" role="dialog" aria-modal="true" aria-label={`${open.trade} design preview`} onClick={() => setOpen(null)}>
          <div className="max-w-[1200px] mx-auto pt-10" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{open.trade} design concept</h3>
              <button onClick={() => setOpen(null)} className="text-sm underline">Close</button>
            </div>
            <img src={open.image} alt={`${open.trade} website design concept, full preview`} width={1200} height={800} className="w-full rounded-lg" />
            <div className="flex flex-wrap gap-3 mt-6">
              <Link to="/contact" className="btn-primary text-sm">Start With This Design →</Link>
              <Link to="/pricing" className="btn-secondary text-sm">View Packages</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function DesignsPage() {
  return (
    <>
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-[900px] mx-auto text-center">
          <span className="section-label">Website Designs</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-[-0.02em] mb-4">Designed for the Work You Do.</h1>
          <p className="text-[rgba(255,255,255,0.6)] text-lg">Your website should reflect the quality of your work. Explore professional designs tailored to your industry.</p>
        </div>
      </section>
      <section className="px-6 pb-16"><div className="max-w-[1280px] mx-auto"><DesignGallery /></div></section>
      <section className="px-6 pb-24">
        <p className="max-w-[800px] mx-auto text-center text-xs text-[rgba(255,255,255,0.45)]">
          These are design concepts for fictional businesses, shown to illustrate style direction. Your site is customized with your own branding, services, photos and content.
        </p>
        <div className="text-center mt-8"><Link to="/contact" className="btn-primary">Get Your Website — $997 →</Link></div>
      </section>
    </>
  );
}
