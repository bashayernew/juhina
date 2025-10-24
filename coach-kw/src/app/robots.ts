import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://example.com"; // TODO: replace with production domain
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}


