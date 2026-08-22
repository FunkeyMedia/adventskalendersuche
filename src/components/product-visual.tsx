import Image from "next/image";
import { productImageFor } from "@/lib/product-images";
import type { Product } from "@/lib/types";

export function ProductVisual({ product, compact = false, priority = false }: { product: Product; compact?: boolean; priority?: boolean }) {
  return (
    <figure className={`product-visual ${compact ? "compact" : ""}`}>
      <div className="product-image-frame">
        <Image
          src={productImageFor(product)}
          alt={`KI-generierte, freigestellte redaktionelle Darstellung für ${product.title}`}
          fill
          priority={priority}
          sizes={compact ? "(max-width: 720px) 100vw, 320px" : "(max-width: 900px) 100vw, 560px"}
        />
      </div>
      <figcaption>
        <span>{product.category}</span>
        <small>KI-generierte redaktionelle Darstellung · kein Original-Packshot</small>
      </figcaption>
    </figure>
  );
}
