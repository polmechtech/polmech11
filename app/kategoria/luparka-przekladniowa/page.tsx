import type { Metadata } from "next";
import { getGearboxOffers, getOfferPath, getTrendEcoPrice } from "@/lib/allegroOffers";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Łuparka przekładniowa do drewna — POLMECH.TECH",
  description: "Mechaniczne łuparki przekładniowe, reduktorowe i łuparki do drewna opałowego. Wersje 230 V i 400 V, darmowa dostawa, polska gwarancja i serwis.",
  alternates: { canonical: "/kategoria/luparka-przekladniowa" },
};

export default async function CategoryPage() {
  const products = await getGearboxOffers();
  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">POLMECH.TECH</p>
        <h1 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">Łuparka przekładniowa do drewna opałowego</h1>
        <p className="mt-6 max-w-4xl text-lg leading-relaxed text-neutral-300">
          Łuparka przekładniowa, łuparka reduktorowa i mechaniczna łuparka do drewna POLMECH.TECH wykorzystuje napęd przekładniowy bez klasycznej hydrauliki. Sprawdź modele 230 V i 400 V, kompletne maszyny, moduły oraz przekładnie do łuparek. Darmowa dostawa na terenie Polski, polska gwarancja i serwis.
        </p>
        <h2 className="mt-12 text-3xl font-black">Aktualne oferty łuparek przekładniowych</h2>
        <div className="mt-6 grid gap-4">
          {products.map((product) => (
            <a key={product.id} href={getOfferPath(product)} className="rounded-2xl border border-white/10 bg-neutral-950 p-5 transition hover:border-red-500">
              <h3 className="text-xl font-black">{product.name}</h3>
              <p className="mt-2 text-neutral-400">Cena PolMech.Tech: {getTrendEcoPrice(product)} {product.currency} · Dostępne: {product.stock} szt.</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
