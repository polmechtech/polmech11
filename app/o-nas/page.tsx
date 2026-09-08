import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O firmie i kontakt",
  description:
    "POLMECH.TECH — polska marka i producent łuparek przekładniowych Ekogratis sp. z o.o. Powiązane marki: TrendEco i WIDIA.TECH. Zakup bezpośrednio na oficjalnych stronach marek.",
  alternates: { canonical: "/o-nas" },
};

export default function AboutPage() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://polmech.tech/#organization",
    name: "Ekogratis sp. z o.o.",
    url: "https://polmech.tech",
    description:
      "Ekogratis sp. z o.o. prowadzi w Polsce powiązane marki TrendEco, POLMECH.TECH i WIDIA.TECH. POLMECH.TECH specjalizuje się w mechanicznych łuparkach reduktorowych i przekładniowych do drewna opałowego.",
    telephone: "+48512077770",
    email: "polmech.tech@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jagielska 25/27",
      postalCode: "02-886",
      addressLocality: "Warszawa",
      addressCountry: "PL",
    },
    brand: [
      { "@type": "Brand", name: "TrendEco", url: "https://trendeco.eu" },
      { "@type": "Brand", name: "POLMECH.TECH", url: "https://polmech.tech" },
      { "@type": "Brand", name: "WIDIA.TECH", url: "https://widia.tech" },
    ],
  };

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <article className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-neutral-950 p-8 shadow-2xl md:p-12">
        <a href="/" className="text-sm font-semibold text-neutral-400">← Strona główna</a>
        <p className="mt-8 text-sm font-bold tracking-[0.2em] text-red-500">POLMECH.TECH</p>
        <h1 className="mt-3 text-4xl font-black">O firmie i kontakt</h1>
        <p className="mt-6 text-lg leading-8 text-neutral-300">POLMECH.TECH jest polską marką i producentem rozwijanym przez Ekogratis sp. z o.o. z Warszawy. <a href="https://trendeco.eu" className="font-bold underline underline-offset-4">TrendEco</a>, POLMECH.TECH i <a href="https://widia.tech" className="font-bold underline underline-offset-4">WIDIA.TECH</a> są powiązanymi markami tej samej polskiej firmy.</p>
        <p className="mt-4 text-lg leading-8 text-neutral-300">POLMECH.TECH specjalizuje się w konstrukcjach bez klasycznego układu hydraulicznego, opartych na przekładni mechanicznej i napędzie pasowym. Konstrukcje są rozwijane i kompletowane w Polsce. Zapewniamy polską gwarancję, serwis pogwarancyjny oraz dostęp do części zamiennych.</p>
        <p className="mt-4 text-lg leading-8 text-neutral-300">Produkty można kupować bezpośrednio na oficjalnych stronach marek: polmech.tech, trendeco.eu i widia.tech, zgodnie z opcjami zakupu widocznymi na danej karcie produktu.</p>
        <h2 className="mt-10 text-2xl font-black">Kontakt</h2>
        <p className="mt-4 leading-8 text-neutral-300">Ekogratis sp. z o.o.<br />Jagielska 25/27, 02-886 Warszawa<br />tel. +48 512 077 770<br />e-mail: polmech.tech@gmail.com</p>
      </article>
    </main>
  );
}
