"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AffiliateLink } from "@/components/affiliate-link";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { ProductVisual } from "@/components/product-visual";
import { searchParamsToAnswers, selectRecommendations } from "@/lib/finder";
import { formatCheckedDate } from "@/lib/products";
import { products } from "@/lib/products";
import type { MatchResult } from "@/lib/types";

function Recommendation({ result, role, accent }: { result: MatchResult; role: string; accent?: boolean }) {
  const { product } = result;
  return (
    <article className={`recommendation ${accent ? "featured" : ""}`}>
      <div className="recommendation-head"><span className="role-label">{role}</span><div className="match-score"><strong>{result.score}%</strong><span>Match</span></div></div>
      <ProductVisual product={product} />
      <div className="recommendation-body">
        <span className="eyebrow">{product.category}</span>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <h3>Warum dieser Kalender passt</h3>
        <ul className="reason-list">{result.reasons.map((reason) => <li key={reason}><CheckIcon />{reason}</li>)}</ul>
        {result.cautions.length ? <div className="caution"><strong>Gut zu wissen</strong><p>{result.cautions.join(" · ")}</p></div> : null}
        <div className="result-meta"><span>{product.budgetClass}</span><span>Stand {formatCheckedDate(product.lastChecked)}</span></div>
        <AffiliateLink href={product.affiliateUrl} productId={product.id}>Bei Amazon ansehen* <ArrowIcon /></AffiliateLink>
        <Link href={`/produkte/${product.slug}`} className="text-link">Alle Details ansehen</Link>
      </div>
    </article>
  );
}

export function ResultsClient() {
  const params = useSearchParams();
  const answers = searchParamsToAnswers(params);
  const { best, budget, premium } = selectRecommendations(products, answers);
  const comparisonIds = [best?.product.id, budget?.product.id, premium?.product.id].filter(Boolean).join(",");

  if (!best) return <div className="empty-state"><h1>Noch keine passende Empfehlung</h1><p>Ändere deine Antworten – möglicherweise waren die Filter zu eng.</p><Link href="/finder" className="button">Finder anpassen</Link></div>;

  return (
    <>
      <header className="results-intro"><span className="kicker">Deine Vorfreude-Landkarte</span><h1>Drei klare Wege statt 200 Fragezeichen.</h1><p>Der Match-Score basiert auf deinen Antworten, Zielgruppe, Budget, Thema, Altersfiltern und unserer dokumentierten Datenprüfung.</p><div className="results-actions"><Link href="/finder" className="button button-ghost">Antworten anpassen</Link><Link href={`/vergleich?ids=${comparisonIds}`} className="button">Diese drei vergleichen</Link></div></header>
      <div className="recommendation-grid"><Recommendation result={best} role="Unsere beste Empfehlung für dich" accent /><Recommendation result={budget} role="Preisbewusste Alternative" /><Recommendation result={premium} role="Premium- oder Spezialalternative" /></div>
      <p className="affiliate-disclosure">* Affiliate-Link: Wenn du darüber kaufst, erhalten wir möglicherweise eine Provision. Für dich ändert sich der Preis nicht. Preise und Verfügbarkeit werden erst auf Amazon verbindlich angezeigt.</p>
    </>
  );
}
