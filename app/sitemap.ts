import type { MetadataRoute } from "next";
import { getPublishedSeoPages, getPublicServices } from "@/lib/cms";

const BASE_URL = "https://kghomecare.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/locations`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dynamic service pages
  const services = await getPublicServices();
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: new Date(service.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Dynamic SEO pages (landing pages)
  const seoPages = await getPublishedSeoPages();
  const seoPageEntries: MetadataRoute.Sitemap = seoPages.map((page) => ({
    url: `${BASE_URL}/${page.slug}`,
    lastModified: new Date(page.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.64,
  }));

  return [...staticPages, ...servicePages, ...seoPageEntries];
}
