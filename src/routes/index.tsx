import { createFileRoute, Link } from "@tanstack/react-router";
import { camHeroVideo, portfolioImg } from "@/lib/cam-assets";
import { useReveal } from "@/lib/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ClickAdMedia — Websites, SEO & Paid Ads for Contractors" },
      {
        name: "description",
        content:
          "$500 flat. Live in 48 hours. No contract. Websites, SEO, and paid ads built for contractors and home service businesses.",
      },
      { property: "og:title", content: "ClickAdMedia — Websites, SEO & Paid Ads for Contractors" },
      {
        property: "og:description",
        content: "$500 flat. Live in 48 hours. No contract.",
      },
    ],
  }),
  component: HomePage,
});

const delays = ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3"];

function HeroVideoBg() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.7)" }}
      >
        <source src={camHeroVideo} type="video/mp4" />
      </video>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,22,40,0.3) 0%, rgba(10,22,40,0.5) 50%, rgba(10,22,40,0.85) 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{ background: "linear-gradient(to top, var(--cam-bg), transparent)" }}
      />
    </div>
  );
}

function HomePage() {
  const painRef = useReveal<HTMLElement>();
  const solutionRef = useReveal<HTMLElement>();
  const proofRef = useReveal<HTMLElement>();
  const nicheRef = useReveal<HTMLElement>();
  const howRef = useReveal<HTMLElement>();
  const priceRef = useReveal<HTMLElement>();
  const objRef = useReveal<HTMLElement>();
  const urgentRef = useReveal<HTMLElement>();
  const ctaRef = useReveal<HTMLElement>();

  const niches = [
    { label: "Plumber", img: portfolioImg.plumber },
    { label: "Roofer", img: portfolioImg.roofer },
    { label: "HVAC", img: portfolioImg.hvac },
    { label: "Electrician", img: portfolioImg.electrician },
    { label: "Cleaner", img: portfolioImg.cleaner },
    { label: "Contractor", img: portfolioImg.contractor },
  ];

  return (
    <>
      <section className="relative min-h-screen flex items-end overflow-hidden pt-[84px] md:pt-[100px] pb-20">
        <HeroVideoBg />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 w-full">
          <div className="max-w-[640px]">
            <div className="hero-fade-in" style={{ animationDelay: "0.5s" }}>
              <span className="label-tag text-gradient mb-4 block">
                Websites for Contractors &amp; Home Service Businesses
              </span>
            </div>
            <h1
              className="hero-fade-in text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-[-0.02em] leading-[1.05] mb-5"
              style={{ animationDelay: "0.7s", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
            >
              Websites, SEO &amp; Paid Ads.
              <br />
              <span className="text-gradient">Built for Contractors.</span>
            </h1>
            <p
              className="hero-fade-in text-base lg:text-lg text-[rgba(255,255,255,0.7)] max-w-[480px] mb-6 leading-relaxed"
              style={{ animationDelay: "0.9s", textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}
            >
              $500 flat. Live in 48 hours. No contract. We handle everything so you can handle the
              jobs.
            </p>
            <div
              className="hero-fade-in flex flex-col sm:flex-row gap-3 mb-4"
              style={{ animationDelay: "1.1s" }}
            >
              <Link to="/book-a-call" className="btn-primary text-center">
                See Your Free Preview &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section ref={painRef} className="relative py-24 md:py-32 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="reveal text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] leading-[1.1] mb-6">
            Every Day Without a Website, You Lose{" "}
            <span className="text-gradient">3-5 Jobs.</span>
          </h2>
          <p className="reveal reveal-delay-1 text-lg text-[rgba(255,255,255,0.6)] leading-relaxed mb-8">
            A homeowner&apos;s pipe bursts. They grab their phone. They search &ldquo;emergency
            plumber near me.&rdquo; They see 10 results. They click the ones with a website. Yours
            isn&apos;t there.
          </p>
          <p className="reveal reveal-delay-2 text-xl text-white font-bold mb-8">
            Your competitor gets the call. You get nothing.
          </p>
          <div className="reveal reveal-delay-2 glass-card p-6 inline-block">
            <p className="text-sm text-[rgba(255,255,255,0.5)]">
              That&apos;s not a marketing problem. That&apos;s a{" "}
              <span className="text-[#007bff] font-bold">revenue leak.</span>
            </p>
          </div>
        </div>
      </section>

      <section ref={solutionRef} className="relative py-24 md:py-32 px-6">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #007bff, #00c6ff, transparent)",
          }}
        />
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <span className="section-label reveal">We Fix the Leak, Fast</span>
            <h2 className="reveal reveal-delay-1 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] mb-3">
              Three Ways to Work With Us.
              <br />
              <span className="text-gradient">Pick Your Speed.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🖥️",
                title: "Website Design",
                price: "$500 flat",
                desc: "Live in 48 hours. A site built for your trade, not some generic template.",
                cta: "Get Your Preview →",
                to: "/services/website-design" as const,
              },
              {
                icon: "🔍",
                title: "SEO",
                price: "$297/mo",
                desc: '"Plumber near me" = your name at the top.',
                cta: "Get Free SEO Audit →",
                to: "/services/seo" as const,
              },
              {
                icon: "🎯",
                title: "Paid Ads",
                price: "20% of spend",
                desc: "Google Ads + Facebook retargeting. We manage it all. You answer the phone.",
                cta: "Get Ad Strategy Call →",
                to: "/services/paid-ads" as const,
              },
            ].map((s, i) => (
              <div
                key={s.title}
                className={`reveal ${delays[i]} glass-card p-8 relative overflow-hidden`}
              >
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
          <div
            className="reveal mt-10 glass-card p-8 text-center relative overflow-hidden"
            style={{ border: "1px solid rgba(0,123,255,0.3)" }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ background: "var(--cam-gradient)" }}
            />
            <h3 className="text-xl font-bold mb-2">
              The Dominate Package - All Three, One Price
            </h3>
            <p className="text-[rgba(255,255,255,0.6)] mb-4">
              Website + SEO + Paid Ads for{" "}
              <span className="text-gradient font-bold">$997/month</span>. Dedicated account
              manager. Monthly strategy calls. We handle everything. You handle the jobs.
            </p>
            <Link to="/pricing" className="btn-primary text-sm">
              See Full Pricing &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section ref={proofRef} className="relative py-24 md:py-32 px-6">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #007bff, #00c6ff, transparent)",
          }}
        />
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <span className="section-label reveal">The Data Doesn&apos;t Lie</span>
            <h2 className="reveal reveal-delay-1 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em]">
              Homeowners Are Searching.
              <br />
              <span className="text-gradient">Will They Find You?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              {
                stat: "89%",
                desc: "of homeowners search for contractors online before making a hiring decision.",
                source: "NKBA Consumer Survey, 2025",
                color: "#007bff",
              },
              {
                stat: "76%",
                desc: "of people who perform a local search visit a business within 24 hours.",
                source: "Google / Think with Google",
                color: "#00c6ff",
              },
              {
                stat: "46%",
                desc: "of ALL Google searches have local intent.",
                source: "Google Local Search Data",
                color: "#007bff",
              },
            ].map((s, i) => (
              <div
                key={i}
                className={`reveal ${delays[i]} glass-card p-8 text-center relative overflow-hidden`}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{
                    background: `linear-gradient(90deg, ${s.color}, transparent)`,
                  }}
                />
                <div
                  className="text-5xl md:text-6xl font-extrabold mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${s.color}, #fff)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.stat}
                </div>
                <p className="text-[rgba(255,255,255,0.75)] leading-relaxed mb-3 text-[15px]">
                  {s.desc}
                </p>
                <p className="text-[11px] text-[rgba(255,255,255,0.35)] uppercase tracking-wider">
                  {s.source}
                </p>
              </div>
            ))}
          </div>

          <div className="reveal glass-card p-8 mb-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  num: "91%",
                  label: "of homeowners read online reviews before hiring a contractor",
                  src: "BrightLocal, 2025",
                },
                { num: "42%", label: "of contractor leads come from page 1 of Google", src: "BrightLocal" },
                { num: "73%", label: 'of contractor searches include "near me" keywords', src: "Google, 2025" },
                {
                  num: "88%",
                  label: "of smartphone local searchers call or visit within 24 hours",
                  src: "Google Mobile Data",
                },
              ].map((s, i) => (
                <div key={i} className="text-center sm:text-left">
                  <div className="text-2xl font-extrabold text-gradient mb-1">{s.num}</div>
                  <p className="text-xs text-[rgba(255,255,255,0.6)] leading-relaxed mb-1">
                    {s.label}
                  </p>
                  <p className="text-[10px] text-[rgba(255,255,255,0.35)]">{s.src}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="reveal reveal-delay-1 glass-card p-6 text-center relative overflow-hidden"
            style={{ border: "1px solid rgba(0,123,255,0.25)" }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ background: "var(--cam-gradient)" }}
            />
            <p className="text-lg text-white font-bold mb-2">The Bottom Line</p>
            <p className="text-[rgba(255,255,255,0.7)] text-[15px] leading-relaxed max-w-[700px] mx-auto">
              If you don&apos;t have a professional website,{" "}
              <span className="text-[#007bff] font-bold">
                89% of homeowners never even consider you.
              </span>{" "}
              A $500 website isn&apos;t an expense - it&apos;s the difference between getting the
              call or watching your competitor drive away in their truck.
            </p>
          </div>

          <div className="text-center mt-8 reveal">
            <Link to="/portfolio" className="btn-secondary">
              See Websites We Build &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section ref={nicheRef} className="relative py-24 md:py-32 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <span className="section-label reveal">Pick Your Trade</span>
            <h2 className="reveal reveal-delay-1 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] mb-3">
              See Your Demo. <span className="text-gradient">Get Your Site.</span>
            </h2>
            <p className="reveal reveal-delay-2 text-[rgba(255,255,255,0.55)]">
              We don&apos;t do generic. We build plumber sites for plumbers. Roofer sites for
              roofers.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {niches.map((n, i) => (
              <Link
                key={n.label}
                to="/portfolio"
                className={`reveal ${delays[i % 3]} glass-card p-6 flex items-center gap-4 group cursor-pointer`}
              >
                <img
                  src={n.img}
                  alt={n.label}
                  className="w-20 h-14 object-cover"
                  style={{ borderRadius: "var(--cam-radius-badge)" }}
                />
                <div className="flex-1">
                  <div className="font-bold text-[15px]">{n.label}</div>
                  <div className="text-xs text-[rgba(255,255,255,0.45)]">View Demo</div>
                </div>
                <span className="text-lg text-[rgba(255,255,255,0.3)] group-hover:text-[#007bff] transition-colors">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section ref={howRef} className="relative py-24 md:py-32 px-6">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #007bff, #00c6ff, transparent)",
          }}
        />
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-14">
            <span className="section-label reveal">How It Works</span>
            <h2 className="reveal reveal-delay-1 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em]">
              From Invisible to <span className="text-gradient">Booked in 3 Steps</span>
            </h2>
          </div>
          <div className="relative">
            <div
              className="hidden md:block absolute top-[28px] left-[16%] right-[16%] h-px"
              style={{ background: "linear-gradient(90deg, #007bff, #00c6ff)" }}
            />
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  num: "1",
                  title: "We Find You",
                  desc:
                    "We scan Google Maps for contractors like yours. No website? Bad website? We found you - and we know exactly what you're losing.",
                },
                {
                  num: "2",
                  title: "We Build It",
                  desc:
                    "A custom site for your trade. Mobile-first. Click-to-call. Before/after gallery. Reviews. Built to convert visitors into calls.",
                },
                {
                  num: "3",
                  title: "You Go Live",
                  desc:
                    "$500 flat. No contract. Want us to maintain it? $97/month. Want SEO? $297/month. Want ads? $997/month. You control the speed.",
                },
              ].map((step, i) => (
                <div key={step.num} className={`reveal ${delays[i]} text-center`}>
                  <div
                    className="w-14 h-14 mx-auto mb-5 flex items-center justify-center text-xl font-bold relative z-10"
                    style={{
                      background: "var(--cam-gradient)",
                      boxShadow: "var(--cam-glow)",
                      borderRadius: "50%",
                    }}
                  >
                    {step.num}
                  </div>
                  <div className="glass-card p-6 text-left">
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-[rgba(255,255,255,0.6)] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={priceRef} className="relative py-24 md:py-32 px-6">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #007bff, #00c6ff, transparent)",
          }}
        />
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <span className="section-label reveal">Start Small, Scale Fast</span>
            <h2 className="reveal reveal-delay-1 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] mb-3">
              Most Agencies Want a <span className="text-gradient">$5,000 Contract.</span>
              <br />
              We Don&apos;t.
            </h2>
            <p className="reveal reveal-delay-2 text-[rgba(255,255,255,0.55)]">
              Start with a $500 site. See it work. Then grow.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Starter",
                price: "$500",
                period: "one-time",
                desc: "Site only. 5 pages. Live in 48 hours. You own it.",
                cta: "Get Preview →",
                to: "/services/website-design" as const,
              },
              {
                name: "Growth",
                price: "$297",
                period: "/mo",
                desc: "+ Local SEO. Rank when customers search. Monthly content.",
                cta: "Learn More →",
                to: "/services/seo" as const,
              },
              {
                name: "Dominate",
                price: "$997",
                period: "/mo",
                desc: "+ SEO + Paid Ads. Dedicated manager. Weekly calls.",
                cta: "Book Call →",
                to: "/book-a-call" as const,
              },
            ].map((p, i) => (
              <div key={p.name} className={`reveal ${delays[i]} glass-card p-8 text-center`}>
                <h3 className="text-lg font-bold mb-1">{p.name}</h3>
                <div className="text-4xl font-extrabold text-gradient mb-1">
                  {p.price}
                  <span className="text-base font-normal text-[rgba(255,255,255,0.4)]">
                    {p.period}
                  </span>
                </div>
                <p className="text-sm text-[rgba(255,255,255,0.55)] mb-6">{p.desc}</p>
                <Link
                  to={p.to}
                  className="text-sm text-[#007bff] hover:text-[#00c6ff] font-medium transition-colors"
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 reveal">
            <Link to="/pricing" className="btn-secondary">
              See Full Pricing Details &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section ref={objRef} className="relative py-24 md:py-32 px-6">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #007bff, #00c6ff, transparent)",
          }}
        />
        <div className="max-w-[800px] mx-auto">
          <h2 className="reveal text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-center mb-12">
            Still on the Fence? <span className="text-gradient">We Get It.</span>
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "\u201CWhat if I don\u2019t like it?\u201D",
                a: "Then we fix it. No charge. We revise until you\u2019re proud to send customers to it.",
              },
              {
                q: "\u201CWhat if I already have a site?\u201D",
                a: "We\u2019ll audit it free. If it\u2019s good, we\u2019ll tell you. If it\u2019s broken, we\u2019ll show you exactly why - and fix it.",
              },
              {
                q: "\u201CWhat if I\u2019m too busy?\u201D",
                a: "That\u2019s the point. We handle everything. You don\u2019t touch code. You don\u2019t write copy. You answer the phone.",
              },
            ].map((item, i) => (
              <div key={i} className={`reveal ${delays[i]} glass-card p-6`}>
                <h4 className="font-bold text-lg mb-2 text-gradient">{item.q}</h4>
                <p className="text-[rgba(255,255,255,0.65)] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={urgentRef} className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,100,0,0.06) 0%, rgba(0,123,255,0.03) 40%, transparent 70%)",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #007bff, #00c6ff, transparent)",
          }}
        />
        <div className="relative z-10 max-w-[700px] mx-auto text-center">
          <span className="section-label reveal">Storm Season Is Coming</span>
          <h2 className="reveal reveal-delay-1 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] leading-[1.1] mb-5">
            When the Hail Hits, Homeowners{" "}
            <span className="text-gradient">Panic-Search.</span>
            <br />
            Will You Show Up?
          </h2>
          <p className="reveal reveal-delay-2 text-lg text-[rgba(255,255,255,0.6)] mb-8">
            The contractors with websites get flooded with calls. The ones without? They watch from
            the sidelines.
          </p>
          <div className="reveal reveal-delay-3">
            <Link
              to="/book-a-call"
              className="btn-primary text-lg px-10 py-5 inline-block"
              style={{ boxShadow: "0 0 60px rgba(0,123,255,0.25)" }}
            >
              Get Your Free Preview &rarr;
            </Link>
          </div>
          <p className="reveal reveal-delay-3 text-sm text-[rgba(255,255,255,0.35)] mt-4">
            Text &ldquo;WEBSITE&rdquo; to (555) 123-4567
          </p>
        </div>
      </section>

      <section ref={ctaRef} className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0,123,255,0.08) 0%, rgba(0,198,255,0.04) 40%, transparent 70%)",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #007bff, #00c6ff, transparent)",
          }}
        />
        <div className="relative z-10 max-w-[700px] mx-auto text-center">
          <h2 className="reveal text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] leading-[1.1] mb-5">
            Stop Losing Jobs to Your <span className="text-gradient">Competitor.</span>
          </h2>
          <p className="reveal reveal-delay-1 text-lg text-[rgba(255,255,255,0.55)] mb-8">
            Get your free site preview in 24 hours. No obligation. No credit card. Just proof.
          </p>
          <div className="reveal reveal-delay-2 mb-5">
            <Link
              to="/book-a-call"
              className="btn-primary text-lg px-12 py-5 inline-block"
              style={{ boxShadow: "0 0 80px rgba(0,123,255,0.25)" }}
            >
              Get Your Free Preview &rarr;
            </Link>
          </div>
          <p className="reveal reveal-delay-2 text-sm text-[rgba(255,255,255,0.35)] mb-5">
            Or call/text: <span className="text-[rgba(255,255,255,0.6)]">(555) 123-4567</span>
          </p>
          <div className="reveal reveal-delay-3 flex flex-wrap justify-center gap-5 text-xs text-[rgba(255,255,255,0.4)]">
            <span>48-hour delivery</span>
            <span>100% ownership</span>
            <span>No contract required</span>
          </div>
        </div>
      </section>
    </>
  );
}
