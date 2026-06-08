import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/home/PageShell";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Post = {
  slug: string;
  title: string;
  description: string;
  tag: string;
  readMin: number;
  datePublished: string;
  render: () => ReactNode;
};

const POSTS: Record<string, Post> = {
  "affordable-web-design-calgary-2026": {
    slug: "affordable-web-design-calgary-2026",
    title: "Affordable Web Design in Calgary: Top Tips for 2026",
    description:
      "What a high-converting Calgary small business website should cost in 2026, where to cut, where not to, and the seven specs that separate a $500 lead engine from a $5,000 brochure.",
    tag: "Web Design",
    readMin: 9,
    datePublished: "2026-06-08",
    render: () => <AffordableCalgaryArticle />,
  },
  "local-seo-alberta-small-business-2026": {
    slug: "local-seo-alberta-small-business-2026",
    title: "Local SEO in Alberta: How Small Businesses Get Found on Google in 2026",
    description:
      "A field-tested playbook for ranking in the Calgary, Edmonton, Red Deer, and Lethbridge map packs — Google Business Profile, reviews, NAP, and service-area pages.",
    tag: "Local SEO",
    readMin: 8,
    datePublished: "2026-06-08",
    render: () => <LocalSeoOutline />,
  },
  "mobile-first-websites-calgary-trades": {
    slug: "mobile-first-websites-calgary-trades",
    title: "Mobile-First Websites for Calgary Trades: Why Slow Sites Lose Jobs",
    description:
      "Why HVAC, electrical, roofing, and plumbing sites lose 40%+ of their leads on mobile — and the Core Web Vitals, click-to-call, and form fixes that get them back.",
    tag: "Trades",
    readMin: 7,
    datePublished: "2026-06-08",
    render: () => <MobileTradesOutline />,
  },
};

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = POSTS[params.slug];
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return {};
    const url = `/blog/${post.slug}`;
    return {
      meta: [
        { title: `${post.title} | ClickAdMedia` },
        { name: "description", content: post.description },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: post.datePublished },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.datePublished,
            author: { "@type": "Organization", name: "ClickAdMedia" },
            publisher: { "@type": "Organization", name: "ClickAdMedia" },
            mainEntityOfPage: `https://revenue-gen-engine.lovable.app${url}`,
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <PageShell>
      <section className="px-4 py-32 text-center">
        <h1 className="text-3xl font-bold">Article not found</h1>
        <Link to="/blog" className="mt-4 inline-block text-primary hover:underline">
          Back to the blog
        </Link>
      </section>
    </PageShell>
  ),
  errorComponent: () => (
    <PageShell>
      <section className="px-4 py-32 text-center">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
      </section>
    </PageShell>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { post } = Route.useLoaderData();
  return (
    <PageShell>
      <article className="px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
            ← All articles
          </Link>
          <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="rounded-full bg-secondary px-2.5 py-0.5 font-medium text-foreground">{post.tag}</span>
            <span>{post.readMin} min read</span>
            <span>·</span>
            <time dateTime={post.datePublished}>
              {new Date(post.datePublished).toLocaleDateString("en-CA", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg text-muted-foreground">{post.description}</p>

          <div className="prose prose-invert mt-10 max-w-none prose-headings:scroll-mt-24 prose-headings:tracking-tight prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-p:text-base prose-p:leading-7 prose-p:text-foreground/90 prose-li:text-foreground/90 prose-strong:text-foreground prose-a:text-primary">
            {post.render()}
          </div>

          <CtaBlock />
        </div>
      </article>
    </PageShell>
  );
}

function CtaBlock() {
  return (
    <aside className="mt-16 rounded-2xl border border-primary/30 bg-primary/5 p-8">
      <h3 className="text-2xl font-bold tracking-tight">Want a website that actually pulls leads in Calgary?</h3>
      <p className="mt-3 text-muted-foreground">
        We build done-for-you lead generation websites and automated follow-up for Alberta trades and local
        services — for a one-time <strong className="text-foreground">$500 setup</strong>, no monthly retainer
        required.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/apply"
          className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_30px_var(--glow-blue)]"
        >
          Apply for the $500 Setup
        </Link>
        <Link
          to="/free-audit"
          className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-secondary px-5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/80"
        >
          Get a Free Revenue Audit <ArrowRight className="ml-1.5 h-4 w-4" />
        </Link>
      </div>
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/* Article 1 — Full                                                            */
/* -------------------------------------------------------------------------- */

function AffordableCalgaryArticle() {
  return (
    <>
      <p>
        If you run a small business in Calgary — a Kensington café, a Beltline salon, a roofing crew working out
        of southeast industrial, or an electrical contractor covering Airdrie and Cochrane — you've probably been
        quoted somewhere between $3,000 and $15,000 for a new website. And you've probably wondered the same
        thing every other Alberta business owner asks: <em>is any of this actually going to bring in customers,
        or am I just paying for a digital business card?</em>
      </p>
      <p>
        Here's the honest answer for 2026: an affordable, high-converting website for a Calgary small business
        does not need to cost five figures. It needs to do seven specific things really well. Most agencies
        charge you for the other forty things you don't need.
      </p>

      <h2>Why most Calgary small business websites underperform</h2>
      <p>
        We audit a lot of Alberta business sites — trades, cafés, dentists, fitness studios, home services — and
        the same problems show up over and over:
      </p>
      <ul>
        <li>
          <strong>Built for the owner, not the buyer.</strong> Big hero image of the storefront, a slow carousel,
          three paragraphs of "about us." Meanwhile the visitor wants to know if you serve their neighbourhood,
          what it costs, and how fast they can book.
        </li>
        <li>
          <strong>No clear call-to-action above the fold.</strong> On mobile, a Calgary user gives you maybe 3
          seconds before bouncing. If there's no phone number, quote form, or "Book Now" button visible without
          scrolling, you've lost them.
        </li>
        <li>
          <strong>Slow on Telus and Rogers LTE.</strong> Heavy theme, uncompressed images, blocking scripts.
          Google's Core Web Vitals quietly demote you in local search.
        </li>
        <li>
          <strong>No follow-up system.</strong> Lead fills out a form at 9 PM. You see it Monday morning. They
          already called your competitor.
        </li>
      </ul>
      <p>
        None of these are design problems. They're <strong>system</strong> problems. And fixing them does not
        require a $10,000 rebuild.
      </p>

      <h2>What a "Calgary web design" project should actually cost in 2026</h2>
      <p>Realistic 2026 pricing for a small business website in Calgary, by tier:</p>
      <ul>
        <li>
          <strong>$0 — DIY (Wix, Squarespace, Shopify template).</strong> Fine for proof of concept. Will not
          rank locally, will not convert on mobile, will not integrate follow-up.
        </li>
        <li>
          <strong>$500 – $1,500 — Productized lead-gen website.</strong> Built on a proven conversion
          template, lead form wired to your phone and email, Google Business Profile setup, basic local SEO. This
          is what 90% of Calgary trades and local services actually need.
        </li>
        <li>
          <strong>$3,000 – $8,000 — Custom small-agency build.</strong> Usually six weeks of meetings, a fancy
          design, and no real difference in lead volume.
        </li>
        <li>
          <strong>$10,000+ — Full custom agency.</strong> Justified only if you're a multi-location operator or
          running serious ad spend through it.
        </li>
      </ul>
      <p>
        For most Calgary cafés, salons, contractors, and home services, the sweet spot is the <strong>$500 –
        $1,500 productized tier</strong>. You're paying for the system, not the design hours.
      </p>

      <h2>Seven specs that separate a lead engine from a brochure</h2>

      <h3>1. Above-the-fold lead capture (visible without scrolling on mobile)</h3>
      <p>
        On a phone, the first 600 pixels are the only pixels that matter. You need either a click-to-call button,
        a short quote form (3 fields max — name, phone, what they need), or both. Every example we ship for
        Alberta trades — see{" "}
        <Link to="/website-examples">our website examples</Link> — has lead capture above the fold by default.
      </p>

      <h3>2. Real local proof, not stock photos</h3>
      <p>
        Calgary buyers can sniff out a Shutterstock skyline from a kilometre away. Use photos of your actual
        trucks, your actual crew, work you've done in Bowness, Tuscany, McKenzie Towne, or wherever your service
        area really is. Tag reviews by neighbourhood when you can.
      </p>

      <h3>3. Google-ready page speed (Core Web Vitals)</h3>
      <p>
        Google's <strong>LCP</strong> (largest contentful paint) needs to land under 2.5 seconds on a 4G
        connection. That means compressed hero images (WebP, not 4 MB PNGs), no carousel, no auto-playing video,
        and lazy-loaded everything below the fold. A clean stack like TanStack Start or a well-built Webflow site
        beats almost any Calgary WordPress agency build on Vitals out of the box.
      </p>

      <h3>4. Local schema and a tight Google Business Profile</h3>
      <p>
        Your homepage should ship with <code>LocalBusiness</code> JSON-LD schema including your name, address
        (or service area), phone, hours, and service types. Then your GBP needs to match it character-for-character —
        same NAP (name, address, phone) on the website, GBP, Yelp, HomeStars, and YellowPages.ca. Inconsistency is
        the #1 reason Calgary businesses don't show up in the map pack.
      </p>

      <h3>5. Service-area pages for nearby cities</h3>
      <p>
        If you cover Calgary plus Airdrie, Cochrane, Okotoks, Chestermere, and Strathmore, you need a real page
        for each — not a dropdown link, an actual page with local content, reviews from that area, and unique
        copy. This is how you stack rankings across the whole Calgary CMA without paying for ads in every town.
      </p>

      <h3>6. Automated follow-up the moment a lead submits</h3>
      <p>
        The single biggest lift for any Calgary small business website is not design — it's automation. The
        moment someone fills your form, they should get a text from your business within 60 seconds and an email
        receipt. Studies from InsideSales and Harvard Business Review consistently show response time under 5
        minutes increases conversion by 9x. We build this in by default; if your current site doesn't have it,
        that's the first thing to fix.
      </p>

      <h3>7. Honest analytics — leads, not pageviews</h3>
      <p>
        Skip the vanity dashboard. Track form submissions, click-to-call taps, and which city or neighbourhood
        the lead came from. GA4 + a simple call-tracking number is enough for 95% of Alberta small businesses.
      </p>

      <h2>Mini case study: a Calgary trades site, before and after</h2>
      <p>
        One Calgary electrical contractor we worked with was running a $4,200 WordPress site that pulled 2–3
        form fills a month. We rebuilt the same content as a productized lead-gen site for a fraction of the
        cost, focused on the seven specs above: above-the-fold quote form, ESA-certified trust badges, dual
        emergency click-to-call CTAs, service-area pages for Calgary, Airdrie, and Cochrane, and SMS auto-reply
        within 30 seconds of a submission. Lead volume tripled within the first 60 days — same traffic, better
        machine. (See <Link to="/website-examples">TrueCan Power Systems in our examples</Link>.)
      </p>

      <h2>Where it's safe to cut, and where it's not</h2>
      <p><strong>Safe to cut:</strong></p>
      <ul>
        <li>Custom illustration budgets.</li>
        <li>Multiple rounds of "let's see another logo direction."</li>
        <li>Bespoke CMS builds for a 6-page site.</li>
        <li>Blog content nobody reads (write 3 pillar articles, not 30 thin ones).</li>
      </ul>
      <p><strong>Do not cut:</strong></p>
      <ul>
        <li>Mobile performance.</li>
        <li>The lead form and the automation behind it.</li>
        <li>Local schema and GBP setup.</li>
        <li>Real photography of your real Calgary business.</li>
      </ul>

      <h2>Quick affordable web design checklist for Calgary owners</h2>
      <ul>
        <li>Loads in under 2.5s on mobile LTE.</li>
        <li>Phone number and quote CTA visible without scrolling.</li>
        <li>Service-area pages for every Alberta town you cover.</li>
        <li>Reviews from real Calgary clients on the homepage.</li>
        <li>SMS + email auto-reply to every form fill.</li>
        <li>NAP matches GBP, Yelp, HomeStars, YellowPages.ca exactly.</li>
        <li>You can edit your own headlines and offers without calling a developer.</li>
      </ul>
      <p>
        If your current site fails three or more of these, you don't need a redesign — you need a new system.
        That's literally why we built the $500 Revenue Engine Setup: to give Calgary and Alberta business owners
        a proven lead-gen website without the agency price tag.
      </p>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Article 2 — Outline                                                         */
/* -------------------------------------------------------------------------- */

function LocalSeoOutline() {
  return (
    <>
      <p>
        <em>
          Full article publishing soon. Outline below — if you'd like us to prioritize this one, reply to any
          ClickAdMedia email and we'll move it to the top of the queue.
        </em>
      </p>
      <h2>Working outline</h2>
      <ol>
        <li>
          <strong>Why local SEO is the highest-ROI channel for Alberta SMBs.</strong> Compared to Google Ads
          ($4–$18 CPC in Calgary trades), ranking in the 3-pack is essentially free traffic.
        </li>
        <li>
          <strong>Google Business Profile, the right way.</strong> Categories (primary + secondary), service
          area vs. address-based, weekly photos, Q&amp;A, products/services, GBP posts.
        </li>
        <li>
          <strong>NAP consistency across the Alberta directory web.</strong> Yelp, HomeStars, YellowPages.ca,
          BBB, Foursquare, Apple Maps Business Connect — and what to do when your old address keeps reappearing.
        </li>
        <li>
          <strong>The Calgary review playbook.</strong> Review velocity, response templates, keyword-rich
          review prompts (without violating Google's guidelines), and how to recover from a one-star review.
        </li>
        <li>
          <strong>Service-area pages that actually rank.</strong> Templates for Airdrie, Cochrane, Okotoks,
          Chestermere, Strathmore — and why "Calgary AND area" pages never crack the map pack.
        </li>
        <li>
          <strong>On-page signals.</strong> Title tags, <code>LocalBusiness</code> schema, internal linking,
          embedded GBP map, and the "city + service" H1 formula.
        </li>
        <li>
          <strong>Measurement.</strong> GA4 events for calls and forms, Search Console queries to watch, GBP
          insights, and the one weekly report that tells you if your local SEO is actually working.
        </li>
        <li>
          <strong>Common Alberta mistakes.</strong> PO box addresses, virtual offices, keyword-stuffed business
          names, fake review buying — what gets you suspended in 2026.
        </li>
        <li>
          <strong>30-day Alberta local SEO sprint.</strong> Week-by-week action plan a Calgary business owner
          can run themselves.
        </li>
      </ol>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Article 3 — Outline                                                         */
/* -------------------------------------------------------------------------- */

function MobileTradesOutline() {
  return (
    <>
      <p>
        <em>
          Full article publishing soon. Outline below. Aimed at HVAC, electrical, roofing, plumbing, and
          landscaping crews working in and around Calgary.
        </em>
      </p>
      <h2>Working outline</h2>
      <ol>
        <li>
          <strong>The cold-weather mobile reality.</strong> Why 70%+ of Calgary trade searches happen on a phone,
          often outside, often with gloves on at -25°C — and what that does to your form abandonment rate.
        </li>
        <li>
          <strong>Core Web Vitals, plainly explained.</strong> LCP, CLS, and INP for non-developers. The four
          things that wreck them on most Alberta trades sites.
        </li>
        <li>
          <strong>Image and asset diet.</strong> WebP/AVIF, responsive <code>srcset</code>, lazy loading,
          dropping the hero video, and why your logo PNG is probably 2 MB too heavy.
        </li>
        <li>
          <strong>Click-to-call above the fold.</strong> Big, thumb-sized, sticky on scroll. The exact placement
          that doubles call volume for emergency services.
        </li>
        <li>
          <strong>Quote-form friction audit.</strong> 3 fields beats 9 fields, every single time. How to handle
          "what kind of work?" with one tap, not a paragraph.
        </li>
        <li>
          <strong>Trust signals that travel.</strong> Licence numbers (ESA, APEGA), insurance, warranty, before/
          after photos, and reviews tagged by Calgary neighbourhood.
        </li>
        <li>
          <strong>Case studies.</strong> WestLights and TrueCan Power Systems — what changed when we rebuilt
          their sites mobile-first.
        </li>
        <li>
          <strong>Speed test &amp; fix-it checklist.</strong> A 10-minute self-audit any Calgary trade owner can
          run with PageSpeed Insights, and what to ask a developer to fix first.
        </li>
      </ol>
    </>
  );
}
