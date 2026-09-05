import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { TitleHero } from "@/components/title-hero";
import { enrichProductsWithAmazon } from "@/lib/amazon-creators-api";
import { categories, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "200 Adventskalender entdecken",
  description: "Entdecke 200 redaktionell strukturierte Adventskalender mit Amazon-Originalbildern, aktuellen Angebotspreisen und transparentem Datenstand.",
  alternates: { canonical: "/produkte" },
};

type SearchParams = Promise<{ kategorie?: string; q?: string; seite?: string }>;

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const category = params.kategorie?.trim() || "";
  const query = params.q?.trim().toLocaleLowerCase("de-DE") || "";
  const filtered = products.filter((product) => {
    const matchesCategory = !category || product.category === category;
    const haystack = `${product.title} ${product.brand} ${product.category} ${product.audience}`.toLocaleLowerCase("de-DE");
    return matchesCategory && (!query || haystack.includes(query));
  });
  const pageSize = 24;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const requestedPage = Number.parseInt(params.seite || "1", 10);
  const currentPage = Math.min(pageCount, Math.max(1, Number.isFinite(requestedPage) ? requestedPage : 1));
  const pageProducts = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const enrichedProducts = await enrichProductsWithAmazon(pageProducts);
  const pageHref = (page: number) => {
    const next = new URLSearchParams();
    if (params.q) next.set("q", params.q);
    if (category) next.set("kategorie", category);
    if (page > 1) next.set("seite", String(page));
    const search = next.toString();
    return search ? `/produkte?${search}` : "/produkte";
  };

  return (
    <div className="catalog-page">
      <TitleHero
        kicker="Die kuratierte Auswahl"
        title="200 Wege zu 24 Tagen Vorfreude."
        description="Entdecke Themen, Ideen und Menschen hinter dem Geschenk – oder lass dir im Finder drei passende Wege zeigen."
        desktopImage="/heroes/hero-08-auswahl-desktop.webp"
        mobileImage="/heroes/hero-08-auswahl-mobile.webp"
        alt="Vier Erwachsene verschiedener Generationen entdecken gemeinsam unterschiedliche Adventskalender."
        priority
      ><Link href="/finder" className="button button-light">Persönlichen Finder starten</Link></TitleHero>
      <div className="page-shell catalog-body"><div className="container">
        <form className="catalog-filters" action="/produkte" method="get">
          <div>
            <label htmlFor="product-search">Name, Marke oder Thema</label>
            <input id="product-search" name="q" type="search" defaultValue={params.q} placeholder="Zum Beispiel Rätsel oder LEGO" />
          </div>
          <div>
            <label htmlFor="product-category">Kategorie</label>
            <select id="product-category" name="kategorie" defaultValue={category}>
              <option value="">Alle Kategorien</option>
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <button className="button button-small" type="submit">Auswahl anzeigen</button>
          {(category || query) ? <Link href="/produkte" className="filter-reset">Filter zurücksetzen</Link> : null}
        </form>

        <div className="catalog-status" role="status">
          <strong>{filtered.length}</strong> {filtered.length === 1 ? "Kalender" : "Kalender"}
          {category ? <span> in „{category}“</span> : null}
          {filtered.length > pageSize ? <span> · Seite {currentPage} von {pageCount}</span> : null}
        </div>

        {filtered.length ? <><div className="product-grid catalog-grid">{enrichedProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>{pageCount > 1 ? (
          <nav className="catalog-pagination" aria-label="Katalogseiten">
            {currentPage > 1 ? <Link href={pageHref(currentPage - 1)}>← Zurück</Link> : <span aria-disabled="true">← Zurück</span>}
            <strong>Seite {currentPage} von {pageCount}</strong>
            {currentPage < pageCount ? <Link href={pageHref(currentPage + 1)}>Weiter →</Link> : <span aria-disabled="true">Weiter →</span>}
          </nav>
        ) : null}</> : (
          <div className="empty-state"><h2>Kein Treffer in dieser Kombination</h2><p>Probiere einen allgemeineren Suchbegriff oder entferne den Kategorienfilter.</p><Link href="/produkte" className="button button-ghost">Alle Produkte zeigen</Link></div>
        )}
      </div></div>
    </div>
  );
}
