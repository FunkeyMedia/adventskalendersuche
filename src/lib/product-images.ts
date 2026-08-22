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

export function productImageFor(product: Pick<Product, "id" | "category">) {
  return individualImages[product.id] ?? categoryImages[product.category] ?? "/products/category-other.png";
}
