## Add Batches 2 & 3 to the blog (Articles 11–30)

Extend the existing static blog with 20 more articles using the same pattern established for Batch 1.

### Scope
- Parse both uploaded files and split into 20 individual articles (11–20 and 21–30).
- For each article, extract: title, target keyword, secondary keywords, meta description, slug, and body markdown.

### Files to create
- `src/content/blog/<slug>.md` × 20 — body copy only (matches Batch 1 format).
- `src/assets/blog/<slug>.jpg` × 20 — AI-generated hero images (1536×864, premium tier, same dark navy + blue/cyan glow brand style as Batch 1, no text in image).

### Files to edit
- `src/content/blog/posts.ts` — append 20 new entries (slug, title, description, keyword, readMinutes, image import, body import). Order: newest batch first at top of listing, or keep chronological 1→30 — I'll keep chronological so Batch 1 stays at top and 11–30 follow.
- `src/routes/sitemap[.]xml.ts` — picks up new posts automatically since it maps over `posts`. No change needed if already dynamic (will verify).
- `public/llms.txt` — append the 20 new article URLs.

### Out of scope
- No new routes, no design changes, no listing-page redesign (pagination not needed at 30 cards; grid handles it).
- No CMS, search, tags, or RSS.
- No changes to nav/footer.

### Slugs (derived from titles)
Batch 2: `how-to-find-a-web-designer-in-my-area`, `best-web-designers-for-small-business-canada`, `how-to-vet-a-web-designer-before-hiring`, `red-flags-when-hiring-a-web-designer`, `freelance-vs-agency-web-designer`, `what-to-expect-from-a-web-designer`, `web-designer-vs-web-developer`, `how-web-designers-charge-hourly-vs-flat-fee`, `do-web-designers-include-hosting`, `what-does-a-web-designer-actually-do` (final titles confirmed when parsing the file).

Batch 3: `how-to-find-web-designers-on-dribbble-and-behance`, plus the next 9 titles parsed from the upload.

Final slugs will be normalized (lowercase, hyphenated, no stopwords stripped) when the markdown files are written.
