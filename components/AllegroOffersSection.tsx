import { getCashOnDeliveryWhatsAppLink, getGearboxOffers, getOfferPath, getDescriptionParagraphs, getProductDescription, getTrendEcoPrice } from "@/lib/allegroOffers";

export default async function AllegroOffersSection() {
  const products = await getGearboxOffers();

  if (!products.length) return null;

  return (
    <section id="oferty" className="bg-neutral-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">Aktualne oferty</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
            Łuparki i przekładnie dostępne od ręki
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => {
            const description = getProductDescription(product);
            const localUrl = `https://polmech.tech${getOfferPath(product)}`;
            const codUrl = getCashOnDeliveryWhatsAppLink(product);

            return (
              <article key={product.id} className="flex overflow-hidden rounded-3xl border border-white/10 bg-black/50 shadow-2xl shadow-black/30">
                <div className="flex w-full flex-col">
                  <a href={localUrl} className="flex min-h-64 items-center justify-center bg-white p-4">
                    {product.image ? (
                      <img src={product.image} alt={product.name} loading="lazy" className="max-h-64 w-full object-contain" />
                    ) : (
                      <span className="text-neutral-500">Brak zdjęcia</span>
                    )}
                  </a>

                  <div className="flex flex-1 flex-col p-6">
                    <a href={localUrl} className="text-xl font-black leading-snug transition hover:text-red-400">
                      {product.name}
                    </a>
                    <div className="mt-3 line-clamp-3 space-y-2 text-sm leading-relaxed text-neutral-400">
                      {getDescriptionParagraphs(product).slice(0, 2).map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                    <p className="mt-5 text-sm text-neutral-500 line-through">
                      Allegro: {product.price} {product.currency}
                    </p>
                    <p className="mt-1 text-3xl font-black text-red-500">
                      {getTrendEcoPrice(product)} {product.currency}
                    </p>
                    <p className="mt-1 text-sm font-bold text-red-300">Cena PolMech.Tech</p>
                    <p className="mt-2 text-sm text-neutral-300">
                      {product.stock > 0 ? `Dostępne: ${product.stock} szt.` : "Sprawdź dostępność"}
                    </p>

                    <div className="mt-6 grid gap-3">
                      <a
                        href={codUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-2xl bg-red-600 px-5 py-4 text-center font-black transition hover:bg-red-500"
                      >
                        Zamów za pobraniem z darmową dostawą
                      </a>
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="rounded-2xl border border-white/20 px-5 py-3 text-center font-bold transition hover:bg-white/10"
                      >
                        Kup na Allegro
                      </a>
                      <a href={localUrl} className="text-center text-sm font-semibold text-neutral-400 hover:text-white">
                        Szczegóły produktu →
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
