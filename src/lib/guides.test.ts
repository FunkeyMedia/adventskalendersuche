import { describe, expect, it } from "vitest";
import { guideClusters } from "@/lib/guides";
import { productById } from "@/lib/products";

describe("Ratgeber-Struktur", () => {
  it("enthält zehn Themenwelten mit insgesamt 100 Fragen", () => {
    expect(guideClusters).toHaveLength(10);
    expect(guideClusters.reduce((total, guide) => total + guide.topics.length, 0)).toBe(100);
  });

  it("verwendet eindeutige Routen und Sprungmarken", () => {
    expect(new Set(guideClusters.map((guide) => guide.slug)).size).toBe(guideClusters.length);
    for (const guide of guideClusters) {
      expect(new Set(guide.topics.map((topic) => topic.id)).size).toBe(guide.topics.length);
    }
  });

  it("vergleicht in jeder Themenwelt drei vorhandene Produkte", () => {
    for (const guide of guideClusters) {
      expect(guide.productIds).toHaveLength(3);
      expect(guide.productIds.every((id) => productById.has(id))).toBe(true);
    }
  });
});
