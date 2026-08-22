import type { Metadata } from "next";
import { FinderClient } from "@/components/finder-client";
import { TitleHero } from "@/components/title-hero";

export const metadata: Metadata = { title: "Adventskalender-Finder", description: "Finde mit wenigen Fragen deinen passenden Adventskalender – mit transparentem Match-Score und klaren Alternativen.", alternates: { canonical: "/finder" } };
export default function FinderPage() {
  return <div className="finder-page finder-page-with-hero">
    <TitleHero
      kicker="Schenken beginnt mit Zuhören"
      title="Wen möchtest du zum Leuchten bringen?"
      description="Ein paar ehrliche Antworten genügen. Wir übersetzen Wünsche in eine nachvollziehbare Auswahl, die wirklich zur Person passt."
      desktopImage="/heroes/hero-07-generationen-desktop.webp"
      mobileImage="/heroes/hero-07-generationen-mobile.webp"
      alt="Eine Großmutter und ihre erwachsene Enkelin lachen gemeinsam über einem hölzernen Adventskalender."
      priority
    />
    <div className="container finder-content"><FinderClient /></div>
  </div>;
}
