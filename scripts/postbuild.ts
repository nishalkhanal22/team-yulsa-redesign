/*
  Post-build static SEO pass.

  Vite produces a single-page index.html. This script turns that into a set of
  real per-route HTML files with unique titles, descriptions, canonicals,
  Open Graph tags, and JSON-LD, then writes sitemap.xml, robots.txt, and a
  404.html. Crawlers and social scrapers get correct HTML before any JS runs.

  Run automatically as part of `pnpm build`.
*/
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  ROUTES,
  SITE,
  canonicalFor,
  routeSchemaFor,
  seoFor,
} from "../client/src/lib/seo";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist", "public");
const template = await fs.readFile(path.join(dist, "index.html"), "utf8");
const today = new Date().toISOString().slice(0, 10);

// The SSR bundle is built by `vite build --ssr` just before this script runs.
const serverEntry = await import(
  pathToFileURL(path.join(root, "dist", "server", "entry-server.js")).href
);
const renderRouteHtml: (routePath: string) => string =
  serverEntry.render ?? serverEntry.default;

/** Put the prerendered markup inside #root so the page has real content. */
function withPrerenderedBody(html: string, routePath: string): string {
  const markup = renderRouteHtml(routePath);
  return html.replace(
    '<div id="root"></div>',
    `<div id="root" data-prerendered="${routePath}">${markup}</div>`
  );
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeXml(value: string): string {
  return escapeHtml(value).replaceAll("'", "&apos;");
}

function replaceTitle(html: string, title: string): string {
  return html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);
}

function replaceMeta(html: string, key: string, value: string): string {
  const pattern = new RegExp(
    `(<meta\\s+(?:name|property)="${key}"\\s+content=")[^"]*(")`
  );
  if (pattern.test(html)) {
    return html.replace(pattern, (_match, start: string, end: string) => {
      return `${start}${escapeHtml(value)}${end}`;
    });
  }
  return html.replace(
    "</head>",
    `    <meta name="${key}" content="${escapeHtml(value)}" />\n  </head>`
  );
}

function replaceCanonical(html: string, href: string): string {
  return html.replace(
    /(<link rel="canonical" href=")[^"]*(")/,
    (_match, start: string, end: string) => `${start}${href}${end}`
  );
}

function renderRoute(routePath: string): string {
  const seo = seoFor(routePath);
  const canonical = canonicalFor(routePath);
  const image = `${SITE.url}${SITE.image}`;

  let html = template;
  html = replaceTitle(html, seo.title);
  html = replaceMeta(html, "description", seo.description);
  html = replaceCanonical(html, canonical);

  html = replaceMeta(html, "og:title", seo.title);
  html = replaceMeta(html, "og:description", seo.description);
  html = replaceMeta(html, "og:url", canonical);
  html = replaceMeta(html, "og:image", image);

  html = replaceMeta(html, "twitter:title", seo.title);
  html = replaceMeta(html, "twitter:description", seo.description);
  html = replaceMeta(html, "twitter:image", image);

  const schema = {
    "@context": "https://schema.org",
    "@graph": routeSchemaFor(routePath),
  };
  html = html.replace(
    "</head>",
    `    <script type="application/ld+json" id="route-schema">${JSON.stringify(
      schema
    )}</script>\n  </head>`
  );

  return withPrerenderedBody(html, routePath);
}

async function writeRoute(routePath: string, html: string) {
  if (routePath === "/") {
    await fs.writeFile(path.join(dist, "index.html"), html, "utf8");
    return;
  }

  const clean = routePath.replace(/^\//, "");
  const dir = path.join(dist, clean);
  await fs.mkdir(dir, { recursive: true });

  // Directory index for hosts that use trailing slashes (/contact/) …
  await fs.writeFile(path.join(dir, "index.html"), html, "utf8");

  // … and a sibling .html file so /contact also resolves on hosts that do not
  // map a clean URL to the directory index.
  await fs.writeFile(path.join(dist, `${clean}.html`), html, "utf8");
}

const routePaths = Object.keys(ROUTES);
for (const routePath of routePaths) {
  await writeRoute(routePath, renderRoute(routePath));
}

// 404: no canonical, no indexing, helpful title.
let notFound = template;
notFound = replaceTitle(notFound, "Page not found | Team Yulsa");
notFound = replaceMeta(notFound, "description", "The page you requested could not be found. Browse Team Yulsa services, industries, or book a free discovery call.");
notFound = replaceMeta(notFound, "robots", "noindex, follow");
notFound = notFound.replace(/\s*<link rel="canonical"[^>]*>/, "");
notFound = withPrerenderedBody(notFound, "/404");
await fs.writeFile(path.join(dist, "404.html"), notFound, "utf8");

// Sitemap
const sitemapEntries = Object.entries(ROUTES)
  .map(([routePath, seo]) => {
    return [
      "  <url>",
      `    <loc>${escapeXml(canonicalFor(routePath))}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      `    <changefreq>${seo.changefreq}</changefreq>`,
      `    <priority>${seo.priority}</priority>`,
      "  </url>",
    ].join("\n");
  })
  .join("\n");

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  sitemapEntries,
  "</urlset>",
  "",
].join("\n");
await fs.writeFile(path.join(dist, "sitemap.xml"), sitemap, "utf8");

// robots.txt
const robots = [
  "User-agent: *",
  "Allow: /",
  "Disallow: /admin",
  "",
  `Sitemap: ${SITE.url}/sitemap.xml`,
  "",
].join("\n");
await fs.writeFile(path.join(dist, "robots.txt"), robots, "utf8");

// Keep deploy output lean: source photos stay in the repo for the CMS and the
// image pipeline, but the deployed site only needs the optimized WebP variants.
const unusedRootAssets = [
  "hero-office_05c0bd7f.png",
  "team_yulsa_hero.webp",
  "software-official-logos_9fc69c90.png",
  "team_yulsa_home_banner.jpeg",
  "process-workflow_66aa4f70.png",
  "industries-collage_3c29fe26.png",
  "team_yulsa_logo.jpeg",
  "aayush2_20008bc2.png",
  "accounting-associate.jpeg",
  "dinesh_89398095.png",
  "himal_485516ec.png",
  "hr-associate.jpeg",
  "nisha_94569046.png",
  "prabesh_57af839c.png",
  "sagun_ca_0b9ac2f3.png",
  "samrat_746a0552.png",
  "sarjan_f1cd7225.png",
  "sujal_429a0972.png",
];

for (const file of unusedRootAssets) {
  await fs.rm(path.join(dist, "assets", file), { force: true });
}

const deployedTeamDir = path.join(dist, "assets", "team");
const teamEntries = await fs.readdir(deployedTeamDir).catch(() => []);
for (const entry of teamEntries) {
  if (entry !== "opt") {
    await fs.rm(path.join(deployedTeamDir, entry), { recursive: true, force: true });
  }
}

await fs.rm(path.join(dist, "__manus__"), { recursive: true, force: true });

console.log(
  `[postbuild] wrote ${routePaths.length} route pages, 404.html, sitemap.xml, robots.txt`
);
