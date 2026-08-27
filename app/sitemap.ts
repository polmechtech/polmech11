import type { MetadataRoute } from "next";
import { getGearboxOffers, getOfferPath } from "@/lib/allegroOffers";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getGearboxOffers();
  const now = new Date();

  return [
    {
      url: "https://polmech.tech/",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...products.map((product) => ({
      url: `https://polmech.tech${getOfferPath(product)}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.9,
    })),
  ];
}
