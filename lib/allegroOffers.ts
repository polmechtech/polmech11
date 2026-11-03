export type AllegroProduct = {
  id: string;
  name: string;
  image: string;
  images?: Array<{ url: string; order: number }>;
  descriptionSections?: Array<{ items?: Array<{ type?: string; url?: string; content?: string }> }>;
  price: string;
  currency: string;
  stock: number;
  url: string;
  category?: string;
  description?: string;
};

const SOURCE_URL = "https://trendeco.eu/api/allegro/offers";
const EXCLUDED_OFFER_IDS = new Set(["18775311531"]);
const ADDITIONAL_POLMECH_OFFER_IDS = new Set(["19044041381"]);
const POLMECH_KEYWORDS = [
  "łupar",
  "łupak",
  "przekładnia",
  "przekładniowa",
  "przekładniowy",
  "reduktor",
  "jzq250",
];

export function isGearboxOffer(product: Pick<AllegroProduct, "name" | "id">) {
  if (ADDITIONAL_POLMECH_OFFER_IDS.has(product.id)) return true;
  const name = product.name.toLocaleLowerCase("pl-PL");
  return POLMECH_KEYWORDS.some((word) => name.includes(word));
}

export function slugifyOfferName(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-")
    .slice(0, 140) || "oferta";
}

export function getOfferPath(product: Pick<AllegroProduct, "id" | "name">) {
  return `/oferta/${slugifyOfferName(product.name)}-${product.id}`;
}

export function extractOfferId(slug: string) {
  return slug.match(/-(\d+)$/)?.[1] ?? null;
}

export function getProductDescription(product: AllegroProduct) {
  if (product.description?.trim()) {
    return product.description
      .replace(/\r\n?/g, "\n")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  const stockText = product.stock > 0
    ? `Produkt dostępny od ręki, aktualny stan: ${product.stock} szt.`
    : "Sprawdź aktualną dostępność produktu.";

  return `${product.name}. Oferta POLMECH.TECH dla mechanicznych łuparek i podzespołów przekładniowych do przygotowania drewna opałowego. ${stockText} Możliwa wysyłka za pobraniem z darmową dostawą na terenie Polski.`;
}

export function getStructuredDataDescription(product: AllegroProduct) {
  const description = getProductDescription(product)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (description.length <= 5000) return description;

  const shortened = description.slice(0, 4999);
  const lastSpace = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, lastSpace > 4500 ? lastSpace : 4999).trimEnd()}…`;
}

export function getDescriptionParagraphs(product: AllegroProduct) {
  return getProductDescription(product)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\n/g, " ").replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

export function getAllegroDescriptionImages(product: AllegroProduct): string[] {
  const sections = Array.isArray(product.descriptionSections) ? product.descriptionSections : [];
  const urls = sections.flatMap((section) => Array.isArray(section.items) ? section.items : [])
    .filter((item) => item.type === "IMAGE" && typeof item.url === "string")
    .map((item) => item.url!.trim())
    .filter((url) => /^https:\/\//i.test(url) && url !== product.image);
  return [...new Set(urls)].slice(0, 4);
}

export const JZQ250_DIMENSIONS_MM = [
  ["L", 500], ["A", 250], ["B", 220], ["a2", 150], ["a1", 105],
  ["L2", 75], ["H", 295], ["b1", 8], ["t1", 15], ["d2", 32],
  ["d1", 30], ["L1", 17], ["l2", 55], ["B1", 92], ["L3", 54],
  ["L4", 130], ["B2", 184], ["b2", 18], ["t2", 62], ["d3", 55],
] as const;

export function getVisibleDescriptionParagraphs(product: AllegroProduct) {
  const paragraphs = getDescriptionParagraphs(product);
  if (product.id !== "18878600668") return paragraphs;
  return paragraphs.filter((paragraph) => {
    const labels = paragraph.match(/(?:^|[\s,;])(?:L2?|l2|a[12]|b[12]|B[12]|t[12]|d[123]|H|A|B)\s*[:=]\s*\d+/g) ?? [];
    return labels.length < 3 && !(/(?:wymiary|rozmiary)\s*[,:(]?\s*(?:mm)?/i.test(paragraph) && labels.length > 0);
  });
}

export function getTrendEcoPrice(product: Pick<AllegroProduct, "price">) {
  const price = Number.parseFloat(String(product.price).replace(",", "."));
  if (!Number.isFinite(price)) return String(product.price);
  const discounted = price * 0.95;
  const roundedDownToNine = Math.floor((discounted + 1) / 10) * 10 - 1;
  return Math.max(9, roundedDownToNine).toFixed(2);
}

export async function getGearboxOffers(): Promise<AllegroProduct[]> {
  try {
    const response = await fetch(SOURCE_URL, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });

    if (!response.ok) return [];

    const data = (await response.json()) as AllegroProduct[];
    if (!Array.isArray(data)) return [];

    return data.filter((product) => !EXCLUDED_OFFER_IDS.has(product.id) && isGearboxOffer(product) && product.stock > 0);
  } catch {
    return [];
  }
}

export async function getGearboxOfferById(id: string) {
  const products = await getGearboxOffers();
  return products.find((product) => product.id === id) ?? null;
}

export function getCashOnDeliveryWhatsAppLink(product: Pick<AllegroProduct, "id" | "name" | "price" | "currency">) {
  const message = [
    "Dzień dobry, chcę zamówić za pobraniem z darmową dostawą:",
    product.name,
    `Cena: ${getTrendEcoPrice(product)} ${product.currency}`,
    `Allegro ID: ${product.id}`,
    "Proszę o potwierdzenie dostępności i danych potrzebnych do wysyłki.",
  ].join("\n");

  return `https://wa.me/48512077770?text=${encodeURIComponent(message)}`;
}
