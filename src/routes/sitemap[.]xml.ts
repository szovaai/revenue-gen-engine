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
