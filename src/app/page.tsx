import Link from "next/link";
import { ArrowIcon, CheckIcon, DoorIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { enrichProductsWithAmazon } from "@/lib/amazon-creators-api";
import { guideClusters } from "@/lib/guides";
import { products } from "@/lib/products";

const featuredProducts = [products[0], products[1], products[7]];

export default async function HomePage() {
  const featured = await enrichProductsWithAmazon(featuredProducts);
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

      <section className="trust-ribbon" aria-label="Vertrauensmerkmale"><div className="container"><span>Originalbilder direkt von Amazon</span><span>Preise über Amazon Creators API</span><span>Match-Logik vollständig erklärt</span><span>Amazon-Preis bleibt verbindlich</span></div></section>

      <section className="section problem-section"><div className="container split-layout"><div><span className="kicker">Weniger Scrollen. Besser schenken.</span><h2>Ein Adventskalender ist keine Kategorie. Er ist ein täglicher Moment.</h2></div><div><p>Zwischen Beauty, Büchern, Rätseln und Spielzeug wird aus Vorfreude schnell Auswahlstress. Unser Finder übersetzt Wünsche in verständliche Kriterien und zeigt nicht hundert Treffer, sondern drei begründete Wege.</p><Link href="/finder" className="text-link">Jetzt Orientierung finden <ArrowIcon /></Link></div></div></section>

      <section className="section featured-section"><div className="container"><div className="section-heading"><span className="kicker">Ein Blick in die Auswahl</span><h2>Beliebte Ausgangspunkte</h2><p>Keine bezahlten Platzierungen: Diese Beispiele zeigen die Bandbreite unserer geprüften Datenbasis.</p></div><div className="product-grid">{featured.map((product, index) => <ProductCard product={product} key={product.id} badge={index === 0 ? "Starke Datenlage" : undefined} />)}</div><div className="center-action"><Link href="/produkte" className="button button-ghost">Alle 200 Produkte ansehen</Link></div></div></section>

      <section className="section home-guide-teaser"><div className="container"><div className="split-layout"><div><span className="kicker">100 Antworten im Ratgeber</span><h2>Erst verstehen. Dann vergleichen.</h2></div><div><p>Unsere zehn ausführlichen Themenwelten beantworten Fragen zu Auswahl, Kindern, Genuss, Beauty, Hobbys, Selbermachen, Nachhaltigkeit und Rückgabe – mit konkreten Produktvergleichen.</p><Link href="/ratgeber" className="text-link">Zum großen Ratgeber <ArrowIcon /></Link></div></div><div className="home-guide-links">{guideClusters.slice(0, 4).map((guide) => <Link href={`/ratgeber/${guide.slug}`} key={guide.slug}><span>{guide.kicker}</span><strong>{guide.shortTitle}</strong><small>{guide.description}</small></Link>)}</div></div></section>

      <section className="section method-teaser"><div className="container method-card"><div className="method-icon"><DoorIcon /></div><div><span className="kicker">Vertrauen ist Teil des Produkts</span><h2>Wir zeigen nicht nur was passt, sondern warum.</h2><p>Jede Empfehlung legt Match-Gründe, mögliche Nachteile, Datenstand und Finanzierung offen. Keine erfundenen Tests, keine künstliche Knappheit, keine versteckten Weiterleitungen.</p><div className="method-links"><Link href="/methodik">Ranking-Logik verstehen <ArrowIcon /></Link><Link href="/affiliate-transparenz">Affiliate-Modell verstehen <ArrowIcon /></Link></div></div></div></section>

      <section className="section final-cta"><div className="container"><div><span className="kicker light">Bereit für Vorfreude?</span><h2>Der richtige Kalender wartet nicht in einer endlosen Liste.</h2></div><Link href="/finder" className="button button-light">Finder starten <ArrowIcon /></Link></div></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
    </>
  );
}
