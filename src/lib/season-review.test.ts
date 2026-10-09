import { describe, expect, it } from "vitest";
import { getBudgetLabel, products } from "@/lib/products";
import { guideModifiedDate, SEASON_REVIEW_DATE, seasonReviews } from "@/lib/season-review";
import sitemap from "@/app/sitemap";

describe("season review consistency", () => {
  it("preserves all existing product routes and gives only reviewed pages a fresh date", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(227);
    expect(new Set(entries.map((entry) => entry.url)).size).toBe(227);
    for (const product of products) {
      const entry = entries.find((entry) => entry.url.endsWith(`/produkte/${product.slug}`));
      expect(entry).toBeDefined();
      expect(new Date(entry!.lastModified!).toISOString()).toBe(new Date(seasonReviews[product.id] ? SEASON_REVIEW_DATE : product.lastChecked).toISOString());
      expect(new URL(product.affiliateUrl).searchParams.get("tag")).toBe("onlinestarkei-21");
    }
    expect(guideModifiedDate("beauty-wellness-adventskalender")).toBe(SEASON_REVIEW_DATE);
    expect(guideModifiedDate("adventskalender-kaufberatung")).toBe("2026-09-05");
  });
  it("shows the current EUR budget instead of the historic category when an offer is present", () => {
    const product = products[1];
    const amazon = { asin: product.asin, title: null, detailPageUrl: product.affiliateUrl, image: null, savingBasis: null, savingsPercentage: null, availabilityType: null, availabilityMessage: null, dealBadge: null, merchantName: null, fetchedAt: "2026-10-08T08:00:00Z", price: { amount: 49.99, currency: "EUR", displayAmount: "49,99 €" } };
    expect(getBudgetLabel({ ...product, amazon })).toBe("40 bis unter 70 €");
    expect(getBudgetLabel({ ...product, amazon: { ...amazon, price: { ...amazon.price, amount: 20 } } })).toBe("20 bis unter 40 €");
    expect(getBudgetLabel({ ...product, amazon: { ...amazon, price: { ...amazon.price, amount: 70 } } })).toBe("Ab 70 €");
    expect(getBudgetLabel(product)).toContain("Preisstand 22.08.2026");
    expect(getBudgetLabel({ ...product, amazon: { ...amazon, price: { ...amazon.price, currency: "USD" } } })).toContain("Preisstand");
  });
});
