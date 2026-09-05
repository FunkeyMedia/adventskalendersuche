export type Product = {
  id: string;
  slug: string;
  asin: string;
  title: string;
  brand: string;
  category: string;
  audience: string;
  minimumAge: number | null;
  doors: number | null;
  description: string;
  features: string | null;
  advantages: string[];
  disadvantages: string[];
  warnings: string | null;
  sustainability: string | null;
  observedPrice: number | null;
  budgetClass: string;
  prime: boolean;
  availability: string;
  rating: number | null;
  reviews: number | null;
  affiliateUrl: string;
  lastChecked: string;
  score: number;
  sponsoredSearchResult: boolean;
};

export type AmazonImage = {
  url: string;
  width: number;
  height: number;
};

export type AmazonMoney = {
  amount: number;
  currency: string;
  displayAmount: string;
};

export type AmazonProductData = {
  asin: string;
  title: string | null;
  detailPageUrl: string;
  image: AmazonImage | null;
  price: AmazonMoney | null;
  savingBasis: AmazonMoney | null;
  savingsPercentage: number | null;
  availabilityType: string | null;
  availabilityMessage: string | null;
  dealBadge: string | null;
  merchantName: string | null;
  fetchedAt: string;
};

export type ProductWithAmazon = Product & {
  amazon?: AmazonProductData | null;
};

export type FinderAnswers = {
  recipient?: "kind" | "frau" | "mann" | "paar" | "familie" | "haustier" | "offen";
  interest?: "genuss" | "beauty" | "knobeln" | "kreativ" | "spiel" | "lesen" | "schmuck" | "offen";
  budget?: "unter20" | "20bis40" | "40bis70" | "ueber70" | "offen";
  childAge?: "unter6" | "6bis9" | "10bis13" | "14bis17";
  priority?: "preis" | "qualitaet" | "nachhaltigkeit" | "ueberraschung" | "offen";
};

export type MatchResult = {
  product: Product;
  score: number;
  reasons: string[];
  cautions: string[];
};
