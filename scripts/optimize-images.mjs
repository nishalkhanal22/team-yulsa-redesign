/*
  Image pipeline.

  Generates responsive WebP variants so the site never ships a 700 KB PNG for a
  40 px avatar. Runs automatically before dev/build. New photos uploaded through
  Pages CMS are picked up on the next build.

  Team sources: client/public/assets/team/<name>.{jpg,jpeg,png,webp}
  Team output:  client/public/assets/team/opt/<name>-160.webp, <name>-480.webp

  Site images:  client/public/assets/<source> -> assets/opt/<slug>-<width>.webp
*/
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const assets = path.join(root, "client", "public", "assets");
const teamDir = path.join(assets, "team");
const teamOpt = path.join(teamDir, "opt");

async function newerThan(source, target) {
  try {
    const [s, t] = await Promise.all([fs.stat(source), fs.stat(target)]);
    return t.mtimeMs >= s.mtimeMs;
  } catch {
    return false;
  }
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function optimizeTeam() {
  if (!(await exists(teamDir))) return 0;
  await fs.mkdir(teamOpt, { recursive: true });

  const files = (await fs.readdir(teamDir)).filter((file) =>
    /\.(jpe?g|png|webp)$/i.test(file)
  );

  let made = 0;
  for (const file of files) {
    const source = path.join(teamDir, file);
    const base = file.replace(/\.[^.]+$/, "");

    for (const width of [160, 480]) {
      const target = path.join(teamOpt, `${base}-${width}.webp`);
      if (await newerThan(source, target)) continue;

      await sharp(source)
        .resize({
          width,
          height: Math.round((width * 4) / 3),
          fit: "cover",
          position: "top",
        })
        .webp({ quality: 82 })
        .toFile(target);
      made += 1;
    }
  }

  return made;
}

const SITE_IMAGES = [
  {
    source: "team_yulsa_home_banner.jpeg",
    slug: "hero",
    widths: [800, 1600],
    quality: 80,
  },
  {
    source: "process-workflow_66aa4f70.png",
    slug: "process",
    widths: [640, 1280],
    quality: 82,
  },
  {
    source: "industries-collage_3c29fe26.png",
    slug: "industries",
    widths: [640, 1280],
    quality: 82,
  },
  {
    source: "team_yulsa_logo.jpeg",
    slug: "logo",
    widths: [160, 320],
    quality: 88,
  },
];

async function optimizeSiteImages() {
  const outDir = path.join(assets, "opt");
  await fs.mkdir(outDir, { recursive: true });

  let made = 0;
  for (const image of SITE_IMAGES) {
    const source = path.join(assets, image.source);
    if (!(await exists(source))) {
      console.warn(`[images] missing ${image.source}, skipping`);
      continue;
    }

    for (const width of image.widths) {
      const target = path.join(outDir, `${image.slug}-${width}.webp`);
      if (await newerThan(source, target)) continue;

      await sharp(source)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: image.quality })
        .toFile(target);
      made += 1;
    }
  }

  return made;
}

const teamCount = await optimizeTeam();
const siteCount = await optimizeSiteImages();
console.log(`[images] generated ${teamCount + siteCount} WebP variants`);
