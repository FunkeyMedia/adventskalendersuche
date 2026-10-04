import type { MetadataRoute } from "next";
import { guideClusters } from "@/lib/guides";
import { CATALOG_PAGE_SIZE } from "@/lib/catalog";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://adventskalendersuche.de";
  const lastModified = new Date("2026-08-22T00:00:00.000Z");
  const routes = ["", "/finder", "/produkte", "/vergleich", "/ratgeber", "/methodik", "/ueber-uns", "/kontakt", "/affiliate-transparenz"];
  return [
    ...routes.map((route) => ({ url: `${siteUrl}${route}`, lastModified, changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : route === "/finder" ? 0.9 : 0.7 })),
    ...Array.from({ length: Math.ceil(products.length / CATALOG_PAGE_SIZE) - 1 }, (_, index) => ({ url: `${siteUrl}/produkte?seite=${index + 2}`, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...guideClusters.map((guide) => ({ url: `${siteUrl}/ratgeber/${guide.slug}`, lastModified: new Date("2026-09-05T00:00:00.000Z"), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...products.map((product) => ({ url: `${siteUrl}/produkte/${product.slug}`, lastModified: new Date(product.lastChecked), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
