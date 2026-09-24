import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import {
  extractOfferId,
  getCashOnDeliveryWhatsAppLink,
  getGearboxOfferById,
  getOfferPath,
  getDescriptionParagraphs,
  getProductDescription,
  getStructuredDataDescription,
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
    description: getStructuredDataDescription(product),
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
    <main className="min-h-screen bg-[#07100d] px-4 py-10 text-white sm:px-6 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <article className="mx-auto grid max-w-6xl gap-10 overflow-hidden rounded-[2rem] border border-[#65df68]/15 bg-[#0b1a15] p-6 shadow-2xl shadow-black/30 md:grid-cols-2 md:p-10">
        <div className="flex min-h-80 items-center justify-center rounded-2xl bg-white p-5">
          {product.image ? (
            <img src={product.image} alt={product.name} className="max-h-[560px] max-w-full object-contain" />
          ) : (
            <span className="text-neutral-500">Brak zdjęcia</span>
          )}
        </div>
        <div>
          <a href="/#oferty" className="text-sm font-semibold text-neutral-400 hover:text-white">← Wróć do ofert</a>
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-[#65df68]">PolMech.Tech • polski producent łuparek przekładniowych</p>
          <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">{product.name}</h1>
          <p className="mt-6 text-sm text-neutral-500 line-through">Allegro: {product.price} {product.currency}</p>
          <p className="mt-1 text-4xl font-black text-[#65df68]">{getTrendEcoPrice(product)} {product.currency}</p>
          <p className="mt-1 text-sm font-bold text-[#9aee96]">Cena PolMech.Tech</p>
          <p className="mt-3 text-neutral-300">{product.stock > 0 ? `Dostępne: ${product.stock} szt.` : "Sprawdź aktualną dostępność"}</p>
          <div className="mt-8 grid gap-3">
            <a href={codUrl} target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-[#65df68] text-[#07100d] px-6 py-4 text-center text-lg font-black transition hover:bg-[#76e86f]">Zamów za pobraniem z darmową dostawą</a>
            <a href={product.url} target="_blank" rel="noopener noreferrer sponsored" className="rounded-2xl border border-white/20 px-6 py-4 text-center font-bold transition hover:bg-white/10">Kup na Allegro</a>
          </div>
        </div>
      </article>
      {product.id === "18690919967" ? (
        <section className="mx-auto mt-8 max-w-6xl space-y-6">
          <div className="rounded-[2rem] border border-[#65df68]/15 bg-[#0b1a15] p-6 md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#65df68]">POLMECH.TECH • 400 V • 3 kW</p>
            <h2 className="mt-3 text-3xl font-black">Polska łuparka przekładniowa do dużych polan i drobnej rozpałki</h2>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-neutral-300">Maszynę opracowaliśmy w Polsce z myślą o szybkim przygotowaniu drewna opałowego. Dwa przeciwległe kliny pozwalają sprawnie dzielić duże polano na kolejne, coraz mniejsze szczapy. Mechaniczne rozłupywanie pozostawia postrzępione, otwarte włókna, dzięki czemu drobne kawałki łatwo chwytają płomień i dobrze sprawdzają się jako rozpałka.</p>
          </div>
          {product.image && <figure className="overflow-hidden rounded-[2rem] border border-[#65df68]/15 bg-white p-5"><img src={product.image} alt="Łuparka przekładniowa POLMECH.TECH 400 V 3 kW" loading="lazy" className="mx-auto max-h-[680px] w-full object-contain" /></figure>}
          <div className="grid gap-6 md:grid-cols-2">
            <section className="rounded-[2rem] border border-[#65df68]/15 bg-[#0b1a15] p-6 md:p-8"><h2 className="text-2xl font-black">🇵🇱 Silnik PROMOTOR 3 kW / 400 V</h2><p className="mt-4 leading-7 text-neutral-300">Napęd stanowi trójfazowy silnik polskiej marki PROMOTOR. Moc 3 kW i prędkość około 1430 obr./min dobrze współpracują z wolnoobrotową przekładnią zastosowaną w łuparce. Gotowa maszyna jest przeznaczona do zasilania trójfazowego 400 V.</p></section>
            <section className="rounded-[2rem] border border-[#65df68]/15 bg-[#0b1a15] p-6 md:p-8"><h2 className="text-2xl font-black">📋 Najważniejsze dane</h2><ul className="mt-4 space-y-2 leading-7 text-neutral-300"><li>• 3 kW / 400 V / 50 Hz</li><li>• silnik: ok. 1430 obr./min</li><li>• wał roboczy: ok. 9,5 obr./min</li><li>• 2 przeciwległe kliny</li><li>• ok. 19 kontaktów klina z drewnem/min</li><li>• praktyczna wydajność do ok. 5–6 m³/h*</li></ul></section>
          </div>
          <figure className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-[#65df68]/15 bg-[url('/wood-splitter-bg.jpg')] bg-cover bg-center"><div className="absolute inset-0 bg-gradient-to-r from-[#07100d]/95 via-[#07100d]/65 to-transparent" /><figcaption className="relative max-w-2xl p-8 md:p-12"><p className="text-sm font-black uppercase tracking-[0.2em] text-[#65df68]">Trudne drewno</p><h2 className="mt-3 text-3xl font-black">Sęki, rozwidlenia i nieregularne włókna</h2><p className="mt-4 text-lg leading-8 text-neutral-200">Napęd przekładniowy zapewnia wysoki moment obrotowy, a geometria klinów pozwala pracować również z pniami sękatymi, rozwidlonymi i drewnem o nieregularnym przebiegu włókien. Łuparkę testujemy na różnych gatunkach drewna, także na starych tujach ogrodowych.</p></figcaption></figure>
          <div className="rounded-[2rem] border border-[#65df68]/15 bg-[#0b1a15] p-6 md:p-10"><h2 className="text-3xl font-black">⚙️ Dlaczego napęd przekładniowy?</h2><p className="mt-5 max-w-4xl text-lg leading-8 text-neutral-300">Zamiast klasycznego układu z pompą, siłownikiem i przewodami hydraulicznymi zastosowaliśmy bezpośredni napęd mechaniczny przez przemysłową przekładnię. Nie trzeba czekać na pełny powrót siłownika, a dwa kliny zapewniają szybkie, powtarzalne tempo pracy. W przeciwieństwie do konstrukcji kinetycznych mechanizm nie opiera działania na ciężkich kołach zamachowych i gwałtownym uderzeniu.</p><div className="mt-6 grid gap-3 sm:grid-cols-2 text-neutral-200"><p>✓ bez pompy i siłownika hydraulicznego</p><p>✓ bez przewodów i wycieków oleju hydraulicznego</p><p>✓ ok. 19 kontaktów klina/min</p><p>✓ płynne przenoszenie momentu przez przekładnię</p></div></div>
          <div className="grid gap-6 md:grid-cols-2">
            <section className="rounded-[2rem] border border-[#65df68]/15 bg-[#0b1a15] p-6 md:p-8"><h2 className="text-2xl font-black">⚡ Sterowanie i kontrolowane cofanie</h2><p className="mt-4 leading-7 text-neutral-300">Panel obejmuje START, STOP, awaryjny E-STOP oraz krótki ruch wsteczny służący do uwolnienia zakleszczonego drewna. Po zaniku i powrocie zasilania maszyna nie uruchamia się samoczynnie.</p></section>
            <section className="rounded-[2rem] border border-[#65df68]/15 bg-[#0b1a15] p-6 md:p-8"><h2 className="text-2xl font-black">🦾 Kleszcze 600 mm w zestawie</h2><p className="mt-4 leading-7 text-neutral-300">Do podawania, obracania i chwytania polan dołączamy specjalne kleszcze długości ok. 600 mm. Pozwalają manipulować drewnem bez zbliżania dłoni do strefy pracy klinów.</p></section>
          </div>
          <section className="rounded-[2rem] border border-[#65df68]/15 bg-[#0b1a15] p-6 md:p-10"><h2 className="text-3xl font-black">📦 Dostarczamy zmontowaną maszynę</h2><p className="mt-4 max-w-4xl leading-8 text-neutral-300">Łuparka przyjeżdża w pełni zmontowana. W komplecie znajduje się <strong className="text-white">3 litry oleju przekładniowego ORLEN</strong>. Przed pierwszym uruchomieniem olej należy wlać do przekładni. Następnie wystarczy podłączyć odpowiedni przedłużacz 400 V / 16 A / 5P. Przedłużacz nie wchodzi w skład zestawu.</p></section>
          <p className="px-2 text-sm leading-6 text-neutral-500">* Wydajność zależy od gatunku i wilgotności drewna, wielkości polan, liczby sęków, organizacji stanowiska oraz doświadczenia operatora.</p>
        </section>
      ) : (
        <section className="mx-auto mt-8 max-w-6xl rounded-3xl border border-[#65df68]/15 bg-[#0b1a15] p-6 md:p-10">
          <h2 className="text-2xl font-black">Opis produktu</h2>
          <div className="mt-5 max-w-4xl space-y-5 text-lg leading-relaxed text-neutral-300">{getDescriptionParagraphs(product).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
        </section>
      )}
      <section id="gpsr" className="mx-auto mt-8 max-w-6xl rounded-3xl border border-[#65df68]/15 bg-[#0b1a15] p-6 md:p-10">
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
              <a className="underline" href="mailto:polmech.tech@gmail.com">polmech.tech@gmail.com</a>
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
