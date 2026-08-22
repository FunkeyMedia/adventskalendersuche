import Link from "next/link";
import { ArrowIcon, CheckIcon, CompassIcon, DoorIcon, HeartIcon, SparkIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

const featured = [products[0], products[1], products[7]];

export default function HomePage() {
  const itemList = { "@context": "https://schema.org", "@type": "ItemList", name: "Ausgewählte Adventskalender", numberOfItems: featured.length, itemListElement: featured.map((product, index) => ({ "@type": "ListItem", position: index + 1, url: `/produkte/${product.slug}`, name: product.title })) };
  return (
    <>
      <section className="home-hero">
        <picture className="hero-picture">
          <source media="(max-width: 760px)" srcSet="/heroes/hero-01-familie-mobile.webp" />
          <img className="hero-image" src="/heroes/hero-01-familie-desktop.webp" alt="Familie öffnet gemeinsam einen Adventskalender in einem warmen Wohnzimmer" fetchPriority="high" />
        </picture>
        <div className="hero-shade" />
        <div className="container hero-content"><span className="kicker light">Die Vorfreude-Landkarte</span><h1>24 Tage.<br/><em>Ein Volltreffer.</em></h1><p>In wenigen, einfachen Schritten zu einem Adventskalender, der wirklich zur Person passt – nachvollziehbar statt überfordernd.</p><div className="hero-actions"><Link href="/finder" className="button button-light">Finder starten <ArrowIcon /></Link><Link href="/methodik" className="button button-glass">So entsteht dein Match</Link></div><div className="hero-proof"><span><CheckIcon />200 Produkte geprüft</span><span><CheckIcon />Kein Verkaufsdruck</span><span><CheckIcon />Unter 1 Minute möglich</span></div></div>
      </section>

      <section className="trust-ribbon" aria-label="Vertrauensmerkmale"><div className="container"><span>Produktdaten geprüft am 22.08.2026</span><span>200 Affiliate-Ziele validiert</span><span>Match-Logik vollständig erklärt</span><span>Preise erst bei Amazon verbindlich</span></div></section>

      <section className="section problem-section"><div className="container split-layout"><div><span className="kicker">Weniger Scrollen. Besser schenken.</span><h2>Ein Adventskalender ist keine Kategorie. Er ist ein täglicher Moment.</h2></div><div><p>Zwischen Beauty, Büchern, Rätseln und Spielzeug wird aus Vorfreude schnell Auswahlstress. Unser Finder übersetzt Wünsche in verständliche Kriterien und zeigt nicht hundert Treffer, sondern drei begründete Wege.</p><Link href="/finder" className="text-link">Jetzt Orientierung finden <ArrowIcon /></Link></div></div></section>

      <section className="section finder-preview"><div className="container"><div className="section-heading centered"><span className="kicker">So leicht fühlt sich Entscheiden an</span><h2>Drei Fragen. Drei Empfehlungen. Null Rätselraten.</h2><p>Eine klare Entscheidung pro Schritt – mit Rückweg, gespeichertem Fortschritt und einer Vorschau, sobald genug bekannt ist.</p></div><div className="journey-grid"><article><span className="journey-number">01</span><HeartIcon /><h3>Für wen?</h3><p>Zielgruppe und Alter schließen unpassende Kalender aus.</p></article><article><span className="journey-number">02</span><SparkIcon /><h3>Was begeistert?</h3><p>Interessen lenken die Auswahl, ohne sie unnötig eng zu machen.</p></article><article><span className="journey-number">03</span><CompassIcon /><h3>Was zählt?</h3><p>Budget und Priorität verfeinern den transparenten Match-Score.</p></article></div><div className="center-action"><Link href="/finder" className="button">Meinen Kalender finden <ArrowIcon /></Link><span>Dauert im Schnellmodus weniger als eine Minute.</span></div></div></section>

      <section className="section featured-section"><div className="container"><div className="section-heading"><span className="kicker">Ein Blick in die Auswahl</span><h2>Beliebte Ausgangspunkte</h2><p>Keine bezahlten Platzierungen: Diese Beispiele zeigen die Bandbreite unserer geprüften Datenbasis.</p></div><div className="product-grid">{featured.map((product, index) => <ProductCard product={product} key={product.id} badge={index === 0 ? "Starke Datenlage" : undefined} />)}</div><div className="center-action"><Link href="/produkte" className="button button-ghost">Alle 200 Produkte ansehen</Link></div></div></section>

      <section className="section method-teaser"><div className="container method-card"><div className="method-icon"><DoorIcon /></div><div><span className="kicker">Vertrauen ist Teil des Produkts</span><h2>Wir zeigen nicht nur was passt, sondern warum.</h2><p>Jede Empfehlung legt Match-Gründe, mögliche Nachteile, Datenstand und Finanzierung offen. Keine erfundenen Tests, keine künstliche Knappheit, keine versteckten Weiterleitungen.</p><div className="method-links"><Link href="/methodik">Ranking-Logik verstehen <ArrowIcon /></Link><Link href="/affiliate-transparenz">Affiliate-Modell verstehen <ArrowIcon /></Link></div></div></div></section>

      <section className="section final-cta"><div className="container"><div><span className="kicker light">Bereit für Vorfreude?</span><h2>Der richtige Kalender wartet nicht in einer endlosen Liste.</h2></div><Link href="/finder" className="button button-light">Finder starten <ArrowIcon /></Link></div></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
    </>
  );
}
