import type { Product } from "@/lib/types";

const categoryImages: Record<string, string> = {
  "Beauty & Pflege": "/products/category-beauty.png",
  "Bücher & Geschichten": "/products/category-books.png",
  "Genuss & Lebensmittel": "/products/category-food.png",
  "Rätsel & Experimente": "/products/category-puzzles.png",
  "Basteln & Kreativität": "/products/category-craft.png",
  Spielzeug: "/products/category-toys.png",
  "LEGO & Klemmbausteine": "/products/category-building.png",
  Haustiere: "/products/category-pets.png",
  "Schmuck & Accessoires": "/products/category-jewelry.png",
  "Nachhaltig & wiederverwendbar": "/products/category-sustainable.png",
  "Sonstige Adventskalender": "/products/category-other.png",
};

const individualImages: Record<string, string> = {
  "AK-0004": "/products/ak-0004.png",
  "AK-0005": "/products/ak-0005.png",
  "AK-0006": "/products/ak-0006.png",
  "AK-0007": "/products/ak-0007.png",
};

const referenceMatchedImages: Record<string, string> = {
  "AK-0001": "/products/asin-3522186397.png",
  "AK-0002": "/products/asin-b0d8wqz1cw.png",
  "AK-0003": "/products/asin-3911099274.png",
  "AK-0004": "/products/asin-3910890954.png",
  "AK-0005": "/products/asin-3911984022.png",
  "AK-0006": "/products/asin-b0dkhlpzp9.png",
  "AK-0007": "/products/asin-b01my4wl6t.png",
  "AK-0008": "/products/asin-b09gg2ql5h.png",
  "AK-0009": "/products/asin-b0d8bd7xx6.png",
  "AK-0010": "/products/asin-3911252048.png",
  "AK-0011": "/products/asin-b0fktk1mxw.png",
  "AK-0012": "/products/asin-b0fh9rn8ty.png",
  "AK-0188": "/products/asin-b0h7w2fvsd.png",
};

export type ProductImageAssignment = {
  src: string;
  referenceMatched: boolean;
};

export function productImageFor(product: Pick<Product, "id" | "category">): ProductImageAssignment {
  const matched = referenceMatchedImages[product.id];
  if (matched) return { src: matched, referenceMatched: true };

  return {
    src: individualImages[product.id] ?? categoryImages[product.category] ?? "/products/category-other.png",
    referenceMatched: false,
  };
}
