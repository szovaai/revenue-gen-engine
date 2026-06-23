import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useReveal } from "@/lib/use-reveal";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Process — ClickAdMedia" },
      {
        name: "description",
        content: "From nothing to live in 48 hours. Here's exactly how we get your website online.",
      },
    ],
  }),
  component: ProcessPage,
});

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc:
      "You tell us about your business — or we find you on Google Maps. We research your niche, check out your competitors, and plan a site that actually wins customers.",
    detail: "Takes 1 day",
  },
  {
    num: "02",
    title: "Design & Build",
    desc:
      "We design your custom site using battle-tested templates built specifically for your industry. Plumber sites look like plumber sites. Dentist sites look like dentist sites. No cookie-cutter garbage.",
    detail: "Takes 2-3 days",
  },
  {
    num: "03",
    title: "Your Review",
    desc:
      "You get a live preview link. Review it, request changes, or approve it on the spot. One round of revisions is included. Most clients approve on the first pass.",
    detail: "Takes 1 day",
  },
  {
    num: "04",
    title: "Go Live",
    desc:
      "We connect your domain, set up hosting, and launch your site. You get a 5-page website that looks like you spent $5,000 — for $500. Done.",
    detail: "Same day",
  },
];

const faqs = [
  {
    q: "What do you need from me to get started?",
    a: "Just your business name, phone number, and a few photos if you have them. We handle the rest — copy, design, and setup.",
  },
  {
    q: "How is this different from Wix or Squarespace?",
    a: "We do it for you. No dragging and dropping. No learning curves. You get a custom site built by pros who know what converts for your specific industry.",
  },
  {
    q: "What happens after my site goes live?",
    a: "You own it. You can leave it as-is or sign up for our $97/month Care Plan and we handle hosting, updates, and edits for you.",
  },
  {
    q: "Do you write the content too?",
    a: "Yes. We write all the copy for your site based on what works best for your industry. You can request changes during the review phase.",
  },
  {
    q: "Will my site show up on Google?",
    a: "Every site we build includes basic SEO setup — meta tags, schema markup, fast loading, and mobile optimization. For ranking higher, our $297/month Growth plan includes full local SEO.",
  },
  {
    q: "Can I update the site myself?",
    a: "Yes, if you want to. We build on WordPress so you have full control. Or just email us changes and we handle them with the Care Plan.",
  },
  {
    q: "What if my business type isn't listed?",
    a: "We can build for any local service business. The niches listed are our specialties, but we've done everything from dog trainers to funeral homes. Just ask.",
  },
];

function ProcessPage() {
  const timelineRef = useReveal<HTMLElement>();
  const faqRef = useReveal<HTMLElement>();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-[1280px] mx-auto text-center">
          <span className="section-label">How It Works</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.02em] mb-4">
            From Nothing to <span className="text-gradient">Live in 48 Hours.</span>
          </h1>
          <p className="text-[rgba(255,255,255,0.55)] text-lg max-w-[550px] mx-auto">
            Simple, fast, and built for results. Here&apos;s exactly how we get your website online.
          </p>
        </div>
      </section>

      <section ref={timelineRef} className="px-6 pb-16">
        <div className="max-w-[800px] mx-auto">
          <div className="relative">
            <div
              className="absolute left-[27px] md:left-[31px] top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(to bottom, #007bff, #00c6ff)" }}
            />
            <div className="space-y-10">
              {steps.map((s, i) => (
                <div
                  key={s.num}
                  className={`reveal reveal-delay-${(i % 2) + 1} relative flex gap-6`}
                >
                  <div
                    className="w-14 h-14 shrink-0 rounded-full flex items-center justify-center text-lg font-bold relative z-10"
                    style={{ background: "var(--cam-gradient)", boxShadow: "var(--cam-glow)" }}
                  >
                    {s.num}
                  </div>
                  <div className="glass-card p-6 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{s.title}</h3>
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider"
                        style={{ background: "rgba(0,123,255,0.1)", color: "#007bff" }}
                      >
                        {s.detail}
                      </span>
                    </div>
                    <p className="text-sm text-[rgba(255,255,255,0.6)] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={faqRef} className="relative px-6 pb-24">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #007bff, #00c6ff, transparent)",
          }}
        />
        <div className="max-w-[700px] mx-auto">
          <h2 className="reveal text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-center mb-10">
            Common Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={f.q} className="reveal glass-card overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-[15px] pr-4">{f.q}</span>
                  <span
                    className={`text-lg text-[rgba(255,255,255,0.4)] transition-transform shrink-0 ${
                      openFaq === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-5 pb-5 text-sm text-[rgba(255,255,255,0.6)] leading-relaxed">
                    {f.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #007bff, #00c6ff, transparent)",
          }}
        />
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-[-0.02em] mb-4">
            Sounds Simple? It Is.
          </h2>
          <p className="text-[rgba(255,255,255,0.55)] mb-6">
            Let&apos;s get your site started. Book a free 10-minute call or text us.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/book-a-call" className="btn-primary">
              Book a 10-Min Call →
            </Link>
            <a href="tel:5551234567" className="btn-secondary">
              Call (555) 123-4567
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
