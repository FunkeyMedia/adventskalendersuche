export const SEASON_REVIEW_DATE = "2026-10-08";

export const seasonReviews: Record<string, { summary: string; sourceLabel: string; sourceUrl: string }> = {
  "AK-0001": {
    summary: "Zum gemeinsamen Vorlesen ab 4 Jahren: Der Verlag bestätigt 24 Vorlesekarten und 24 Motive zum Aufhängen. Die Box erschien 2023 und ist keine jährlich wechselnde Ausgabe. Am 08.10.2026 war sie beim Verlag als sofort lieferbar gelistet. Das bestätigt keinen Amazon-Bestand.",
    sourceLabel: "Thienemann: Inhalt, Alter und Lieferstatus",
    sourceUrl: "https://www.thienemann.de/produkt/kinderbuecher/tiere/der-kleine-siebenschlaefer-adventsgeschichten-aus-dem-lichterwald-isbn-978-3-522-18639-1",
  },
  "AK-0002": {
    summary: "Achtung, ältere Ausgabe: Dieser Katalogeintrag wurde als Kneipp Adventskalender 2025 erfasst. Kneipp führt inzwischen eine Ausgabe 2026 mit der Artikelnummer 920480. Diese war am 08.10.2026 beim Hersteller verfügbar. Die Zuordnung der verlinkten Amazon-ASIN zur Ausgabe 2026 ist nicht bestätigt. Prüfe dort Jahr, Inhalt und Packungsbild vor dem Kauf.",
    sourceLabel: "Kneipp: Adventskalender 2026, Artikel 920480",
    sourceUrl: "https://www.kneipp.com/de_de/adventskalender-2026-920480.html",
  },
  "AK-0008": {
    summary: "Für zwei Teepausen pro Tag: FROG.coffee beschreibt die Ausgabe 2026 mit 48 Beuteln in 24 Sorten. Enthalten sind auch Schwarz- und Grüntees, die Auswahl ist also nicht vollständig koffeinfrei. Am 08.10.2026 nannte der Hersteller 1 bis 2 Werktage Lieferzeit. Die konkrete Jahresausgabe und Zutaten des Amazon-Angebots bitte vor dem Kauf abgleichen.",
    sourceLabel: "FROG.coffee: Inhalt und Lieferzeit",
    sourceUrl: "https://frogcoffee.de/tee-adventskalender-von-frog.coffee-48-teebeutel-in-24-verschiedenen-sorten",
  },
};

export function guideModifiedDate(slug: string) {
  return slug === "beauty-wellness-adventskalender" ? SEASON_REVIEW_DATE : "2026-09-05";
}
