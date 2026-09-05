# Adventskalendersuche

Eine deutschsprachige Produktempfehlungs-, Finder- und Vergleichswebsite für Adventskalender. Die Marke folgt der Leitidee **„Die Vorfreude-Landkarte“**: Statt einer endlosen Affiliate-Liste führt ein kurzer Dialog zu drei nachvollziehbaren Empfehlungen.

## Funktionsumfang

- emotional gestaltete, responsive Startseite
- regelbasierter Finder mit genau einer Entscheidung pro Schritt
- Schnellmodus, dynamische Altersfrage, Rückweg und lokaler Zwischenstand
- personalisierte Empfehlung, Budget- und Premiumalternative
- transparenter Match-Score mit Gründen und möglichen Einschränkungen
- Vergleich von zwei bis vier Produkten
- 200 filterbare Produkte und dynamische Produktdetailseiten
- Ratgeber-Hub mit 100 beantworteten Fragen in zehn Themenwelten, dynamischen Produktvergleichen und FAQ-Strukturdaten
- Methodik, Über uns, Kontakt und rechtliche Seiten
- sichtbare Affiliate-Kennzeichnung und sichere externe Links
- datensparsames Affiliate-Klickereignis ohne Finder-Antworten oder Personenangaben
- Sitemap, robots.txt, kanonische URLs, Metadaten und zulässige strukturierte Daten
- Amazon-Originalbilder, Angebotsdaten und Affiliate-Ziele über die Creators API
- sichere Rückfallebene mit den vorhandenen redaktionellen Produktmotiven, falls Amazon vorübergehend nicht erreichbar ist

## Technologie

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4 plus eigenes Designsystem in CSS
- Vitest für die Ranking-Logik
- pnpm
- Vercel als Zielplattform

## Lokal starten

Voraussetzungen: Node.js 20.9 oder neuer und pnpm 10.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Danach ist die Website unter `http://localhost:3000` erreichbar.

## Qualitätsprüfung

```bash
pnpm verify
```

Der Befehl führt ESLint, TypeScript-Prüfung, Vitest und den optimierten Produktions-Build aus.

## Architektur

```text
src/app/                 Seiten, Metadaten, Sitemap und Event-Endpunkt
src/components/          wiederverwendbare UI- und Finder-Komponenten
src/data/                normalisierter Produktdatensatz
src/lib/finder.ts        Ausschlüsse, Gewichtungen und Ranking
src/lib/products.ts      Produktzugriff und Formatierung
public/heroes/           optimierte Marken- und Homepagebilder
scripts/                 reproduzierbare Datenaufbereitung
```

Produktdaten, Empfehlungslogik und Oberfläche sind voneinander getrennt. Neue Datenquellen oder ein CMS können deshalb später vor der Normalisierung ergänzt werden, ohne den Finder neu zu entwerfen.

## Produktdatenmodell

Jedes Produkt enthält unter anderem:

- interne ID, Slug und ASIN
- Titel, Marke, Kategorie und Zielgruppe
- Mindestalter, Inhalt und Merkmale
- Vor- und mögliche Nachteile sowie Warnhinweise
- Budgetklasse und dokumentierte Preisbeobachtung
- Datenstand und Affiliate-Ziel

Originalbilder, Angebotspreis und Verfügbarkeit werden – bei eingerichteten Zugangsdaten – serverseitig über Amazons Creators API geladen. Angebotsdaten werden höchstens eine Stunde zwischengespeichert. Verbindlich bleibt die aktuelle Amazon-Produktseite.

## Finder- und Ranking-Logik

1. Harte Ausschlüsse prüfen Mindestalter und Haustierkategorie.
2. Zielgruppe und Hauptinteresse bestimmen die stärksten Gewichtungen.
3. Budgetklasse und Priorität verfeinern den Score.
4. Der Finder sortiert alle zulässigen Produkte nach Match-Score und dokumentierter Datenlage.
5. Neben dem besten Gesamttreffer werden eine preisbewusste und eine Premium- oder Spezialalternative ausgewählt.

Der Score zeigt die relative Passung zur Eingabe und ist ausdrücklich keine Testnote. Die Implementierung und Tests liegen in `src/lib/finder.ts` und `src/lib/finder.test.ts`.

## Produkte ergänzen oder aktualisieren

