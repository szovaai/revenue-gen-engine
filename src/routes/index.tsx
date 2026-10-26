import { createFileRoute, Link } from "@tanstack/react-router";
import heroMockup from "@/assets/designs/hero-plumbing.jpg";
import { DesignGallery } from "./website-designs";
import { PACKAGES } from "@/lib/packages";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ClickAdMedia — Premium Websites for Tradesmen & Contractors" },
      { name: "description", content: "Premium, customized websites for plumbers, electricians, HVAC, roofers and contractors — custom-quoted to your scope. Optional CRM, booking and lead management. Free preview first." },
      { property: "og:title", content: "ClickAdMedia — Premium Websites for the Trades" },
      { property: "og:description", content: "Premium websites. Smarter lead management. Built for the trades. Custom quotes with a free preview first." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const muted = "text-[rgba(255,255,255,0.62)]";

const STEPS = [
  { t: "Choose Your Design", d: "Explore professionally designed website styles tailored to your trade." },
  { t: "Tell Us About Your Business", d: "Share your business name, logo, services, service areas, contact details, photos, and preferred functionality." },
  { t: "We Build Your Website", d: "We customize your selected design, prepare the agreed pages, and configure your website forms and optional CRM integration." },
  { t: "Launch Your New Online Presence", d: "We test the website, connect the agreed domain, and provide the agreed handover and support." },
];

const WHY = [
  { t: "Premium Design", d: "A professional website that reflects the quality of your work." },
  { t: "Clear Pricing", d: "A clear, personalized quote based on your pages, features, and goals — agreed before you commit." },
  { t: "Connected Tools", d: "Optional CRM, booking, and lead-management workflows." },
  { t: "Personal Support", d: "A practical digital partner who can help with implementation and ongoing needs." },
];

const WEBSITE_INCLUDES = [
  "Premium customized website design",
  "Mobile-responsive layout",
  "Homepage and agreed core service pages",
  "Services and service-area content",
  "Click-to-call and quote-request form",
  "Basic on-page SEO setup",
  "Domain connection assistance",
  "Pre-launch quality assurance",
  "Defined revision rounds",
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="px-6 pt-16 md:pt-24 pb-16">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-[1fr_1.15fr] gap-12 items-center">
          <div>
            <span className="section-label">Digital Solutions for the Trades</span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05] mb-6">
              Your Trade Business Deserves a <span className="text-gradient">Better Website.</span>
            </h1>
            <p className={`text-lg ${muted} mb-8 max-w-[560px]`}>
              We build premium, professionally customized websites for plumbers, electricians, HVAC companies, roofers, and contractors — with optional CRM, booking, and lead-management tools to help you run your business online.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <Link to="/contact" className="btn-primary">Get my free website preview →</Link>
              <Link to="/website-designs" className="btn-secondary">Explore Website Designs</Link>
            </div>
            <p className="text-sm text-[rgba(255,255,255,0.5)]">Free personalized preview. No obligation. A clear quote tailored to your project.</p>
          </div>
          <img src={heroMockup} alt="Premium plumbing company website shown on a laptop and phone" width={1600} height={1056} className="w-full rounded-xl" />
        </div>
      </section>

      {/* GALLERY */}
      <section className="px-6 py-20 border-t border-[rgba(255,255,255,0.06)]">
        <div className="max-w-[1280px] mx-auto">
          <div className="max-w-[700px] mb-10">
            <span className="section-label">Website Designs</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.02em] mb-3">Designed for the Work You Do.</h2>
            <p className={muted}>Your website should reflect the quality of your work. Explore professional designs tailored to your industry.</p>
          </div>
          <DesignGallery />
        </div>
      </section>

      {/* CORE OFFER */}
      <section className="px-6 py-20 border-t border-[rgba(255,255,255,0.06)]">
        <div className="max-w-[1100px] mx-auto glass-card p-8 md:p-12 grid md:grid-cols-2 gap-10">
          <div>
            <span className="section-label">Core Package</span>
            <h2 className="text-3xl font-extrabold mb-2">{PACKAGES.website.name}</h2>
            <p className="text-2xl font-bold mb-1">Built for your business. Quoted for your scope.</p>
            <p className={`${muted} my-5`}>Get a professional online presence designed around your trade, your services, and your business.</p>
            <p className="text-sm text-[rgba(255,255,255,0.75)] mb-6">
              <strong>Free preview first.</strong> We build a personalized preview before you pay — you don&apos;t pay for a website you don&apos;t approve.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">Get my free website preview →</Link>
              <Link to="/website-designs" className="btn-secondary">View Website Designs</Link>
            </div>
          </div>
          <div>
            <ul className="space-y-2.5 mb-5">
              {WEBSITE_INCLUDES.map((i) => <li key={i} className="text-sm flex gap-2"><span className="text-[#3978F6]">✓</span>{i}</li>)}
            </ul>
            <p className="text-xs text-[rgba(255,255,255,0.45)]">
              Exact page count and deliverables are confirmed before purchase. Hosting, ongoing SEO, paid advertising, extensive content writing, advanced integrations and custom development are not included and may require a separate quote.
            </p>
          </div>
        </div>
      </section>

      {/* UPSELLS */}
      <section className="px-6 py-20 border-t border-[rgba(255,255,255,0.06)]">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-6">
          <div className="glass-card p-8">
            <span className="section-label">Website + CRM</span>
            <h2 className="text-2xl font-extrabold mb-3">Your Website Is Just the Beginning.</h2>
            <p className={`${muted} mb-4`}>Connect your website to a system that helps you organize incoming inquiries, manage contacts, and stay on top of customer follow-up.</p>
            <p className="font-bold mb-6">One custom quote for your website and CRM setup</p>
            <Link to="/pricing" className="btn-secondary text-sm">Explore Website + CRM →</Link>
          </div>
          <div className="glass-card p-8">
            <span className="section-label">White-Glove</span>
            <h2 className="text-2xl font-extrabold mb-3">We Handle the Setup. You Focus on the Work.</h2>
            <p className={`${muted} mb-4`}>From your website to your lead-management workflow, we help configure the pieces so your digital setup is ready to use.</p>
            <p className="font-bold mb-6">A custom quote for your complete digital setup</p>
            <Link to="/contact" className="btn-secondary text-sm">Request White-Glove Setup →</Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-20 border-t border-[rgba(255,255,255,0.06)]">
        <div className="max-w-[1200px] mx-auto">
          <span className="section-label">How It Works</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.02em] mb-10">Four Simple Steps.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {STEPS.map((s, i) => (
              <div key={s.t} className="glass-card p-6">
                <p className="font-mono text-xs text-[#3978F6] mb-3">STEP {i + 1}</p>
                <h3 className="font-bold mb-2">{s.t}</h3>
                <p className={`text-sm ${muted}`}>{s.d}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-[rgba(255,255,255,0.45)] mb-6">Timelines depend on receiving the necessary information, content, approvals, and access.</p>
          <Link to="/contact" className="btn-primary">Get my free website preview →</Link>
        </div>
      </section>

      {/* WHY */}
      <section className="px-6 py-20 border-t border-[rgba(255,255,255,0.06)]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.02em] mb-10 max-w-[760px]">Premium Digital Solutions. Without the Traditional Agency Complexity.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY.map((w) => (
              <div key={w.t} className="border-t-2 border-[#3978F6] pt-5">
                <h3 className="font-bold uppercase tracking-wide text-sm mb-2">{w.t}</h3>
                <p className={`text-sm ${muted}`}>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 border-t border-[rgba(255,255,255,0.06)] text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready for a Better Website?</h2>
        <p className={`${muted} mb-8 max-w-[560px] mx-auto`}>Tell us about your business and we&apos;ll build your free, personalized preview.</p>
        <Link to="/contact" className="btn-primary">Get my free website preview →</Link>
      </section>
    </>
  );
}
