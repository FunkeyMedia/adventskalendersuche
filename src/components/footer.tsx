import Link from "next/link";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p>Orientierung für 24 Tage Vorfreude – nachvollziehbar, unabhängig erklärt und ohne Verkaufsdruck.</p>
          <span className="affiliate-note">Als Amazon-Partner verdienen wir an qualifizierten Verkäufen.</span>
        </div>
        <div>
          <h2>Entdecken</h2>
          <Link href="/finder">Produktfinder</Link><Link href="/produkte">Alle Produkte</Link><Link href="/vergleich">Vergleich</Link><Link href="/ratgeber">Ratgeber</Link>
        </div>
        <div>
          <h2>Vertrauen</h2>
          <Link href="/methodik">So empfehlen wir</Link><Link href="/affiliate-transparenz">Affiliate-Transparenz</Link><Link href="/ueber-uns">Über uns</Link><Link href="/kontakt">Kontakt</Link>
        </div>
        <div>
          <h2>Rechtliches</h2>
          <Link href="/impressum">Impressum</Link><Link href="/datenschutz">Datenschutz</Link><Link href="/sitemap.xml">Sitemap</Link>
        </div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Adventskalendersuche</span><span>Mit Sorgfalt in Deutschland entwickelt.</span></div>
    </footer>
  );
}
