import Image from "next/image";
import { productImageFor } from "@/lib/product-images";
import type { ProductWithAmazon } from "@/lib/types";

export function ProductVisual({ product, compact = false, priority = false }: { product: ProductWithAmazon; compact?: boolean; priority?: boolean }) {
  const fallbackImage = productImageFor(product);
  const amazonImage = product.amazon?.image;
  const src = amazonImage?.url || fallbackImage.src;

  return (
    <figure className={`product-visual ${compact ? "compact" : ""} ${amazonImage ? "amazon-original" : ""}`}>
      <div className="product-image-frame">
        <Image
          src={src}
          alt={amazonImage
            ? `Original-Produktbild von Amazon für ${product.amazon?.title || product.title}`
            : fallbackImage.referenceMatched
              ? `Freigestellte KI-Rekonstruktion des geprüften Amazon-Produkts ${product.title}`
              : `Redaktionelles Kategorie-Platzhaltermotiv für ${product.category}`}
          fill
          priority={priority}
          unoptimized={Boolean(amazonImage)}
          sizes={compact ? "(max-width: 720px) 100vw, 320px" : "(max-width: 900px) 100vw, 560px"}
        />
      </div>
      <figcaption>
        <span>{product.category}</span>
        <small>{amazonImage
          ? "Original-Produktbild · bereitgestellt über Amazon Creators API"
          : fallbackImage.referenceMatched
            ? "KI-Rekonstruktion nach geprüftem Amazon-Produktbild · kein Original-Packshot"
            : "Kategorie-Platzhalter · Amazon-Originalbild derzeit nicht verfügbar"}</small>
      </figcaption>
    </figure>
  );
}
