import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await fetch("https://trendeco.eu/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, source: "polmech" }),
      cache: "no-store",
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json({ error: "Nie udało się przesłać zamówienia. Spróbuj ponownie." }, { status: 503 });
  }
}
