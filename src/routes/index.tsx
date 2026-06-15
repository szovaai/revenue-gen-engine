import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ClickAdMedia — AI Genetic Marketing for Small Businesses (Coming Soon)" },
      {
        name: "description",
        content:
          "ClickAdMedia uses AI agents to decode your best-performing marketing, replicate it across every channel, and evolve it automatically. Join the waitlist.",
      },
      {
        property: "og:title",
        content: "ClickAdMedia — AI Genetic Marketing for Small Businesses (Coming Soon)",
      },
      {
        property: "og:description",
        content:
          "AI agents that decode, replicate, and evolve what's working in your marketing — automatically. Get early access.",
      },
      { property: "og:url", content: "https://clickadmedia.co/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://clickadmedia.co/" }],
  }),
  component: WaitlistPage,
});

// ---------- Reveal-on-scroll wrapper (no JS lib) ----------
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.transitionDelay = `${delay}ms`;
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`cam-reveal ${className}`}>
      {children}
    </div>
  );
}

// ---------- Page ----------
function WaitlistPage() {
  return (
    <div
      className="min-h-dvh w-full"
      style={{ background: "var(--color-ink)", fontFamily: "var(--font-sans)" }}
    >
      <TopBar />
      <Hero />
      <HowItWorks />
      <WhoItsFor />
      <SecondCTA />
      <Footer />
    </div>
  );
}

// ---------- Top bar ----------
function TopBar() {
  return (
    <header
      className="sticky top-0 z-50 flex h-16 items-center justify-between border-b px-4 sm:px-8"
      style={{
        background: "var(--color-ink)",
        borderColor: "var(--color-border-soft)",
      }}
    >
      <a href="#waitlist" className="text-lg font-bold tracking-tight text-white">
        Click<span className="font-bold">Ad</span>
        <span className="cam-text-gradient">Media</span>
      </a>
      <div
        className="flex items-center gap-2 rounded-full border px-3 py-1.5"
        style={{
          borderColor: "var(--color-border-soft)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <span
          aria-hidden="true"
          className="cam-pulse inline-block h-2 w-2 rounded-full"
          style={{ background: "#00B4FF", boxShadow: "0 0 8px #00B4FF" }}
        />
        <span
          className="text-[11px] font-bold uppercase"
          style={{
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.2em",
            color: "var(--color-muted-soft)",
          }}
        >
          Repositioning in Progress
        </span>
      </div>
    </header>
  );
}

// ---------- Hero ----------
function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100dvh-64px)] items-center justify-center overflow-hidden px-4 py-20 sm:px-8">
      {/* Ambient radial glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,180,255,0.35), transparent 60%)",
            filter: "blur(60px)",
            opacity: 0.5,
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139,0,255,0.32), transparent 60%)",
            filter: "blur(70px)",
            opacity: 0.5,
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,229,160,0.18), transparent 65%)",
            filter: "blur(80px)",
            opacity: 0.35,
          }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-[820px] flex-col items-center text-center">
        {/* COMING SOON pill */}
        <div
          className="cam-fade-up cam-gradient-border relative inline-flex rounded-full"
          style={{ ["--cam-delay" as string]: "200ms" }}
        >
          <span
            className="rounded-full px-4 py-1.5 text-[12px] font-bold"
            style={{
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.25em",
              color: "var(--color-muted-soft)",
              background: "var(--color-ink)",
              boxShadow: "0 0 24px rgba(0,180,255,0.15)",
            }}
          >
            COMING SOON
          </span>
        </div>

        {/* H1 */}
        <h1
          className="cam-fade-up mt-8 font-bold leading-[1.05] tracking-tight text-white"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 7vw, 72px)",
            ["--cam-delay" as string]: "400ms",
          }}
        >
          Marketing isn&rsquo;t guesswork anymore.
          <br />
          It&rsquo;s <span className="cam-text-gradient">genetic.</span>
        </h1>

        {/* Subheadline */}
        <p
          className="cam-fade-up mx-auto mt-6 max-w-[600px] text-lg sm:text-xl"
          style={{
            color: "var(--color-muted-soft)",
            lineHeight: 1.55,
            ["--cam-delay" as string]: "600ms",
          }}
        >
          ClickAdMedia uses AI agents to decode your best-performing marketing,
          replicate it across every channel, and evolve it automatically &mdash;
          without you lifting a finger.
        </p>

        {/* Form */}
        <div className="mt-10 w-full max-w-[520px]">
          <WaitlistForm />
        </div>

        {/* Social proof */}
        <div
          className="cam-fade-up mt-8 flex items-center justify-center gap-3"
          style={{ ["--cam-delay" as string]: "1000ms" }}
        >
          <div className="flex -space-x-2">
            {[
              "linear-gradient(135deg,#00b4ff,#8b00ff)",
              "linear-gradient(135deg,#8b00ff,#00e5a0)",
              "linear-gradient(135deg,#00e5a0,#00b4ff)",
              "linear-gradient(135deg,#00b4ff,#0066ff)",
            ].map((bg, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="inline-block h-8 w-8 rounded-full ring-2"
                style={{ background: bg, ["--tw-ring-color" as string]: "var(--color-ink)" }}
              />
            ))}
          </div>
          <p className="text-sm" style={{ color: "var(--color-muted-soft)" }}>
            Join <span className="font-semibold text-white">200+ early access members</span>{" "}
            already on the list
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------- How It Works ----------
function HowItWorks() {
  const cards = [
    {
      title: "Decode What's Working",
      body:
        "Our AI agents analyze your existing marketing across every channel — ads, content, email — and extract the patterns driving real results.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#00B4FF" strokeWidth="1.6" strokeLinecap="round">
          <path d="M5 3c5 4 9 8 14 18" />
          <path d="M19 3c-5 4-9 8-14 18" />
          <path d="M7.5 7h9" />
          <path d="M6.5 11h11" />
          <path d="M6.5 15h11" />
          <path d="M7.5 19h9" />
        </svg>
      ),
      bg: "rgba(0,180,255,0.12)",
    },
    {
      title: "Replicate Across Every Channel",
      body:
        "Once we know your winning formula, we scale it — new ad variants, content formats, and campaigns built from your proven DNA.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#8B00FF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="8" y="8" width="12" height="12" rx="2" />
          <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
        </svg>
      ),
      bg: "rgba(139,0,255,0.12)",
    },
    {
      title: "Evolve Automatically",
      body:
        "AI agents monitor performance in real time, kill what's not working, and optimize what is — without you managing a single dashboard.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="url(#cam-grad)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            <linearGradient id="cam-grad" x1="0" y1="24" x2="24" y2="0">
              <stop offset="0%" stopColor="#00B4FF" />
              <stop offset="100%" stopColor="#8B00FF" />
            </linearGradient>
          </defs>
          <polyline points="3 17 9 11 13 15 21 7" />
          <polyline points="15 7 21 7 21 13" />
        </svg>
      ),
      bg: "linear-gradient(135deg, rgba(0,180,255,0.12), rgba(139,0,255,0.12))",
    },
  ];

  return (
    <section className="px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p
            className="mb-4 text-center text-[11px] font-bold uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.35em",
              color: "var(--color-brand)",
            }}
          >
            How It Works
          </p>
          <h2
            className="mx-auto max-w-3xl text-center font-bold leading-[1.1] tracking-tight text-white"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 48px)",
            }}
          >
            Your marketing has a <span className="cam-text-gradient">DNA.</span>
            <br />
            We find it. We replicate it. We evolve it.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 120}>
              <article
                className="group h-full rounded-2xl border p-8 transition hover:-translate-y-1"
                style={{
                  background: "var(--color-surface)",
                  borderColor: "var(--color-border-soft)",
                  transitionDuration: "300ms",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 0 1px rgba(0,180,255,0.4), 0 20px 60px rgba(0,180,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ background: c.bg }}
                >
                  <div className="h-6 w-6">{c.icon}</div>
                </div>
                <h3
                  className="mt-6 text-xl font-bold text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {c.title}
                </h3>
                <p
                  className="mt-3 text-[15px] leading-relaxed"
                  style={{ color: "var(--color-muted-soft)" }}
                >
                  {c.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Who It's For ----------
function WhoItsFor() {
  const items = [
    "You spend money on marketing but can't track what works",
    "You've outgrown DIY but agencies are too expensive",
    "You want AI working for you, not just tools to learn",
    "You're ready for marketing that adapts and improves itself",
  ];
  return (
    <section className="px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2 md:items-center">
        <Reveal>
          <p
            className="mb-4 text-[11px] font-bold uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.35em",
              color: "var(--color-brand)",
            }}
          >
            Who It&rsquo;s For
          </p>
          <h2
            className="font-bold leading-[1.1] tracking-tight text-white"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 42px)",
            }}
          >
            Built for small business owners who are done playing{" "}
            <span className="cam-text-gradient">agency roulette.</span>
          </h2>
          <p className="mt-6 text-lg" style={{ color: "var(--color-muted-soft)", lineHeight: 1.6 }}>
            You&rsquo;ve hired marketers. Paid for ads. Built websites. And you&rsquo;re still
            not sure what&rsquo;s actually working. ClickAdMedia changes that.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-white">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ background: "rgba(0,229,160,0.12)" }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#00E5A0"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="text-base">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Second CTA ----------
