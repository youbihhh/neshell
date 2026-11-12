// Minimal client for the Strapi CMS (see /cms). When STRAPI_URL isn't set,
// the data helpers in lib/designs.ts and lib/projects.ts fall back to their
// built-in placeholder content.

export const strapiUrl = () => process.env.STRAPI_URL?.replace(/\/$/, "") || null;

export type StrapiMedia = { url: string; alternativeText?: string | null } | null;

/** Fetches a Strapi REST collection, e.g. strapiCollection("designs", "populate=image") */
export async function strapiCollection<T>(collection: string, query = ""): Promise<T[]> {
  const base = strapiUrl();
  if (!base) throw new Error("STRAPI_URL is not set");

  const res = await fetch(`${base}/api/${collection}?pagination[pageSize]=100&${query}`);
  if (!res.ok) {
    throw new Error(`Strapi request for "${collection}" failed: ${res.status} ${res.statusText}`);
  }
  const body = (await res.json()) as { data: T[] };
  return body.data;
}

/** Strapi stores local uploads as "/uploads/..."; make them absolute for next/image */
export function mediaUrl(media: StrapiMedia, fallback = "/images/residential.jpg") {
  if (!media?.url) return fallback;
  return media.url.startsWith("http") ? media.url : `${strapiUrl()}${media.url}`;
}
