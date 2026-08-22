import Link from "next/link";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { ProductVisual } from "@/components/product-visual";
import { formatCheckedDate } from "@/lib/products";
import type { Product } from "@/lib/types";

export function ProductCard({ product, badge }: { product: Product; badge?: string }) {
  return (
    <article className="product-card">
      <ProductVisual product={product} compact />
      <div className="product-card-body">
        <div className="eyebrow-row"><span className="eyebrow">{product.category}</span>{badge ? <span className="card-badge">{badge}</span> : null}</div>
        <h3><Link href={`/produkte/${product.slug}`}>{product.title}</Link></h3>
        <p className="product-brand">{product.brand}</p>
        <ul className="mini-benefits">
          <li><CheckIcon />{product.budgetClass}</li>
          <li><CheckIcon />{product.audience}</li>
        </ul>
        <p className="data-date">Produktdaten geprüft am {formatCheckedDate(product.lastChecked)}</p>
        <div className="card-actions">
          <Link href={`/produkte/${product.slug}`} className="text-link">Details <ArrowIcon /></Link>
          <Link href={`/vergleich?ids=${product.id}`} className="subtle-link">Vergleichen</Link>
        </div>
      </div>
    </article>
  );
}
