import { cacheTag } from "next/cache";
import { mediaUrl, strapiCollection, strapiUrl, type StrapiMedia } from "./strapi";

// One house design as stored in Strapi (cms/src/api/design). Keep the page and
// cards reading only from this shape so the data source can change freely.
export type HouseDesign = {
  id: string;
  slug: string;
  name: string;
  priceUsd: number;
  bedrooms: number;
  bathrooms: number;
  floors: number;
  sizeSqft: number;
  image: string;
};

export const DESIGNS_TAG = "designs";

// Placeholder content, used when STRAPI_URL isn't set. When the owner
// publishes in Strapi, its webhook hits /api/revalidate, which refreshes DESIGNS_TAG.
const designs: HouseDesign[] = [
  {
    id: "1",
    slug: "the-odo",
    name: "The Odo",
    priceUsd: 42800,
    bedrooms: 2,
    bathrooms: 1,
    floors: 1,
    sizeSqft: 950,
    image: "/images/designs/the-odo.jpg",
  },
  {
    id: "2",
    slug: "the-abusua",
    name: "The Abusua",
    priceUsd: 68400,
    bedrooms: 3,
    bathrooms: 1.5,
    floors: 1,
    sizeSqft: 1500,
    image: "/images/designs/the-abusua.jpg",
  },
  {
    id: "3",
    slug: "the-nkabom",
    name: "The Nkabom",
    priceUsd: 84900,
    bedrooms: 4,
    bathrooms: 2.5,
    floors: 2,
    sizeSqft: 1900,
    image: "/images/designs/the-nkabom.jpg",
  },
  {
    id: "4",
    slug: "the-akwaaba",
    name: "The Akwaaba",
    priceUsd: 96500,
    bedrooms: 4,
    bathrooms: 3,
    floors: 2,
    sizeSqft: 2200,
    image: "/images/designs/the-akwaaba.jpg",
  },
  {
    id: "5",
    slug: "the-adom",
    name: "The Adom",
    priceUsd: 158000,
    bedrooms: 5,
    bathrooms: 4.5,
    floors: 2,
    sizeSqft: 3400,
    image: "/images/designs/the-adom.jpg",
  },
  {
    id: "6",
    slug: "the-ahenfie",
    name: "The Ahenfie",
    priceUsd: 210000,
    bedrooms: 6,
    bathrooms: 5,
    floors: 2,
    sizeSqft: 4200,
    image: "/images/designs/the-ahenfie.jpg",
  },
];

type StrapiDesign = Omit<HouseDesign, "id" | "image"> & { documentId: string; image: StrapiMedia };

export async function getDesigns(): Promise<HouseDesign[]> {
  "use cache";
  cacheTag(DESIGNS_TAG);
  if (!strapiUrl()) return designs;

  const items = await strapiCollection<StrapiDesign>("designs", "populate=image&sort=priceUsd:asc");
  return items.map(({ documentId, image, ...design }) => ({
    ...design,
    id: documentId,
    image: mediaUrl(image),
  }));
}

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const formatPrice = (amount: number) => usd.format(amount);
