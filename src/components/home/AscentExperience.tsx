import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Check, Compass, MapPin, Mountain, Search, Zap } from "lucide-react";
import logoAsset from "@/assets/logo.asset.json";
import truecanAsset from "@/assets/truecan.png.asset.json";
import caminoAsset from "@/assets/camino.png.asset.json";
import westlightsAsset from "@/assets/westlights.png.asset.json";

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
    <div ref={ref}>
      <dt className="font-display text-6xl font-bold tabular-nums text-gradient-brand">{display}%</dt>
      <dd className="mt-3 text-base text-foreground">{label}<span className="mt-2 block text-xs text-muted-foreground">Source: {source}</span></dd>
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
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
      const gsap = gsapModule.default;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const sections = gsap.utils.toArray<HTMLElement>("[data-ascent-act]");
      const triggers = sections.map((section, index) =>
        ScrollTrigger.create({
          trigger: section,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => setAct(index + 1),
          onEnterBack: () => setAct(index + 1),
        }),
      );
      const progressTrigger = ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => setProgress(self.progress),
      });
      cleanup = () => {
        triggers.forEach((trigger) => trigger.kill());
        progressTrigger.kill();
      };
    });
    return () => cleanup();
  }, []);

  return (
    <div ref={rootRef} className="ascent relative overflow-clip bg-background">
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
        className="fixed bottom-4 right-4 z-50 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_0_35px_var(--glow-purple)] transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Book a free call <ArrowRight className="h-4 w-4" />
      </Link>

      <section data-ascent-act className="relative z-10 flex min-h-[110svh] items-center pt-24" aria-labelledby="ascent-hero">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-5 py-16 lg:grid-cols-[1fr_0.85fr] lg:px-8">
          <div className="max-w-3xl">
            <p className="brand-lockup text-xs text-[var(--ice-blue)]">Calgary · Alberta · Built for trades</p>
            <h1 id="ascent-hero" className="mt-6 text-[clamp(3.2rem,8vw,7.5rem)] font-bold leading-[0.88] tracking-[-0.055em] text-foreground">
              Your website should work as <span className="text-gradient-brand">hard as you do.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              We build lead-generation websites that help Calgary trades get found, look credible, and turn clicks into calls.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/strategy-call" className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-7 font-semibold text-primary-foreground shadow-[0_0_40px_var(--glow-purple)] transition-all hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                Book a free strategy call <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#proof-ridge" className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-border bg-background/40 px-7 font-semibold text-foreground backdrop-blur hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                See the work <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="relative mx-auto flex min-h-80 w-full max-w-lg items-center justify-center lg:min-h-[34rem]">
            <div className="absolute inset-0 bg-[var(--summit-glow)] opacity-50 blur-3xl" aria-hidden />
            <img src={logoAsset.url} alt="ClickAdMedia chrome mountain M with violet summit gem" fetchPriority="high" className={`relative w-64 rounded-3xl object-cover mix-blend-screen sm:w-80 ${lite ? "ascent-logo-float" : "opacity-30"}`} />
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          <span>Scroll to climb</span><ArrowDown className="h-4 w-4 animate-cue text-[var(--ice-blue)]" />
        </div>
      </section>

      <section data-ascent-act className="relative z-10 flex min-h-screen items-center py-28" aria-labelledby="problem-heading">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <p className="brand-lockup text-xs text-primary">Act II · The problem</p>
          <h2 id="problem-heading" className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">Great work means nothing if nobody can find you.</h2>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {painPoints.map((point, index) => (
              <article key={point} className="trail-marker glass-card relative min-h-52 overflow-hidden rounded-2xl p-7 backdrop-blur-xl">
                <span className="font-mono text-xs text-[var(--ice-blue)]">TRAIL 0{index + 1}</span>
                <p className="mt-8 text-xl font-semibold leading-snug text-foreground">“{point}”</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section data-ascent-act className="relative z-10 min-h-screen py-28" aria-labelledby="method-heading">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="brand-lockup text-xs text-primary">Act III · The method</p>
          <h2 id="method-heading" className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">Four base camps. One clear route to more leads.</h2>
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {camps.map((camp, index) => {
              const Icon = camp.icon;
              return (
                <article key={camp.title} className="crystal-platform group relative overflow-hidden border border-border bg-card/55 p-6 backdrop-blur-xl">
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
              <li key={step} className="flex items-center gap-4 text-lg font-semibold"><span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/50 bg-primary/10 font-mono text-sm text-primary">{index + 1}</span>{step}</li>
            ))}
          </ol>
        </div>
      </section>

      <section id="proof-ridge" data-ascent-act className="relative z-10 min-h-screen scroll-mt-24 py-28" aria-labelledby="proof-heading">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="brand-lockup text-xs text-primary">Act IV · Proof ridge</p>
          <h2 id="proof-heading" className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">Built to look sharp. Engineered to move people.</h2>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {work.map((item, index) => (
              <figure key={item.name} className={`floating-screen overflow-hidden rounded-2xl border border-border bg-card/70 p-2 shadow-[0_30px_80px_rgba(0,0,0,0.45)] ${index === 1 ? "lg:-translate-y-8" : ""}`}>
                <img src={item.src} alt={item.alt} loading="lazy" className="aspect-[4/3] w-full rounded-xl object-cover object-top" />
                <figcaption className="px-3 py-3 text-sm font-semibold">{item.name}</figcaption>
              </figure>
            ))}
          </div>
          <dl className="mt-16 grid gap-8 border-t border-border pt-10 md:grid-cols-3">
            {research.map((stat) => <ResearchStat key={stat.value} {...stat} />)}
          </dl>
        </div>
      </section>

      <section data-ascent-act className="relative z-10 flex min-h-[105svh] items-center py-28 text-center" aria-labelledby="summit-heading">
        <div className="mx-auto max-w-5xl px-5">
          <div className="relative mx-auto w-fit">
            <div className="absolute inset-0 scale-[2.2] bg-[var(--summit-glow)] opacity-80 blur-3xl" aria-hidden />
            <img src={logoAsset.url} alt="ClickAdMedia summit mark" loading="lazy" className="relative mx-auto h-36 w-36 rounded-3xl object-cover mix-blend-screen sm:h-44 sm:w-44" />
          </div>
          <p className="brand-lockup mt-10 text-xs text-[var(--ice-blue)]">Act V · The summit</p>
          <h2 id="summit-heading" className="mt-5 text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.9] tracking-[-0.05em]">Ready to rise above the competition?</h2>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">Bring us your trade, service area, and goals. We'll show you a clear route from invisible online to a website that brings in real enquiries.</p>
          <p className="brand-lockup mt-10 text-sm text-foreground sm:text-base">Websites that convert</p>
          <Link to="/strategy-call" className="mt-10 inline-flex h-16 items-center justify-center gap-3 rounded-full bg-primary px-9 text-lg font-semibold text-primary-foreground shadow-[0_0_55px_var(--glow-purple)] transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Book a free strategy call <ArrowRight className="h-5 w-5" />
          </Link>
          <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4 text-[var(--ice-blue)]" /> Calgary-built. Alberta focused. Trades first.</p>
          <div className="mx-auto mt-12 flex max-w-lg flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            {["No pressure", "Clear next steps", "Built around your trade"].map((item) => <span key={item} className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-primary" />{item}</span>)}
          </div>
        </div>
      </section>
    </div>
  );
}