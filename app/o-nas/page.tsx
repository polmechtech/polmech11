import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O firmie i kontakt",
  description:
    "PolMech.Tech — polski producent mechanicznych łuparek reduktorowych i przekładniowych do drewna opałowego. Produkcja, kompletacja, gwarancja, serwis i części w Polsce.",
  alternates: { canonical: "/o-nas" },
};

export default function AboutPage() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://polmech.tech/#organization",
    name: "PolMech.Tech",
    url: "https://polmech.tech",
    description:
      "PolMech.Tech jest polskim producentem mechanicznych łuparek reduktorowych i przekładniowych do drewna opałowego. Konstrukcje są rozwijane i kompletowane w Polsce, a gwarancja, serwis i części zamienne są obsługiwane w Polsce.",
    telephone: "+48512077770",
    email: "polmech.tech@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jagielska 25/27",
      postalCode: "02-886",
      addressLocality: "Warszawa",
      addressCountry: "PL",
    },
  };

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <article className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-neutral-950 p-8 shadow-2xl md:p-12">
        <a href="/" className="text-sm font-semibold text-neutral-400">← Strona główna</a>
        <p className="mt-8 text-sm font-bold tracking-[0.2em] text-red-500">PolMech.Tech</p>
        <h1 className="mt-3 text-4xl font-black">O firmie i kontakt</h1>
        <p className="mt-6 text-lg leading-8 text-neutral-300">
          PolMech.Tech jest polskim producentem mechanicznych łuparek reduktorowych i przekładniowych do drewna opałowego. Specjalizujemy się w konstrukcjach bez klasycznego układu hydraulicznego, opartych na przekładni mechanicznej i napędzie pasowym.
        </p>
        <p className="mt-4 text-lg leading-8 text-neutral-300">
          Konstrukcje PolMech.Tech są rozwijane i kompletowane w Polsce. Dostępne są wersje 230 V i 400 V, kompletne łuparki, moduły mechaniczne oraz elementy układu napędowego. Zapewniamy polską gwarancję, serwis pogwarancyjny oraz dostęp do części zamiennych.
        </p>

        <h2 className="mt-10 text-2xl font-black">Kontakt</h2>
        <p className="mt-4 leading-8 text-neutral-300">
          Ekogratis sp. z o.o.<br />
          Jagielska 25/27, 02-886 Warszawa<br />
          tel. +48 512 077 770<br />
          e-mail: polmech.tech@gmail.com
        </p>
      </article>
    </main>
  );
}
