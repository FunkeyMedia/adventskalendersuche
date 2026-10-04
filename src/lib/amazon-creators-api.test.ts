import { afterEach, expect, it, vi } from "vitest";
vi.mock("next/cache", () => ({ unstable_cache: (fn: unknown) => fn }));
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.restoreAllMocks(); vi.resetModules(); });

it("returns editorial products when the offer gateway hangs and starts catalog batches together", async () => {
  vi.stubEnv("AMAZON_CREATORS_GATEWAY_URL", "https://gateway.example/items");
  vi.stubEnv("AMAZON_CREATORS_GATEWAY_SECRET", "test-only");
  vi.stubEnv("AMAZON_CREATORS_CREDENTIAL_ID", "");
  vi.stubEnv("AMAZON_CREATORS_CLIENT_ID", "");
  vi.spyOn(console, "error").mockImplementation(() => {});
  const fetchMock = vi.fn((_url: string, init: RequestInit) => new Promise((_resolve, reject) => {
    init.signal?.addEventListener("abort", () => reject(init.signal?.reason), { once: true });
  }));
  vi.stubGlobal("fetch", fetchMock);
  const { enrichProductsWithAmazon } = await import("./amazon-creators-api");
  const { products } = await import("./products");
  const started = Date.now();
  const pending = enrichProductsWithAmazon(products.slice(0, 24));
  expect(fetchMock).toHaveBeenCalledTimes(3);
  const result = await pending;
  expect(Date.now() - started).toBeLessThan(4000);
  expect(result).toHaveLength(24);
  expect(result.every((product) => product.amazon === null && product.description)).toBe(true);
}, 6000);
