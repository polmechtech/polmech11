import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://polmech.tech/sitemap.xml",
    host: "https://polmech.tech",
  };
}
