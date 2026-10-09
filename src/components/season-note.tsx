import { SEASON_REVIEW_DATE, seasonReviews } from "@/lib/season-review";
import { formatCheckedDate } from "@/lib/products";

export function SeasonNote({ productId }: { productId: string }) {
  const review = seasonReviews[productId];
  if (!review) return null;
  return (
    <aside className="caution">
      <strong>Saisoncheck {formatCheckedDate(SEASON_REVIEW_DATE)}</strong>
      <p>{review.summary}</p>
      <a className="text-link" href={review.sourceUrl} target="_blank" rel="noopener noreferrer">{review.sourceLabel}</a>
      <p className="data-date">Herstellerangaben redaktionell geprüft. Kein eigener Produkttest.</p>
    </aside>
  );
}
