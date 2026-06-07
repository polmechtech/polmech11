import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
variable: "--font-geist-sans",
subsets: ["latin"],
});

const geistMono = Geist_Mono({
variable: "--font-geist-mono",
subsets: ["latin"],
});

export const metadata: Metadata = {
title: "Polmech.tech - Łuparki Przekładniowe do Drewna Opałowego",
description:
"Polskie łuparki przekładniowe do drewna opałowego. Wersje 230V i 400V. Drewno sękate, rozwidlenia, pnie i korzenie. Serwis i części zamienne w Polsce.",
metadataBase: new URL("https://polmech.tech"),
alternates: {
canonical: "/",
},
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
> <body className="min-h-full flex flex-col">{children}</body> </html>
);
}
