import type { CSSProperties } from "react";
import type { ProductWithAmazon } from "@/lib/types";

const availableTypes = new Set(["IN_STOCK", "INSTOCKSCARCE", "LEADTIME", "PREORDER", "AVAILABLE_DATE"]);

function availabilityLabel(type: string | null, message: string | null) {
  if (message) return message;
  const labels: Record<string, string> = {
    IN_STOCK: "Auf Lager",
    INSTOCKSCARCE: "Nur noch wenige verfügbar",
    LEADTIME: "Mit längerer Lieferzeit",
    OUTOFSTOCK: "Derzeit nicht auf Lager",
    PREORDER: "Vorbestellbar",
    AVAILABLE_DATE: "Bald verfügbar",
    UNAVAILABLE: "Derzeit nicht verfügbar",
  };
  return type ? labels[type] || "Verfügbarkeit bei Amazon prüfen" : "Verfügbarkeit bei Amazon prüfen";
}

function formatAmazonTime(value: string) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Berlin",
  }).format(new Date(value));
}

export function AmazonOffer({ product, compact = false }: { product: ProductWithAmazon; compact?: boolean }) {
  const offer = product.amazon;
  const rating = product.rating ? Math.max(0, Math.min(5, product.rating)) : null;
  const ratingStyle = rating ? { "--rating-fill": `${rating / 5 * 100}%` } as CSSProperties : undefined;
  const available = offer?.availabilityType ? availableTypes.has(offer.availabilityType) : null;

  return (
    <div className={`amazon-offer ${compact ? "compact" : ""}`}>
      <div className="amazon-offer-labels">
        <span className="amazon-source-badge">Amazon Preis</span>
        {offer?.dealBadge ? <span className="amazon-deal-badge">{offer.dealBadge}</span> : null}
      </div>
      {offer?.price ? (
        <div className="amazon-price-row">
          <strong className="amazon-price">{offer.price.displayAmount}</strong>
          {offer.savingBasis ? <span className="amazon-list-price">statt {offer.savingBasis.displayAmount}</span> : null}
          {offer.savingsPercentage ? <span className="amazon-savings">-{offer.savingsPercentage}%</span> : null}
        </div>
      ) : (
        <strong className="amazon-price amazon-price-fallback">Preis bei Amazon ansehen</strong>
      )}
      {rating ? (
        <div className="amazon-rating" aria-label={`${rating.toLocaleString("de-DE")} von 5 Sternen, zuletzt redaktionell erfasst`}>
          <span className="amazon-stars" style={ratingStyle} aria-hidden="true">★★★★★</span>
          <span>{rating.toLocaleString("de-DE")}</span>
          {product.reviews ? <span className="amazon-review-count">({product.reviews.toLocaleString("de-DE")})</span> : null}
        </div>
      ) : null}
      <p className={`amazon-availability ${available === true ? "available" : available === false ? "unavailable" : ""}`}>
        {availabilityLabel(offer?.availabilityType ?? null, offer?.availabilityMessage ?? null)}
      </p>
      <small className="amazon-price-note">
        {offer ? `Von Amazon abgerufen am ${formatAmazonTime(offer.fetchedAt)} Uhr` : "Aktueller Preis und Bestand werden nach Verbindung mit Amazon angezeigt."}
      </small>
    </div>
  );
}
