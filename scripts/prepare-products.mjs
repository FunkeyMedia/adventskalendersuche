import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const source = process.env.SOURCE_FILE || path.resolve(root, "../work/adventskalendersuche/amazon_candidates_200.json");
const target = path.resolve(root, "src/data/products.generated.json");
const input = JSON.parse(await fs.readFile(source, "utf8"));

const slugify = (value, fallback) => {
  const slug = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 68);
  return `${slug || "adventskalender"}-${fallback.toLowerCase()}`;
};

const budgetClass = (price) => {
  if (typeof price !== "number") return "Preis prüfen";
  if (price < 20) return "Bis 20 €";
  if (price < 40) return "20–40 €";
  if (price < 70) return "40–70 €";
  return "Ab 70 €";
};

const products = input.map((item) => ({
  id: item.internalId,
  slug: slugify(item.title, item.asin),
  asin: item.asin,
  title: item.title,
  brand: item.brand || "Nicht eindeutig ausgewiesen",
  category: item.category,
  audience: item.audience,
  minimumAge: item.minimumAge,
  doors: item.doors,
  description: item.description,
  features: item.features,
  advantages: String(item.advantages || "").split(";").map((value) => value.trim()).filter(Boolean).slice(0, 4),
  disadvantages: item.disadvantages ? [item.disadvantages] : [],
  warnings: item.warnings,
  sustainability: item.sustainability,
  observedPrice: item.price,
  budgetClass: budgetClass(item.price),
  prime: item.prime === "Ja",
  availability: item.availability,
  rating: item.rating,
  reviews: item.reviews,
  affiliateUrl: item.affiliateLink,
  lastChecked: item.checkedAt,
  score: item.provisionalScore,
  sponsoredSearchResult: Boolean(item.raw?.sponsored),
}));

await fs.mkdir(path.dirname(target), { recursive: true });
await fs.writeFile(target, `${JSON.stringify(products, null, 2)}\n`, "utf8");
console.log(`Prepared ${products.length} products at ${target}`);