function SecondCTA() {
  return (
    <section className="relative px-4 py-24 sm:px-8 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #00B4FF, #8B00FF, transparent)" }}
      />
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2
            className="font-bold leading-[1.1] tracking-tight text-white"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 48px)",
            }}
          >
            Be first when we launch.
            <br />
            <span className="cam-text-gradient">Early advantage.</span>
          </h2>
          <p
            className="mx-auto mt-6 max-w-xl text-lg"
            style={{ color: "var(--color-muted-soft)", lineHeight: 1.6 }}
          >
            We&rsquo;re onboarding our founding clients first. Spots are limited and waitlist
            members get priority access, founding pricing, and a free AI marketing audit on
            launch day.
          </p>
          <a
            href="#waitlist"
            className="mt-10 inline-flex h-[52px] items-center justify-center rounded-[10px] px-8 text-base font-semibold text-white transition hover:scale-[1.01] hover:brightness-110"
            style={{
              background: "linear-gradient(135deg, #00b4ff 0%, #8b00ff 100%)",
              transitionDuration: "150ms",
            }}
          >
            Join the Waitlist Now &rarr;
          </a>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer
      className="border-t px-4 py-8 sm:px-8"
      style={{ borderColor: "var(--color-border-soft)" }}
    >
      <div
        className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-[13px] sm:flex-row"
        style={{ color: "var(--color-muted-soft)" }}
      >
        <p>© 2026 ClickAdMedia.co — All rights reserved.</p>
        <div className="flex items-center gap-5">
          <a href="#" className="transition hover:text-white">
            Privacy Policy
          </a>
          <a href="/contact" className="transition hover:text-white">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
