# Team Yulsa website

Production website for **teamyulsa.com** — outsourced bookkeeping, accounting, and virtual CFO
services for US and Canadian businesses.

Built with Vite, React, TypeScript, and Tailwind CSS. The build is fully static: no server, no
database, no monthly hosting bill required.

## What is included

- 24 prerendered routes (home, services, 10 service pages, industries, 6 industry pages, about,
  security, how it works, contact, privacy) with unique titles, descriptions, canonicals, Open
  Graph tags, and JSON-LD.
- Generated `sitemap.xml`, `robots.txt`, and `404.html`.
- Responsive WebP images generated from source photos at build time.
- Self-hosted fonts (no Google Fonts request).
- Client-editable team members through Pages CMS.
- Lead form that posts to the existing Google Apps Script booking endpoint.
- Deploy configs for Cloudflare Pages, Netlify, Vercel, GitHub Pages, and cPanel/Apache.

## Local development

Requirements: Node 20.11+ and pnpm 10+.

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm check      # TypeScript
pnpm build      # static build into dist/public
pnpm preview    # preview the production build
```

`pnpm dev` and `pnpm build` both run `scripts/optimize-images.mjs` first. New team photos are
picked up automatically.

## Deploying

The only deployable output is **`dist/public`**.

### Cloudflare Pages (recommended)

1. Push this repository to GitHub.
2. In Cloudflare Pages: **Create a project → Connect to Git** and select the repository.
3. Build command: `pnpm build`. Build output directory: `dist/public`.
4. Add the custom domain `teamyulsa.com` and `www.teamyulsa.com`.
5. In Namecheap DNS, point the domain to Cloudflare nameservers (or add the CNAME/A records
   Cloudflare shows). Remove the old site records.

### Netlify

1. In Netlify: **Add new site → Import an existing project**.
2. Netlify reads `netlify.toml` automatically (build `pnpm build`, publish `dist/public`).
3. Add `teamyulsa.com` under **Domain management** and follow the DNS instructions.

### cPanel / shared hosting (Nepali host or Namecheap)

1. Run `pnpm build`.
2. Upload the **contents** of `dist/public` to `public_html` (File Manager or FTP).
3. `client/public/.htaccess` is copied into the build and handles 404s, compression, caching,
   and the www → non-www redirect.
4. Enable AutoSSL / Let's Encrypt for `teamyulsa.com`.

### GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` builds and deploys automatically on pushes
to `main`. Enable **Settings → Pages → Source: GitHub Actions**. Note that GitHub Pages serves
the site under `/team-yulsa-redesign/`; canonical URLs still point to `teamyulsa.com`.

## After launch

1. **Google Search Console** — add `teamyulsa.com`, verify by DNS, submit
   `https://teamyulsa.com/sitemap.xml`.
2. **Bing Webmaster Tools** — import from Search Console.
3. **Google Business Profile** — keep the existing listing; add the new site URL.
4. Update the old site's 301 redirects at the host so existing rankings carry over. The most
   common old URLs (`/about`, `/services`, `/contact`) already match this site's routes.
5. Confirm `https://teamyulsa.com/og-image.jpg` loads and test sharing on LinkedIn.
6. Optional analytics: add a privacy-friendly script (Plausible, Fathom, or GA4) before
   `</body>` in `client/index.html`; update the privacy policy if you add cookies.

## Lead form

The contact form posts to the Google Apps Script endpoint in
`client/src/lib/siteData.ts` (`BRAND.bookingEndpoint`). If that endpoint changes, update it there.
The form uses `no-cors`, so the site cannot read the response — it confirms the request was sent
and the team confirms the slot by email.

## Team editing

See `CONTENT-GUIDE.md`. The short version: sign in at <https://app.pagescms.org>, open this
repository, edit **Team members**, upload a photo, publish. The site rebuilds automatically.

## Project structure

```
client/
  index.html                 HTML shell + site-wide JSON-LD
  public/                    static files, images, favicons, _headers, .htaccess
  src/
    content/team.json        client-editable team data
    lib/seo.ts               route SEO + JSON-LD (single source of truth)
    lib/team.ts              team helpers
    lib/siteData.ts          services, industries, FAQ, contact details
    pages/                   route components
scripts/
  optimize-images.mjs        WebP generation
  postbuild.ts               per-route HTML, sitemap, robots, 404
  generate-brand-assets.mjs  OG image + favicons (run only if the logo changes)
```
