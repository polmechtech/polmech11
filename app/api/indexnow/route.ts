import { NextResponse } from "next/server";
import { getGearboxOffers, getOfferPath } from "@/lib/allegroOffers";
import { seoGuides } from "@/lib/seoGuides";
export const dynamic = "force-dynamic";
const host = "polmech.tech"; const baseUrl = `https://${host}`; const key = "6f92c1d8e4a7430b9d1f8c27a56e4b13";
export async function GET() { try { const products = await getGearboxOffers(); const urlList = [baseUrl, `${baseUrl}/kategoria/luparka-przekladniowa`, `${baseUrl}/o-nas`, `${baseUrl}/dostawa`, `${baseUrl}/zwroty-i-reklamacje`, `${baseUrl}/poradnik`, ...seoGuides.map((g) => `${baseUrl}/poradnik/${g.slug}`), ...products.map((p) => `${baseUrl}${getOfferPath(p)}`)]; const response = await fetch("https://api.indexnow.org/indexnow", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ host, key, keyLocation: `${baseUrl}/${key}.txt`, urlList }) }); return NextResponse.json({ ok: response.ok, status: response.status, submitted: urlList.length }, { status: response.ok ? 200 : 502 }); } catch { return NextResponse.json({ ok: false, submitted: 0 }, { status: 500 }); } }
