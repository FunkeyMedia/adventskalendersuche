import { describe, expect, it } from "vitest";
import { getCatalog } from "./catalog";
import { products } from "./products";
import sitemap from "@/app/sitemap";

describe("crawlable catalog", () => {
  it("gives every page its own canonical URL and exposes every product exactly once", () => {
    const slugs: string[] = [];
    const first = getCatalog({});
    for (let page = 1; page <= first.pageCount; page++) {
      const catalog = getCatalog({ seite: String(page) });
      expect(catalog.pageHref(catalog.currentPage)).toBe(page === 1 ? "/produkte" : `/produkte?seite=${page}`);
      slugs.push(...catalog.pageProducts.map((product) => product.slug));
    }
    expect(new Set(slugs).size).toBe(products.length);
    expect(slugs.length).toBe(products.length);
  });
  it("normalizes invalid pages and preserves filters in navigation", () => {
    expect(getCatalog({ seite: "2junk" }).currentPage).toBe(1);
    expect(getCatalog({ seite: "-1" }).currentPage).toBe(1);
    expect(getCatalog({ seite: "999" }).currentPage).toBe(getCatalog({}).pageCount);
    expect(getCatalog({ q: " LEGO " }).pageHref(2)).toBe("/produkte?q=lego&seite=2");
  });
  it("excludes noindex legal pages and includes all catalog pages in the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls.some((url) => url.endsWith("/impressum") || url.endsWith("/datenschutz"))).toBe(false);
    for (let page = 2; page <= getCatalog({}).pageCount; page++) {
      expect(urls.some((url) => url.endsWith(`/produkte?seite=${page}`))).toBe(true);
    }
    expect(new Set(urls).size).toBe(urls.length);
  });
});
