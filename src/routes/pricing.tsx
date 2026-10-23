import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useStripeCheckout } from "@/hooks/use-stripe-checkout";
import { useAuth } from "@/hooks/use-auth";
import { PACKAGES } from "@/lib/packages";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Website Packages & Custom Quotes | ClickAdMedia" },
      { name: "description", content: "Custom-quoted websites and digital setup for trades. Free personalized preview first. Optional Website Care $49 CAD/mo and CRM from $99 CAD/mo." },
      { property: "og:title", content: "ClickAdMedia Pricing" },
      { property: "og:description", content: "A website quote tailored to your scope, with a free preview before you commit. Optional care and CRM plans in CAD." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});

const muted = "text-[rgba(255,255,255,0.62)]";

function List({ items }: { items: string[] }) {
  return <ul className="space-y-2 mb-6 flex-1">{items.map((i) => <li key={i} className="text-sm flex gap-2"><span className="text-[#3978F6]">✓</span>{i}</li>)}</ul>;
}

function PricingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { openCheckout, closeCheckout, isOpen, checkoutElement } = useStripeCheckout();

  const buy = (priceId: string) => {
    if (!user) {
      navigate({ to: "/auth", search: { next: "/pricing" } as never });
      return;
    }
    openCheckout({
      priceId,
      customerEmail: user.email,
      userId: user.id,
      returnUrl: `${window.location.origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
    });
  };

  return (
    <>
      <section className="pt-24 pb-12 px-6 text-center">
        <span className="section-label">Pricing</span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-[-0.02em] mb-4">The Right Website. A Quote Built Around You.</h1>
        <p className={`${muted} text-lg max-w-[640px] mx-auto`}>Every project is different. Your quote reflects the pages, features, and support you need. Start with a free, personalized preview — you don&apos;t pay for a website you don&apos;t approve.</p>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-3 gap-6">
          <div className="glass-card p-8 flex flex-col border-2 !border-[#3978F6]">
            <span className="section-label">Your Website Starts Here</span>
            <h2 className="text-2xl font-extrabold">{PACKAGES.website.name}</h2>
            <p className="text-3xl font-extrabold my-3">Custom quote</p>
            <p className={`text-sm ${muted} mb-4`}>See your free preview first. We confirm your scope and quote before you commit.</p>
            <List items={["Premium customized design", "Mobile-responsive layout", "Homepage + agreed core service pages", "Services & service-area content", "Click-to-call + quote form", "Basic on-page SEO", "Domain connection assistance", "Pre-launch QA + defined revisions"]} />
            <Link to="/contact" className="btn-primary text-center">Get my free website preview →</Link>
          </div>
          <div className="glass-card p-8 flex flex-col">
            <span className="section-label">Website + CRM</span>
            <h2 className="text-2xl font-extrabold">{PACKAGES.crm.name}</h2>
            <p className="text-4xl font-extrabold my-3">$99 <span className="text-base font-semibold text-[rgba(255,255,255,0.5)]">CAD/month and up</span></p>
            <p className="text-xs text-[rgba(255,255,255,0.5)] mb-4">Website setup is custom-quoted separately. Monthly CRM pricing is confirmed for your needs.</p>
            <List items={["Everything in Premium Trade Website", "Website forms connected to Leadstack CRM", "Centralized lead & contact management", "Estimate or appointment request workflows", "Configured lead notifications", "Website care per plan", "Basic support for the integrated system"]} />
            <Link to="/contact" className="btn-secondary text-center">Get a Website + CRM Quote →</Link>
          </div>
          <div className="glass-card p-8 flex flex-col">
            <span className="section-label">White-Glove</span>
            <h2 className="text-2xl font-extrabold">{PACKAGES.whiteGlove.name}</h2>
            <p className="text-3xl font-extrabold my-3">Custom quote</p>
            <p className="text-xs text-[rgba(255,255,255,0.5)] mb-4">Includes your website and agreed digital setup. One clear quote based on the full scope.</p>
            <List items={["Consultation & requirements gathering", "Website customization and launch", "CRM configuration & lead pipeline", "Booking / estimate-request setup", "Supported integrations & notifications", "Guided onboarding, training & handover"]} />
            <Link to="/contact" className="btn-secondary text-center">Request White-Glove Setup →</Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-extrabold mb-6">Ongoing Plans</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-8 flex flex-col">
              <h3 className="text-xl font-bold">Website Care — $49 CAD/month</h3>
              <p className={`text-sm ${muted} my-3`}>Website-only maintenance.</p>
              <List items={["Hosting or hosting coordination", "Routine maintenance", "Basic technical monitoring", "Allowance for minor content edits", "Support for common website issues"]} />
              <button onClick={() => buy(PACKAGES.care.priceId)} className="btn-secondary text-center">Add Website Care →</button>
            </div>
            <div className="glass-card p-8 flex flex-col">
              <h3 className="text-xl font-bold">Website + CRM — from $99 CAD/month</h3>
              <p className={`text-sm ${muted} my-3`}>Website care plus lead management. Website setup is custom-quoted separately.</p>
              <List items={["Website care as specified in the plan", "Leadstack CRM access", "Lead capture and organization", "Configured booking or estimate workflows", "Defined support allowance"]} />
              <button onClick={() => buy(PACKAGES.crm.priceId)} className="btn-secondary text-center">Start Website + CRM →</button>
            </div>
          </div>
          <p className="text-xs text-[rgba(255,255,255,0.45)] mt-6">
            Plans don&apos;t include unlimited support, unlimited messaging or every CRM feature. Extra functionality, extensive content creation, advanced integrations and custom development may need a separate quote.
          </p>
          {!user && <p className="text-xs text-[rgba(255,255,255,0.45)] mt-2">You&apos;ll be asked to sign in first so we can link your purchase to your account.</p>}
        </div>
      </section>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="min-h-screen flex items-start justify-center p-4 pt-10">
            <div className="bg-white rounded-lg w-full max-w-2xl relative">
              <button onClick={closeCheckout} className="absolute -top-10 right-0 text-white text-sm hover:underline">← Cancel</button>
              {checkoutElement}
            </div>
          </div>
        </div>
      )}

      <section className="px-6 pb-16">
        <div className="max-w-[1200px] mx-auto glass-card p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="section-label">Add-on</span>
            <h2 className="text-2xl font-bold">AI Receptionist</h2>
            <p className={`text-sm ${muted}`}>$299 CAD one-time setup + $199 CAD/month.</p>
          </div>
          <Link to="/services/ai-receptionist" className="btn-secondary whitespace-nowrap">Learn More →</Link>
        </div>
      </section>

      <section className="py-20 px-6 text-center">
        <h2 className="text-2xl font-bold mb-3">See What We Can Build for Your Business.</h2>
        <p className={`${muted} mb-6`}>Tell us your trade, services, and goals. We&apos;ll recommend the right scope and create your free website preview. No obligation.</p>
        <Link to="/contact" className="btn-primary">Get my free website preview →</Link>
      </section>
    </>
  );
}
