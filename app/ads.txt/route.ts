import { adsenseClient } from "../../lib/ads";

// Serves yoursite.com/ads.txt, which tells advertisers Google is allowed to sell
// ad space on this site. AdSense warns (and earns less) without it.
export function GET() {
  if (!adsenseClient) return new Response("Not found", { status: 404 });

  const publisherId = adsenseClient.replace(/^ca-/, "");
  return new Response(`google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`, {
    headers: { "Content-Type": "text/plain" },
  });
}
