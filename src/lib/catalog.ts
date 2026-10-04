import { products } from "@/lib/products";

export type CatalogParams = { kategorie?: string; q?: string; seite?: string };
export const CATALOG_PAGE_SIZE = 24;

export function getCatalog(params: CatalogParams) {
  const category = params.kategorie?.trim() || "";
  const query = params.q?.trim().toLocaleLowerCase("de-DE") || "";
  const filtered = products.filter((product) => {
    const haystack = `${product.title} ${product.brand} ${product.category} ${product.audience}`.toLocaleLowerCase("de-DE");
    return (!category || product.category === category) && (!query || haystack.includes(query));
  });
  const pageCount = Math.max(1, Math.ceil(filtered.length / CATALOG_PAGE_SIZE));
  const requestedPage = Number(params.seite || "1");
  const currentPage = Math.min(pageCount, Math.max(1, Number.isSafeInteger(requestedPage) ? requestedPage : 1));
  const pageHref = (page: number) => {
    const next = new URLSearchParams();
    if (query) next.set("q", query);
    if (category) next.set("kategorie", category);
    if (page > 1) next.set("seite", String(page));
    return next.size ? `/produkte?${next}` : "/produkte";
  };
  return { category, query, filtered, currentPage, pageCount, pageHref,
    pageProducts: filtered.slice((currentPage - 1) * CATALOG_PAGE_SIZE, currentPage * CATALOG_PAGE_SIZE) };
}
