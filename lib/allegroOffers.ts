export type AllegroProduct = {
  id: string;
  name: string;
  image: string;
  price: string;
  currency: string;
  stock: number;
  url: string;
  category?: string;
  description?: string;
};

const SOURCE_URL = "https://www.trendeco.eu/api/allegro/offers";
const TITLE_FILTERS = ["przekładnia", "przekładniowa"];

export function isGearboxOffer(product: Pick<AllegroProduct, "name">) {
  const name = product.name.toLocaleLowerCase("pl-PL");
  return TITLE_FILTERS.some((word) => name.includes(word));
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
  if (product.description?.trim()) return product.description.trim();

  const stockText = product.stock > 0
    ? `Produkt dostępny od ręki, aktualny stan: ${product.stock} szt.`
    : "Sprawdź aktualną dostępność produktu.";

  return `${product.name}. Oferta PolMech dla mechanicznych łuparek i podzespołów przekładniowych do przygotowania drewna opałowego. ${stockText} Możliwa wysyłka za pobraniem z darmową dostawą na terenie Polski.`;
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

    return data.filter(isGearboxOffer);
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
    `Cena: ${product.price} ${product.currency}`,
    `Allegro ID: ${product.id}`,
    "Proszę o potwierdzenie dostępności i danych potrzebnych do wysyłki.",
  ].join("\n");

  return `https://wa.me/48512077770?text=${encodeURIComponent(message)}`;
}
