import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideProductComparison } from "@/components/guide-product-comparison";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { guideBySlug, guideClusters } from "@/lib/guides";
import { productById } from "@/lib/products";

type GuidePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guideClusters.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideBySlug.get(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/ratgeber/${guide.slug}` },
    openGraph: {
      type: "article",
      locale: "de_DE",
      title: guide.title,
      description: guide.description,
      images: [{ url: guide.hero, alt: guide.heroAlt }],
      publishedTime: "2026-09-05T00:00:00.000Z",
      modifiedTime: "2026-09-05T00:00:00.000Z",
    },
  };
}

export default async function GuideDetailPage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = guideBySlug.get(slug);
  if (!guide) notFound();

  const selectedProducts = guide.productIds
    .map((id) => productById.get(id))
    .filter((product) => product !== undefined);
  const relatedGuides = guideClusters.filter((item) => item.slug !== guide.slug).slice(0, 3);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://adventskalendersuche.de";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: guide.title,
        description: guide.description,
        image: `${siteUrl}${guide.hero}`,
        datePublished: "2026-09-05",
        dateModified: "2026-09-05",
        inLanguage: "de-DE",
        author: { "@type": "Organization", name: "Redaktion Adventskalendersuche" },
        publisher: { "@type": "Organization", name: "Adventskalendersuche", url: siteUrl },
        mainEntityOfPage: `${siteUrl}/ratgeber/${guide.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Startseite", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Ratgeber", item: `${siteUrl}/ratgeber` },
          { "@type": "ListItem", position: 3, name: guide.shortTitle, item: `${siteUrl}/ratgeber/${guide.slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: guide.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <div className="guide-detail-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />
      <article>
        <header className="guide-detail-hero">
          <Image src={guide.hero} alt={guide.heroAlt} fill priority sizes="100vw" />
          <div className="hero-shade" />
          <div className="container guide-detail-hero-content">
            <nav className="guide-breadcrumbs" aria-label="Brotkrümelnavigation">
              <Link href="/">Startseite</Link><span aria-hidden="true">/</span><Link href="/ratgeber">Ratgeber</Link><span aria-hidden="true">/</span><span>{guide.shortTitle}</span>
            </nav>
            <span className="kicker light">{guide.kicker}</span>
            <h1>{guide.title}</h1>
            <p>{guide.description}</p>
            <div className="guide-meta"><span>Redaktion Adventskalendersuche</span><span>Aktualisiert am 5. September 2026</span><span>{guide.topics.length} ausführliche Antworten</span></div>
          </div>
        </header>

        <div className="container guide-detail-layout">
          <aside className="guide-toc">
            <strong>In diesem Ratgeber</strong>
            {guide.topics.map((topic, index) => <a href={`#${topic.id}`} key={topic.id}>{index + 1}. {topic.title}</a>)}
          </aside>
          <div className="guide-article-body">
            <section className="guide-answer-box" aria-labelledby="kurz-erklaert">
              <span className="kicker">Kurz erklärt</span>
              <h2 id="kurz-erklaert">Die wichtigste Antwort vorab</h2>
              <p>{guide.topics[0].answer} Vergleiche anschließend zwei oder drei konkrete Produkte nach denselben Kriterien und prüfe Preis sowie Verfügbarkeit unmittelbar vor dem Kauf.</p>
            </section>

            <section className="guide-principles" aria-labelledby="kriterien">
              <div>
                <span className="chapter-number">01</span>
                <h2 id="kriterien">Unsere Auswahlkriterien</h2>
                <p>Wir ordnen Produkte redaktionell ein und behaupten keine eigenen Labortests. Die folgenden Kriterien helfen, Werbeaussagen von praktisch relevanten Informationen zu trennen.</p>
              </div>
              <ul className="check-list">
                {guide.buyingRules.map((rule) => <li key={rule}><CheckIcon />{rule}</li>)}
              </ul>
            </section>

            <section className="guide-topics" aria-labelledby="fragen">
              <span className="chapter-number">02</span>
              <h2 id="fragen">Alle wichtigen Fragen ausführlich beantwortet</h2>
              <p className="section-lead">Jede Antwort lässt sich direkt anwenden. Für Produktdaten und Sicherheitshinweise gilt trotzdem immer die aktuelle Angabe des Herstellers oder Händlers.</p>
              {guide.topics.map((topic, index) => (
                <section id={topic.id} className="guide-topic" key={topic.id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{topic.title}</h3>
                    <p>{topic.answer}</p>
                    <p>Für die konkrete Auswahl empfehlen wir, mindestens zwei Kalender direkt gegenüberzustellen. Berücksichtige dabei nicht nur den Preis, sondern auch Nutzbarkeit, Zielgruppe, Umfang und mögliche Einschränkungen.</p>
                  </div>
                </section>
              ))}
            </section>

            <GuideProductComparison products={selectedProducts} />

            <section className="guide-method-note">
              <div>
                <span className="chapter-number">03</span>
                <h2>So entstehen unsere Vergleiche</h2>
                <p>Produktnamen, Kategorien, Zielgruppen und dokumentierte Merkmale stammen aus unserem gepflegten Katalog. Originalbilder, Angebotspreise und Verfügbarkeit werden bei vorhandener Verbindung serverseitig über die Amazon Creators API abgerufen und zeitlich begrenzt zwischengespeichert.</p>
                <p>Wir haben die gezeigten Kalender nicht selbst getestet. Unsere Einordnung ist eine Entscheidungshilfe; verbindlich bleiben die aktuellen Produkt-, Sicherheits- und Angebotsangaben beim Händler.</p>
              </div>
              <Link href="/methodik" className="text-link">Methodik vollständig lesen <ArrowIcon /></Link>
            </section>

            <section className="guide-faq" aria-labelledby="faq">
              <span className="chapter-number">04</span>
              <h2 id="faq">Häufige Fragen</h2>
              {guide.faq.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </section>

            <section className="guide-related" aria-labelledby="weitere-ratgeber">
              <span className="kicker">Weiterlesen</span>
              <h2 id="weitere-ratgeber">Passende Ratgeber</h2>
              <div className="guide-related-grid">
                {relatedGuides.map((item) => (
                  <Link href={`/ratgeber/${item.slug}`} key={item.slug}>
                    <span>{item.kicker}</span><strong>{item.title}</strong><small>{item.description}</small>
                  </Link>
                ))}
              </div>
            </section>

            <div className="article-cta">
              <div><span className="kicker light">Persönliche Auswahl</span><h2>Der Finder übersetzt deine Wünsche in drei Empfehlungen.</h2></div>
              <Link href="/finder" className="button button-light">Finder starten <ArrowIcon /></Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
