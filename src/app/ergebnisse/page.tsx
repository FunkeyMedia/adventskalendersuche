import type { Metadata } from "next";
import { Suspense } from "react";
import { ResultsClient } from "@/components/results-client";

export const metadata: Metadata = { title: "Deine Empfehlungen", description: "Deine personalisierten Adventskalender-Empfehlungen mit Match-Gründen und Alternativen.", robots: { index: false, follow: true } };
export default function ResultsPage() { return <div className="results-page"><div className="container"><Suspense fallback={<div className="loading-panel">Empfehlungen werden berechnet …</div>}><ResultsClient /></Suspense></div></div>; }
