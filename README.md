# Team Yulsa website

Production website for **teamyulsa.com** — outsourced bookkeeping, accounting, and virtual CFO
services for US and Canadian businesses.

Built with Vite, React, TypeScript, and Tailwind CSS. The build is fully static: no server, no
database, no monthly hosting bill required.

## Current status

| Item | Value |
| --- | --- |
| Repository | <https://github.com/nishalkhanal22/team-yulsa-redesign> |
| Live preview | <https://nishalkhanal22.github.io/team-yulsa-redesign/> |
| Production domain | `teamyulsa.com` — still serving the previous site |
| Previous history | preserved on branch `archive/pre-redesign` |

The preview updates automatically on every push to `main`. `teamyulsa.com` will keep serving the
old site until someone completes one of the go-live options under **Deploying**.

> Email (`info@teamyulsa.com`) is hosted on the same server as the old website
> (`167.235.9.123`). Do not change nameservers without recreating the MX and SPF records first.

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

### cPanel / shared hosting (current host — recommended for go-live)

The current `teamyulsa.com` server also handles email, so this is the lowest-risk move.

1. Run `pnpm build`.
2. Upload the **contents** of `dist/public` to `public_html` (File Manager or FTP). Delete the old
   PHP files first, or move them to a backup folder outside `public_html`.
3. `client/public/.htaccess` is copied into the build and handles 404s, compression, caching, the
   www → non-www redirect, HTTPS, and the legacy `.php` → new-route 301s.
4. Confirm AutoSSL / Let's Encrypt still covers `teamyulsa.com`.

### Cloudflare Pages

Only choose this if you are ready to move DNS. The current email setup (`MX = teamyulsa.com`,
SPF includes `167.235.9.123`) lives on the same server, so MX and SPF records must be recreated in
Cloudflare before the nameserver change.

1. In Cloudflare Pages: **Create a project → Connect to Git** and select the repository.
2. Build command: `pnpm build`. Build output directory: `dist/public`.
3. Add the custom domain `teamyulsa.com` and `www.teamyulsa.com`.
4. Point the domain at Cloudflare nameservers, then re-add MX, SPF, and any other mail records.

### Netlify

1. In Netlify: **Add new site → Import an existing project**.
2. Netlify reads `netlify.toml` automatically (build `pnpm build`, publish `dist/public`).
3. Add `teamyulsa.com` under **Domain management** and follow the DNS instructions.

### GitHub Pages (currently live preview)

The workflow in `.github/workflows/deploy-pages.yml` builds and deploys automatically on pushes
to `main`. Pages is already enabled with **Source: GitHub Actions**. The site is served under
`/team-yulsa-redesign/`; canonical URLs still point to `teamyulsa.com`.

To serve the domain from Pages instead, add a `CNAME` file containing `teamyulsa.com` to
`client/public`, then point the apex A records at GitHub's four IPs and `www` at
`nishalkhanal22.github.io`. Note that GitHub Pages cannot issue 301s for the old `.php` URLs.

## Legacy URLs

The previous site used `/index.php`, `/about-us.php`, `/services.php`, `/contact.php`,
`/blogs.php`, and `/frontend/_blogs/blog1.php`. All of them are redirected to the matching new
route in `.htaccess`, `_redirects`, and `vercel.json`, so rankings and old links keep working.

## After launch

1. **Google Search Console** — add `teamyulsa.com`, verify by DNS, submit
   `https://teamyulsa.com/sitemap.xml`.
2. **Bing Webmaster Tools** — import from Search Console.
3. **Google Business Profile** — keep the existing listing; add the new site URL.
4. Confirm `https://teamyulsa.com/og-image.jpg` loads and test sharing on LinkedIn.
5. Optional analytics: add a privacy-friendly script (Plausible, Fathom, or GA4) before
   `</body>` in `client/index.html`; update the privacy policy if you add cookies.

## Lead form and booking

The contact form posts to the Google Apps Script endpoint in
`client/src/lib/siteData.ts` (`BRAND.bookingEndpoint`). If that endpoint changes, update it there.

**Timezone handling.** The form never guesses. A slot is an exact instant:

- Slots are defined in `America/New_York`, Monday–Friday, 9:00–17:00, in
  `client/src/lib/booking.ts` (`BOOKING`). Change `startHour`/`endHour`/`slotMinutes` there.
- The visitor's timezone is auto-detected (`Intl.DateTimeFormat`) and can be overridden.
- Every slot and the confirmation show the visitor's local time **and** the same instant in
  `Asia/Kathmandu`, so a 9:00 AM New York call reads as 7:45 PM in Kathmandu. The server
  (`Utilities.parseDate`) converts the wall clock plus IANA zone to one UTC instant, so the
  Google Calendar event is identical for both sides.
- Already-booked slots are greyed out by asking the endpoint for availability; if the endpoint
  does not answer, the picker still works and the server rejects conflicts on submit.

**One-time Apps Script update.** The site now expects the script in
`scripts/apps-script/booking.gs` (availability endpoint, conflict check, Meet link, dual-timezone
emails). Paste it into the Apps Script editor, enable the **Calendar API** advanced service, set
`CONFIG`, then deploy a new version of the existing deployment so the URL stays the same. Full
steps are in the file header.

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
    lib/booking.ts           slot generation + timezone conversion
    lib/team.ts              team helpers
    lib/siteData.ts          services, industries, FAQ, contact details
    pages/                   route components
scripts/
  apps-script/booking.gs     Google Apps Script booking API (paste into Apps Script)
  optimize-images.mjs        WebP generation
  postbuild.ts               per-route HTML, sitemap, robots, 404
  generate-brand-assets.mjs  OG image + favicons (run only if the logo changes)
```
