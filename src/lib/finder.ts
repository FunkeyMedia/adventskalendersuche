import type { FinderAnswers, MatchResult, Product } from "@/lib/types";

const interestCategories: Record<NonNullable<FinderAnswers["interest"]>, string[]> = {
  genuss: ["Genuss & Lebensmittel"],
  beauty: ["Beauty & Pflege"],
  knobeln: ["Rätsel & Experimente", "Bücher & Geschichten"],
  kreativ: ["Basteln & Kreativität", "Nachhaltig & wiederverwendbar"],
  spiel: ["Spielzeug", "LEGO & Klemmbausteine"],
  lesen: ["Bücher & Geschichten"],
  schmuck: ["Schmuck & Accessoires", "Beauty & Pflege"],
  offen: [],
};

const budgetRanges: Record<NonNullable<FinderAnswers["budget"]>, [number, number]> = {
  unter20: [0, 20],
  "20bis40": [20, 40],
  "40bis70": [40, 70],
  ueber70: [70, Number.POSITIVE_INFINITY],
  offen: [0, Number.POSITIVE_INFINITY],
};

const childAges: Record<NonNullable<FinderAnswers["childAge"]>, number> = {
  unter6: 4,
  "6bis9": 7,
  "10bis13": 11,
  "14bis17": 15,
};

function recipientFit(product: Product, recipient: FinderAnswers["recipient"]) {
  if (!recipient || recipient === "offen") return 7;
  const haystack = `${product.audience} ${product.title} ${product.category}`.toLowerCase();
  const terms: Record<Exclude<FinderAnswers["recipient"], undefined | "offen">, string[]> = {
    kind: ["kind", "mädchen", "jungen", "familie", "spielzeug", "lego"],
    frau: ["frau", "damen", "beauty", "schmuck", "erwachsene"],
    mann: ["mann", "herren", "erwachsene", "rätsel"],
    paar: ["paar", "partner", "erwachsene"],
    familie: ["familie", "kinder", "erwachsene", "geschichte"],
    haustier: ["haustier", "hund", "katze"],
  };
  return terms[recipient].some((term) => haystack.includes(term)) ? 20 : -7;
}

function budgetFit(product: Product, budget: FinderAnswers["budget"]) {
  if (!budget || budget === "offen" || product.observedPrice === null) return 8;
  const [min, max] = budgetRanges[budget];
  if (product.observedPrice >= min && product.observedPrice < max) return 20;
  const distance = product.observedPrice < min ? min - product.observedPrice : product.observedPrice - max;
  return Math.max(-15, 5 - distance / 3);
}

function priorityFit(product: Product, priority: FinderAnswers["priority"]) {
  if (!priority || priority === "offen") return 5;
  if (priority === "preis") return product.observedPrice !== null && product.observedPrice < 30 ? 12 : 2;
  if (priority === "qualitaet") {
    const completeness = [product.description, product.features, product.advantages[0], product.disadvantages[0], product.warnings].filter(Boolean).length;
    return 7 + completeness;
  }
  if (priority === "nachhaltigkeit") return product.sustainability || product.category.includes("Nachhaltig") ? 15 : -4;
  return product.category === "Sonstige Adventskalender" || (product.observedPrice || 0) > 50 ? 12 : 5;
}

export function calculateMatch(product: Product, answers: FinderAnswers): MatchResult | null {
  if (answers.recipient === "kind" && product.minimumAge && answers.childAge) {
    const age = childAges[answers.childAge];
    if (age < product.minimumAge) return null;
  }
  if (answers.recipient !== "haustier" && product.category === "Haustiere") return null;
  if (answers.recipient === "haustier" && product.category !== "Haustiere") return null;

  let raw = 14 + recipientFit(product, answers.recipient) + budgetFit(product, answers.budget) + priorityFit(product, answers.priority);
  const reasons: string[] = [];
  const cautions: string[] = [];
  const preferred = answers.interest ? interestCategories[answers.interest] : [];

  if (preferred.length === 0) {
    raw += 5;
    reasons.push("breit einsetzbarer Adventskalender");
  } else if (preferred.includes(product.category)) {
    raw += 25;
    reasons.push(`passt zum Interesse „${product.category}“`);
  } else {
    raw -= 12;
  }

  if (answers.budget && answers.budget !== "offen") {
    const [min, max] = budgetRanges[answers.budget];
    if (product.observedPrice !== null && product.observedPrice >= min && product.observedPrice < max) reasons.push("liegt in der gewählten Budgetklasse");
    else cautions.push("kann außerhalb des gewünschten Budgets liegen");
  }
  if (product.prime) reasons.push("Prime-Kennzeichnung war bei der Prüfung sichtbar");
  if (product.minimumAge) reasons.push(`Altersempfehlung ab ${product.minimumAge} Jahren berücksichtigt`);
  if (product.warnings) cautions.push(product.warnings);
  if (product.disadvantages[0]) cautions.push(product.disadvantages[0]);
  if (product.sponsoredSearchResult) cautions.push("war in der Amazon-Suche als gesponsert gekennzeichnet");

  return {
    product,
    score: Math.max(35, Math.min(98, Math.round(raw))),
    reasons: reasons.slice(0, 4),
    cautions: cautions.slice(0, 2),
  };
}

export function rankProducts(items: Product[], answers: FinderAnswers) {
  return items
    .map((product) => calculateMatch(product, answers))
    .filter((result): result is MatchResult => result !== null)
    .sort((a, b) => b.score - a.score || b.product.score - a.product.score);
}

export function selectRecommendations(items: Product[], answers: FinderAnswers) {
  const ranked = rankProducts(items, answers);
  const best = ranked[0];
  const relevant = ranked.filter((item) => item.score >= Math.max(55, (best?.score || 55) - 18));
  const budget = relevant
    .filter((item) => item.product.id !== best?.product.id && item.product.observedPrice !== null)
    .toSorted((a, b) => (a.product.observedPrice || 999) - (b.product.observedPrice || 999))[0];
  const premium = relevant
    .filter((item) => ![best?.product.id, budget?.product.id].includes(item.product.id))
    .toSorted((a, b) => b.product.score - a.product.score || (b.product.observedPrice || 0) - (a.product.observedPrice || 0))[0];
  return { best, budget: budget || ranked[1], premium: premium || ranked[2], ranked };
}

export function answersToSearchParams(answers: FinderAnswers) {
  const params = new URLSearchParams();
  Object.entries(answers).forEach(([key, value]) => value && params.set(key, value));
  return params.toString();
}

export function searchParamsToAnswers(params: URLSearchParams): FinderAnswers {
  return {
    recipient: (params.get("recipient") || undefined) as FinderAnswers["recipient"],
    interest: (params.get("interest") || undefined) as FinderAnswers["interest"],
    budget: (params.get("budget") || undefined) as FinderAnswers["budget"],
    childAge: (params.get("childAge") || undefined) as FinderAnswers["childAge"],
    priority: (params.get("priority") || undefined) as FinderAnswers["priority"],
  };
}
