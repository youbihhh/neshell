import type { NextConfig } from "next";

// Strapi serves uploaded images from its own address; allow them in next/image
const strapi = process.env.STRAPI_URL ? new URL(process.env.STRAPI_URL) : null;

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Next.js compresses images at quality 75 by default, which looks soft on
    // large photos. Allowing only 90 makes every image use it (75 rounds up to 90).
    qualities: [90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Local Strapi during development — always allowed, so it works even if
      // STRAPI_URL was added while the dev server was already running
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      ...(strapi && strapi.hostname !== "localhost"
        ? [
            {
              protocol: strapi.protocol.replace(":", "") as "http" | "https",
              hostname: strapi.hostname,
              port: strapi.port,
              pathname: "/uploads/**",
            },
          ]
        : []),
    ],
    // During development Strapi runs on localhost, which Next.js blocks by default
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
  },
  // yoursite.com/admin opens the Strapi admin panel
  async redirects() {
    return [
      {
        source: "/admin",
        destination: `${strapi?.origin ?? "http://localhost:1337"}/admin`,
        permanent: false,
      },
    ];
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
