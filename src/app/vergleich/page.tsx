import type { Metadata } from "next";
import { Suspense } from "react";
import { CompareClient } from "@/components/compare-client";
import { TitleHero } from "@/components/title-hero";

export const metadata: Metadata = { title: "Adventskalender vergleichen", description: "Vergleiche zwei bis vier Adventskalender anhand verständlicher, einheitlicher Kriterien.", alternates: { canonical: "/vergleich" } };
export default function ComparePage() {
  return <div className="compare-page">
    <TitleHero
      kicker="Unterschiede zuerst"
      title="Vergleichen, ohne sich zu verlieren."
      description="Zwei bis vier Kalender, die wichtigen Unterschiede auf einen Blick und eine Entscheidung, die sich gemeinsam richtig anfühlt."
      desktopImage="/heroes/hero-09-vergleich-desktop.webp"
      mobileImage="/heroes/hero-09-vergleich-mobile.webp"
      alt="Ein Paar vergleicht gemeinsam zwei unterschiedliche Adventskalender."
      priority
    />
    <div className="page-shell"><div className="container"><Suspense fallback={<div className="loading-panel">Vergleich wird vorbereitet …</div>}><CompareClient /></Suspense></div></div>
  </div>;
}
