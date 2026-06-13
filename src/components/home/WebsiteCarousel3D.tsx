import { useEffect, useRef } from "react";

type Site = {
  name: string;
  tag: string;
  /** Hue (deg) used to tint the card's gradient + accent. */
  hue: number;
};

// 12 industry "websites" floating in a ring. Add/remove freely — the geometry
// recalculates from the array length.
const sites: Site[] = [
  { name: "Apex Roofing", tag: "Roofing", hue: 14 },
  { name: "FlowPro Plumbing", tag: "Plumbing", hue: 205 },
  { name: "ClimateCo HVAC", tag: "HVAC", hue: 190 },
  { name: "Voltline Electric", tag: "Electrical", hue: 45 },
  { name: "GreenEdge Lawns", tag: "Landscaping", hue: 130 },
  { name: "BrightSmile Dental", tag: "Dentists", hue: 175 },
  { name: "IronGate Fencing", tag: "Fencing", hue: 25 },
  { name: "TruCoat Painting", tag: "Painting", hue: 280 },
  { name: "Summit Builders", tag: "General Contractor", hue: 220 },
  { name: "SolidGround Concrete", tag: "Concrete", hue: 0 },
  { name: "ShieldGuard Pest", tag: "Pest Control", hue: 95 },
  { name: "PeakReno Remodeling", tag: "Remodeling", hue: 260 },
];

const ANGLE = 360 / sites.length;
const RADIUS = 470; // px — distance of each card from the ring's center

function MiniSite({ site }: { site: Site }) {
  const base = `hsl(${site.hue} 70% 18%)`;
  const top = `hsl(${site.hue} 80% 32%)`;
  const accent = `hsl(${site.hue} 85% 60%)`;
  return (
    <div
      className="absolute left-1/2 top-1/2 h-[150px] w-[240px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.55)] [backface-visibility:hidden]"
      style={{ background: `linear-gradient(160deg, ${top}, ${base})` }}
    >
      {/* browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-black/30 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/40" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="ml-2 truncate rounded bg-white/10 px-2 py-0.5 text-[8px] text-white/60">
          {site.name.toLowerCase().replace(/\s+/g, "")}.com
        </span>
      </div>
      {/* mock content */}
      <div className="p-3">
        <span
          className="inline-block rounded-full px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-black"
          style={{ background: accent }}
        >
          {site.tag}
        </span>
        <div className="mt-2 h-2.5 w-[80%] rounded bg-white/80" />
        <div className="mt-1.5 h-2 w-[60%] rounded bg-white/40" />
        <div className="mt-3 flex gap-1.5">
          <span className="h-4 w-14 rounded" style={{ background: accent }} />
          <span className="h-4 w-10 rounded bg-white/15" />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          <span className="h-5 rounded bg-white/10" />
          <span className="h-5 rounded bg-white/10" />
          <span className="h-5 rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}

export function WebsiteCarousel3D() {
  const stageRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const wrap = wrapRef.current;
    if (!stage || !wrap) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const start = performance.now();

    const render = (now: number) => {
      // Scroll position of the carousel within the viewport → -1..1
      const rect = wrap.getBoundingClientRect();
      const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      const scrollRot = progress * 90; // scrolling spins the ring into view
      const idleRot = reduce ? 0 : ((now - start) / 1000) * 8; // gentle drift
      stage.style.transform = `translateZ(-${RADIUS}px) rotateY(${idleRot - scrollRot}deg)`;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden py-6"
      aria-label="Examples of local business websites we've built"
      role="img"
    >
      {/* edge fades so cards dissolve at the sides */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div
        className="mx-auto h-[300px] [perspective:1200px] sm:h-[380px]"
        style={{ perspectiveOrigin: "50% 45%" }}
      >
        <div
          ref={stageRef}
          className="relative mx-auto h-full w-[240px] [transform-style:preserve-3d] motion-reduce:transition-none"
          style={{ transform: `translateZ(-${RADIUS}px)` }}
        >
          {sites.map((site, i) => (
            <div
              key={site.name}
              className="absolute left-0 top-1/2 h-0 w-full"
              style={{ transform: `rotateY(${i * ANGLE}deg) translateZ(${RADIUS}px)` }}
            >
              <MiniSite site={site} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
