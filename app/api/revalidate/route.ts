import { revalidateTag } from "next/cache";
import { DESIGNS_TAG } from "../../../lib/designs";
import { PROJECTS_TAG } from "../../../lib/projects";

// Strapi model name -> cache tag to refresh
const tags: Record<string, string> = {
  design: DESIGNS_TAG,
  project: PROJECTS_TAG,
};

/**
 * Called by the Strapi webhook whenever content is published, updated or deleted.
 * Strapi sends the secret in the "Authorization: Bearer <secret>" header.
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ revalidated: false, message: "Invalid secret" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { model?: string };
  // Unknown or missing model (e.g. a media upload): refresh everything
  const toRefresh = body.model && tags[body.model] ? [tags[body.model]] : Object.values(tags);
  for (const tag of toRefresh) revalidateTag(tag, "max");

  return Response.json({ revalidated: true, tags: toRefresh });
}