1. Die Quelldaten im erwarteten JSON-Format bereitstellen.
2. Optional den Pfad über `SOURCE_FILE` setzen.
3. Normalisierte Datei neu erzeugen:

```bash
SOURCE_FILE=/absoluter/pfad/produkte.json pnpm data:prepare
```

4. `pnpm verify` ausführen und die erzeugten Änderungen prüfen.

Neue Produktdetailseiten, Katalogeinträge und Sitemap-URLs entstehen automatisch aus `src/data/products.generated.json`.

## Amazon Creators API und Affiliate-ID

Die aktuelle Partner-ID lautet `onlinestarkei-21`.

- Die frühere Product Advertising API (PA-API 5.0) ist abgekündigt. Diese Anwendung nutzt den offiziellen Nachfolger Creators API.
- API-Zugangsdaten werden ausschließlich serverseitig verwendet und niemals an den Browser ausgeliefert.
- Access Tokens werden bis kurz vor Ablauf wiederverwendet. Angebotsdaten werden eine Stunde gecacht; bei API-Fehlern bleibt die Website mit redaktionellen Bildern und dem Link „Preis bei Amazon ansehen“ nutzbar.
- `GetItems` wird in Paketen von höchstens zehn ASINs aufgerufen. Temporäre Fehler und Limits werden mit begrenztem exponentiellem Backoff behandelt.
- Von Amazon gelieferte Affiliate-Ziele haben Vorrang vor den normalisierten Rückfall-URLs in `src/data/products.generated.json`.

Die Zugangsdaten werden im deutschen PartnerNet unter **Tools → Creators API** als Anwendung erzeugt. Für deutsche Zugangsdaten ist in der Regel Credential-Version `3.2` vorgesehen.

Externe Links verwenden `rel="sponsored nofollow noopener noreferrer"` und öffnen in einem neuen Tab. Das Klickereignis über `/api/events` enthält nur Ereignistyp, interne Produkt-ID und Zeitpunkt.

## Umgebungsvariablen

| Variable | Zweck |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Produktionsbasis für Metadaten, Sitemap und robots.txt |
| `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG` | dokumentiert die zentral verwendete Amazon-Partner-ID |
| `AMAZON_ASSOCIATE_TAG` | serverseitig verwendete Amazon-Partner-ID |
| `AMAZON_CREATORS_CREDENTIAL_ID` | geheime Credential-ID der Creators-API-Anwendung |
| `AMAZON_CREATORS_CREDENTIAL_SECRET` | geheimer Schlüssel der Creators-API-Anwendung |
| `AMAZON_CREATORS_CREDENTIAL_VERSION` | Credential-Region, für Deutschland `3.2` |
| `AMAZON_CREATORS_MARKETPLACE` | Ziel-Marktplatz, standardmäßig `www.amazon.de` |

Die beiden Credential-Werte müssen nur in `.env.local` und in den geschützten Vercel Environment Variables stehen. Sie dürfen nicht mit `NEXT_PUBLIC_` beginnen und werden nicht im Repository gespeichert.

## Deployment auf Vercel

1. Repository in Vercel importieren.
2. Framework Preset `Next.js` und Package Manager `pnpm` verwenden.
3. `NEXT_PUBLIC_SITE_URL` auf die endgültige Produktions-URL setzen.
4. die fünf serverseitigen Amazon-Variablen aus `.env.example` in Vercel hinterlegen.
5. deployen und Finder, Vergleich, Produktseiten sowie die rechtlichen Seiten prüfen.
6. Bei einer späteren Custom Domain dieselbe URL in der Umgebungsvariable aktualisieren und erneut deployen.

## Betreibermaßnahmen vor öffentlichem Betrieb

- Impressum, Datenschutz und Kontakt mit echten Betreiberangaben ergänzen und rechtlich prüfen.
- Datenschutztext an die tatsächliche Vercel-, Log- und Analysekonfiguration anpassen.
- Produktdaten, Partnerprogramm-Konformität und Affiliate-Ziele regelmäßig aktualisieren.
- Eine eigene Domain erst nach geklärter Inhaberschaft und DNS-Freigabe verbinden.

Die enthaltenen Rechtstexte sind als Arbeitsgrundlage gekennzeichnet und keine individuelle Rechtsberatung.
