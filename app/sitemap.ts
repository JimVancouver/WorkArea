import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://readaloud.si/", changeFrequency: "monthly", priority: 1 }];
}
