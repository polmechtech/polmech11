import { getGearboxOffers, getOfferPath, getProductDescription, getTrendEcoPrice } from "@/lib/allegroOffers";

export const dynamic = "force-dynamic";
const esc = (value: unknown) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function confirmedFacts(product: Awaited<ReturnType<typeof getGearboxOffers>>[number]) {
  const source = `${product.name} ${getProductDescription(product)}`.replace(/\s+/g, " ");
  const facts: { section: string; name: string; value: string }[] = [];
  const add = (name: string, regex: RegExp, section = "Parametry techniczne") => {
    const match = source.match(regex);
    if (match?.[1]) facts.push({ section, name, value: match[1].trim() });
  };
  add("Napięcie", /\b(230\s?V|400\s?V|380\s?V)\b/i);
  add("Moc", /\b(\d{1,4}(?:[.,]\d+)?\s?kW|\d{3,5}\s?W)\b/i);
  add("Siła rozłupywania", /\b(\d{1,3}(?:[.,]\d+)?\s?ton)\b/i);
  add("Wydajność", /\b(\d{1,3}(?:[.,]\d+)?\s?m3\/?h)\b/i);
  add("Średnica polana", /\b(?:średnica|Ø)\s*[:=]?\s*(\d{1,3}\s?cm)\b/i);
  add("Długość polana", /\b(?:długość|L)\s*[:=]?\s*(\d{1,3}\s?cm)\b/i);
  return facts.slice(0, 6);
}

function highlightsFor(product: Awaited<ReturnType<typeof getGearboxOffers>>[number]) {
  const highlights = ["Mechaniczna łuparka przekładniowa / reduktorowa do drewna opałowego"];
  for (const fact of confirmedFacts(product).slice(0, 4)) highlights.push(`${fact.name}: ${fact.value}`);
  if (product.stock > 0) highlights.push("Produkt dostępny do zakupu bezpośrednio na polmech.tech");
  return [...new Set(highlights)].slice(0, 6);
}

export async function GET() {
  const products = await getGearboxOffers();
  const items = products.filter((p) => p.id && p.name && p.price).map((p) => {
    const highlights = highlightsFor(p).map((value) => `<g:product_highlight>${esc(value)}</g:product_highlight>`).join("");
    const details = confirmedFacts(p).map((fact) => `<g:product_detail><g:section_name>${esc(fact.section)}</g:section_name><g:attribute_name>${esc(fact.name)}</g:attribute_name><g:attribute_value>${esc(fact.value)}</g:attribute_value></g:product_detail>`).join("");
    return `<item><g:id>${esc(p.id)}</g:id><title>${esc(p.name)}</title><description>${esc(getProductDescription(p).slice(0,5000))}</description><link>https://polmech.tech${getOfferPath(p)}</link>${p.image ? `<g:image_link>${esc(p.image)}</g:image_link>` : ""}<g:availability>${p.stock > 0 ? "in_stock" : "out_of_stock"}</g:availability><g:price>${getTrendEcoPrice(p)} ${p.currency || "PLN"}</g:price><g:condition>new</g:condition><g:brand>POLMECH.TECH</g:brand><g:product_type>Łuparki przekładniowe do drewna</g:product_type>${highlights}${details}<g:identifier_exists>no</g:identifier_exists><g:shipping><g:country>PL</g:country><g:service>Darmowa dostawa</g:service><g:price>0.00 PLN</g:price></g:shipping></item>`;
  }).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:g="http://base.google.com/ns/1.0"><channel><title>POLMECH.TECH — katalog łuparek</title><link>https://polmech.tech</link><description>Aktualny katalog POLMECH.TECH dla Google Merchant Center i systemów Google AI</description>${items}</channel></rss>`, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, s-maxage=1800" } });
}
