# SunChe

Static Ukrainian website for solar installations and backup power in Chernihiv and the Chernihiv region.

## Publication

GitHub Pages publishes the root of `main` at https://tishinatyt.github.io/sunche-new/.
The website needs no frontend build and does not depend on the Express server.

- `index.html`: content, responsive styles, metadata and JSON-LD.
- `app.js`: optional help widget and sticky action. Core content works without JavaScript.
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
