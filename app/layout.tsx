import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AllegroOffersSection from "@/components/AllegroOffersSection";
import AboutCompanyBlock from "@/components/AboutCompanyBlock";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const siteUrl = "https://polmech.tech";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "PolMech.Tech - Polski Producent Łuparek Przekładniowych do Drewna", template: "%s | PolMech.Tech" },
  description: "PolMech.Tech to polski producent łuparek przekładniowych do drewna opałowego. Łuparki reduktorowe bez klasycznej hydrauliki, wersje 230V i 400V, moduły mechaniczne, przekładnie, serwis i części w Polsce.",
  keywords: ["polski producent łuparek", "producent łuparek przekładniowych", "łuparki przekładniowe", "łuparki reduktorowe", "łuparka do drewna", "łuparka bez hydrauliki", "PolMech.Tech"],
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/polmech-favicon.svg?v=20260902", type: "image/svg+xml" }],
    shortcut: "/polmech-favicon.svg?v=20260902",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: { type: "website", locale: "pl_PL", siteName: "PolMech.Tech", url: siteUrl, title: "PolMech.Tech - Polski Producent Łuparek Przekładniowych", description: "Polski producent mechanicznych łuparek przekładniowych i reduktorowych do drewna opałowego. Produkcja, kompletacja, gwarancja, serwis i części w Polsce." },
};

const siteJsonLd = { "@context": "https://schema.org", "@graph": [
  { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "PolMech.Tech", url: siteUrl, email: "info@widia.tech", telephone: "+48512077770", description: "PolMech.Tech to polski producent łuparek przekładniowych i reduktorowych do drewna opałowego. Konstrukcje są rozwijane, kompletowane i obsługiwane serwisowo w Polsce.", knowsAbout: ["łuparki przekładniowe", "łuparki reduktorowe", "mechaniczne łuparki do drewna", "przekładnie do łuparek", "przygotowanie drewna opałowego"], areaServed: { "@type": "Country", name: "Poland" } },
  { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: "PolMech.Tech", description: "Oficjalna strona polskiego producenta łuparek przekładniowych PolMech.Tech.", inLanguage: "pl-PL", publisher: { "@id": `${siteUrl}/#organization` } }
] };

const allegroLinkRewriteScript = `(() => { const oldUrl = "https://allegro.pl/uzytkownik/TRENDECO"; const newUrl = "https://allegro.pl/uzytkownik/TrendEco_EU"; const rewrite = () => { document.querySelectorAll('a[href="' + oldUrl + '"]').forEach((link) => link.setAttribute("href", newUrl)); document.querySelectorAll("footer span").forEach((node) => { if (node.textContent?.trim() === "polmech.tech") node.textContent = "PolMech.Tech"; }); }; if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", rewrite, { once: true }); else rewrite(); new MutationObserver(rewrite).observe(document.documentElement, { childList: true, subtree: true }); })();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pl" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}><body className="min-h-full flex flex-col">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
    {children}<AboutCompanyBlock /><AllegroOffersSection />
    <footer className="border-t border-white/10 bg-black px-6 py-8 text-sm text-neutral-400"><div className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-3"><a href="/o-nas" className="hover:text-white">O firmie i kontakt</a><a href="/dostawa" className="hover:text-white">Dostawa</a><a href="/zwroty-i-reklamacje" className="hover:text-white">Zwroty, reklamacja, gwarancja</a><a href="mailto:info@widia.tech" className="hover:text-white">info@widia.tech</a></div></footer>
    <script dangerouslySetInnerHTML={{ __html: allegroLinkRewriteScript }} />
  </body></html>;
}
