import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://roastery-agadir.vercel.app/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: "https://roastery-agadir.vercel.app/style-guide",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4
    }
  ];
}
