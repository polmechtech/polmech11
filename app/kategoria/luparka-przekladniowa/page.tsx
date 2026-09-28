import type { Metadata } from "next";
import { getGearboxOffers, getOfferPath, getTrendEcoPrice } from "@/lib/allegroOffers";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Łuparka przekładniowa 400V 3kW do drewna | 2 kliny | PolMech",
  description: "Łuparka przekładniowa PolMech 400V 3kW do drewna sękatego, rozwidleń i tui. 2 kliny, do Ø40 cm i 50 cm, 5–6 m³/h. Polska gwarancja, serwis i części.",
  alternates: { canonical: "/kategoria/luparka-przekladniowa" },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://polmech.tech/kategoria/luparka-przekladniowa",
    title: "Łuparka przekładniowa do drewna 400V 3kW — PolMech",
    description: "Mechaniczna łuparka z dwoma klinami do trudnego drewna. Bez klasycznego układu hydraulicznego.",
  },
};

export default async function CategoryPage() {
  const products = await getGearboxOffers();
  const faq = [
    { q: "Do jakiego drewna przeznaczona jest łuparka POLMECH.TECH?", a: "Do przygotowania drewna opałowego, także polan sękatych, rozwidlonych, nieregularnych i tui. Aktualny model przyjmuje polana do około 40 cm średnicy i 50 cm długości." },
    { q: "Czym różni się od łuparki hydraulicznej?", a: "POLMECH.TECH wykorzystuje silnik, przekładnię i dwa przeciwległe kliny zamiast klasycznego układu pompa–siłownik. Mechanizm pracuje cyklicznie z prędkością około 9,5 obr./min." },
    { q: "Dlaczego zasilanie 400 V?", a: "Aktualna kompletna wersja wykorzystuje trójfazowy silnik PROMOTOR 3 kW / 400 V. Ten wariant napędu został wybrany po testach konstrukcji pod obciążeniem." },
    { q: "Jaka jest wydajność?", a: "W testach POLMECH.TECH osiągano około 5–6 m³ drewna na godzinę. Rzeczywista wydajność zależy od gatunku, średnicy, sęków, rozwidleń i organizacji pracy." },
    { q: "Czy w Polsce jest serwis i dostęp do części?", a: "Tak. POLMECH.TECH zapewnia gwarancję, wsparcie techniczne, serwis i dostęp do części w Polsce." },
  ];
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Łuparki przekładniowe do drewna PolMech",
    url: "https://polmech.tech/kategoria/luparka-przekladniowa",
    description: "Łuparki przekładniowe 400V do drewna opałowego, sękatego i rozwidleń.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://polmech.tech${getOfferPath(product)}`,
        name: product.name,
      })),
    },
  };

  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })) };

  return (
    <main className="min-h-screen bg-[#07100d] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <a href="/" className="text-sm font-bold text-[#65df68]">← POLMECH.TECH</a>
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-[#65df68]">400 V • 3 kW • 2 kliny • napęd przekładniowy</p>
          <h1 className="mt-3 max-w-5xl text-4xl font-black leading-tight sm:text-6xl">Łuparka przekładniowa do drewna — do sęków, rozwidleń i trudnych polan</h1>
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-neutral-300">
            Mechaniczna łuparka do drewna POLMECH.TECH wykorzystuje wolnoobrotowy napęd przekładniowy zamiast klasycznej pompy i siłownika hydraulicznego. Aktualna kompletna wersja pracuje z silnikiem PROMOTOR 3 kW / 400 V i dwoma przeciwległymi klinami.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {["drewno sękate", "rozwidlenia", "tuja", "Ø do 40 cm", "długość do 50 cm", "5–6 m³/h"].map((x) => <span key={x} className="rounded-full border border-[#65df68]/25 bg-[#65df68]/10 px-4 py-2 font-semibold">{x}</span>)}
          </div>
        </div>
      </section>

      <section className="bg-[#0a1713] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black sm:text-4xl">Dlaczego łuparka przekładniowa?</h2>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-neutral-300">
            Przy prostych polanach wybór maszyny jest szeroki. Konstrukcja PolMech jest kierowana do użytkowników, którzy regularnie trafiają na drewno nieregularne, sękate i rozwidlone. Mechaniczny układ wykonuje powtarzalny cykl bez klasycznego układu hydraulicznego.
          </p>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl border border-white/10 bg-black/20 p-6"><h3 className="text-xl font-black">2 przeciwległe kliny</h3><p className="mt-3 text-neutral-300">Około 19 kontaktów klinów z drewnem na minutę przy prędkości układu ok. 9,5 obr./min.</p></article>
            <article className="rounded-2xl border border-white/10 bg-black/20 p-6"><h3 className="text-xl font-black">PROMOTOR 3 kW / 400 V</h3><p className="mt-3 text-neutral-300">Trójfazowy napęd wybrany po testach do pracy przekładni pod obciążeniem.</p></article>
            <article className="rounded-2xl border border-white/10 bg-black/20 p-6"><h3 className="text-xl font-black">Serwis w Polsce</h3><p className="mt-3 text-neutral-300">Polska gwarancja, dostęp do części oraz wsparcie techniczne PolMech.</p></article>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black">Aktualne łuparki i moduły PolMech</h2>
          <div className="mt-6 grid gap-4">
            {products.map((product) => (
              <a key={product.id} href={getOfferPath(product)} className="rounded-2xl border border-[#65df68]/15 bg-[#0a1713] p-5 transition hover:border-[#65df68]">
                <h3 className="text-xl font-black">{product.name}</h3>
                <p className="mt-2 text-neutral-400">Cena PolMech.Tech: {getTrendEcoPrice(product)} {product.currency} · Dostępne: {product.stock} szt.</p>
              </a>
            ))}
          </div>
        </div>
      </section>


      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#65df68]">Dla kogo powstała ta maszyna?</p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">Gdy tania łuparka przestaje wystarczać</h2>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-neutral-300">
            POLMECH.TECH nie powstał jako najtańsza łuparka do kilku prostych polan. To rozwiązanie dla użytkownika, który przygotowuje większą ilość drewna i regularnie spotyka sęki, rozwidlenia, tuję oraz nieregularne kawałki. Właśnie wtedy liczą się powtarzalny cykl, dwa kliny, możliwość kontrolowanego cofnięcia po zakleszczeniu oraz dostęp do części i serwisu.
          </p>
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-[#65df68]/20 bg-[#65df68]/5 p-6">
              <h3 className="text-xl font-black">Warto rozważyć POLMECH.TECH, jeśli</h3>
              <p className="mt-3 leading-relaxed text-neutral-300">masz zasilanie 400 V, łupiesz drewno seryjnie, trafiasz na sęki i rozwidlenia, zależy Ci na mechanicznym napędzie przekładniowym oraz serwisie i częściach dostępnych w Polsce.</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-black/20 p-6">
              <h3 className="text-xl font-black">Nie kupuj tylko według liczby „ton”</h3>
              <p className="mt-3 leading-relaxed text-neutral-300">Przy trudnym drewnie znaczenie mają również geometria klina, przełożenie, tempo cyklu, sposób podawania polana i zachowanie maszyny po zakleszczeniu. Dlatego pokazujemy konstrukcję i realne testy, a nie tylko jedną liczbę w nagłówku.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0a1713] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black">Najczęstsze pytania o łuparkę POLMECH.TECH</h2>
          <div className="mt-8 grid gap-4">
            {faq.map((x) => <article key={x.q} className="rounded-2xl border border-white/10 bg-black/20 p-6"><h3 className="text-xl font-black">{x.q}</h3><p className="mt-3 leading-relaxed text-neutral-300">{x.a}</p></article>)}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/poradnik/luparka-do-drewna-sekatego" className="rounded-lg border border-white/20 px-5 py-3 font-bold">Drewno sękate</a>
            <a href="/poradnik/luparka-do-tui-i-rozwidlen" className="rounded-lg border border-white/20 px-5 py-3 font-bold">Tuja i rozwidlenia</a>
            <a href="/poradnik/jak-wybrac-luparke-mechaniczna" className="rounded-lg border border-white/20 px-5 py-3 font-bold">Jak wybrać łuparkę</a>
          </div>
        </div>
      </section>
      <section className="border-t border-white/10 bg-[#0a1713] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black">Łuparka przekładniowa a hydrauliczna</h2>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-neutral-300">
            Łuparka hydrauliczna wykorzystuje pompę, olej i siłownik. Łuparka przekładniowa PolMech wykorzystuje redukcję obrotów i cykliczny ruch klinów. To dwie różne zasady pracy — w PolMech nacisk położono na prosty mechanizm i szybkie, seryjne przygotowanie drewna opałowego.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/poradnik" className="rounded-lg border border-white/20 px-6 py-3 font-bold">Poradnik o łuparkach</a>
            <a href="https://www.youtube.com/channel/UC4JFZ5O7apa9umyye9Ixaaw" className="rounded-lg bg-[#65df68] px-6 py-3 font-black text-[#07100d]">Zobacz testy maszyny</a>
          </div>
        </div>
      </section>
    </main>
  );
}
