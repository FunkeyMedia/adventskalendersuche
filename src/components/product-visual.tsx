import { CategoryIcon } from "@/components/icons";

const palette: Record<string, string> = {
  "Beauty & Pflege": "rose",
  "Bücher & Geschichten": "gold",
  "Genuss & Lebensmittel": "berry",
  "Rätsel & Experimente": "fir",
  "Basteln & Kreativität": "clay",
  Spielzeug: "blue",
  "LEGO & Klemmbausteine": "blue",
  Haustiere: "clay",
  "Schmuck & Accessoires": "rose",
};

export function ProductVisual({ category, compact = false }: { category: string; compact?: boolean }) {
  return (
    <div className={`product-visual ${palette[category] || "fir"} ${compact ? "compact" : ""}`} aria-label={`Symbolbild für ${category}`} role="img">
      <div className="visual-door"><CategoryIcon category={category} /></div>
      <span>{category}</span>
      <small>Redaktionelles Symbolbild</small>
    </div>
  );
}
