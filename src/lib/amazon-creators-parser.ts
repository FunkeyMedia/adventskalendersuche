import type { AmazonImage, AmazonMoney, AmazonProductData } from "@/lib/types";

type JsonObject = Record<string, unknown>;

function asObject(value: unknown): JsonObject | null {
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value as JsonObject : null;
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value : null;
}

function asNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function getObject(parent: JsonObject | null, key: string): JsonObject | null {
  return parent ? asObject(parent[key]) : null;
}

function parseMoney(value: unknown): AmazonMoney | null {
  const money = asObject(value);
  const amount = asNumber(money?.amount);
  const currency = asString(money?.currency);
  const displayAmount = asString(money?.displayAmount);
  if (amount === null || !currency || !displayAmount) return null;
  return { amount, currency, displayAmount };
}

function parseImage(value: unknown): AmazonImage | null {
  const image = asObject(value);
  const url = asString(image?.url);
  const width = asNumber(image?.width);
  const height = asNumber(image?.height);
  if (!url || width === null || height === null) return null;

  try {
    const parsed = new URL(url);
    const allowedHost = parsed.hostname === "m.media-amazon.com"
      || parsed.hostname.endsWith(".ssl-images-amazon.com");
    if (parsed.protocol !== "https:" || !allowedHost) return null;
  } catch {
    return null;
  }

  return { url, width, height };
}

export function parseCreatorsApiItems(payload: unknown, fetchedAt = new Date().toISOString()): AmazonProductData[] {
  const root = asObject(payload);
  const result = getObject(root, "itemsResult") ?? getObject(root, "itemResults");

  return asArray(result?.items).flatMap((value) => {
    const item = asObject(value);
    const asin = asString(item?.asin);
    const detailPageUrl = asString(item?.detailPageURL) ?? asString(item?.detailPageUrl);
    if (!item || !asin || !detailPageUrl) return [];

    const images = getObject(item, "images");
    const primary = getObject(images, "primary");
    const image = parseImage(primary?.large) ?? parseImage(primary?.medium) ?? parseImage(primary?.small);
    const itemInfo = getObject(item, "itemInfo");
    const title = asString(getObject(itemInfo, "title")?.displayValue);
    const offers = getObject(item, "offersV2");
    const listing = asObject(asArray(offers?.listings)[0]);
    const price = getObject(listing, "price");
    const availability = getObject(listing, "availability");
    const deal = getObject(listing, "dealDetails");
    const merchant = getObject(listing, "merchantInfo");
    const savingBasis = getObject(price, "savingBasis");
    const savings = getObject(price, "savings");

    return [{
      asin,
      title,
      detailPageUrl,
      image,
      price: parseMoney(price?.money),
      savingBasis: parseMoney(savingBasis?.money),
      savingsPercentage: asNumber(savings?.percentage),
      availabilityType: asString(availability?.type),
      availabilityMessage: asString(availability?.message),
      dealBadge: asString(deal?.badge),
      merchantName: asString(merchant?.name),
      fetchedAt,
    }];
  });
}
