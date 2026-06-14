import { useEffect, useRef } from "react";
import "./ascent.css";

const LOGO = "/clickadmedia-logo.png";
const SHOWCASE_VIDEO = "/showcase.mp4";
const CONTACT_EMAIL = "hello@clickadmedia.co";

/**
 * ClickAdMedia — "THE ASCENT"
 * Faithful React port of the self-contained design reference. Pure CSS/JS
 * (no WebGL); the cinematic feel comes from CSS (rings, glow, gem, float,
 * cursor tilt). All behavior is reimplemented as scoped React effects and
 * honors prefers-reduced-motion.
 */
export function Ascent() {
  const rootRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    rootRef.current
      ?.querySelector<HTMLElement>(`#${id}`)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const cleanups: Array<() => void> = [];

    // ── Particle stars ──────────────────────────────────────────────
    const starsEl = root.querySelector<HTMLElement>("#stars");
    if (starsEl && !reduceMotion) {
      const frag = document.createDocumentFragment();
      for (let i = 0; i < 80; i++) {
        const s = document.createElement("div");
        s.className = "star";
        s.style.cssText = `left:${Math.random() * 100}%;top:${
          Math.random() * 100
        }%;--d:${2 + Math.random() * 4}s;--delay:-${Math.random() * 4}s;opacity:${
          0.2 + Math.random() * 0.5
        }`;
        frag.appendChild(s);
      }
      starsEl.appendChild(frag);
      cleanups.push(() => {
        starsEl.innerHTML = "";
      });
    }

    // ── Scroll reveal ───────────────────────────────────────────────
    const revealEls = root.querySelectorAll<HTMLElement>(".reveal");
    if (reduceMotion) {
      revealEls.forEach((el) => el.classList.add("in"));
    } else {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12 },
      );
      revealEls.forEach((el) => obs.observe(el));
      cleanups.push(() => obs.disconnect());
    }

    // ── Altitude meter ──────────────────────────────────────────────
    const altFill = root.querySelector<HTMLElement>("#altFill");
    const altDot = root.querySelector<HTMLElement>("#altDot");
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const pct = max > 0 ? window.scrollY / max : 0;
      const h = Math.round(pct * 100);
      if (altFill) altFill.style.height = h + "%";
      if (altDot) altDot.style.bottom = h + "%";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    // ── Stat count-up ───────────────────────────────────────────────
    const countEls = root.querySelectorAll<HTMLElement>(".num[data-target]");
    if (reduceMotion) {
      countEls.forEach((el) => {
        el.textContent = el.dataset.target ?? el.textContent;
      });
    } else {
      const timers: ReturnType<typeof setInterval>[] = [];
      const countObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const el = e.target as HTMLElement;
            const target = parseInt(el.dataset.target ?? "0", 10);
            const dur = 1600;
            const stepMs = 16;
            const inc = target / (dur / stepMs);
            let cur = 0;
            const t = setInterval(() => {
              cur = Math.min(cur + inc, target);
              el.textContent = String(Math.round(cur));
              if (cur >= target) clearInterval(t);
            }, stepMs);
            timers.push(t);
            countObs.unobserve(el);
          });
        },
        { threshold: 0.5 },
      );
      countEls.forEach((el) => {
        el.textContent = "0";
        countObs.observe(el);
      });
      cleanups.push(() => {
        countObs.disconnect();
        timers.forEach(clearInterval);
      });
    }

    // ── Cursor tilt on the hero logo (desktop, motion-allowed) ──────
    const logoImg = root.querySelector<HTMLElement>(".logo-img");
    if (logoImg && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
      let raf = 0;
      const onMove = (ev: MouseEvent) => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const cx = window.innerWidth / 2;
          const cy = window.innerHeight / 2;
          const dx = (ev.clientX - cx) / cx;
          const dy = (ev.clientY - cy) / cy;
          const bob = -6 + Math.sin(Date.now() / 1000) * 6;
          logoImg.style.transform = `translateY(${bob}px) rotateX(${
            dy * -6
          }deg) rotateY(${dx * 6}deg)`;
        });
      };
      document.addEventListener("mousemove", onMove);
      cleanups.push(() => {
        cancelAnimationFrame(raf);
        document.removeEventListener("mousemove", onMove);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div className="ascent" ref={rootRef}>
      {/* Altitude meter */}
      <div className="altitude-meter" aria-hidden="true">
        <div className="alt-label">Summit</div>
        <div className="alt-track">
          <div className="alt-fill" id="altFill" />
          <div className="alt-dot" id="altDot" />
        </div>
        <div className="alt-label">Base</div>
      </div>

      {/* NAV */}
      <nav>
        <div className="nav-brand">
          <img src={LOGO} alt="ClickAdMedia logo" />
          <span className="brand-text">
            Click<span>Ad</span>Media
            <span style={{ color: "rgba(238,236,248,0.3)", fontSize: "13px", fontWeight: 400 }}>
              .co
            </span>
          </span>
        </div>
        <ul>
          <li>
            <a href="#work">Work</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#proof">Results</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <button className="nav-cta" onClick={() => scrollTo("contact")}>
          Begin Discovery
        </button>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-field" />
        <div className="stars" id="stars" />
        <div className="hero-split">
          <div className="hero-left reveal">
            <div className="eyebrow">Calgary · Alberta · Built for Trades</div>
            <h1>
              The only website
              <br />
              your trade
              <br />
              <em>will ever</em> <span className="glow">need.</span>
            </h1>
            <p className="hero-sub">
              We build lead-generation websites for Calgary contractors that turn
              searches into booked jobs — and keep them coming.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => scrollTo("contact")}>
                Start discovery call
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <path d="M2 8h12M9 3l5 5-5 5" />
                </svg>
              </button>
              <a className="btn-ghost" href="#work">
                See the work
              </a>
            </div>
          </div>
          <div className="hero-right reveal">
            <div className="logo-stage">
              <div className="logo-glow" />
              <div className="logo-ring" />
              <div className="logo-ring-2" />
              <img
                className="logo-img"
                src={LOGO}
                alt="ClickAdMedia — chrome M mark with violet gem"
              />
              <div className="gem-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-inner">
          {Array.from({ length: 2 }).flatMap((_, dup) =>
            [
              "Lead Generation",
              "Local SEO",
              "Convert-First Design",
              "Calgary Trades",
              "Done-For-You Builds",
              "Websites That Convert",
            ].flatMap((label, i) => [
              <span key={`${dup}-${i}-l`}>{label}</span>,
              <span key={`${dup}-${i}-d`} className="mdot">
                ◆
              </span>,
            ]),
          )}
        </div>
      </div>

      {/* VIDEO SECTION — THE PROOF IN MOTION */}
      <section className="video-section" id="work">
        <div className="vs-header reveal">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            Built to look sharp
          </div>
          <h2>
            See what we build for
            <br />
            <em>Calgary trades.</em>
          </h2>
          <p>Every site engineered to rank, convert, and book jobs — not just look good.</p>
        </div>
        <div className="video-frame reveal">
          <div className="video-glow-l" />
          <div className="video-glow-r" />
          <video autoPlay muted loop playsInline preload="auto">
            <source src={SHOWCASE_VIDEO} type="video/mp4" />
          </video>
          <div className="video-label">
            <div>
              <h3>Calgary Trades Portfolio</h3>
              <p>Plumbing · Roofing · Landscaping · Electrical · Fencing &amp; more</p>
            </div>
            <div className="video-badge">↗ Real client sites</div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="problem" id="services">
        <div className="problem-head reveal">
          <div>
            <div className="eyebrow">The problem</div>
            <h2>
              Great work means nothing
              <br />
              if nobody can <em>find you.</em>
            </h2>
          </div>
          <div className="big-stat reveal">
            <div className="n">
              <span className="num" data-target="97">
                97
              </span>
              <sup>%</sup>
            </div>
            <p>
              of people never scroll
              <br />
              past page one of Google
            </p>
          </div>
        </div>
        <div className="quotes">
          <div className="qcard reveal">
            <p>
              "You're the best in town — but your competitor answers the phone first
              because they show up first online."
            </p>
            <div className="qsrc">What we hear every week</div>
          </div>
          <div className="qcard reveal">
            <p>
              "Their website looks sharper, so homeowners assume they're more
              professional — before a single word is exchanged."
            </p>
            <div className="qsrc">The invisible credibility gap</div>
          </div>
          <div className="qcard reveal">
            <p>
              "The website just sits there. It doesn't ring. It doesn't book. It
              doesn't do a single thing."
            </p>
            <div className="qsrc">Before working with us</div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process">
        <div className="eyebrow reveal">How we work</div>
        <h2 className="reveal">
          Four decisions. One website
          <br />
          that works while you do.
        </h2>
        <div className="steps">
          <div className="step reveal">
            <div className="step-n">01</div>
            <div className="step-icon">
              <svg viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="8" />
                <path d="M7 10l2 2 4-4" />
              </svg>
            </div>
            <h3>Discovery call</h3>
            <p>
              We learn your trade, service area, and ideal job. No templates — every
              build starts with a real conversation.
            </p>
          </div>
          <div className="step reveal">
            <div className="step-n">02</div>
            <div className="step-icon">
              <svg viewBox="0 0 20 20">
                <rect x="2" y="4" width="16" height="11" rx="1" />
                <path d="M7 18h6M10 15v3" />
              </svg>
            </div>
            <h3>Convert-first design</h3>
            <p>
              Every screen, button, and line of copy points toward one outcome: a
              booked call or a confirmed quote.
            </p>
          </div>
          <div className="step reveal">
            <div className="step-n">03</div>
            <div className="step-icon">
              <svg viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="3" />
                <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.5 4.5l1.4 1.4M14.1 14.1l1.4 1.4M4.5 15.5l1.4-1.4M14.1 5.9l1.4-1.4" />
              </svg>
            </div>
            <h3>Local SEO baked in</h3>
            <p>
              Built for how Calgary homeowners actually search — your trade, your
              neighbourhood, your exact keywords.
            </p>
          </div>
          <div className="step reveal">
            <div className="step-n">04</div>
            <div className="step-icon">
              <svg viewBox="0 0 20 20">
                <path d="M3 18V9l7-7 7 7v9" />
                <path d="M8 18v-6h4v6" />
              </svg>
            </div>
            <h3>Done-for-you launch</h3>
            <p>
              Design, copy, mobile, and launch — all handled by us. You get a website,
              not a project to manage.
            </p>
          </div>
        </div>
        <div className="flow-line">
          <div className="fl-item">
            <div className="fl-dot" style={{ background: "#2A9D45" }} />
            Discovery call
          </div>
          <div className="fl-sep" />
          <div className="fl-item">
            <div className="fl-dot" style={{ background: "#7C3AED" }} />
            We build it
          </div>
          <div className="fl-sep" />
          <div className="fl-item">
            <div className="fl-dot" style={{ background: "#0A0A14" }} />
            You get leads
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-band" id="proof">
        <div className="stats-grid">
          <div className="sbox reveal">
            <div className="sn">
              <span className="num" data-target="75">
                75
              </span>
              <span>%</span>
            </div>
            <p>of people judge credibility by the website before ever calling</p>
            <div className="src">Stanford Web Credibility Project</div>
          </div>
          <div className="sbox reveal">
            <div className="sn">
              <span className="num" data-target="3">
                3
              </span>
              <span>s</span>
            </div>
            <p>is all you get before a visitor decides to leave your site</p>
            <div className="src">Google Mobile Speed Study</div>
          </div>
          <div className="sbox reveal">
            <div className="sn">
              <span className="num" data-target="46">
                46
              </span>
              <span>%</span>
            </div>
            <p>of all Google searches have local intent — your neighbours are searching now</p>
            <div className="src">Google / HubSpot</div>
          </div>
        </div>
      </div>

      {/* CTA / SUMMIT */}
      <section className="cta-section" id="contact">
        <div className="cta-bg" />
        <img className="cta-logo" src={LOGO} alt="ClickAdMedia" />
        <div className="eyebrow reveal">The summit</div>
        <h2 className="reveal">
          Ready to rise above
          <br />
          the <em>competition?</em>
        </h2>
        <p className="reveal">
          Tell us your trade, your service area, and your goals. We'll map a clear route
          from invisible online to fully booked.
        </p>
        <a
          className="btn-primary reveal"
          style={{ fontSize: "14px", padding: "20px 52px" }}
          href={`mailto:${CONTACT_EMAIL}`}
        >
          Book your discovery call
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M2 8h12M9 3l5 5-5 5" />
          </svg>
        </a>
        <div className="trust reveal">
          <span />
          No pressure &nbsp;·&nbsp; No packages &nbsp;·&nbsp; No price lists
          <span />
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="foot-top">
          <div className="foot-brand">
            <img src={LOGO} alt="ClickAdMedia" />
            <p>Lead-generation websites for Calgary contractors. Quoted per project.</p>
          </div>
          <div className="foot-links">
            <div>
              <h5>Explore</h5>
              <ul>
                <li>
                  <a href="#work">Website examples</a>
                </li>
                <li>
                  <a href="#hero">Free audit</a>
                </li>
                <li>
                  <a href="#services">Services</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>
            <div>
              <h5>Get started</h5>
              <ul>
                <li>
                  <a href="#contact">Book a discovery call</a>
                </li>
                <li>
                  <a href="#contact">Request a quote</a>
                </li>
                <li>
                  <a href="#work">See the work</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <p>© 2026 ClickAdMedia.co — Calgary, Alberta</p>
          <div className="foot-tag">Websites that convert</div>
        </div>
      </footer>
    </div>
  );
}
