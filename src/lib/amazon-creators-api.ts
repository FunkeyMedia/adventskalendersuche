import { unstable_cache } from "next/cache";
import { parseCreatorsApiItems } from "@/lib/amazon-creators-parser";
import type { AmazonProductData, Product, ProductWithAmazon } from "@/lib/types";

const MARKETPLACE = process.env.AMAZON_CREATORS_MARKETPLACE || "www.amazon.de";
const API_URL = "https://creatorsapi.amazon/catalog/v1/getItems";
const CACHE_SECONDS = 60 * 60;
const TOKEN_SAFETY_SECONDS = 60;

let tokenCache: { value: string; expiresAt: number } | null = null;

type ApiConfig = {
  credentialId: string;
  credentialSecret: string;
  credentialVersion: string;
  associateTag: string;
};

function getConfig(): ApiConfig | null {
  const credentialId = process.env.AMAZON_CREATORS_CREDENTIAL_ID || process.env.AMAZON_CREATORS_CLIENT_ID;
  const credentialSecret = process.env.AMAZON_CREATORS_CREDENTIAL_SECRET || process.env.AMAZON_CREATORS_CLIENT_SECRET;
  const credentialVersion = process.env.AMAZON_CREATORS_CREDENTIAL_VERSION || "3.2";
  const associateTag = process.env.AMAZON_ASSOCIATE_TAG || process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG;
  if (!credentialId || !credentialSecret || !associateTag) return null;
  return { credentialId, credentialSecret, credentialVersion, associateTag };
}

function getTokenEndpoint(version: string) {
  if (version.startsWith("3.1")) return "https://api.amazon.com/auth/o2/token";
  if (version.startsWith("3.3")) return "https://api.amazon.co.jp/auth/o2/token";
  return "https://api.amazon.co.uk/auth/o2/token";
}

async function fetchWithRetry(url: string, init: RequestInit, attempts = 3): Promise<Response> {
  let response: Response | null = null;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    response = await fetch(url, init);
    if (![429, 500, 502, 503, 504].includes(response.status)) return response;
    if (attempt < attempts - 1) {
      const retryAfter = Number(response.headers.get("retry-after"));
      const waitMs = Number.isFinite(retryAfter) && retryAfter > 0
        ? retryAfter * 1000
        : 350 * (2 ** attempt);
      await new Promise((resolve) => setTimeout(resolve, waitMs));
    }
  }
  return response as Response;
}

async function getAccessToken(config: ApiConfig, forceRefresh = false): Promise<string> {
  const now = Date.now();
  if (!forceRefresh && tokenCache && tokenCache.expiresAt > now) return tokenCache.value;

  const response = await fetchWithRetry(getTokenEndpoint(config.credentialVersion), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: config.credentialId,
      client_secret: config.credentialSecret,
      scope: "creatorsapi::default",
    }),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Amazon token request failed (${response.status})`);
  const payload = await response.json() as { access_token?: unknown; expires_in?: unknown };
  if (typeof payload.access_token !== "string") throw new Error("Amazon token response did not include an access token");
  const lifetimeSeconds = typeof payload.expires_in === "number" ? payload.expires_in : 3600;
  tokenCache = {
    value: payload.access_token,
    expiresAt: now + Math.max(60, lifetimeSeconds - TOKEN_SAFETY_SECONDS) * 1000,
  };
  return payload.access_token;
}

async function requestChunk(asins: string[]): Promise<AmazonProductData[]> {
  const config = getConfig();
  if (!config) return [];
  const apiConfig: ApiConfig = config;

  async function send(forceRefresh = false) {
    const accessToken = await getAccessToken(apiConfig, forceRefresh);
    return fetchWithRetry(API_URL, {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
        "x-marketplace": MARKETPLACE,
      },
      body: JSON.stringify({
        itemIds: asins,
        itemIdType: "ASIN",
        languagesOfPreference: ["de_DE"],
        currencyOfPreference: "EUR",
        marketplace: MARKETPLACE,
        partnerTag: apiConfig.associateTag,
        resources: [
          "images.primary.large",
          "images.primary.medium",
          "itemInfo.title",
          "offersV2.listings.availability",
          "offersV2.listings.dealDetails",
          "offersV2.listings.merchantInfo",
          "offersV2.listings.price",
        ],
      }),
      cache: "no-store",
    });
  }

  let response = await send();
  if (response.status === 401) response = await send(true);
  if (!response.ok) throw new Error(`Amazon Creators API request failed (${response.status})`);
  return parseCreatorsApiItems(await response.json());
}

const getCachedChunk = unstable_cache(
  async (asinsJson: string) => requestChunk(JSON.parse(asinsJson) as string[]),
  ["amazon-creators-api-items-v1"],
  { revalidate: CACHE_SECONDS },
);

function normalizeAsins(asins: string[]) {
  return Array.from(new Set(asins.map((asin) => asin.trim().toUpperCase()).filter((asin) => /^[A-Z0-9]{10}$/.test(asin)))).sort();
}

export function isAmazonCreatorsApiConfigured() {
  return getConfig() !== null;
}

export async function getAmazonItems(asins: string[]): Promise<Map<string, AmazonProductData>> {
  const normalized = normalizeAsins(asins);
  const result = new Map<string, AmazonProductData>();
  if (!normalized.length || !isAmazonCreatorsApiConfigured()) return result;

  for (let index = 0; index < normalized.length; index += 10) {
    const chunk = normalized.slice(index, index + 10);
    try {
      const items = await getCachedChunk(JSON.stringify(chunk));
      for (const item of items) result.set(item.asin.toUpperCase(), item);
    } catch (error) {
      console.error("Amazon Creators API enrichment unavailable", error instanceof Error ? error.message : "Unknown error");
    }
  }
  return result;
}

export async function enrichProductsWithAmazon(productList: Product[]): Promise<ProductWithAmazon[]> {
  const amazonItems = await getAmazonItems(productList.map((product) => product.asin));
  return productList.map((product) => ({ ...product, amazon: amazonItems.get(product.asin.toUpperCase()) ?? null }));
}
