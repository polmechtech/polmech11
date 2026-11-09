import OfferAddToCartButton from "@/components/OfferAddToCartButton";
import HoverZoomImage from "@/components/HoverZoomImage";
import BrandText, { BrandName } from "@/components/BrandText";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import {
  extractOfferId,
  getGearboxOfferById,
  getOfferPath,
  getDescriptionParagraphs,
  getVisibleDescriptionParagraphs,
  JZQ250_DIMENSIONS_MM,
  getAllegroDescriptionImages,
  getProductDescription,
  getStructuredDataDescription,
  getTrendEcoPrice,
  getDisplayProductName,
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
    title: getDisplayProductName(product.name),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title: getDisplayProductName(product.name),
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
  const whatsappUrl = `https://wa.me/48512077770?text=${encodeURIComponent(`Dzień dobry, interesuje mnie produkt: ${product.name} (nr oferty ${product.id}). Czy jest dostępny? Proszę o kontakt.`)}`;
  const descriptionImages = getAllegroDescriptionImages(product);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: getDisplayProductName(product.name),
    description: getStructuredDataDescription(product),
    image: product.image ? [product.image] : undefined,
    sku: product.id,
    brand: { "@type": "Brand", name: "POLMECH.TECH" },
    manufacturer: {
      "@type": "Organization",
      "@id": "https://polmech.tech/#organization",
      name: "POLMECH.TECH",
      url: "https://polmech.tech",
    },
    offers: {
      "@type": "Offer",
      url: `https://polmech.tech${canonicalPath}`,
      priceCurrency: product.currency,
      price: getTrendEcoPrice(product),
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: "POLMECH.TECH", url: "https://polmech.tech" },
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
        <div>
          <div className="flex min-h-80 items-center justify-center rounded-2xl bg-white p-5">
            {product.image ? (
              <HoverZoomImage src={product.image} alt={product.name} imageClassName="max-h-[560px] max-w-full object-contain" />
            ) : (
              <span className="text-neutral-500">Brak zdjęcia</span>
            )}
          </div>
          {descriptionImages.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3" aria-label="Dodatkowe zdjęcia z opisu Allegro">
              {descriptionImages.map((url, index) => (
                <div key={url} className="flex aspect-[4/3] items-center justify-center rounded-xl bg-white p-2">
                  <HoverZoomImage src={url} alt={`${product.name} — zdjęcie z opisu ${index + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <a href="/#oferty" className="text-sm font-semibold text-neutral-400 hover:text-white">← Wróć do ofert</a>
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-[#65df68]"><BrandName /> • polski producent łuparek przekładniowych</p>
          <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl"><BrandText text={getDisplayProductName(product.name)} /></h1>
          
          <p className="mt-1 text-4xl font-black text-[#65df68]">{getTrendEcoPrice(product)} {product.currency}</p>
          <p className="mt-1 text-sm font-bold text-[#9aee96]">Cena <BrandName /></p>
          <p className="mt-3 text-neutral-300">{product.stock > 0 ? `Dostępne: ${product.stock} szt.` : "Sprawdź aktualną dostępność"}</p>
          <div className="mt-8 grid gap-3">
            <div className="grid gap-2 rounded-xl border border-[#65df68]/30 bg-[#65df68]/10 p-3 text-center">
              <p className="text-sm font-bold text-white">Masz pytania? Zadzwoń lub napisz — odpowiemy przed zakupem.</p>
              <a href="tel:+48512077770" className="flex min-h-11 items-center justify-center rounded-xl bg-[#65df68] px-3 py-2 font-black text-[#07100d]">Zadzwoń: +48 512 077 770</a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center rounded-xl border border-[#65df68] px-3 py-2 font-black text-white">Napisz na WhatsApp</a>
            </div>
            <OfferAddToCartButton product={{ id: product.id, name: product.name, price: getTrendEcoPrice(product), currency: product.currency, image: product.image, stock: product.stock }} />
            <a href={product.url} target="_blank" rel="noopener noreferrer sponsored" className="rounded-2xl border border-white/20 px-6 py-4 text-center font-bold transition hover:bg-white/10">Kup na Allegro</a>
          </div>
        </div>
      </article>
      {product.id === "18788891328" ? (
        <section className="mx-auto mt-8 max-w-6xl space-y-6">
          <div className="rounded-[2rem] border border-[#65df68]/15 bg-[#0b1a15] p-6 md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#65df68]"><BrandName /> • 400 V • 3 kW</p>
            <h2 className="mt-3 text-3xl font-black">Polska łuparka przekładniowa do dużych polan i drobnej rozpałki</h2>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-neutral-300">Maszynę opracowaliśmy w Polsce z myślą o szybkim przygotowaniu drewna opałowego. Dwa przeciwległe kliny pozwalają sprawnie dzielić duże polano na kolejne, coraz mniejsze szczapy. Mechaniczne rozłupywanie pozostawia postrzępione, otwarte włókna, dzięki czemu drobne kawałki łatwo chwytają płomień i dobrze sprawdzają się jako rozpałka.</p>
          </div>
          {product.image && <figure className="overflow-hidden rounded-[2rem] border border-[#65df68]/15 bg-white p-5"><HoverZoomImage src={product.image} alt="Łuparka przekładniowa POLMECH.TECH 400 V 3 kW" imageClassName="mx-auto max-h-[680px] w-full object-contain" /></figure>}
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
          <div className="mt-5 max-w-4xl space-y-5 text-lg leading-relaxed text-neutral-300">{getVisibleDescriptionParagraphs(product).map((paragraph, index) => <p key={index}><BrandText text={paragraph} /></p>)}</div>
          {product.id === "18878600668" && (
            <div className="mt-8 rounded-2xl border border-[#65df68]/25 bg-black/20 p-5">
              <h3 className="text-2xl font-black">Rozmiary reduktora JZQ250 (mm)</h3>
              <p className="mt-2 text-sm text-neutral-400">Oznaczenia L2 i l2 są różne — wielkość litery ma znaczenie.</p>
              <dl className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {JZQ250_DIMENSIONS_MM.map(([label, value]) => (
                  <div key={label} className="rounded-lg border border-white/10 bg-[#10221b] px-3 py-2">
                    <dt className="text-xs font-bold text-[#9aee96]">{label}</dt>
                    <dd className="text-lg font-black text-white">{value} mm</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

        </section>
      )}
      {product.id === "19044041381" && (
        <section className="mx-auto mt-8 max-w-6xl rounded-3xl border border-amber-400/35 bg-[#191910] p-6 md:p-10">
          <p className="text-sm font-black uppercase tracking-widest text-amber-300">Dla samodzielnych konstruktorów</p>
          <h2 className="mt-3 text-3xl font-black">Tanie, proste sterowanie 400 V — nie pełna szafa sterownicza łuparki</h2>
          <p className="mt-4 leading-8 text-neutral-200">Wyłącznik elektromagnetyczny z funkcją lewo / zero / prawo oraz START/STOP może być ekonomiczną alternatywą w samodzielnie budowanych urządzeniach, np. przy zakupie osobnego reduktora JZQ250 lub modułu mechanicznego. Pozwala uprościć projekt sterowania napędem, jeśli jego parametry są odpowiednie dla zastosowanego silnika.</p>
          <p className="mt-4 font-bold leading-8 text-amber-200">Uwaga: nie jest to pełnowartościowy zamiennik fabrycznego panelu sterowania gotowej łuparki <BrandName />. Nie zapewnia sam z siebie wszystkich funkcji bezpieczeństwa maszyny, w tym dedykowanego zatrzymania awaryjnego i kontrolowanego cofania klina.</p>
          <p className="mt-4 leading-8 text-neutral-300">Przed użyciem trzeba zweryfikować prąd znamionowy silnika i kategorię pracy styków (w opisie wyłącznika AC-3: 12 A, Ith: 16 A), zabezpieczenia nadprądowe i przeciążeniowe, ryzyko nieoczekiwanego ruchu oraz zgodność całej instalacji. Projekt i podłączenie należy powierzyć osobie o odpowiednich kwalifikacjach. Kierunek obrotów zmieniaj wyłącznie po całkowitym zatrzymaniu napędu.</p>
        </section>
      )}
      {(product.id === "18690927460" || product.id === "18878600668") && (
        <section className="mx-auto mt-8 max-w-6xl rounded-3xl border border-[#65df68]/25 bg-[#0b1a15] p-6 md:p-10">
          <h2 className="text-3xl font-black">Dobierz silnik i sterowanie do własnego projektu</h2>
          <p className="mt-4 leading-8 text-neutral-300">Kupując sam moduł mechaniczny lub reduktor JZQ250, możesz zapytać nas również o silnik trójfazowy 3 kW albo 4 kW / 400 V. Silniki sprzedajemy po indywidualnym potwierdzeniu dostępności i ceny przed zakupem.</p>
          <p className="mt-4 leading-8 text-neutral-300">Do projektów własnych oferujemy także <a className="font-bold text-[#65df68] underline" href="https://trendeco.eu/oferta/wylacznik-elektromagnetyczny-400v-lewe-prawe-obroty-19044041381">ekonomiczny wyłącznik elektromagnetyczny 400 V z rewersem</a>. To prostsza opcja sterowania, a nie odpowiednik rozbudowanego panelu z zabezpieczeniami stosowanego w gotowej łuparce <BrandName />. Wymaga oceny kompatybilności oraz projektu zabezpieczeń całej maszyny.</p>
          <div className="mt-5 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-5">
            <h3 className="text-xl font-black text-amber-200">Dlaczego nie zalecamy silnika mocniejszego niż 4 kW?</h3>
            <p className="mt-3 leading-7 text-neutral-200">Dla reduktora JZQ250 tej wielkości rekomendujemy moc silnika 3–4 kW / 400 V ze względu na gabaryty i zdolność przenoszenia obciążeń przez samą przekładnię. Wyższa moc silnika nie gwarantuje proporcjonalnego wzrostu efektywnej siły rozłupywania drewna, ponieważ ograniczają ją przełożenie, geometria klina i nośność mechanizmu. Zwiększa natomiast możliwy moment przeciążenia i pobór energii przy wykorzystaniu dodatkowej mocy. Przy nagłym zablokowaniu klina przez bardzo twardy, praktycznie nieodkształcalny przedmiot (np. metalowy łom) powstaje udar, który może uszkodzić zęby przekładni. Drewno zwykle odkształca się i pęka stopniowo; metalowy przedmiot może zatrzymać mechanizm niemal natychmiast.</p>
            <p className="mt-3 leading-7 text-neutral-200">Silnik powyżej 4 kW wymaga odrębnego projektu i weryfikacji nośności przekładni, pasów, wałów oraz ograniczenia momentu przy przeciążeniu. Nie należy zakładać, że standardowy wyłącznik elektromagnetyczny zabezpiecza przed takim udarem.</p>
          </div>
          <a className="mt-5 inline-flex rounded-xl bg-[#65df68] px-5 py-3 font-black text-[#07100d]" target="_blank" rel="noopener noreferrer" href="https://wa.me/48512077770?text=Dzie%C5%84%20dobry%2C%20prosz%C4%99%20o%20dost%C4%99pno%C5%9B%C4%87%20i%20cen%C4%99%20silnika%203%20lub%204%20kW%20400%20V%20do%20modu%C5%82u%20lub%20reduktora%20JZQ250.">Zapytaj o silnik 3 / 4 kW</a>
        </section>
      )}
      <section id="gpsr" className="mx-auto mt-8 max-w-6xl rounded-3xl border border-[#65df68]/15 bg-[#0b1a15] p-6 md:p-10">
        <h2 className="text-2xl font-black">Informacje o produkcie i bezpieczeństwie (GPSR)</h2>
        <p className="mt-2 text-sm text-neutral-500">Dane producenta i podmiotu odpowiedzialnego na terenie Unii Europejskiej.</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-black">Producent / marka</h3>
            <p className="mt-1 font-semibold">{product.id === "19044041381" ? "Wyłącznik elektromagnetyczny 400 V — marka wg oferty" : <BrandName />}</p>
            <p className="mt-1 text-neutral-300">{product.id === "19044041381" ? <BrandText text="To akcesorium do budowy i sterowania maszynami, nie gotowa łuparka POLMECH.TECH." /> : "Łuparki przekładniowe rozwijane i kompletowane w Polsce."}</p>
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
          <p className="mt-2 whitespace-pre-line text-neutral-300">{product.id === "19044041381" ? "Montaż elektryczny wyłącznie przez osobę z odpowiednimi kwalifikacjami. Sprawdź prąd silnika, kategorię pracy styków, ochronę przeciążeniową oraz funkcje bezpieczeństwa całej maszyny. Przed zmianą kierunku odczekaj do zatrzymania silnika. Wyłącznik nie jest kompletnym układem bezpieczeństwa łuparki." : "Przed użyciem należy przeczytać instrukcję obsługi, sprawdzić osłony i zabezpieczenia oraz stosować wymagane środki ochrony indywidualnej. Nie wolno modyfikować konstrukcji ani omijać zabezpieczeń. Produkt służy wyłącznie do mechanicznego łupania drewna opałowego."}</p>
        </div>
      </section>
    </main>
  );
}
