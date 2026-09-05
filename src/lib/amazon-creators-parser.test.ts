import { describe, expect, it } from "vitest";
import { parseCreatorsApiItems } from "@/lib/amazon-creators-parser";

describe("parseCreatorsApiItems", () => {
  it("normalisiert Bild, Preis, Verfügbarkeit und Affiliate-Ziel", () => {
    const items = parseCreatorsApiItems({
      itemsResult: {
        items: [{
          asin: "B012345678",
          detailPageURL: "https://www.amazon.de/dp/B012345678?tag=test-21",
          images: { primary: { large: { url: "https://m.media-amazon.com/images/I/test.jpg", width: 500, height: 500 } } },
          itemInfo: { title: { displayValue: "Testkalender" } },
          offersV2: { listings: [{
            availability: { type: "IN_STOCK", message: "Auf Lager" },
            price: {
              money: { amount: 29.99, currency: "EUR", displayAmount: "29,99 €" },
              savingBasis: { money: { amount: 39.99, currency: "EUR", displayAmount: "39,99 €" } },
              savings: { percentage: 25 },
            },
            merchantInfo: { name: "Amazon.de" },
          }] },
        }],
      },
    }, "2026-08-30T12:00:00.000Z");

    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({
      asin: "B012345678",
      title: "Testkalender",
      price: { amount: 29.99, currency: "EUR", displayAmount: "29,99 €" },
      savingBasis: { amount: 39.99, currency: "EUR", displayAmount: "39,99 €" },
      savingsPercentage: 25,
      availabilityType: "IN_STOCK",
      merchantName: "Amazon.de",
    });
  });

  it("ignoriert Bilder von nicht freigegebenen Hosts", () => {
    const [item] = parseCreatorsApiItems({
      itemResults: { items: [{
        asin: "B012345678",
        detailPageUrl: "https://www.amazon.de/dp/B012345678",
        images: { primary: { large: { url: "https://example.com/image.jpg", width: 500, height: 500 } } },
      }] },
    });
    expect(item.image).toBeNull();
  });
});
