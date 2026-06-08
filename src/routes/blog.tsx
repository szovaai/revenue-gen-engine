import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/home/PageShell";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog | Calgary Web Design & Alberta Local SEO — ClickAdMedia" },
      {
        name: "description",
        content:
          "Practical web design, local SEO, and lead generation guides for Calgary and Alberta small business owners. Written by ClickAdMedia.",
      },
      { property: "og:title", content: "ClickAdMedia Blog — Calgary Web Design & Alberta SEO" },
      {
        property: "og:description",
        content:
          "Tips, case studies, and playbooks to help Calgary and Alberta business owners turn their websites into revenue engines.",
      },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

const posts = [
  {
    slug: "affordable-web-design-calgary-2026",
    title: "Affordable Web Design in Calgary: Top Tips for 2026",
    excerpt:
      "What a high-converting Calgary small business website should cost in 2026, where to cut, where not to, and the seven specs that separate a $500 lead engine from a $5,000 brochure.",
    tag: "Web Design",
    readMin: 9,
  },
  {
    slug: "local-seo-alberta-small-business-2026",
    title: "Local SEO in Alberta: How Small Businesses Get Found on Google in 2026",
    excerpt:
      "A field-tested playbook for ranking in the Calgary, Edmonton, Red Deer, and Lethbridge map packs — Google Business Profile, reviews, NAP, and service-area pages.",
    tag: "Local SEO",
    readMin: 8,
  },
  {
    slug: "mobile-first-websites-calgary-trades",
    title: "Mobile-First Websites for Calgary Trades: Why Slow Sites Lose Jobs",
    excerpt:
      "Why HVAC, electrical, roofing, and plumbing sites lose 40%+ of their leads on mobile — and the Core Web Vitals, click-to-call, and form fixes that get them back.",
    tag: "Trades",
    readMin: 7,
  },
] as const;

function BlogIndex() {
  return (
    <PageShell>
      <section className="px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">ClickAdMedia Blog</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Calgary web design and Alberta local SEO, demystified.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Practical guides for local business owners in Calgary, Airdrie, Cochrane, Okotoks, Edmonton, Red Deer
            and across Alberta. No fluff — just what actually moves leads.
          </p>

          <div className="mt-12 space-y-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50 sm:p-8"
              >
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 font-medium text-foreground">
                    {post.tag}
                  </span>
                  <span>{post.readMin} min read</span>
                </div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="transition-colors group-hover:text-primary"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 text-muted-foreground">{post.excerpt}</p>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  Read the guide <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
