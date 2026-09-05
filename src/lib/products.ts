import productsJson from "@/data/products.generated.json";
import type { Product, ProductWithAmazon } from "@/lib/types";

export const products = productsJson as Product[];

export const productBySlug = new Map(products.map((product) => [product.slug, product]));
export const productById = new Map(products.map((product) => [product.id, product]));

export const categories = Array.from(new Set(products.map((product) => product.category))).sort();

export function getProduct(slug: string) {
  return productBySlug.get(slug);
}

export function getProductsByCategory(category: string, limit = 8) {
  return products.filter((product) => product.category === category).slice(0, limit);
}

export function formatObservedPrice(price: number | null) {
  if (price === null) return "Preis bei Amazon prüfen";
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(price);
}

export function formatCheckedDate(value: string) {
  return new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(value));
}

export function getAmazonAffiliateUrl(product: ProductWithAmazon) {
  return product.amazon?.detailPageUrl || product.affiliateUrl;
}
