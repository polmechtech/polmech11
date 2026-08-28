import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AllegroOffersSection from "@/components/AllegroOffersSection";
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
    default: "Polmech.tech - Łuparki Przekładniowe do Drewna Opałowego",
    template: "%s | PolMech",
  },
  description:
    "Polskie łuparki przekładniowe do drewna opałowego. Wersje 230V i 400V. Drewno sękate, rozwidlenia, pnie i korzenie. Aktualne oferty Allegro, serwis i części zamienne w Polsce.",
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
    title: "Polmech.tech - Łuparki Przekładniowe do Drewna Opałowego",
    description:
      "Łuparki przekładniowe, przekładnie i mechaniczne rozwiązania do przygotowania drewna opałowego. Aktualne ceny i dostępność.",
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
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "PolMech",
      inLanguage: "pl-PL",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

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
        <AllegroOffersSection />
      </body>
    </html>
  );
}
