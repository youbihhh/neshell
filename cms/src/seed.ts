import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { Core } from "@strapi/strapi";

// The website's starting content, imported once into an empty Strapi so the
// owner has real entries to edit. Images are read from the website's /public folder.
const PUBLIC_DIR = path.resolve(process.cwd(), "..", "public");

const designs = [
  { name: "The Odo", slug: "the-odo", priceUsd: 42800, bedrooms: 2, bathrooms: 1, floors: 1, sizeSqft: 950, image: "/images/designs/the-odo.jpg" },
  { name: "The Abusua", slug: "the-abusua", priceUsd: 68400, bedrooms: 3, bathrooms: 1.5, floors: 1, sizeSqft: 1500, image: "/images/designs/the-abusua.jpg" },
  { name: "The Nkabom", slug: "the-nkabom", priceUsd: 84900, bedrooms: 4, bathrooms: 2.5, floors: 2, sizeSqft: 1900, image: "/images/designs/the-nkabom.jpg" },
  { name: "The Akwaaba", slug: "the-akwaaba", priceUsd: 96500, bedrooms: 4, bathrooms: 3, floors: 2, sizeSqft: 2200, image: "/images/designs/the-akwaaba.jpg" },
  { name: "The Adom", slug: "the-adom", priceUsd: 158000, bedrooms: 5, bathrooms: 4.5, floors: 2, sizeSqft: 3400, image: "/images/designs/the-adom.jpg" },
  { name: "The Ahenfie", slug: "the-ahenfie", priceUsd: 210000, bedrooms: 6, bathrooms: 5, floors: 2, sizeSqft: 4200, image: "/images/designs/the-ahenfie.jpg" },
];

const projects = [
  { title: "Skyline Business Centre", slug: "skyline-business-centre", category: "Commercial", progress: "Completed", location: "Airport City, Accra", year: 2025, summary: "A modern glass-fronted office block with flexible floor plates and on-site parking.", image: "/images/sky.jpg" },
  { title: "Greenview Residence", slug: "greenview-residence", category: "Residential", progress: "Completed", location: "East Legon, Accra", year: 2025, summary: "A five-bedroom family home with open-plan living and a landscaped garden.", image: "/images/residential.jpg" },
  { title: "Northgate Development", slug: "northgate-development", category: "Construction", progress: "Ongoing", location: "Kumasi", year: 2026, summary: "A multi-storey residential development currently at structural frame stage.", image: "/images/contractors.jpg" },
  { title: "Coastline Villa", slug: "coastline-villa", category: "Residential", progress: "Completed", location: "Cape Coast", year: 2024, summary: "A contemporary beachfront retreat built for a client living in the UK.", image: "/images/services/diaspora.jpg" },
  { title: "Cantonments Office Tower", slug: "cantonments-office-tower", category: "Commercial", progress: "Completed", location: "Cantonments, Accra", year: 2024, summary: "Grade-A office space with energy-efficient glazing and backup power.", image: "/images/services/commercial.jpg" },
  { title: "Labone Kitchen Remodel", slug: "labone-kitchen-remodel", category: "Renovation", progress: "Completed", location: "Labone, Accra", year: 2025, summary: "A full kitchen refit with new cabinetry, worktops and lighting.", image: "/images/services/renovation.jpg" },
  { title: "Airport Hills Family Home", slug: "airport-hills-family-home", category: "Residential", progress: "Completed", location: "Airport Hills, Accra", year: 2023, summary: "A two-storey modern villa with a pool, roof terrace and solar-ready roof.", image: "/images/designs/the-adom.jpg" },
  { title: "Tema Heights Interiors", slug: "tema-heights-interiors", category: "Renovation", progress: "Completed", location: "Tema", year: 2024, summary: "An open-plan living space created by removing walls and adding glazing.", image: "/images/services/interior.jpg" },
  { title: "Spintex Mixed-Use Block", slug: "spintex-mixed-use-block", category: "Construction", progress: "Ongoing", location: "Spintex, Accra", year: 2026, summary: "Shops on the ground floor with apartments above, due for completion next year.", image: "/images/services/hero.jpg" },
];

async function uploadImage(strapi: Core.Strapi, publicPath: string, alt: string) {
  const source = path.join(PUBLIC_DIR, publicPath);
  if (!fs.existsSync(source)) {
    strapi.log.warn(`[seed] Image not found, skipping: ${source}`);
    return null;
  }
  // Upload a temporary copy so the website's own file is never touched
  const name = path.basename(source);
  const tmp = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "neshell-seed-")), name);
  fs.copyFileSync(source, tmp);

  const [file] = await strapi
    .plugin("upload")
    .service("upload")
    .upload({
      data: { fileInfo: { name, alternativeText: alt } },
      files: { filepath: tmp, originalFilename: name, mimetype: "image/jpeg", size: fs.statSync(tmp).size },
    });
  return file.id as number;
}

async function seedCollection(
  strapi: Core.Strapi,
  uid: "api::design.design" | "api::project.project",
  items: Array<Record<string, unknown> & { image: string }>,
  label: (item: Record<string, unknown>) => string,
) {
  if ((await strapi.documents(uid).count({})) > 0) return;

  for (const { image, ...fields } of items) {
    const imageId = await uploadImage(strapi, image, label(fields));
    await strapi.documents(uid).create({
      data: { ...fields, image: imageId } as never,
      status: "published",
    });
  }
  strapi.log.info(`[seed] Imported ${items.length} entries into ${uid}`);
}

export async function seed(strapi: Core.Strapi) {
  try {
    await seedCollection(strapi, "api::design.design", designs, (d) => String(d.name));
    await seedCollection(strapi, "api::project.project", projects, (p) => String(p.title));
  } catch (error) {
    strapi.log.error(`[seed] Could not import starting content: ${error}`);
  }
}
