import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://clickadmedia.co";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const blogSlugs = [
          "how-much-should-i-pay-for-a-website-designer",
          "can-i-hire-someone-to-design-my-website",
          "where-to-find-a-good-web-designer-for-small-business",
          "how-to-hire-a-web-designer-without-overspending",
          "questions-to-ask-a-web-designer-before-hiring",
          "local-web-designer-vs-freelance-platform",
          "how-to-check-a-web-designers-portfolio",
          "do-i-need-a-professional-web-designer",
          "how-long-does-it-take-to-get-a-website-designed",
          "web-designer-cost-vs-website-builder",
          "how-to-find-a-web-designer-in-my-area",
          "what-s-included-in-web-designer-pricing",
          "red-flags-when-hiring-a-web-designer",
          "how-to-get-your-website-designed-on-a-tight-budget",
          "should-i-use-fiverr-or-upwork-for-web-design",
          "how-to-find-a-web-designer-through-linkedin",
          "what-should-a-professional-website-cost",
          "how-to-interview-a-web-designer",
          "can-i-hire-a-web-designer-for-just-a-landing-page",
          "web-designer-hourly-rate-vs-project-based-pricing-which-is-better",
          "how-to-find-web-designers-on-dribbble-and-behance",
          "what-makes-a-good-web-designer-worth-the-cost",
          "how-to-avoid-cheap-web-design-disasters",
          "where-do-most-small-businesses-find-web-designers",
          "should-i-hire-a-web-designer-or-a-web-development-agency",
          "how-to-negotiate-web-designer-pricing",
          "what-do-web-designers-charge-for-revisions",
          "how-to-find-a-trustworthy-web-designer",
          "can-i-hire-a-web-designer-for-ongoing-maintenance",
          "what-s-the-difference-between-web-design-and-web-development",
          "how-to-scope-your-website-project-before-hiring-a-designer",
          "best-platforms-to-find-affordable-web-designers",
          "what-to-expect-when-you-hire-a-web-designer",
          "how-to-check-references-for-a-web-designer",
          "why-local-web-designers-are-better-than-offshore-options",
          "how-much-does-a-website-cost-from-a-professional-designer",
          "what-should-i-have-ready-before-hiring-a-web-designer",
          "how-to-find-a-web-designer-who-understands-my-industry",
          "can-i-pay-a-web-designer-in-installments",
          "how-to-avoid-getting-ripped-off-by-web-designers",
        ];

        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/services", changefreq: "monthly", priority: "0.9" },
          { path: "/services/website-design", changefreq: "monthly", priority: "0.9" },
          { path: "/services/seo", changefreq: "monthly", priority: "0.9" },
          { path: "/services/paid-ads", changefreq: "monthly", priority: "0.9" },
          { path: "/portfolio", changefreq: "monthly", priority: "0.8" },
          { path: "/pricing", changefreq: "monthly", priority: "0.8" },
          { path: "/process", changefreq: "monthly", priority: "0.7" },
          { path: "/blog", changefreq: "weekly", priority: "0.8" },
          { path: "/book-a-call", changefreq: "monthly", priority: "0.9" },
          ...blogSlugs.map((slug) => ({
            path: `/blog/${slug}`,
            changefreq: "monthly" as const,
            priority: "0.7",
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
