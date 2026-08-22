import Link from "next/link";
import { Logo } from "@/components/logo";

const links = [
  ["Finder", "/finder"],
  ["Produkte", "/produkte"],
  ["Vergleichen", "/vergleich"],
  ["Ratgeber", "/ratgeber"],
  ["So empfehlen wir", "/methodik"],
];

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Hauptnavigation">
          {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <Link href="/finder" className="button button-small header-cta">Finder starten</Link>
        <details className="mobile-menu">
          <summary aria-label="Navigation öffnen"><span></span><span></span><span></span></summary>
          <nav aria-label="Mobile Navigation">
            {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            <Link href="/finder" className="button">Finder starten</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
