import { cacheTag } from "next/cache";
import type { Project } from "./project-types";
import { mediaUrl, strapiCollection, strapiUrl, type StrapiMedia } from "./strapi";

export const PROJECTS_TAG = "projects";

// Placeholder portfolio, used when STRAPI_URL isn't set. When the owner
// publishes in Strapi, its webhook hits /api/revalidate, which refreshes PROJECTS_TAG.
const projects: Project[] = [
  {
    id: "1",
    slug: "skyline-business-centre",
    title: "Skyline Business Centre",
    category: "Commercial",
    status: "Completed",
    location: "Airport City, Accra",
    year: 2025,
    summary: "A modern glass-fronted office block with flexible floor plates and on-site parking.",
    image: "/images/sky.jpg",
  },
  {
    id: "2",
    slug: "greenview-residence",
    title: "Greenview Residence",
    category: "Residential",
    status: "Completed",
    location: "East Legon, Accra",
    year: 2025,
    summary: "A five-bedroom family home with open-plan living and a landscaped garden.",
    image: "/images/residential.jpg",
  },
  {
    id: "3",
    slug: "northgate-development",
    title: "Northgate Development",
    category: "Construction",
    status: "Ongoing",
    location: "Kumasi",
    year: 2026,
    summary: "A multi-storey residential development currently at structural frame stage.",
    image: "/images/contractors.jpg",
  },
  {
    id: "4",
    slug: "coastline-villa",
    title: "Coastline Villa",
    category: "Residential",
    status: "Completed",
    location: "Cape Coast",
    year: 2024,
    summary: "A contemporary beachfront retreat built for a client living in the UK.",
    image: "/images/services/diaspora.jpg",
  },
  // {
  //   id: "5",
  //   slug: "cantonments-office-tower",
  //   title: "Cantonments Office Tower",
  //   category: "Commercial",
  //   status: "Completed",
  //   location: "Cantonments, Accra",
  //   year: 2024,
  //   summary: "Grade-A office space with energy-efficient glazing and backup power.",
  //   image: "/images/services/commercial.jpg",
  // },
  {
    id: "6",
    slug: "labone-kitchen-remodel",
    title: "Labone Kitchen Remodel",
    category: "Renovation",
    status: "Completed",
    location: "Labone, Accra",
    year: 2025,
    summary: "A full kitchen refit with new cabinetry, worktops and lighting.",
    image: "/images/services/renovation.jpg",
  },
  {
    id: "7",
    slug: "airport-hills-family-home",
    title: "Airport Hills Family Home",
    category: "Residential",
    status: "Completed",
    location: "Airport Hills, Accra",
    year: 2023,
    summary: "A two-storey modern villa with a pool, roof terrace and solar-ready roof.",
    image: "/images/designs/the-adom.jpg",
  },
  // {
  //   id: "8",
  //   slug: "tema-heights-interiors",
  //   title: "Tema Heights Interiors",
  //   category: "Renovation",
  //   status: "Completed",
  //   location: "Tema",
  //   year: 2024,
  //   summary: "An open-plan living space created by removing walls and adding glazing.",
  //   image: "/images/services/interior.jpg",
  // },
  {
    id: "9",
    slug: "spintex-mixed-use-block",
    title: "Spintex Mixed-Use Block",
    category: "Construction",
    status: "Ongoing",
    location: "Spintex, Accra",
    year: 2026,
    summary: "Shops on the ground floor with apartments above, due for completion next year.",
    image: "/images/services/hero.jpg",
  },
];

// "status" is reserved in Strapi, so the field is called "progress" there
type StrapiProject = Omit<Project, "id" | "image" | "status"> & {
  documentId: string;
  progress: Project["status"];
  image: StrapiMedia;
};

export async function getProjects(): Promise<Project[]> {
  "use cache";
  cacheTag(PROJECTS_TAG);
  if (!strapiUrl()) return projects;

  const items = await strapiCollection<StrapiProject>("projects", "populate=image&sort[0]=year:desc&sort[1]=title:asc");
  return items.map(({ documentId, image, progress, ...project }) => ({
    ...project,
    status: progress,
    id: documentId,
    image: mediaUrl(image),
  }));
}
