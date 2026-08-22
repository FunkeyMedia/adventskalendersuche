import type { Metadata } from "next";
import { FinderClient } from "@/components/finder-client";

export const metadata: Metadata = { title: "Adventskalender-Finder", description: "Finde mit wenigen Fragen deinen passenden Adventskalender – mit transparentem Match-Score und klaren Alternativen.", alternates: { canonical: "/finder" } };
export default function FinderPage() { return <div className="finder-page"><div className="container"><FinderClient /></div></div>; }
