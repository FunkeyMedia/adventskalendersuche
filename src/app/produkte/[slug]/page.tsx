import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AffiliateLink } from "@/components/affiliate-link";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { ProductVisual } from "@/components/product-visual";
import { formatCheckedDate, getProduct, getProductsByCategory, products } from "@/lib/products";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Produkt nicht gefunden" };
  return {
    title: product.title,
    description: `${product.description.slice(0, 145)} – Eigenschaften, Eignung und transparenter Datenstand.`,
    alternates: { canonical: `/produkte/${product.slug}` },
    openGraph: { title: product.title, description: product.description.slice(0, 180), type: "article" },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = getProductsByCategory(product.category, 4).filter((item) => item.id !== product.id).slice(0, 3);
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    brand: { "@type": "Brand", name: product.brand },
    category: product.category,
    sku: product.asin,
  };

  return (
    <div className="page-shell product-detail-page">
      <div className="container">
        <nav className="breadcrumbs" aria-label="Brotkrümelnavigation"><Link href="/produkte">Produkte</Link><span aria-hidden="true">/</span><span>{product.category}</span></nav>
        <section className="product-detail-hero">
          <ProductVisual product={product} priority />
          <div className="product-detail-copy">
            <span className="eyebrow">{product.category}</span>
            <h1>{product.title}</h1>
            <p className="product-lead">{product.description}</p>
            <div className="product-facts"><span><strong>Marke</strong>{product.brand}</span><span><strong>Budgetklasse</strong>{product.budgetClass}</span><span><strong>Geeignet für</strong>{product.audience}</span></div>
            <div className="product-primary-actions"><AffiliateLink href={product.affiliateUrl} productId={product.id}>Bei Amazon ansehen* <ArrowIcon /></AffiliateLink><Link className="button button-ghost" href={`/vergleich?ids=${product.id}`}>Vergleichen</Link></div>
            <p className="affiliate-disclosure compact">* Affiliate-Link. Für dich bleibt der Preis gleich. Preis, Verfügbarkeit und Lieferzeit werden erst bei Amazon verbindlich angezeigt.</p>
          </div>
        </section>

        <section className="product-detail-grid">
          <article className="content-card"><h2>Was dafür spricht</h2><ul className="reason-list">{product.advantages.map((item) => <li key={item}><CheckIcon />{item}</li>)}</ul></article>
          <article className="content-card"><h2>Was du wissen solltest</h2>{product.disadvantages.length ? <ul className="plain-list">{product.disadvantages.map((item) => <li key={item}>{item}</li>)}</ul> : <p>In der dokumentierten Datenquelle wurden keine konkreten Nachteile benannt. Das ist kein Qualitätsurteil.</p>}{product.warnings ? <div className="caution"><strong>Sicherheits- oder Produkthinweis</strong><p>{product.warnings}</p></div> : null}</article>
          <article className="content-card product-data-card"><h2>Produktdaten</h2><dl><div><dt>Inhalt</dt><dd>{product.doors ? `${product.doors} Türchen oder Einheiten` : "Nicht eindeutig angegeben"}</dd></div><div><dt>Mindestalter</dt><dd>{product.minimumAge ? `Ab ${product.minimumAge} Jahren` : "Nicht eindeutig angegeben"}</dd></div><div><dt>Merkmale</dt><dd>{product.features || "Nicht eindeutig angegeben"}</dd></div><div><dt>Nachhaltigkeit</dt><dd>{product.sustainability || "Keine belastbare Angabe vorhanden"}</dd></div><div><dt>Letzte Prüfung</dt><dd>{formatCheckedDate(product.lastChecked)}</dd></div></dl></article>
          <aside className="content-card editorial-note"><h2>Unsere Einordnung</h2><p>Diese Seite fasst öffentlich auffindbare Produktangaben strukturiert zusammen. Wir haben den Kalender nicht selbst getestet und zeigen bewusst keine angeblich aktuellen Amazon-Bewertungen oder Livepreise.</p><Link href="/methodik" className="text-link">Methodik verstehen <ArrowIcon /></Link></aside>
        </section>

        {related.length ? <section className="related-products"><div className="section-heading"><span className="kicker">Ähnliche Richtung</span><h2>Weitere Kalender aus dieser Kategorie</h2></div><div className="product-grid">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section> : null}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
    </div>
  );
}
