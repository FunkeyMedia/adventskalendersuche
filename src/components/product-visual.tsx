import Image from "next/image";
import { productImageFor } from "@/lib/product-images";
import type { Product } from "@/lib/types";

export function ProductVisual({ product, compact = false, priority = false }: { product: Product; compact?: boolean; priority?: boolean }) {
  const image = productImageFor(product);

  return (
    <figure className={`product-visual ${compact ? "compact" : ""}`}>
      <div className="product-image-frame">
        <Image
          src={image.src}
          alt={image.referenceMatched
            ? `Freigestellte KI-Rekonstruktion des geprüften Amazon-Produkts ${product.title}`
            : `Redaktionelles Kategorie-Platzhaltermotiv für ${product.category}`}
          fill
          priority={priority}
          sizes={compact ? "(max-width: 720px) 100vw, 320px" : "(max-width: 900px) 100vw, 560px"}
        />
      </div>
      <figcaption>
        <span>{product.category}</span>
        <small>{image.referenceMatched
          ? "KI-Rekonstruktion nach geprüftem Amazon-Produktbild · kein Original-Packshot"
          : "Kategorie-Platzhalter · noch nicht mit dem konkreten Amazon-Produktbild abgeglichen"}</small>
      </figcaption>
    </figure>
  );
}
