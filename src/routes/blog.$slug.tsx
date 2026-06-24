import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPost, posts } from "@/content/blog/posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    const post = loaderData?.post;
    if (!post) return { meta: [{ title: "Article not found — ClickAdMedia" }] };
    const url = `https://clickadmedia.co/blog/${params.slug}`;
    const imageUrl = `https://clickadmedia.co${post.image}`;
    return {
      meta: [
        { title: `${post.title} | ClickAdMedia` },
        { name: "description", content: post.description },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: imageUrl },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.description },
        { name: "twitter:image", content: imageUrl },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            image: imageUrl,
            datePublished: post.publishedAt,
            author: { "@type": "Organization", name: "ClickAdMedia" },
            publisher: {
              "@type": "Organization",
              name: "ClickAdMedia",
              url: "https://clickadmedia.co",
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
          }),
        },
      ],
    };
  },
  notFoundComponent: NotFound,
  component: ArticlePage,
});

function NotFound() {
  return (
    <section className="pt-40 pb-24 px-6 text-center">
      <h1 className="text-3xl font-extrabold mb-4">Article not found</h1>
      <p className="text-[rgba(255,255,255,0.55)] mb-6">
        That post may have moved or never existed.
      </p>
      <Link to="/blog" className="btn-primary">
        ← Back to blog
      </Link>
    </section>
  );
}

function ArticlePage() {
  const { post } = Route.useLoaderData();
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article className="pt-28 pb-16">
        <header className="px-6 max-w-[860px] mx-auto text-center mb-10">
          <Link
            to="/blog"
            className="inline-block text-[11px] font-mono uppercase tracking-wider text-[#00c6ff] mb-4 hover:underline"
          >
            ← Blog
          </Link>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-[-0.02em] mb-4">
            {post.title}
          </h1>
          <p className="text-[rgba(255,255,255,0.55)] text-lg">{post.description}</p>
          <div className="mt-5 text-xs font-mono uppercase tracking-wider text-[rgba(255,255,255,0.45)]">
            {post.readMinutes} min read
          </div>
        </header>

        <div className="px-6 max-w-[1080px] mx-auto mb-12">
          <div
            className="relative overflow-hidden rounded-2xl border"
            style={{ borderColor: "rgba(255,255,255,0.08)", boxShadow: "var(--cam-glow)" }}
          >
            <img
              src={post.image}
              alt={post.title}
              width={1536}
              height={864}
              className="w-full aspect-video object-cover"
            />
          </div>
        </div>

        <div className="px-6 max-w-[760px] mx-auto prose-cam">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
        </div>
      </article>

      <section className="relative py-16 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, #007bff, #00c6ff, transparent)",
          }}
        />
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-[-0.02em] mb-3">
            Ready to <span className="text-gradient">get started?</span>
          </h2>
          <p className="text-[rgba(255,255,255,0.55)] mb-6">
            Book a free 10-minute call and we&apos;ll show you exactly what your new site could look like.
          </p>
          <Link to="/book-a-call" className="btn-primary">
            Book a Free Call →
          </Link>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[1280px] mx-auto">
          <h3 className="text-sm font-mono uppercase tracking-wider text-[rgba(255,255,255,0.45)] mb-6 text-center">
            Keep Reading
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="glass-card overflow-hidden group"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width={1536}
                  height={864}
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-sm leading-snug group-hover:text-[#00c6ff] transition-colors">
                    {p.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
