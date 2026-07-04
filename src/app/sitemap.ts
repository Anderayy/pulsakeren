import type { MetadataRoute } from "next";
import { categories, mainMenu } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://pulsakeren.com";
  return [
    { url: base, lastModified: new Date() },
    ...mainMenu.map(([, href]) => ({ url: `${base}${href}`, lastModified: new Date() })),
    ...categories.map((category) => ({ url: `${base}/${category.slug}`, lastModified: new Date() })),
    { url: `${base}/dashboard`, lastModified: new Date() },
    { url: `${base}/admin`, lastModified: new Date() },
  ];
}
