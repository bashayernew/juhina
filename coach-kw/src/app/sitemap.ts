import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://example.com"; // TODO: replace with production domain
  const routes = [
    "",
    "/en",
    "/en/programs",
    "/en/booking",
    "/ar",
    "/ar/programs",
    "/ar/booking",
  ];
  return routes.map((p) => ({ url: base + (p || "/"), changeFrequency: "weekly", priority: 0.7 }));
}


