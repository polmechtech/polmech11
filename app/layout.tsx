import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AllegroOffersSection from "@/components/AllegroOffersSection";
import AboutCompanyBlock from "@/components/AboutCompanyBlock";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://polmech.tech";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PolMech - Polski Producent Łuparek Przekładniowych do Drewna",
    template: "%s | PolMech",
  },
  description:
    "PolMech to polski producent łuparek przekładniowych do drewna opałowego. Łuparki reduktorowe bez klasycznej hydrauliki, wersje 230V i 400V, moduły mechaniczne, przekładnie, serwis i części w Polsce.",
  keywords: [
    "polski producent łuparek",
    "producent łuparek przekładniowych",
    "łuparki przekładniowe",
    "łuparki reduktorowe",
    "łuparka do drewna",
    "łuparka bez hydrauliki",
    "PolMech",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: "PolMech",
    url: siteUrl,
    title: "PolMech - Polski Producent Łuparek Przekładniowych",
    description:
      "Polski producent mechanicznych łuparek przekładniowych i reduktorowych do drewna opałowego. Produkcja, kompletacja, gwarancja, serwis i części w Polsce.",
  },
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "PolMech",
      url: siteUrl,
      description:
        "PolMech to polski producent łuparek przekładniowych i reduktorowych do drewna opałowego. Konstrukcje są rozwijane, kompletowane i obsługiwane serwisowo w Polsce.",
      knowsAbout: [
        "łuparki przekładniowe",
        "łuparki reduktorowe",
        "mechaniczne łuparki do drewna",
        "przekładnie do łuparek",
        "przygotowanie drewna opałowego",
      ],
      areaServed: { "@type": "Country", name: "Poland" },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "PolMech",
      description: "Oficjalna strona polskiego producenta łuparek przekładniowych PolMech.",
      inLanguage: "pl-PL",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

const allegroLinkRewriteScript = `
(() => {
  const oldUrl = "https://allegro.pl/uzytkownik/TRENDECO";
  const newUrl = "https://allegro.pl/uzytkownik/TrendEco_EU";
  const rewrite = () => {
    document.querySelectorAll('a[href="' + oldUrl + '"]').forEach((link) => {
      link.setAttribute("href", newUrl);
    });
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", rewrite, { once: true });
  } else {
    rewrite();
  }
  new MutationObserver(rewrite).observe(document.documentElement, { childList: true, subtree: true });
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        {children}
        <AboutCompanyBlock />
        <AllegroOffersSection />
        <script dangerouslySetInnerHTML={{ __html: allegroLinkRewriteScript }} />
      </body>
    </html>
  );
}
