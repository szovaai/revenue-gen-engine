import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Check, Compass, MapPin, Mountain, Search, Zap } from "lucide-react";
import logoAsset from "@/assets/logo.asset.json";
import truecanAsset from "@/assets/truecan.png.asset.json";
import caminoAsset from "@/assets/camino.png.asset.json";
import westlightsAsset from "@/assets/westlights.png.asset.json";
import heroVideoAsset from "@/assets/clickadmedia-digital-effect.mp4.asset.json";

const AscentScene = lazy(() =>
  import("@/components/three/AscentScene").then((module) => ({ default: module.AscentScene })),
);

const painPoints = [
  "You're the best in town — but you're invisible online.",
  "Your competitors look sharper, so they get the first call.",
  "Your website sits there. It doesn't bring in booked jobs.",
];

const camps = [
  { title: "Convert-First Design", body: "Every screen points toward a call, quote, or booked job.", icon: Compass },
  { title: "Local SEO", body: "Get found when Calgary homeowners search for your trade.", icon: Search },
  { title: "Lead Capture", body: "Turn visits into real enquiries before they click away.", icon: Zap },
  { title: "Done-For-You Build", body: "We handle the design, copy, mobile experience, and launch.", icon: Mountain },
];

const research = [
  { value: "75%", label: "judge credibility by website design", source: "Stanford Web Credibility Project" },
  { value: "53%", label: "leave a mobile site after 3 seconds", source: "Google, Mobile Speed Study" },
  { value: "46%", label: "of Google searches have local intent", source: "Google / HubSpot" },
];

const work = [
  { src: truecanAsset.url, alt: "TrueCan website project preview", name: "TrueCan" },
  { src: caminoAsset.url, alt: "Camino website project preview", name: "Camino" },
  { src: westlightsAsset.url, alt: "West Lights website project preview", name: "West Lights" },
];

function useAscentMode() {
  const [lite, setLite] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const cores = navigator.hardwareConcurrency || 4;
    setLite(reduce || coarse || (memory !== undefined && memory <= 2) || cores <= 2);
  }, []);

  return lite;
}

function ResearchStat({ value, label, source }: (typeof research)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const target = Number.parseInt(value, 10);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setDisplay(target);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      const started = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - started) / 900);
        setDisplay(Math.round(target * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.4 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} data-proof-stat className="proof-stat">
      <dt data-stat-value className="font-display text-6xl font-bold tabular-nums text-gradient-brand">{display}%</dt>
      <dd data-stat-copy className="mt-3 text-base text-foreground">{label}<span className="mt-2 block text-xs text-muted-foreground">Source: {source}</span></dd>
    </div>
  );
}

