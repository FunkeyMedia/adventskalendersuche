"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AffiliateLink } from "@/components/affiliate-link";
import { AmazonOffer } from "@/components/amazon-offer";
import { CheckIcon } from "@/components/icons";
import { ProductVisual } from "@/components/product-visual";
import { useAmazonProducts } from "@/components/use-amazon-products";
import { formatCheckedDate, getAmazonAffiliateUrl, products } from "@/lib/products";
import type { Product } from "@/lib/types";

export function CompareClient() {
  const params = useSearchParams();
  const initial = (params.get("ids") || "").split(",").filter(Boolean).slice(0, 4);
  const [ids, setIds] = useState<string[]>(initial);
  const selected = useMemo(() => ids.map((id) => products.find((product) => product.id === id)).filter((product): product is Product => Boolean(product)), [ids]);
  const amazonItems = useAmazonProducts(selected.map((product) => product.asin));
  const selectedWithAmazon = selected.map((product) => ({ ...product, amazon: amazonItems.get(product.asin.toUpperCase()) ?? null }));

  function add(id: string) { if (id && ids.length < 4 && !ids.includes(id)) setIds((current) => [...current, id]); }

  return (
    <div className="compare-shell">
      <div className="compare-picker"><label htmlFor="product-add">Produkt hinzufügen</label><select id="product-add" value="" onChange={(event) => add(event.target.value)} disabled={ids.length >= 4}><option value="">Kalender auswählen …</option>{products.filter((product) => !ids.includes(product.id)).map((product) => <option key={product.id} value={product.id}>{product.title}</option>)}</select><span>{ids.length}/4 gewählt</span></div>
      {selected.length < 2 ? <div className="empty-state compact"><h2>Wähle mindestens zwei Kalender</h2><p>Du kannst direkt hier Produkte ergänzen oder Empfehlungen aus dem Finder übernehmen.</p><Link href="/finder" className="button">Finder starten</Link></div> : (
        <div className="compare-grid" style={{ "--compare-count": selectedWithAmazon.length } as React.CSSProperties}>
          {selectedWithAmazon.map((product) => <article key={product.id} className="compare-column"><button type="button" className="remove-product" onClick={() => setIds((current) => current.filter((id) => id !== product.id))} aria-label={`${product.title} aus Vergleich entfernen`}>×</button><ProductVisual product={product} compact /><span className="eyebrow">{product.category}</span><h2>{product.title}</h2><p className="product-brand">{product.brand}</p><AmazonOffer product={product} compact /><dl><div><dt>Für wen</dt><dd>{product.audience}</dd></div><div><dt>Budgetklasse</dt><dd>{product.budgetClass}</dd></div><div><dt>Inhalt</dt><dd>{product.doors ? `${product.doors} Türchen / Einheiten` : "Nicht eindeutig angegeben"}</dd></div><div><dt>Mindestalter</dt><dd>{product.minimumAge ? `Ab ${product.minimumAge} Jahren` : "Nicht eindeutig angegeben"}</dd></div><div><dt>Datenlage</dt><dd><CheckIcon /> geprüft am {formatCheckedDate(product.lastChecked)}</dd></div></dl><AffiliateLink href={getAmazonAffiliateUrl(product)} productId={product.id} className="amazon-button">Bei Amazon ansehen*</AffiliateLink><Link href={`/produkte/${product.slug}`} className="text-link">Produktdetails</Link></article>)}
        </div>
      )}
    </div>
  );
}
