import type { Metadata } from "next";

export const metadata: Metadata = { title: "Impressum", description: "Impressum von Adventskalendersuche.", alternates: { canonical: "/impressum" }, robots: { index: false, follow: true } };

export default function ImprintPage() {
  return <div className="page-shell legal-page"><div className="container narrow-container"><header className="page-intro"><span className="kicker">Rechtliches</span><h1>Impressum</h1></header><section><h2>Angaben gemäß § 5 DDG</h2><p><strong>Pascal Weyers</strong><br />Birkenwaldstr. 46<br />63179 Obertshausen<br />Deutschland</p></section><section><h2>Kontakt</h2><p>E-Mail: <a href="mailto:pascal@funkeymedia.de">pascal@funkeymedia.de</a></p></section><section><h2>Umsatzsteuer-Identifikationsnummer</h2><p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE299749508</p></section><section><h2>Haftung für Links</h2><p>Diese Website enthält gekennzeichnete Links zu externen Angeboten. Für deren Inhalte sind die jeweiligen Betreiber verantwortlich.</p></section></div></div>;
}
