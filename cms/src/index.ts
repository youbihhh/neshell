import type { Core } from "@strapi/strapi";
import { seed } from "./seed";

// Content the website reads. Each maps to a cache tag on the website side.
const WEBSITE_CONTENT = ["api::design.design", "api::project.project"] as const;
const CHANGING_ACTIONS = new Set(["create", "update", "delete", "publish", "unpublish", "discardDraft"]);

/** Tells the website to refresh this content type (see app/api/revalidate on the website) */
function notifyWebsite(strapi: Core.Strapi, uid: string) {
  const url = process.env.FRONTEND_URL;
  const secret = process.env.REVALIDATE_SECRET;
  if (!url || !secret) return;

  const model = uid.split(".").pop();
  fetch(`${url.replace(/\/$/, "")}/api/revalidate`, {
    method: "POST",
    headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model }),
  }).catch((error) => strapi.log.warn(`Could not refresh the website for ${model}: ${error}`));
}

/** Lets anyone read house designs and projects through the API (read-only) */
async function allowPublicRead(strapi: Core.Strapi) {
  const publicRole = await strapi.db
    .query("plugin::users-permissions.role")
    .findOne({ where: { type: "public" } });
  if (!publicRole) return;

  for (const uid of WEBSITE_CONTENT) {
    for (const action of [`${uid}.find`, `${uid}.findOne`]) {
      const existing = await strapi.db
        .query("plugin::users-permissions.permission")
        .findOne({ where: { action, role: publicRole.id } });
      if (!existing) {
        await strapi.db
          .query("plugin::users-permissions.permission")
          .create({ data: { action, role: publicRole.id } });
      }
    }
  }
}

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    // Whenever the owner saves, publishes or deletes website content, refresh the site
    strapi.documents.use(async (context, next) => {
      const result = await next();
      if (
        (WEBSITE_CONTENT as readonly string[]).includes(context.uid) &&
        CHANGING_ACTIONS.has(context.action)
      ) {
        notifyWebsite(strapi, context.uid);
      }
      return result;
    });
  },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await allowPublicRead(strapi);
    await seed(strapi);
  },
};
