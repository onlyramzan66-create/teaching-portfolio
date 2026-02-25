# SEO Execution Plan - GoharOnline

## Completed in Codebase
- Domain normalized to `https://www.gohar.online` in metadata, schema, sitemap, robots, and structured URLs.
- `robots.txt` implemented via `src/app/robots.ts`.
- XML sitemap implemented via `src/app/sitemap.ts`.
- `llms.txt` implemented at `public/llms.txt`.
- Canonicals added/updated for major routes.
- Metadata coverage added for:
  - `/about`
  - `/become-tutor`
  - `/chemistry`
  - `/computer`
  - `/contact`
  - `/home-tutor-pakistan`
  - `/quran`
  - `/science`
  - `/web-development`
- Organization + EducationalOrganization schema updated in `src/app/components/StructuredData.tsx`.
- GA hook added in `src/app/layout.tsx` (requires `NEXT_PUBLIC_GA_ID` env variable).

## Keyword Map (Primary by Page)
- `/` -> `online tutor pakistan`, `a level o level tuition`.
- `/science` -> `a level o level science tuition`.
- `/computer` -> `a level o level computer science tutor`.
- `/quran` -> `online quran classes pakistan`.
- `/web-development` -> `web development services pakistan`.
- `/home-tutor-pakistan` -> `home tutor pakistan`.
- `/contact` -> `contact online tutor pakistan`.
- `/become-tutor` -> `become tutor pakistan`.

## Immediate Actions Outside Code
1. Add Google Search Console property for `https://www.gohar.online`.
2. Submit sitemap: `https://www.gohar.online/sitemap.xml`.
3. Set `NEXT_PUBLIC_GA_ID` and redeploy to enable analytics.
4. Add DNS email authentication records:
   - SPF
   - DKIM
   - DMARC
5. Replace placeholder social links with real production profiles (X, Instagram, YouTube, LinkedIn) when available.

## Content Plan (8 Weeks)
1. Publish 2 articles/week on high-intent exam topics.
2. Each article should internally link to at least 2 service pages.
3. Add FAQ blocks per page with exam-board specific questions.
4. Build 5-10 quality backlinks/month from education/local directories and partner sites.

## Technical Monitoring
1. Check indexing and query performance weekly in Search Console.
2. Improve CTR by rewriting titles/descriptions for pages with high impressions and low clicks.
3. Re-run page speed tests monthly and optimize heavy media if needed.
