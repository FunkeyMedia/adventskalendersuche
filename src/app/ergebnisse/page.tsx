import type { Metadata } from "next";
import { ResultsClient } from "@/components/results-client";
import { enrichProductsWithAmazon } from "@/lib/amazon-creators-api";
import { searchParamsToAnswers, selectRecommendations } from "@/lib/finder";
import { products } from "@/lib/products";

export const metadata: Metadata = { title: "Deine Empfehlungen", description: "Deine personalisierten Adventskalender-Empfehlungen mit Match-Gründen und Alternativen.", robots: { index: false, follow: true } };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ResultsPage({ searchParams }: { searchParams: SearchParams }) {
  const rawParams = await searchParams;
  const params = new URLSearchParams();
  Object.entries(rawParams).forEach(([key, value]) => {
    if (typeof value === "string") params.set(key, value);
  });
  const recommendations = selectRecommendations(products, searchParamsToAnswers(params));
  const selected = [recommendations.best, recommendations.budget, recommendations.premium].filter((result) => Boolean(result));
  const enriched = await enrichProductsWithAmazon(selected.map((result) => result.product));
  const enrichedById = new Map(enriched.map((product) => [product.id, product]));
  const withAmazon = (result: typeof recommendations.best) => result
    ? { ...result, product: enrichedById.get(result.product.id) || result.product }
    : undefined;

  return <div className="results-page"><div className="container"><ResultsClient best={withAmazon(recommendations.best)} budget={withAmazon(recommendations.budget)} premium={withAmazon(recommendations.premium)} /></div></div>;
}
