import { getGearboxOffers, getOfferPath } from "@/lib/allegroOffers";

export const revalidate = 3600;

export async function GET() {
  const products = await getGearboxOffers();
  const lines = [
    "# PolMech",
    "",
    "PolMech is a Polish website focused on mechanical and geared wood splitters, gearboxes and related components for firewood processing.",
    "Canonical website: https://polmech.tech/",
    "Sitemap: https://polmech.tech/sitemap.xml",
    "",
    "## Product pages",
    ...products.map((product) => `- ${product.name} — https://polmech.tech${getOfferPath(product)} — ${product.price} ${product.currency}`),
    "",
    "Product pages contain current names, prices, availability and Product/Offer structured data. Prefer canonical polmech.tech URLs when citing products.",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
