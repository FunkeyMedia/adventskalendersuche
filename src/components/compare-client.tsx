"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AffiliateLink } from "@/components/affiliate-link";
import { CheckIcon } from "@/components/icons";
import { ProductVisual } from "@/components/product-visual";
import { formatCheckedDate, products } from "@/lib/products";

export function CompareClient() {
  const params = useSearchParams();
  const initial = (params.get("ids") || "").split(",").filter(Boolean).slice(0, 4);
  const [ids, setIds] = useState<string[]>(initial);
  const selected = useMemo(() => ids.map((id) => products.find((product) => product.id === id)).filter(Boolean), [ids]);

  function add(id: string) { if (id && ids.length < 4 && !ids.includes(id)) setIds((current) => [...current, id]); }

  return (
    <div className="compare-shell">
      <header className="page-intro"><span className="kicker">Unterschiede zuerst</span><h1>Vergleichen, ohne sich zu verlieren.</h1><p>Wähle zwei bis vier Kalender. Fehlende Informationen werden offen benannt; Preise sind nur dokumentierte Momentaufnahmen.</p></header>
      <div className="compare-picker"><label htmlFor="product-add">Produkt hinzufügen</label><select id="product-add" value="" onChange={(event) => add(event.target.value)} disabled={ids.length >= 4}><option value="">Kalender auswählen …</option>{products.filter((product) => !ids.includes(product.id)).map((product) => <option key={product.id} value={product.id}>{product.title}</option>)}</select><span>{ids.length}/4 gewählt</span></div>
      {selected.length < 2 ? <div className="empty-state compact"><h2>Wähle mindestens zwei Kalender</h2><p>Du kannst direkt hier Produkte ergänzen oder Empfehlungen aus dem Finder übernehmen.</p><Link href="/finder" className="button">Finder starten</Link></div> : (
        <div className="compare-grid" style={{ "--compare-count": selected.length } as React.CSSProperties}>
          {selected.map((product) => product ? <article key={product.id} className="compare-column"><button type="button" className="remove-product" onClick={() => setIds((current) => current.filter((id) => id !== product.id))} aria-label={`${product.title} aus Vergleich entfernen`}>×</button><ProductVisual product={product} compact /><span className="eyebrow">{product.category}</span><h2>{product.title}</h2><p className="product-brand">{product.brand}</p><dl><div><dt>Für wen</dt><dd>{product.audience}</dd></div><div><dt>Budgetklasse</dt><dd>{product.budgetClass}</dd></div><div><dt>Inhalt</dt><dd>{product.doors ? `${product.doors} Türchen / Einheiten` : "Nicht eindeutig angegeben"}</dd></div><div><dt>Mindestalter</dt><dd>{product.minimumAge ? `Ab ${product.minimumAge} Jahren` : "Nicht eindeutig angegeben"}</dd></div><div><dt>Datenlage</dt><dd><CheckIcon /> geprüft am {formatCheckedDate(product.lastChecked)}</dd></div></dl><AffiliateLink href={product.affiliateUrl} productId={product.id} className="button button-small">Bei Amazon ansehen*</AffiliateLink><Link href={`/produkte/${product.slug}`} className="text-link">Produktdetails</Link></article> : null)}
        </div>
      )}
    </div>
  );
}
