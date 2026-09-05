import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, CheckIcon, CompassIcon, DoorIcon, SparkIcon } from "@/components/icons";
import { TitleHero } from "@/components/title-hero";

export const metadata: Metadata = { title: "So funktionieren unsere Empfehlungen", description: "Erfahre, wie Filter, Gewichtungen, Match-Scores und Datenprüfung bei Adventskalendersuche funktionieren.", alternates: { canonical: "/methodik" } };

export default function MethodPage() {
  return (
    <div className="trust-page">
      <TitleHero
        kicker="Offene Methodik"
        title="Eine Empfehlung ist nur so gut wie ihre Begründung."
        description="Unser Finder arbeitet regelbasiert. Kein Produkt kauft sich nach oben – entscheidend ist, was zu dem Menschen passt, den du beschenken möchtest."
        desktopImage="/heroes/hero-10-vertrauen-desktop.webp"
        mobileImage="/heroes/hero-10-vertrauen-mobile.webp"
        alt="Ein älteres Paar trifft gemeinsam eine durchdachte Adventskalender-Auswahl."
      />
      <div className="page-shell"><div className="container">
      <section className="method-steps"><article><span>01</span><DoorIcon /><h2>Unpassendes ausschließen</h2><p>Zuerst greifen harte Kriterien: Bei Kindern berücksichtigen wir dokumentierte Mindestalter. Haustierkalender werden nur für Haustiere vorgeschlagen.</p></article><article><span>02</span><CompassIcon /><h2>Passung gewichten</h2><p>Zielgruppe, Interesse und Budget erhalten Punkte. Die gewählte Priorität verfeinert das Ergebnis, ohne Sicherheitsfilter zu überstimmen.</p></article><article><span>03</span><SparkIcon /><h2>Alternativen erklären</h2><p>Neben dem stärksten Gesamt-Treffer zeigen wir eine preisbewusste und eine Premium- oder Spezialalternative.</p></article></section>
      <section className="score-explainer"><div><span className="kicker">Der Match-Score</span><h2>Transparent, vergleichbar, aber bewusst nicht absolut.</h2><p>Der Prozentwert wird aus den beantworteten Kriterien und der dokumentierten Produktdatenlage berechnet. Er zeigt die relative Passung innerhalb unserer Datenbasis – nicht die objektive Qualität des Produkts.</p></div><div className="score-example"><span>Beispiel</span><strong>87%</strong><div><i style={{ width: "87%" }} /></div><small>starke Übereinstimmung mit den gewählten Kriterien</small></div></section>
      <section className="criteria-table" aria-labelledby="criteria-heading"><div className="section-heading"><span className="kicker">Was beeinflusst das Ergebnis?</span><h2 id="criteria-heading">Kriterien und ihre Rolle</h2></div><div role="list"><article role="listitem"><strong>Zielgruppe</strong><p>Bewertet, ob Ansprache und Nutzung zur beschenkten Person passen.</p><span>hohe Gewichtung</span></article><article role="listitem"><strong>Hauptinteresse</strong><p>Ordnet Beauty, Genuss, Rätsel, Kreatives, Spiel, Lesen oder Schmuck zu.</p><span>höchste Gewichtung</span></article><article role="listitem"><strong>Budgetklasse</strong><p>Vergleicht eine dokumentierte Preisbeobachtung mit deinem gewählten Rahmen.</p><span>mittlere Gewichtung</span></article><article role="listitem"><strong>Priorität</strong><p>Betont Preisgefühl, Datenlage, Nachhaltigkeit oder Besonderheit.</p><span>verfeinernde Gewichtung</span></article></div></section>
      <section className="limits-section"><div><h2>Was wir bewusst nicht behaupten</h2><ul className="reason-list"><li><CheckIcon />Wir haben die Produkte nicht selbst getestet.</li><li><CheckIcon />Amazon-Preise sind Momentaufnahmen und auf Amazon verbindlich.</li><li><CheckIcon />Wir behandeln Amazon-Bewertungen nicht als eigene Testurteile.</li><li><CheckIcon />Wir garantieren keine Verfügbarkeit oder Lieferzeit.</li></ul></div><div><h2>Wie Daten gepflegt werden</h2><p>Unsere 200 Produktdatensätze trennen Produktinformationen, Finder-Regeln und Oberfläche. Jeder Datensatz trägt ein Prüfdatum. Originalbilder und Angebotsdaten werden ergänzend über die Amazon Creators API abgerufen; fehlende Angaben bleiben sichtbar fehlend.</p><Link href="/affiliate-transparenz" className="text-link">Finanzierung verstehen <ArrowIcon /></Link></div></section>
      <div className="wide-cta"><div><span className="kicker light">Methodik verstanden?</span><h2>Dann lass sie für dich arbeiten.</h2></div><Link href="/finder" className="button button-light">Finder starten <ArrowIcon /></Link></div>
    </div></div></div>
  );
}
