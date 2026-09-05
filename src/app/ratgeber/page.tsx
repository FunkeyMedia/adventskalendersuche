import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GuideProductComparison } from "@/components/guide-product-comparison";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { guideClusters } from "@/lib/guides";
import { productById } from "@/lib/products";

export const metadata: Metadata = {
  title: "Adventskalender-Ratgeber: 100 Antworten und Vergleiche",
  description: "Der große Adventskalender-Ratgeber mit 100 konkreten Antworten, Kaufberatung, Ideen für Kinder und Erwachsene sowie dynamischen Produktvergleichen.",
  alternates: { canonical: "/ratgeber" },
  openGraph: { type: "website", title: "Der große Adventskalender-Ratgeber", description: "100 Antworten, zehn Themenwelten und nachvollziehbare Produktvergleiche.", images: [{ url: "/guides/001-geschenkefinder.jpg", alt: "Verschiedene Adventskalender im großen Ratgeber" }] },
};

export default function GuidePage() {
  const featuredProducts = ["AK-0001", "AK-0002", "AK-0008"].map((id) => productById.get(id)).filter((product) => product !== undefined);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://adventskalendersuche.de";
  const structuredData = {
    "@context": "https://schema.org", "@type": "CollectionPage", name: "Adventskalender-Ratgeber",
    description: "100 Antworten in zehn Themenwelten rund um Auswahl, Inhalt, Sicherheit, Nachhaltigkeit und Adventskalender-Traditionen.",
    url: `${siteUrl}/ratgeber`, inLanguage: "de-DE",
    mainEntity: { "@type": "ItemList", itemListElement: guideClusters.map((guide, index) => ({ "@type": "ListItem", position: index + 1, name: guide.title, url: `${siteUrl}/ratgeber/${guide.slug}` })) },
  };

  return (
    <div className="guide-hub">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />
      <section className="guide-hub-hero">
        <Image src="/guides/001-geschenkefinder.jpg" alt="Auswahl verschiedener Adventskalender für unterschiedliche Interessen" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="container guide-hub-hero-content">
          <span className="kicker light">Der große Adventskalender-Ratgeber</span>
          <h1>100 Antworten für einen Kalender, der wirklich passt.</h1>
          <p>Von der ersten Geschenkidee bis zu Allergenen, Warenwert und Rückgabe: Zehn ausführliche Themenwelten beantworten die wichtigsten Fragen und verknüpfen sie mit konkreten Produkten aus unserem Katalog.</p>
          <div className="guide-hub-actions"><a href="#themen" className="button button-light">Themen entdecken</a><Link href="/finder" className="button button-glass">Direkt zum Finder</Link></div>
          <div className="guide-meta"><span>100 konkrete Fragen</span><span>10 ausführliche Ratgeber</span><span>200 Produkte im Katalog</span></div>
        </div>
      </section>

      <section className="guide-intro section">
        <div className="container guide-intro-grid">
          <div><span className="kicker">Schnelle Orientierung</span><h2>Was macht einen guten Adventskalender aus?</h2></div>
          <div><p>Ein guter Adventskalender passt zur Person, zum Alltag und zum verfügbaren Budget. Die Zahl der Türchen, ein großer Karton oder ein behaupteter Warenwert sagen allein wenig aus. Wichtiger sind nutzbare Inhalte, klare Alters- und Sicherheitshinweise sowie eine nachvollziehbare Produktbeschreibung.</p><p>Unsere Ratgeber beginnen deshalb mit einer direkten Antwort, erklären anschließend die Auswahlkriterien und zeigen zwei oder drei konkrete Kalender im Vergleich. Produktdaten werden redaktionell eingeordnet; aktuelle Amazon-Angebotsdaten erscheinen nur, wenn sie über die offizielle Schnittstelle verfügbar sind.</p></div>
        </div>
      </section>

      <section id="themen" className="guide-clusters section" aria-labelledby="themen-title">
        <div className="container">
          <div className="section-heading"><span className="kicker">Zehn Themenwelten</span><h2 id="themen-title">Finde deine Frage – und eine belastbare Antwort.</h2><p>Jede Themenwelt bündelt zehn eng verwandte Suchfragen. So erhältst du einen ausführlichen Überblick, ohne dich durch oberflächliche Einzeltexte klicken zu müssen.</p></div>
          <div className="guide-cluster-grid">
            {guideClusters.map((guide, index) => (
              <article className="guide-cluster-card" key={guide.slug}>
                <div className="guide-cluster-number">{String(index + 1).padStart(2, "0")}</div>
                <div className="guide-cluster-media"><Image src={guide.hero} alt={guide.heroAlt} fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
                <div className="guide-cluster-body">
                  <span className="kicker">{guide.kicker}</span><h3><Link href={`/ratgeber/${guide.slug}`}>{guide.title}</Link></h3><p>{guide.description}</p>
                  <ul>{guide.topics.slice(0, 4).map((topic) => <li key={topic.id}><CheckIcon /><Link href={`/ratgeber/${guide.slug}#${topic.id}`}>{topic.title}</Link></li>)}</ul>
                  <Link href={`/ratgeber/${guide.slug}`} className="text-link">Alle zehn Antworten lesen <ArrowIcon /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="guide-transparency section"><div className="container guide-transparency-grid"><div><span className="kicker light">Transparent statt vermeintlicher Testsieger</span><h2>Wir helfen beim Einordnen – und sagen, was wir nicht wissen.</h2></div><div><p>Wir haben die Kalender nicht selbst im Labor getestet. Unsere Texte verbinden dokumentierte Produktmerkmale mit nachvollziehbaren Auswahlkriterien. Preise und Verfügbarkeit können sich ändern; verbindlich bleibt die Händlerseite.</p><Link href="/methodik" className="button button-light">Unsere Methodik</Link></div></div></section>

      <div className="container guide-hub-comparison"><GuideProductComparison products={featuredProducts} /></div>

      <section className="section guide-hub-final"><div className="container article-cta"><div><span className="kicker light">In wenigen Schritten</span><h2>Noch unsicher? Der Finder erstellt drei begründete Empfehlungen.</h2></div><Link href="/finder" className="button button-light">Finder starten <ArrowIcon /></Link></div></section>
    </div>
  );
}
