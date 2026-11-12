// Google AdSense settings. Both come from .env.local (or your host's environment
// variables). While they're empty, no ads load and no AdSense code is added to the site.

/** Your AdSense publisher ID, e.g. "ca-pub-1234567890123456" */
export const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";

/** The ID of the display ad unit created in AdSense (Ads → By ad unit), e.g. "1234567890" */
export const defaultAdSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT ?? "";