export function AscentExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [act, setAct] = useState(1);
  const [progress, setProgress] = useState(0);
  const lite = useAscentMode();

  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("lenis")]).then(([gsapModule, triggerModule, lenisModule]) => {
      if (cancelled || !rootRef.current) return;
      const gsap = gsapModule.default;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const root = rootRef.current;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      const lenis = !reduce && finePointer ? new lenisModule.default({ duration: 1.15, smoothWheel: true }) : null;
      const onLenisScroll = () => ScrollTrigger.update();
      lenis?.on("scroll", onLenisScroll);
      const ticker = (time: number) => lenis?.raf(time * 1000);
      if (lenis) {
        gsap.ticker.add(ticker);
        gsap.ticker.lagSmoothing(0);
      }

      const context = gsap.context(() => {
        const sections = gsap.utils.toArray<HTMLElement>("[data-ascent-act]", root);
        sections.forEach((section, index) => {
          ScrollTrigger.create({
            trigger: section,
            start: "top 55%",
            end: "bottom 45%",
            onEnter: () => setAct(index + 1),
            onEnterBack: () => setAct(index + 1),
          });
          if (!reduce && index > 0) {
            const revealItems = section.querySelectorAll("[data-reveal]");
            gsap.fromTo(revealItems, { y: 52, opacity: 0 }, {
              y: 0, opacity: 1, duration: 1, stagger: 0.11, ease: "power3.out",
              scrollTrigger: { trigger: section, start: "top 72%", once: true },
            });
          }
        });
        ScrollTrigger.create({
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => setProgress(self.progress),
        });

        if (!reduce) {
          gsap.timeline({ defaults: { ease: "power3.out" } })
            .from("[data-hero-eyebrow]", { y: 18, opacity: 0, duration: 0.65 })
            .from("[data-hero-word]", { yPercent: 115, opacity: 0, rotateX: -28, duration: 0.85, stagger: 0.075 }, "-=0.25")
            .from("[data-hero-copy]", { y: 24, opacity: 0, duration: 0.7 }, "-=0.35")
            .from("[data-hero-actions] > *", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4")
            .from("[data-scroll-cue]", { opacity: 0, duration: 0.5 }, "-=0.2");
          gsap.to("[data-hero-video]", {
            scale: 1.1, yPercent: 5, ease: "none",
            scrollTrigger: { trigger: sections[0], start: "top top", end: "bottom top", scrub: 0.7 },
          });
          gsap.from("[data-proof-screen]", {
            y: 90, rotateY: -14, rotateX: 7, opacity: 0, stagger: 0.14, duration: 1.15, ease: "power3.out",
            scrollTrigger: { trigger: "#proof-ridge", start: "top 72%", once: true },
          });
          gsap.from("[data-proof-stat]", {
            y: 35, opacity: 0, stagger: 0.14, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: "[data-proof-stats]", start: "top 82%", once: true },
          });
          gsap.fromTo("[data-stat-value]", { filter: "brightness(1)" }, {
            filter: "brightness(1.65)", repeat: 1, yoyo: true, duration: 0.32, stagger: 0.14,
            scrollTrigger: { trigger: "[data-proof-stats]", start: "top 70%", once: true },
          });
        }
      }, root);

      let frame = 0;
      const pointerMove = (event: PointerEvent) => {
        if (!finePointer || reduce) return;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const x = event.clientX;
          const y = event.clientY;
          root.style.setProperty("--pointer-x", `${x}px`);
          root.style.setProperty("--pointer-y", `${y}px`);
          const nx = x / window.innerWidth - 0.5;
          const ny = y / window.innerHeight - 0.5;
          gsap.to("[data-hero-video]", { xPercent: nx * 1.8, yPercent: ny * 1.3, duration: 1.2, overwrite: "auto" });
        });
      };
      window.addEventListener("pointermove", pointerMove, { passive: true });

      const magnetic = Array.from(root.querySelectorAll<HTMLElement>("[data-magnetic]"));
      const magneticCleanups = magnetic.map((element) => {
        const move = (event: PointerEvent) => {
          if (!finePointer || reduce) return;
          const rect = element.getBoundingClientRect();
          gsap.to(element, { x: (event.clientX - rect.left - rect.width / 2) * 0.13, y: (event.clientY - rect.top - rect.height / 2) * 0.13, duration: 0.35 });
        };
        const leave = () => gsap.to(element, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.45)" });
        element.addEventListener("pointermove", move);
        element.addEventListener("pointerleave", leave);
        return () => { element.removeEventListener("pointermove", move); element.removeEventListener("pointerleave", leave); };
      });

      cleanup = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("pointermove", pointerMove);
        magneticCleanups.forEach((remove) => remove());
        context.revert();
        if (lenis) gsap.ticker.remove(ticker);
        lenis?.destroy();
      };
    });
    return () => { cancelled = true; cleanup(); };
  }, [lite]);

  return (
    <div ref={rootRef} className="ascent relative overflow-clip bg-background">
      <div className="ascent-cursor-glow pointer-events-none fixed z-[3] hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full lg:block" aria-hidden />
      <div className="ascent-sky pointer-events-none fixed inset-0 z-0" aria-hidden />
      <div className="ascent-mountains pointer-events-none fixed inset-x-0 bottom-0 z-0 h-[55vh]" aria-hidden />
      {!lite && (
        <div className="pointer-events-none fixed inset-0 z-[1]" aria-hidden>
          <Suspense fallback={null}><AscentScene /></Suspense>
        </div>
      )}
      <div className="ascent-fog pointer-events-none fixed inset-0 z-[2]" style={{ opacity: Math.max(0.08, 0.92 - progress) }} aria-hidden />

      <aside className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 lg:block" aria-label="Ascent progress">
        <div className="flex items-center gap-3 rounded-full border border-border bg-background/60 px-2.5 py-4 backdrop-blur-xl">
          <div className="relative h-44 w-px overflow-hidden bg-border">
            <div className="absolute inset-x-0 bottom-0 bg-[var(--ice-blue)] shadow-[0_0_12px_var(--ice-blue)]" style={{ height: `${progress * 100}%` }} />
          </div>
          <div className="flex h-44 flex-col justify-between text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground [writing-mode:vertical-rl]">
            <span>Summit</span><span className="text-primary">Act 0{act}</span><span>Base camp</span>
          </div>
        </div>
      </aside>

      <Link
        to="/strategy-call"
        data-magnetic
        className="fixed bottom-4 right-4 z-50 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_0_35px_var(--glow-purple)] transition-shadow hover:shadow-[0_0_48px_var(--glow-purple)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Book a free call <ArrowRight className="h-4 w-4" />
      </Link>

      <section data-ascent-act className="relative z-10 flex min-h-[110svh] items-center pt-24" aria-labelledby="ascent-hero">
        <video
          data-hero-video
          src={heroVideoAsset.url}
          poster={logoAsset.url}
          aria-label="ClickAdMedia digital mountain logo animation"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/25" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/35" aria-hidden />
        <div className="relative mx-auto w-full max-w-7xl px-5 py-16 lg:px-8">
          <div className="max-w-3xl">
            <p data-hero-eyebrow className="brand-lockup text-xs text-[var(--ice-blue)]">Calgary · Alberta · Built for trades</p>
            <h1 id="ascent-hero" className="mt-6 text-[clamp(3.2rem,8vw,7.5rem)] font-bold leading-[0.88] tracking-[-0.055em] text-foreground">
              <span className="sr-only">Your website should work as hard as you do.</span>
              <span aria-hidden className="hero-word-line">
                {"Your website should work as".split(" ").map((word) => <span key={word} className="hero-word-clip"><span data-hero-word>{word}</span></span>)}
              </span>{" "}
              <span aria-hidden className="hero-word-line text-gradient-brand">
                {"hard as you do.".split(" ").map((word) => <span key={word} className="hero-word-clip"><span data-hero-word>{word}</span></span>)}
              </span>
            </h1>
            <p data-hero-copy className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              We build lead-generation websites that help Calgary trades get found, look credible, and turn clicks into calls.
            </p>
            <div data-hero-actions className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link data-magnetic to="/strategy-call" className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-7 font-semibold text-primary-foreground shadow-[0_0_40px_var(--glow-purple)] transition-shadow hover:shadow-[0_0_55px_var(--glow-purple)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                Book a free strategy call <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#proof-ridge" className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-border bg-background/40 px-7 font-semibold text-foreground backdrop-blur hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                See the work <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <div data-scroll-cue className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          <span>Scroll to climb</span><ArrowDown className="h-4 w-4 animate-cue text-[var(--ice-blue)]" />
        </div>
      </section>

      <section data-ascent-act className="relative z-10 flex min-h-screen items-center py-28" aria-labelledby="problem-heading">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <p data-reveal className="brand-lockup text-xs text-primary">Act II · The problem</p>
          <h2 data-reveal id="problem-heading" className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">Great work means nothing if nobody can find you.</h2>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {painPoints.map((point, index) => (
              <article data-reveal key={point} className="trail-marker glass-card premium-sheen relative min-h-52 overflow-hidden rounded-2xl p-7 backdrop-blur-xl">
                <span className="font-mono text-xs text-[var(--ice-blue)]">TRAIL 0{index + 1}</span>
                <p className="mt-8 text-xl font-semibold leading-snug text-foreground">“{point}”</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section data-ascent-act className="relative z-10 min-h-screen py-28" aria-labelledby="method-heading">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p data-reveal className="brand-lockup text-xs text-primary">Act III · The method</p>
          <h2 data-reveal id="method-heading" className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">Four base camps. One clear route to more leads.</h2>
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {camps.map((camp, index) => {
              const Icon = camp.icon;
              return (
                <article data-reveal key={camp.title} className="crystal-platform premium-sheen group relative overflow-hidden border border-border bg-card/55 p-6 backdrop-blur-xl">
                  <span className="font-mono text-xs text-muted-foreground">ALT 0{index + 1}</span>
                  <Icon className="mt-10 h-7 w-7 text-primary transition-transform group-hover:scale-110" />
                  <h3 className="mt-5 text-xl font-semibold">{camp.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{camp.body}</p>
                </article>
              );
            })}
          </div>
          <ol className="mt-20 grid gap-4 border-y border-border py-8 md:grid-cols-3">
            {["Strategy call", "We build it", "You get leads"].map((step, index) => (
              <li data-reveal key={step} className="flex items-center gap-4 text-lg font-semibold"><span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/50 bg-primary/10 font-mono text-sm text-primary">{index + 1}</span>{step}</li>
            ))}
          </ol>
        </div>
      </section>

      <section id="proof-ridge" data-ascent-act className="relative z-10 min-h-screen scroll-mt-24 py-28" aria-labelledby="proof-heading">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p data-reveal className="brand-lockup text-xs text-primary">Act IV · Proof ridge</p>
          <h2 data-reveal id="proof-heading" className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">Built to look sharp. Engineered to move people.</h2>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {work.map((item, index) => (
              <figure data-proof-screen key={item.name} className={`floating-screen premium-sheen overflow-hidden rounded-2xl border border-border bg-card/70 p-2 shadow-[0_30px_80px_rgba(0,0,0,0.45)] ${index === 1 ? "lg:-translate-y-8" : ""}`}>
                <img src={item.src} alt={item.alt} loading="lazy" className="aspect-[4/3] w-full rounded-xl object-cover object-top" />
                <figcaption className="px-3 py-3 text-sm font-semibold">{item.name}</figcaption>
              </figure>
            ))}
          </div>
          <dl data-proof-stats className="mt-16 grid gap-8 border-t border-border pt-10 md:grid-cols-3">
            {research.map((stat) => <ResearchStat key={stat.value} {...stat} />)}
          </dl>
        </div>
      </section>

      <section data-ascent-act className="relative z-10 flex min-h-[105svh] items-center py-28 text-center" aria-labelledby="summit-heading">
        <div className="mx-auto max-w-5xl px-5">
          <div data-reveal className="relative mx-auto w-fit">
            <div className="absolute inset-0 scale-[2.2] bg-[var(--summit-glow)] opacity-80 blur-3xl" aria-hidden />
            <img src={logoAsset.url} alt="ClickAdMedia summit mark" loading="lazy" className="relative mx-auto h-36 w-36 rounded-3xl object-cover mix-blend-screen sm:h-44 sm:w-44" />
          </div>
          <p data-reveal className="brand-lockup mt-10 text-xs text-[var(--ice-blue)]">Act V · The summit</p>
          <h2 data-reveal id="summit-heading" className="mt-5 text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.9] tracking-[-0.05em]">Ready to rise above the competition?</h2>
          <p data-reveal className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">Bring us your trade, service area, and goals. We'll show you a clear route from invisible online to a website that brings in real enquiries.</p>
          <p data-reveal className="brand-lockup mt-10 text-sm text-foreground sm:text-base">Websites that convert</p>
          <Link data-reveal data-magnetic to="/strategy-call" className="mt-10 inline-flex h-16 items-center justify-center gap-3 rounded-full bg-primary px-9 text-lg font-semibold text-primary-foreground shadow-[0_0_55px_var(--glow-purple)] transition-shadow hover:shadow-[0_0_70px_var(--glow-purple)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Book a free strategy call <ArrowRight className="h-5 w-5" />
          </Link>
          <p data-reveal className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4 text-[var(--ice-blue)]" /> Calgary-built. Alberta focused. Trades first.</p>
          <div data-reveal className="mx-auto mt-12 flex max-w-lg flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            {["No pressure", "Clear next steps", "Built around your trade"].map((item) => <span key={item} className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-primary" />{item}</span>)}
          </div>
        </div>
      </section>
    </div>
  );
}