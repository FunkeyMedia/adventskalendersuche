import { NextRequest, NextResponse } from "next/server";
import { getAmazonItems, isAmazonCreatorsApiConfigured } from "@/lib/amazon-creators-api";
import { products } from "@/lib/products";

export const runtime = "nodejs";
const catalogAsins = new Set(products.map((product) => product.asin.toUpperCase()));

export async function GET(request: NextRequest) {
  const asins = (request.nextUrl.searchParams.get("asins") || "")
    .split(",")
    .map((asin) => asin.trim().toUpperCase())
    .filter(Boolean);

  if (!asins.length || asins.length > 10 || asins.some((asin) => !/^[A-Z0-9]{10}$/.test(asin) || !catalogAsins.has(asin))) {
    return NextResponse.json({ error: "Bitte 1 bis 10 gültige ASINs angeben." }, { status: 400 });
  }

  const items = await getAmazonItems(asins);
  return NextResponse.json(
    { configured: isAmazonCreatorsApiConfigured(), items: Array.from(items.values()) },
    { headers: { "cache-control": "public, max-age=60, s-maxage=300, stale-while-revalidate=300" } },
  );
}
