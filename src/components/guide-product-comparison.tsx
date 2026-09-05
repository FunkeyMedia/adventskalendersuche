"use client";

import Link from "next/link";
import { AffiliateLink } from "@/components/affiliate-link";
import { AmazonOffer } from "@/components/amazon-offer";
import { CheckIcon } from "@/components/icons";
import { ProductVisual } from "@/components/product-visual";
import { useAmazonProducts } from "@/components/use-amazon-products";
import { getAmazonAffiliateUrl } from "@/lib/products";
import type { Product } from "@/lib/types";

export function GuideProductComparison({ products }: { products: Product[] }) {
  const amazonItems = useAmazonProducts(products.map((product) => product.asin));
  const enriched = products.map((product) => ({
    ...product,
    amazon: amazonItems.get(product.asin.toUpperCase()) ?? null,
  }));
  const compareHref = `/vergleich?ids=${products.map((product) => product.id).join(",")}`;

  return (
    <section className="guide-comparison" aria-labelledby="guide-comparison-title">
      <div className="guide-comparison-heading">
        <div>
          <span className="kicker">Direkter Produktvergleich</span>
          <h2 id="guide-comparison-title">Drei Kalender als konkrete Orientierung</h2>
          <p>Die Auswahl zeigt unterschiedliche Ansätze – keine pauschalen Testsieger. Preis, Bild und Verfügbarkeit werden bei eingerichteter Schnittstelle live über die Amazon Creators API ergänzt.</p>
        </div>
        <Link href={compareHref} className="button button-ghost">Großen Vergleich öffnen</Link>
      </div>
      <div className="guide-comparison-grid">
        {enriched.map((product, index) => (
          <article className="guide-comparison-card" key={product.id}>
            <span className="guide-pick-label">{index === 0 ? "Redaktioneller Ausgangspunkt" : index === 1 ? "Alternative" : "Weitere Option"}</span>
            <ProductVisual product={product} compact />
            <div className="guide-comparison-body">
              <span className="eyebrow">{product.category}</span>
              <h3><Link href={`/produkte/${product.slug}`}>{product.title}</Link></h3>
              <p>{product.description}</p>
              <ul className="guide-product-facts">
                <li><CheckIcon /><span><strong>Zielgruppe</strong>{product.audience}</span></li>
                <li><CheckIcon /><span><strong>Budget</strong>{product.budgetClass}</span></li>
                <li><CheckIcon /><span><strong>Umfang</strong>{product.doors ? `${product.doors} Türchen oder Einheiten` : "Beim Anbieter prüfen"}</span></li>
              </ul>
              <AmazonOffer product={product} compact />
              <AffiliateLink href={getAmazonAffiliateUrl(product)} productId={product.id} className="amazon-button">Bei Amazon ansehen*</AffiliateLink>
              <Link href={`/produkte/${product.slug}`} className="text-link">Produktdetails und Einordnung</Link>
            </div>
          </article>
        ))}
      </div>
      <p className="affiliate-disclosure compact">* Affiliate-Link: Bei einem qualifizierten Kauf können wir eine Provision erhalten. Für dich ändert sich der Preis nicht. Verbindlich sind Preis, Lieferbarkeit und Produktangaben auf Amazon.</p>
    </section>
  );
}
