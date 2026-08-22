import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, CheckIcon } from "@/components/icons";

export const metadata: Metadata = { title: "Adventskalender-Ratgeber", description: "Ein verständlicher Ratgeber für Zielgruppe, Interessen, Budget, Sicherheit und nachhaltige Adventskalender.", alternates: { canonical: "/ratgeber" } };

export default function GuidePage() {
  return (
    <div className="page-shell editorial-page">
      <article>
        <header className="editorial-hero">
          <Image src="/heroes/hero-06-erwachsene-desktop.webp" alt="Zwei Erwachsene genießen einen gemütlichen Adventsmoment" fill priority sizes="100vw" />
          <div className="hero-shade" /><div className="container"><span className="kicker light">Kaufberatung ohne Kaufdruck</span><h1>Der beste Kalender passt zur Person – nicht zur Bestsellerliste.</h1><p>Fünf Fragen helfen mehr als fünfzig Produktkarten. Hier erfährst du, worauf es wirklich ankommt.</p></div>
        </header>
        <div className="container article-layout">
          <aside className="article-nav"><strong>In diesem Ratgeber</strong><a href="#person">1. Person vor Produkt</a><a href="#interesse">2. Das richtige Thema</a><a href="#budget">3. Budget einordnen</a><a href="#sicherheit">4. Alter und Sicherheit</a><a href="#nachhaltig">5. Nachhaltiger wählen</a></aside>
          <div className="article-content">
            <section id="person"><span className="chapter-number">01</span><h2>Beginne mit dem Alltag der Person</h2><p>Ein Kalender wirkt dann besonders, wenn sein tägliches Ritual zum Beschenkten passt. Wer morgens gern Tee trinkt, freut sich anders als jemand, der abends knobelt oder gemeinsam mit Kindern eine Geschichte liest. Frage dich deshalb: Wann wird das Türchen vermutlich geöffnet – und soll der Moment ruhig, spielerisch, genussvoll oder kreativ sein?</p><ul className="check-list"><li><CheckIcon />Für wen ist der Kalender wirklich?</li><li><CheckIcon />Soll er allein oder gemeinsam geöffnet werden?</li><li><CheckIcon />Ist tägliche Nutzung realistisch?</li></ul></section>
            <section id="interesse"><span className="chapter-number">02</span><h2>Ein klares Interesse schlägt einen vagen Trend</h2><p>Beauty, Genuss, Bücher, Rätsel und Spielzeug erfüllen völlig unterschiedliche Erwartungen. Wähle ein Hauptinteresse und behandle weitere Vorlieben als Bonus. Wenn du unsicher bist, sind vielseitige Rätsel- oder Familienkonzepte oft nachvollziehbarer als stark spezialisierte Kalender.</p></section>
            <section id="budget"><span className="chapter-number">03</span><h2>Nutze Budgetklassen, keine Scheingenauigkeit</h2><p>Preise und Verfügbarkeit bei Amazon können sich ändern. Deshalb ordnet unsere Auswahl Produkte in Budgetklassen ein. Vergleiche bei höheren Preisen besonders Inhalt, Wiederverwendbarkeit und Spezialisierungsgrad – nicht nur die Zahl der Türchen.</p><div className="guide-callout"><strong>Merksatz</strong><p>Ein günstiger Kalender mit passendem Thema ist meist das bessere Geschenk als ein teurer Kalender ohne persönlichen Bezug.</p></div></section>
            <section id="sicherheit"><span className="chapter-number">04</span><h2>Bei Kindern zählen Alter und Hinweise zuerst</h2><p>Mindestalter, verschluckbare Kleinteile und erforderliche Aufsicht sind Ausschlusskriterien, keine weichen Empfehlungen. Unser Finder berücksichtigt dokumentierte Altersangaben. Prüfe dennoch immer die verbindlichen Hersteller- und Sicherheitshinweise auf der aktuellen Produktseite.</p></section>
            <section id="nachhaltig"><span className="chapter-number">05</span><h2>Nachhaltigkeit konkret statt pauschal bewerten</h2><p>„Nachhaltig“ ist nur hilfreich, wenn klar ist, was damit gemeint ist: wiederverwendbare Verpackung, langlebige Inhalte, wenig Einwegmaterial oder regionale Herstellung. Wo belastbare Angaben fehlen, sagen wir das offen.</p></section>
            <div className="article-cta"><div><span className="kicker">Jetzt anwenden</span><h2>Der Finder übersetzt diese Fragen in drei klare Empfehlungen.</h2></div><Link href="/finder" className="button button-light">Finder starten <ArrowIcon /></Link></div>
          </div>
        </div>
      </article>
    </div>
  );
}
