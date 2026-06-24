## Add Batch 4 (Articles 31–40) to Blog

Same pattern as Batches 1–3. Adds 10 more articles to the existing static blog.

### Files to create (20)
10 markdown bodies in `src/content/blog/<slug>.md` and 10 AI-generated hero images in `src/assets/blog/<slug>.jpg` (1536×864, dark navy + blue/cyan glow, no text — matches existing 30).

Slugs:
1. `how-to-scope-your-website-project-before-hiring-a-designer`
2. `best-platforms-to-find-affordable-web-designers`
3. `what-to-expect-when-you-hire-a-web-designer`
4. `how-to-check-references-for-a-web-designer`
5. `why-local-web-designers-are-better-than-offshore-options`
6. `how-much-does-a-website-cost-from-a-professional-designer`
7. `what-should-i-have-ready-before-hiring-a-web-designer`
8. `how-to-find-a-web-designer-who-understands-my-industry`
9. `can-i-pay-a-web-designer-in-installments`
10. `how-to-avoid-getting-ripped-off-by-web-designers`

### Files to edit (3)
- `src/content/blog/posts.ts` — append 10 entries (img31–img40 imports, getPost entries) parsed from the upload (title, meta description, keyword, readMinutes derived from ~word count).
- `src/routes/sitemap[.]xml.ts` — append 10 new blog URLs.
- `public/llms.txt` — append 10 entries.

### Out of scope
No route, listing, design, nav, or CMS changes. No publish — user republishes when ready.