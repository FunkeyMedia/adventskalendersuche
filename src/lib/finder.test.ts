import { describe, expect, it } from "vitest";
import { calculateMatch, selectRecommendations } from "@/lib/finder";
import { products } from "@/lib/products";
import type { Product } from "@/lib/types";
import { RESULT_ROLES } from "@/components/results-client";

const base: Product = {
  id: "AK-TEST", slug: "test", asin: "B000TEST", title: "Beauty Adventskalender für Frauen", brand: "Test",
  category: "Beauty & Pflege", audience: "Erwachsene / Frauen", minimumAge: null, doors: 24,
  description: "Test", features: null, advantages: [], disadvantages: [], warnings: null, sustainability: null,
  observedPrice: 35, budgetClass: "20–40 €", prime: true, availability: "Auf Lager", rating: 4.7, reviews: 120,
  affiliateUrl: "https://www.amazon.de/dp/B000TEST?tag=onlinestarkei-21", lastChecked: "2026-08-22T10:00:00Z", score: 88, sponsoredSearchResult: false,
};

describe("finder ranking", () => {
  it("rewards matching interest, recipient and budget", () => {
    const result = calculateMatch(base, { recipient: "frau", interest: "beauty", budget: "20bis40", priority: "qualitaet" });
    expect(result?.score).toBeGreaterThanOrEqual(85);
    expect(result?.reasons).toContain("liegt in der gewählten Budgetklasse");
  });

  it("excludes pet products for non-pet recipients", () => {
    expect(calculateMatch({ ...base, category: "Haustiere" }, { recipient: "frau" })).toBeNull();
  });

  it("returns three distinct recommendation roles", () => {
    const items = [base, { ...base, id: "2", observedPrice: 18, score: 80 }, { ...base, id: "3", observedPrice: 69, score: 95 }];
    const result = selectRecommendations(items, { recipient: "frau", interest: "beauty", budget: "offen" });
    expect(new Set([result.best.product.id, result.budget.product.id, result.premium.product.id]).size).toBe(3);
    expect(RESULT_ROLES.third).toBe("Weitere passende Alternative");
  });

  it("keeps Paar, Genuss and 20–40 € recommendations inside the chosen theme and budget", () => {
    const result = selectRecommendations(products, { recipient: "paar", interest: "genuss", budget: "20bis40", priority: "offen" });
    const recommendations = [result.best, result.budget, result.premium];

    expect(recommendations).toHaveLength(3);
    expect(recommendations.every((item) => item.product.category === "Genuss & Lebensmittel")).toBe(true);
    expect(recommendations.every((item) => item.product.observedPrice !== null && item.product.observedPrice >= 20 && item.product.observedPrice < 40)).toBe(true);
  });
});
