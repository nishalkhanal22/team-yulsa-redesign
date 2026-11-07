/*
  Brand asset generator.

  Produces the social share card, favicons, and manifest icons from the single
  source logo. Run once (and again only if the logo changes):

    node scripts/generate-brand-assets.mjs

  Outputs to client/public so the files are served from the site root.
*/
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const publicDir = path.join(root, "client", "public");
const logoPath = path.join(publicDir, "assets", "team_yulsa_logo.jpeg");

const logoBuffer = await fs.readFile(logoPath);
const logoDataUri = `data:image/jpeg;base64,${logoBuffer.toString("base64")}`;

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0f1b30"/>
      <stop offset="1" stop-color="#16263f"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="80" y="0" width="6" height="630" fill="#00c589" opacity="0.9"/>
  <g opacity="0.06" stroke="#ffffff" stroke-width="1">
    <line x1="0" y1="120" x2="1200" y2="120"/>
    <line x1="0" y1="240" x2="1200" y2="240"/>
    <line x1="0" y1="360" x2="1200" y2="360"/>
    <line x1="0" y1="480" x2="1200" y2="480"/>
  </g>

  <image href="${logoDataUri}" x="80" y="64" width="96" height="96" preserveAspectRatio="xMidYMid slice"/>
  <text x="196" y="112" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" letter-spacing="4">TEAM YULSA</text>
  <text x="196" y="146" fill="#9fb0c9" font-family="Arial, Helvetica, sans-serif" font-size="20" letter-spacing="2">OUTSOURCED BOOKKEEPING &amp; ACCOUNTING</text>

  <text x="80" y="330" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="62" font-weight="700">Your books, balanced.</text>
  <text x="80" y="404" fill="#00c589" font-family="Arial, Helvetica, sans-serif" font-size="62" font-weight="700">Your week, back.</text>

  <text x="80" y="486" fill="#c9d4e4" font-family="Arial, Helvetica, sans-serif" font-size="26">Bookkeeping, tax, and virtual CFO support for</text>
  <text x="80" y="524" fill="#c9d4e4" font-family="Arial, Helvetica, sans-serif" font-size="26">US &amp; Canadian businesses. Fixed monthly pricing.</text>

  <rect x="80" y="566" width="250" height="2" fill="#00c589"/>
  <text x="80" y="602" fill="#8fa2bd" font-family="Arial, Helvetica, sans-serif" font-size="20" letter-spacing="3">TEAMYULSA.COM</text>
  <text x="1120" y="602" fill="#8fa2bd" font-family="Arial, Helvetica, sans-serif" font-size="20" text-anchor="end">BOOK A FREE CALL</text>
</svg>
`;

await sharp(Buffer.from(ogSvg))
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(path.join(publicDir, "og-image.jpg"));

const sizes = [
  { file: "favicon-32.png", size: 32 },
  { file: "favicon-192.png", size: 192 },
  { file: "apple-touch-icon.png", size: 180 },
  { file: "logo-512.png", size: 512 },
];

for (const { file, size } of sizes) {
  await sharp(logoBuffer)
    .resize(size, size, { fit: "cover" })
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, file));
}

const manifest = {
  name: "Team Yulsa",
  short_name: "Team Yulsa",
  description:
    "Outsourced bookkeeping, accounting, and virtual CFO services for US and Canadian businesses.",
  icons: [
    { src: "favicon-192.png", sizes: "192x192", type: "image/png" },
    { src: "logo-512.png", sizes: "512x512", type: "image/png" },
  ],
  theme_color: "#101c31",
  background_color: "#fbfaf7",
  display: "standalone",
  start_url: ".",
};

await fs.writeFile(
  path.join(publicDir, "site.webmanifest"),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8"
);

console.log("[brand] wrote og-image.jpg, favicons, logo-512.png, site.webmanifest");
