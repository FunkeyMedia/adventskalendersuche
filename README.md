# Adventskalendersuche

Eine deutschsprachige Produktempfehlungs-, Finder- und Vergleichswebsite für Adventskalender. Die Marke folgt der Leitidee **„Die Vorfreude-Landkarte“**: Statt einer endlosen Affiliate-Liste führt ein kurzer Dialog zu drei nachvollziehbaren Empfehlungen.

## Funktionsumfang

- emotional gestaltete, responsive Startseite
- regelbasierter Finder mit genau einer Entscheidung pro Schritt
- Schnellmodus, dynamische Altersfrage, Rückweg und lokaler Zwischenstand
- personalisierte Empfehlung, Budget- und Premiumalternative
- transparenter Match-Score mit Gründen und möglichen Einschränkungen
- Vergleich von zwei bis vier Produkten
- 200 filterbare Produkte und 200 statisch erzeugte Detailseiten
- Ratgeber, Methodik, Über uns, Kontakt und rechtliche Seiten
- sichtbare Affiliate-Kennzeichnung und sichere externe Links
- datensparsames Affiliate-Klickereignis ohne Finder-Antworten oder Personenangaben
- Sitemap, robots.txt, kanonische URLs, Metadaten und zulässige strukturierte Daten
- eigene SVG-Icons und redaktionelle Kategoriesymbole statt kopierter Amazon-Produktbilder

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

Preise, Verfügbarkeit und Amazon-Bewertungen werden nicht als Livewerte ausgegeben. Verbindlich ist die aktuelle Amazon-Produktseite.

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

## Amazon-Affiliate-ID

Die aktuelle Partner-ID lautet `onlinestarkei-21`.

- Dokumentation und Zielkonfiguration: `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG` in `.env.example`
- Die normalisierten Affiliate-Ziele stehen produktbezogen in `src/data/products.generated.json`.
- Vor einem Tag-Wechsel müssen die Ziel-URLs neu erzeugt und geprüft werden.

Externe Links verwenden `rel="sponsored nofollow noopener noreferrer"` und öffnen in einem neuen Tab. Das Klickereignis über `/api/events` enthält nur Ereignistyp, interne Produkt-ID und Zeitpunkt.

## Umgebungsvariablen

| Variable | Zweck |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Produktionsbasis für Metadaten, Sitemap und robots.txt |
| `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG` | dokumentiert die zentral verwendete Amazon-Partner-ID |

Es werden keine geheimen Zugangsdaten im Repository gespeichert.

## Deployment auf Vercel

1. Repository in Vercel importieren.
2. Framework Preset `Next.js` und Package Manager `pnpm` verwenden.
3. `NEXT_PUBLIC_SITE_URL` auf die endgültige Produktions-URL setzen.
4. deployen und Finder, Vergleich, Produktseiten sowie die rechtlichen Seiten prüfen.
5. Bei einer späteren Custom Domain dieselbe URL in der Umgebungsvariable aktualisieren und erneut deployen.

## Betreibermaßnahmen vor öffentlichem Betrieb

- Impressum, Datenschutz und Kontakt mit echten Betreiberangaben ergänzen und rechtlich prüfen.
- Datenschutztext an die tatsächliche Vercel-, Log- und Analysekonfiguration anpassen.
- Produktdaten, Partnerprogramm-Konformität und Affiliate-Ziele regelmäßig aktualisieren.
- Eine eigene Domain erst nach geklärter Inhaberschaft und DNS-Freigabe verbinden.

Die enthaltenen Rechtstexte sind als Arbeitsgrundlage gekennzeichnet und keine individuelle Rechtsberatung.
