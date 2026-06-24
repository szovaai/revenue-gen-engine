import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/lib/use-reveal";
import { posts } from "@/content/blog/posts";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Web Design Advice for Canadian Small Businesses | ClickAdMedia" },
      {
        name: "description",
        content:
          "Honest, practical web design and marketing advice for Canadian small businesses. Pricing, hiring tips, process guides, and more from the ClickAdMedia team.",
      },
      { property: "og:title", content: "ClickAdMedia Blog — Web Design Advice for Canadian Small Businesses" },
      {
        property: "og:description",
        content:
          "Honest, practical web design and marketing advice for Canadian small businesses.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://clickadmedia.co/blog" },
    ],
    links: [{ rel: "canonical", href: "https://clickadmedia.co/blog" }],
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const gridRef = useReveal<HTMLElement>();

  return (
    <>
      <section className="relative pt-32 pb-12 px-6">
        <div className="max-w-[1280px] mx-auto text-center">
          <span className="section-label">Insights & Guides</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.02em] mb-4">
            Straight Talk on <span className="text-gradient">Web Design</span>
          </h1>
          <p className="text-[rgba(255,255,255,0.55)] text-lg max-w-[640px] mx-auto">
            Honest, practical advice for Canadian small business owners — pricing, hiring,
            timelines, and what actually moves the needle online.
          </p>
        </div>
      </section>

      <section ref={gridRef} className="px-6 pb-24">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p, i) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className={`reveal reveal-delay-${(i % 3) + 1} glass-card overflow-hidden group flex flex-col`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    width={1536}
                    height={864}
                    loading="lazy"
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#00c6ff] mb-2">
                    {p.readMinutes} min read
                  </div>
                  <h2 className="font-bold text-lg leading-snug mb-2 group-hover:text-[#00c6ff] transition-colors">
                    {p.title}
                  </h2>
                  <p className="text-sm text-[rgba(255,255,255,0.55)] line-clamp-3 mb-4">
                    {p.description}
                  </p>
                  <div className="mt-auto text-sm font-semibold text-gradient">
                    Read article →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
