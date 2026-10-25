# SunChe — solar installations in Chernihiv

[SunChe website](https://tishinatyt.github.io/sunche-new/) · [Equipment price list](https://tishinatyt.github.io/sunche-new/price.html)

Static Ukrainian website for solar installations and backup power in Chernihiv and the Chernihiv region.

## Publication

GitHub Pages publishes the root of `main` at https://tishinatyt.github.io/sunche-new/.
The website needs no frontend build and does not depend on the Express server.

- `index.html`: content, responsive styles, metadata and JSON-LD.
- `app.js`: optional help widget and sticky action. Core content works without JavaScript.
- `price.html`, `price.css`, `price.js`: retail catalog with progressively enhanced search, category/availability filters and pagination. All 146 public products are present in the static HTML.
- `downloads/SunChe_Price_RRP.xlsx`: customer workbook containing RRP only. Never publish wholesale prices or the unfiltered supplier workbook.
- `assets/catalog/`: lightweight product thumbnails from the supplied price list.
- `assets/hero-solar-*.webp`: responsive delivery versions of the original photograph.
- `sitemap.xml`: submit https://tishinatyt.github.io/sunche-new/sitemap.xml in the site's URL-prefix Search Console property.

GitHub Pages project directories cannot control the hostname's root `robots.txt`.
The project-level `robots.txt` documents the sitemap; it is not an origin-wide crawler policy.

## Contact widget

The widget provides predefined answers and links to the existing consultation form and Telegram.
It does not call an AI provider or send visitor information automatically.
The UI deliberately describes it as a helper rather than an AI service.

`server.js` is an optional, separate backend. Browser code must never contain provider keys or Telegram bot tokens.
Previously public credentials must be revoked and replaced by their owner; deleting them from the current page does not invalidate copies in Git history.
Before reconnecting the backend, configure new credentials as server environment variables and deploy the API with suitable origin restrictions and abuse controls.

## Local checks

Serve this directory using a static HTTP server and check the desktop and narrow-screen layouts.
Run `node --check app.js` for syntax verification. When editing FAQ content, update the matching FAQPage data in `index.html`.
Keep the canonical URL, sitemap and social image URLs aligned with the production location.

## Price updates

Current source: Nota Trade price list dated 19 October 2026. Keep source RRP currencies and availability dates; do not infer current stock from this snapshot. GoodWe has no source RRP and is shown as price on request. Nine panel rows hidden in the supplier workbook are not included in the public catalog. Replace the customer workbook and matching catalog prices together, update the source date, and verify that no wholesale values remain in the public assets. Confirm the sales unit for accessories before quoting.

## Google Search Console

Use the URL-prefix property `https://tishinatyt.github.io/sunche-new/`, including the final slash; the user does not control DNS for `github.io`. The homepage includes the Google verification meta tag previously supplied by the owner. Confirm that Search Console offers the same token for the signed-in account before clicking Verify; the tag alone does not prove that verification has completed.

After verification, submit `https://tishinatyt.github.io/sunche-new/sitemap.xml` in Sitemaps. Inspect the homepage and `price.html`, run the live URL test, then request indexing for each. A valid sitemap and an indexable page do not guarantee inclusion or rank. Do not claim indexing without Search Console evidence.

The root `https://tishinatyt.github.io/robots.txt` returned 404 on 2026-10-25; this is not a crawl prohibition. The project-level robots.txt cannot replace it. Google does not support a separate site-name result for a subdirectory; changing the site URL or moving domains is not necessary to allow these pages to be indexed.

Audit on 2026-10-25: homepage, catalog and sitemap returned HTTP 200; no noindex meta or X-Robots-Tag was found on the pages. Existing canonicals match the sitemap and catalog content is available without JavaScript. Actual Google indexing status and sitemap submission remain unverified because the GSC Wizard connection requires a subscription.
