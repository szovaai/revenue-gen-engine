
# Add Blog Section + 10 Articles (Batch 1)

Build a static, file-based blog on `clickadmedia.co` matching the existing dark CAM design system, with the 10 articles you supplied and one AI-generated hero image per article.

## Routes (TanStack Start, file-based)

- `src/routes/blog.tsx` — layout route returning `<Outlet />`.
- `src/routes/blog.index.tsx` — `/blog` listing page: hero + responsive card grid (image, title, meta description, "Read article →"). Reuses `glass-card`, `section-label`, `text-gradient`, `useReveal`.
- `src/routes/blog.$slug.tsx` — `/blog/:slug` article page: full-width hero image, H1, meta line (read time), long-form prose, CTA back to `/book-a-call`. Sets per-route `head()` with title, description, `og:title`, `og:description`, `og:image` (the hero), and canonical.
- 404 via `notFoundComponent` on `blog.$slug.tsx` when slug not in registry.

## Article data

`src/content/blog/posts.ts` — typed registry:

```ts
type Post = {
  slug: string;
  title: string;
  description: string;     // meta description from your brief
  keyword: string;         // target keyword
  readMinutes: number;
  image: string;           // imported asset URL
  body: string;            // markdown source
};
```

One entry per article. Bodies stored as markdown strings in `src/content/blog/<slug>.md` (raw-imported via Vite's `?raw`) so the long copy stays out of the TS file. Rendered with `react-markdown` + `remark-gfm` (small, SSR-safe) styled by a scoped `.prose-cam` class in `src/styles/cam.css` (headings, paragraphs, lists, links — on-brand, no Tailwind Typography dep).

Slugs:
1. `how-much-should-i-pay-for-a-website-designer`
2. `can-i-hire-someone-to-design-my-website`
3. `where-to-find-a-good-web-designer-for-small-business`
4. `how-to-hire-a-web-designer-without-overspending`
5. `questions-to-ask-a-web-designer-before-hiring`
6. `local-web-designer-vs-freelance-platform`
7. `how-to-check-a-web-designers-portfolio`
8. `do-i-need-a-professional-web-designer`
9. `how-long-does-it-take-to-get-a-website-designed`
10. `web-designer-cost-vs-website-builder`

## Images (AI-generated)

One 1536×864 (16:9) JPG per article in `src/assets/blog/<slug>.jpg`, generated via the `imagegen` tool (premium tier for the cover-quality look). Visual direction matches the existing CAM brand: dark navy/black backgrounds, blue→cyan glow (`#007bff → #00c6ff`), subtle grid/glass elements, photographic-but-stylized — no stock-photo people, no text in the image. Each prompt is tailored to the article (e.g. "pricing tiers / Canadian small biz workspace" for article 1, "designer-client handshake abstracted as glowing nodes" for article 2, etc.). Imported as ES6 modules and reused for both card thumbnail and `og:image`.

## Navigation + SEO

- Add "Blog" link to `CamLayout` header nav and footer.
- `src/routes/sitemap[.]xml.ts` — append `/blog` and all 10 article URLs.
- `public/llms.txt` — add a Blog section listing the 10 posts.
- Per-article `head()` uses the supplied meta descriptions verbatim; canonical and `og:url` self-reference `https://clickadmedia.co/blog/<slug>`; `og:type: "article"`; Article JSON-LD with `headline`, `description`, `image`, `author: { @type: Organization, name: "ClickAdMedia" }`, `datePublished`.

## Dependencies

`bun add react-markdown remark-gfm` (small, SSR-safe, no other transitive AI/runtime deps).

## Out of scope

- CMS / database-backed posts (you chose static).
- Comments, search, tag pages, RSS — can add later if you want.
- Batch 2 (articles 11–20) — wait for your go-ahead.

## Files touched

Created: `src/routes/blog.tsx`, `src/routes/blog.index.tsx`, `src/routes/blog.$slug.tsx`, `src/content/blog/posts.ts`, `src/content/blog/<slug>.md` ×10, `src/assets/blog/<slug>.jpg` ×10.
Edited: `src/components/cam/CamLayout.tsx` (nav link), `src/styles/cam.css` (`.prose-cam`), `src/routes/sitemap[.]xml.ts`, `public/llms.txt`, `package.json` (deps).
