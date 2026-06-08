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

          <div className="mt-10 max-w-none text-foreground/90 [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline [&_code]:rounded [&_code]:bg-secondary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_em]:text-foreground/80 [&_h2]:mt-12 [&_h2]:scroll-mt-24 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:my-1.5 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_p]:my-5 [&_p]:leading-7 [&_strong]:text-foreground [&_ul]:my-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
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
/* Article 2 — Full                                                              */
/* -------------------------------------------------------------------------- */

function LocalSeoOutline() {
  return (
    <>
      <p>
        If you own a small business in Alberta — a Calgary HVAC crew, an Edmonton dental clinic, a Red Deer
        auto shop, or a Lethbridge law firm — you've probably noticed something frustrating: Google Ads keeps
        getting more expensive, and the map pack (the three business listings under the map) seems to be
        dominated by the same companies no matter what you search.
      </p>
      <p>
        Here's the truth most Alberta business owners don't know: ranking in that map pack is not about
        having the biggest budget. It's about doing a specific set of local SEO tasks consistently — most
        of which cost nothing but time. In this guide, we'll walk through the exact playbook we use to get
        Calgary and Alberta businesses found on Google in 2026, including a 30-day sprint you can start
        today.
      </p>

      <h2>Why local SEO is the highest-ROI channel for Alberta SMBs</h2>
      <p>
        A click from a Google Ads campaign for "Calgary plumber" or "Edmonton roofing" can cost anywhere
        from $4 to $18. A click from the map pack costs $0 — and converts at roughly the same rate because
        the searcher is already looking for a local solution right now.
      </p>
      <p>
        According to BrightLocal's 2025 Local Consumer Review Survey, 76% of consumers "regularly" read
        online reviews for local businesses, and 42% of local searches lead to a click on the map pack
        within 24 hours. For Alberta trades, home services, and professional services, that means the map
        pack is often the single biggest source of qualified leads — if you show up there.
      </p>
      <p>
        The businesses that do show up are not necessarily the biggest or the oldest. They're the ones that
        Google trusts to deliver a consistent name, address, phone, and service description everywhere it
        looks. That's what this guide fixes.
      </p>

      <h2>Google Business Profile: the foundation everything else sits on</h2>
      <p>
        Your Google Business Profile (GBP) is the #1 ranking factor for local map pack results. Not your
        website. Not your backlinks. Your GBP. Here's how to set it up to win in Calgary, Edmonton, or any
        Alberta market:
      </p>

      <h3>Pick the right primary category</h3>
      <p>
        Google uses your primary category to decide which searches to show you for. "HVAC Contractor" is
        better than "Heating and Air Conditioning" if that's what your competitors are using — check the
        top three map pack results for your target keyword and match their primary category if it's accurate.
        You can add up to 10 secondary categories (e.g., "Air Conditioning Repair Service," "Furnace Repair
        Service") to capture more searches.
      </p>

      <h3>Service area vs. physical address</h3>
      <p>
        If you run a mobile service — roofing, landscaping, mobile detailing — hide your address and set a
        service area covering Calgary, Airdrie, Cochrane, Okotoks, Chestermere, and Strathmore. If you have
        a real storefront or office customers can visit, use the address. Do not use a PO box, a virtual
        office, or a friend's address. Google suspends profiles for this regularly in 2026.
      </p>

      <h3>Post weekly photos and updates</h3>
      <p>
        Businesses that post photos weekly get significantly more discovery searches. Take real photos of your
        crew working in Tuscany, McKenzie Towne, Bowness, or wherever your actual jobs are. Geo-tag them if
        you can. Write 100–200 word GBP posts once a week with a clear call to action — "Book a free quote
        this week and get 10% off."
      </p>

      <h3>Activate products and services</h3>
      <p>
        Most Alberta businesses leave this section empty. Fill in every service you offer with a description
        that includes the city — "Emergency Furnace Repair in Calgary," "Commercial Roof Inspection in Red
        Deer." Google indexes this text and uses it to match you to searches.
      </p>

      <h2>NAP consistency: the silent killer of Alberta local rankings</h2>
      <p>
        NAP stands for <strong>Name, Address, Phone</strong>. Google crawls hundreds of directories and
        checks whether your NAP is identical everywhere. If your YellowPages.ca listing says "Calgary
        Plumbing Pros Inc." but your GBP says "Calgary Plumbing Pros," and your Facebook page uses a
        different phone number, Google gets confused — and confusion means lower rankings.
      </p>
      <p>Audit and fix your NAP on these Alberta-relevant directories:</p>
      <ul>
        <li>Google Business Profile</li>
        <li>Yelp (yelp.ca)</li>
        <li>HomeStars (essential for trades)</li>
        <li>YellowPages.ca</li>
        <li>Better Business Bureau (bbb.org)</li>
        <li>Foursquare</li>
        <li>Apple Maps Business Connect</li>
        <li>Bing Places for Business</li>
        <li>Facebook Business Page</li>
        <li>Industry-specific directories (e.g., ESA contractor lookup for electricians)</li>
      </ul>
      <p>
        <strong>Pro tip:</strong> If you've moved offices, changed phone numbers, or rebranded, your old
        NAP can linger for years. Use a tool like Moz Local or BrightLocal to find and suppress old
        listings, or hire a local SEO specialist to run a citation cleanup.
      </p>

      <h2>The Alberta review playbook: how to get 5-star reviews without breaking Google's rules</h2>
      <p>
        Reviews are the #2 local ranking factor, and in competitive Alberta markets like Calgary and Edmonton,
        the difference between position 1 and position 3 in the map pack often comes down to review quantity,
        velocity, and sentiment.
      </p>

      <h3>Review velocity: why slow and steady wins</h3>
      <p>
        A business that gets 50 reviews in one week and then nothing for six months looks suspicious. A
        business that gets 3–5 reviews per month consistently looks legitimate and active. Set a simple
        system: every time you finish a job, send a text with a direct GBP review link within 2 hours.
        Follow up once 48 hours later if they haven't left one.
      </p>

      <h3>Review response templates</h3>
      <p>
        Respond to every review — positive and negative — within 24 hours. For positive reviews: thank
        them, name the service, and mention the neighbourhood. "Thanks Sarah! Glad the emergency furnace repair
        in Tuscany kept your family warm during that cold snap."
      </p>
      <p>
        For negative reviews: apologise, take responsibility, move the conversation offline, and offer a
        fix. Never argue. A well-handled one-star review often convinces future readers more than a string
        of perfect fives.
      </p>

      <h3>Keyword-rich review prompts (the safe way)</h3>
      <p>
        You cannot tell customers what to write — that's against Google's guidelines and can get reviews
        removed. But you <em>can</em> ask specific questions that naturally produce keyword-rich answers:
        "How did our Calgary HVAC team do on your furnace installation?" or "Would you recommend our Red
        Deer roofing crew to a neighbour?"
      </p>

      <h2>Service-area pages: how to rank in Airdrie, Cochrane, and Okotoks without a physical office</h2>
      <p>
        If your main office is in Calgary but you serve Airdrie, Cochrane, Okotoks, Chestermere, and
        Strathmore, you need a dedicated page for each city. Not a dropdown. Not a paragraph on your
        homepage. A real page.
      </p>
      <p>Each service-area page should include:</p>
      <ul>
        <li>A unique H1 like "HVAC Repair in Airdrie, Alberta — Same-Day Service"</li>
        <li>At least 400 words of unique, useful copy about that area (not duplicated from Calgary)</li>
        <li>A photo from a real job in that city</li>
        <li>A review or testimonial from a customer in that city</li>
        <li>A clear call to action with a click-to-call button</li>
        <li>Embedded directions or a map showing the route from that city to your service area</li>
      </ul>
      <p>
        The biggest mistake we see? A single page titled "Calgary and Area" with a bulleted list of towns.
        Google ignores those. Specificity wins.
      </p>

      <h2>On-page signals that tell Google you're a real Alberta business</h2>
      <p>
        Your website needs to back up your GBP with matching signals. Here's the checklist:
      </p>
      <ul>
        <li>
          <strong>Title tags with city + service.</strong> "Calgary Plumber | Emergency Drain & Pipe Repair
          | YourBusinessName"
        </li>
        <li>
          <strong>LocalBusiness schema.</strong> JSON-LD on every page with your NAP, hours, service area,
          and accepted payment types.
        </li>
        <li>
          <strong>Embedded Google Map.</strong> An iframe or static map linking to your GBP on your contact
          page reinforces your location signal.
        </li>
        <li>
          <strong>Internal linking.</strong> Link from your homepage to each service-area page, and from each
          service-area page back to your main service and contact pages.
        </li>
        <li>
          <strong>Neighbourhood mentions.</strong> Weave in real Calgary neighbourhoods (Kensington, Inglewood,
          Bridgeland, etc.) or Edmonton areas (Whyte Ave, Oliver, Strathcona) in your copy where natural.
        </li>
      </ul>

      <h2>How to measure if your Alberta local SEO is actually working</h2>
      <p>
        Don't track vanity metrics. Track these four numbers:
      </p>
      <ol>
        <li>
          <strong>GBP insights — "Calls" and "Website clicks."</strong> These are your lead indicators. If
          they're flat or falling, something upstream (reviews, photos, NAP) needs attention.
        </li>
        <li>
          <strong>GA4 events — form submissions and click-to-call taps.</strong> Set these up as conversions
          so you can see which pages and traffic sources actually drive leads.
        </li>
        <li>
          <strong>Google Search Console — "Queries" report.</strong> Look for "near me" and city-specific
          terms. If your impressions are climbing but clicks are flat, your title tags or GBP might need
          sharpening.
        </li>
        <li>
          <strong>Review velocity.</strong> Count new reviews per month. Target 4–8 for a solo operator, 10–20
          for a crew with multiple techs.
        </li>
      </ol>
      <p>
        Run these numbers in a simple spreadsheet once a week. In 90 days you'll know exactly whether your
        local SEO investment is paying off.
      </p>

      <h2>Mistakes that get Alberta businesses suspended or delisted</h2>
      <p>
        Google cracked down hard on spammy local SEO tactics in 2025–2026. Avoid these:
      </p>
      <ul>
        <li>
          <strong>PO box or virtual office addresses.</strong> If Google Street View shows a UPS Store or a
          Regus suite, your profile is at risk.
        </li>
        <li>
          <strong>Keyword-stuffed business names.</strong> "Calgary Best Affordable HVAC Repair Pros" is
          not a real business name. Use your legal DBA and add keywords in the description, not the title.
        </li>
        <li>
          <strong>Fake or incentivised reviews.</strong> Offering a $50 gift card for a review violates
          Google's policy and can wipe your entire review history.
        </li>
        <li>
          <strong>Duplicate GBP listings.</strong> One business, one profile. If you have old profiles from
          a previous owner or location, contact Google support to merge or close them.
        </li>
      </ul>

      <h2>Your 30-day Alberta local SEO sprint</h2>
      <p>
        Here's a week-by-week action plan any Calgary, Edmonton, or Red Deer business owner can run:
      </p>

      <h3>Week 1 — Foundation</h3>
      <ul>
        <li>Claim or verify your Google Business Profile.</li>
        <li>Audit your NAP on the top 10 directories and fix inconsistencies.</li>
        <li>Set your primary and secondary categories.</li>
        <li>Upload 5 real photos with geo-tags.</li>
      </ul>

      <h3>Week 2 — Content and pages</h3>
      <ul>
        <li>Write or commission one service-area page for your next most important city.</li>
        <li>Add LocalBusiness schema to your homepage.</li>
        <li>Update your title tags to include city + service.</li>
        <li>Embed a Google Map on your contact page.</li>
      </ul>

      <h3>Week 3 — Reviews and posts</h3>
      <ul>
        <li>Send review requests to your last 20 happy customers.</li>
        <li>Respond to every existing review.</li>
        <li>Post 2 GBP updates with offers or seasonal tips.</li>
        <li>Add products/services descriptions with city names.</li>
      </ul>

      <h3>Week 4 — Measurement and iteration</h3>
      <ul>
        <li>Set up GA4 conversion events for calls and forms.</li>
        <li>Check Search Console for "near me" and city query impressions.</li>
        <li>Document your top 3 competitors' GBP categories and review counts.</li>
        <li>Plan next month's service-area page and photo batch.</li>
      </ul>

      <h2>When to hire help, and what it should cost</h2>
      <p>
        If you're a solo operator with 5–10 hours a week, you can run most of this yourself. If you're a
        growing crew with 3+ service areas and you're already busy, a local SEO specialist or agency saves
        you time and catches things you'd miss.
      </p>
      <p>
        Be careful: many agencies charge $1,000–$2,500/month for "local SEO" that consists of a monthly
        report and a few directory submissions. The work that actually moves rankings — GBP management,
        review systems, service-area content, and citation cleanup — is specific and trackable. If your
        agency can't show you week-over-week GBP call and direction data, you're paying for busywork.
      </p>
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
