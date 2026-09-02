import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, DoorIcon } from "@/components/icons";

export const metadata: Metadata = { title: "Kontakt", description: "Kontakt und Hinweise zu Produktdaten, redaktionellen Fragen und technischen Problemen.", alternates: { canonical: "/kontakt" } };

export default function ContactPage() {
  return <div className="page-shell simple-page"><div className="container narrow-container"><header className="page-intro"><span className="kicker">Wir hören zu</span><h1>Etwas entdeckt, das wir wissen sollten?</h1><p>Hinweise zu veränderten Produktdaten, fehlenden Angaben und technischen Problemen helfen uns, die Orientierung verlässlich zu halten.</p></header><div className="contact-card"><DoorIcon /><div><h2>Direkter Kontakt</h2><p>Schreib uns mit der Produkt-ID oder dem Link zur betroffenen Seite. So können wir Hinweise schnell zuordnen.</p><p><a className="button" href="mailto:pascal@funkeymedia.de?subject=Adventskalendersuche">E-Mail an Pascal Weyers</a></p></div></div><p className="back-link"><Link href="/ueber-uns" className="text-link">Mehr über das Projekt <ArrowIcon /></Link></p></div></div>;
}
