import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AffiliateLink } from "@/components/affiliate-link";
import { AmazonOffer } from "@/components/amazon-offer";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { ProductVisual } from "@/components/product-visual";
import { enrichProductsWithAmazon } from "@/lib/amazon-creators-api";
import { formatCheckedDate, getAmazonAffiliateUrl, getProduct, getProductsByCategory } from "@/lib/products";

type Params = Promise<{ slug: string }>;

export const revalidate = 3600;

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
  const [productView, ...relatedView] = await enrichProductsWithAmazon([product, ...related]);
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productView.title,
    description: productView.description,
    image: productView.amazon?.image?.url,
    brand: { "@type": "Brand", name: productView.brand },
    category: productView.category,
    sku: productView.asin,
    offers: productView.amazon?.price ? {
      "@type": "Offer",
      url: getAmazonAffiliateUrl(productView),
      priceCurrency: productView.amazon.price.currency,
      price: productView.amazon.price.amount,
      availability: productView.amazon.availabilityType === "IN_STOCK" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    } : undefined,
  };

  return (
    <div className="page-shell product-detail-page">
      <div className="container">
        <nav className="breadcrumbs" aria-label="Brotkrümelnavigation"><Link href="/produkte">Produkte</Link><span aria-hidden="true">/</span><span>{product.category}</span></nav>
        <section className="product-detail-hero">
          <ProductVisual product={productView} priority />
          <div className="product-detail-copy">
            <span className="eyebrow">{product.category}</span>
            <h1>{product.title}</h1>
            <p className="product-lead">{product.description}</p>
            <div className="product-facts"><span><strong>Marke</strong>{product.brand}</span><span><strong>Budgetklasse</strong>{product.budgetClass}</span><span><strong>Geeignet für</strong>{product.audience}</span></div>
            <div className="amazon-buy-box"><AmazonOffer product={productView} /><AffiliateLink href={getAmazonAffiliateUrl(productView)} productId={product.id} className="amazon-button amazon-button-large">Jetzt bei Amazon ansehen* <ArrowIcon /></AffiliateLink></div>
            <div className="product-primary-actions"><Link className="button button-ghost" href={`/vergleich?ids=${product.id}`}>Mit anderen vergleichen</Link></div>
            <p className="affiliate-disclosure compact">* Affiliate-Link. Für dich bleibt der Preis gleich. Preis und Verfügbarkeit werden über Amazon abgerufen; verbindlich sind die Angaben auf der Amazon-Produktseite.</p>
          </div>
        </section>

        <section className="product-detail-grid">
          <article className="content-card"><h2>Was dafür spricht</h2><ul className="reason-list">{product.advantages.map((item) => <li key={item}><CheckIcon />{item}</li>)}</ul></article>
          <article className="content-card"><h2>Was du wissen solltest</h2>{product.disadvantages.length ? <ul className="plain-list">{product.disadvantages.map((item) => <li key={item}>{item}</li>)}</ul> : <p>In der dokumentierten Datenquelle wurden keine konkreten Nachteile benannt. Das ist kein Qualitätsurteil.</p>}{product.warnings ? <div className="caution"><strong>Sicherheits- oder Produkthinweis</strong><p>{product.warnings}</p></div> : null}</article>
          <article className="content-card product-data-card"><h2>Produktdaten</h2><dl><div><dt>Inhalt</dt><dd>{product.doors ? `${product.doors} Türchen oder Einheiten` : "Nicht eindeutig angegeben"}</dd></div><div><dt>Mindestalter</dt><dd>{product.minimumAge ? `Ab ${product.minimumAge} Jahren` : "Nicht eindeutig angegeben"}</dd></div><div><dt>Merkmale</dt><dd>{product.features || "Nicht eindeutig angegeben"}</dd></div><div><dt>Nachhaltigkeit</dt><dd>{product.sustainability || "Keine belastbare Angabe vorhanden"}</dd></div><div><dt>Letzte Prüfung</dt><dd>{formatCheckedDate(product.lastChecked)}</dd></div></dl></article>
          <aside className="content-card editorial-note"><h2>Unsere Einordnung</h2><p>Diese Seite verbindet unsere redaktionelle Einordnung mit Originalbild und Angebotsdaten aus Amazons Creators API. Wir haben den Kalender nicht selbst getestet; Preis und Bestand können sich kurzfristig ändern.</p><Link href="/methodik" className="text-link">Methodik verstehen <ArrowIcon /></Link></aside>
        </section>

        {relatedView.length ? <section className="related-products"><div className="section-heading"><span className="kicker">Ähnliche Richtung</span><h2>Weitere Kalender aus dieser Kategorie</h2></div><div className="product-grid">{relatedView.map((item) => <ProductCard key={item.id} product={item} />)}</div></section> : null}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
    </div>
  );
}
