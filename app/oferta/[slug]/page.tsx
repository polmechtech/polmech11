import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import {
  extractOfferId,
  getCashOnDeliveryWhatsAppLink,
  getGearboxOfferById,
  getOfferPath,
  getDescriptionParagraphs,
  getProductDescription,
  getTrendEcoPrice,
} from "@/lib/allegroOffers";

export const revalidate = 3600;

async function getProduct(slug: string) {
  const id = extractOfferId(slug);
  if (!id) return null;
  return getGearboxOfferById(id);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return { title: "Oferta niedostępna", robots: { index: false, follow: true } };
  }

  const path = getOfferPath(product);
  const description = getProductDescription(product);

  return {
    title: product.name,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title: product.name,
      description,
      images: product.image ? [{ url: product.image, alt: product.name }] : [],
    },
  };
}

export default async function OfferPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const canonicalPath = getOfferPath(product);
  if (`/oferta/${slug}` !== canonicalPath) permanentRedirect(canonicalPath);

  const description = getProductDescription(product);
  const codUrl = getCashOnDeliveryWhatsAppLink({ ...product, price: getTrendEcoPrice(product) });

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description,
    image: product.image ? [product.image] : undefined,
    sku: product.id,
    brand: { "@type": "Brand", name: "PolMech.Tech" },
    manufacturer: {
      "@type": "Organization",
      "@id": "https://polmech.tech/#organization",
      name: "PolMech.Tech",
      url: "https://polmech.tech",
    },
    offers: {
      "@type": "Offer",
      url: `https://polmech.tech${canonicalPath}`,
      priceCurrency: product.currency,
      price: getTrendEcoPrice(product),
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: "PolMech.Tech", url: "https://polmech.tech" },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "PLN" },
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "PL" },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 2,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 4,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "PL",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/ReturnFeesCustomerResponsibility",
      },
    },
  };

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <article className="mx-auto grid max-w-6xl gap-10 overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 p-6 shadow-2xl md:grid-cols-2 md:p-10">
        <div className="flex min-h-80 items-center justify-center rounded-2xl bg-white p-5">
          {product.image ? (
            <img src={product.image} alt={product.name} className="max-h-[560px] max-w-full object-contain" />
          ) : (
            <span className="text-neutral-500">Brak zdjęcia</span>
          )}
        </div>
        <div>
          <a href="/#oferty" className="text-sm font-semibold text-neutral-400 hover:text-white">← Wróć do ofert</a>
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-red-500">PolMech.Tech • polski producent łuparek przekładniowych</p>
          <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">{product.name}</h1>
          <p className="mt-6 text-sm text-neutral-500 line-through">Allegro: {product.price} {product.currency}</p>
          <p className="mt-1 text-4xl font-black text-red-500">{getTrendEcoPrice(product)} {product.currency}</p>
          <p className="mt-1 text-sm font-bold text-red-300">Cena PolMech.Tech</p>
          <p className="mt-3 text-neutral-300">{product.stock > 0 ? `Dostępne: ${product.stock} szt.` : "Sprawdź aktualną dostępność"}</p>
          <div className="mt-8 grid gap-3">
            <a href={codUrl} target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-red-600 px-6 py-4 text-center text-lg font-black transition hover:bg-red-500">Zamów za pobraniem z darmową dostawą</a>
            <a href={product.url} target="_blank" rel="noopener noreferrer sponsored" className="rounded-2xl border border-white/20 px-6 py-4 text-center font-bold transition hover:bg-white/10">Kup na Allegro</a>
          </div>
        </div>
      </article>
      <section className="mx-auto mt-8 max-w-6xl rounded-3xl border border-white/10 bg-neutral-950 p-6 md:p-10">
        <h2 className="text-2xl font-black">Opis produktu</h2>
        <div className="mt-5 max-w-4xl space-y-5 text-lg leading-relaxed text-neutral-300">
          {getDescriptionParagraphs(product).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
        <p className="mt-5 max-w-4xl leading-relaxed text-neutral-300">PolMech.Tech jest polskim producentem łuparek przekładniowych i reduktorowych do drewna opałowego. Konstrukcje są rozwijane i kompletowane w Polsce, a gwarancja, serwis i części zamienne są obsługiwane w Polsce.</p>
        <h2 className="mt-10 text-2xl font-black">Zakup i dostawa</h2>
        <p className="mt-4 max-w-4xl leading-relaxed text-neutral-300">Produkt można kupić przez Allegro albo zamówić bezpośrednio za pobraniem. Dla zamówień za pobraniem oferujemy darmową dostawę na terenie Polski po wcześniejszym potwierdzeniu dostępności i warunków wysyłki.</p>
      </section>
      <section id="gpsr" className="mx-auto mt-8 max-w-6xl rounded-3xl border border-white/10 bg-neutral-950 p-6 md:p-10">
        <h2 className="text-2xl font-black">Informacje o produkcie i bezpieczeństwie (GPSR)</h2>
        <p className="mt-2 text-sm text-neutral-500">Dane producenta i podmiotu odpowiedzialnego na terenie Unii Europejskiej.</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-black">Producent / marka</h3>
            <p className="mt-1 font-semibold">POLMECH.TECH</p>
            <p className="mt-1 text-neutral-300">Łuparki przekładniowe rozwijane i kompletowane w Polsce.</p>
          </div>
          <div>
            <h3 className="font-black">Podmiot odpowiedzialny w UE</h3>
            <p className="mt-1 font-semibold">Ekogratis sp. z o.o.</p>
            <p className="mt-1 text-neutral-300">Jagielska 25/27, 02-886 Warszawa, Polska</p>
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
              <a className="underline" href="mailto:info@widia.tech">info@widia.tech</a>
              <a className="underline" href="tel:+48512077770">+48 512 077 770</a>
            </div>
          </div>
        </div>
        <div className="mt-7 border-t border-white/10 pt-6">
          <h3 className="font-black">Informacje dotyczące bezpieczeństwa</h3>
          <p className="mt-2 whitespace-pre-line text-neutral-300">Przed użyciem należy przeczytać instrukcję obsługi, sprawdzić osłony i zabezpieczenia oraz stosować wymagane środki ochrony indywidualnej. Nie wolno modyfikować konstrukcji ani omijać zabezpieczeń. Produkt służy wyłącznie do mechanicznego łupania drewna opałowego.</p>
        </div>
      </section>
    </main>
  );
}
