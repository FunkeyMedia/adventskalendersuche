import type { Metadata } from "next";
import { Suspense } from "react";
import { CompareClient } from "@/components/compare-client";

export const metadata: Metadata = { title: "Adventskalender vergleichen", description: "Vergleiche zwei bis vier Adventskalender anhand verständlicher, einheitlicher Kriterien.", alternates: { canonical: "/vergleich" } };
export default function ComparePage() { return <div className="page-shell"><div className="container"><Suspense fallback={<div className="loading-panel">Vergleich wird vorbereitet …</div>}><CompareClient /></Suspense></div></div>; }
